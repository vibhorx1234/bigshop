const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  getProductByCode,
  getProductsByCategory,
  getFeaturedProducts,
} = require('../controllers/productController');

// Public routes
router.get('/', getAllProducts);
router.get('/featured', getFeaturedProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/code/:code', getProductByCode);
router.get('/:id', getProductById);

module.exports = router;