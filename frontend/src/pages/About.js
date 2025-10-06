import React from 'react';
import { Box } from '@mui/material';
import AboutHero from '../components/about/AboutHero';
import CompanyHistory from '../components/about/CompanyHistory';
import WhyChooseUs from '../components/about/WhyChooseUs';
import TeamSection from '../components/about/TeamSection';
import ParallaxSvgBackground from '../components/common/ParallaxSvgBackground';

const About = () => {
  return (
    <Box>
      <ParallaxSvgBackground>
      <AboutHero />
      </ParallaxSvgBackground>
      <WhyChooseUs />
      <CompanyHistory />
      <TeamSection />
    </Box>
  );
};

export default About;