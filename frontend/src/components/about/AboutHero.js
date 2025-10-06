import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  useTheme
} from '@mui/material';
import { ArrowForward, ContactSupport } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeInUp, fadeInRight } from '../../styles/animations';
import heroAboutImage from '../../assets/images/hero-about1.png';

const AboutHero = () => {
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
        background: 'linear-gradient(135deg, #2C3E50 0%, #34495E 100%)',
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
          backgroundImage: `url(${heroAboutImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          opacity: 0.8,
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
          background: 'linear-gradient(180deg, rgba(0,0,0,0.7), rgba(0,0,0,0.4))',
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
                About Us
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
                Your Trusted Electronics Partner
              </Typography>

              <Typography
                variant="h6"
                paragraph
                sx={{
                  mb: 3,
                  maxWidth: 600,
                  color: '#F5F5DC',
                  fontSize: { xs: '1rem', md: '1.2rem' },
                  lineHeight: 1.6,
                  fontFamily: "'Roboto', 'Open Sans', sans-serif",
                  fontWeight: 400,
                }}
              >
                BigShop has been serving customers with premium electronics and home appliances for over a decade. We pride ourselves on providing quality products, excellent service, and expert guidance.
              </Typography>

              <Typography
                variant="body1"
                paragraph
                sx={{
                  mb: 4,
                  maxWidth: 600,
                  color: '#E5E5E5',
                  fontSize: { xs: '0.95rem', md: '1.1rem' },
                  lineHeight: 1.7,
                  fontFamily: "'Roboto', 'Open Sans', sans-serif",
                  fontWeight: 300,
                }}
              >
                Our mission is to make premium products accessible to everyone while ensuring the best customer experience from purchase to after-sales service.
              </Typography>

              <Box sx={{ flexGrow: 1, minHeight: { xs: '80px', md: '150px' } }} />

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
                    color: '#ffffff',
                    fontWeight: 600,
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#E63946',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(212, 175, 55, 0.4)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Explore Our Products
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  endIcon={<ContactSupport />}
                  onClick={() => navigate('/contact')}
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
                      color: '#1A1A1A',
                      borderColor: '#E63946',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(212, 175, 55, 0.4)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Contact Us
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
                {/* Empty space for visual balance - image is in background */}
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutHero;