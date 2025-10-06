import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Rating,
  Grid,
  useTheme
} from '@mui/material';
import { FormatQuote } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { fadeInUp, stagger } from '../../styles/animations';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Home Owner',
    rating: 5,
    comment: 'Excellent service and quality products! The team was very helpful in choosing the right TV for my home. Highly recommended!',
    avatar: 'R'
  },
  {
    name: 'Priya Sharma',
    role: 'Business Owner',
    rating: 5,
    comment: 'Purchased bulk refrigerators for our hotel. Great pricing and smooth delivery process. Very satisfied with LG BigShop.',
    avatar: 'P'
  },
  {
    name: 'Amit Patel',
    role: 'Homemaker',
    rating: 5,
    comment: 'The washing machine we bought has been amazing. Energy efficient and works perfectly. Customer support is also very responsive.',
    avatar: 'A'
  },
  {
    name: 'Sneha Reddy',
    role: 'IT Professional',
    rating: 5,
    comment: 'Bought multiple products including TV, refrigerator and microwave. All are working excellently. Best electronics store!',
    avatar: 'S'
  }
];

const Testimonials = () => {
  const theme = useTheme();

  return (
    <Box sx={{ pt: { xs: 4, md: 6 }, pb: { xs: 6, md: 10 }, bgcolor: 'background.default' }}>
      <Container maxWidth="xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              fontWeight={700}
            >
              What Our Customers Say
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Don't just take our word for it - hear from our satisfied customers
            </Typography>
          </Box>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Grid container spacing={3}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div variants={fadeInUp}>
                  <Card
                    sx={{
                      height: '100%',
                      borderRadius: 3,
                      position: 'relative',
                      border: '1px solid',
                      borderColor: 'divider',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: theme.palette.mode === 'dark'
                          ? '0 12px 40px rgba(211, 47, 47, 0.3)'
                          : '0 12px 40px rgba(211, 47, 47, 0.2)'
                      }
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <FormatQuote
                        sx={{
                          fontSize: 40,
                          color: 'primary.main',
                          opacity: 0.3,
                          mb: 2
                        }}
                      />

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        paragraph
                        sx={{ mb: 3, minHeight: 100 }}
                      >
                        {testimonial.comment}
                      </Typography>

                      <Rating
                        value={testimonial.rating}
                        readOnly
                        size="small"
                        sx={{ mb: 2 }}
                      />

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar
                          sx={{
                            bgcolor: 'primary.main',
                            width: 48,
                            height: 48
                          }}
                        >
                          {testimonial.avatar}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {testimonial.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {testimonial.role}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Testimonials;