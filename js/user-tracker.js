// User Tracker - Real-time active users counter
(function() {
  // Check if io is available
  if (typeof io === 'undefined') {
    console.error('Socket.IO not loaded!');
    return;
  }
  
  const socket = io();
  
  socket.on('connect', () => {
    console.log('✅ User tracker connected to server');
  });
  
  socket.on('userCount', (count) => {
    console.log('📊 Received user count:', count);
    const tracker = document.getElementById('activeUsersCount');
    if (tracker) {
      tracker.textContent = count;
    }
  });
  
  socket.on('connect_error', (error) => {
    console.error('❌ Socket.IO connection error:', error.message);
  });
  
  socket.on('disconnect', () => {
    console.log('⚠️ Disconnected from server');
  });
})();
