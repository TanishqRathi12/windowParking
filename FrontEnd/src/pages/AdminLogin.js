import React, { useState } from "react";

function AdminLogin() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    // Here you would typically handle the login logic
    console.log("Login attempted with:", { name, password });
  };

  const getIPLocation = async () => {
    try {
      const response = await fetch(`https://ipinfo.io?token=dfdab375e00a33`);
      const data = await response.json();
      console.log(data);
      setLocation({
        city: data.city,
        region: data.region,
        country: data.country,
        coordinates:data.loc.split(",")
      });
      // console.log(location.coordinates);
      

      setError(null);
    } catch (error) {
      setError("Unable to retrieve your location via IP");
      console.error("IP-based geolocation error:", error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Admin Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>

        {/* Location and Error Section */}
        <div className="mt-6 text-center">
          <button
            onClick={getIPLocation}
            className="w-full py-2 px-4 border border-gray-300 rounded-md text-blue-500 hover:bg-blue-50"
          >
            Get Location
          </button>

          {location && (
            <>
            <p className="text-sm text-gray-600 mt-4">
              City: {location.city}
            </p>
            <p className="text-sm text-gray-600 mt-4">
              State: {location.region}
            </p>
            </>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-600 rounded-md">
              <span className="font-semibold">Error:</span> {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
