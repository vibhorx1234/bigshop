import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getFeaturedProducts } from '../../services/productService';
import ProductCard from '../products/ProductCard';
import ProductModal from '../products/ProductModal';
import EnquiryForm from '../forms/EnquiryForm';
import Loader from '../common/Loader';
import { motion } from 'framer-motion';
import { fadeInUp, stagger } from '../../styles/animations';

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [enquiryProduct, setEnquiryProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const data = await getFeaturedProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleEnquire = (product) => {
    setEnquiryProduct(product);
    setEnquiryOpen(true);
  };

  if (loading) {
    return <Loader message="Loading featured products..." />;
  }

  return (
    <Box sx={{ pt: { xs: 6, md: 10 }, pb: { xs: 4, md: 6 }, bgcolor: 'background.default' }}>
      <Container maxWidth="xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 5,
              flexWrap: 'wrap',
              gap: 2
            }}
          >
            <Box>
              <Typography
                variant="h3"
                component="h2"
                gutterBottom
                fontWeight={700}
              >
                Featured Products
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Discover our latest and most popular products
              </Typography>
            </Box>

            <Button
              variant="outlined"
              endIcon={<ArrowForward />}
              onClick={() => navigate('/products')}
              size="large"
            >
              View All Products
            </Button>
          </Box>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Grid container spacing={3}>
            {products.slice(0, 6).map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <ProductCard
                  product={product}
                  onViewDetails={handleViewDetails}
                  onEnquire={handleEnquire}
                />
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* Product Modal */}
      <ProductModal
        open={modalOpen}
        product={selectedProduct}
        onClose={() => setModalOpen(false)}
        onEnquire={handleEnquire}
      />

      {/* Enquiry Form */}
      <EnquiryForm
        open={enquiryOpen}
        product={enquiryProduct}
        onClose={() => setEnquiryOpen(false)}
      />
    </Box>
  );
};

export default FeaturedProducts;