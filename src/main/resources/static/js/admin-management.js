function showPage(pageId){
    switch(pageId){
        case 'pg-admin-dash':
            window.location.href = "/admin/dashboard";
            break;
        case 'pg-slotMap':
            window.location.href = "/admin/slot-map";
            break;
        case 'pg-usage-stats':
            window.location.href = "/admin/usage-stats";
            break;
        case 'pg-revenue':
            window.location.href = "/admin/revenue";
            break;
        case 'pg-drivers':
            window.location.href = "/admin/drivers";
            break;
        case 'pg-vehicles':
            window.location.href = "/admin/vehicles";
            break;
        case 'pg-slots':
            window.location.href = "/admin/slots";
            break;
        case 'pg-admins':
            window.location.href = "/admin/admins";
            break;
        case 'pg-reservations':
            window.location.href = "/admin/reservations";
            break;
        case 'pg-feedback':
            window.location.href = "/admin/feedback";
            break;
    }
}

let adminRows = [];

function toggleAddAdmin() {
  const panel = document.getElementById('addAdminPanel');
  if (!panel) return;
  const hidden = panel.style.display === 'none' || panel.style.display === '';
  panel.style.display = hidden ? 'block' : 'none';
  const msg = document.getElementById('addAdminMsg');
  if (msg) {
    msg.style.display = 'none';
    msg.textContent = '';
  }
  if (hidden) {
    const editPanel = document.getElementById('editAdminPanel');
    if (editPanel) editPanel.style.display = 'none';
  }
}

function toggleEditAdmin() {
  const panel = document.getElementById('editAdminPanel');
  if (!panel) return;
  const hidden = panel.style.display === 'none' || panel.style.display === '';
  panel.style.display = hidden ? 'block' : 'none';
  const msg = document.getElementById('editAdminMsg');
  if (msg) {
    msg.style.display = 'none';
    msg.textContent = '';
  }
  if (hidden) {
    const addPanel = document.getElementById('addAdminPanel');
    if (addPanel) addPanel.style.display = 'none';
    populateEditAdminSelect();
  }
}

function showEditFormMsg(text, isError) {
  const msg = document.getElementById('editAdminMsg');
  if (!msg) return;
  msg.textContent = text;
  msg.className = 'form-msg ' + (isError ? 'error' : 'success');
  msg.style.display = 'block';
}

function populateEditAdminSelect() {
  const sel = document.getElementById('edit-adm-id');
  if (!sel) return;
  const current = sel.value;
  sel.innerHTML =
    '<option value="">— Select admin ID —</option>' +
    adminRows
      .map((a) => {
        const label = escapeHtml(a.id) + ' — ' + escapeHtml(a.fullName || a.userName || '');
        return `<option value="${escapeAttr(a.id)}">${label}</option>`;
      })
      .join('');
  if (current && adminRows.some((a) => a.id === current)) {
    sel.value = current;
    onEditAdminSelect();
  }
}

function escapeAttr(s) {
  return String(s).replace(/'/g, '&#39;').replace(/"/g, '&quot;');
}

function onEditAdminSelect() {
  const sel = document.getElementById('edit-adm-id');
  if (!sel) return;
  const admin = adminRows.find((a) => a.id === sel.value);
  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.value = val == null ? '' : val;
  };
  if (!admin) {
    set('edit-adm-fullName', '');
    set('edit-adm-userName', '');
    set('edit-adm-email', '');
    set('edit-adm-phone', '');
    set('edit-adm-adminLevel', 'PARKING');
    set('edit-adm-password', '');
    set('edit-adm-confirmPassword', '');
    return;
  }
  set('edit-adm-fullName', admin.fullName);
  set('edit-adm-userName', admin.userName);
  set('edit-adm-email', admin.email);
  set('edit-adm-phone', admin.phone === '—' ? '' : admin.phone);
  set('edit-adm-adminLevel', admin.adminLevel || 'PARKING');
  set('edit-adm-password', '');
  set('edit-adm-confirmPassword', '');
}

