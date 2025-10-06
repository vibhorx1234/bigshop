import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Grid,
  useTheme
} from '@mui/material';
import {
  Tv,
  Kitchen,
  LocalLaundryService,
  Microwave,
  DinnerDining,
  AcUnit,
  Speaker,
  LocalDrink,
  HomeOutlined
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeInUp, stagger } from '../../styles/animations';
import { AnimatedCard } from '../../styles/globalStyles';

const categories = [
  {
    name: 'TV',
    icon: Tv,
    path: '/products/tv',
    description: 'OLED & LED Smart TVs',
    color: '#D32F2F'
  },
  {
    name: 'AC',
    icon: AcUnit,
    path: '/products/ac',
    description: 'Energy-efficient air conditioners.',
    color: '#00AEEF',
  },
  {
    name: 'Washing Machine',
    icon: LocalLaundryService,
    path: '/products/washing-machine',
    description: 'Front & Top Load',
    color: '#1976D2'
  },
  {
    name: 'Refrigerator',
    icon: Kitchen,
    path: '/products/refrigerator',
    description: 'All Sizes & Types',
    color: '#388E3C'
  },
  {
    name: 'Dishwashers',
    icon: LocalLaundryService,  // from @mui/icons-material
    path: '/products/dishwashers',
    description: 'Automated Cleaning',
    color: '#0288D1',
  },
  {
    name: 'Microwave Ovens',
    icon: Microwave,
    path: '/products/microwave-ovens',
    description: 'Convection & Solo',
    color: '#F57C00'
  },
  {
    name: 'LG Audio',
    icon: Speaker,
    path: '/products/audio',
    description: 'Premium LG audio systems',
    color: '#FF4C4C',
  },
  {
    name: 'Deep Freezer',
    icon: Kitchen,
    path: '/products/freezer',
    description: 'Reliable storage for businesses.',
    color: '#2ECC71',
  },
  {
    name: 'Visi Cooler',
    icon: LocalDrink,
    path: '/products/visi',
    description: 'Crystalline coolers for beverages.',
    color: '#F1C40F',
  },
  {
    name: 'Homeware',
    icon: HomeOutlined,  // from @mui/icons-material
    path: '/products/homeware',
    description: 'Everyday home comforts.',
    color: '#8E44AD',
  }

];

const CategoryShowcase = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.paper' }}>
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
              Shop by Category
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Explore our complete range of home appliances and electronics
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
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Grid item xs={12} sm={6} md={4} lg={2.4} key={category.name}>
                  <AnimatedCard
                    component={motion.div}
                    variants={fadeInUp}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        borderRadius: 3,
                        border: '1px solid',
                        borderColor: 'divider'
                      }}
                    >
                      <CardActionArea
                        onClick={() => navigate(category.path)}
                        sx={{ height: '100%', p: 3 }}
                      >
                        <CardContent sx={{ textAlign: 'center', p: 0 }}>
                          <Box
                            sx={{
                              width: 80,
                              height: 80,
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mx: 'auto',
                              mb: 2,
                              background: `linear-gradient(135deg, ${category.color}20 0%, ${category.color}10 100%)`,
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                background: `linear-gradient(135deg, ${category.color}30 0%, ${category.color}20 100%)`,
                                transform: 'scale(1.1)'
                              }
                            }}
                          >
                            <Icon sx={{ fontSize: 40, color: category.color }} />
                          </Box>

                          <Typography
                            variant="h6"
                            gutterBottom
                            fontWeight={600}
                          >
                            {category.name}
                          </Typography>

                          <Typography
                            variant="body2"
                            color="text.secondary"
                          >
                            {category.description}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </AnimatedCard>
                </Grid>
              );
            })}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default CategoryShowcase;