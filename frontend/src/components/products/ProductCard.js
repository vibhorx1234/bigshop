// import React from 'react';
// import {
//   Card,
//   CardMedia,
//   CardContent,
//   CardActions,
//   Typography,
//   Button,
//   Box,
//   Chip,
//   useTheme
// } from '@mui/material';
// import { ShoppingCart, Visibility } from '@mui/icons-material';
// import { formatPrice } from '../../utils/helpers';
// import { motion } from 'framer-motion';
// import { AnimatedCard } from '../../styles/globalStyles';

// const ProductCard = ({ product, onViewDetails, onEnquire }) => {
//   const theme = useTheme();

//   // Calculate discount percentage
//   const discountPercentage = product.mrp && product.price < product.mrp
//     ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
//     : 0;

//   return (
//     <AnimatedCard
//       component={motion.div}
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.5 }}
//     >
//       <Card
//         sx={{
//           height: '100%',
//           display: 'flex',
//           flexDirection: 'column',
//           position: 'relative',
//           borderRadius: 3
//         }}
//       >
//         {/* Stock Badge */}
//         {!product.inStock && (
//           <Chip
//             label="Out of Stock"
//             color="error"
//             size="small"
//             sx={{
//               position: 'absolute',
//               top: 16,
//               right: 16,
//               zIndex: 1,
//               fontWeight: 600
//             }}
//           />
//         )}

//         {/* Discount Badge */}
//         {discountPercentage > 0 && product.inStock && (
//           <Chip
//             label={`${discountPercentage}% OFF`}
//             color="error"
//             size="small"
//             sx={{
//               position: 'absolute',
//               top: 16,
//               right: 16,
//               zIndex: 1,
//               fontWeight: 600
//             }}
//           />
//         )}

//         {/* Energy Rating Badge */}
//         {product.energyRating && (
//           <Chip
//             label={`${product.energyRating} Rating`}
//             color="success"
//             size="small"
//             sx={{
//               position: 'absolute',
//               top: 16,
//               left: 16,
//               zIndex: 1,
//               fontWeight: 600
//             }}
//           />
//         )}

//         {/* Product Image */}
//         <CardMedia
//           component="img"
//           height="250"
//           image={product.images[0] || '/placeholder-product.png'}
//           alt={product.name}
//           sx={{
//             objectFit: 'contain',
//             bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
//             p: 2,
//             cursor: 'pointer'
//           }}
//           onClick={() => onViewDetails(product)}
//         />

//         {/* Product Details */}
//         <CardContent sx={{ flexGrow: 1, pb: 1 }}>
//           <Typography
//             gutterBottom
//             variant="body2"
//             color="primary"
//             sx={{ fontWeight: 600, textTransform: 'uppercase', fontSize: '0.75rem' }}
//           >
//             {product.category}
//           </Typography>

//           <Typography
//             variant="h6"
//             component="h3"
//             gutterBottom
//             sx={{
//               fontWeight: 600,
//               overflow: 'hidden',
//               textOverflow: 'ellipsis',
//               display: '-webkit-box',
//               WebkitLineClamp: 2,
//               WebkitBoxOrient: 'vertical',
//               minHeight: '3.6em',
//               cursor: 'pointer',
//               '&:hover': {
//                 color: 'primary.main'
//               }
//             }}
//             onClick={() => onViewDetails(product)}
//           >
//             {product.name}
//           </Typography>

//           <Typography
//             variant="body2"
//             color="text.secondary"
//             sx={{
//               overflow: 'hidden',
//               textOverflow: 'ellipsis',
//               display: '-webkit-box',
//               WebkitLineClamp: 2,
//               WebkitBoxOrient: 'vertical',
//               mb: 2
//             }}
//           >
//             {product.description}
//           </Typography>

//           {/* Price Section */}
//           <Box sx={{ mb: 1 }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
//               <Typography variant="h5" color="primary" fontWeight={700}>
//                 {formatPrice(product.price)}
//               </Typography>
//               {product.mrp && product.price < product.mrp && (
//                 <>
//                   <Typography
//                     variant="body2"
//                     color="text.secondary"
//                     sx={{
//                       textDecoration: 'line-through'
//                     }}
//                   >
//                     {formatPrice(product.mrp)}
//                   </Typography>
//                   <Typography
//                     variant="caption"
//                     sx={{
//                       color: 'success.main',
//                       fontWeight: 600,
//                       bgcolor: 'success.lighter',
//                       px: 1,
//                       py: 0.25,
//                       borderRadius: 1
//                     }}
//                   >
//                     Save {discountPercentage}%
//                   </Typography>
//                 </>
//               )}
//             </Box>
//           </Box>

//           <Typography variant="caption" color="text.secondary">
//             Product Code: {product.productCode}
//           </Typography>
//         </CardContent>

//         {/* Actions */}
//         <CardActions sx={{ p: 2, pt: 0 }}>
//           <Button
//             fullWidth
//             variant="outlined"
//             startIcon={<Visibility />}
//             onClick={() => onViewDetails(product)}
//             sx={{ mr: 1 }}
//           >
//             View Details
//           </Button>
//           <Button
//             fullWidth
//             variant="contained"
//             startIcon={<ShoppingCart />}
//             onClick={() => onEnquire(product)}
//             disabled={!product.inStock}
//           >
//             Enquire
//           </Button>
//         </CardActions>
//       </Card>
//     </AnimatedCard>
//   );
// };

// export default ProductCard;










import React from 'react';
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

const ProductCard = ({ product, onViewDetails, onEnquire }) => {
  const theme = useTheme();

  // Calculate discount percentage
  const discountPercentage = product.mrp && product.price < product.mrp
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
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
          height: '540px', // LINE 1: ADJUST TOTAL CARD HEIGHT
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          borderRadius: 3
        }}
      >
        {/* Stock Badge */}
        {!product.inStock && (
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
        {discountPercentage > 0 && product.inStock && (
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
          onClick={() => onViewDetails(product)}
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
            height: '180px', // LINE 4: ADJUST CONTENT AREA HEIGHT
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
            onClick={() => onViewDetails(product)}
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

          {/* Price Section - Fixed Layout */}
          <Box sx={{ mt: 'auto' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 0.5 }}>
              <Typography variant="h5" color="primary" fontWeight={700}>
                {formatPrice(product.price)}
              </Typography>
              {product.mrp && product.price < product.mrp && (
                <>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      textDecoration: 'line-through'
                    }}
                  >
                    {formatPrice(product.mrp)}
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
              Product Code: {product.productCode}
            </Typography>
          </Box>
        </CardContent>

        {/* Actions - Fixed Height */}
        <CardActions sx={{ p: 2, pt: 0, flexShrink: 0 }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Visibility />}
            onClick={() => onViewDetails(product)}
            sx={{ mr: 1 }}
          >
            View Details
          </Button>
          <Button
            fullWidth
            variant="contained"
            startIcon={<ShoppingCart />}
            onClick={() => onEnquire(product)}
            disabled={!product.inStock}
          >
            Enquire
          </Button>
        </CardActions>
      </Card>
    </AnimatedCard>
  );
};

export default ProductCard;