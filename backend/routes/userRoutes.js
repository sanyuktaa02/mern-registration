// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Database Connection (use the same as in index.js)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mern_registration'
});

// 1. POST /api/register - User Registration
router.post('/register', (req, res) => {
  const { firstName, lastName, mobile, password } = req.body;

  // Hash password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: 'Password hashing failed' });

    // Insert into DB
    const query = `CALL insert_user(?, ?, ?, ?)`;
    db.query(query, [firstName, lastName, mobile, hashedPassword], (err, result) => {
      if (err) return res.status(500).json({ error: 'User registration failed' });
      res.status(200).json({ message: 'User registered successfully' });
    });
  });
});

// 2. POST /api/login - User Login
router.post('/login', (req, res) => {
  const { mobile, password } = req.body;

  // Fetch user by mobile number
  const query = `CALL get_user_by_mobile(?)`;
  db.query(query, [mobile], (err, result) => {
    if (err || result.length === 0) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Compare hashed password
    bcrypt.compare(password, result[0].password, (err, isMatch) => {
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid password' });
      }

      // Generate JWT token
      const token = jwt.sign({ id: result[0].id, mobile: result[0].mobile }, 'your_jwt_secret', { expiresIn: '1h' });

      res.status(200).json({
        message: `Good Morning ${result[0].firstName}`,
        token
      });
    });
  });
});

// 3. GET /api/users - Get all users
router.get('/users', (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch users' });
    res.status(200).json(result);
  });
});

// 4. PUT /api/users/:id - Update user details
router.put('/users/:id', (req, res) => {
  const { firstName, lastName, password } = req.body;
  const { id } = req.params;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: 'Password hashing failed' });

    const query = `CALL update_user(?, ?, ?, ?)`;
    db.query(query, [id, firstName, lastName, hashedPassword], (err, result) => {
      if (err) return res.status(500).json({ error: 'Failed to update user' });
      res.status(200).json({ message: 'User updated successfully' });
    });
  });
});

// 5. DELETE /api/users/:id - Delete a user
router.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const query = `CALL delete_user(?)`;
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to delete user' });
    res.status(200).json({ message: 'User deleted successfully' });
  });
});

module.exports = router;
