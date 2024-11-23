const express = require('express');
const { registerAdmin,loginAdmin } = require('../controller/dynamo');
const path = require('path');
const { addParkingSpace,getParkingSpace,getAllParkingSpaces } = require('../controller/parkingController');

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

router.get('/adminPortal', (req, res) => {
    const adminId = req.query.adminId;
    if (!adminId) {
        return res.status(400).json({ error: 'Admin ID is required' });
    }

    // Serve the adminPortal.html file
    res.sendFile(path.join(__dirname, '../views', 'adminPortal.html'));
});

router.get('/addParkingSpace.html', (req, res) => {
    const adminId = req.query.adminId;
    if (!adminId) {
        return res.status(400).json({ error: 'Admin ID is required' });
    }

    // Serve the addParkingSpace.html file
    res.sendFile(path.join(__dirname, '../views', 'addParkingSpace.html'));
});


router.post('/parking-spaces', async (req, res) => {
    const { adminId, locationName, location, regionCapacity, pricePerVehicle } = req.body;

    try {
        const [latitude, longitude] = location.split(',').map(coord => coord.trim());
        const spaceData = { locationName, latitude, longitude, regionCapacity, pricePerVehicle };
        const parkingSpace = await addParkingSpace(adminId, spaceData);
        res.status(201).json({ message: 'Parking space added successfully', parkingSpace });
    } catch (error) {
        console.error("Error adding parking space:", error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/parking-spaces', async (req, res) => {
    const adminId = req.query.adminId;
    const parkingSpaces = await getAllParkingSpaces(adminId);
    res.status(200).json(parkingSpaces);
});

router.get('/parking-space', async (req, res) => {
    const adminId = req.query.adminId;
    const spaceId = req.query.spaceId;
    const parkingSpace = await getParkingSpace(adminId, spaceId);
    res.status(200).json(parkingSpace);
});

router.get('/nearest-parking-spaces', async (req, res) => {
    const { adminId, latitude, longitude } = req.query;

    try {
        const nearbySpaces = await findNearestParkingSpaces(adminId, parseFloat(latitude), parseFloat(longitude));
        res.status(200).json(nearbySpaces);
    } catch (error) {
        console.error("Error finding nearest parking spaces:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;