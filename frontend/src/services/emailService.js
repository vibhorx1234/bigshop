import api from './api';

export const sendEmailVerification = async (email) => {
  try {
    const response = await api.post('/email/send-verification', { email });
    return response;
  } catch (error) {
    throw error;
  }
};

export const verifyEmailOTP = async (email, otp) => {
  try {
    const response = await api.post('/email/verify-otp', { email, otp });
    return response;
  } catch (error) {
    throw error;
  }
};

export const resendEmailVerification = async (email) => {
  try {
    const response = await api.post('/email/resend-verification', { email });
    return response;
  } catch (error) {
    throw error;
  }
};