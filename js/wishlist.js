/* TagX Fashion - Wishlist Manager (LocalStorage) */

const WISHLIST_STORAGE_KEY = 'tagx_wishlist_items';

function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveWishlist(list) {
  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(list));
  updateWishlistBadges();
}

function isInWishlist(productId) {
  const list = getWishlist();
  return list.includes(productId);
}

function toggleWishlist(productId) {
  let list = getWishlist();
  const index = list.indexOf(productId);

  if (index > -1) {
    list.splice(index, 1);
    showToast(`Removed from Wishlist`);
  } else {
    list.push(productId);
    showToast(`Saved to Wishlist ❤️`);
  }

  saveWishlist(list);

  // Update UI icons if present
  const btns = document.querySelectorAll(`.wishlist-btn[data-id="${productId}"]`);
  btns.forEach(btn => {
    if (isInWishlist(productId)) {
      btn.classList.add('active');
      btn.innerHTML = `<svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
    } else {
      btn.classList.remove('active');
      btn.innerHTML = `<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>`;
    }
  });

  if (typeof renderWishlistPage === 'function') {
    renderWishlistPage();
  }
}

function updateWishlistBadges() {
  const count = getWishlist().length;
  const badges = document.querySelectorAll('.wishlist-badge');
  badges.forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  });
}

document.addEventListener('DOMContentLoaded', updateWishlistBadges);
