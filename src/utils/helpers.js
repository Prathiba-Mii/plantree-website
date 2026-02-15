// WhatsApp order function
export const sendWhatsAppOrder = (plant) => {
  const message = `Hi! I want to order:

🌱 *${plant.name}*
💰 Price: ₹${plant.price}
📦 Quantity: 1

Please confirm availability.

Thank you!`;
  
  const phoneNumber = '917093206757';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
};

// Format price in Indian Rupees
export const formatPrice = (price) => {
  return `₹${price.toLocaleString('en-IN')}`;
};

// Validate image URL
export const isValidImageUrl = (url) => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
};

// Generate star rating
export const generateStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  for (let i = 0; i < fullStars; i++) {
    stars.push('full');
  }
  
  if (hasHalfStar) {
    stars.push('half');
  }
  
  while (stars.length < 5) {
    stars.push('empty');
  }
  
  return stars;
};
