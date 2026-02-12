// API Configuration
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000/api' 
  : '/api';

// API Helper Functions
class API {
  static async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    console.log('API Request:', url, config);

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      console.log('API Response:', response.status, data);
      
      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Products
  static async getProducts(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/products?${params}`);
  }

  static async getProduct(id) {
    return this.request(`/products/${id}`);
  }

  // Reviews
  static async getProductReviews(productId) {
    return this.request(`/reviews/product/${productId}`);
  }

  static async submitReview(reviewData) {
    return this.request('/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData)
    });
  }

  // Orders
  static async createOrder(orderData) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
  }

  static async getOrder(orderNumber) {
    return this.request(`/orders/${orderNumber}`);
  }

  // Admin APIs
  static async adminRequest(endpoint, options = {}) {
    return this.request(`/admin${endpoint}`, {
      ...options,
      headers: {
        'authorization': 'admin-token',
        ...options.headers
      }
    });
  }

  static async getAdminProducts() {
    return this.adminRequest('/products');
  }

  static async addProduct(productData) {
    return this.adminRequest('/products', {
      method: 'POST',
      body: JSON.stringify(productData)
    });
  }

  static async updateProduct(id, productData) {
    return this.adminRequest(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData)
    });
  }

  static async deleteProduct(id) {
    return this.adminRequest(`/products/${id}`, {
      method: 'DELETE'
    });
  }

  static async getAdminOrders() {
    return this.adminRequest('/orders');
  }

  static async updateOrderStatus(id, status) {
    return this.adminRequest(`/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });
  }

  static async getPendingReviews() {
    return this.adminRequest('/reviews/pending');
  }

  static async approveReview(id, isApproved) {
    return this.adminRequest(`/reviews/${id}/approve`, {
      method: 'PUT',
      body: JSON.stringify({ isApproved })
    });
  }
}
