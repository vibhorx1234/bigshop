import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar
} from '@mui/material';
import { motion } from 'framer-motion';
import { fadeInUp, stagger } from '../../styles/animations';

const team = [
  {
    name: 'Rajendra Gupta',
    role: 'Founder',
    avatar: 'R',
    description: '15+ years in electronics retail industry'
  },
  {
    name: 'Apar Gupta',
    role: 'Sr. Manager',
    avatar: 'A',
    description: 'Expert in customer relations and sales'
  }
];

const TeamSection = () => {
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.default' }}>
      <Container maxWidth="xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" component="h2" gutterBottom fontWeight={700}>
              Meet Our Team
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Dedicated professionals committed to your satisfaction
            </Typography>
          </Box>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Grid container spacing={4} justifyContent="center">
            {team.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div variants={fadeInUp}>
                  <Card
                    sx={{
                      height: '100%',
                      borderRadius: 3,
                      textAlign: 'center',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-12px)',
                        boxShadow: '0 16px 48px rgba(211, 47, 47, 0.2)'
                      }
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Avatar
                        sx={{
                          width: 100,
                          height: 100,
                          mx: 'auto',
                          mb: 3,
                          bgcolor: 'primary.main',
                          fontSize: '2.5rem',
                          fontWeight: 700
                        }}
                      >
                        {member.avatar}
                      </Avatar>

                      <Typography variant="h6" gutterBottom fontWeight={600}>
                        {member.name}
                      </Typography>

                      <Typography 
                        variant="subtitle2" 
                        color="primary" 
                        gutterBottom 
                        fontWeight={500}
                        sx={{ mb: 2 }}
                      >
                        {member.role}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        {member.description}
                      </Typography>
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

export default TeamSection;