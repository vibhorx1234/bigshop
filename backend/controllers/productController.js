const Product = require('../models/Product');

// Get all products with filters, search, and sort
exports.getAllProducts = async (req, res) => {
  try {
    const { category, search, sort, minPrice, maxPrice, inStock, screenSize } = req.query;

    let query = {};

    // Category filter
    if (category && category !== 'All') {
      query.category = category;
    }

    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Stock filter
    if (inStock !== undefined) {
      query.inStock = inStock === 'true';
    }

    // Screen size filter (for TVs)
    if (screenSize) {
      query.screenSize = Number(screenSize);
    }

    // Sort options
    let sortOptions = {};
    switch (sort) {
      case 'price-low-high':
        sortOptions = { price: 1 };
        break;
      case 'price-high-low':
        sortOptions = { price: -1 };
        break;
      case 'name-a-z':
        sortOptions = { name: 1 };
        break;
      case 'name-z-a':
        sortOptions = { name: -1 };
        break;
      case 'newest':
        sortOptions = { createdAt: -1 };
        break;
      default:
        sortOptions = { createdAt: -1 };
    }

    const products = await Product.find(query).sort(sortOptions);

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get product by product code
exports.getProductByCode = async (req, res) => {
  try {
    const product = await Product.findOne({ productCode: req.params.code });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get products by category
exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { search, sort, minPrice, maxPrice, inStock, screenSize } = req.query;

    let query = { category };

    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    // Price range filter
    if (minPrice || maxPrice) {
      if (minPrice) query['variants.price'] = { ...query['variants.price'], $gte: Number(minPrice) };
      if (maxPrice) query['variants.price'] = { ...query['variants.price'], $lte: Number(maxPrice) };
    }

    // Stock filter
    if (inStock !== undefined) {
      query.inStock = inStock === 'true';
    }

    // Screen size filter (for TVs)
    if (screenSize) {
      query['variants.screenSize'] = Number(screenSize);
    }

    // Sort options
    let sortOptions = {};
    switch (sort) {
      case 'price-low-high':
        sortOptions = { price: 1 };
        break;
      case 'price-high-low':
        sortOptions = { price: -1 };
        break;
      case 'name-a-z':
        sortOptions = { name: 1 };
        break;
      case 'name-z-a':
        sortOptions = { name: -1 };
        break;
      case 'newest':
        sortOptions = { createdAt: -1 };
        break;
      default:
        sortOptions = { createdAt: -1 };
    }

    const products = await Product.find(query).sort(sortOptions);

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get featured products (latest or popular)
exports.getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ featured: true }).limit(6);

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};