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

const WaterPurifier = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // ── Dynamic price range – recomputed on every filter change ────────────────
  const [filteredPriceRange, setFilteredPriceRange] = useState({ min: 0, max: 0 });

  const [filters, setFilters] = useState({
    minPrice: undefined,
    maxPrice: undefined,
    inStock: undefined,
    // WPR-specific
    purificationTech: undefined,  // string[]  e.g. ['RO + UV + Mineral Booster']
    hasRO: undefined,             // true | undefined
    hasUV: undefined,             // true | undefined
    hasUF: undefined,             // true | undefined
    hasMineralBooster: undefined, // true | undefined
    hasHMR: undefined,            // true | undefined
    hasUVinTank: undefined,       // true | undefined
    hasDigitalSterilizing: undefined, // true | undefined
    hasTrueMaintenance: undefined,    // true | undefined
    hasGlassTouch: undefined,         // true | undefined
    isNonElectric: undefined,         // true | undefined
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
      const data = await getProductsByCategory('Water Purifier');
      setProducts(data);

      const allMrps = data.map(p => p.mrp ?? p.price ?? 0).filter(v => v > 0);
      if (allMrps.length > 0) {
        setFilteredPriceRange({
          min: Math.floor(Math.min(...allMrps) / 1000) * 1000,
          max: Math.ceil(Math.max(...allMrps) / 5000) * 5000,
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

    // ── Purification Technology (multi-select) ───────────────────────────────
    if (filters.purificationTech?.length) {
      result = result.filter(p =>
        filters.purificationTech.includes(p.specifications?.['Purification Technology'])
      );
    }

    // ── Feature flags ────────────────────────────────────────────────────────
    if (filters.hasRO) {
      result = result.filter(p =>
        p.specifications?.['RO Membrane'] === 'Yes' || p.tags?.includes('RO')
      );
    }
    if (filters.hasUV) {
      result = result.filter(p =>
        p.specifications?.['UV Purification'] === 'Yes' || p.tags?.includes('UV')
      );
    }
    if (filters.hasUF) {
      result = result.filter(p =>
        p.specifications?.['UF Purification'] === 'Yes' || p.tags?.includes('UF')
      );
    }
    if (filters.hasMineralBooster) {
      result = result.filter(p =>
        p.specifications?.['Mineral Booster'] === 'Yes' || p.tags?.includes('Mineral Booster')
      );
    }
    if (filters.hasHMR) {
      result = result.filter(p =>
        p.specifications?.['Heavy Metal Removal'] === 'Yes' || p.tags?.includes('HMR')
      );
    }
    if (filters.hasUVinTank) {
      result = result.filter(p =>
        p.specifications?.['UV in Tank'] === 'Yes' || p.tags?.includes('UV in Tank')
      );
    }
    if (filters.hasDigitalSterilizing) {
      result = result.filter(p =>
        p.specifications?.['Digital Sterilizing Care'] === 'Yes' ||
        p.tags?.includes('Digital Sterilizing Care')
      );
    }
    if (filters.hasTrueMaintenance) {
      result = result.filter(p =>
        p.specifications?.['True Maintenance'] === 'Yes' ||
        p.tags?.includes('True Maintenance')
      );
    }
    if (filters.hasGlassTouch) {
      result = result.filter(p =>
        p.specifications?.['Glass Touch Display'] === 'Yes' ||
        p.tags?.includes('Glass Touch Display')
      );
    }
    if (filters.isNonElectric) {
      result = result.filter(p =>
        p.specifications?.['Electricity Required'] === 'No'
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

    // ── Recompute price range EXCLUDING price filter (no feedback loop) ──────
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
    if (filters.purificationTech?.length) {
      priceRangeBase = priceRangeBase.filter(p =>
        filters.purificationTech.includes(p.specifications?.['Purification Technology'])
      );
    }
    if (filters.hasRO) {
      priceRangeBase = priceRangeBase.filter(p =>
        p.specifications?.['RO Membrane'] === 'Yes' || p.tags?.includes('RO')
      );
    }
    if (filters.hasUV) {
      priceRangeBase = priceRangeBase.filter(p =>
        p.specifications?.['UV Purification'] === 'Yes' || p.tags?.includes('UV')
      );
    }
    if (filters.hasUF) {
      priceRangeBase = priceRangeBase.filter(p =>
        p.specifications?.['UF Purification'] === 'Yes' || p.tags?.includes('UF')
      );
    }
    if (filters.hasMineralBooster) {
      priceRangeBase = priceRangeBase.filter(p =>
        p.specifications?.['Mineral Booster'] === 'Yes' || p.tags?.includes('Mineral Booster')
      );
    }
    if (filters.hasHMR) {
      priceRangeBase = priceRangeBase.filter(p =>
        p.specifications?.['Heavy Metal Removal'] === 'Yes' || p.tags?.includes('HMR')
      );
    }
    if (filters.hasUVinTank) {
      priceRangeBase = priceRangeBase.filter(p =>
        p.specifications?.['UV in Tank'] === 'Yes' || p.tags?.includes('UV in Tank')
      );
    }
    if (filters.hasDigitalSterilizing) {
      priceRangeBase = priceRangeBase.filter(p =>
        p.specifications?.['Digital Sterilizing Care'] === 'Yes' ||
        p.tags?.includes('Digital Sterilizing Care')
      );
    }
    if (filters.hasTrueMaintenance) {
      priceRangeBase = priceRangeBase.filter(p =>
        p.specifications?.['True Maintenance'] === 'Yes' || p.tags?.includes('True Maintenance')
      );
    }
    if (filters.hasGlassTouch) {
      priceRangeBase = priceRangeBase.filter(p =>
        p.specifications?.['Glass Touch Display'] === 'Yes' ||
        p.tags?.includes('Glass Touch Display')
      );
    }
    if (filters.isNonElectric) {
      priceRangeBase = priceRangeBase.filter(p =>
        p.specifications?.['Electricity Required'] === 'No'
      );
    }

    const visibleMrps = priceRangeBase.map(p => p.mrp ?? p.price ?? 0).filter(v => v > 0);
    if (visibleMrps.length > 0) {
      setFilteredPriceRange({
        min: Math.floor(Math.min(...visibleMrps) / 1000) * 1000,
        max: Math.ceil(Math.max(...visibleMrps) / 5000) * 5000,
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
      purificationTech: undefined,
      hasRO: undefined,
      hasUV: undefined,
      hasUF: undefined,
      hasMineralBooster: undefined,
      hasHMR: undefined,
      hasUVinTank: undefined,
      hasDigitalSterilizing: undefined,
      hasTrueMaintenance: undefined,
      hasGlassTouch: undefined,
      isNonElectric: undefined,
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
    return <Loader message="Loading Water Purifiers..." />;
  }

  const filterPanel = (
    <FilterPanel
      filters={filters}
      onFilterChange={handleFilterChange}
      onReset={handleResetFilters}
      category="Water Purifier"
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
                LG Water Purifiers
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                PuriCare water purifiers with RO, UV, UF, Mineral Booster, Digital Sterilizing Care, and Stainless Steel Tank technology
              </Typography>
            </motion.div>

            <Paper elevation={0} sx={{ p: 2, mb: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={8}>
                  <SearchBar onSearch={handleSearch} placeholder="Search water purifiers..." />
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

export default WaterPurifier;