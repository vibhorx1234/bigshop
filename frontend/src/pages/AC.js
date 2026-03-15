import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  useMediaQuery,
  useTheme,
  Drawer,
  IconButton,
  Button
} from '@mui/material';
import { FilterList, Close } from '@mui/icons-material';
import { motion } from 'framer-motion';

import SearchBar from '../components/products/SearchBar';
import SortDropdown from '../components/products/SortDropdown';
import FilterPanel from '../components/products/FilterPanel';
import ProductGrid from '../components/products/ProductGrid';
import ProductModal from '../components/products/ProductModal';
import EnquiryForm from '../components/forms/EnquiryForm';
import Loader from '../components/common/Loader';
import AnimatedBackground from '../components/common/AnimatedBackground';
import ParallaxSvgBackground from '../components/common/ParallaxSvgBackground';

import { getProductsByCategory } from '../services/productService';
import { fadeInUp } from '../styles/animations';

const AC = () => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const [filteredPriceRange, setFilteredPriceRange] = useState({ min: 0, max: 0 });

  const [filters, setFilters] = useState({
    minPrice: undefined,
    maxPrice: undefined,
    inStock: undefined,

    acType: undefined,
    capacity: undefined,
    starRating: undefined,
    convertible: undefined,

    hasWifi: undefined,
    isHotCold: undefined,
    hasDietMode: undefined,
    hasViraatMode: undefined,
    hasGoldFin: undefined,
    hasADCSensor: undefined
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [enquiryProduct, setEnquiryProduct] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Helper to safely read Mongo specifications
  const getSpec = (product, ...keys) => {
    for (let key of keys) {
      if (product.specifications?.[key] !== undefined) {
        return product.specifications[key];
      }
    }
    return '';
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [products, searchTerm, sortBy, filters]);

  const fetchProducts = async () => {
    try {

      setLoading(true);

      const data = await getProductsByCategory('AC');

      setProducts(data);

      const allMrps = data
        .map(p => p.mrp ?? p.price ?? 0)
        .filter(v => v > 0);

      if (allMrps.length > 0) {
        setFilteredPriceRange({
          min: Math.floor(Math.min(...allMrps) / 5000) * 5000,
          max: Math.ceil(Math.max(...allMrps) / 10000) * 10000
        });
      }

    } catch (error) {
      console.error('Error fetching AC products:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSort = () => {

    let result = [...products];

    // Search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();

      result = result.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term) ||
        p.tags?.some(t => t.toLowerCase().includes(term))
      );
    }

    // Price
    if (filters.minPrice !== undefined) {
      result = result.filter(p => (p.mrp ?? p.price ?? 0) >= filters.minPrice);
    }

    if (filters.maxPrice !== undefined) {
      result = result.filter(p => (p.mrp ?? p.price ?? 0) <= filters.maxPrice);
    }

    // Stock
    if (filters.inStock === true) {
      result = result.filter(p => p.inStock === true);
    }

    // AC Type
    if (filters.acType?.length) {
      result = result.filter(p => {
        const type = getSpec(p, 'AC Type', 'acType');
        return filters.acType.includes(type);
      });
    }

    // Capacity
    if (filters.capacity?.length) {
      result = result.filter(p => {
        const cap = getSpec(p, 'Capacity', 'capacity');
        return filters.capacity.includes(cap);
      });
    }

    // Star Rating
    if (filters.starRating?.length) {
      result = result.filter(p => {
        const star = getSpec(p, 'Star Rating', 'starRating');
        return filters.starRating.includes(star);
      });
    }

    // Convertible
    if (filters.convertible?.length) {
      result = result.filter(p => {
        const conv = getSpec(p, 'AI Convertible', 'convertible');
        return filters.convertible.some(c =>
          conv.toLowerCase().includes(c.toLowerCase())
        );
      });
    }

    // WiFi
    if (filters.hasWifi) {
      result = result.filter(p => {
        const wifi = getSpec(p, 'WiFi', 'wifi');
        return wifi.toLowerCase().includes('yes') ||
          p.tags?.some(t => t.toLowerCase().includes('wifi'));
      });
    }

    // Hot & Cold
    if (filters.isHotCold) {
      result = result.filter(p => {
        const hotCold = getSpec(p, 'Hot & Cold', 'hotCold');
        return hotCold.toLowerCase() === 'yes';
      });
    }

    // Diet Mode
    if (filters.hasDietMode) {
      result = result.filter(p => {
        const diet = getSpec(p, 'Diet Mode+', 'dietMode');
        return diet.toLowerCase() === 'yes';
      });
    }

    // Viraat Mode
    if (filters.hasViraatMode) {
      result = result.filter(p => {
        const viraat = getSpec(p, 'Viraat Mode', 'viraatMode');
        return viraat.toLowerCase() === 'yes';
      });
    }

    // Gold Fin
    if (filters.hasGoldFin) {
      result = result.filter(p => {
        const gold = getSpec(p, 'Gold Fin+', 'goldFin');
        return gold.toLowerCase() === 'yes';
      });
    }

    // ADC Sensor
    if (filters.hasADCSensor) {
      result = result.filter(p => {
        const adc = getSpec(p, 'ADC Sensor', 'adcSensor');
        return adc.toLowerCase() === 'yes';
      });
    }

    // Sorting
    switch (sortBy) {

      case 'price-low-high':
        result.sort((a, b) => (a.price ?? a.mrp ?? 0) - (b.price ?? b.mrp ?? 0));
        break;

      case 'price-high-low':
        result.sort((a, b) => (b.price ?? a.mrp ?? 0) - (a.price ?? b.mrp ?? 0));
        break;

      case 'name-a-z':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case 'name-z-a':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;

      default:
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    // Price Range Update
    const visibleMrps = result
      .map(p => p.mrp ?? p.price ?? 0)
      .filter(v => v > 0);

    if (visibleMrps.length > 0) {
      setFilteredPriceRange({
        min: Math.floor(Math.min(...visibleMrps) / 5000) * 5000,
        max: Math.ceil(Math.max(...visibleMrps) / 10000) * 10000
      });
    }

    setFilteredProducts(result);
  };

  const handleSearch = (term) => setSearchTerm(term);
  const handleSortChange = (value) => setSortBy(value);
  const handleFilterChange = (newFilters) => setFilters(newFilters);

  const handleResetFilters = () => {

    setFilters({
      minPrice: undefined,
      maxPrice: undefined,
      inStock: undefined,
      acType: undefined,
      capacity: undefined,
      starRating: undefined,
      convertible: undefined,
      hasWifi: undefined,
      isHotCold: undefined,
      hasDietMode: undefined,
      hasViraatMode: undefined,
      hasGoldFin: undefined,
      hasADCSensor: undefined
    });

    setSearchTerm('');
    setSortBy('newest');
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleEnquire = (product) => {
    setEnquiryProduct(product);
    setEnquiryOpen(true);
  };

  if (loading) {
    return <Loader message="Loading ACs..." />;
  }

  const filterPanel = (
    <FilterPanel
      filters={filters}
      onFilterChange={handleFilterChange}
      onReset={handleResetFilters}
      category="AC"
      products={products}
      priceMin={filteredPriceRange.min}
      priceMax={filteredPriceRange.max}
    />
  );

  return (
    <ParallaxSvgBackground>
      <AnimatedBackground>

        <Box sx={{ py: 4 }}>

          <Container maxWidth="xl">

            <motion.div initial="hidden" animate="visible" variants={fadeInUp}>

              <Typography variant="h3" fontWeight={700} gutterBottom>
                LG Air Conditioners
              </Typography>

              <Typography variant="body1" color="text.secondary">
                Energy-efficient split and window ACs with AI Convertible cooling
              </Typography>

            </motion.div>

            <Paper
              elevation={0}
              sx={{
                p: 2,
                mb: 3,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider'
              }}
            >

              <Grid container spacing={2} alignItems="center">

                <Grid item xs={12} md={8}>
                  <SearchBar
                    onSearch={handleSearch}
                    placeholder="Search air conditioners..."
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <SortDropdown
                    value={sortBy}
                    onChange={handleSortChange}
                  />
                </Grid>

              </Grid>

            </Paper>

            {isMobile && (
              <Box sx={{ mb: 2 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<FilterList />}
                  onClick={() => setFilterDrawerOpen(true)}
                >
                  Filters
                </Button>
              </Box>
            )}

            <Grid container spacing={3}>

              {!isMobile && (
                <Grid item md={3}>
                  {filterPanel}
                </Grid>
              )}

              <Grid item xs={12} md={9}>
                <ProductGrid
                  products={filteredProducts}
                  onViewDetails={handleViewDetails}
                  onEnquire={handleEnquire}
                />
              </Grid>

            </Grid>

          </Container>

          <Drawer
            anchor="left"
            open={filterDrawerOpen}
            onClose={() => setFilterDrawerOpen(false)}
          >

            <Box sx={{ width: 300, p: 2 }}>

              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 2
              }}>

                <Typography variant="h6">Filters</Typography>

                <IconButton
                  onClick={() => setFilterDrawerOpen(false)}
                >
                  <Close />
                </IconButton>

              </Box>

              {filterPanel}

            </Box>

          </Drawer>

          <ProductModal
            open={modalOpen}
            product={selectedProduct}
            onClose={() => setModalOpen(false)}
            onEnquire={handleEnquire}
          />

          <EnquiryForm
            open={enquiryOpen}
            product={enquiryProduct}
            onClose={() => setEnquiryOpen(false)}
          />

        </Box>

      </AnimatedBackground>
    </ParallaxSvgBackground>
  );
};

export default AC;