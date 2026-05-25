/**
 * ParkNow — Billing: loads driver totals and history from /api/billing/details
 */

function showPage(pageId) {
  switch (pageId) {
    case 'pg-dashboard':
      window.location.href = '/driver/dashboard';
      break;
    case 'pg-slotMap':
      window.location.href = '/slot-map';
      break;
    case 'pg-bookings':
      window.location.href = '/reservation';
      break;
    case 'pg-vehicles':
      window.location.href = '/driver/vehicles';
      break;
    case 'pg-profile':
      window.location.href = '/driver/profile';
      break;
    case 'pg-feedback':
      window.location.href = '/feedback';
      break;
    case 'pg-billing':
      window.location.href = '/driver/billing';
      break;
    default:
      console.warn('Unknown page:', pageId);
  }
}

function closeDropdown() {}

function formatLkr(n) {
  const v = Number(n) || 0;
  return 'LKR ' + v.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

let currentAmountDue = 0;
let currentPayMethod = 'cash';

function updatePayButton() {
  const btn = document.getElementById('pay-outstanding-btn');
  if (!btn) return;
  if (currentPayMethod === 'cash') {
    btn.textContent = 'Confirm Payment';
  } else {
    btn.textContent = currentAmountDue > 0 ? 'Pay Outstanding Balance (' + formatLkr(currentAmountDue) + ')' : 'No outstanding balance';
  }
}

async function showPaymentInfo() {
  if (currentPayMethod === 'cash') {
    const amtInput = document.getElementById('cash-amount');
    const amount = amtInput ? amtInput.value : currentAmountDue;
    
    try {
      const resp = await fetch('/api/billing/confirm-cash', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ amount: amount })
      });
      const data = await resp.json();
      
      const el = document.getElementById('billing-msg');
      if (el) {
        el.style.display = 'block';
        if (data.success) {
            el.className = 'form-msg success';
            el.style.backgroundColor = '#d4edda';
            el.style.color = '#155724';
            el.textContent = 'Payment confirmation requested. Please wait for admin approval.';
        } else {
            el.className = 'form-msg error';
            el.textContent = data.message || 'Error confirming payment.';
        }
      }
      fetchBillingDetails();
    } catch (e) {
      console.error(e);
    }
  } else {
    const el = document.getElementById('billing-msg');
    if (!el) return;
    el.style.display = 'block';
    el.className = 'form-msg info';
    el.textContent =
      'Online card payment is not enabled. Pay with cash and tap Confirm Payment, or ask an administrator for help.';
  }
}

function selectPay(type) {
  currentPayMethod = type;
  const cash = document.getElementById('pm-cash');
  const card = document.getElementById('pm-card');
  const cardFields = document.getElementById('card-fields');
  const cashFields = document.getElementById('cash-fields');
  if (cash) cash.classList.toggle('selected', type === 'cash');
  if (card) card.classList.toggle('selected', type === 'card');
  if (cardFields) cardFields.style.display = type === 'card' ? 'block' : 'none';
  if (cashFields) cashFields.style.display = type === 'cash' ? 'block' : 'none';
  updatePayButton();
}

document.addEventListener('DOMContentLoaded', () => {
  fetchBillingDetails();
  // Refresh so completed sessions appear after scheduled end time
  setInterval(fetchBillingDetails, 45000);
});

async function fetchBillingDetails() {
  const msg = document.getElementById('billing-msg');
  try {
    const response = await fetch('/api/billing/details', { credentials: 'same-origin' });
    if (response.status === 401) {
      if (msg) {
        msg.style.display = 'block';
        msg.className = 'form-msg error';
        msg.textContent = 'Please log in to view billing.';
      }
      return;
    }
    if (!response.ok) throw new Error('Server error');

    const data = await response.json();

    const tp = document.getElementById('stat-total-paid');
    const tm = document.getElementById('stat-paid-meta');
    const ad = document.getElementById('stat-amount-due');
    const dm = document.getElementById('stat-due-meta');
    const rateEl = document.getElementById('stat-default-rate');
    const payBtn = document.getElementById('pay-outstanding-btn');

    if (tp) tp.textContent = formatLkr(data.totalPaidAllTime);
    if (tm) {
      const c = data.paidSessionCount ?? 0;
      tm.textContent = c === 1 ? 'Across 1 paid session' : 'Across ' + c + ' paid sessions';
    }
    if (ad) ad.textContent = formatLkr(data.amountDue);
    if (dm) {
      const u = data.unpaidSessionCount ?? 0;
      dm.textContent =
        u === 0 ? 'No unpaid fees' : u === 1 ? '1 unpaid reservation' : u + ' unpaid reservations';
    }
    if (rateEl) {
      const r = data.defaultHourlyRate ?? 150;
      rateEl.innerHTML = 'LKR ' + Math.round(r) + '<small>/hr</small>';
    }
    if (payBtn) {
      currentAmountDue = Number(data.amountDue) || 0;
      const cashAmt = document.getElementById('cash-amount');
      if (cashAmt && !cashAmt.value) {
          cashAmt.value = currentAmountDue;
      }
      updatePayButton();
    }

    const ml = document.getElementById('bsp-month-label');
    const mf = document.getElementById('bsp-month-fees');
    const bd = document.getElementById('bsp-due-side');
    const bo = document.getElementById('bsp-outstanding');
    if (ml) ml.textContent = data.monthLabel || '';
    if (mf) mf.textContent = formatLkr(data.monthlyParkingFees ?? 0);
    if (bd) bd.textContent = formatLkr(data.amountDue ?? 0);
    if (bo) bo.textContent = formatLkr(data.amountDue ?? 0);

    const tbody = document.getElementById('history-body');
    if (tbody) {
      const rows = data.history || [];
      if (!rows.length) {
        tbody.innerHTML =
          '<tr><td colspan="6" style="text-align:center;color:var(--ink-muted);padding:20px;">No billing history yet.</td></tr>';
      } else {
        tbody.innerHTML = rows
          .map((h) => {
            const paid = h.status === 'Paid';
            const badge = paid
              ? '<span class="badge badge-success">Paid</span>'
              : '<span class="badge badge-orange">Unpaid</span>';
            return (
              '<tr>' +
              `<td>${escapeHtml(String(h.date || '—'))}</td>` +
              `<td style="font-family:monospace;font-weight:600;color:var(--teal);">${escapeHtml(String(h.reference || ''))}</td>` +
              `<td>${escapeHtml(String(h.slot || '—'))}</td>` +
              `<td>${formatLkr(h.amount)}</td>` +
              `<td>${badge}</td>` +
              '</tr>'
            );
          })
          .join('');
      }
    }
  } catch (err) {
    console.error('Error loading billing details:', err);
    if (msg) {
      msg.style.display = 'block';
      msg.className = 'form-msg error';
      msg.textContent = 'Could not load billing data.';
    }
  }
}

function escapeHtml(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

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
