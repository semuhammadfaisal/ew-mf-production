// Reviews Management
let productReviews = [];

// Load product reviews
async function loadProductReviews(productId) {
    try {
        productReviews = await API.getProductReviews(productId);
        displayProductReviews();
        return productReviews;
    } catch (error) {
        console.error('Error loading reviews:', error);
        return [];
    }
}

// Display product reviews
function displayProductReviews() {
    const container = document.getElementById('reviews-container');
    if (!container) return;

    if (productReviews.length === 0) {
        container.innerHTML = `
            <div class="no-reviews">
                <i class="fas fa-star-o"></i>
                <h3>No reviews yet</h3>
                <p>Be the first to review this product!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = productReviews.map(review => `
        <div class="review-card">
            <div class="review-header">
                <div class="reviewer-info">
                    <div class="reviewer-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="reviewer-details">
                        <h5>${review.customerName}</h5>
                        <span class="review-date">${new Date(review.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
                <div class="review-rating">
                    ${generateStars(review.rating)}
                </div>
            </div>
            <div class="review-content">
                <p>${review.comment}</p>
            </div>
        </div>
    `).join('');
}

// Submit review
async function submitReview(productId) {
    const form = document.getElementById('reviewForm');
    const formData = new FormData(form);
    
    const reviewData = {
        productId: productId,
        customerName: formData.get('customerName'),
        rating: parseInt(formData.get('rating')),
        comment: formData.get('comment')
    };

    // Validate form
    if (!reviewData.customerName || !reviewData.rating || !reviewData.comment) {
        showNotification('Please fill all fields', 'error');
        return;
    }

    try {
        await API.submitReview(reviewData);
        showNotification('Review submitted successfully! It will be visible after approval.', 'success');
        closeReviewModal();
        form.reset();
    } catch (error) {
        console.error('Error submitting review:', error);
        showNotification('Error submitting review', 'error');
    }
}

// Review modal functions
function openReviewModal() {
    document.getElementById('reviewModal').style.display = 'block';
}

function closeReviewModal() {
    document.getElementById('reviewModal').style.display = 'none';
}

// Star rating functionality
document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('.star-rating .star');
    let selectedRating = 0;

    stars.forEach((star, index) => {
        star.addEventListener('click', function() {
            selectedRating = index + 1;
            updateStarDisplay();
            
            // Set hidden input value
            const ratingInput = document.getElementById('rating-value') || createRatingInput();
            ratingInput.value = selectedRating;
        });

        star.addEventListener('mouseover', function() {
            highlightStars(index + 1);
        });
    });

    const starContainer = document.querySelector('.star-rating');
    if (starContainer) {
        starContainer.addEventListener('mouseleave', function() {
            updateStarDisplay();
        });
    }

    function highlightStars(rating) {
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    function updateStarDisplay() {
        highlightStars(selectedRating);
    }

    function createRatingInput() {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.id = 'rating-value';
        input.name = 'rating';
        document.getElementById('reviewForm').appendChild(input);
        return input;
    }

    // Review form submission
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get product ID from URL or data attribute
            const urlParams = new URLSearchParams(window.location.search);
            const productId = urlParams.get('id') || this.dataset.productId;
            
            if (productId) {
                submitReview(productId);
            } else {
                showNotification('Product ID not found', 'error');
            }
        });
    }
});

// Admin Reviews Management
let pendingReviews = [];

// Load pending reviews for admin
async function loadPendingReviews() {
    try {
        pendingReviews = await API.getPendingReviews();
        displayPendingReviews();
    } catch (error) {
        console.error('Error loading pending reviews:', error);
        showNotification('Error loading reviews', 'error');
    }
}

// Display pending reviews for admin
function displayPendingReviews() {
    const container = document.getElementById('pending-reviews-container');
    if (!container) return;

    if (pendingReviews.length === 0) {
        container.innerHTML = `
            <div class="no-reviews">
                <i class="fas fa-check-circle"></i>
                <h3>No pending reviews</h3>
                <p>All reviews have been processed!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = pendingReviews.map(review => `
        <div class="pending-review-card">
            <div class="review-header">
                <div class="product-info">
                    <h4>${review.productId.name}</h4>
                    <p>Review by: ${review.customerName}</p>
                    <span class="review-date">${new Date(review.createdAt).toLocaleDateString()}</span>
                </div>
                <div class="review-rating">
                    ${generateStars(review.rating)}
                </div>
            </div>
            <div class="review-content">
                <p>${review.comment}</p>
            </div>
            <div class="review-actions">
                <button class="btn btn-success" onclick="approveReview('${review._id}', true)">
                    <i class="fas fa-check"></i> Approve
                </button>
                <button class="btn btn-danger" onclick="approveReview('${review._id}', false)">
                    <i class="fas fa-times"></i> Reject
                </button>
            </div>
        </div>
    `).join('');
}

// Approve or reject review
async function approveReview(reviewId, isApproved) {
    try {
        await API.approveReview(reviewId, isApproved);
        showNotification(`Review ${isApproved ? 'approved' : 'rejected'} successfully`, 'success');
        loadPendingReviews();
    } catch (error) {
        console.error('Error processing review:', error);
        showNotification('Error processing review', 'error');
    }
}
