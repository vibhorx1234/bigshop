import React from 'react';
import { Box } from '@mui/material';
import HeroSection from '../components/home/HeroSection';
import CategoryShowcase from '../components/home/CategoryShowcase';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Testimonials from '../components/home/Testimonials';
import ParallaxSvgBackground from '../components/common/ParallaxSvgBackground';

const Home = () => {
  return (
    <Box>
      <ParallaxSvgBackground>
        <HeroSection />
      </ParallaxSvgBackground>
        <CategoryShowcase />
        <FeaturedProducts />
        <Testimonials />
    </Box>
  );
};

export default Home;