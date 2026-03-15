// import React, { useState, useEffect } from 'react';
// import {
//     Box,
//     Container,
//     Typography,
//     Grid,
//     Paper,
//     useMediaQuery,
//     useTheme,
//     Drawer,
//     IconButton,
//     Button
// } from '@mui/material';
// import { FilterList, Close } from '@mui/icons-material';
// import { motion } from 'framer-motion';
// import SearchBar from '../components/products/SearchBar';
// import SortDropdown from '../components/products/SortDropdown';
// import FilterPanel from '../components/products/FilterPanel';
// import ProductGrid from '../components/products/ProductGrid';
// import ProductModal from '../components/products/ProductModal';
// import EnquiryForm from '../components/forms/EnquiryForm';
// import Loader from '../components/common/Loader';
// import AnimatedBackground from '../components/common/AnimatedBackground';
// import { getProductsByCategory } from '../services/productService';
// import { fadeInUp } from '../styles/animations';
// import ParallaxSvgBackground from '../components/common/ParallaxSvgBackground';

// const LGAudio = () => {
//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down('md'));

//     const [products, setProducts] = useState([]);
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [sortBy, setSortBy] = useState('newest');
//     const [filters, setFilters] = useState({
//         minPrice: undefined,
//         maxPrice: undefined,
//         inStock: undefined
//     });
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [enquiryProduct, setEnquiryProduct] = useState(null);
//     const [modalOpen, setModalOpen] = useState(false);
//     const [enquiryOpen, setEnquiryOpen] = useState(false);
//     const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

//     useEffect(() => {
//         fetchProducts();
//     }, []);

//     useEffect(() => {
//         applyFiltersAndSort();
//     }, [products, searchTerm, sortBy, filters]);

//     const fetchProducts = async () => {
//         try {
//             setLoading(true);
//             const data = await getProductsByCategory('LG Audio');
//             setProducts(data);
//         } catch (error) {
//             console.error('Error fetching products:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const applyFiltersAndSort = () => {
//         let result = [...products];

//         if (searchTerm) {
//             result = result.filter(product =>
//                 product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 product.description.toLowerCase().includes(searchTerm.toLowerCase())
//             );
//         }

//         if (filters.minPrice !== undefined) {
//             result = result.filter(product => product.price >= filters.minPrice);
//         }
//         if (filters.maxPrice !== undefined) {
//             result = result.filter(product => product.price <= filters.maxPrice);
//         }
//         if (filters.inStock !== undefined) {
//             result = result.filter(product => product.inStock === filters.inStock);
//         }

//         switch (sortBy) {
//             case 'price-low-high':
//                 result.sort((a, b) => a.price - b.price);
//                 break;
//             case 'price-high-low':
//                 result.sort((a, b) => b.price - a.price);
//                 break;
//             case 'name-a-z':
//                 result.sort((a, b) => a.name.localeCompare(b.name));
//                 break;
//             case 'name-z-a':
//                 result.sort((a, b) => b.name.localeCompare(a.name));
//                 break;
//             case 'newest':
//             default:
//                 result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//                 break;
//         }

//         setFilteredProducts(result);
//     };

//     const handleSearch = (term) => {
//         setSearchTerm(term);
//     };

//     const handleSortChange = (value) => {
//         setSortBy(value);
//     };

//     const handleFilterChange = (newFilters) => {
//         setFilters(newFilters);
//     };

//     const handleResetFilters = () => {
//         setFilters({
//             minPrice: undefined,
//             maxPrice: undefined,
//             inStock: undefined
//         });
//         setSearchTerm('');
//         setSortBy('newest');
//     };

//     const handleViewDetails = (product) => {
//         setSelectedProduct(product);
//         setModalOpen(true);
//     };

//     const handleEnquire = (product) => {
//         setEnquiryProduct(product);
//         setEnquiryOpen(true);
//     };

//     if (loading) {
//         return <Loader message="Loading LG Sound Systems..." />;
//     }

//     const filterPanel = (
//         <FilterPanel
//             filters={filters}
//             onFilterChange={handleFilterChange}
//             onReset={handleResetFilters}
//         />
//     );

//     return (
//         <ParallaxSvgBackground>
//         <AnimatedBackground>
//             <Box sx={{ py: 4 }}>
//                 <Container maxWidth="xl">
//                     <motion.div
//                         initial="hidden"
//                         animate="visible"
//                         variants={fadeInUp}
//                     >
//                         <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
//                             LG Sound Systems
//                         </Typography>
//                         <Typography variant="body1" color="text.secondary" paragraph>
//                             Experience immersive audio with our range of LG Sound Systems, delivering powerful and crystal-clear sound for every occasion
//                         </Typography>

