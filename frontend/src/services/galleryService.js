import api from './api';

// Get all gallery images
export const getAllGalleryImages = async () => {
  try {
    const response = await api.get('/gallery');
    return response;
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    throw error;
  }
};

// Get gallery image by ID
export const getGalleryImageById = async (id) => {
  try {
    const response = await api.get(`/gallery/${id}`);
    return response;
  } catch (error) {
    console.error('Error fetching gallery image:', error);
    throw error;
  }
};

// Get gallery images by category (optional, if you have categories)
export const getGalleryImagesByCategory = async (category) => {
  try {
    const response = await api.get(`/gallery/category/${category}`);
    return response;
  } catch (error) {
    console.error('Error fetching gallery images by category:', error);
    throw error;
  }
};