const express = require('express');
const routes = require('./routes/routes'); // Import the routes

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Use the routes defined in route.js
app.use('/', routes);

// Define a simple route to check server status
app.get('/', (req, res) => {
    res.send('Welcome to the Smart Parking Management System API');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});