import React, { useState } from "react";

function AdminLogin() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login attempted with:", { name, password });
  };

  const getIPLocation = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://ipinfo.io?token=dfdab375e00a33`);
      const data = await response.json();
      setLocation({
        city: data.city,
        region: data.region,
        country: data.country,
        coordinates: data.loc.split(","),
      });
    } catch (error) {
      setError("Unable to retrieve your location via IP.");
    } finally {
      setLoading(false);
    }
  };

  const getBrowserLocation = () => {
    setLoading(true);
    setError(null);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            city: "N/A",
            region: "N/A",
            country: "N/A",
            coordinates: [
              position.coords.latitude,
              position.coords.longitude,
            ],
          });
        },
        () => setError("Unable to retrieve location via browser."),
        { enableHighAccuracy: true }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-200 to-purple-300 flex items-center justify-center">
      <div className="w-full max-w-6xl flex items-center justify-between bg-white rounded-lg shadow-xl p-8">
        {/* Left Side - Image */}
        <div className="w-1/2 flex items-center justify-center mr-10">
          <img
            src="cars.jpg"
            alt="Admin Image"
            style={{height:400, width:500}}
          />
        </div>

        {/* Right Side - Admin Login Form */}
        <div className="w-1/2">
          <h2 className="text-4xl font-bold text-center text-blue-700 mb-8">
            Parking System Admin
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Name Field */}
            <div>
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
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your name"
              />
            </div>

            {/* Password Field */}
            <div>
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
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Login
            </button>
          </form>

          {/* Location Buttons */}
          <div className="mt-6 text-center space-y-3">
            <button
              onClick={getIPLocation}
              className="w-full py-3 px-4 border border-blue-600 text-blue-600 font-semibold rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Detect Location via IP
            </button>
            <button
              onClick={getBrowserLocation}
              className="w-full py-3 px-4 border border-purple-600 text-purple-600 font-semibold rounded-md hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              Detect Location via Browser
            </button>

            {/* Location or Loading Display */}
            {loading && (
              <div className="mt-4 text-blue-500 font-semibold">
                Detecting location...
              </div>
            )}
            {location && (
              <div className="mt-4 bg-green-100 p-4 rounded-md shadow-md">
                <p className="text-sm text-gray-700 font-medium">
                  <span className="font-bold">City:</span> {location.city}
                </p>
                <p className="text-sm text-gray-700 font-medium">
                  <span className="font-bold">State:</span> {location.region}
                </p>
                <p className="text-sm text-gray-700 font-medium">
                  <span className="font-bold">Country:</span> {location.country}
                </p>
                <p className="text-sm text-gray-700 font-medium">
                  <span className="font-bold">Coordinates:</span>{" "}
                  {location.coordinates.join(", ")}
                </p>
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-600 rounded-md">
                <span className="font-semibold">Error:</span> {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
