// Admin Products Management
let adminProducts = [];

// Helper function to get category display name
function getCategoryName(category) {
    const categoryNames = {
        'electronics': 'Electronics',
        'men': "Men's Fashion",
        'women': "Women's Fashion",
        'perfumes': 'Perfumes'
    };
    return categoryNames[category] || category;
}

// Show notification function
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed; top: 20px; right: 20px; z-index: 9999;
        padding: 15px 20px; border-radius: 8px; color: white;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Load admin products
async function loadAdminProducts() {
    try {
        adminProducts = await API.getAdminProducts();
        displayAdminProducts();
    } catch (error) {
        console.error('Error loading admin products:', error);
        showNotification('Error loading products', 'error');
    }
}

// Display admin products
function displayAdminProducts() {
    const container = document.getElementById('productsTableBody');
    if (!container) return;

    container.innerHTML = adminProducts.map(product => `
        <tr>
            <td><img src="${product.image}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;"></td>
            <td><strong>${product.name}</strong></td>
            <td><span class="badge">${getCategoryName(product.category)}</span></td>
            <td><strong>AED ${product.price.toLocaleString()}</strong></td>
            <td>${product.stock}</td>
            <td>
                ${product.isActive && product.stock > 0 
                    ? '<span class="status-badge status-delivered">In Stock</span>' 
                    : '<span class="status-badge status-cancelled">Out of Stock</span>'}
            </td>
            <td>
                <button class="btn-icon" onclick="editProduct('${product._id}')" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon" onclick="deleteProduct('${product._id}')" title="Delete" style="color: var(--danger);">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Add new product
async function addProduct() {
    const form = document.getElementById('productForm');
    const formData = new FormData(form);
    
    const productData = {
        name: formData.get('productName') || '',
        description: formData.get('productDescription') || '',
        price: parseFloat(formData.get('productPrice')) || 0,
        originalPrice: formData.get('productOriginalPrice') ? parseFloat(formData.get('productOriginalPrice')) : null,
        category: formData.get('productCategory') || '',
        image: formData.get('productImage') || '',
        stock: parseInt(formData.get('productStock')) || 0,
        bestseller: formData.get('productBestseller') === 'on',
        new: formData.get('productNew') === 'on'
    };
    
    // Validate required fields
    if (!productData.name || !productData.description || !productData.price || !productData.category || !productData.image || productData.stock < 0) {
        showNotification('Please fill all required fields', 'error');
        return;
    }

    try {
        const result = await API.addProduct(productData);
        showNotification('Product added successfully', 'success');
        closeProductModal();
        loadAdminProducts();
    } catch (error) {
        console.error('Error adding product:', error);
        showNotification('Error: ' + error.message, 'error');
    }
}

// Edit product
async function editProduct(id) {
    const product = adminProducts.find(p => p._id === id);
    if (!product) return;

    // Populate form with product data
    document.getElementById('productName').value = product.name;
    document.getElementById('productDescription').value = product.description;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productImage').value = product.image;
    document.getElementById('productStock').value = product.stock;
    document.getElementById('productBestseller').checked = product.bestseller;
    document.getElementById('productNew').checked = product.new;

    // Set form to edit mode
    document.getElementById('productForm').dataset.editId = id;
    document.getElementById('modalTitle').textContent = 'Edit Product';
    
    openProductModal();
}

// Update product
async function updateProduct(id) {
    const productData = {
        name: document.getElementById('productName').value,
        description: document.getElementById('productDescription').value,
        price: parseFloat(document.getElementById('productPrice').value),
        originalPrice: document.getElementById('productOriginalPrice')?.value ? parseFloat(document.getElementById('productOriginalPrice').value) : null,
        category: document.getElementById('productCategory').value,
        image: document.getElementById('productImage').value,
        stock: parseInt(document.getElementById('productStock').value),
        bestseller: document.getElementById('productBestseller').checked,
        new: document.getElementById('productNew').checked
    };

    try {
        await API.updateProduct(id, productData);
        showNotification('Product updated successfully', 'success');
        closeProductModal();
        loadAdminProducts();
    } catch (error) {
        console.error('Error updating product:', error);
        showNotification('Error updating product', 'error');
    }
}

// Delete product
async function deleteProduct(id) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
        await API.deleteProduct(id);
        showNotification('Product deleted successfully', 'success');
        loadAdminProducts();
    } catch (error) {
        console.error('Error deleting product:', error);
        showNotification('Error deleting product', 'error');
    }
}

// Modal functions
function showAddProductForm() {
    document.getElementById('modalTitle').textContent = 'Add New Product';
    document.getElementById('productForm').reset();
    document.getElementById('productModal').style.display = 'flex';
}



function openProductModal() {
    document.getElementById('productModal').style.display = 'flex';
}

function closeProductModal() {
    document.getElementById('productModal').style.display = 'none';
    document.getElementById('productForm').reset();
    delete document.getElementById('productForm').dataset.editId;
    document.getElementById('modalTitle').textContent = 'Add New Product';
}







// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('productForm');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const editId = this.dataset.editId;
            if (editId) {
                await updateProduct(editId);
            } else {
                await addProduct();
            }
        });
    }

    // Load products on page load
    loadAdminProducts();
});
