const { body, validationResult } = require('express-validator');

// Validation error handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  next();
};

// Email validation
exports.validateEmail = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  handleValidationErrors
];

// Phone validation
exports.validatePhone = [
  body('phone')
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  handleValidationErrors
];

// Email OTP validation
exports.validateEmailOTP = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('otp')
    .isLength({ min: 6, max: 6 })
    .withMessage('OTP must be 6 digits')
    .isNumeric()
    .withMessage('OTP must contain only numbers'),
  handleValidationErrors
];

// Phone OTP validation
exports.validatePhoneOTP = [
  body('phone')
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  body('otp')
    .isLength({ min: 6, max: 6 })
    .withMessage('OTP must be 6 digits')
    .isNumeric()
    .withMessage('OTP must contain only numbers'),
  handleValidationErrors
];

// Enquiry validation
exports.validateEnquiry = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('phone')
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  body('productCode')
    .trim()
    .notEmpty()
    .withMessage('Product code is required'),
  body('emailVerified')
    .isBoolean()
    .withMessage('Email verification status must be boolean'),
  body('phoneVerified')
    .isBoolean()
    .withMessage('Phone verification status must be boolean'),
  handleValidationErrors
];

// Bulk enquiry validation
exports.validateBulkEnquiry = [
  body('companyName')
    .trim()
    .notEmpty()
    .withMessage('Company name is required'),
  body('contactPerson')
    .trim()
    .notEmpty()
    .withMessage('Contact person name is required'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('phone')
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  body('products')
    .isArray({ min: 1 })
    .withMessage('At least one product is required'),
  body('products.*.productCode')
    .trim()
    .notEmpty()
    .withMessage('Product code is required'),
  body('products.*.productName')
    .trim()
    .notEmpty()
    .withMessage('Product name is required'),
  body('products.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),
  body('emailVerified')
    .isBoolean()
    .withMessage('Email verification status must be boolean'),
  body('phoneVerified')
    .isBoolean()
    .withMessage('Phone verification status must be boolean'),
  handleValidationErrors
];