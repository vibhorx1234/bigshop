const express = require('express');
const router = express.Router();
const {
  createBulkEnquiry,
  getAllBulkEnquiries,
  getBulkEnquiryById,
  updateBulkEnquiryStatus,
  deleteBulkEnquiry
} = require('../controllers/bulkEnquiryController');
const { validateBulkEnquiry } = require('../middleware/validation');

// Public routes
router.post('/', validateBulkEnquiry, createBulkEnquiry);

// Admin routes (add authentication middleware if needed)
router.get('/', getAllBulkEnquiries);
router.get('/:id', getBulkEnquiryById);
router.put('/:id/status', updateBulkEnquiryStatus);
router.delete('/:id', deleteBulkEnquiry);

module.exports = router;