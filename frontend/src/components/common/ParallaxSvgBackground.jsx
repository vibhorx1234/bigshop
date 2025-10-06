import React from 'react';
import { Box, useTheme } from '@mui/material';
import AppliancesHeroSvg from './AppliancesHeroSvg';

const ParallaxSvgBackground = ({ children }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        isolation: 'isolate',
        minHeight: '100vh'
      }}
    >
      {/* Fixed SVG Background Layer - Behind everything */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          zIndex: -1, // Behind everything
          opacity: theme.palette.mode === 'dark' ? 0.25 : 0.12,
          pointerEvents: 'none'
        }}
      >
        <AppliancesHeroSvg
          primaryColor={theme.palette.primary.main}
          secondaryColor={theme.palette.primary.light}
          accentColor={theme.palette.error.main}
          darkColor={theme.palette.mode === 'dark' ? '#94a3b8' : '#1e293b'}
          opacity={1}
        />
      </Box>

      {/* Content Layer - This scrolls normally */}
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {children}
      </Box>
    </Box>
  );
};

export default ParallaxSvgBackground;