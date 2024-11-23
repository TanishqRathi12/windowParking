import React, { useState, useEffect } from "react";

function Available() {
  const [locations, setLocations] = useState([]); // State to store parking locations
  const [error, setError] = useState(null); // State to store any errors
  const [loading, setLoading] = useState(true); // State to track loading state

  const sample=[
    {
      "name": "Parking Lot A",
      "address": "123 Main St",
      "spotsAvailable": 10,
      "distance": 1.2
    },
    {
      "name": "Parking Lot B",
      "address": "456 Elm St",
      "spotsAvailable": 5,
      "distance": 2.4
    }
  ]
  

  useEffect(() => {
    // Fetch parking locations from backend
    const fetchLocations = async () => {
      try {
        const response = await fetch("http://your-backend-api.com/parking/available"); // Replace with your API URL
        if (!response.ok) {
          throw new Error("Failed to fetch parking locations");
        }
        const data = await response.json();
        setLocations(data); // Assume backend returns an array of locations
        setError(null); // Clear any previous errors
      } catch (err) {
        setLocations(sample);
        // setError(err.message);
      } finally {
        setLoading(false); // Loading is complete
      }
    };

    fetchLocations();
  }, []); // Empty dependency array means this effect runs once after the component mounts

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Available Parking Locations</h1>

      {/* Display loading spinner */}
      {loading && <p className="text-gray-600">Loading...</p>}

      {/* Display error message */}
      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-600 rounded-md">
          <p>Error: {error}</p>
        </div>
      )}

      {/* Display parking locations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
        {locations.map((location, index) => (
          <div
            key={index}
            className="p-4 bg-white shadow-md rounded-md flex flex-col items-start"
          >
            <h2 className="text-lg font-semibold">{location.name}</h2>
            <p className="text-gray-600">Address: {location.address}</p>
            <p className="text-gray-600">Spots Available: {location.spotsAvailable}</p>
            <p className="text-gray-600">Distance: {location.distance} km</p>
          </div>
        ))}
      </div>

      {/* Show message if no locations found */}
      {!loading && locations.length === 0 && !error && (
        <p className="text-gray-600">No available parking locations nearby.</p>
      )}
    </div>
  );
}

export default Available;
