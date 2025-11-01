// Checkout functionality with MongoDB integration

// Submit order to MongoDB
async function submitOrder() {
    const form = document.getElementById('checkoutForm');
    if (!form) {
        showNotification('Form not found', 'error');
        return;
    }
    const formData = new FormData(form);
    
    // Get cart items
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'error');
        return;
    }
    
    // Calculate total
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Prepare order data
    const orderData = {
        customerInfo: {
            name: `${document.getElementById('firstName').value} ${document.getElementById('lastName').value}`,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value
        },
        items: cart.map(item => ({
            productId: item.id || item._id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image
        })),
        totalAmount: totalAmount,
        paymentMethod: document.querySelector('input[name="payment"]:checked')?.value || 'cod'
    };
    
    // Validate required fields
    if (!orderData.customerInfo.name || !orderData.customerInfo.email || 
        !orderData.customerInfo.phone || !orderData.customerInfo.address) {
        showNotification('Please fill all required fields', 'error');
        return;
    }
    
    console.log('Submitting order data:', orderData);
    
    try {
        // Show loading
        const submitBtn = document.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.innerHTML : 'Place Order';
        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;
        }
        
        // Submit order
        console.log('Calling API.createOrder...');
        const response = await API.createOrder(orderData);
        console.log('API response:', response);
        
        // Clear cart
        localStorage.removeItem('cart');
        
        // Show success message
        showNotification('Order placed successfully!', 'success');
        
        // Show success and redirect
        setTimeout(() => {
            alert(`Order placed successfully!\nOrder Number: ${response.orderNumber}\nThank you for shopping with MF Production!`);
            window.location.href = 'index.html';
        }, 2000);
        
    } catch (error) {
        console.error('Error submitting order:', error);
        showNotification('Error placing order. Please try again.', 'error');
        
        // Reset button
        const submitBtn = document.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }
}

// Load order details for confirmation page
async function loadOrderDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const orderNumber = urlParams.get('order');
    
    if (!orderNumber) {
        showNotification('Order not found', 'error');
        return;
    }
    
    try {
        const order = await API.getOrder(orderNumber);
        displayOrderConfirmation(order);
    } catch (error) {
        console.error('Error loading order:', error);
        showNotification('Error loading order details', 'error');
    }
}

// Display order confirmation
function displayOrderConfirmation(order) {
    const container = document.getElementById('order-confirmation-container');
    if (!container) return;
    
    container.innerHTML = `
        <div class="order-confirmation">
            <div class="confirmation-header">
                <i class="fas fa-check-circle success"></i>
                <h2>Order Confirmed!</h2>
                <p>Thank you for your order. We'll send you a confirmation email shortly.</p>
            </div>
            
            <div class="order-details">
                <div class="order-info">
                    <h3>Order Information</h3>
                    <p><strong>Order Number:</strong> ${order.orderNumber}</p>
                    <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
                    <p><strong>Status:</strong> <span class="status ${order.status}">${order.status}</span></p>
                    <p><strong>Payment Method:</strong> ${order.paymentMethod.toUpperCase()}</p>
                </div>
                
                <div class="customer-details">
                    <h3>Delivery Information</h3>
                    <p><strong>Name:</strong> ${order.customerInfo.name}</p>
                    <p><strong>Email:</strong> ${order.customerInfo.email}</p>
                    <p><strong>Phone:</strong> ${order.customerInfo.phone}</p>
                    <p><strong>Address:</strong> ${order.customerInfo.address}, ${order.customerInfo.city}</p>
                </div>
            </div>
            
            <div class="order-items">
                <h3>Order Items</h3>
                ${order.items.map(item => `
                    <div class="order-item">
                        <img src="${item.image}" alt="${item.name}" class="item-image">
                        <div class="item-details">
                            <h4>${item.name}</h4>
                            <p>Quantity: ${item.quantity}</p>
                            <p>Price: Rs. ${item.price.toLocaleString()}</p>
                        </div>
                        <div class="item-total">
                            Rs. ${(item.quantity * item.price).toLocaleString()}
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="order-summary">
                <div class="total-amount">
                    <h3>Total Amount: Rs. ${order.totalAmount.toLocaleString()}</h3>
                </div>
            </div>
            
            <div class="confirmation-actions">
                <button class="btn btn-primary" onclick="window.location.href='index.html'">
                    Continue Shopping
                </button>
                <button class="btn btn-secondary" onclick="window.print()">
                    Print Order
                </button>
            </div>
        </div>
    `;
}

// Initialize checkout page
document.addEventListener('DOMContentLoaded', function() {
    // Check if this is order confirmation page
    if (window.location.pathname.includes('order-confirmation')) {
        loadOrderDetails();
        return;
    }
    
    // Checkout form submission
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitOrder();
        });
    }
    
    // Load cart items for checkout display
    displayCheckoutItems();
});

// Display cart items in checkout
function displayCheckoutItems() {
    const container = document.getElementById('checkout-items-container');
    if (!container) return;
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <p>Your cart is empty</p>
                <a href="products.html" class="btn btn-primary">Continue Shopping</a>
            </div>
        `;
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    container.innerHTML = `
        <div class="checkout-items">
            ${cart.map(item => `
                <div class="checkout-item">
                    <img src="${item.image}" alt="${item.name}" class="item-image">
                    <div class="item-details">
                        <h4>${item.name}</h4>
                        <p>Qty: ${item.quantity} × Rs. ${item.price.toLocaleString()}</p>
                    </div>
                    <div class="item-total">
                        Rs. ${(item.quantity * item.price).toLocaleString()}
                    </div>
                </div>
            `).join('')}
        </div>
        <div class="checkout-total">
            <h3>Total: Rs. ${total.toLocaleString()}</h3>
        </div>
    `;
}
