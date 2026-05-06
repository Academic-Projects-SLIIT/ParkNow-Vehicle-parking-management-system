// ========== BOOKING LOGIC ==========
function calcFee() {
  const s = document.getElementById('bk-start').value;
  const e = document.getElementById('bk-end').value;
  if (s && e) {
    const diff = (new Date(e) - new Date(s)) / 3600000;
    if (diff > 0) {
      const lkr = Math.round(diff * 150);
      const fee = 'LKR ' + lkr.toLocaleString();
      document.getElementById('fee-display').textContent = fee;
      document.getElementById('fee-hours').textContent = diff.toFixed(1) + ' hours × LKR 150/hr';
      document.getElementById('s-total').textContent = fee;
      // Update summary times
      const fmt = v => new Date(v).toLocaleString('en-US',{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'});
      document.getElementById('s-start').textContent = fmt(s);
      document.getElementById('s-end').textContent = fmt(e);
      document.getElementById('s-dur').textContent = diff.toFixed(1) + ' hours';
    }
  }
}
function selectPay(type) {
  document.getElementById('pm-cash').classList.toggle('selected', type==='cash');
  document.getElementById('pm-card').classList.toggle('selected', type==='card');
  document.getElementById('card-fields').style.display = type==='card' ? 'block' : 'none';
  document.getElementById('s-pay').textContent = type === 'card' ? '💳 Card' : '💵 Cash';
}

function resetBooking() {
  document.getElementById('bk-start').value = '';
  document.getElementById('bk-end').value = '';
  document.getElementById('fee-display').textContent = 'LKR 0';
  document.getElementById('fee-hours').textContent = 'Select times to calculate';
  document.getElementById('s-total').textContent = 'LKR 0';
  document.getElementById('s-start').textContent = '—';
  document.getElementById('s-end').textContent = '—';
  document.getElementById('s-dur').textContent = '—';
  selectPay('cash');
}

function confirmBooking() {
  showToast('✅ Booking confirmed! Slot A-07 reserved.');
}

// Set default booking times
  const now = new Date();
  const later = new Date(now.getTime() + 3*3600000);
  const fmt = d => d.toISOString().slice(0,16);
  const bs = document.getElementById('bk-start');
  const be = document.getElementById('bk-end');
  if (bs) { bs.value = fmt(now); be.value = fmt(later); calcFee(); }