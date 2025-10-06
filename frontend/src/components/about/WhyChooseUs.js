import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    useTheme
} from '@mui/material';
import {
    VerifiedUser,
    LocalShipping,
    SupportAgent,
    Stars,
    Payment,
    ThumbUp
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { fadeInUp, stagger } from '../../styles/animations';

const features = [
    {
        icon: VerifiedUser,
        title: 'Authorized Dealer',
        description: 'Official LG & Voltas authorized dealer with genuine products and warranty',
        color: '#D32F2F'
    },
    {
        icon: Stars,
        title: 'Premium Quality',
        description: 'Only the best products with latest technology',
        color: '#1976D2'
    },
    {
        icon: SupportAgent,
        title: 'Expert Support',
        description: '24/7 customer support and after-sales service',
        color: '#388E3C'
    },
    {
        icon: LocalShipping,
        title: 'Fast Delivery',
        description: 'Quick and safe delivery to your doorstep',
        color: '#F57C00'
    },
    {
        icon: Payment,
        title: 'Flexible Payment',
        description: 'Multiple payment options and EMI facilities',
        color: '#7B1FA2'
    },
    {
        icon: ThumbUp,
        title: 'Trusted by Thousands',
        description: '15+ years of customer satisfaction and trust',
        color: '#0288D1'
    }
];

const WhyChooseUs = () => {
    const theme = useTheme();

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
                            Why Choose Us
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                            We go the extra mile to ensure you get the best products and service
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
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <motion.div variants={fadeInUp}>
                                        <Card
                                            sx={{
                                                height: '100%',
                                                borderRadius: 3,
                                                border: '1px solid',
                                                borderColor: 'divider',
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    transform: 'translateY(-8px)',
                                                    boxShadow: theme.palette.mode === 'dark'
                                                        ? `0 12px 40px ${feature.color}30`
                                                        : `0 12px 40px ${feature.color}20`
                                                }
                                            }}
                                        >
                                            <CardContent sx={{ p: 4 }}>
                                                <Box
                                                    sx={{
                                                        width: 70,
                                                        height: 70,
                                                        borderRadius: '50%',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        mb: 3,
                                                        background: `linear-gradient(135deg, ${feature.color}20 0%, ${feature.color}10 100%)`
                                                    }}
                                                >
                                                    <Icon sx={{ fontSize: 35, color: feature.color }} />
                                                </Box>
                                                <Typography variant="h6" gutterBottom fontWeight={600}>
                                                    {feature.title}
                                                </Typography>

                                                <Typography variant="body2" color="text.secondary">
                                                    {feature.description}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </Grid>
                            );
                        })}
                    </Grid>
                </motion.div>
            </Container>
        </Box>
    );
};
export default WhyChooseUs;