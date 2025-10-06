// import React, { useState } from 'react';
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

//   if (!product) return null;

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
//                   label={product.inStock ? 'In Stock' : 'Out of Stock'}
//                   color={product.inStock ? 'success' : 'error'}
//                   size="small"
//                 />
//                 {product.warranty && (
//                   <Chip label={product.warranty} variant="outlined" size="small" />
//                 )}
//               </Box>

//               <Typography variant="h4" color="primary" fontWeight={700} gutterBottom>
//                 {formatPrice(product.price)}
//               </Typography>

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
//                 Product Code: {product.productCode}
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
//           disabled={!product.inStock}
//           fullWidth={fullScreen}
//         >
//           Request Enquiry
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default ProductModal;










import React, { useState } from 'react';
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
import { motion, AnimatePresence } from 'framer-motion';

const ProductModal = ({ open, product, onClose, onEnquire }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  if (!product) return null;

  // Calculate discount percentage
  const discountPercentage = product.mrp && product.price < product.mrp
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
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
          maxHeight: '90vh'
        }
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
          '&:hover': {
            bgcolor: 'action.hover'
          }
        }}
      >
        <Close />
      </IconButton>

      <DialogContent sx={{ p: { xs: 2, md: 4 } }}>
        <Grid container spacing={4}>
          {/* Image Gallery */}
          <Grid item xs={12} md={6}>
            <ImageGallery images={product.images} videoUrl={product.videoUrl} />
          </Grid>

          {/* Product Details */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="overline"
                color="primary"
                sx={{ fontWeight: 600 }}
              >
                {product.category}
              </Typography>

              <Typography variant="h4" component="h2" gutterBottom fontWeight={700}>
                {product.name}
              </Typography>

              <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                {product.energyRating && (
                  <Chip
                    label={`${product.energyRating} Rating`}
                    color="success"
                    size="small"
                  />
                )}
                <Chip
                  label={product.inStock ? 'In Stock' : 'Out of Stock'}
                  color={product.inStock ? 'success' : 'error'}
                  size="small"
                />
                {product.warranty && (
                  <Chip label={product.warranty} variant="outlined" size="small" />
                )}
                {discountPercentage > 0 && (
                  <Chip
                    label={`${discountPercentage}% OFF`}
                    color="error"
                    size="small"
                  />
                )}
              </Box>

              {/* Price Section */}
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                  <Typography variant="h4" color="primary" fontWeight={700}>
                    {formatPrice(product.price)}
                  </Typography>
                  {product.mrp && product.price < product.mrp && (
                    <>
                      <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{
                          textDecoration: 'line-through'
                        }}
                      >
                        {formatPrice(product.mrp)}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'success.main',
                          fontWeight: 600,
                          bgcolor: 'success.lighter',
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 1
                        }}
                      >
                        You Save {formatPrice(product.mrp - product.price)} ({discountPercentage}%)
                      </Typography>
                    </>
                  )}
                </Box>
                {!product.mrp || product.price === product.mrp ? (
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
                    Best Price
                  </Typography>
                ) : null}
              </Box>

              <Typography variant="body1" color="text.secondary" paragraph>
                {product.description}
              </Typography>

              <Divider sx={{ my: 2 }} />

              {/* Specifications */}
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
                          borderBottom: `1px solid ${theme.palette.divider}`
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          {key}
                        </Typography>
                        <Typography variant="body2" fontWeight={500}>
                          {value}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </>
              )}

              {/* Features */}
              {product.features && product.features.length > 0 && (
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

              <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                Product Code: {product.productCode}
              </Typography>
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
          disabled={!product.inStock}
          fullWidth={fullScreen}
        >
          Request Enquiry
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductModal;