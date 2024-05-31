require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const authenticateJWT = require('./middleware/authenticateJWT');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Security middleware to add basic security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/patients', authenticateJWT, require('./routes/patients'));
app.use('/appointments', authenticateJWT, require('./routes/appointments'));
app.use('/medical-records', authenticateJWT, require('./routes/medicalRecords'));

// Basic home page
app.get('/', (req, res) => {
  res.send('Welcome to the Health Management Tool!');
});

// Error handling middleware
app.use(errorHandler);

module.exports = app; // Export the app for testing
