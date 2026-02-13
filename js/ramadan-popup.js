// Ramadan Popup
(function() {
  function showRamadanPopup() {
    const popup = document.getElementById('ramadanPopup');
    if (popup) {
      setTimeout(() => {
        popup.style.display = 'block';
      }, 1000);
    }
  }

  function closeRamadanPopup() {
    const popup = document.getElementById('ramadanPopup');
    if (popup) {
      popup.style.display = 'none';
      sessionStorage.setItem('ramadanPopupShown', 'true');
    }
  }

  function shopNow() {
    closeRamadanPopup();
    window.location.href = 'products.html';
  }

  window.closeRamadanPopup = closeRamadanPopup;
  window.shopNow = shopNow;

  document.addEventListener('DOMContentLoaded', function() {
    if (!sessionStorage.getItem('ramadanPopupShown')) {
      showRamadanPopup();
    }
  });
})();
