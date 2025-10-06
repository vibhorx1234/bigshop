export const CATEGORIES = [
  { name: 'All', path: '/products', value: 'All' },
  { name: 'TV', path: '/products/tv', value: 'TV' },
  { name: 'AC', path: '/products/ac', value: 'AC' },
  { name: 'Washing Machine', path: '/products/washing-machine', value: 'Washing Machine' },
  { name: 'Refrigerator', path: '/products/refrigerator', value: 'Refrigerator' },
  { name: 'Dishwashers', path: '/products/dishwashers', value: 'Dishwashers' },
  { name: 'Microwave Ovens', path: '/products/microwave-ovens', value: 'Microwave Ovens' },
  { name: 'LG Audio', path: '/products/audio', value: 'LG Audio' },
  { name: 'Deep Freezer', path: '/products/freezer', value: 'Deep Freezer' },
  { name: 'Visi Cooler', path: '/products/visi', value: 'Visi Cooler' },
  { name: 'Homeware', path: '/products/homeware', value: 'Homeware' }
];

export const SORT_OPTIONS = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-low-high' },
  { label: 'Price: High to Low', value: 'price-high-low' },
  { label: 'Name: A to Z', value: 'name-a-z' },
  { label: 'Name: Z to A', value: 'name-z-a' }
];

export const SHOP_INFO = {
  name: 'BigShop',
  address: '2, Shri Ram Colony, B2 Bypass, Tonk Road, opposite Fortune Park Bella Casa, Jaipur',
  phone: '+91 9116666673, +91 9829010908',
  email: 'rajendrabigshop@yahoo.com',
  coordinates: {
    lat: 12.9716,
    lng: 77.5946
  },
  workingHours: {
    weekdays: '10:00 AM - 9:00 PM',
    weekends: '10:00 AM - 9:00 PM'
  }
};

export const OTP_EXPIRY_TIME = 600; // 10 minutes in seconds