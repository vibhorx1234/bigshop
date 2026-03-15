// import React, { useState, useEffect } from 'react';
// import {
//   Dialog,
//   DialogContent,
//   DialogActions,
//   IconButton,
//   Typography,
//   Box,
//   Button,
//   Grid,
//   Chip,
//   Divider,
//   useTheme,
//   useMediaQuery
// } from '@mui/material';
// import { Close, ShoppingCart } from '@mui/icons-material';
// import ImageGallery from './ImageGallery';
// import { formatPrice } from '../../utils/helpers';
// import { motion, AnimatePresence } from 'framer-motion';

// const ProductModal = ({ open, product, onClose, onEnquire }) => {
//   const theme = useTheme();
//   const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
//   const [selectedVariant, setSelectedVariant] = useState(
//     product?.variants?.find(v => v.screenSize === product.initialSize)
//     || product?.variants?.[0]
//     || null
//   );

//   useEffect(() => {
//     if (product?.variants?.length) {
//       setSelectedVariant(
//         product.variants.find(v => v.screenSize === product.initialSize)
//         || product.variants[0]
//       );
//     }
//   }, [product]);

//   if (!product) return null;

//   // Calculate discount percentage
//   const discountPercentage = selectedVariant?.mrp && selectedVariant?.price < selectedVariant?.mrp
//     ? Math.round(((selectedVariant?.mrp - selectedVariant?.price) / selectedVariant?.mrp) * 100)
//     : 0;

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       maxWidth="lg"
//       fullWidth
//       fullScreen={fullScreen}
//       PaperProps={{
//         sx: {
//           borderRadius: fullScreen ? 0 : 3,
//           maxHeight: '90vh'
//         }
//       }}
//     >
//       {/* Close Button */}
//       <IconButton
//         onClick={onClose}
//         sx={{
//           position: 'absolute',
//           right: 8,
//           top: 8,
//           zIndex: 1,
//           bgcolor: 'background.paper',
//           '&:hover': {
//             bgcolor: 'action.hover'
//           }
//         }}
//       >
//         <Close />
//       </IconButton>

//       <DialogContent sx={{ p: { xs: 2, md: 4 } }}>
//         <Grid container spacing={4}>
//           {/* Image Gallery */}
//           <Grid item xs={12} md={6}>
//             <ImageGallery images={product.images} videoUrl={product.videoUrl} />
//           </Grid>

//           {/* Product Details */}
//           <Grid item xs={12} md={6}>
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               <Typography
//                 variant="overline"
//                 color="primary"
//                 sx={{ fontWeight: 600 }}
//               >
//                 {product.category}
//               </Typography>

//               <Typography variant="h4" component="h2" gutterBottom fontWeight={700}>
//                 {product.name}
//               </Typography>

//               <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
//                 {product.energyRating && (
//                   <Chip
//                     label={`${product.energyRating} Rating`}
//                     color="success"
//                     size="small"
//                   />
//                 )}
//                 <Chip
//                   label={selectedVariant?.inStock ? 'In Stock' : 'Out of Stock'}
//                   color={selectedVariant?.inStock ? 'success' : 'error'}
//                   size="small"
//                 />
//                 {product.warranty && (
//                   <Chip label={product.warranty} variant="outlined" size="small" />
//                 )}
//                 {discountPercentage > 0 && (
//                   <Chip
//                     label={`${discountPercentage}% OFF`}
//                     color="error"
//                     size="small"
//                   />
//                 )}
//               </Box>

//               {product.variants?.length > 0 && (
//                 <Box sx={{ mb: 2 }}>
//                   <Typography variant="subtitle2" fontWeight={600} gutterBottom>
//                     Screen Size
//                   </Typography>
//                   <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
//                     {product.variants.map((variant) => (
//                       <Button
//                         key={variant.screenSize}
//                         size="small"
//                         variant={selectedVariant?.screenSize === variant.screenSize ? 'contained' : 'outlined'}
//                         disabled={!variant.inStock}
//                         onClick={() => setSelectedVariant(variant)}
//                       >
//                         {variant.screenSize}"
//                       </Button>
//                     ))}
//                   </Box>
//                 </Box>
//               )}

