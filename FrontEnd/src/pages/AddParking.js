
import React, { useState } from "react";
import { useParams } from "react-router-dom";


function AddParking() {
  const [parkingName, setParkingName] = useState("");
  const [parkingCoordinates, setparkingCoordinates] = useState("");
  const [parkingRegion, setParkingRegion] = useState("");
  const [parkingCapacity, setParkingCapacity] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();


    // Create the parking data object
    const parkingData = {
      adminId: id.substring(1),
      locationName:parkingName,
      location:parkingCoordinates,
      regionCapacity: parkingCapacity,
      pricePerVehicle:price,
    };
    console.log(parkingData);
    
    try {
      // Send data to the backend (replace URL with your actual endpoint)
      const response = await fetch(`http://localhost:5000/parking-spaces?adminId=${id.substring(1)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parkingData),
      });

      if (response.ok) {
        setMessage("Parking place added successfully!");
        setParkingName("");
        setparkingCoordinates("");
        setParkingRegion("");
        setParkingCapacity("");
        setPrice("");
      } else {
        setMessage("Failed to add parking place. Try again.");
      }
    } catch (error) {
      console.error("Error adding parking place:", error);
      setMessage("An error occurred while adding the parking place.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Add Parking Place</h2>

        {message && (
          <div className="mb-4 text-center text-sm text-red-600">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Parking Name */}
          <div>
            <label
              htmlFor="parkingName"
              className="block text-sm font-medium text-gray-700"
            >
              Parking Name
            </label>
            <input
              id="parkingName"
              type="text"
              value={parkingName}
              onChange={(e) => setParkingName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Parking Location */}
          <div>
            <label
              htmlFor="parkingCoordinates"
              className="block text-sm font-medium text-gray-700"
            >
              Parking Coordinates
            </label>
            <input
              id="parkingCoordinates"
              type="text"
              value={parkingCoordinates}
              onChange={(e) => setparkingCoordinates(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Parking Region */}
          {/* <div>
            <label
              htmlFor="parkingRegion"
              className="block text-sm font-medium text-gray-700"
            >
              Parking Region
            </label>
            <input
              id="parkingRegion"
              type="text"
              value={parkingRegion}
              onChange={(e) => setParkingRegion(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> */}

          {/* Parking Capacity */}
          <div>
            <label
              htmlFor="parkingCapacity"
              className="block text-sm font-medium text-gray-700"
            >
              Parking Capacity
            </label>
            <input
              id="parkingCapacity"
              type="number"
              value={parkingCapacity}
              onChange={(e) => setParkingCapacity(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Parking Place
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddParking;
