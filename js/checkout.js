/* TagX Fashion - Checkout Page Handler */

function initCheckoutPage() {
  const form = document.getElementById('checkout-form');
  const summaryContainer = document.getElementById('checkout-summary-items');
  const totalContainer = document.getElementById('checkout-total-price');

  if (!form) return;

  const cart = getCart();
  if (cart.length === 0) {
    showToast('Your cart is empty! Redirecting to shop...', 'warning');
    setTimeout(() => {
      window.location.href = 'collections.html';
    }, 1500);
    return;
  }

  // Populate order summary
  if (summaryContainer) {
    summaryContainer.innerHTML = cart.map(item => `
      <div style="display: flex; justify-content: space-between; align-items: center; padding-block: 8px; border-bottom: 1px dashed var(--border);">
        <div>
          <div style="font-weight: 700; font-size: 0.95rem;">${item.title}</div>
          <div style="font-size: 0.8rem; color: var(--text-muted);">Size: ${item.size} | Qty: ${item.qty}</div>
        </div>
        <div style="font-weight: 800; color: var(--primary);">₹${item.price * item.qty}</div>
      </div>
    `).join('');
  }

  const subtotal = getCartSubtotal();
  if (totalContainer) {
    totalContainer.textContent = `₹${subtotal}`;
  }

  // Prefill form if customer details exist in localStorage
  const savedCustomer = JSON.parse(localStorage.getItem('tagx_customer_details'));
  if (savedCustomer) {
    if (document.getElementById('cust-name')) document.getElementById('cust-name').value = savedCustomer.name || '';
    if (document.getElementById('cust-phone')) document.getElementById('cust-phone').value = savedCustomer.phone || '';
    if (document.getElementById('cust-address')) document.getElementById('cust-address').value = savedCustomer.address || '';
    if (document.getElementById('cust-pincode')) document.getElementById('cust-pincode').value = savedCustomer.pincode || '';
    if (document.getElementById('cust-district')) document.getElementById('cust-district').value = savedCustomer.district || '';
    if (document.getElementById('cust-state')) document.getElementById('cust-state').value = savedCustomer.state || '';
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('cust-name').value.trim();
    const phone = document.getElementById('cust-phone').value.trim();
    const address = document.getElementById('cust-address').value.trim();
    const pincode = document.getElementById('cust-pincode').value.trim();
    const district = document.getElementById('cust-district').value.trim();
    const state = document.getElementById('cust-state').value.trim();

    if (!name || !phone || !address || !pincode || !district || !state) {
      showToast('Please fill out all address fields!', 'error');
      return;
    }

    if (phone.length < 10) {
      showToast('Please enter a valid 10-digit phone number!', 'error');
      return;
    }

    const customerDetails = { name, phone, address, pincode, district, state };
    localStorage.setItem('tagx_customer_details', JSON.stringify(customerDetails));

    // Build message and launch WhatsApp
    const message = buildWhatsAppOrderMessage(cart, customerDetails);
    const whatsappURL = generateWhatsAppURL(message);

    // Clear cart and redirect
    localStorage.removeItem(CART_STORAGE_KEY);
    updateCartBadges();

    showToast('Redirecting to WhatsApp to complete payment...', 'success');

    setTimeout(() => {
      window.open(whatsappURL, '_blank');
      window.location.href = 'index.html';
    }, 1000);
  });
}

document.addEventListener('DOMContentLoaded', initCheckoutPage);
