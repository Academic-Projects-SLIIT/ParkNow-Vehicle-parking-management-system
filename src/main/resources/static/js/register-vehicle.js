
// ========== VEHICLE FORM ==========
function selectVType(el) {
  document.querySelectorAll('.vtype-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
}
function selectColor(el, color) {
  document.querySelectorAll('.cswatch').forEach(s => s.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById('veh-color').value = color;
}
function resetVehForm() {
  document.getElementById('veh-plate').value = '';
  document.getElementById('veh-color').value = 'Black';
  document.querySelectorAll('.cswatch').forEach(s => s.classList.remove('selected'));
  document.querySelector('.cswatch').classList.add('selected');
  document.querySelectorAll('.vtype-card').forEach(c => c.classList.remove('selected'));
  document.querySelector('.vtype-card').classList.add('selected');
}
function registerVehicle() {
  const plate = document.getElementById('veh-plate').value;
  if (!plate) { showToast('⚠️ Please enter a plate number'); return; }
  showToast('✅ Vehicle ' + plate.toUpperCase() + ' registered successfully');
  resetVehForm();
}