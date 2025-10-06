// Load environment variables first
require('dotenv').config();

const mongoose = require('mongoose');
const Gallery = require('../../models/Gallery');

const sampleImages = [
  {
    title: "Grand Store Opening Ceremony",
    description: "The inauguration of our flagship showroom with special guests and distinguished members of the community celebrating this milestone moment.",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    category: "Store Opening",
    date: new Date('2024-01-15'),
    isActive: true
  },
  {
    title: "Celebrity Brand Ambassador Visit",
    description: "Renowned celebrity and LG brand ambassador graced our showroom, interacting with customers and sharing their experience with LG products.",
    imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800",
    category: "Celebrity Visit",
    date: new Date('2024-02-20'),
    isActive: true
  },
  {
    title: "LG Electronics Regional Head Visit",
    description: "Official visit from LG Electronics regional management team to review our operations and appreciate our outstanding sales performance.",
    imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800",
    category: "Company Visit",
    date: new Date('2024-03-10'),
    isActive: true
  },
  {
    title: "Diwali Celebration with Customers",
    description: "Special Diwali celebration event with exclusive offers, traditional decorations, and festivities shared with our valued customers.",
    imageUrl: "https://images.unsplash.com/photo-1604608672516-f1b9b1ed4d0a?w=800",
    category: "Festival Celebration",
    date: new Date('2024-10-25'),
    isActive: true
  },
  {
    title: "Best Dealer Award Ceremony",
    description: "Proud moment as we received the 'Best LG Dealer of the Year' award from LG India in recognition of excellence in sales and customer service.",
    imageUrl: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800",
    category: "Award Ceremony",
    date: new Date('2024-04-18'),
    isActive: true
  },
  {
    title: "Customer Appreciation Day",
    description: "Annual customer appreciation event where we thanked our loyal customers with special offers, refreshments, and exciting activities.",
    imageUrl: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800",
    category: "Customer Appreciation",
    date: new Date('2024-05-12'),
    isActive: true
  },
  {
    title: "Film Star Showroom Inauguration",
    description: "Popular film star inaugurated our newly renovated showroom wing, drawing huge crowds and media attention to the event.",
    imageUrl: "https://images.unsplash.com/photo-1560458655-d4f8e5d22edf?w=800",
    category: "Celebrity Visit",
    date: new Date('2024-06-08'),
    isActive: true
  },
  {
    title: "LG India CEO Store Visit",
    description: "Special visit from LG India's CEO to our showroom, appreciating our market presence and discussing future growth opportunities.",
    imageUrl: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800",
    category: "Company Visit",
    date: new Date('2024-07-22'),
    isActive: true
  },
  {
    title: "Independence Day Celebration",
    description: "Patriotic celebration at our showroom with flag hoisting, cultural programs, and special promotional offers for customers.",
    imageUrl: "https://images.unsplash.com/photo-15970714618e-1f2e9a4a8f6f?w=800",
    category: "Festival Celebration",
    date: new Date('2024-08-15'),
    isActive: true
  },
  {
    title: "Sports Celebrity Store Visit",
    description: "Renowned sports personality visited our showroom, met with fans, and shared their experience with LG's latest technology products.",
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800",
    category: "Celebrity Visit",
    date: new Date('2024-09-05'),
    isActive: true
  },
  {
    title: "Product Launch Event",
    description: "Exclusive launch event for LG's latest premium product line with demonstrations, special offers, and refreshments for attendees.",
    imageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800",
    category: "Special Event",
    date: new Date('2024-09-28'),
    isActive: true
  },
  {
    title: "Onam Festival Celebration",
    description: "Traditional Onam celebration with flower arrangements, cultural performances, and festive offers for our customers.",
    imageUrl: "https://images.unsplash.com/photo-1523438097201-512ae7d59c44?w=800",
    category: "Festival Celebration",
    date: new Date('2024-09-15'),
    isActive: true
  }
];

const seedGallery = async () => {
  try {
    // Check if MONGODB_URI exists
    if (!process.env.MONGODB_URI) {
      console.error('Error: MONGODB_URI is not defined in .env file');
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
    
    // Clear existing gallery images (optional - uncomment if you want to start fresh)
    await Gallery.deleteMany({});
    console.log('Existing gallery images cleared');
    
    // Insert sample images
    await Gallery.insertMany(sampleImages);
    
    console.log(`✅ Gallery seeded successfully with ${sampleImages.length} celebration images`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding gallery:', error.message);
    process.exit(1);
  }
};

seedGallery();