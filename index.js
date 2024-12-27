// server/index.js
const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes'); // Import routes

const app = express();
dotenv.config();

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mern_registration'
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection failed:', err);
    return;
  }
  console.log('MySQL Connected...');
});

// Basic Route for Testing
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Use the userRoutes for any routes related to users
app.use('/api', userRoutes);  // Register routes under /api

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
