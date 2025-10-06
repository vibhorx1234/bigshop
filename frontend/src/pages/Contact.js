import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  useTheme
} from '@mui/material';
import {
  LocationOn,
  Phone,
  Email,
  AccessTime
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import ContactForm from '../components/forms/ContactForm';
import AnimatedBackground from '../components/common/AnimatedBackground';
import { SHOP_INFO } from '../utils/constants';
import { fadeInUp, fadeInLeft, fadeInRight } from '../styles/animations';
import ParallaxSvgBackground from '../components/common/ParallaxSvgBackground';

const Contact = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <ParallaxSvgBackground>
    <AnimatedBackground>
      <Box sx={{ py: 4 }}>
        <Container maxWidth="xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
                Contact Us
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                Get in touch with us for any queries, product information, or support
              </Typography>
            </Box>
          </motion.div>

          <Grid container spacing={4}>
            {/* Contact Information */}
            <Grid item xs={12} md={5}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInLeft}
              >
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h5" gutterBottom fontWeight={600}>
                    Get In Touch
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Visit our store or reach out to us through any of the following channels
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Card sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                    <CardContent sx={{ display: 'flex', gap: 2, p: 3 }}>
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: 'primary.main',
                          color: 'white',
                          flexShrink: 0
                        }}
                      >
                        <LocationOn />
                      </Box>
                      <Box>
                        <Typography variant="h6" gutterBottom fontWeight={600}>
                          Address
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {SHOP_INFO.address}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>

                  <Card sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                    <CardContent sx={{ display: 'flex', gap: 2, p: 3 }}>
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: 'primary.main',
                          color: 'white',
                          flexShrink: 0
                        }}
                      >
                        <Phone />
                      </Box>
                      <Box>
                        <Typography variant="h6" gutterBottom fontWeight={600}>
                          Phone
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {SHOP_INFO.phone}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>

                  <Card sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                    <CardContent sx={{ display: 'flex', gap: 2, p: 3 }}>
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: 'primary.main',
                          color: 'white',
                          flexShrink: 0
                        }}
                      >
                        <Email />
                      </Box>
                      <Box>
                        <Typography variant="h6" gutterBottom fontWeight={600}>
                          Email
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {SHOP_INFO.email}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>

                  <Card sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                    <CardContent sx={{ display: 'flex', gap: 2, p: 3 }}>
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: 'primary.main',
                          color: 'white',
                          flexShrink: 0
                        }}
                      >
                        <AccessTime />
                      </Box>
                      <Box>
                        <Typography variant="h6" gutterBottom fontWeight={600}>
                          Working Hours
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Mon - Fri: {SHOP_INFO.workingHours.weekdays}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Sat - Sun: {SHOP_INFO.workingHours.weekends}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </motion.div>
            </Grid>

            {/* Contact Form */}
            <Grid item xs={12} md={7}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInRight}
              >
                <ContactForm />
              </motion.div>
            </Grid>
          </Grid>

          {/* Google Maps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Paper
              elevation={0}
              sx={{
                mt: 6,
                borderRadius: 3,
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: isDarkMode ? 'grey.900' : 'background.paper'
              }}
            >
              <Box sx={{ p: 3, bgcolor: 'background.paper' }}>
                <Typography variant="h5" fontWeight={600}>
                  Find Us On Map
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Visit our store for personalized assistance
                </Typography>
              </Box>
              <Box
                sx={{
                  width: '100%',
                  height: 450,
                  position: 'relative',
                  bgcolor: isDarkMode ? 'grey.900' : 'grey.100',
                  '&::before': isDarkMode ? {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    bgcolor: 'rgba(0, 0, 0, 0.3)',
                    pointerEvents: 'none',
                    zIndex: 1,
                    mixBlendMode: 'multiply'
                  } : {}
                }}
              >
                <iframe
                  src={"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3559.9971164135864!2d75.7935409545898!3d26.8400440216064!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db5efbc94f641%3A0xb8af80904d2c23bf!2sLG%20Big%20Shop%20-%20Electronic%20Goods%20Showrooms%20in%20Jaipur!5e0!3m2!1sen!2sin!4v1759649114213!5m2!1sen!2sin"}
                  width="100%"
                  height="100%"
                  style={{ 
                    border: 0,
                    filter: isDarkMode ? 'grayscale(20%) brightness(0.85) contrast(1.1)' : 'none'
                  }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="BigShop Location"
                />
              </Box>
            </Paper>
          </motion.div>
        </Container>
      </Box>
    </AnimatedBackground>
    </ParallaxSvgBackground>
  );
};

export default Contact;