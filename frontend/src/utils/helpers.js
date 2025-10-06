export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const getCategoryPath = (category) => {
  const categoryMap = {
    'TV': '/products/tv',
    'AC': '/products/ac',
    'Washing Machine': '/products/washing-machine',
    'Refrigerator': '/products/refrigerator',
    'Dishwashers': '/products/dishwashers',
    'Microwave Ovens': '/products/microwave-ovens',
    'LG Audio': '/products/audio',
    'Deep Freezer': '/products/freezer',
    'Visi Cooler': '/products/visi',
    'Homeware': '/products/homeware',
    'All': '/products'
  };
  return categoryMap[category] || '/products';
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
  return re.test(phone);
};

export const validateOTP = (otp) => {
  return /^\d{6}$/.test(otp);
};