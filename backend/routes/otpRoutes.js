const express = require('express');
const router = express.Router();
const {
  sendPhoneVerification,
  verifyPhoneOTP,
  resendPhoneVerification
} = require('../controllers/otpController');
const { validatePhone, validatePhoneOTP } = require('../middleware/validation');
const { smsRateLimiter } = require('../middleware/rateLimiter');

router.post('/send-verification', smsRateLimiter, validatePhone, sendPhoneVerification);
router.post('/verify-otp', validatePhoneOTP, verifyPhoneOTP);
router.post('/resend-verification', smsRateLimiter, validatePhone, resendPhoneVerification);

module.exports = router;