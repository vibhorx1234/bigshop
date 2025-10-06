const BulkEnquiry = require('../models/BulkEnquiry');
const { sendBulkEnquiryEmail } = require('../utils/sendEmail');

// Create new bulk enquiry
exports.createBulkEnquiry = async (req, res) => {
  try {
    const { 
      companyName, 
      contactPerson, 
      email, 
      phone, 
      products, 
      message, 
      emailVerified, 
      phoneVerified 
    } = req.body;

    // Create bulk enquiry
    const bulkEnquiry = await BulkEnquiry.create({
      companyName,
      contactPerson,
      email,
      phone,
      products,
      message,
      emailVerified,
      phoneVerified
    });

    // Send email to owner
    await sendBulkEnquiryEmail({
      to: process.env.OWNER_EMAIL,
      subject: `New Bulk Enquiry - ${companyName}`,
      enquiryData: {
        companyName,
        contactPerson,
        email,
        phone,
        products,
        message
      }
    });

    res.status(201).json({
      success: true,
      message: 'Bulk enquiry submitted successfully',
      data: bulkEnquiry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all bulk enquiries (admin)
exports.getAllBulkEnquiries = async (req, res) => {
  try {
    const bulkEnquiries = await BulkEnquiry.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bulkEnquiries.length,
      data: bulkEnquiries
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get bulk enquiry by ID
exports.getBulkEnquiryById = async (req, res) => {
  try {
    const bulkEnquiry = await BulkEnquiry.findById(req.params.id);

    if (!bulkEnquiry) {
      return res.status(404).json({
        success: false,
        message: 'Bulk enquiry not found'
      });
    }

    res.status(200).json({
      success: true,
      data: bulkEnquiry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update bulk enquiry status (admin)
exports.updateBulkEnquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const bulkEnquiry = await BulkEnquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!bulkEnquiry) {
      return res.status(404).json({
        success: false,
        message: 'Bulk enquiry not found'
      });
    }

    res.status(200).json({
      success: true,
      data: bulkEnquiry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete bulk enquiry (admin)
exports.deleteBulkEnquiry = async (req, res) => {
  try {
    const bulkEnquiry = await BulkEnquiry.findByIdAndDelete(req.params.id);

    if (!bulkEnquiry) {
      return res.status(404).json({
        success: false,
        message: 'Bulk enquiry not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Bulk enquiry deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};