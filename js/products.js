/* TagX Fashion - Product Renderer Component */

function createProductCardHTML(product) {
  const isWishlisted = isInWishlist(product.id);
  const heartIcon = isWishlisted 
    ? `<svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`
    : `<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>`;

  return `
    <div class="product-card" data-id="${product.id}">
      <div class="product-image-wrap">
        <a href="product.html?id=${product.id}">
          <img src="${product.image}" alt="${product.title}" loading="lazy" />
        </a>
        <span class="badge ${product.badgeClass}">${product.tag}</span>
        <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" data-id="${product.id}" onclick="toggleWishlist('${product.id}')" title="Save to Wishlist">
          ${heartIcon}
        </button>
      </div>

      <div class="product-details">
        <div class="flex-between" style="margin-bottom: 4px;">
          <span class="product-brand">${product.brand}</span>
          <span class="stock-badge ${product.stock <= 3 ? 'low' : 'fast'}">🔥 ${product.stockTag}</span>
        </div>

        <a href="product.html?id=${product.id}" class="product-title">${product.title}</a>

        <div class="product-price-row">
          <span class="price-current">₹${product.price}</span>
          <span class="price-original">₹${product.originalPrice}</span>
          <span class="discount-tag">${product.discount}</span>
        </div>

        <div style="display: flex; gap: 8px; margin-top: 12px;">
          <button class="btn btn-outline btn-sm btn-full" onclick="addToCart('${product.id}', '${product.sizes[0]}', 1)">
            🛒 Add to Cart
          </button>
          <a href="product.html?id=${product.id}" class="btn btn-primary btn-sm" title="View Details">
            👉
          </a>
        </div>
      </div>
    </div>
  `;
}

function renderProductsGrid(containerElement, productsList) {
  if (!containerElement) return;
  if (!productsList || productsList.length === 0) {
    containerElement.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem;">
        <h3 style="font-family: var(--font-heading); margin-bottom: 8px;">No Products Found</h3>
        <p style="color: var(--text-muted);">Try adjusting your search query or filter selections.</p>
      </div>
    `;
    return;
  }

  containerElement.innerHTML = productsList.map(product => createProductCardHTML(product)).join('');
}