function showFormMsg(text, isError) {
  const msg = document.getElementById('addAdminMsg');
  if (!msg) return;
  msg.textContent = text;
  msg.className = 'form-msg ' + (isError ? 'error' : 'success');
  msg.style.display = 'block';
}

function levelBadgeClass(level) {
  switch (level) {
    case 'SUPER':
      return 'badge badge-gold';
    case 'PARKING':
      return 'badge badge-teal';
    case 'FINANCE':
      return 'badge badge-orange';
    default:
      return 'badge badge-dark';
  }
}

function levelLabel(level) {
  switch (level) {
    case 'SUPER':
      return 'Super Admin';
    case 'PARKING':
      return 'Parking Admin';
    case 'FINANCE':
      return 'Finance Admin';
    case 'READONLY':
      return 'Read-Only Admin';
    default:
      return level;
  }
}

function renderAdminRows(admins) {
  const tbody = document.getElementById('adminsTableBody');
  if (!tbody) return;

  if (!admins.length) {
    tbody.innerHTML =
      '<tr><td colspan="8" style="text-align:center;color:var(--ink-muted);padding:24px;">No administrators yet. Add one above.</td></tr>';
    return;
  }

  tbody.innerHTML = admins
    .map((a) => {
      const idEsc = escapeHtml(a.id);
      const nameEsc = escapeHtml(a.fullName || '');
      return (
        '<tr>' +
        `<td style="font-family:var(--font-display);font-weight:700;color:var(--teal);">${idEsc}</td>` +
        `<td><span style="font-weight:600;">${nameEsc}</span></td>` +
        `<td>${escapeHtml(a.userName)}</td>` +
        `<td>${escapeHtml(a.email)}</td>` +
        `<td>${escapeHtml(a.phone || '—')}</td>` +
        `<td><span class="${levelBadgeClass(a.adminLevel)}">${escapeHtml(levelLabel(a.adminLevel))}</span></td>` +
        `<td style="font-size:0.85rem;color:var(--ink-muted);">${escapeHtml(a.createdBy || '—')}</td>` +
        '<td><div class="td-actions">' +
        `<button type="button" class="btn btn-danger btn-sm adm-delete" data-adm-id="${idEsc}" data-adm-name="${nameEsc}">Delete</button>` +
        '</div></td>' +
        '</tr>'
      );
    })
    .join('');
}

