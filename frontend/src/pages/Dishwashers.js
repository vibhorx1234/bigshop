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
import { getProductsByCategory } from '../services/productService';
import { fadeInUp } from '../styles/animations';
import ParallaxSvgBackground from '../components/common/ParallaxSvgBackground';

const Dishwashers = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // ── Dynamic price range — recomputed on every filter change ────────────────
  const [filteredPriceRange, setFilteredPriceRange] = useState({ min: 0, max: 0 });

  const [filters, setFilters] = useState({
    minPrice: undefined,
    maxPrice: undefined,
    inStock: undefined,
    // Dishwasher-specific
    dwType: undefined,          // string[]  e.g. ['Free Standing']
    placeSettings: undefined,   // number[]  e.g. [14, 15]
    hasTrueSteam: undefined,    // true | undefined
    hasQuadWash: undefined,     // true | undefined
    hasAutoOpenDoor: undefined, // true | undefined
    hasWifi: undefined,         // true | undefined
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [enquiryProduct, setEnquiryProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [products, searchTerm, sortBy, filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProductsByCategory('Dishwashers');
      setProducts(data);

      // Set initial price range from full product list
      const allMrps = data.map(p => p.mrp ?? p.price ?? 0).filter(v => v > 0);
      if (allMrps.length > 0) {
        setFilteredPriceRange({
          min: Math.floor(Math.min(...allMrps) / 5000) * 5000,
          max: Math.ceil(Math.max(...allMrps) / 50000) * 50000,
        });
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSort = () => {
    let result = [...products];

    // ── Text search ──────────────────────────────────────────────────────────
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term) ||
        p.tags?.some(t => t.toLowerCase().includes(term))
      );
    }

    // ── Price range ──────────────────────────────────────────────────────────
    if (filters.minPrice !== undefined) {
      result = result.filter(p => (p.mrp ?? p.price ?? 0) >= filters.minPrice);
    }
    if (filters.maxPrice !== undefined) {
      result = result.filter(p => (p.mrp ?? p.price ?? 0) <= filters.maxPrice);
    }

    // ── In stock ─────────────────────────────────────────────────────────────
    if (filters.inStock === true) {
      result = result.filter(p => p.inStock === true);
    }

    // ── Dishwasher Type (multi-select) ───────────────────────────────────────
    if (filters.dwType?.length) {
      result = result.filter(p =>
        filters.dwType.includes(p.specifications?.['Type'])
      );
    }

    // ── Place Settings (multi-select) ────────────────────────────────────────
    if (filters.placeSettings?.length) {
      result = result.filter(p => {
        const ps = parseInt(p.specifications?.['Place Settings'] ?? '0');
        return filters.placeSettings.includes(ps);
      });
    }

    // ── Feature flags ────────────────────────────────────────────────────────
    if (filters.hasTrueSteam) {
      result = result.filter(p =>
        p.tags?.includes('TrueSteam') ||
        p.features?.some(f => f.toLowerCase().includes('truesteam'))
      );
    }
    if (filters.hasQuadWash) {
      result = result.filter(p =>
        p.tags?.includes('QuadWash') ||
        p.features?.some(f => f.toLowerCase().includes('quadwash'))
      );
    }
    if (filters.hasAutoOpenDoor) {
      result = result.filter(p =>
        p.specifications?.['Auto Open Door'] === 'Yes' ||
        p.tags?.includes('Auto Open Door')
      );
    }
    if (filters.hasWifi) {
      result = result.filter(p =>
        p.specifications?.['WiFi']?.toLowerCase().includes('yes') ||
        p.tags?.includes('Wi-Fi')
      );
    }

    // ── Sort ─────────────────────────────────────────────────────────────────
    switch (sortBy) {
      case 'price-low-high':
        result.sort((a, b) => (a.price ?? a.mrp ?? 0) - (b.price ?? b.mrp ?? 0));
        break;
      case 'price-high-low':
        result.sort((a, b) => (b.price ?? b.mrp ?? 0) - (a.price ?? a.mrp ?? 0));
        break;
      case 'name-a-z':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-z-a':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    // ── Recompute price range from results EXCLUDING the price filter itself ─
    // This ensures the slider bounds reflect only the other active filters,
    // avoiding a feedback loop where dragging shrinks its own range.
    let priceRangeBase = [...products];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      priceRangeBase = priceRangeBase.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term) ||
        p.tags?.some(t => t.toLowerCase().includes(term))
      );
    }
    if (filters.inStock === true) {
      priceRangeBase = priceRangeBase.filter(p => p.inStock === true);
    }
    if (filters.dwType?.length) {
      priceRangeBase = priceRangeBase.filter(p =>
        filters.dwType.includes(p.specifications?.['Type'])
      );
    }
    if (filters.placeSettings?.length) {
      priceRangeBase = priceRangeBase.filter(p => {
        const ps = parseInt(p.specifications?.['Place Settings'] ?? '0');
        return filters.placeSettings.includes(ps);
      });
    }
    if (filters.hasTrueSteam) {
      priceRangeBase = priceRangeBase.filter(p =>
        p.tags?.includes('TrueSteam') ||
        p.features?.some(f => f.toLowerCase().includes('truesteam'))
      );
    }
    if (filters.hasQuadWash) {
      priceRangeBase = priceRangeBase.filter(p =>
        p.tags?.includes('QuadWash') ||
        p.features?.some(f => f.toLowerCase().includes('quadwash'))
      );
    }
    if (filters.hasAutoOpenDoor) {
      priceRangeBase = priceRangeBase.filter(p =>
        p.specifications?.['Auto Open Door'] === 'Yes' ||
        p.tags?.includes('Auto Open Door')
      );
    }
    if (filters.hasWifi) {
      priceRangeBase = priceRangeBase.filter(p =>
        p.specifications?.['WiFi']?.toLowerCase().includes('yes') ||
        p.tags?.includes('Wi-Fi')
      );
    }

    const visibleMrps = priceRangeBase.map(p => p.mrp ?? p.price ?? 0).filter(v => v > 0);
    if (visibleMrps.length > 0) {
      setFilteredPriceRange({
        min: Math.floor(Math.min(...visibleMrps) / 5000) * 5000,
        max: Math.ceil(Math.max(...visibleMrps) / 50000) * 50000,
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
      dwType: undefined,
      placeSettings: undefined,
      hasTrueSteam: undefined,
      hasQuadWash: undefined,
      hasAutoOpenDoor: undefined,
      hasWifi: undefined,
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
    return <Loader message="Loading Dishwashers..." />;
  }

  const filterPanel = (
    <FilterPanel
      filters={filters}
      onFilterChange={handleFilterChange}
      onReset={handleResetFilters}
      category="Dishwashers"
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
              <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
                LG Dishwashers
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Automated dishwashing with QuadWash™ and TrueSteam™ technology
              </Typography>
            </motion.div>

            <Paper elevation={0} sx={{ p: 2, mb: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={8}>
                  <SearchBar onSearch={handleSearch} placeholder="Search dishwashers..." />
                </Grid>
                <Grid item xs={12} md={4}>
                  <SortDropdown value={sortBy} onChange={handleSortChange} />
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
              <Grid item xs={12} md={isMobile ? 12 : 9}>
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
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight={600}>Filters</Typography>
                <IconButton onClick={() => setFilterDrawerOpen(false)}>
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

export default Dishwashers;