//               {/* Price Section */}
//               <Box sx={{ mb: 2 }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
//                   <Typography variant="h4" color="primary" fontWeight={700}>
//                     {formatPrice(selectedVariant?.price)}
//                   </Typography>
//                   {selectedVariant?.mrp && selectedVariant?.price < selectedVariant?.mrp && (
//                     <>
//                       <Typography
//                         variant="h6"
//                         color="text.secondary"
//                         sx={{
//                           textDecoration: 'line-through'
//                         }}
//                       >
//                         {formatPrice(selectedVariant?.mrp)}
//                       </Typography>
//                       <Typography
//                         variant="body2"
//                         sx={{
//                           color: 'success.main',
//                           fontWeight: 600,
//                           bgcolor: 'success.lighter',
//                           px: 1.5,
//                           py: 0.5,
//                           borderRadius: 1
//                         }}
//                       >
//                         You Save {formatPrice(selectedVariant?.mrp - selectedVariant?.price)} ({discountPercentage}%)
//                       </Typography>
//                     </>
//                   )}
//                 </Box>
//                 {!selectedVariant?.mrp || selectedVariant?.price === selectedVariant?.mrp ? (
//                   <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
//                     Best Price
//                   </Typography>
//                 ) : null}
//               </Box>

//               <Typography variant="body1" color="text.secondary" paragraph>
//                 {product.description}
//               </Typography>

//               <Divider sx={{ my: 2 }} />

//               {/* Specifications */}
//               {product.specifications && Object.keys(product.specifications).length > 0 && (
//                 <>
//                   <Typography variant="h6" gutterBottom fontWeight={600}>
//                     Specifications
//                   </Typography>
//                   <Box sx={{ mb: 3 }}>
//                     {Object.entries(product.specifications).map(([key, value]) => (
//                       <Box
//                         key={key}
//                         sx={{
//                           display: 'flex',
//                           justifyContent: 'space-between',
//                           py: 1,
//                           borderBottom: `1px solid ${theme.palette.divider}`
//                         }}
//                       >
//                         <Typography variant="body2" color="text.secondary">
//                           {key}
//                         </Typography>
//                         <Typography variant="body2" fontWeight={500}>
//                           {value}
//                         </Typography>
//                       </Box>
//                     ))}
//                   </Box>
//                 </>
//               )}

//               {/* Features */}
//               {product.features && product.features.length > 0 && (
//                 <>
//                   <Typography variant="h6" gutterBottom fontWeight={600}>
//                     Key Features
//                   </Typography>
//                   <Box component="ul" sx={{ pl: 2, mb: 2 }}>
//                     {product.features.map((feature, index) => (
//                       <Typography
//                         component="li"
//                         key={index}
//                         variant="body2"
//                         color="text.secondary"
//                         sx={{ mb: 0.5 }}
//                       >
//                         {feature}
//                       </Typography>
//                     ))}
//                   </Box>
//                 </>
//               )}

//               <Typography variant="caption" color="text.secondary" display="block" mb={2}>
//                 Product Code: {selectedVariant?.productCode}
//               </Typography>
//             </motion.div>
//           </Grid>
//         </Grid>
//       </DialogContent>

//       <DialogActions sx={{ p: 3, pt: 0 }}>
//         <Button
//           variant="contained"
//           size="large"
//           startIcon={<ShoppingCart />}
//           onClick={() => {
//             onEnquire(product);
//             onClose();
//           }}
//           disabled={!selectedVariant?.inStock}
//           fullWidth={fullScreen}
//         >
//           Request Enquiry
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default ProductModal;





import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
  Button,
  Grid,
  Chip,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Close, ShoppingCart } from '@mui/icons-material';
import ImageGallery from './ImageGallery';
import { formatPrice } from '../../utils/helpers';
import { motion } from 'framer-motion';

// ─────────────────────────────────────────────────────────────────────────────
// ProductModal
//
// Supports two product shapes:
//
//  TV  — has `variants[]` where each variant carries screenSize, price, mrp,
//         productCode, inStock.  The modal renders size-chip selectors and
//         reads price/stock from the selected variant.
//
//  WM  — price, mrp, inStock, productCode live directly on the product object.
//         No variant selector is shown.
//
// Both shapes may also carry top-level price/mrp/inStock as fallbacks.
// ─────────────────────────────────────────────────────────────────────────────

