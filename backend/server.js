const express = require('express');
const cors = require("cors");
const routes = require('./routes/routes'); // Import the routes

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Add CORS middleware **before** your routes
app.use(cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    credentials: true, // Include cookies if necessary
}));
app.options("*", cors()); // Enable CORS for all preflight requests

// Use the routes defined in routes.js
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
