const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Review = require('../models/Review');
const Order = require('../models/Order');

// Admin authentication middleware (simplified for demo)
const adminAuth = (req, res, next) => {
  // For demo purposes, allow all admin requests
  // In production, implement proper JWT authentication
  next();
};

// Get all products for admin
router.get('/products', adminAuth, async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Test endpoint
router.post('/test', (req, res) => {
  console.log('Test endpoint - Headers:', req.headers);
  console.log('Test endpoint - Body:', req.body);
  console.log('Test endpoint - Raw body type:', typeof req.body);
  res.json({ received: req.body, headers: req.headers });
});

// Add new product
router.post('/products', async (req, res) => {
  try {
    console.log('Received body:', req.body);
    console.log('Body keys:', Object.keys(req.body || {}));
    
    // If req.body is empty, return a more specific error
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'No data received in request body' });
    }
    
    const productData = {
      name: req.body.name || 'Test Product',
      description: req.body.description || 'Test Description',
      price: parseFloat(req.body.price) || 1000,
      originalPrice: req.body.originalPrice ? parseFloat(req.body.originalPrice) : null,
      category: req.body.category || 'electronics',
      image: req.body.image || 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500',
      images: req.body.images || [req.body.image || 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500'],
      stock: parseInt(req.body.stock) || 10,
      rating: 0,
      reviews: 0,
      bestseller: req.body.bestseller === true,
      new: req.body.new === true,
      isActive: true
    };
    
    console.log('Creating product with data:', productData);
    
    const product = new Product(productData);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Error saving product:', error);
    res.status(400).json({ message: error.message });
  }
});

// Update product
router.put('/products/:id', adminAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete product
router.delete('/products/:id', adminAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all orders
router.get('/orders', adminAuth, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update order status
router.put('/orders/:id/status', adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all reviews for admin
router.get('/reviews', adminAuth, async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('productId', 'name')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get pending reviews
router.get('/reviews/pending', adminAuth, async (req, res) => {
  try {
    const reviews = await Review.find({ isApproved: false })
      .populate('productId', 'name')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Approve/reject review
router.put('/reviews/:id/approve', adminAuth, async (req, res) => {
  try {
    const { isApproved } = req.body;
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { isApproved },
      { new: true }
    );
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete review
router.delete('/reviews/:id', adminAuth, async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
