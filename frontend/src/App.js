import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeContextProvider } from './context/ThemeContext';
import { ProductProvider } from './context/ProductContext';
import { useThemeContext } from './context/ThemeContext';
import { lightTheme, darkTheme } from './styles/theme';

// Layout Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import AllProducts from './pages/AllProducts';
import TV from './pages/TV';
import WashingMachine from './pages/WashingMachine';
import AC from './pages/AC';
import LGAudio from './pages/LGAudio';
import VisiCooler from './pages/VisiCooler';
import DeepFreezer from './pages/DeepFreezer';
import Refrigerator from './pages/Refrigerator';
import Dishwashers from './pages/Dishwashers';
import MicrowaveOvens from './pages/MicrowaveOvens';
import Homeware from './pages/Homeware';
import Gallery from './pages/Gallery';
import BulkEnquiry from './pages/BulkEnquiry';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function AppContent() {
  const { isDarkMode } = useThemeContext();

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          '*::-webkit-scrollbar': {
            display: 'none',
          },
          '*': {
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          },
          body: {
            overflow: 'overlay',
          },
        }}
      />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/products/tv" element={<TV />} />
        <Route path="/products/ac" element={<AC />} />
        <Route path="/products/washing-machine" element={<WashingMachine />} />
        <Route path="/products/refrigerator" element={<Refrigerator />} />
        <Route path="/products/dishwashers" element={<Dishwashers />} />
        <Route path="/products/microwave-ovens" element={<MicrowaveOvens />} />
        <Route path="/products/audio" element={<LGAudio />} />
        <Route path="/products/freezer" element={<DeepFreezer />} />
        <Route path="/products/visi" element={<VisiCooler />} />
        <Route path="/products/homeware" element={<Homeware />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/bulk-enquiry" element={<BulkEnquiry />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}

function App() {
  return (
    <ThemeContextProvider>
      <ProductProvider>
        <AppContent />
      </ProductProvider>
    </ThemeContextProvider>
  );
}

export default App;