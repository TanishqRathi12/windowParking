import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Brand Logo */}
        <div className="text-2xl font-bold">
          <Link to="/">Parking App</Link>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link to="/" className="hover:text-gray-300 transition duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/login" className="hover:text-gray-300 transition duration-300">
              Login
            </Link>
          </li>
          <li>
            <Link to="/signup" className="hover:text-gray-300 transition duration-300">
              Signup
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="hover:text-gray-300 transition duration-300">
              Dashboard
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden block text-3xl focus:outline-none">
          <span>☰</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
