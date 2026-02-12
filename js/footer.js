// js/footer.js - Unified Footer for All Pages

function loadFooter() {
    const footer = `
        <footer class="footer">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <div class="footer-logo">
                            <img src="assets/images/mf_production_logo.png" alt="MF Production" class="footer-logo-image">
                            <p>Your trusted destination for premium electronics, fashion & fragrances.</p>
                        </div>
                        <div class="footer-social">
                            <a href="https://www.facebook.com/profile.php?id=100090394263406"><i class="fab fa-facebook"></i></a>
                            <a href="#"><i class="fab fa-instagram"></i></a>
                            <a href="#"><i class="fab fa-whatsapp"></i></a>
                            <a href="#"><i class="fab fa-youtube"></i></a>
                        </div>
                    </div>
                    
                    <div class="footer-section">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="index.html">Home</a></li>
                            <li><a href="products.html">Products</a></li>
                            <li><a href="about.html">About Us</a></li>
                            <li><a href="contact.html">Contact</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-section">
                        <h4>Categories</h4>
                        <ul>
                            <li><a href="products.html?category=electronics">Electronics</a></li>
                            <li><a href="products.html?category=men">Men's Fashion</a></li>
                            <li><a href="products.html?category=women">Women's Fashion</a></li>
                            <li><a href="products.html?category=perfumes">Perfumes</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-section">
                        <h4>Customer Service</h4>
                        <ul>
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Returns & Exchanges</a></li>
                            <li><a href="#">Shipping Info</a></li>
                            <li><a href="#">Track Your Order</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-section">
                        <h4>Contact Info</h4>
                        <div class="contact-info">
                            <p><i class="fas fa-phone"></i> +971 54 387 4006</p>
                            <p><i class="fas fa-envelope"></i> info@mfproduction.pk</p>
                            <p><i class="fas fa-map-marker-alt"></i> Dubai Al hamriya</p>
                        </div>
                    </div>
                </div>
                
                <div class="footer-bottom">
                    <div class="footer-bottom-content">
                        <p>&copy; ${new Date().getFullYear()} MF Production. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    `;

    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = footer;
    }
}

// Load footer on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadFooter);
} else {
    loadFooter();
}
