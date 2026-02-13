# Live User Tracker

Real-time active users counter for MF Production website using Socket.IO.

## Features
- Shows live count of active users on the website
- Real-time updates using WebSocket connections
- Elegant floating widget with pulse animation
- Mobile responsive design

## Installation

1. **Install Socket.IO dependency:**
```bash
npm install socket.io
```

2. **Restart the server:**
```bash
npm start
```

## Usage

### Add to Any Page

Add these three elements to any HTML page:

**1. CSS (in `<head>`):**
```html
<link rel="stylesheet" href="css/user-tracker.css">
```

**2. Widget (before `</body>`):**
```html
<div id="userTracker">
    <span class="pulse"></span>
    <span id="activeUsersCount">0</span>
    <span>online</span>
</div>
```

**3. Scripts (before `</body>`):**
```html
<script src="https://cdn.socket.io/4.6.1/socket.io.min.js"></script>
<script src="js/user-tracker.js"></script>
```

## Files Created

- `js/user-tracker.js` - Client-side tracking logic
- `css/user-tracker.css` - Widget styling
- `user-tracker-snippet.html` - Reusable HTML snippet

## How It Works

1. When a user opens the website, Socket.IO establishes a WebSocket connection
2. Server increments active user count and broadcasts to all connected clients
3. When user closes/leaves, connection is terminated and count decreases
4. All connected clients receive real-time updates

## Customization

Edit `css/user-tracker.css` to customize:
- Position (default: bottom-right)
- Colors
- Size
- Animation effects

## API Endpoint

Get current active users via REST API:
```
GET /api/active-users
Response: { "count": 5 }
```