const ProductModal = ({ open, product, onClose, onEnquire }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  // ── Determine whether this product uses the variant model (TV) or not (WM) ─
  const hasVariants = Array.isArray(product?.variants) && product.variants.length > 0;

  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    if (!product) return;
    if (hasVariants) {
      setSelectedVariant(
        product.variants.find(v => v.screenSize === product.initialSize)
        ?? product.variants[0]
      );
    } else {
      setSelectedVariant(null);
    }
  }, [product]);

  if (!product) return null;

  // ── Resolve display values from either the selected variant or the product ──
  // For TV:  use selectedVariant fields
  // For WM:  use top-level product fields
  const displayPrice   = hasVariants
    ? selectedVariant?.price
    : (product.price ?? product.mrp);

  const displayMrp     = hasVariants
    ? selectedVariant?.mrp
    : product.mrp;

  const displayInStock = hasVariants
    ? (selectedVariant?.inStock ?? false)
    : (product.inStock ?? false);

  const displayCode    = hasVariants
    ? selectedVariant?.productCode
    : product.productCode;

  // ── Discount ────────────────────────────────────────────────────────────────
  const discountPercentage =
    displayMrp && displayPrice < displayMrp
      ? Math.round(((displayMrp - displayPrice) / displayMrp) * 100)
      : 0;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      fullScreen={fullScreen}
      PaperProps={{
        sx: {
          borderRadius: fullScreen ? 0 : 3,
          maxHeight: '90vh',
        },
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          zIndex: 1,
          bgcolor: 'background.paper',
          '&:hover': { bgcolor: 'action.hover' },
        }}
      >
        <Close />
      </IconButton>

      <DialogContent sx={{ p: { xs: 2, md: 4 } }}>
        <Grid container spacing={4}>
          {/* ── Image Gallery ── */}
          <Grid item xs={12} md={6}>
            <ImageGallery images={product.images} videoUrl={product.videoUrl} />
          </Grid>

          {/* ── Product Details ── */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Category label */}
              <Typography variant="overline" color="primary" sx={{ fontWeight: 600 }}>
                {product.category}
              </Typography>

              {/* Product name */}
              <Typography variant="h4" component="h2" gutterBottom fontWeight={700}>
                {product.name}
              </Typography>

              {/* Status chips */}
              <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                {product.energyRating && (
                  <Chip
                    label={`${product.energyRating} Rating`}
                    color="success"
                    size="small"
                  />
                )}
                <Chip
                  label={displayInStock ? 'In Stock' : 'Out of Stock'}
                  color={displayInStock ? 'success' : 'error'}
                  size="small"
                />
                {product.warranty && (
                  <Chip label={product.warranty} variant="outlined" size="small" />
                )}
                {discountPercentage > 0 && (
                  <Chip label={`${discountPercentage}% OFF`} color="error" size="small" />
                )}
              </Box>

              {/* ── Variant selector — shown for TV only ── */}
              {hasVariants && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                    Screen Size
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {product.variants.map((variant) => (
                      <Button
                        key={variant.screenSize}
                        size="small"
                        variant={
                          selectedVariant?.screenSize === variant.screenSize
                            ? 'contained'
                            : 'outlined'
                        }
                        disabled={!variant.inStock}
                        onClick={() => setSelectedVariant(variant)}
                      >
                        {variant.screenSize}"
                      </Button>
                    ))}
                  </Box>
                </Box>
              )}

              {/* ── Price section ── */}
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                  <Typography variant="h4" color="primary" fontWeight={700}>
                    {formatPrice(displayPrice)}
                  </Typography>

                  {displayMrp && displayPrice < displayMrp && (
                    <>
                      <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{ textDecoration: 'line-through' }}
                      >
                        {formatPrice(displayMrp)}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'success.main',
                          fontWeight: 600,
                          bgcolor: 'success.lighter',
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 1,
                        }}
                      >
                        You Save {formatPrice(displayMrp - displayPrice)} ({discountPercentage}%)
                      </Typography>
                    </>
                  )}
                </Box>

                {(!displayMrp || displayPrice === displayMrp) && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                    sx={{ mt: 0.5 }}
                  >
                    Best Price
                  </Typography>
                )}
              </Box>

              {/* Description */}
              <Typography variant="body1" color="text.secondary" paragraph>
                {product.description}
              </Typography>

              <Divider sx={{ my: 2 }} />

              {/* ── Specifications ── */}
              {product.specifications && Object.keys(product.specifications).length > 0 && (
                <>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Specifications
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <Box
                        key={key}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          py: 1,
                          borderBottom: `1px solid ${theme.palette.divider}`,
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          {key}
                        </Typography>
                        <Typography variant="body2" fontWeight={500} sx={{ textAlign: 'right', ml: 2 }}>
                          {value}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </>
              )}

              {/* ── Key Features ── */}
              {product.features?.length > 0 && (
                <>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Key Features
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                    {product.features.map((feature, index) => (
                      <Typography
                        component="li"
                        key={index}
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 0.5 }}
                      >
                        {feature}
                      </Typography>
                    ))}
                  </Box>
                </>
              )}

              {/* Product code */}
              {displayCode && (
                <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                  Product Code: {displayCode}
                </Typography>
              )}
            </motion.div>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<ShoppingCart />}
          onClick={() => {
            onEnquire(product);
            onClose();
          }}
          disabled={!displayInStock}
          fullWidth={fullScreen}
        >
          Request Enquiry
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductModal;