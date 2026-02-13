const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

let activeUsers = 0;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files with proper headers
app.use(express.static(path.join(__dirname), {
  setHeaders: (res, path) => {
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Production logging
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
}

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/admin', require('./routes/admin'));

// Serve HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/admin/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin', 'login.html'));
});

app.get('/admin/dashboard.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin', 'dashboard.html'));
});

app.get('/admin', (req, res) => {
  res.redirect('/admin/login.html');
});

app.get('/product-view.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'product-view.html'));
});

app.get('*.html', (req, res) => {
  res.sendFile(path.join(__dirname, req.path));
});

// Serve static assets
app.get('/css/*', (req, res) => {
  res.sendFile(path.join(__dirname, req.path));
});

app.get('/js/*', (req, res) => {
  res.sendFile(path.join(__dirname, req.path));
});

app.get('/assets/*', (req, res) => {
  res.sendFile(path.join(__dirname, req.path));
});

// Socket.IO for user tracking
io.on('connection', (socket) => {
  activeUsers++;
  console.log(`User connected. Total users: ${activeUsers}`);
  io.emit('userCount', activeUsers);
  
  socket.on('disconnect', () => {
    activeUsers--;
    console.log(`User disconnected. Total users: ${activeUsers}`);
    io.emit('userCount', activeUsers);
  });
});

// API endpoint for active users
app.get('/api/active-users', (req, res) => {
  res.json({ count: activeUsers });
});

// Export for Vercel
module.exports = app;

const PORT = process.env.PORT || 3000;

// Only start server if not in Vercel environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Please stop the existing server or use a different port.`);
      console.error('You can kill the existing process or change the PORT in your .env file.');
    } else {
      console.error('Server error:', err);
    }
    process.exit(1);
  });
}

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  if (server) {
    server.close(() => {
      mongoose.connection.close();
      process.exit(0);
    });
  }
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  if (server) {
    server.close(() => {
      mongoose.connection.close();
      process.exit(0);
    });
  }
});
