/* TagX Fashion - Google Analytics & Meta Pixel Integration Engine */

// Replace with your real Google Analytics & Meta Pixel IDs when launching production:
const GA_MEASUREMENT_ID = 'G-TAGXFASHION';
const META_PIXEL_ID = '0000000000000000';

function initAnalytics() {
  // 1. Google Analytics (gtag.js)
  try {
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
  } catch(e) {
    console.log('GA Analytics initialized in showcase mode');
  }

  // 2. Meta (Facebook) Pixel
  try {
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    
    fbq('init', META_PIXEL_ID);
    fbq('track', 'PageView');
  } catch(e) {
    console.log('Meta Pixel initialized in showcase mode');
  }
}

// Track eCommerce Events
function trackAddToCartEvent(productTitle, price) {
  if (window.fbq) {
    fbq('track', 'AddToCart', { content_name: productTitle, value: price, currency: 'INR' });
  }
}

function trackWhatsAppOrderEvent(totalAmount) {
  if (window.fbq) {
    fbq('track', 'Purchase', { value: totalAmount, currency: 'INR' });
  }
}

document.addEventListener('DOMContentLoaded', initAnalytics);
