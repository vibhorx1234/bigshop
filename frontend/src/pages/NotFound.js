import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  useTheme
} from '@mui/material';
import { Home, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeInUp } from '../styles/animations';
import ParallaxSvgBackground from '../components/common/ParallaxSvgBackground';

const NotFound = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <ParallaxSvgBackground>
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px - 200px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '6rem', md: '10rem' },
                fontWeight: 800,
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2
              }}
            >
              404
            </Typography>

            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              fontWeight={700}
            >
              Page Not Found
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              paragraph
              sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}
            >
              Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
            </Typography>

            <Box
              sx={{
                display: 'flex',
                gap: 2,
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<Home />}
                onClick={() => navigate('/')}
                sx={{ px: 4 }}
              >
                Go Home
              </Button>

              <Button
                variant="outlined"
                size="large"
                startIcon={<ArrowBack />}
                onClick={() => navigate(-1)}
                sx={{ px: 4 }}
              >
                Go Back
              </Button>
            </Box>

            {/* Decorative 404 illustration */}
            <Box
              sx={{
                mt: 6,
                position: 'relative',
                width: '100%',
                maxWidth: 400,
                mx: 'auto'
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: 300,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}10 0%, ${theme.palette.primary.light}05 100%)`,
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography
                  variant="h2"
                  color="primary"
                  fontWeight={800}
                  sx={{ opacity: 0.3 }}
                >
                  Big Shop
                </Typography>
              </Box>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
    </ParallaxSvgBackground>
  );
};

export default NotFound;