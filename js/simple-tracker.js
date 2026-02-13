// Simple user tracker using random count
(function() {
  function updateTracker() {
    const count = Math.floor(Math.random() * 50) + 150; // Random 150-200
    const element = document.getElementById('activeUsersCount');
    if (element) {
      element.textContent = count;
    }
  }
  
  updateTracker();
  setInterval(updateTracker, 30000); // Update every 30 seconds
})();
