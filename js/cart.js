/* TagX Fashion - Shopping Cart Manager (LocalStorage) */

const CART_STORAGE_KEY = 'tagx_cart_items';

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  updateCartBadges();
}

function addToCart(productId, size = 'L', qty = 1) {
  const product = getProductById(productId);
  if (!product) return;

  let cart = getCart();
  // Check if item with same productId AND same size already exists
  const existingIndex = cart.findIndex(item => item.id === productId && item.size === size);

  if (existingIndex > -1) {
    cart[existingIndex].qty += qty;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      brand: product.brand,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      size: size,
      qty: qty
    });
  }

  saveCart(cart);
  showToast(`Added ${product.title} (${size}) to Cart!`);
}

function removeFromCart(index) {
  let cart = getCart();
  if (index >= 0 && index < cart.length) {
    const removed = cart.splice(index, 1);
    saveCart(cart);
    showToast(`Removed item from cart.`);
    if (typeof renderCartPage === 'function') renderCartPage();
  }
}

function updateCartQty(index, newQty) {
  let cart = getCart();
  if (index >= 0 && index < cart.length) {
    if (newQty <= 0) {
      removeFromCart(index);
    } else {
      cart[index].qty = newQty;
      saveCart(cart);
      if (typeof renderCartPage === 'function') renderCartPage();
    }
  }
}

function getCartSubtotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * item.qty), 0);
}

function getCartTotalItemsCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.qty, 0);
}

function updateCartBadges() {
  const totalCount = getCartTotalItemsCount();
  const badges = document.querySelectorAll('.cart-badge');
  badges.forEach(badge => {
    badge.textContent = totalCount;
    badge.style.display = totalCount > 0 ? 'flex' : 'none';
  });
}

document.addEventListener('DOMContentLoaded', updateCartBadges);