//                     </motion.div>

//                     <Paper elevation={0} sx={{ p: 2, mb: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
//                         <Grid container spacing={2} alignItems="center">
//                             <Grid item xs={12} md={8}>
//                                 <SearchBar onSearch={handleSearch} placeholder="Search LG Sound Systems..." />
//                             </Grid>
//                             <Grid item xs={12} md={4}>
//                                 <SortDropdown value={sortBy} onChange={handleSortChange} />
//                             </Grid>
//                         </Grid>
//                     </Paper>

//                     {isMobile && (
//                         <Box sx={{ mb: 2 }}>
//                             <Button
//                                 fullWidth
//                                 variant="outlined"
//                                 startIcon={<FilterList />}
//                                 onClick={() => setFilterDrawerOpen(true)}
//                             >
//                                 Filters
//                             </Button>
//                         </Box>
//                     )}

//                     <Grid container spacing={3}>
//                         {!isMobile && (
//                             <Grid item md={3}>
//                                 {filterPanel}
//                             </Grid>
//                         )}

//                         <Grid item xs={12} md={isMobile ? 12 : 9}>
//                             <ProductGrid
//                                 products={filteredProducts}
//                                 onViewDetails={handleViewDetails}
//                                 onEnquire={handleEnquire}
//                             />
//                         </Grid>
//                     </Grid>
//                 </Container>

//                 <Drawer
//                     anchor="left"
//                     open={filterDrawerOpen}
//                     onClose={() => setFilterDrawerOpen(false)}
//                 >
//                     <Box sx={{ width: 300, p: 2 }}>
//                         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//                             <Typography variant="h6" fontWeight={600}>Filters</Typography>
//                             <IconButton onClick={() => setFilterDrawerOpen(false)}>
//                                 <Close />
//                             </IconButton>
//                         </Box>
//                         {filterPanel}
//                     </Box>
//                 </Drawer>

//                 <ProductModal
//                     open={modalOpen}
//                     product={selectedProduct}
//                     onClose={() => setModalOpen(false)}
//                     onEnquire={handleEnquire}
//                 />

//                 <EnquiryForm
//                     open={enquiryOpen}
//                     product={enquiryProduct}
//                     onClose={() => setEnquiryOpen(false)}
//                 />
//             </Box>
//         </AnimatedBackground>
//         </ParallaxSvgBackground>
//     );
// };

// export default LGAudio;




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

