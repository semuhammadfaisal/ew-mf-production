// js/products.js

// Global products array - will be loaded from API
let products = [];

// Load products from API
async function loadProducts(filters = {}) {
    try {
        // Check if API is available
        if (typeof API !== 'undefined') {
            const apiProducts = await API.getProducts(filters);
            // Map MongoDB _id to id for frontend compatibility
            products = apiProducts.map(product => ({
                ...product,
                id: product._id || product.id
            }));
            console.log('Products loaded from API:', products.length);
            return products;
        } else {
            throw new Error('API not available');
        }
    } catch (error) {
        console.error('Error loading products:', error);
        // Use fallback data if API fails
        products = fallbackProducts;
        console.log('Using fallback products:', products.length);
        return products;
    }
}

// Static fallback data for offline mode
const fallbackProducts = [
    {
        id: 1,
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
        id: 2,
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
        id: 3,
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
        id: 4,
        name: 'Premium Headphones with Mic',
        description: 'Studio quality over-ear headphones with noise isolation',
        price: 5500,
        originalPrice: 7000,
        category: 'electronics',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        stock: 30,
        rating: 4.9,
        reviews: 301,
        bestseller: true
    },
    {
        id: 5,
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
        id: 6,
        name: 'Slim Fit Denim Jeans',
        description: 'Comfortable stretch denim in classic blue',
        price: 2500,
        category: 'men',
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
        stock: 85,
        rating: 4.6,
        reviews: 127
    },
    {
        id: 7,
        name: 'Leather Jacket - Black',
        description: 'Genuine leather jacket with modern fit',
        price: 8500,
        originalPrice: 12000,
        category: 'men',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
        stock: 25,
        rating: 4.8,
        reviews: 78,
        new: true
    },
    {
        id: 8,
        name: 'Formal Trousers - Navy Blue',
        description: 'Wrinkle-free formal pants with perfect fit',
        price: 2200,
        category: 'men',
        image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500',
        stock: 60,
        rating: 4.3,
        reviews: 94
    },
    {
        id: 9,
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
        id: 10,
        name: 'Casual Summer Dress',
        description: 'Light and breezy cotton dress for summer',
        price: 2800,
        originalPrice: 3500,
        category: 'women',
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500',
        stock: 45,
        rating: 4.5,
        reviews: 112
    },
    {
        id: 11,
        name: 'Women\'s Luxury Handbag',
        description: 'Premium leather handbag with multiple compartments',
        price: 5500,
        category: 'women',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500',
        stock: 20,
        rating: 4.7,
        reviews: 89,
        new: true
    },
    {
        id: 12,
        name: 'Formal Maxi Dress',
        description: 'Elegant maxi dress perfect for formal occasions',
        price: 3800,
        category: 'women',
        image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500',
        stock: 35,
        rating: 4.6,
        reviews: 98,
        bestseller: true
    },
    {
        id: 13,
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
    },
    {
        id: 14,
        name: 'Women\'s Floral Perfume 50ml',
        description: 'Delicate floral scent that lasts all day',
        price: 2500,
        category: 'perfumes',
        image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500',
        stock: 90,
        rating: 4.7,
        reviews: 198
    },
    {
        id: 15,
        name: 'Unisex Fresh Perfume',
        description: 'Citrus and aquatic notes for everyday wear',
        price: 3200,
        category: 'perfumes',
        image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=500',
        stock: 65,
        rating: 4.6,
        reviews: 134,
        new: true
    },
    {
        id: 16,
        name: 'Perfume Gift Set - 3 Pieces',
        description: 'Premium perfume collection in elegant box',
        price: 6500,
        originalPrice: 8000,
        category: 'perfumes',
        image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=500',
        stock: 40,
        rating: 4.9,
        reviews: 156,
        bestseller: true
    },
    {
        id: 17,
        name: 'Wireless Gaming Mouse',
        description: 'High-precision gaming mouse with RGB lighting and programmable buttons',
        price: 3200,
        originalPrice: 4000,
        category: 'electronics',
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
        stock: 45,
        rating: 4.6,
        reviews: 178,
        new: true
    },
    {
        id: 18,
        name: 'Men\'s Casual Polo Shirt',
        description: 'Comfortable cotton polo shirt perfect for casual outings',
        price: 1500,
        category: 'men',
        image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500',
        stock: 120,
        rating: 4.4,
        reviews: 156
    },
    {
        id: 19,
        name: 'Women\'s Designer Scarf',
        description: 'Elegant silk scarf with beautiful patterns and premium quality',
        price: 1800,
        originalPrice: 2500,
        category: 'women',
        image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500',
        stock: 35,
        rating: 4.7,
        reviews: 89,
        new: true
    },
    {
        id: 20,
        name: 'Luxury Oud Perfume 30ml',
        description: 'Premium Arabian oud fragrance with rich and exotic notes',
        price: 4500,
        category: 'perfumes',
        image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500',
        stock: 25,
        rating: 4.9,
        reviews: 234,
        bestseller: true
    }
];

