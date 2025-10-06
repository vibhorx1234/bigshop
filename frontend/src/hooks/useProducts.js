import { useState, useEffect } from 'react';
import { getAllProducts, getProductsByCategory } from '../services/productService';

const useProducts = (category = null, filters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [category, filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let data;
      
      if (category && category !== 'All') {
        data = await getProductsByCategory(category, filters);
      } else {
        data = await getAllProducts(filters);
      }
      
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, error, refetch: fetchProducts };
};

export default useProducts;