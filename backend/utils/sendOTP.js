const twilioClient = require('../config/sms');

const sendOTP = async (phone, otp) => {
  try {
    const message = await twilioClient.messages.create({
      body: `Your BigShop verification code is: ${otp}. Valid for 10 minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    });

    console.log('OTP SMS sent successfully:', message.sid);
    return message;
  } catch (error) {
    console.error('Error sending OTP SMS:', error);
    throw error;
  }
};

module.exports = { sendOTP };