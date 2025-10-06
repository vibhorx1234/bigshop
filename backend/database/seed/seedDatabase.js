const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../../models/Product');
const productsData = require('./products.json');

// Load environment variables
dotenv.config({ path: '../../backend/.env' });

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected for seeding...');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

// Seed products
const seedProducts = async () => {
  try {
    // Clear existing products
    await Product.deleteMany({});
    console.log('Existing products cleared');

    // Insert new products
    await Product.insertMany(productsData);
    console.log('Products seeded successfully');
    
    console.log(`Total products seeded: ${productsData.length}`);
    
    // Show category breakdown
    const categories = {};
    productsData.forEach(product => {
      categories[product.category] = (categories[product.category] || 0) + 1;
    });
    
    console.log('\nProducts by category:');
    Object.entries(categories).forEach(([category, count]) => {
      console.log(`  ${category}: ${count}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

// Run seeding
const runSeed = async () => {
  await connectDB();
  await seedProducts();
};

runSeed();