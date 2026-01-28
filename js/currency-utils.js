// Currency utility functions for AED formatting

/**
 * Format price in AED currency
 * @param {number} amount - The amount to format
 * @param {boolean} showCurrency - Whether to show currency symbol (default: true)
 * @returns {string} Formatted price string
 */
function formatAED(amount, showCurrency = true) {
    if (typeof amount !== 'number' || isNaN(amount)) {
        return showCurrency ? 'AED 0' : '0';
    }
    
    const formatted = amount.toLocaleString();
    return showCurrency ? `AED ${formatted}` : formatted;
}

/**
 * Convert PKR to AED (for migration purposes)
 * @param {number} pkrAmount - Amount in PKR
 * @returns {number} Amount in AED (rounded)
 */
function convertPKRtoAED(pkrAmount) {
    const conversionRate = 0.27; // Approximate rate: 1 PKR = 0.27 AED
    return Math.round(pkrAmount * conversionRate);
}

/**
 * Calculate shipping cost based on subtotal
 * @param {number} subtotal - Order subtotal in AED
 * @returns {number} Shipping cost in AED
 */
function calculateShipping(subtotal) {
    const freeShippingThreshold = 540; // AED
    const standardShipping = 40; // AED
    
    return subtotal >= freeShippingThreshold ? 0 : standardShipping;
}

/**
 * Get free shipping threshold
 * @returns {number} Free shipping threshold in AED
 */
function getFreeShippingThreshold() {
    return 540; // AED
}

/**
 * Check if order qualifies for free shipping
 * @param {number} subtotal - Order subtotal in AED
 * @returns {boolean} True if qualifies for free shipping
 */
function qualifiesForFreeShipping(subtotal) {
    return subtotal >= getFreeShippingThreshold();
}

/**
 * Calculate remaining amount needed for free shipping
 * @param {number} subtotal - Current subtotal in AED
 * @returns {number} Remaining amount needed for free shipping (0 if already qualified)
 */
function remainingForFreeShipping(subtotal) {
    const threshold = getFreeShippingThreshold();
    return subtotal >= threshold ? 0 : threshold - subtotal;
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatAED,
        convertPKRtoAED,
        calculateShipping,
        getFreeShippingThreshold,
        qualifiesForFreeShipping,
        remainingForFreeShipping
    };
}