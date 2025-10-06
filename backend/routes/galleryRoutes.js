const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');

// GET all gallery images
router.get('/', async (req, res) => {
  try {
    const images = await Gallery.find({ isActive: true })
      .sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single gallery image by ID
router.get('/:id', async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.json(image);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET gallery images by category
router.get('/category/:category', async (req, res) => {
  try {
    const images = await Gallery.find({ 
      category: req.params.category,
      isActive: true 
    }).sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;