import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  CircularProgress,
  Typography,
  Alert
} from '@mui/material';
import { Email, CheckCircle } from '@mui/icons-material';
import useEmailVerification from '../../hooks/useEmailVerification';
import { validateEmail } from '../../utils/helpers';

const EmailVerification = ({ email, onEmailChange, onVerified, error }) => {
  const [otp, setOtp] = useState('');
  const [localError, setLocalError] = useState('');
  const {
    loading,
    error: apiError,
    otpSent,
    verified,
    sendOTP,
    verifyOTP,
    resendOTP
  } = useEmailVerification();

  const handleSendOTP = async () => {
    if (!validateEmail(email)) {
      setLocalError('Please enter a valid email address');
      return;
    }

    try {
      setLocalError('');
      await sendOTP(email);
    } catch (err) {
      setLocalError(err.message);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      setLocalError('OTP must be 6 digits');
      return;
    }

    try {
      setLocalError('');
      await verifyOTP(email, otp);
      onVerified();
    } catch (err) {
      setLocalError(err.message);
    }
  };

  const handleResendOTP = async () => {
    try {
      setLocalError('');
      setOtp('');
      await resendOTP(email);
    } catch (err) {
      setLocalError(err.message);
    }
  };

  return (
    <Box>
      <TextField
        fullWidth
        label="Email Address"
        type="email"
        value={email}
        onChange={(e) => {
          onEmailChange(e.target.value);
          setLocalError('');
        }}
        disabled={otpSent || verified}
        error={!!(error || localError)}
        helperText={error || localError}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email />
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
          disabled={loading || !email}
          sx={{ mt: 1 }}
          startIcon={loading && <CircularProgress size={20} />}
        >
          Send Verification Code
        </Button>
      )}

      {otpSent && !verified && (
        <Box sx={{ mt: 2 }}>
          <Alert severity="info" sx={{ mb: 2 }}>
            A 6-digit verification code has been sent to your email.
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
              Verify Email
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
          Email verified successfully!
        </Alert>
      )}

      {apiError && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {apiError}
        </Alert>
      )}
    </Box>
  );
};

export default EmailVerification;