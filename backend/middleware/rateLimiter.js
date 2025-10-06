const rateLimit = require('express-rate-limit');

// General API rate limiter
exports.apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Email verification rate limiter
exports.emailRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each IP to 5 email requests per hour
  message: {
    success: false,
    message: 'Too many email verification requests, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// SMS/OTP rate limiter
exports.smsRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // limit each IP to 3 SMS requests per hour
  message: {
    success: false,
    message: 'Too many SMS verification requests, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Enquiry submission rate limiter
exports.enquiryRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // limit each IP to 10 enquiry submissions per hour
  message: {
    success: false,
    message: 'Too many enquiry submissions, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});