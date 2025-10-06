import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  CircularProgress,
  Alert
} from '@mui/material';
import { Phone, CheckCircle } from '@mui/icons-material';
import { sendPhoneVerification, verifyPhoneOTP, resendPhoneVerification } from '../../services/otpService';
import { validatePhone } from '../../utils/helpers';

const OTPVerification = ({ phone, onPhoneChange, onVerified, error }) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleSendOTP = async () => {
    if (!validatePhone(phone)) {
      setLocalError('Please enter a valid phone number');
      return;
    }

    try {
      setLoading(true);
      setLocalError('');
      await sendPhoneVerification(phone);
      setOtpSent(true);
    } catch (err) {
      setLocalError(err.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      setLocalError('OTP must be 6 digits');
      return;
    }

    try {
      setLoading(true);
      setLocalError('');
      await verifyPhoneOTP(phone, otp);
      setVerified(true);
      onVerified();
    } catch (err) {
      setLocalError(err.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setLoading(true);
      setLocalError('');
      setOtp('');
      await resendPhoneVerification(phone);
      setOtpSent(true);
    } catch (err) {
      setLocalError(err.message || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <TextField
        fullWidth
        label="Phone Number"
        type="tel"
        value={phone}
        onChange={(e) => {
          onPhoneChange(e.target.value);
          setLocalError('');
        }}
        disabled={otpSent || verified}
        error={!!(error || localError)}
        helperText={error || localError}
        placeholder="+91 XXXXXXXXXX"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Phone />
            </InputAdornment>
          ),
          endAdornment: verified && (
            <InputAdornment position="end">
              <CheckCircle color="success" />
            </InputAdornment>
          )
        }}
      />

      {!otpSent && !verified && (
        <Button
          fullWidth
          variant="outlined"
          onClick={handleSendOTP}
          disabled={loading || !phone}
          sx={{ mt: 1 }}
          startIcon={loading && <CircularProgress size={20} />}
        >
          Send OTP
        </Button>
      )}

      {otpSent && !verified && (
        <Box sx={{ mt: 2 }}>
          <Alert severity="info" sx={{ mb: 2 }}>
            A 6-digit OTP has been sent to your phone number.
          </Alert>

          <TextField
            fullWidth
            label="Enter OTP"
            value={otp}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').slice(0, 6);
              setOtp(value);
              setLocalError('');
            }}
            inputProps={{ maxLength: 6 }}
            error={!!localError}
            helperText={localError}
          />

          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleVerifyOTP}
              disabled={loading || otp.length !== 6}
              startIcon={loading && <CircularProgress size={20} />}
            >
              Verify Phone
            </Button>
            <Button
              variant="text"
              onClick={handleResendOTP}
              disabled={loading}
            >
              Resend
            </Button>
          </Box>
        </Box>
      )}

      {verified && (
        <Alert severity="success" sx={{ mt: 1 }}>
          Phone verified successfully!
        </Alert>
      )}
    </Box>
  );
};

export default OTPVerification;