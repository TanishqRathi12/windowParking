const express = require('express');
const { registerAdmin,loginAdmin } = require('../controller/dynamo');
const path = require('path');

const router = express.Router();

// Route for admin registration
router.post('/register', async (req, res) => {
    const { adminName, email, password } = req.body;

    try {
        const adminData = await registerAdmin(adminName, email, password);
        res.status(201).json({ message: 'Admin registered successfully', adminData });
    } catch (error) {
        console.error("Error during admin registration:", error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'register.html'));
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await loginAdmin(email, password);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error during admin login:", error);
        res.status(401).json({ error: error.message });
    }
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'login.html'));
});


module.exports = router;