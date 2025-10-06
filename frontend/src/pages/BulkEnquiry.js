import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent
} from '@mui/material';
import {
  Business,
  LocalShipping,
  PriceCheck,
  SupportAgent
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import BulkEnquiryForm from '../components/forms/BulkEnquiryForm';
import AnimatedBackground from '../components/common/AnimatedBackground';
import { fadeInUp, stagger } from '../styles/animations';
import ParallaxSvgBackground from '../components/common/ParallaxSvgBackground';

const benefits = [
  {
    icon: PriceCheck,
    title: 'Special Pricing',
    description: 'Get competitive bulk pricing and exclusive discounts',
    color: '#D32F2F'
  },
  {
    icon: LocalShipping,
    title: 'Free Delivery',
    description: 'Complimentary delivery and installation for bulk orders',
    color: '#1976D2'
  },
  {
    icon: SupportAgent,
    title: 'Dedicated Support',
    description: 'Personal account manager for your business needs',
    color: '#388E3C'
  },
  {
    icon: Business,
    title: 'Business Solutions',
    description: 'Customized solutions for corporate and bulk buyers',
    color: '#F57C00'
  }
];

const BulkEnquiry = () => {
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
                Bulk Enquiry
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
                Looking to purchase in bulk? Get special pricing and dedicated support for your business needs.
                Fill out the form below and our team will contact you with a customized quotation.
              </Typography>
            </Box>
          </motion.div>

          {/* Benefits */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Grid container spacing={3} sx={{ mb: 6 }}>
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <motion.div variants={fadeInUp}>
                      <Card
                        sx={{
                          height: '100%',
                          textAlign: 'center',
                          borderRadius: 3,
                          border: '1px solid',
                          borderColor: 'divider',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: `0 12px 40px ${benefit.color}20`
                          }
                        }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <Box
                            sx={{
                              width: 70,
                              height: 70,
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mx: 'auto',
                              mb: 2,
                              background: `linear-gradient(135deg, ${benefit.color}20 0%, ${benefit.color}10 100%)`
                            }}
                          >
                            <Icon sx={{ fontSize: 35, color: benefit.color }} />
                          </Box>

                          <Typography variant="h6" gutterBottom fontWeight={600}>
                            {benefit.title}
                          </Typography>

                          <Typography variant="body2" color="text.secondary">
                            {benefit.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                );
              })}
            </Grid>
          </motion.div>

          {/* Bulk Enquiry Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <Typography variant="h5" gutterBottom fontWeight={600} sx={{ mb: 3 }}>
                Submit Your Bulk Enquiry
              </Typography>
              <BulkEnquiryForm />
            </Paper>
          </motion.div>
        </Container>
      </Box>
    </AnimatedBackground>
    </ParallaxSvgBackground>
  );
};

export default BulkEnquiry;