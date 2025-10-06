const { sendOTP } = require('../utils/sendOTP');
const OTP = require('../models/OTP');
const { generateOTP } = require('../utils/generateOTP');

// Send phone verification OTP
exports.sendPhoneVerification = async (req, res) => {
  try {
    const { phone } = req.body;

    // Generate OTP
    const otpCode = generateOTP();

    // Save OTP to database
    await OTP.create({
      identifier: phone,
      type: 'phone',
      otp: otpCode
    });

    // Send OTP via SMS
    await sendOTP(phone, otpCode);

    res.status(200).json({
      success: true,
      message: 'Verification OTP sent successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Verify phone OTP
exports.verifyPhoneOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    // Find OTP record
    const otpRecord = await OTP.findOne({
      identifier: phone,
      type: 'phone',
      otp: otp,
      verified: false,
      expiresAt: { $gt: Date.now() }
    });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP'
      });
    }

    // Mark OTP as verified
    otpRecord.verified = true;
    await otpRecord.save();

    res.status(200).json({
      success: true,
      message: 'Phone verified successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Resend phone verification OTP
exports.resendPhoneVerification = async (req, res) => {
  try {
    const { phone } = req.body;

    // Delete old OTP records for this phone
    await OTP.deleteMany({ identifier: phone, type: 'phone' });

    // Generate new OTP
    const otpCode = generateOTP();

    // Save new OTP to database
    await OTP.create({
      identifier: phone,
      type: 'phone',
      otp: otpCode
    });

    // Send OTP via SMS
    await sendOTP(phone, otpCode);

    res.status(200).json({
      success: true,
      message: 'Verification OTP resent successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};