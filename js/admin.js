// js/admin.js

function checkAdminAuth() {
    // Skip auth check for demo
    localStorage.setItem('adminLoggedIn', 'true');
    localStorage.setItem('adminUser', 'Admin');
}

function adminLogout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('adminUser');
        window.location.href = '../index.html';
    }
}

// Fix for missing functions
function toggleMobileMenu() {
    const sidebar = document.getElementById('adminSidebar');
    const overlay = document.getElementById('mobileOverlay');
    if (sidebar && overlay) {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    }
}

function closeMobileMenu() {
    const sidebar = document.getElementById('adminSidebar');
    const overlay = document.getElementById('mobileOverlay');
    if (sidebar && overlay) {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    }
}

async function editProduct(productId) {
    try {
        const response = await fetch('/api/products');
        const products = await response.json();
        const product = products.find(p => p._id === productId);
        
        if (!product) {
            alert('Product not found');
            return;
        }
        
        openEditProductModal(product);
    } catch (error) {
        console.error('Error loading product:', error);
        alert('Error loading product');
    }
}

function openEditProductModal(product) {
    document.getElementById('mainContent').innerHTML += `
        <div id="editProductModal" class="modal" style="display: flex; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000; align-items: center; justify-content: center;">
            <div class="modal-content" style="background: white; border-radius: 15px; box-shadow: 0 20px 60px rgba(0,0,0,0.2); max-width: 700px; width: 90%; max-height: 90vh; overflow-y: auto; position: relative;">
                <div class="modal-header" style="background: linear-gradient(135deg, #C6A664, #D4AF37); color: white; padding: 25px 30px; border-radius: 15px 15px 0 0; position: relative;">
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <div style="background: rgba(255,255,255,0.2); padding: 12px; border-radius: 10px;">
                            <i class="fas fa-edit" style="font-size: 24px;"></i>
                        </div>
                        <div>
                            <h2 style="margin: 0; font-size: 24px; font-weight: 700;">Edit Product</h2>
                            <p style="margin: 5px 0 0 0; opacity: 0.9; font-size: 14px;">Update product information</p>
                        </div>
                    </div>
                    <button class="modal-close" onclick="closeEditProductModal()" style="position: absolute; top: 20px; right: 25px; background: rgba(255,255,255,0.2); border: none; color: white; font-size: 24px; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease;" onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'">&times;</button>
                </div>
                <form id="editProductForm" style="padding: 30px;">
                    <input type="hidden" id="editProductId" value="${product._id}">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;"> 
                    <style>
                        @media (max-width: 768px) {
                            .modal-content { width: 95% !important; margin: 10px !important; }
                            .modal-content > form > div { grid-template-columns: 1fr !important; }
                            .form-group { grid-column: 1 !important; }
                        }
                    </style>
                        <div class="form-group" style="display: flex; flex-direction: column;">
                            <label style="font-weight: 600; color: #333; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;"><i class="fas fa-tag" style="color: #C6A664;"></i> Product Name *</label>
                            <input type="text" id="editProductName" required placeholder="Enter product name" value="${product.name}" style="padding: 12px 15px; border: 2px solid #e1e5e9; border-radius: 10px; font-size: 14px; transition: all 0.3s ease; background: #f8f9fa;" onfocus="this.style.borderColor='#C6A664'; this.style.background='white';" onblur="this.style.borderColor='#e1e5e9'; this.style.background='#f8f9fa';">
                        </div>
                        <div class="form-group" style="display: flex; flex-direction: column;">
                            <label style="font-weight: 600; color: #333; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;"><i class="fas fa-list" style="color: #C6A664;"></i> Category *</label>
                            <select id="editProductCategory" required style="padding: 12px 15px; border: 2px solid #e1e5e9; border-radius: 10px; font-size: 14px; transition: all 0.3s ease; background: #f8f9fa;" onfocus="this.style.borderColor='#C6A664'; this.style.background='white';" onblur="this.style.borderColor='#e1e5e9'; this.style.background='#f8f9fa';">
                                <option value="electronics" ${product.category === 'electronics' ? 'selected' : ''}>📱 Electronics</option>
                                <option value="men" ${product.category === 'men' ? 'selected' : ''}>👔 Men's Fashion</option>
                                <option value="women" ${product.category === 'women' ? 'selected' : ''}>👗 Women's Fashion</option>
                                <option value="perfumes" ${product.category === 'perfumes' ? 'selected' : ''}>🌸 Perfumes</option>
                            </select>
                        </div>
                        <div class="form-group" style="display: flex; flex-direction: column;">
                            <label style="font-weight: 600; color: #333; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;"><i class="fas fa-dollar-sign" style="color: #C6A664;"></i> Original Price (Rs.)</label>
                            <input type="number" id="editProductOriginalPrice" placeholder="0" min="1" value="${product.originalPrice || ''}" style="padding: 12px 15px; border: 2px solid #e1e5e9; border-radius: 10px; font-size: 14px; transition: all 0.3s ease; background: #f8f9fa;" onfocus="this.style.borderColor='#C6A664'; this.style.background='white';" onblur="this.style.borderColor='#e1e5e9'; this.style.background='#f8f9fa';" onchange="calculateEditDiscount()">
                            <small style="color: #666; margin-top: 5px; font-size: 12px;">💡 Leave empty if no discount</small>
                        </div>
                        <div class="form-group" style="display: flex; flex-direction: column;">
                            <label style="font-weight: 600; color: #333; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;"><i class="fas fa-money-bill" style="color: #C6A664;"></i> Sale Price (Rs.) *</label>
                            <input type="number" id="editProductPrice" required placeholder="0" min="1" value="${product.price}" style="padding: 12px 15px; border: 2px solid #e1e5e9; border-radius: 10px; font-size: 14px; transition: all 0.3s ease; background: #f8f9fa;" onfocus="this.style.borderColor='#C6A664'; this.style.background='white';" onblur="this.style.borderColor='#e1e5e9'; this.style.background='#f8f9fa';" onchange="calculateEditDiscount()">
                            <div id="editDiscountDisplay" style="margin-top: 5px; font-size: 12px; font-weight: 600;"></div>
                        </div>
                        <div class="form-group" style="display: flex; flex-direction: column;">
                            <label style="font-weight: 600; color: #333; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;"><i class="fas fa-boxes" style="color: #C6A664;"></i> Stock Quantity *</label>
                            <input type="number" id="editProductStock" required placeholder="0" min="0" value="${product.stock || 0}" style="padding: 12px 15px; border: 2px solid #e1e5e9; border-radius: 10px; font-size: 14px; transition: all 0.3s ease; background: #f8f9fa;" onfocus="this.style.borderColor='#C6A664'; this.style.background='white';" onblur="this.style.borderColor='#e1e5e9'; this.style.background='#f8f9fa';">
                        </div>
                        <div class="form-group" style="grid-column: 1 / -1; display: flex; flex-direction: column;">
                            <label style="font-weight: 600; color: #333; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;"><i class="fas fa-align-left" style="color: #C6A664;"></i> Product Description *</label>
                            <textarea id="editProductDescription" required rows="4" placeholder="Describe your product features, benefits, and specifications..." style="padding: 12px 15px; border: 2px solid #e1e5e9; border-radius: 10px; font-size: 14px; transition: all 0.3s ease; background: #f8f9fa; resize: vertical; font-family: inherit;" onfocus="this.style.borderColor='#C6A664'; this.style.background='white';" onblur="this.style.borderColor='#e1e5e9'; this.style.background='#f8f9fa';">${product.description || ''}</textarea>
                        </div>
                        <div class="form-group" style="grid-column: 1 / -1;">
                            <label style="font-weight: 600; color: #333; margin-bottom: 15px; display: flex; align-items: center; gap: 8px;"><i class="fas fa-images" style="color: #C6A664;"></i> Product Images</label>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                <div>
                                    <label style="font-size: 14px; font-weight: 500; color: #555; margin-bottom: 5px; display: block;">Main Image URL *</label>
                                    <input type="url" id="editProductImage" required placeholder="https://example.com/main-image.jpg" value="${product.image}" style="width: 100%; padding: 12px 15px; border: 2px solid #e1e5e9; border-radius: 10px; font-size: 14px; transition: all 0.3s ease; background: #f8f9fa;" onfocus="this.style.borderColor='#C6A664'; this.style.background='white';" onblur="this.style.borderColor='#e1e5e9'; this.style.background='#f8f9fa';">
                                </div>
                                <div>
                                    <label style="font-size: 14px; font-weight: 500; color: #555; margin-bottom: 5px; display: block;">Image 2 URL</label>
                                    <input type="url" id="editProductImage2" placeholder="https://example.com/image-2.jpg" value="${product.images && product.images[1] ? product.images[1] : ''}" style="width: 100%; padding: 12px 15px; border: 2px solid #e1e5e9; border-radius: 10px; font-size: 14px; transition: all 0.3s ease; background: #f8f9fa;" onfocus="this.style.borderColor='#C6A664'; this.style.background='white';" onblur="this.style.borderColor='#e1e5e9'; this.style.background='#f8f9fa';">
                                </div>
                                <div>
                                    <label style="font-size: 14px; font-weight: 500; color: #555; margin-bottom: 5px; display: block;">Image 3 URL</label>
                                    <input type="url" id="editProductImage3" placeholder="https://example.com/image-3.jpg" value="${product.images && product.images[2] ? product.images[2] : ''}" style="width: 100%; padding: 12px 15px; border: 2px solid #e1e5e9; border-radius: 10px; font-size: 14px; transition: all 0.3s ease; background: #f8f9fa;" onfocus="this.style.borderColor='#C6A664'; this.style.background='white';" onblur="this.style.borderColor='#e1e5e9'; this.style.background='#f8f9fa';">
                                </div>
                                <div>
                                    <label style="font-size: 14px; font-weight: 500; color: #555; margin-bottom: 5px; display: block;">Image 4 URL</label>
                                    <input type="url" id="editProductImage4" placeholder="https://example.com/image-4.jpg" value="${product.images && product.images[3] ? product.images[3] : ''}" style="width: 100%; padding: 12px 15px; border: 2px solid #e1e5e9; border-radius: 10px; font-size: 14px; transition: all 0.3s ease; background: #f8f9fa;" onfocus="this.style.borderColor='#C6A664'; this.style.background='white';" onblur="this.style.borderColor='#e1e5e9'; this.style.background='#f8f9fa';">
                                </div>
                            </div>
                            <small style="color: #666; margin-top: 10px; font-size: 12px; display: block;">💡 Tip: Use high-quality images (recommended: 800x800px). Additional images will show in product gallery.</small>
                        </div>
                        <div class="form-group" style="grid-column: 1 / -1;">
                            <label style="font-weight: 600; color: #333; margin-bottom: 15px; display: flex; align-items: center; gap: 8px;"><i class="fas fa-align-left" style="color: #C6A664;"></i> Description Sections (Image + Text)</label>
                            <div style="display: grid; gap: 20px;">
                                <div style="padding: 15px; background: #f8f9fa; border-radius: 10px;">
                                    <label style="font-size: 14px; font-weight: 500; color: #555; margin-bottom: 5px; display: block;">Section 1 Image URL</label>
                                    <input type="url" id="editDescSection1Image" placeholder="https://example.com/section-1.jpg" value="${product.descriptionSections && product.descriptionSections[0] ? product.descriptionSections[0].image : ''}" style="width: 100%; padding: 12px 15px; border: 2px solid #e1e5e9; border-radius: 10px; font-size: 14px; margin-bottom: 10px;">
                                    <label style="font-size: 14px; font-weight: 500; color: #555; margin-bottom: 5px; display: block;">Section 1 Text</label>
                                    <textarea id="editDescSection1Text" rows="3" placeholder="Description text for section 1..." style="width: 100%; padding: 12px 15px; border: 2px solid #e1e5e9; border-radius: 10px; font-size: 14px; resize: vertical; font-family: inherit;">${product.descriptionSections && product.descriptionSections[0] ? product.descriptionSections[0].text : ''}</textarea>
                                </div>
                                <div style="padding: 15px; background: #f8f9fa; border-radius: 10px;">
                                    <label style="font-size: 14px; font-weight: 500; color: #555; margin-bottom: 5px; display: block;">Section 2 Image URL</label>
                                    <input type="url" id="editDescSection2Image" placeholder="https://example.com/section-2.jpg" value="${product.descriptionSections && product.descriptionSections[1] ? product.descriptionSections[1].image : ''}" style="width: 100%; padding: 12px 15px; border: 2px solid #e1e5e9; border-radius: 10px; font-size: 14px; margin-bottom: 10px;">
                                    <label style="font-size: 14px; font-weight: 500; color: #555; margin-bottom: 5px; display: block;">Section 2 Text</label>
                                    <textarea id="editDescSection2Text" rows="3" placeholder="Description text for section 2..." style="width: 100%; padding: 12px 15px; border: 2px solid #e1e5e9; border-radius: 10px; font-size: 14px; resize: vertical; font-family: inherit;">${product.descriptionSections && product.descriptionSections[1] ? product.descriptionSections[1].text : ''}</textarea>
                                </div>
                                <div style="padding: 15px; background: #f8f9fa; border-radius: 10px;">
                                    <label style="font-size: 14px; font-weight: 500; color: #555; margin-bottom: 5px; display: block;">Section 3 Image URL</label>
                                    <input type="url" id="editDescSection3Image" placeholder="https://example.com/section-3.jpg" value="${product.descriptionSections && product.descriptionSections[2] ? product.descriptionSections[2].image : ''}" style="width: 100%; padding: 12px 15px; border: 2px solid #e1e5e9; border-radius: 10px; font-size: 14px; margin-bottom: 10px;">
                                    <label style="font-size: 14px; font-weight: 500; color: #555; margin-bottom: 5px; display: block;">Section 3 Text</label>
                                    <textarea id="editDescSection3Text" rows="3" placeholder="Description text for section 3..." style="width: 100%; padding: 12px 15px; border: 2px solid #e1e5e9; border-radius: 10px; font-size: 14px; resize: vertical; font-family: inherit;">${product.descriptionSections && product.descriptionSections[2] ? product.descriptionSections[2].text : ''}</textarea>
                                </div>
                            </div>
                            <small style="color: #666; margin-top: 10px; font-size: 12px; display: block;">💡 These will display as alternating image-text sections in product view.</small>
                        </div>
                        <div class="form-group" style="display: flex; flex-direction: column; gap: 15px;">
                            <label style="font-weight: 600; color: #333; margin-bottom: 5px;">Product Badges</label>
                            <label style="display: flex; align-items: center; gap: 12px; padding: 12px; background: #f8f9fa; border-radius: 10px; cursor: pointer; transition: all 0.3s ease;" onmouseover="this.style.background='#e9ecef'" onmouseout="this.style.background='#f8f9fa'">
                                <input type="checkbox" id="editProductBestseller" ${product.bestseller ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: #C6A664;">
                                <div style="display: flex; align-items: center; gap: 8px;">
                                    <i class="fas fa-fire" style="color: #ff6b35;"></i>
                                    <span style="font-weight: 500;">Mark as Bestseller</span>
                                </div>
                            </label>
                        </div>
                        <div class="form-group" style="display: flex; flex-direction: column; gap: 15px;">
                            <label style="font-weight: 600; color: #333; margin-bottom: 5px; opacity: 0;">.</label>
                            <label style="display: flex; align-items: center; gap: 12px; padding: 12px; background: #f8f9fa; border-radius: 10px; cursor: pointer; transition: all 0.3s ease;" onmouseover="this.style.background='#e9ecef'" onmouseout="this.style.background='#f8f9fa'">
                                <input type="checkbox" id="editProductNew" ${product.new ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: #C6A664;">
                                <div style="display: flex; align-items: center; gap: 8px;">
                                    <i class="fas fa-star" style="color: #C6A664;"></i>
                                    <span style="font-weight: 500;">Mark as New Arrival</span>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div style="display: flex; gap: 15px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e1e5e9;">
                        <button type="submit" class="btn btn-primary" style="flex: 1; background: linear-gradient(135deg, #C6A664, #D4AF37); border: none; color: white; padding: 15px 25px; border-radius: 10px; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; gap: 10px;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 25px rgba(198, 166, 100, 0.3)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';">
                            <i class="fas fa-save"></i> Update Product
                        </button>
                        <button type="button" class="btn btn-outline" onclick="closeEditProductModal()" style="flex: 1; background: transparent; border: 2px solid #e1e5e9; color: #666; padding: 15px 25px; border-radius: 10px; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; gap: 10px;" onmouseover="this.style.borderColor='#C6A664'; this.style.color='#C6A664';" onmouseout="this.style.borderColor='#e1e5e9'; this.style.color='#666';">
                            <i class="fas fa-times"></i> Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.getElementById('editProductForm').addEventListener('submit', handleEditProduct);
    calculateEditDiscount();
}

function closeEditProductModal() {
    const modal = document.getElementById('editProductModal');
    if (modal) modal.remove();
}

function calculateEditDiscount() {
    const originalPrice = parseFloat(document.getElementById('editProductOriginalPrice').value) || 0;
    const salePrice = parseFloat(document.getElementById('editProductPrice').value) || 0;
    const discountDisplay = document.getElementById('editDiscountDisplay');
    
    if (discountDisplay && originalPrice > 0 && salePrice > 0 && originalPrice > salePrice) {
        const discount = Math.round(((originalPrice - salePrice) / originalPrice) * 100);
        const savings = originalPrice - salePrice;
        discountDisplay.innerHTML = `<span style="color: #4CAF50;">🎉 ${discount}% OFF - Save Rs. ${savings.toLocaleString()}</span>`;
    } else if (discountDisplay) {
        discountDisplay.innerHTML = '';
    }
}

async function handleEditProduct(e) {
    e.preventDefault();
    
    const productId = document.getElementById('editProductId').value;
    const originalPrice = parseFloat(document.getElementById('editProductOriginalPrice').value) || null;
    const mainImage = document.getElementById('editProductImage').value;
    const images = [mainImage];
    
    const img2 = document.getElementById('editProductImage2').value.trim();
    const img3 = document.getElementById('editProductImage3').value.trim();
    const img4 = document.getElementById('editProductImage4').value.trim();
    
    if (img2) images.push(img2);
    if (img3) images.push(img3);
    if (img4) images.push(img4);
    
    const descriptionSections = [];
    const section1Image = document.getElementById('editDescSection1Image').value.trim();
    const section1Text = document.getElementById('editDescSection1Text').value.trim();
    const section2Image = document.getElementById('editDescSection2Image').value.trim();
    const section2Text = document.getElementById('editDescSection2Text').value.trim();
    const section3Image = document.getElementById('editDescSection3Image').value.trim();
    const section3Text = document.getElementById('editDescSection3Text').value.trim();
    
    if (section1Image && section1Text) descriptionSections.push({ image: section1Image, text: section1Text });
    if (section2Image && section2Text) descriptionSections.push({ image: section2Image, text: section2Text });
    if (section3Image && section3Text) descriptionSections.push({ image: section3Image, text: section3Text });
    
    const productData = {
        name: document.getElementById('editProductName').value,
        category: document.getElementById('editProductCategory').value,
        price: parseInt(document.getElementById('editProductPrice').value),
        originalPrice: originalPrice,
        stock: parseInt(document.getElementById('editProductStock').value),
        description: document.getElementById('editProductDescription').value,
        image: mainImage,
        images: images,
        descriptionSections: descriptionSections,
        bestseller: document.getElementById('editProductBestseller').checked,
        new: document.getElementById('editProductNew').checked
    };
    
    try {
        const response = await fetch(`/api/admin/products/${productId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        });
        
        if (response.ok) {
            alert(`Product "${productData.name}" updated successfully!`);
            closeEditProductModal();
            loadProductsContent();
            loadDashboardFromAPI();
        } else {
            alert('Error updating product. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error updating product. Please try again.');
    }
}
