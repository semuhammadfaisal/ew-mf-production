const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Test endpoint
router.get('/test', (req, res) => {
  console.log('Orders test endpoint hit');
  res.json({ message: 'Orders API is working', timestamp: new Date() });
});

// Create new order
router.post('/', async (req, res) => {
  console.log('=== ORDER CREATION REQUEST ===');
  console.log('Headers:', req.headers);
  console.log('Body:', JSON.stringify(req.body, null, 2));
  
  try {
    const { customerInfo, items, totalAmount, paymentMethod } = req.body;
    
    if (!customerInfo || !items || !totalAmount) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    const orderNumber = 'MF' + Date.now();
    
    const orderData = {
      orderNumber,
      customerInfo,
      items,
      totalAmount,
      paymentMethod: paymentMethod || 'cod',
      status: 'pending',
      paymentStatus: 'pending'
    };
    
    console.log('Creating order with data:', JSON.stringify(orderData, null, 2));
    
    const order = new Order(orderData);
    const savedOrder = await order.save();
    
    console.log('Order saved successfully with ID:', savedOrder._id);
    
    res.status(201).json({ 
      success: true,
      message: 'Order placed successfully', 
      orderNumber: savedOrder.orderNumber,
      orderId: savedOrder._id
    });
  } catch (error) {
    console.error('Order creation error:', error.message);
    console.error('Full error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to create order: ' + error.message 
    });
  }
});

// Get order by order number
router.get('/:orderNumber', async (req, res) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber })
      .populate('items.productId');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
