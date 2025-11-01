// js/navbar.js

function loadNavbar() {
    const navbar = `
        <div class="top-bar">
            <div class="container">
                <div class="top-bar-left">
                    <span class="promo-text">🎉 Grand Opening Sale - Up to 50% OFF!</span>
                </div>
                <div class="top-bar-right">
                    <a href="tel:+923001234567" class="contact-link">
                        <i class="fas fa-phone"></i> +92 300 1234567
                    </a>
                    <span class="divider">|</span>
                    <a href="mailto:support@mfproduction.com" class="contact-link">
                        <i class="fas fa-envelope"></i> support@mfproduction.com
                    </a>
                </div>
            </div>
        </div>

        <nav class="navbar" id="navbar">
            <div class="container">
                <a href="index.html" class="logo">
                    <img src="assets/images/mf_production_logo.png" alt="MF Production" class="logo-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                    <span class="logo-fallback" style="display:none; font-size:24px; font-weight:700; color:var(--primary-600);">MF</span>
                </a>

                <div class="nav-center">
                    <div class="nav-links" id="navLinks">
                        <a href="index.html" class="nav-link active">
                            <i class="fas fa-home"></i>
                            <span>Home</span>
                        </a>
                        <div class="nav-dropdown">
                            <a href="products.html" class="nav-link dropdown-toggle">
                                <i class="fas fa-th-large"></i>
                                <span>Categories</span>
                                <i class="fas fa-chevron-down"></i>
                            </a>
                            <div class="dropdown-menu">
                                <a href="products.html?category=electronics" class="dropdown-item">
                                    <i class="fas fa-laptop"></i>
                                    <div>
                                        <span>Electronics</span>
                                        <small>Latest Tech Gadgets</small>
                                    </div>
                                </a>
                                <a href="products.html?category=men" class="dropdown-item">
                                    <i class="fas fa-tshirt"></i>
                                    <div>
                                        <span>Men's Fashion</span>
                                        <small>Style & Comfort</small>
                                    </div>
                                </a>
                                <a href="products.html?category=women" class="dropdown-item">
                                    <i class="fas fa-female"></i>
                                    <div>
                                        <span>Women's Fashion</span>
                                        <small>Elegance Redefined</small>
                                    </div>
                                </a>
                                <a href="products.html?category=perfumes" class="dropdown-item">
                                    <i class="fas fa-spray-can"></i>
                                    <div>
                                        <span>Perfumes</span>
                                        <small>Signature Scents</small>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <a href="products.html?filter=new" class="nav-link">
                            <i class="fas fa-star"></i>
                            <span>New Arrivals</span>
                            <span class="nav-badge">Hot</span>
                        </a>
                        <a href="products.html?sale=true" class="nav-link">
                            <i class="fas fa-fire"></i>
                            <span>Sale</span>
                            <span class="nav-badge sale">50% OFF</span>
                        </a>
                        <a href="about.html" class="nav-link">
                            <i class="fas fa-info-circle"></i>
                            <span>About</span>
                        </a>
                        <a href="contact.html" class="nav-link">
                            <i class="fas fa-phone-alt"></i>
                            <span>Contact</span>
                        </a>
                    </div>
                </div>

                <div class="nav-actions">
                    <div class="search-container">
                        <div class="search-box" id="searchBox">
                            <input type="text" placeholder="Search products..." id="navSearch" autocomplete="off">
                            <button type="button" onclick="searchProducts()" class="search-btn">
                                <i class="fas fa-search"></i>
                            </button>
                            <button type="button" onclick="toggleSearch()" class="search-toggle">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                        <div class="search-suggestions" id="searchSuggestions"></div>
                    </div>

                    <div class="nav-icon-group">
                        <a href="wishlist.html" class="nav-icon" title="Wishlist">
                            <i class="fas fa-heart"></i>
                            <span class="icon-count" id="wishlistCount">0</span>
                        </a>
                        
                        <a href="cart.html" class="nav-icon cart-icon" title="Shopping Cart">
                            <i class="fas fa-shopping-cart"></i>
                            <span class="icon-count" id="cartCount">0</span>
                        </a>
                    </div>

                    <div class="mobile-menu-toggle" onclick="toggleMobileMenu()" id="mobileToggle">
                        <i class="fas fa-bars"></i>
                    </div>
                </div>
            </div>
        </nav>

        <div class="mobile-overlay" id="mobileOverlay" onclick="closeMobileMenu()"></div>
    `;

    document.getElementById('navbar-container').innerHTML = navbar;
    initializeNavbar();
}

