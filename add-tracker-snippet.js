// Quick Add User Tracker to All Pages
// Copy and paste this code snippet before </body> tag in any HTML file

const userTrackerCode = `
<!-- User Tracker Widget -->
<div id="userTracker">
    <span class="pulse"></span>
    <span id="activeUsersCount">0</span>
    <span>online</span>
</div>

<!-- Socket.IO & User Tracker Scripts -->
<script src="https://cdn.socket.io/4.6.1/socket.io.min.js"></script>
<script src="js/user-tracker.js"></script>
`;

// Also add this in <head> section:
const cssLink = `<link rel="stylesheet" href="css/user-tracker.css">`;

console.log('=== USER TRACKER INSTALLATION ===\n');
console.log('1. Add this in <head> section:');
console.log(cssLink);
console.log('\n2. Add this before </body> tag:');
console.log(userTrackerCode);