const LGAudio = () => {
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
        // Audio-specific
        audioSeries: undefined,           // string[]  'Sound Bar' | 'XBOOM'
        audioType: undefined,             // string[]  'Soundbar' | 'Party Speaker' | 'Portable Speaker' | 'Rear Speaker Kit'
        channels: undefined,              // string[]  e.g. ['3.1.3', '9.1.5']
        hasDolbyAtmos: undefined,         // true | undefined
        hasDTSX: undefined,               // true | undefined
        hasWifi: undefined,               // true | undefined
        hasRearSpeakers: undefined,       // true | undefined
        hasWowOrchestra: undefined,       // true | undefined
        hasWowcast: undefined,            // true | undefined
        hasKaraoke: undefined,            // true | undefined
        hasWirelessPartyLink: undefined,  // true | undefined
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
            const data = await getProductsByCategory('LG Audio');
            setProducts(data);

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

        // ── Series (Sound Bar / XBOOM) ───────────────────────────────────────────
        if (filters.audioSeries?.length) {
            result = result.filter(p =>
                filters.audioSeries.includes(p.specifications?.['Series'])
            );
        }

        // ── Product Type (multi-select) ──────────────────────────────────────────
        if (filters.audioType?.length) {
            result = result.filter(p =>
                filters.audioType.includes(p.specifications?.['Type'])
            );
        }

        // ── Channels (multi-select) ──────────────────────────────────────────────
        if (filters.channels?.length) {
            result = result.filter(p =>
                filters.channels.includes(p.specifications?.['Channels'])
            );
        }

        // ── Feature flags ────────────────────────────────────────────────────────
        if (filters.hasDolbyAtmos) {
            result = result.filter(p =>
                p.specifications?.['Dolby Atmos'] === 'Yes' ||
                p.tags?.includes('Dolby Atmos')
            );
        }
        if (filters.hasDTSX) {
            result = result.filter(p =>
                p.specifications?.['DTS:X'] === 'Yes' ||
                p.tags?.includes('DTS:X')
            );
        }
        if (filters.hasWifi) {
            result = result.filter(p =>
                p.specifications?.['WiFi'] === 'Yes' ||
                p.tags?.includes('Wi-Fi')
            );
        }
        if (filters.hasRearSpeakers) {
            result = result.filter(p =>
                p.specifications?.['Rear Speakers']?.startsWith('Yes') ||
                p.tags?.includes('Rear Speakers') ||
                p.specifications?.['Type'] === 'Rear Speaker Kit'
            );
        }
        if (filters.hasWowOrchestra) {
            result = result.filter(p =>
                p.specifications?.['WOW Orchestra'] === 'Yes' ||
                p.tags?.includes('WOW Orchestra')
            );
        }
        if (filters.hasWowcast) {
            result = result.filter(p =>
                p.specifications?.['WOWCAST'] === 'Yes' ||
                p.tags?.includes('WOWCAST')
            );
        }
        if (filters.hasKaraoke) {
            result = result.filter(p =>
                p.specifications?.['Karaoke'] === 'Yes' ||
                p.tags?.includes('Karaoke')
            );
        }
        if (filters.hasWirelessPartyLink) {
            result = result.filter(p =>
                p.specifications?.['Wireless Party Link']?.startsWith('Yes') ||
                p.tags?.includes('Wireless Party Link')
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

        // ── Recompute price range EXCLUDING price filter to avoid feedback loop ──
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
        if (filters.audioSeries?.length) {
            priceRangeBase = priceRangeBase.filter(p =>
                filters.audioSeries.includes(p.specifications?.['Series'])
            );
        }
        if (filters.audioType?.length) {
            priceRangeBase = priceRangeBase.filter(p =>
                filters.audioType.includes(p.specifications?.['Type'])
            );
        }
        if (filters.channels?.length) {
            priceRangeBase = priceRangeBase.filter(p =>
                filters.channels.includes(p.specifications?.['Channels'])
            );
        }
        if (filters.hasDolbyAtmos) {
            priceRangeBase = priceRangeBase.filter(p =>
                p.specifications?.['Dolby Atmos'] === 'Yes' || p.tags?.includes('Dolby Atmos')
            );
        }
        if (filters.hasDTSX) {
            priceRangeBase = priceRangeBase.filter(p =>
                p.specifications?.['DTS:X'] === 'Yes' || p.tags?.includes('DTS:X')
            );
        }
        if (filters.hasWifi) {
            priceRangeBase = priceRangeBase.filter(p =>
                p.specifications?.['WiFi'] === 'Yes' || p.tags?.includes('Wi-Fi')
            );
        }
        if (filters.hasRearSpeakers) {
            priceRangeBase = priceRangeBase.filter(p =>
                p.specifications?.['Rear Speakers']?.startsWith('Yes') ||
                p.tags?.includes('Rear Speakers') ||
                p.specifications?.['Type'] === 'Rear Speaker Kit'
            );
        }
        if (filters.hasWowOrchestra) {
            priceRangeBase = priceRangeBase.filter(p =>
                p.specifications?.['WOW Orchestra'] === 'Yes' || p.tags?.includes('WOW Orchestra')
            );
        }
        if (filters.hasWowcast) {
            priceRangeBase = priceRangeBase.filter(p =>
                p.specifications?.['WOWCAST'] === 'Yes' || p.tags?.includes('WOWCAST')
            );
        }
        if (filters.hasKaraoke) {
            priceRangeBase = priceRangeBase.filter(p =>
                p.specifications?.['Karaoke'] === 'Yes' || p.tags?.includes('Karaoke')
            );
        }
        if (filters.hasWirelessPartyLink) {
            priceRangeBase = priceRangeBase.filter(p =>
                p.specifications?.['Wireless Party Link']?.startsWith('Yes') ||
                p.tags?.includes('Wireless Party Link')
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
            audioSeries: undefined,
            audioType: undefined,
            channels: undefined,
            hasDolbyAtmos: undefined,
            hasDTSX: undefined,
            hasWifi: undefined,
            hasRearSpeakers: undefined,
            hasWowOrchestra: undefined,
            hasWowcast: undefined,
            hasKaraoke: undefined,
            hasWirelessPartyLink: undefined,
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
        return <Loader message="Loading LG Sound Systems..." />;
    }

    const filterPanel = (
        <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
            category="LG Audio"
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
                                LG Sound Systems
                            </Typography>
                            <Typography variant="body1" color="text.secondary" paragraph>
                                Experience immersive audio with LG Soundbars and XBOOM speakers – powerful, crystal-clear sound for every occasion
                            </Typography>
                        </motion.div>

                        <Paper elevation={0} sx={{ p: 2, mb: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12} md={8}>
                                    <SearchBar onSearch={handleSearch} placeholder="Search sound systems..." />
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

export default LGAudio;