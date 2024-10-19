const express = require('express');
const router = express.Router();

// POST /login route
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // In this simple example, we just check if the username and password are provided
    if (username && password) {
        return res.status(200).json({ success: true, message: 'Login successful' });
    } else {
        return res.status(400).json({ success: false, message: 'Username and password required' });
    }
});

module.exports = router;
