# Deployment Guide

## Quick Deploy Options

### 1. Heroku (Recommended)
```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create app
heroku create mf-production-store

# Set environment variables
heroku config:set MONGODB_URI="your-mongodb-atlas-uri"
heroku config:set JWT_SECRET="your-secret-key"
heroku config:set NODE_ENV=production

# Deploy
git add .
git commit -m "Deploy to production"
git push heroku main
```

### 2. Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Set environment variables in Vercel dashboard
```

### 3. Railway
1. Connect GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Deploy automatically on git push

## Environment Variables Required
- `MONGODB_URI`: Your MongoDB Atlas connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `NODE_ENV`: Set to "production"
- `PORT`: Will be set automatically by hosting platform

## Pre-deployment Checklist
- [ ] MongoDB Atlas cluster created and configured
- [ ] Database seeded with initial data
- [ ] Environment variables configured
- [ ] All test files removed
- [ ] Production build tested locally

## Post-deployment
1. Test all functionality
2. Verify admin panel access
3. Test order processing
4. Check mobile responsiveness
5. Monitor error logs