import React, { useState, useEffect } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  useTheme
} from '@mui/material';
import { ShoppingCart, Visibility } from '@mui/icons-material';
import { formatPrice } from '../../utils/helpers';
import { motion } from 'framer-motion';
import { AnimatedCard } from '../../styles/globalStyles';

const ProductCard = ({ product, onViewDetails, onEnquire, filterScreenSize }) => {
  const theme = useTheme();

  const hasVariants = product.variants?.length > 0;

  const [selectedVariant, setSelectedVariant] = useState(
    hasVariants ? product.variants[0] : null
  );

  useEffect(() => {
    if (!hasVariants) return;
    if (filterScreenSize !== undefined) {
      const match = product.variants.find(v => v.screenSize === filterScreenSize);
      if (match) setSelectedVariant(match);
    }
  }, [filterScreenSize]);

  const displayPrice = hasVariants ? selectedVariant.price : product.price;
  const displayMrp = hasVariants ? selectedVariant.mrp : product.mrp;
  const displayInStock = hasVariants ? selectedVariant.inStock : product.inStock;
  const discountPercentage = displayMrp && displayPrice < displayMrp
    ? Math.round(((displayMrp - displayPrice) / displayMrp) * 100)
    : 0;

  return (
    <AnimatedCard
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card
        sx={{
          height: hasVariants ? '600px' : '540px', // LINE 1: ADJUST TOTAL CARD HEIGHT
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          borderRadius: 3
        }}
      >
        {/* Stock Badge */}
        {!displayInStock && (
          <Chip
            label="Out of Stock"
            color="error"
            size="small"
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              zIndex: 1,
              fontWeight: 600
            }}
          />
        )}

        {/* Discount Badge */}
        {discountPercentage > 0 && displayInStock && (
          <Chip
            label={`${discountPercentage}% OFF`}
            color="error"
            size="small"
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              zIndex: 1,
              fontWeight: 600
            }}
          />
        )}

        {/* Energy Rating Badge */}
        {product.energyRating && (
          <Chip
            label={`${product.energyRating} Rating`}
            color="success"
            size="small"
            sx={{
              position: 'absolute',
              top: 16,
              left: 16,
              zIndex: 1,
              fontWeight: 600
            }}
          />
        )}

        {/* Product Image - Square Container with More Space */}
        <Box
          sx={{
            width: '100%',
            height: '280px', // LINE 2: ADJUST IMAGE AREA HEIGHT
            position: 'relative',
            bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            cursor: 'pointer'
          }}
          onClick={() => onViewDetails(product, selectedVariant?.screenSize)}
        >
          <CardMedia
            component="img"
            image={product.images[0] || '/placeholder-product.png'}
            alt={product.name}
            sx={{
              maxWidth: '90%',
              maxHeight: '90%',
              objectFit: 'contain',
              p: 2
            }}
          />
        </Box>

        {/* Product Details - Adjusted Height and Spacing */}
        <CardContent
          sx={{
            flexGrow: 1,
            pb: 1,
            pt: 0, // LINE 3: ADJUST TOP PADDING (space from image to category)
            px: 2,
            height: hasVariants ? '240px' : '180px', // LINE 4: ADJUST CONTENT AREA HEIGHT
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography
            gutterBottom
            variant="body2"
            color="primary"
            sx={{
              fontWeight: 600,
              textTransform: 'uppercase',
              fontSize: '0.75rem',
              mb: 0.5 // LINE 5: ADJUST SPACE BETWEEN CATEGORY AND TITLE
            }}
          >
            {product.category}
          </Typography>

          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontWeight: 600,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              height: '3em',
              lineHeight: '1.5em',
              mb: 0, // LINE 6: ADJUST SPACE BETWEEN TITLE AND DESCRIPTION (reduced from 0.75)
              cursor: 'pointer',
              '&:hover': {
                color: 'primary.main'
              }
            }}
            onClick={() => onViewDetails(product, selectedVariant?.screenSize)}
          >
            {product.name}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              height: '2.8em',
              lineHeight: '1.4em',
              mb: 1 // LINE 7: ADJUST SPACE BETWEEN DESCRIPTION AND PRICE (increased from 0.75)
            }}
          >
            {product.description}
          </Typography>

          {hasVariants && (
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 1 }}>
              {product.variants.map((variant) => (
                <Chip
                  key={variant.screenSize}
                  label={`${variant.screenSize}"`}
                  size="small"
                  variant={selectedVariant?.screenSize === variant.screenSize ? 'filled' : 'outlined'}
                  color={selectedVariant?.screenSize === variant.screenSize ? 'primary' : 'default'}
                  disabled={!variant.inStock}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedVariant(variant);
                  }}
                  sx={{ cursor: 'pointer', fontSize: '0.7rem' }}
                />
              ))}
            </Box>
          )}

          {/* Price Section - Fixed Layout */}
          <Box sx={{ mt: 'auto' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 0.5 }}>
              <Typography variant="h5" color="primary" fontWeight={700}>
                {formatPrice(displayPrice)}
              </Typography>
              {displayMrp && displayPrice < displayMrp && (
                <>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      textDecoration: 'line-through'
                    }}
                  >
                    {formatPrice(displayMrp)}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'success.main',
                      fontWeight: 600,
                      bgcolor: 'success.lighter',
                      px: 1,
                      py: 0.25,
                      borderRadius: 1
                    }}
                  >
                    Save {discountPercentage}%
                  </Typography>
                </>
              )}
            </Box>

            <Typography variant="caption" color="text.secondary">
              {hasVariants ? `${product.variants.length} size options available` : `Product Code: ${product.productCode}`}
            </Typography>
          </Box>
        </CardContent>

        {/* Actions - Fixed Height */}
        <CardActions sx={{ p: 2, pt: 0, flexShrink: 0 }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Visibility />}
            onClick={() => onViewDetails(product, selectedVariant?.screenSize)}
            sx={{ mr: 1 }}
          >
            View Details
          </Button>
          <Button
            fullWidth
            variant="contained"
            startIcon={<ShoppingCart />}
            onClick={() => onEnquire(product)}
            disabled={!displayInStock}
          >
            Enquire
          </Button>
        </CardActions>
      </Card>
    </AnimatedCard>
  );
};

export default ProductCard;