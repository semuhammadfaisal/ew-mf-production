# MF Production E-commerce Store

A modern, responsive e-commerce platform with MongoDB Atlas integration for complete product management, customer reviews, and order processing.

## 🚀 Features

### Customer Features
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Product Catalog**: Browse products by categories (Electronics, Men's Fashion, Women's Fashion, Perfumes)
- **Shopping Cart**: Add/remove items with real-time cart updates
- **Product Reviews**: Customer reviews with star ratings
- **Order Checkout**: Complete order processing with customer information
- **Order Tracking**: Track order status and history

### Admin Features
- **Responsive Admin Dashboard**: Mobile-friendly admin panel
- **Product Management**: Add, edit, delete products with image galleries
- **Order Management**: View, update order status, customer details
- **Review Moderation**: Approve/reject customer reviews
- **Real-time Analytics**: Sales overview, category performance, top products
- **Data Export**: Export order data for analysis

## 🛠️ Technology Stack

### Frontend
- **HTML5, CSS3, JavaScript (ES6+)**
- **Responsive Design** with mobile-first approach
- **Font Awesome** icons
- **Real-time UI updates**

### Backend
- **Node.js** with Express.js framework
- **MongoDB Atlas** cloud database
- **Mongoose ODM** for data modeling
- **RESTful API** architecture
- **CORS** enabled for cross-origin requests

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- Git (for deployment)

## ⚙️ Installation & Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd MF-Production
```

### 2. Install Dependencies
```bash
npm install
```

### 3. MongoDB Atlas Setup
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create new cluster
3. Create database user
4. Get connection string
5. Whitelist IP addresses (0.0.0.0/0 for all IPs)

### 4. Environment Configuration
Create `.env` file in root directory:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/mf-production?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here
PORT=3000
NODE_ENV=production
```

### 5. Seed Database (Optional)
```bash
node data-seeder.js
```

### 6. Start Application
```bash
# Production
npm start

# Development
npm run dev
```

## 🌐 Deployment

### Heroku Deployment
1. **Install Heroku CLI**
2. **Login to Heroku**
   ```bash
   heroku login
   ```
3. **Create Heroku App**
   ```bash
   heroku create mf-production-store
   ```
4. **Set Environment Variables**
   ```bash
   heroku config:set MONGODB_URI="your-mongodb-uri"
   heroku config:set JWT_SECRET="your-jwt-secret"
   heroku config:set NODE_ENV=production
   ```
5. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy to production"
   git push heroku main
   ```

### Vercel Deployment
1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```
2. **Deploy**
   ```bash
   vercel --prod
   ```
3. **Set Environment Variables** in Vercel dashboard

### Railway Deployment
1. **Connect GitHub repository** to Railway
2. **Set environment variables** in Railway dashboard
3. **Deploy automatically** on git push

## 📱 Application Access

- **Frontend**: `http://localhost:3000` or your deployed URL
- **Admin Panel**: `http://localhost:3000/admin/dashboard.html`

## 🔗 API Endpoints

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/admin/products` | Add new product |
| PUT | `/api/admin/products/:id` | Update product |
| DELETE | `/api/admin/products/:id` | Delete product |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Create new order |
| GET | `/api/orders/:orderNumber` | Get order details |
| GET | `/api/admin/orders` | Get all orders |
| PUT | `/api/admin/orders/:id/status` | Update order status |

### Reviews
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reviews/product/:productId` | Get product reviews |
| POST | `/api/reviews` | Submit new review |
| GET | `/api/admin/reviews` | Get all reviews |
| PUT | `/api/admin/reviews/:id/approve` | Approve/reject review |

## 📊 Database Schema

### Product Model
```javascript
{
  name: String,
  description: String,
  price: Number,
  originalPrice: Number,
  category: String, // 'electronics', 'men', 'women', 'perfumes'
  image: String,
  images: [String], // Multiple product images
  stock: Number,
  rating: Number,
  reviews: Number,
  bestseller: Boolean,
  new: Boolean,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Order Model
```javascript
{
  orderNumber: String,
  customerInfo: {
    name: String,
    email: String,
    phone: String,
    address: String,
    city: String
  },
  items: [{
    productId: ObjectId,
    name: String,
    price: Number,
    quantity: Number,
    image: String
  }],
  totalAmount: Number,
  status: String, // 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'
  paymentMethod: String,
  paymentStatus: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Review Model
```javascript
{
  productId: ObjectId,
  customerName: String,
  rating: Number,
  comment: String,
  isApproved: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 📁 Project Structure
```
MF-Production/
├── admin/
│   └── dashboard.html      # Responsive admin panel
├── assets/
│   └── images/            # Static images
├── css/
│   ├── admin.css          # Admin panel styles
│   ├── style.css          # Main website styles
│   └── improved-cards.css # Enhanced card components
├── js/
│   ├── admin.js           # Admin functionality
│   ├── api.js             # API communication
│   ├── cart.js            # Shopping cart logic
│   ├── checkout.js        # Checkout process
│   ├── main.js            # Main website logic
│   ├── navbar.js          # Navigation functionality
│   ├── products.js        # Product display logic
│   └── reviews.js         # Review system
├── models/
│   ├── Product.js         # Product data model
│   ├── Order.js           # Order data model
│   └── Review.js          # Review data model
├── routes/
│   ├── products.js        # Product API routes
│   ├── orders.js          # Order API routes
│   ├── reviews.js         # Review API routes
│   └── admin.js           # Admin API routes
├── .env                   # Environment variables
├── server.js              # Main server file
├── data-seeder.js         # Database seeder
├── package.json           # Dependencies
├── index.html             # Homepage
├── products.html          # Products page
├── cart.html              # Shopping cart
├── checkout.html          # Checkout page
├── about.html             # About page
├── contact.html           # Contact page
└── wishlist.html          # Wishlist page
```

## 🔧 Configuration

### Environment Variables
- `MONGODB_URI`: MongoDB Atlas connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)

### Package.json Scripts
```json
{
  "start": "node server.js",
  "dev": "nodemon server.js",
  "seed": "node data-seeder.js"
}
```

## 🚀 Production Checklist

- [ ] MongoDB Atlas cluster configured
- [ ] Environment variables set
- [ ] Database seeded with initial data
- [ ] Admin authentication configured
- [ ] CORS settings configured for production domain
- [ ] Error logging implemented
- [ ] Performance monitoring setup
- [ ] SSL certificate configured
- [ ] Domain name configured
- [ ] Backup strategy implemented

## 🔒 Security Features

- Input validation and sanitization
- CORS protection
- Environment variable protection
- Admin route protection
- XSS protection
- SQL injection prevention

## 📈 Performance Features

- Responsive images
- Optimized database queries
- Efficient API endpoints
- Client-side caching
- Compressed assets

## 🐛 Troubleshooting

### Common Issues
1. **MongoDB Connection Error**: Check connection string and IP whitelist
2. **Port Already in Use**: Change PORT in .env file
3. **Admin Panel Not Loading**: Ensure all admin routes are properly configured
4. **Images Not Loading**: Check image URLs and CORS settings

### Support
For issues and support, please check the documentation or create an issue in the repository.

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

---

**MF Production E-commerce Store** - A complete, responsive e-commerce solution ready for production deployment.