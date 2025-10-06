import { useState } from 'react';
import { sendEmailVerification, verifyEmailOTP, resendEmailVerification } from '../services/emailService';

const useEmailVerification = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);

  const sendOTP = async (email) => {
    try {
      setLoading(true);
      setError(null);
      await sendEmailVerification(email);
      setOtpSent(true);
    } catch (err) {
      setError(err.message || 'Failed to send OTP');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (email, otp) => {
    try {
      setLoading(true);
      setError(null);
      await verifyEmailOTP(email, otp);
      setVerified(true);
      return true;
    } catch (err) {
      setError(err.message || 'Invalid OTP');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async (email) => {
    try {
      setLoading(true);
      setError(null);
      await resendEmailVerification(email);
      setOtpSent(true);
    } catch (err) {
      setError(err.message || 'Failed to resend OTP');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setOtpSent(false);
    setVerified(false);
    setError(null);
  };

  return {
    loading,
    error,
    otpSent,
    verified,
    sendOTP,
    verifyOTP,
    resendOTP,
    reset
  };
};

export default useEmailVerification;