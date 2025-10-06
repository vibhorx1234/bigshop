import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  CircularProgress,
  Autocomplete
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import EmailVerification from './EmailVerification';
import OTPVerification from './OTPVerification';
import { createBulkEnquiry } from '../../services/productService';
import { validateBulkEnquiryForm } from '../../utils/validators';
import { useProducts } from '../../context/ProductContext';

const BulkEnquiryForm = () => {
  const { products } = useProducts();
  
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    message: '',
    products: [],
    emailVerified: false,
    phoneVerified: false
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const handleAddProduct = () => {
    if (!selectedProduct || quantity < 1) return;

    const existingProductIndex = formData.products.findIndex(
      p => p.productCode === selectedProduct.productCode
    );

    if (existingProductIndex > -1) {
      const updatedProducts = [...formData.products];
      updatedProducts[existingProductIndex].quantity += quantity;
      setFormData({ ...formData, products: updatedProducts });
    } else {
      setFormData({
        ...formData,
        products: [
          ...formData.products,
          {
            productCode: selectedProduct.productCode,
            productName: selectedProduct.name,
            quantity: quantity
          }
        ]
      });
    }

    setSelectedProduct(null);
    setQuantity(1);
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = formData.products.filter((_, i) => i !== index);
    setFormData({ ...formData, products: updatedProducts });
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
    
    const validationErrors = validateBulkEnquiryForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      setError('');

      await createBulkEnquiry(formData);

      setSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          companyName: '',
          contactPerson: '',
          email: '',
          phone: '',
          message: '',
          products: [],
          emailVerified: false,
          phoneVerified: false
        });
        setSuccess(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 3000);
    } catch (err) {
      setError(err.message || 'Failed to submit bulk enquiry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Bulk enquiry submitted successfully! We'll contact you soon with a quotation.
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper elevation={0} sx={{ p: 3, mb: 3, border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom fontWeight={600}>
          Company Information
        </Typography>

        <TextField
          fullWidth
          label="Company Name"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          error={!!errors.companyName}
          helperText={errors.companyName}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="Contact Person"
          name="contactPerson"
          value={formData.contactPerson}
          onChange={handleChange}
          error={!!errors.contactPerson}
          helperText={errors.contactPerson}
          margin="normal"
          required
        />

        <Box sx={{ mt: 2 }}>
          <EmailVerification
            email={formData.email}
            onEmailChange={(email) => setFormData({ ...formData, email })}
            onVerified={handleEmailVerified}
            error={errors.email || errors.emailVerified}
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <OTPVerification
            phone={formData.phone}
            onPhoneChange={(phone) => setFormData({ ...formData, phone })}
            onVerified={handlePhoneVerified}
            error={errors.phone || errors.phoneVerified}
          />
        </Box>
      </Paper>

      <Paper elevation={0} sx={{ p: 3, mb: 3, border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom fontWeight={600}>
          Product Selection
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
          <Autocomplete
            fullWidth
            options={products}
            getOptionLabel={(option) => `${option.name} (${option.productCode})`}
            value={selectedProduct}
            onChange={(event, newValue) => setSelectedProduct(newValue)}
            renderInput={(params) => (
              <TextField {...params} label="Select Product" />
            )}
          />

          <TextField
            type="number"
            label="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            InputProps={{ inputProps: { min: 1 } }}
            sx={{ width: { xs: '100%', md: 150 } }}
          />

          <Button
            variant="contained"
            onClick={handleAddProduct}
            disabled={!selectedProduct}
            startIcon={<Add />}
            sx={{ width: { xs: '100%', md: 'auto' }, minWidth: 120 }}
          >
            Add
          </Button>
        </Box>

        {errors.products && (
          <Typography color="error" variant="caption" sx={{ mt: 1, display: 'block' }}>
            {errors.products}
          </Typography>
        )}

        {formData.products.length > 0 && (
          <TableContainer sx={{ mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product Code</TableCell>
                  <TableCell>Product Name</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {formData.products.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>{product.productCode}</TableCell>
                    <TableCell>{product.productName}</TableCell>
                    <TableCell align="center">{product.quantity}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleRemoveProduct(index)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      <Paper elevation={0} sx={{ p: 3, mb: 3, border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom fontWeight={600}>
          Additional Information
        </Typography>

        <TextField
          fullWidth
          label="Message (Optional)"
          name="message"
          value={formData.message}
          onChange={handleChange}
          multiline
          rows={4}
          margin="normal"
          placeholder="Any special requirements or notes..."
        />
      </Paper>

      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={loading || !formData.emailVerified || !formData.phoneVerified || formData.products.length === 0}
        startIcon={loading && <CircularProgress size={20} />}
        fullWidth
      >
        Submit Bulk Enquiry
      </Button>
    </Box>
  );
};

export default BulkEnquiryForm;