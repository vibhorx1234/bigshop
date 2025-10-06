import api from './api';

export const sendPhoneVerification = async (phone) => {
  try {
    const response = await api.post('/otp/send-verification', { phone });
    return response;
  } catch (error) {
    throw error;
  }
};

export const verifyPhoneOTP = async (phone, otp) => {
  try {
    const response = await api.post('/otp/verify-otp', { phone, otp });
    return response;
  } catch (error) {
    throw error;
  }
};

export const resendPhoneVerification = async (phone) => {
  try {
    const response = await api.post('/otp/resend-verification', { phone });
    return response;
  } catch (error) {
    throw error;
  }
};