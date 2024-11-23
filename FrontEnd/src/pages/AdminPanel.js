import React, { useState } from "react";
import OwnerParking from "./OwnerParking";

function AdminPanel() {
  const handleSubmit = async () => {};

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
        Admin Panel
      </h1>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <div className="space-y-4">
          <OwnerParking />
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
