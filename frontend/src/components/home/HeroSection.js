// import React, { useEffect, useRef, useState } from 'react';
// import {
//   Box,
//   Container,
//   Typography,
//   Button,
//   Grid,
//   useTheme
// } from '@mui/material';
// import { ArrowForward, ShoppingCart } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { fadeInUp, fadeInRight } from '../../styles/animations';
// import heroImage from '../../assets/images/hero-appliances.png';

// const HeroSection = () => {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const containerRef = useRef(null);
//   const [offsetY, setOffsetY] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (containerRef.current) {
//         const rect = containerRef.current.getBoundingClientRect();
//         const scrollPosition = window.pageYOffset;
        
//         // Calculate parallax offset when element is in viewport
//         if (rect.top < window.innerHeight && rect.bottom > 0) {
//           // Parallax effect - background moves slower than scroll
//           const offset = scrollPosition * 0.5; // 0.5 is the parallax speed
//           setOffsetY(offset);
//         }
//       }
//     };

//     window.addEventListener('scroll', handleScroll, { passive: true });
//     handleScroll(); // Initial calculation

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   return (
//     <Box
//       ref={containerRef}
//       sx={{
//         position: 'relative',
//         minHeight: '100vh',
//         display: 'flex',
//         alignItems: 'flex-start',
//         paddingTop: { xs: '40px', md: '60px' },
//         overflow: 'hidden',
//         background: 'linear-gradient(120deg, #000000 40%, #101820 100%)',
//       }}
//     >
//       {/* Background Image Layer with Parallax - Only for Hero Section */}
//       <Box
//         sx={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           zIndex: 0,
//           backgroundImage: `url(${heroImage})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           backgroundRepeat: 'no-repeat',
//           transform: `translateY(${offsetY}px)`,
//           transition: 'transform 0.1s ease-out',
//           willChange: 'transform',
//           opacity: 0.6,
//         }}
//       />

//       {/* Dark overlay for better text readability */}
//       <Box
//         sx={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           zIndex: 1,
//           background: 'linear-gradient(120deg, rgba(0,0,0,0.7) 40%, rgba(16,24,32,0.8) 100%)',
//         }}
//       />

//       <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
//         <Grid container spacing={4}>
//           <Grid item xs={12} md={6}>
//             <motion.div
//               initial="hidden"
//               animate="visible"
//               variants={fadeInUp}
//               style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 150px)' }}
//             >
//               <Typography
//                 variant="overline"
//                 sx={{ 
//                   fontWeight: 600, 
//                   fontSize: '1rem', 
//                   mb: 2, 
//                   display: 'block',
//                   color: '#E63946',
//                   letterSpacing: '2px',
//                 }}
//               >
//                 Welcome to BigShop
//               </Typography>

//               <Typography
//                 variant="h2"
//                 component="h1"
//                 gutterBottom
//                 sx={{
//                   fontWeight: 800,
//                   fontSize: { xs: '2.8rem', md: '4rem' },
//                   lineHeight: 1.2,
//                   mb: 3,
//                   background: 'linear-gradient(135deg, #00D9FF 0%, #00A8CC 50%, #0088AA 100%)',
//                   WebkitBackgroundClip: 'text',
//                   WebkitTextFillColor: 'transparent',
//                   backgroundClip: 'text',
//                   fontFamily: "'Poppins', 'Montserrat', sans-serif",
//                 }}
//               >
//                 Smart Living Starts Here
//               </Typography>

//               <Typography
//                 variant="h6"
//                 paragraph
//                 sx={{
//                   mb: 4,
//                   maxWidth: 600,
//                   color: '#EAEAEA',
//                   fontSize: { xs: '1rem', md: '1.2rem' },
//                   lineHeight: 1.6,
//                   fontFamily: "'Roboto', 'Open Sans', sans-serif",
//                   fontWeight: 400,
//                 }}
//               >
//                 Experience the perfect blend of innovation and comfort with our premium range of smart appliances — designed to make your home smarter, cleaner, and more efficient.
//               </Typography>

//               <Box sx={{ flexGrow: 1, minHeight: { xs: '120px', md: '200px' } }} />

//               <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
//                 <Button
//                   variant="contained"
//                   size="large"
//                   endIcon={<ArrowForward />}
//                   onClick={() => navigate('/products')}
//                   sx={{
//                     px: 4,
//                     py: 1.5,
//                     fontSize: '1.1rem',
//                     borderRadius: 3,
//                     backgroundColor: '#E63946',
//                     color: '#FFFFFF',
//                     fontWeight: 600,
//                     textTransform: 'none',
//                     '&:hover': {
//                       backgroundColor: '#D62839',
//                       transform: 'translateY(-2px)',
//                       boxShadow: '0 6px 20px rgba(230, 57, 70, 0.4)',
//                     },
//                     transition: 'all 0.3s ease',
//                   }}
//                 >
//                   Shop Smart Now
//                 </Button>

//                 <Button
//                   variant="outlined"
//                   size="large"
//                   endIcon={<ShoppingCart />}
//                   onClick={() => navigate('/bulk-enquiry')}
//                   sx={{
//                     px: 4,
//                     py: 1.5,
//                     fontSize: '1.1rem',
//                     borderRadius: 3,
//                     borderColor: '#E63946',
//                     color: '#E63946',
//                     fontWeight: 600,
//                     textTransform: 'none',
//                     borderWidth: 2,
//                     '&:hover': {
//                       backgroundColor: '#E63946',
//                       color: '#FFFFFF',
//                       borderColor: '#E63946',
//                       transform: 'translateY(-2px)',
//                       boxShadow: '0 6px 20px rgba(230, 57, 70, 0.4)',
//                     },
//                     transition: 'all 0.3s ease',
//                   }}
//                 >
//                   Request Bulk Quote
//                 </Button>
//               </Box>
//             </motion.div>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <motion.div
//               initial="hidden"
//               animate="visible"
//               variants={fadeInRight}
//             >
//               <Box
//                 sx={{
//                   position: 'relative',
//                   display: 'flex',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   minHeight: 400
//                 }}
//               >
//                 {/* Empty space for visual balance */}
//               </Box>
//             </motion.div>
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//   );
// };

// export default HeroSection;




import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  useTheme
} from '@mui/material';
import { ArrowForward, ShoppingCart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeInUp, fadeInRight } from '../../styles/animations';
import heroImage from '../../assets/images/hero-appliances.png';

