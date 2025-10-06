import React from 'react';
import { Box, useTheme } from '@mui/material';

const AnimatedBackground = ({ children }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: theme.palette.mode === 'dark'
            ? 'radial-gradient(circle at 20% 50%, rgba(211, 47, 47, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(211, 47, 47, 0.08) 0%, transparent 50%)'
            : 'radial-gradient(circle at 20% 50%, rgba(211, 47, 47, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(211, 47, 47, 0.03) 0%, transparent 50%)',
          pointerEvents: 'none',
          zIndex: 0
        }
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {children}
      </Box>
    </Box>
  );
};

export default AnimatedBackground;