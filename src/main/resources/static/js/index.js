// Navigation Controller logic
function showPage(pageId) {
    switch (pageId) {
        case 'pg-home':
            window.location.href = '/';
            break;
        case 'pg-login':
            window.location.href = '/login';
            break;
        case 'pg-register':
            window.location.href = '/register';
            break;
        case 'pg-live-map':
            window.location.href = '/slot-map';
            break;
        case 'pg-pricing':
            document.getElementById('pricing-section').scrollIntoView({ behavior: 'smooth' });
            break;
        case 'pg-about':
            document.getElementById('about-section').scrollIntoView({ behavior: 'smooth' });
            break;
        case 'pg-contact':
            document.getElementById('contact-info').scrollIntoView({ behavior: 'smooth' });
            break;
        default:
            console.warn("Route not defined for:", pageId);
    }
}

function closeDropdown() {
    const activeDropdowns = document.querySelectorAll('.dropdown-menu.show');
    activeDropdowns.forEach(menu => {
        menu.classList.remove('show');
    });
}

function formatStatInt(n) {
    const v = Number(n);
    if (!Number.isFinite(v)) return '—';
    return Math.round(v).toLocaleString();
}

function applyHomeStats(stats) {
    const total = document.getElementById('stat-total-capacity');
    const occupied = document.getElementById('stat-occupied');
    const available = document.getElementById('stat-available');
    const utilSub = document.getElementById('stat-utilization-sub');
    const freeSub = document.getElementById('stat-free-sub');
    const clients = document.getElementById('stat-happy-clients');
    const reservations = document.getElementById('stat-total-reservations');
    const avgRating = document.getElementById('stat-avg-rating');
    const hourlyRate = document.getElementById('pricing-hourly-rate');

    if (total) total.textContent = formatStatInt(stats.totalCapacity);
    if (occupied) occupied.textContent = formatStatInt(stats.occupied);
    if (available) available.textContent = formatStatInt(stats.available);
    if (utilSub) utilSub.textContent = (stats.utilizationPercent ?? 0) + '% utilization';
    if (freeSub) freeSub.textContent = (stats.freePercent ?? 0) + '% free';
    if (clients) clients.textContent = formatStatInt(stats.happyClients);
    if (reservations) reservations.textContent = formatStatInt(stats.totalReservations);
    if (avgRating) {
        avgRating.textContent = stats.averageRatingDisplay || '—';
        avgRating.dataset.statTarget = stats.averageRatingDisplay || '—';
    }
    if (hourlyRate) {
        const rate = Number(stats.hourlyRate);
        hourlyRate.textContent = Number.isFinite(rate)
            ? rate.toLocaleString(undefined, { maximumFractionDigits: 0 })
            : '—';
    }
}

function renderHomeFeedback(rows) {
    const grid = document.getElementById('home-feedback-grid');
    const empty = document.getElementById('home-feedback-empty');
    if (!grid) return;

    if (!rows || !rows.length) {
        grid.innerHTML = '';
        if (empty) empty.style.display = 'block';
        return;
    }
    if (empty) empty.style.display = 'none';

    grid.innerHTML = rows.map((f) => {
        const name = escapeHtml(f.driverName || 'Driver');
        const stars = escapeHtml(f.ratingDisplay || '');
        const category = escapeHtml(f.category || 'General');
        const comment = escapeHtml(f.comment || '');
        const date = escapeHtml(f.date || '—');
        return `<article class="home-glass-card home-feedback-card">
          <div class="home-feedback-stars" aria-label="${f.rating} out of 5 stars">${stars}</div>
          <p class="home-feedback-comment">${comment || '—'}</p>
          <div class="home-feedback-meta">
            <span class="home-feedback-name">${name}</span>
            <span class="home-feedback-category">${category}</span>
          </div>
          <div class="home-feedback-date">${date}</div>
        </article>`;
    }).join('');
}

function escapeHtml(s) {
    const d = document.createElement('div');
    d.textContent = s == null ? '' : String(s);
    return d.innerHTML;
}

async function loadHomeData() {
    try {
        const [statsRes, feedbackRes] = await Promise.all([
            fetch('/api/home/stats'),
            fetch('/api/home/feedback'),
        ]);
        if (statsRes.ok) {
            const stats = await statsRes.json();
            applyHomeStats(stats);
            initStatsAnimation();
        }
        if (feedbackRes.ok) {
            const feedback = await feedbackRes.json();
            renderHomeFeedback(feedback);
        }
    } catch (e) {
        console.error('Home data load failed:', e);
    }
}

function initStatsAnimation() {
    const stats = document.querySelectorAll('[data-stat-animate]');
    stats.forEach((stat) => {
        const targetText = stat.dataset.statTarget || stat.textContent;
        if (targetText === '—' || !targetText.trim()) return;

        if (stat.dataset.statAnimate === 'text') {
            stat.textContent = targetText;
            return;
        }

        const targetValue = parseFloat(targetText.replace(/[^0-9.]/g, ''));
        if (isNaN(targetValue)) return;

        let startTime = performance.now();
        const duration = 1600;

        function update(currentTime) {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const currentNumber = progress * targetValue;
            stat.textContent = Math.floor(currentNumber).toLocaleString();
            if (progress < 1) requestAnimationFrame(update);
        }
        stat.textContent = '0';
        requestAnimationFrame(update);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadHomeData();

    const actionButtons = document.querySelectorAll('.btn');
    actionButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
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
