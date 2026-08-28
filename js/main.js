/* TagX Fashion - Core UI Initialization & Handlers */

function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function toggleMobileDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('mobile-drawer-overlay');
  if (drawer && overlay) {
    drawer.classList.toggle('active');
    overlay.classList.toggle('active');
  }
}

function toggleSearchModal() {
  const modal = document.getElementById('search-modal');
  if (modal) {
    modal.classList.toggle('active');
    if (modal.classList.contains('active')) {
      const input = modal.querySelector('input');
      if (input) input.focus();
    }
  }
}

function initLiveSearch() {
  const input = document.getElementById('search-input-header');
  const resultsContainer = document.getElementById('search-results-header');
  if (!input || !resultsContainer) return;

  input.addEventListener('keyup', function(e) {
    const q = e.target.value.toLowerCase().trim();
    if (q.length === 0) {
      resultsContainer.innerHTML = '';
      return;
    }

    const matches = PRODUCTS_DATA.filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    ).slice(0, 5);

    if (matches.length === 0) {
      resultsContainer.innerHTML = `<div style="padding: 10px; font-size: 0.88rem; color: var(--text-muted);">No products matching "${q}"</div>`;
      return;
    }

    resultsContainer.innerHTML = matches.map(p => `
      <a href="product.html?id=${p.id}" class="search-result-item">
        <img src="${p.image}" class="search-result-thumb" alt="${p.title}" />
        <div>
          <div style="font-weight: 700; font-size: 0.9rem;">${p.title}</div>
          <div style="font-size: 0.8rem; color: var(--primary); font-weight: 800;">₹${p.price}</div>
        </div>
      </a>
    `).join('');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initLiveSearch();
});