function escapeHtml(s) {
  if (s == null) return '';
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

async function loadAdminList() {
  const tbody = document.getElementById('adminsTableBody');
  try {
    const res = await fetch('/admin/admins/list', { credentials: 'same-origin' });
    if (res.status === 403) {
      if (tbody) {
        tbody.innerHTML =
          '<tr><td colspan="8" style="text-align:center;color:var(--danger);padding:24px;">Admin session required. Log in as an administrator.</td></tr>';
      }
      return;
    }
    if (!res.ok) throw new Error('Failed to load admins');
    const data = await res.json();
    adminRows = Array.isArray(data) ? data : [];
    renderAdminRows(adminRows);
    populateEditAdminSelect();
  } catch (e) {
    console.error(e);
    if (tbody) {
      tbody.innerHTML =
        '<tr><td colspan="8" style="text-align:center;color:var(--danger);padding:24px;">Could not load administrators.</td></tr>';
    }
  }
}

async function deleteAdminById(id, displayName) {
  if (!id) return;
  if (!confirm(`Remove administrator "${displayName}" (${id})?`)) return;
  try {
    const res = await fetch('/admin/admins/delete/' + encodeURIComponent(id), {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: '',
    });
    const data = await res.json().catch(() => ({}));
    if (data.success) {
      await loadAdminList();
    } else {
      alert(data.message || 'Delete failed.');
    }
  } catch (e) {
    console.error(e);
    alert('Could not delete administrator.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadAdminList();

  const tbody = document.getElementById('adminsTableBody');
  if (tbody) {
    tbody.addEventListener('click', (ev) => {
      const btn = ev.target.closest('.adm-delete');
      if (!btn) return;
      const id = btn.getAttribute('data-adm-id');
      const name = btn.getAttribute('data-adm-name') || '';
      deleteAdminById(id, name);
    });
  }

  const editForm = document.getElementById('adminEditForm');
  if (editForm) {
    editForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = document.getElementById('edit-adm-id')?.value?.trim();
      if (!id) {
        showEditFormMsg('Please select an administrator.', true);
        return;
      }

      const pwd = document.getElementById('edit-adm-password')?.value || '';
      const confirmPwd = document.getElementById('edit-adm-confirmPassword')?.value || '';
      if (pwd || confirmPwd) {
        if (pwd !== confirmPwd) {
          showEditFormMsg('Passwords do not match.', true);
          return;
        }
        if (pwd.length < 4) {
          showEditFormMsg('Password must be at least 4 characters.', true);
          return;
        }
      }

      const params = new URLSearchParams();
      params.set('id', id);
      params.set('fullName', document.getElementById('edit-adm-fullName')?.value?.trim() || '');
      params.set('userName', document.getElementById('edit-adm-userName')?.value?.trim() || '');
      params.set('email', document.getElementById('edit-adm-email')?.value?.trim() || '');
      params.set('phone', document.getElementById('edit-adm-phone')?.value?.trim() || '');
      params.set('adminLevel', document.getElementById('edit-adm-adminLevel')?.value || 'PARKING');
      if (pwd) params.set('password', pwd);

      const btn = document.getElementById('edit-adm-submitBtn');
      if (btn) btn.disabled = true;

      try {
        const res = await fetch('/admin/admins/update', {
          method: 'POST',
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: params.toString(),
        });
        const data = await res.json().catch(() => ({}));

        if (res.ok && data.success) {
          showEditFormMsg(data.message || 'Administrator updated.', false);
          document.getElementById('edit-adm-password').value = '';
          document.getElementById('edit-adm-confirmPassword').value = '';
          await loadAdminList();
          const sel = document.getElementById('edit-adm-id');
          if (sel) {
            sel.value = id;
            onEditAdminSelect();
          }
        } else {
          showEditFormMsg(data.message || 'Could not update administrator.', true);
        }
      } catch (err) {
        console.error(err);
        showEditFormMsg('Network error — try again.', true);
      } finally {
        if (btn) btn.disabled = false;
      }
    });
  }

  const form = document.getElementById('adminCreateForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const pwd = document.getElementById('adm-password').value;
      const confirmPwd = document.getElementById('adm-confirmPassword').value;
      if (pwd !== confirmPwd) {
        showFormMsg('Passwords do not match.', true);
        return;
      }

      const fd = new FormData(form);
      const params = new URLSearchParams();
      params.set('fullName', fd.get('fullName') || '');
      params.set('userName', fd.get('userName') || '');
      params.set('email', fd.get('email') || '');
      params.set('phone', fd.get('phone') || '');
      params.set('password', pwd);
      params.set('adminLevel', fd.get('adminLevel') || 'PARKING');

      const btn = document.getElementById('adm-submitBtn');
      if (btn) btn.disabled = true;

      try {
        const res = await fetch('/admin/admins/add', {
          method: 'POST',
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: params.toString(),
        });
        const data = await res.json().catch(() => ({}));

        if (res.ok && data.success) {
          showFormMsg(data.message || 'Administrator saved to admins.csv.', false);
          form.reset();
          document.getElementById('adm-adminLevel').value = 'PARKING';
          await loadAdminList();
          toggleAddAdmin();
        } else {
          showFormMsg(data.message || 'Could not create administrator.', true);
        }
      } catch (err) {
        console.error(err);
        showFormMsg('Network error — try again.', true);
      } finally {
        if (btn) btn.disabled = false;
      }
    });
  }
});

async function logout() {
  try {
    const response = await fetch('/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    const data = await response.json().catch(() => ({}));
    sessionStorage.clear();
    window.location.href = data.redirect || '/login';
  } catch {
    sessionStorage.clear();
    window.location.href = '/login';
  }
}