const HeroSection = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        paddingTop: { xs: '40px', md: '60px' },
        overflow: 'hidden',
        background: 'linear-gradient(120deg, #000000 40%, #101820 100%)',
      }}
    >
      {/* Background Image Layer - Fixed */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          opacity: 0.6,
        }}
      />

      {/* Dark overlay for better text readability */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          background: 'linear-gradient(120deg, rgba(0,0,0,0.7) 40%, rgba(16,24,32,0.8) 100%)',
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 150px)' }}
            >
              <Typography
                variant="overline"
                sx={{ 
                  fontWeight: 600, 
                  fontSize: '1rem', 
                  mb: 2, 
                  display: 'block',
                  color: '#E63946',
                  letterSpacing: '2px',
                }}
              >
                Welcome to BigShop
              </Typography>

              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2.8rem', md: '4rem' },
                  lineHeight: 1.2,
                  mb: 3,
                  background: 'linear-gradient(135deg, #00D9FF 0%, #00A8CC 50%, #0088AA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontFamily: "'Poppins', 'Montserrat', sans-serif",
                }}
              >
                Smart Living Starts Here
              </Typography>

              <Typography
                variant="h6"
                paragraph
                sx={{
                  mb: 4,
                  maxWidth: 600,
                  color: '#EAEAEA',
                  fontSize: { xs: '1rem', md: '1.2rem' },
                  lineHeight: 1.6,
                  fontFamily: "'Roboto', 'Open Sans', sans-serif",
                  fontWeight: 400,
                }}
              >
                Experience the perfect blend of innovation and comfort with our premium range of smart appliances — designed to make your home smarter, cleaner, and more efficient.
              </Typography>

              <Box sx={{ flexGrow: 1, minHeight: { xs: '120px', md: '200px' } }} />

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  onClick={() => navigate('/products')}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    borderRadius: 3,
                    backgroundColor: '#E63946',
                    color: '#FFFFFF',
                    fontWeight: 600,
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#D62839',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(230, 57, 70, 0.4)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Shop Smart Now
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  endIcon={<ShoppingCart />}
                  onClick={() => navigate('/bulk-enquiry')}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    borderRadius: 3,
                    borderColor: '#E63946',
                    color: '#E63946',
                    fontWeight: 600,
                    textTransform: 'none',
                    borderWidth: 2,
                    '&:hover': {
                      backgroundColor: '#E63946',
                      color: '#FFFFFF',
                      borderColor: '#E63946',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(230, 57, 70, 0.4)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Request Bulk Quote
                </Button>
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInRight}
            >
              <Box
                sx={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: 400
                }}
              >
                {/* Empty space for visual balance */}
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;