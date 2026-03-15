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
    enum: ['TV', 'AC', 'Washing Machine', 'Refrigerator', 'Dishwashers', 'Microwave Ovens', 'LG Audio', 'Water Purifier']
  },
  productCode: {
    type: String,
    required: false,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  mrp: {
    type: Number,
    required: false
  },
  price: {
    type: Number,
    required: false
  },
  specifications: {
    type: mongoose.Schema.Types.Mixed,
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
  variants: [
    {
      screenSize: { type: Number, required: true },
      price: { type: Number, required: true },
      mrp: { type: Number, required: true },
      productCode: { type: String, required: true },
      inStock: { type: Boolean, default: true }
    }
  ],
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