// Data seeder to populate MongoDB with initial products
const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

// Sample products data
const sampleProducts = [
    {
        name: 'Wireless Bluetooth Earbuds Pro',
        description: 'Premium sound quality with active noise cancellation. 30-hour battery life.',
        price: 3500,
        originalPrice: 5000,
        category: 'electronics',
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500',
        stock: 50,
        rating: 4.8,
        reviews: 234,
        bestseller: true,
        new: true
    },
    {
        name: 'Fast Charging Power Bank 20000mAh',
        description: 'Portable charger with LED display and dual USB ports',
        price: 2800,
        originalPrice: 3500,
        category: 'electronics',
        image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500',
        stock: 75,
        rating: 4.5,
        reviews: 156,
        bestseller: true
    },
    {
        name: 'Smart Watch Fitness Tracker',
        description: 'Track your fitness goals with heart rate monitor and GPS',
        price: 4500,
        category: 'electronics',
        image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500',
        stock: 40,
        rating: 4.7,
        reviews: 189,
        new: true
    },
    {
        name: 'Men\'s Formal Cotton Shirt',
        description: 'Premium cotton blend formal shirt - perfect for office wear',
        price: 1800,
        originalPrice: 2500,
        category: 'men',
        image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500',
        stock: 100,
        rating: 4.4,
        reviews: 89,
        bestseller: true
    },
    {
        name: 'Designer Abaya - Black Embroidered',
        description: 'Elegant black abaya with beautiful gold embroidery',
        price: 4500,
        category: 'women',
        image: 'https://images.unsplash.com/photo-1583391733981-9b74a7f8c4f1?w=500',
        stock: 30,
        rating: 4.9,
        reviews: 145,
        bestseller: true
    },
    {
        name: 'Men\'s Luxury Perfume 100ml',
        description: 'Long-lasting masculine fragrance with woody notes',
        price: 2800,
        originalPrice: 3500,
        category: 'perfumes',
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500',
        stock: 75,
        rating: 4.8,
        reviews: 267,
        bestseller: true
    }
];

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing products
        await Product.deleteMany({});
        console.log('Cleared existing products');

        // Insert sample products
        await Product.insertMany(sampleProducts);
        console.log('Sample products inserted successfully');

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
