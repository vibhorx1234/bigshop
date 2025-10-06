import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAllProducts } from '../services/productService';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const getProductsByCategory = (category) => {
    if (category === 'All') return products;
    return products.filter(product => product.category === category);
  };

  const getProductById = (id) => {
    return products.find(product => product._id === id);
  };

  const getProductByCode = (code) => {
    return products.find(product => product.productCode === code);
  };

  return (
    <ProductContext.Provider 
      value={{ 
        products, 
        loading, 
        error, 
        selectedProduct,
        setSelectedProduct,
        fetchProducts,
        getProductsByCategory,
        getProductById,
        getProductByCode
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
};