function displayProducts(productsArray, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error('Container not found:', containerId);
        return;
    }

    if (!productsArray || productsArray.length === 0) {
        container.innerHTML = '<p class="no-products">No products available</p>';
        return;
    }

    console.log('Displaying products:', productsArray.length);
    container.innerHTML = productsArray.map(product => `
        <div class="product-card" onclick="alert('Product clicked')" style="cursor: pointer;">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="product-badges">
                    ${product.new ? '<span class="badge badge-new">NEW</span>' : ''}
                    ${product.originalPrice ? '<span class="badge badge-sale">SALE</span>' : ''}
                    ${product.bestseller ? '<span class="badge badge-bestseller">BESTSELLER</span>' : ''}
                </div>
                <div class="product-actions">
                    <button class="action-btn" onclick="event.stopPropagation(); toggleWishlist(${product.id})" title="Add to Wishlist">
                        <i class="far fa-heart"></i>
                    </button>
                    <button class="action-btn" onclick="event.stopPropagation(); window.location.href='product-detail.html?id=${product._id}'" title="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn" onclick="event.stopPropagation(); shareProduct(${product.id})" title="Share">
                        <i class="fas fa-share-alt"></i>
                    </button>
                </div>
                ${product.originalPrice ? `<div class="discount-badge">${Math.round((1 - product.price / product.originalPrice) * 100)}% OFF</div>` : ''}
            </div>
            <div class="product-info">
                <p class="product-category">${getCategoryName(product.category)}</p>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-rating">
                    <div class="stars">${generateStars(product.rating)}</div>
                    <span class="rating-text">${product.rating}</span>
                    <span class="review-count">(${product.reviews} reviews)</span>
                </div>
                <div class="product-price">
                    <span class="current-price">Rs. ${product.price.toLocaleString()}</span>
                    ${product.originalPrice ? `<span class="original-price">Rs. ${product.originalPrice.toLocaleString()}</span>` : ''}
                </div>
                <div class="product-stock">
                    <i class="fas fa-box"></i>
                    <span>${product.stock} in stock</span>
                </div>
                <div class="product-actions-bottom">
                    <button class="add-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                        <i class="fas fa-plus"></i>
                    </button>
                    <button class="buy-now" onclick="event.stopPropagation(); alert('View Details clicked')">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Function to create URL-friendly slug
function createSlug(name) {
    return name.toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-');
}

// Function to get product page URL
function getProductPageUrl(product) {
    const slug = createSlug(product.name);
    return `product-${product.id}-${slug}.html`;
}

function viewProduct(id) {
    window.location.href = `product-detail-enhanced.html?id=${id}`;
}



function toggleWishlist(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    // Get existing wishlist from localStorage
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    // Check if product is already in wishlist
    const existingIndex = wishlist.findIndex(item => item.id === id);
    
    if (existingIndex > -1) {
        // Remove from wishlist
        wishlist.splice(existingIndex, 1);
        showNotification('Removed from wishlist!', 'info');
    } else {
        // Add to wishlist
        wishlist.push(product);
        showNotification('Added to wishlist!', 'success');
    }
    
    // Save to localStorage
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    
    // Update wishlist icon if it exists
    updateWishlistIcon();
}

function updateWishlistIcon() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const wishlistIcon = document.getElementById('wishlistCount');
    if (wishlistIcon) {
        if (wishlist.length > 0) {
            wishlistIcon.textContent = wishlist.length;
            wishlistIcon.style.display = 'flex';
        } else {
            wishlistIcon.style.display = 'none';
        }
    }
    
    // Also trigger navbar update if available
    if (typeof updateWishlistCount === 'function') {
        updateWishlistCount();
    }
}

function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Helper functions for the enhanced products page
function getCategoryName(category) {
    const categoryNames = {
        'electronics': 'Electronics',
        'men': "Men's Fashion",
        'women': "Women's Fashion",
        'perfumes': 'Perfumes'
    };
    return categoryNames[category] || category;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Buy Now functionality - direct checkout
function buyNow(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Create a temporary cart with just this product
    const buyNowItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
    };
    
    // Store the buy now item in sessionStorage (temporary)
    sessionStorage.setItem('buyNowItem', JSON.stringify(buyNowItem));
    
    // Redirect to checkout
    window.location.href = 'checkout.html?buynow=true';
}

// Share product functionality
function shareProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    if (navigator.share) {
        navigator.share({
            title: product.name,
            text: product.description,
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            showNotification('Product link copied to clipboard!', 'success');
        }).catch(() => {
            showNotification('Unable to share product', 'error');
        });
    }
}

// Function to initialize homepage bestsellers
function initializeHomepageBestsellers() {
    if (products && products.length > 0) {
        const bestSellers = products.filter(p => p.bestseller).slice(0, 8);
        const bestSellersGrid = document.getElementById('bestSellersGrid');
        if (bestSellersGrid && bestSellers.length > 0) {
            displayProducts(bestSellers, 'bestSellersGrid');
            console.log('Homepage bestsellers displayed:', bestSellers.length);
        }
    }
}

// Show product info in alert
function showProductInfo(id, name, price, description, stock) {
    const info = `Product Details:\n\nName: ${name}\nPrice: Rs. ${price}\nDescription: ${description}\nStock: ${stock} available\n\nProduct ID: ${id}`;
    alert(info);
}

// Catch all JavaScript errors
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    alert('Error: ' + e.error.message + '\nLine: ' + e.lineno);
});

// Initialize products and wishlist on page load
document.addEventListener('DOMContentLoaded', async function() {
    console.log('DOM loaded, initializing products...');
    updateWishlistIcon();
    
    // Load products from API
    try {
        await loadProducts();
        console.log('Products loaded successfully:', products.length);
        
        // Initialize homepage bestsellers if on homepage
        initializeHomepageBestsellers();
        
        // Display products if container exists (for other pages)
        const productContainer = document.getElementById('products-container') || 
                               document.getElementById('featured-products') ||
                               document.getElementById('bestsellers-container');
        
        if (productContainer) {
            console.log('Found container:', productContainer.id);
            if (products.length > 0) {
                displayProducts(products, productContainer.id);
            } else {
                console.warn('No products to display');
            }
        }
    } catch (error) {
        console.error('Failed to load products:', error);
        // Use fallback data if API fails
        products = fallbackProducts;
        
        // Initialize homepage bestsellers with fallback data
        initializeHomepageBestsellers();
        
        const productContainer = document.getElementById('products-container') || 
                               document.getElementById('featured-products') ||
                               document.getElementById('bestsellers-container');
        
        if (productContainer && products.length > 0) {
            console.log('Using fallback products');
            displayProducts(products, productContainer.id);
        }
    }
});

// Function to refresh products with filters
async function refreshProducts(filters = {}) {
    try {
        const loadedProducts = await loadProducts(filters);
        const productContainer = document.getElementById('products-container');
        if (productContainer) {
            displayProducts(loadedProducts, 'products-container');
        }
        return loadedProducts;
    } catch (error) {
        console.error('Error refreshing products:', error);
        return [];
    }
}
