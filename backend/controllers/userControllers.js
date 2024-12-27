const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// User Registration
const registerUser = (req, res) => {
    const { firstName, lastName, mobile, password } = req.body;
    
    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    db.query('CALL InsertUser(?, ?, ?, ?)', [firstName, lastName, mobile, hashedPassword], (err) => {
        if (err) {
            res.status(500).json({ error: 'Registration failed' });
        } else {
            res.status(201).json({ message: 'User registered successfully' });
        }
    });
};

// User Login
const loginUser = (req, res) => {
    const { mobile, password } = req.body;
    
    db.query('CALL GetUserByMobile(?)', [mobile], (err, results) => {
        if (results[0].length > 0) {
            const user = results[0][0];
            
            if (bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign(
                    { id: user.id, mobile: user.mobile },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                );
                res.json({ message: `Good ${getGreeting()}, ${user.firstName}`, token });
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    });
};

// Greeting Message Based on Time
const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Morning';
    if (hour < 18) return 'Afternoon';
    return 'Evening';
};

module.exports = { registerUser, loginUser };
