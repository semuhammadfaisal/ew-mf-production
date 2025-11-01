const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Product = require('../models/Product');

// Get all approved reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find({ isApproved: true })
      .populate('productId', 'name')
      .sort({ createdAt: -1 })
      .limit(50);
    
    const reviewsWithProductName = reviews.map(review => ({
      ...review.toObject(),
      productName: review.productId ? review.productId.name : 'Unknown Product'
    }));
    
    res.json(reviewsWithProductName);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get reviews for a product
router.get('/product/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ 
      productId: req.params.productId, 
      isApproved: true 
    }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new review
router.post('/', async (req, res) => {
  try {
    const { productId, customerName, rating, comment } = req.body;
    
    const review = new Review({
      productId,
      customerName,
      rating,
      comment,
      isApproved: false
    });
    
    await review.save();
    res.status(201).json({ message: 'Review submitted for approval', reviewId: review._id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all reviews for admin
router.get('/admin/all', async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('productId', 'name')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Approve/reject review
router.put('/admin/:id/approve', async (req, res) => {
  try {
    const { isApproved } = req.body;
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { isApproved },
      { new: true }
    );
    
    if (isApproved) {
      const reviews = await Review.find({ productId: review.productId, isApproved: true });
      const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
      
      await Product.findByIdAndUpdate(review.productId, {
        rating: Math.round(avgRating * 10) / 10,
        reviews: reviews.length
      });
    }
    
    res.json({ message: `Review ${isApproved ? 'approved' : 'rejected'}` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete review
router.delete('/admin/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    await Review.findByIdAndDelete(req.params.id);
    
    const reviews = await Review.find({ productId: review.productId, isApproved: true });
    const avgRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;
    
    await Product.findByIdAndUpdate(review.productId, {
      rating: Math.round(avgRating * 10) / 10,
      reviews: reviews.length
    });
    
    res.json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
