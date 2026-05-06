// ========== STAR RATING ==========
let currentRating = 4;
const ratingLabels = ['','Terrible 😞','Poor 😕','Okay 😐','Good 😊','Excellent 🤩'];
function setRating(n) {
  currentRating = n;
  const stars = document.querySelectorAll('#stars .star-btn');
  stars.forEach((s,i) => s.classList.toggle('lit', i < n));
  document.getElementById('star-label').textContent = n + ' out of 5 — ' + ratingLabels[n];
}

// ========== FEEDBACK CAT ==========
function selectCat(el) {
  document.querySelectorAll('.rating-cat').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
}

function submitFeedback() {
  showToast('💬 Feedback submitted — Thank you!');
}