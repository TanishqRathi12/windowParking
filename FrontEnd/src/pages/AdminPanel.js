import React, { useState } from "react";
import OwnerParking from "./OwnerParking";
import AddParking from "./AddParking";

function AdminPanel() {
  const [showAddParking, setshowAddParking] = useState(false);

  const handleSubmit = async () => {};

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
        <h1 className="text-3xl font-bold text-blue-600 mb-8 tracking-tight">
          Admin Panel
        </h1>

        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md border border-gray-100">
          <div className="space-y-6">
            <OwnerParking />
          </div>
        </div>

        <button
          onClick={() => setshowAddParking(!showAddParking)}
          className="mt-6 px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg
            hover:bg-blue-700 transition-colors duration-200 focus:outline-none 
            focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {showAddParking ? "Hide Parking Form" : "Add New Parking"}
        </button>

        {showAddParking && (
          <div className="mt-6 w-full max-w-md">
            <AddParking />
          </div>
        )}
      </div>
    </>
  );
}

export default AdminPanel;