import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  IconButton,
  Alert,
  CircularProgress,
  Typography,
  Divider
} from '@mui/material';
import { Close } from '@mui/icons-material';
import EmailVerification from './EmailVerification';
import OTPVerification from './OTPVerification';
import { createEnquiry } from '../../services/productService';
import { validateEnquiryForm } from '../../utils/validators';

const EnquiryForm = ({ open, onClose, product }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    emailVerified: false,
    phoneVerified: false
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const handleEmailVerified = () => {
    setFormData({ ...formData, emailVerified: true });
    setErrors({ ...errors, emailVerified: '' });
  };

  const handlePhoneVerified = () => {
    setFormData({ ...formData, phoneVerified: true });
    setErrors({ ...errors, phoneVerified: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateEnquiryForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      setError('');

      await createEnquiry({
        ...formData,
        productCode: product.productCode,
        productName: product.name
      });

      setSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to submit enquiry');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      emailVerified: false,
      phoneVerified: false
    });
    setErrors({});
    setSuccess(false);
    setError('');
    onClose();
  };

  if (!product) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth scroll="body">
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" fontWeight={600}>
            Product Enquiry
          </Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ py: 2, px: 3 }}>
        {success ? (
          <Alert severity="success" sx={{ mb: 2 }}>
            Enquiry submitted successfully! We'll contact you soon.
          </Alert>
        ) : (
          <>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box sx={{ mb: 2, p: 1.5, bgcolor: 'action.hover', borderRadius: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Product
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {product.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Code: {product.productCode}
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                margin="dense"
                required
              />

              <Box sx={{ mt: 1.5 }}>
                <EmailVerification
                  email={formData.email}
                  onEmailChange={(email) => setFormData({ ...formData, email })}
                  onVerified={handleEmailVerified}
                  error={errors.email || errors.emailVerified}
                />
              </Box>

              <Box sx={{ mt: 1.5 }}>
                <OTPVerification
                  phone={formData.phone}
                  onPhoneChange={(phone) => setFormData({ ...formData, phone })}
                  onVerified={handlePhoneVerified}
                  error={errors.phone || errors.phoneVerified}
                />
              </Box>

              <TextField
                fullWidth
                label="Message (Optional)"
                name="message"
                value={formData.message}
                onChange={handleChange}
                multiline
                rows={3}
                margin="dense"
                placeholder="Tell us about your requirements..."
              />
            </Box>
          </>
        )}
      </DialogContent>

      {!success && (
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading || !formData.emailVerified || !formData.phoneVerified}
            startIcon={loading && <CircularProgress size={20} />}
          >
            Submit Enquiry
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default EnquiryForm;