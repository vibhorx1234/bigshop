import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  useTheme
} from '@mui/material';
import {
  Store,
  EmojiEvents,
  Groups,
  TrendingUp
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const milestones = [
  {
    year: '2008',
    title: 'Store Opening',
    description: 'BigShop opened its doors in Jaipur',
    icon: Store,
    color: '#D32F2F'
  },
  {
    year: '2015',
    title: 'Award Recognition',
    description: 'Received Best LG Dealer Award',
    icon: EmojiEvents,
    color: '#F57C00'
  },
  {
    year: '2018',
    title: 'Team Expansion',
    description: 'Grew to a team of 20+ professionals',
    icon: Groups,
    color: '#1976D2'
  },
  {
    year: '2024',
    title: 'Market Leader',
    description: 'Became the leading LG retailer in the region',
    icon: TrendingUp,
    color: '#388E3C'
  }
];

const CompanyHistory = () => {
  const theme = useTheme();

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.paper', overflow: 'hidden' }}>
      <Container maxWidth="xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
            <Typography 
              variant="h3" 
              component="h2" 
              gutterBottom 
              fontWeight={700}
              sx={{ fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}
            >
              Our Journey
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary" 
              sx={{ maxWidth: 600, mx: 'auto', px: 2 }}
            >
              From a small store to a leading electronics retailer
            </Typography>
          </Box>
        </motion.div>

        {/* Desktop & Tablet Horizontal Timeline */}
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                md: 'repeat(4, 1fr)',
              },
              gap: { md: 3, lg: 4, xl: 5 },
              maxWidth: { md: 1200, lg: 1400 },
              mx: 'auto',
              px: { md: 2, lg: 3 }
            }}
          >
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              return (
                <Box
                  key={index}
                  sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    style={{ width: '100%', height: '100%' }}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        minHeight: { md: '280px', lg: '300px', xl: '320px' },
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 3,
                        border: `3px solid ${milestone.color}`,
                        bgcolor: 'background.paper',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-12px)',
                          boxShadow: `0 20px 60px ${milestone.color}60`
                        }
                      }}
                    >
                      <CardContent
                        sx={{
                          p: { md: 2.5, lg: 3, xl: 3.5 },
                          textAlign: 'center',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          height: '100%'
                        }}
                      >
                        <Box
                          sx={{
                            width: { md: 70, lg: 80, xl: 90 },
                            height: { md: 70, lg: 80, xl: 90 },
                            borderRadius: '50%',
                            background: milestone.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: `0 8px 24px ${milestone.color}50`,
                            mb: 2
                          }}
                        >
                          <Icon sx={{ fontSize: { md: 35, lg: 40, xl: 45 }, color: 'white' }} />
                        </Box>

                        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                          <Typography
                            variant="h4"
                            sx={{
                              color: milestone.color,
                              fontWeight: 800,
                              mb: 1.5,
                              fontSize: { md: '1.8rem', lg: '2rem', xl: '2.3rem' }
                            }}
                          >
                            {milestone.year}
                          </Typography>

                          <Typography 
                            variant="h6" 
                            fontWeight={600} 
                            gutterBottom
                            sx={{ fontSize: { md: '1rem', lg: '1.1rem', xl: '1.3rem' } }}
                          >
                            {milestone.title}
                          </Typography>

                          <Typography 
                            variant="body2" 
                            color="text.secondary"
                            sx={{ fontSize: { md: '0.85rem', lg: '0.9rem', xl: '0.95rem' } }}
                          >
                            {milestone.description}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Connecting Line - Positioned in grid gap */}
                  {index < milestones.length - 1 && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '100%',
                        width: { md: '24px', lg: '32px', xl: '40px' },
                        height: 4,
                        background: `linear-gradient(90deg, ${milestone.color} 0%, ${milestones[index + 1].color} 100%)`,
                        transform: 'translateY(-50%)',
                        zIndex: 0
                      }}
                    />
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* Mobile Vertical Timeline */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: { xs: 4, sm: 5 }, 
              position: 'relative',
              px: { xs: 2, sm: 3 }
            }}>
              {/* Vertical connecting line */}
              <Box
                sx={{
                  position: 'absolute',
                  left: '50%',
                  top: { xs: '80px', sm: '90px' },
                  bottom: { xs: '80px', sm: '90px' },
                  width: { xs: 3, sm: 4 },
                  background: `linear-gradient(180deg, ${milestones[0].color} 0%, ${milestones[milestones.length - 1].color} 100%)`,
                  borderRadius: 2,
                  transform: 'translateX(-50%)',
                  zIndex: 0
                }}
              />

              {milestones.map((milestone, index) => {
                const Icon = milestone.icon;
                return (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                  >
                    <Card
                      sx={{
                        minHeight: { xs: '220px', sm: '240px' },
                        borderRadius: { xs: 2, sm: 3 },
                        border: { xs: `2px solid ${milestone.color}`, sm: `3px solid ${milestone.color}` },
                        bgcolor: 'background.paper',
                        position: 'relative',
                        zIndex: 1
                      }}
                    >
                      <CardContent sx={{ p: { xs: 2.5, sm: 3 }, textAlign: 'center' }}>
                        <Box
                          sx={{
                            width: { xs: 64, sm: 76 },
                            height: { xs: 64, sm: 76 },
                            borderRadius: '50%',
                            background: milestone.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: `0 6px 20px ${milestone.color}50`,
                            mx: 'auto',
                            mb: 2
                          }}
                        >
                          <Icon sx={{ fontSize: { xs: 32, sm: 38 }, color: 'white' }} />
                        </Box>

                        <Box>
                          <Typography
                            variant="h5"
                            sx={{
                              color: milestone.color,
                              fontWeight: 700,
                              mb: 1.5,
                              fontSize: { xs: '1.4rem', sm: '1.6rem' }
                            }}
                          >
                            {milestone.year}
                          </Typography>

                          <Typography 
                            variant="h6" 
                            fontWeight={600} 
                            gutterBottom
                            sx={{ fontSize: { xs: '1.05rem', sm: '1.15rem' } }}
                          >
                            {milestone.title}
                          </Typography>

                          <Typography 
                            variant="body2" 
                            color="text.secondary"
                            sx={{ fontSize: { xs: '0.875rem', sm: '0.9rem' } }}
                          >
                            {milestone.description}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </Box>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default CompanyHistory;