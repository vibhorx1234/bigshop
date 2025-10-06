import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useThemeContext } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

const ThemeToggle = ({ size = 'medium' }) => {
  const { isDarkMode, toggleTheme } = useThemeContext();

  return (
    <Tooltip title={isDarkMode ? 'Light Mode' : 'Dark Mode'}>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <IconButton onClick={toggleTheme} color="inherit" size={size}>
          {isDarkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </motion.div>
    </Tooltip>
  );
};

export default ThemeToggle;