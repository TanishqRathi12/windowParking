import React, { useEffect, useState } from "react";

function OwnerParking() {
  const [parkingList, setparkingList] = useState([]);

  useEffect(() => {
    const sample = [
      {
        parkingName: "harish parking",
        parkingLoc: [29.09, 32.39],
        parkingRegion: "Roorkee",
        parkingCapacity: 121,
      },
    ];

    setparkingList(sample);
  }, []);

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">
        Your Parkings
      </h2>
      <ul className="space-y-4">
        {parkingList.map((element, index) => (
          <li
            key={index}
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold text-blue-600">
              {element.parkingName}
            </h3>
            <p className="text-gray-700">
              <strong>Parking Coordinates:</strong> {element.parkingLoc.join(" , ")}
            </p>
            <p className="text-gray-700">
              <strong>Parking Region:</strong> {element.parkingRegion}
            </p>
            <p className="text-gray-700">
              <strong>Parking Capacity:</strong> {element.parkingCapacity}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OwnerParking;
