// ========== PARKING MAP ==========
const occupiedA = [3,7,9,14,17,20];
const occupiedB = [1,4,8,11,16,19];
const occupiedC = [2,5,10,13,18];
const maintenanceA = [];
const maintenanceB = [6];
const maintenanceC = [];
let selectedSlot = null;

function buildGrid(containerId, prefix, count, occ, maint) {
  const g = document.getElementById(containerId);
  if (!g) return;
  g.innerHTML = '';
  for (let i = 1; i <= count; i++) {
    const id = prefix + '-' + String(i).padStart(2,'0');
    const d = document.createElement('div');
    let cls = 'slot ';
    if (maint.includes(i))   cls += 'ds';
    else if (occ.includes(i)) cls += 'oc';
    else                      cls += 'av';
    d.className = cls;
    d.innerHTML = `<div class="slot-id">${id}</div><div class="slot-ico">${maint.includes(i)? '🔧' : occ.includes(i)? '🔴':'🟢'}</div>`;
    if (!occ.includes(i) && !maint.includes(i)) {
      d.onclick = () => selectSlot(id, prefix);
    }
    g.appendChild(d);
  }
}

function selectSlot(id, section) {
  // Deselect previous
  document.querySelectorAll('.slot.sl').forEach(s => {
    s.classList.replace('sl','av');
    s.querySelector('.slot-ico').textContent = '🟢';
  });
  // Select new
  const cells = document.querySelectorAll('.slot');
  cells.forEach(c => {
    if (c.querySelector('.slot-id') && c.querySelector('.slot-id').textContent === id) {
      c.classList.replace('av','sl');
      c.querySelector('.slot-ico').textContent = '⭐';
    }
  });
  selectedSlot = id;
  document.getElementById('selectedSlotId').textContent = id;
  document.getElementById('selectedSlotSection').textContent = 'Section ' + section + ' — Ground Floor';
  document.getElementById('selectedSlotMeta').textContent = 'Standard · LKR 150/hr';
  document.getElementById('selectedPanel').style.display = 'flex';
  document.getElementById('bookSlotBtn').style.display = 'inline-flex';
}

function clearSelection() {
  document.querySelectorAll('.slot.sl').forEach(s => {
    s.classList.replace('sl','av');
    s.querySelector('.slot-ico').textContent = '🟢';
  });
  selectedSlot = null;
  document.getElementById('selectedPanel').style.display = 'none';
  document.getElementById('bookSlotBtn').style.display = 'none';
}
