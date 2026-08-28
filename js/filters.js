/* TagX Fashion - Search, Filter & Sorting Manager */

let currentFilters = {
  search: '',
  brand: 'all',
  size: 'all',
  priceRange: 'all',
  color: 'all',
  sortBy: 'newest',
  page: 1,
  pageSize: 6
};

function applyFiltersAndSort() {
  let list = [...PRODUCTS_DATA];

  // 1. Search Query Filter
  if (currentFilters.search.trim() !== '') {
    const q = currentFilters.search.toLowerCase().trim();
    list = list.filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.colors.some(c => c.toLowerCase().includes(q))
    );
  }

  // 2. Brand Filter
  if (currentFilters.brand !== 'all') {
    list = list.filter(p => p.brand.toLowerCase() === currentFilters.brand.toLowerCase());
  }

  // 3. Size Filter
  if (currentFilters.size !== 'all') {
    list = list.filter(p => p.sizes.includes(currentFilters.size.toUpperCase()));
  }

  // 4. Color Filter
  if (currentFilters.color !== 'all') {
    list = list.filter(p => p.colors.some(c => c.toLowerCase() === currentFilters.color.toLowerCase()));
  }

  // 5. Price Range Filter
  if (currentFilters.priceRange !== 'all') {
    if (currentFilters.priceRange === '0-199') {
      list = list.filter(p => p.price <= 199);
    } else if (currentFilters.priceRange === '200-399') {
      list = list.filter(p => p.price >= 200 && p.price <= 399);
    } else if (currentFilters.priceRange === '400-599') {
      list = list.filter(p => p.price >= 400 && p.price <= 599);
    } else if (currentFilters.priceRange === '600+') {
      list = list.filter(p => p.price >= 600);
    }
  }

  // 6. Sorting
  if (currentFilters.sortBy === 'low-price') {
    list.sort((a, b) => a.price - b.price);
  } else if (currentFilters.sortBy === 'high-price') {
    list.sort((a, b) => b.price - a.price);
  } else if (currentFilters.sortBy === 'newest') {
    list.reverse();
  }

  return list;
}

function renderCollectionsPage() {
  const container = document.getElementById('collections-grid');
  if (!container) return;

  const filteredList = applyFiltersAndSort();

  // Pagination Math
  const totalItems = filteredList.length;
  const totalPages = Math.ceil(totalItems / currentFilters.pageSize) || 1;
  if (currentFilters.page > totalPages) currentFilters.page = 1;

  const startIndex = (currentFilters.page - 1) * currentFilters.pageSize;
  const paginatedList = filteredList.slice(startIndex, startIndex + currentFilters.pageSize);

  renderProductsGrid(container, paginatedList);
  renderPaginationControls(totalPages);

  // Update total count indicator
  const countEl = document.getElementById('product-count-indicator');
  if (countEl) {
    countEl.textContent = `Showing ${paginatedList.length} of ${totalItems} products`;
  }
}

function renderPaginationControls(totalPages) {
  const paginationEl = document.getElementById('pagination-container');
  if (!paginationEl) return;

  if (totalPages <= 1) {
    paginationEl.innerHTML = '';
    return;
  }

  let html = '';
  for (let i = 1; i <= totalPages; i++) {
    html += `
      <button class="btn btn-sm ${i === currentFilters.page ? 'btn-primary' : 'btn-outline'}" onclick="setPage(${i})">
        ${i}
      </button>
    `;
  }

  if (currentFilters.page < totalPages) {
    html += `
      <button class="btn btn-sm btn-outline" onclick="setPage(${currentFilters.page + 1})">
        Next &rarr;
      </button>
    `;
  }

  paginationEl.innerHTML = html;
}

function setPage(pageNum) {
  currentFilters.page = pageNum;
  renderCollectionsPage();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setFilter(key, value) {
  currentFilters[key] = value;
  currentFilters.page = 1; // Reset to page 1
  renderCollectionsPage();
}

function toggleMobileFilterModal() {
  const sidebar = document.getElementById('filter-sidebar');
  if (sidebar) {
    sidebar.classList.toggle('active-mobile-filter');
    if (sidebar.classList.contains('active-mobile-filter')) {
      sidebar.style.display = 'block';
      sidebar.style.position = 'fixed';
      sidebar.style.inset = '0';
      sidebar.style.zIndex = '999';
      sidebar.style.overflowY = 'auto';
      sidebar.style.borderRadius = '0';
    } else {
      sidebar.style.display = '';
      sidebar.style.position = '';
      sidebar.style.inset = '';
      sidebar.style.zIndex = '';
    }
  }
}
