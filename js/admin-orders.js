// Admin Orders Management
let adminOrders = [];

// Load admin orders
async function loadAdminOrders() {
    try {
        adminOrders = await API.getAdminOrders();
        displayAdminOrders();
    } catch (error) {
        console.error('Error loading admin orders:', error);
        showNotification('Error loading orders', 'error');
    }
}

// Display admin orders
function displayAdminOrders() {
    const container = document.getElementById('admin-orders-container');
    if (!container) return;

    container.innerHTML = adminOrders.map(order => `
        <div class="admin-order-card">
            <div class="order-header">
                <div class="order-info">
                    <h3>Order #${order.orderNumber}</h3>
                    <p class="order-date">${new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div class="order-status">
                    <select class="status-select" onchange="updateOrderStatus('${order._id}', this.value)">
                        <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="confirmed" ${order.status === 'confirmed' ? 'selected' : ''}>Confirmed</option>
                        <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Processing</option>
                        <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>Shipped</option>
                        <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                        <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                </div>
            </div>
            
            <div class="customer-info">
                <h4>Customer Details</h4>
                <p><strong>Name:</strong> ${order.customerInfo.name}</p>
                <p><strong>Email:</strong> ${order.customerInfo.email}</p>
                <p><strong>Phone:</strong> ${order.customerInfo.phone}</p>
                <p><strong>Address:</strong> ${order.customerInfo.address}, ${order.customerInfo.city}</p>
            </div>
            
            <div class="order-items">
                <h4>Items (${order.items.length})</h4>
                ${order.items.map(item => `
                    <div class="order-item">
                        <img src="${item.image}" alt="${item.name}" class="item-image">
                        <div class="item-details">
                            <h5>${item.name}</h5>
                            <p>Qty: ${item.quantity} × AED ${item.price.toLocaleString()}</p>
                        </div>
                        <div class="item-total">
                            AED ${(item.quantity * item.price).toLocaleString()}
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="order-summary">
                <div class="payment-info">
                    <p><strong>Payment Method:</strong> ${order.paymentMethod.toUpperCase()}</p>
                    <p><strong>Payment Status:</strong> 
                        <span class="payment-status ${order.paymentStatus}">${order.paymentStatus}</span>
                    </p>
                </div>
                <div class="total-amount">
                    <h4>Total: AED ${order.totalAmount.toLocaleString()}</h4>
                </div>
            </div>
        </div>
    `).join('');
}

// Update order status
async function updateOrderStatus(orderId, newStatus) {
    try {
        await API.updateOrderStatus(orderId, newStatus);
        showNotification('Order status updated successfully', 'success');
        loadAdminOrders();
    } catch (error) {
        console.error('Error updating order status:', error);
        showNotification('Error updating order status', 'error');
    }
}

// Filter orders by status
function filterOrders(status) {
    const filteredOrders = status === 'all' ? adminOrders : adminOrders.filter(order => order.status === status);
    
    const container = document.getElementById('admin-orders-container');
    if (!container) return;

    container.innerHTML = filteredOrders.map(order => `
        <div class="admin-order-card">
            <!-- Same order card HTML as above -->
        </div>
    `).join('');
}

// Initialize orders page
document.addEventListener('DOMContentLoaded', function() {
    loadAdminOrders();
    
    // Add filter event listeners
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterOrders(this.dataset.status);
        });
    });
});
