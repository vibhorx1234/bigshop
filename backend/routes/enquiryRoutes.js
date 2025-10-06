const express = require('express');
const router = express.Router();
const {
  createEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry
} = require('../controllers/enquiryController');
const { validateEnquiry } = require('../middleware/validation');

// Public routes
router.post('/', validateEnquiry, createEnquiry);

// Admin routes (add authentication middleware if needed)
router.get('/', getAllEnquiries);
router.get('/:id', getEnquiryById);
router.put('/:id/status', updateEnquiryStatus);
router.delete('/:id', deleteEnquiry);

module.exports = router;