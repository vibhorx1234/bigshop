const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['TV', 'AC', 'Washing Machine', 'Refrigerator', 'Dishwashers', 'Microwave Ovens', 'LG Audio', 'Deep Freezer', 'Visi Cooler', 'Homeware']
  },
  productCode: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  mrp: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  specifications: {
    type: Map,
    of: String
  },
  features: [{
    type: String
  }],
  images: [{
    type: String,
    required: true
  }],
  videoUrl: {
    type: String,
    default: null
  },
  inStock: {
    type: Boolean,
    default: true
  },
  brand: {
    type: String,
    default: ''
  },
  warranty: {
    type: String,
    default: '1 year'
  },
  energyRating: {
    type: String,
    default: null
  },
  tags: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for search functionality
productSchema.index({ name: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Product', productSchema);