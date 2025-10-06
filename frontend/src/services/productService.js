import api from './api';

export const getAllProducts = async (params = {}) => {
  try {
    const response = await api.get('/products', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductByCode = async (code) => {
  try {
    const response = await api.get(`/products/code/${code}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductsByCategory = async (category, params = {}) => {
  try {
    const response = await api.get(`/products/category/${category}`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFeaturedProducts = async () => {
  try {
    const response = await api.get('/products/featured');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createEnquiry = async (enquiryData) => {
  try {
    const response = await api.post('/enquiries', enquiryData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createBulkEnquiry = async (bulkEnquiryData) => {
  try {
    const response = await api.post('/bulk-enquiries', bulkEnquiryData);
    return response.data;
  } catch (error) {
    throw error;
  }
};