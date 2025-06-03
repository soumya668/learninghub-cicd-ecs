// Main application entry point
const express = require('express');
const cors = require('cors');
const userRoutes = require('./src/routes/userRoutes');
const connectDB = require('./src/config/db');

// Initialize Express app
const app = express();

// Middleware
// Configure CORS with explicit options
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow all methods
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Referer', 'User-Agent'], // Allow all headers we're sending
  credentials: true, // Allow cookies
  preflightContinue: true // Continue after preflight check
}));

// Custom middleware to ensure CORS headers are set
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Origin, Referer, User-Agent');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Handle OPTIONS requests for CORS preflight
app.options('*', cors());

// Define routes with explicit CORS handling
app.use('/api/users', cors(), (req, res, next) => {
  // Set CORS headers explicitly for user routes
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Origin, Referer, User-Agent');
  next();
}, userRoutes);

// Root route with explicit CORS handling
app.get('/', cors(), (req, res) => {
  // Set CORS headers explicitly for this route
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Origin, Referer, User-Agent');

  res.json({
    message: 'Welcome to the E-Learning Auth API New ECS',
    endpoints: {
      users: '/api/users'
    }
  });
});

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Server Error',
    message: err.message || 'Something went wrong'
  });
});

// Set port and start server
const PORT = process.env.PORT || 2000;

// Connect to MongoDB and then start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API available at http://localhost:${PORT}`);
  });
});

// For testing purposes
module.exports = app;
