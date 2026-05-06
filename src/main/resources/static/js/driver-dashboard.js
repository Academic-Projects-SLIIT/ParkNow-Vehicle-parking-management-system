// ========== PROFILE EDIT ==========
function toggleEdit() {
  const inputs = document.querySelectorAll('#profile-fields input');
  const actions = document.getElementById('profile-actions');
  const isDisabled = inputs[0].disabled;
  inputs.forEach(i => i.disabled = !isDisabled);
  actions.style.display = isDisabled ? 'flex' : 'none';
  if (isDisabled) inputs[0].focus();
}
function cancelEdit() {
  document.querySelectorAll('#profile-fields input').forEach(i => i.disabled = true);
  document.getElementById('profile-actions').style.display = 'none';
}
function saveProfile() {
  cancelEdit();
  showToast('✅ Profile updated successfully');
}

function toggleSidebar(page) {
  if (!page) return;
  const sidebar = page.querySelector('.sidebar');
  if (!sidebar) return;
  sidebar.classList.toggle('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.topbar').forEach(topbar => {
    if (topbar.querySelector('.topbar-toggle')) return;
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'btn btn-ghost topbar-toggle';
    toggle.setAttribute('aria-label', 'Toggle navigation');
    toggle.textContent = '☰';
    toggle.addEventListener('click', () => {
      const page = topbar.closest('.page');
      toggleSidebar(page);
    });
    topbar.insertBefore(toggle, topbar.firstChild);
  });
});
