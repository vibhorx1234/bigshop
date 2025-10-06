const { sendVerificationEmail } = require('../utils/sendEmail');
const OTP = require('../models/OTP');
const { generateOTP } = require('../utils/generateOTP');

// Send email verification OTP
exports.sendEmailVerification = async (req, res) => {
  try {
    const { email } = req.body;

    // Generate OTP
    const otpCode = generateOTP();

    // Save OTP to database
    await OTP.create({
      identifier: email,
      type: 'email',
      otp: otpCode
    });

    // Send OTP via email
    await sendVerificationEmail({
      to: email,
      subject: 'Email Verification - BigShop',
      otp: otpCode
    });

    res.status(200).json({
      success: true,
      message: 'Verification email sent successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Verify email OTP
exports.verifyEmailOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find OTP record
    const otpRecord = await OTP.findOne({
      identifier: email,
      type: 'email',
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
      message: 'Email verified successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Resend email verification OTP
exports.resendEmailVerification = async (req, res) => {
  try {
    const { email } = req.body;

    // Delete old OTP records for this email
    await OTP.deleteMany({ identifier: email, type: 'email' });

    // Generate new OTP
    const otpCode = generateOTP();

    // Save new OTP to database
    await OTP.create({
      identifier: email,
      type: 'email',
      otp: otpCode
    });

    // Send OTP via email
    await sendVerificationEmail({
      to: email,
      subject: 'Email Verification - BigShop',
      otp: otpCode
    });

    res.status(200).json({
      success: true,
      message: 'Verification email resent successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};