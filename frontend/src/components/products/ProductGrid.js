import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';
import { stagger } from '../../styles/animations';

const ProductGrid = ({ products, onViewDetails, onEnquire }) => {
  if (!products || products.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '400px',
          gap: 2
        }}
      >
        <Typography variant="h5" color="text.secondary">
          No products found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Try adjusting your filters or search criteria
        </Typography>
      </Box>
    );
  }

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} key={product._id}>
            <ProductCard
              product={product}
              onViewDetails={onViewDetails}
              onEnquire={onEnquire}
            />
          </Grid>
        ))}
      </Grid>
    </motion.div>
  );
};

export default ProductGrid;