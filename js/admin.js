// js/admin.js

function checkAdminAuth() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (isLoggedIn !== 'true') {
        window.location.href = 'login.html';
    }
}

function adminLogout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('adminUser');
        window.location.href = 'login.html';
    }
}
