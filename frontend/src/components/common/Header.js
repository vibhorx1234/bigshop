import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
  ListItemIcon
} from '@mui/material';
import {
  Menu as MenuIcon,
  Brightness4,
  Brightness7,
  KeyboardArrowDown,
  Close,
  Tv,
  AcUnit,
  LocalLaundryService,
  Kitchen,
  Flatware,
  Microwave,
  Speaker,
  AcUnitOutlined,
  WineBar,
  Inventory,
  Collections,
  HomeOutlined,
} from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useThemeContext } from '../../context/ThemeContext';
import { CATEGORIES } from '../../utils/constants';
import { motion } from 'framer-motion';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = useThemeContext();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [productsAnchorEl, setProductsAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Icon mapping for categories
  const categoryIcons = {
    'All': <Inventory />,
    'TV': <Tv />,
    'AC': <AcUnit />,
    'Washing Machine': <LocalLaundryService />,
    'Refrigerator': <Kitchen />,
    'Dishwashers': <LocalLaundryService />,
    'Microwave Ovens': <Microwave />,
    'LG Audio': <Speaker />,
    'Deep Freezer': <AcUnitOutlined />,
    'Visi Cooler': <WineBar />,
    'Homeware': <HomeOutlined />
  };

  const handleProductsMenuOpen = (event) => {
    setProductsAnchorEl(event.currentTarget);
  };

  const handleProductsMenuClose = () => {
    setProductsAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileOpen(false);
    handleProductsMenuClose();
  };

  // Check if current path matches
  const isActive = (path) => location.pathname === path;
  const isProductsActive = location.pathname.startsWith('/products');

  // Gradient underline style
  const activeUnderlineStyle = {
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'fit-content',
      minWidth: '60%',
      height: '3px',
      background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
      borderRadius: '2px',
    }
  };

  const drawer = (
    <Box sx={{ width: 280 }}>
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        bgcolor: 'primary.main',
        color: 'white'
      }}>
        <Typography variant="h6">BigShop</Typography>
        <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
          <Close />
        </IconButton>
      </Box>
      <Divider />
      <List>
        <ListItem 
          button 
          onClick={() => handleNavigation('/')}
          sx={{ 
            bgcolor: isActive('/') ? 'action.selected' : 'transparent',
            borderLeft: isActive('/') ? `4px solid ${theme.palette.primary.main}` : 'none'
          }}
        >
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem 
          button 
          onClick={() => handleNavigation('/about')}
          sx={{ 
            bgcolor: isActive('/about') ? 'action.selected' : 'transparent',
            borderLeft: isActive('/about') ? `4px solid ${theme.palette.primary.main}` : 'none'
          }}
        >
          <ListItemText primary="About" />
        </ListItem>
        <Divider sx={{ my: 1 }} />
        <ListItem>
          <ListItemText 
            primary="Products" 
            primaryTypographyProps={{ 
              variant: 'subtitle2', 
              color: 'primary',
              fontWeight: 600 
            }} 
          />
        </ListItem>
        {CATEGORIES.map((category) => (
          <ListItem 
            key={category.value} 
            button 
            onClick={() => handleNavigation(category.path)}
            sx={{ 
              pl: 4,
              bgcolor: isActive(category.path) ? 'action.selected' : 'transparent',
              borderLeft: isActive(category.path) ? `4px solid ${theme.palette.primary.main}` : 'none'
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              {categoryIcons[category.value]}
            </ListItemIcon>
            <ListItemText primary={category.name} />
          </ListItem>
        ))}
        <Divider sx={{ my: 1 }} />
        <ListItem 
          button 
          onClick={() => handleNavigation('/gallery')}
          sx={{ 
            bgcolor: isActive('/gallery') ? 'action.selected' : 'transparent',
            borderLeft: isActive('/gallery') ? `4px solid ${theme.palette.primary.main}` : 'none'
          }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>
            <Collections />
          </ListItemIcon>
          <ListItemText primary="Gallery" />
        </ListItem>
        <ListItem 
          button 
          onClick={() => handleNavigation('/bulk-enquiry')}
          sx={{ 
            bgcolor: isActive('/bulk-enquiry') ? 'action.selected' : 'transparent',
            borderLeft: isActive('/bulk-enquiry') ? `4px solid ${theme.palette.primary.main}` : 'none'
          }}
        >
          <ListItemText primary="Bulk Enquiry" />
        </ListItem>
        <ListItem 
          button 
          onClick={() => handleNavigation('/contact')}
          sx={{ 
            bgcolor: isActive('/contact') ? 'action.selected' : 'transparent',
            borderLeft: isActive('/contact') ? `4px solid ${theme.palette.primary.main}` : 'none'
          }}
        >
          <ListItemText primary="Contact" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar 
      position="sticky" 
      color="default" 
      elevation={0}
      sx={{ 
        borderBottom: `1px solid ${theme.palette.divider}`,
        bgcolor: isDarkMode ? 'background.paper' : 'background.default'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h5"
              component={Link}
              to="/"
              sx={{
                fontWeight: 700,
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              BigShop
            </Typography>
          </motion.div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Button 
                component={Link} 
                to="/" 
                color="inherit"
                sx={{ 
                  fontWeight: 500,
                  ...(isActive('/') && activeUnderlineStyle)
                }}
              >
                Home
              </Button>
              <Button 
                component={Link} 
                to="/about" 
                color="inherit"
                sx={{ 
                  fontWeight: 500,
                  ...(isActive('/about') && activeUnderlineStyle)
                }}
              >
                About
              </Button>
              <Button
                color="inherit"
                onClick={handleProductsMenuOpen}
                endIcon={<KeyboardArrowDown />}
                sx={{ 
                  fontWeight: 500,
                  ...(isProductsActive && activeUnderlineStyle)
                }}
              >
                Products
              </Button>
              <Menu
                anchorEl={productsAnchorEl}
                open={Boolean(productsAnchorEl)}
                onClose={handleProductsMenuClose}
                PaperProps={{
                  elevation: 8,
                  sx: { 
                    mt: 1.5,
                    minWidth: 600,
                    borderRadius: 2,
                    overflow: 'visible',
                    '&::before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <Box sx={{ p: 2 }}>
                  <Typography 
                    variant="overline" 
                    sx={{ 
                      px: 1, 
                      color: 'text.secondary',
                      fontWeight: 600,
                      letterSpacing: 1
                    }}
                  >
                    Browse Products
                  </Typography>
                  <Grid container spacing={1} sx={{ mt: 1 }}>
                    {CATEGORIES.map((category) => (
                      <Grid item xs={6} key={category.value}>
                        <MenuItem
                          onClick={() => handleNavigation(category.path)}
                          sx={{
                            borderRadius: 1.5,
                            py: 1.5,
                            px: 2,
                            transition: 'all 0.2s',
                            bgcolor: isActive(category.path) ? 'primary.main' : 'transparent',
                            color: isActive(category.path) ? 'white' : 'inherit',
                            '&:hover': {
                              bgcolor: 'primary.main',
                              color: 'white',
                              transform: 'translateY(-2px)',
                              '& .MuiListItemIcon-root': {
                                color: 'white'
                              }
                            },
                            '& .MuiListItemIcon-root': {
                              color: isActive(category.path) ? 'white' : 'primary.main'
                            }
                          }}
                        >
                          <ListItemIcon sx={{ 
                            minWidth: 40,
                            transition: 'color 0.2s'
                          }}>
                            {categoryIcons[category.value]}
                          </ListItemIcon>
                          <ListItemText 
                            primary={category.name}
                            primaryTypographyProps={{
                              fontWeight: 500,
                              fontSize: '0.95rem'
                            }}
                          />
                        </MenuItem>
                      </Grid>
                    ))}
                  </Grid>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    gap: 2 
                  }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleNavigation('/products')}
                      sx={{ borderRadius: 2 }}
                    >
                      View All Products
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleNavigation('/bulk-enquiry')}
                      sx={{ borderRadius: 2 }}
                    >
                      Bulk Order
                    </Button>
                  </Box>
                </Box>
              </Menu>
              <Button 
                component={Link} 
                to="/gallery" 
                color="inherit"
                sx={{ 
                  fontWeight: 500,
                  ...(isActive('/gallery') && activeUnderlineStyle)
                }}
              >
                Gallery
              </Button>
              <Button 
                component={Link} 
                to="/bulk-enquiry" 
                color="inherit"
                sx={{ 
                  fontWeight: 500,
                  ...(isActive('/bulk-enquiry') && activeUnderlineStyle)
                }}
              >
                Bulk Enquiry
              </Button>
              <Button 
                component={Link} 
                to="/contact" 
                color="inherit"
                sx={{ 
                  fontWeight: 500,
                  ...(isActive('/contact') && activeUnderlineStyle)
                }}
              >
                Contact
              </Button>
              
              <IconButton onClick={toggleTheme} color="inherit">
                {isDarkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Box>
          )}

          {/* Mobile Navigation */}
          {isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton onClick={toggleTheme} color="inherit">
                {isDarkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
              <IconButton
                color="inherit"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Header;