function initializeNavbar() {
    updateCartCount();
    updateWishlistCount();
    setupScrollEffect();
    setupSearchFunctionality();
    setupDropdowns();
    setActiveNavLink();
}

function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const mobileToggle = document.getElementById('mobileToggle');
    const overlay = document.getElementById('mobileOverlay');
    const body = document.body;
    
    navLinks.classList.toggle('active');
    mobileToggle.classList.toggle('active');
    overlay.classList.toggle('active');
    body.classList.toggle('mobile-menu-open');
}

function closeMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const mobileToggle = document.getElementById('mobileToggle');
    const overlay = document.getElementById('mobileOverlay');
    const body = document.body;
    
    navLinks.classList.remove('active');
    mobileToggle.classList.remove('active');
    overlay.classList.remove('active');
    body.classList.remove('mobile-menu-open');
}

function toggleSearch() {
    const searchBox = document.getElementById('searchBox');
    const searchInput = document.getElementById('navSearch');
    
    searchBox.classList.toggle('active');
    if (searchBox.classList.contains('active')) {
        searchInput.focus();
    }
}

function searchProducts() {
    const query = document.getElementById('navSearch').value.trim();
    if (query) {
        window.location.href = `products.html?search=${encodeURIComponent(query)}`;
    }
}

function setupSearchFunctionality() {
    const searchInput = document.getElementById('navSearch');
    const searchSuggestions = document.getElementById('searchSuggestions');
    
    if (searchInput) {
        searchInput.addEventListener('input', handleSearchInput);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchProducts();
            }
        });
        
        // Close suggestions when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.search-container')) {
                searchSuggestions.style.display = 'none';
            }
        });
    }
}

function handleSearchInput(e) {
    const query = e.target.value.trim();
    const suggestions = document.getElementById('searchSuggestions');
    
    if (query.length > 2) {
        // Mock suggestions - replace with actual search logic
        const mockSuggestions = [
            'Wireless Earbuds',
            'Men\'s T-Shirt',
            'Women\'s Dress',
            'Perfume Set',
            'Smartphone',
            'Laptop'
        ].filter(item => item.toLowerCase().includes(query.toLowerCase()));
        
        if (mockSuggestions.length > 0) {
            suggestions.innerHTML = mockSuggestions
                .map(item => `<div class="suggestion-item" onclick="selectSuggestion('${item}')">${item}</div>`)
                .join('');
            suggestions.style.display = 'block';
        } else {
            suggestions.style.display = 'none';
        }
    } else {
        suggestions.style.display = 'none';
    }
}

function selectSuggestion(suggestion) {
    document.getElementById('navSearch').value = suggestion;
    document.getElementById('searchSuggestions').style.display = 'none';
    searchProducts();
}

function setupScrollEffect() {
    const navbar = document.getElementById('navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
        
        lastScrollY = currentScrollY;
    });
}

function setupDropdowns() {
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        dropdown.addEventListener('mouseenter', () => {
            menu.classList.add('show');
        });
        
        dropdown.addEventListener('mouseleave', () => {
            menu.classList.remove('show');
        });
    });
}

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountEl = document.getElementById('cartCount');
    if (cartCountEl) {
        cartCountEl.textContent = count;
        cartCountEl.style.display = count > 0 ? 'flex' : 'none';
    }
}

function updateWishlistCount() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const count = wishlist.length;
    const wishlistCountEl = document.getElementById('wishlistCount');
    if (wishlistCountEl) {
        wishlistCountEl.textContent = count;
        wishlistCountEl.style.display = count > 0 ? 'flex' : 'none';
    }
}

// Load navbar on page load
document.addEventListener('DOMContentLoaded', loadNavbar);

// Update counts when storage changes
window.addEventListener('storage', function(e) {
    if (e.key === 'cart') {
        updateCartCount();
    }
    if (e.key === 'wishlist') {
        updateWishlistCount();
    }
});
