import { useThemeContext } from '../context/ThemeContext';

const useTheme = () => {
  const { isDarkMode, toggleTheme } = useThemeContext();
  
  return {
    isDarkMode,
    toggleTheme,
    theme: isDarkMode ? 'dark' : 'light'
  };
};

export default useTheme;