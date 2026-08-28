/* TagX Fashion - WhatsApp Order Link & Message Generator */

const TAGX_WHATSAPP_NUMBER = "916380816529"; // TagX Official WhatsApp Business Number

function buildWhatsAppOrderMessage(cartItems, customerDetails) {
  let message = `Hello TagX Fashion,\n\n*Order Details*\n\n`;

  cartItems.forEach((item, index) => {
    message += `${index + 1}.\nProduct: ${item.title}\nSize: ${item.size}\nQty: ${item.qty}\nPrice: ₹${item.price * item.qty}\n\n`;
  });

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  message += `*Total Amount:* ₹${subtotal} (Free Delivery)\n\n`;

  message += `*Customer Details*\n\n`;
  message += `Name: ${customerDetails.name}\n\n`;
  message += `Phone: ${customerDetails.phone}\n\n`;
  message += `Address:\n${customerDetails.address},\n${customerDetails.district},\n${customerDetails.state} - ${customerDetails.pincode}\n\n`;
  message += `Please share payment details.`;

  return message;
}

function generateWhatsAppURL(messageText) {
  const encodedText = encodeURIComponent(messageText);
  return `https://wa.me/${TAGX_WHATSAPP_NUMBER}?text=${encodedText}`;
}

function processDirectWhatsAppOrder(productId, size = 'L', qty = 1) {
  const product = getProductById(productId);
  if (!product) return;

  const item = [{
    title: product.title,
    size: size,
    qty: qty,
    price: product.price
  }];

  const savedCustomer = JSON.parse(localStorage.getItem('tagx_customer_details')) || {
    name: 'Customer',
    phone: 'Not specified',
    address: 'Order via Direct Chat',
    district: 'City',
    state: 'State',
    pincode: '000000'
  };

  const message = buildWhatsAppOrderMessage(item, savedCustomer);
  const url = generateWhatsAppURL(message);
  window.open(url, '_blank');
}
