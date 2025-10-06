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
import { getAllProducts } from '../services/productService';
import { fadeInUp } from '../styles/animations';

const Products = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filters, setFilters] = useState({
    minPrice: undefined,
    maxPrice: undefined,
    inStock: undefined
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
      const params = {
        search: searchTerm || undefined,
        sort: sortBy,
        ...filters
      };
      const data = await getAllProducts(params);
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSort = () => {
    let result = [...products];

    // Apply search
    if (searchTerm) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply filters
    if (filters.minPrice !== undefined) {
      result = result.filter(product => product.price >= filters.minPrice);
    }
    if (filters.maxPrice !== undefined) {
      result = result.filter(product => product.price <= filters.maxPrice);
    }
    if (filters.inStock !== undefined) {
      result = result.filter(product => product.inStock === filters.inStock);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price);
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

    setFilteredProducts(result);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({
      minPrice: undefined,
      maxPrice: undefined,
      inStock: undefined
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
    return <Loader message="Loading products..." />;
  }

  const filterPanel = (
    <FilterPanel
      filters={filters}
      onFilterChange={handleFilterChange}
      onReset={handleResetFilters}
    />
  );

  return (
    <AnimatedBackground>
      <Box sx={{ py: 4 }}>
        <Container maxWidth="xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
              All Products
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Explore our complete range of products
            </Typography>
          </motion.div>

          {/* Search and Sort */}
          <Paper elevation={0} sx={{ p: 2, mb: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={8}>
                <SearchBar onSearch={handleSearch} />
              </Grid>
              <Grid item xs={12} md={4}>
                <SortDropdown value={sortBy} onChange={handleSortChange} />
              </Grid>
            </Grid>
          </Paper>

          {/* Mobile Filter Button */}
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
            {/* Desktop Filters */}
            {!isMobile && (
              <Grid item md={3}>
                {filterPanel}
              </Grid>
            )}

            {/* Products */}
            <Grid item xs={12} md={isMobile ? 12 : 9}>
              <ProductGrid
                products={filteredProducts}
                onViewDetails={handleViewDetails}
                onEnquire={handleEnquire}
              />
            </Grid>
          </Grid>
        </Container>

        {/* Mobile Filter Drawer */}
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

        {/* Product Modal */}
        <ProductModal
          open={modalOpen}
          product={selectedProduct}
          onClose={() => setModalOpen(false)}
          onEnquire={handleEnquire}
        />

        {/* Enquiry Form */}
        <EnquiryForm
          open={enquiryOpen}
          product={enquiryProduct}
          onClose={() => setEnquiryOpen(false)}
        />
      </Box>
    </AnimatedBackground>
  );
};

export default Products;