const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Signup
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ message: 'User created successfully.', user_id: user._id });
    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ status: false, message: 'Invalid email or password' });
        }
        res.status(200).json({ message: 'Login successful.' });
    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
});

module.exports = router;
