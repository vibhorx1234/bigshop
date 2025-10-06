const express = require('express');
const router = express.Router();
const {
  sendEmailVerification,
  verifyEmailOTP,
  resendEmailVerification
} = require('../controllers/emailController');
const { validateEmail, validateEmailOTP } = require('../middleware/validation');
const { emailRateLimiter } = require('../middleware/rateLimiter');

router.post('/send-verification', emailRateLimiter, validateEmail, sendEmailVerification);
router.post('/verify-otp', validateEmailOTP, verifyEmailOTP);
router.post('/resend-verification', emailRateLimiter, validateEmail, resendEmailVerification);

module.exports = router;