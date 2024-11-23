import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Parking App. All rights reserved.
        </p>
        <div className="mt-2">
          <a
            href="https://facebook.com"
            className="mx-2 text-gray-400 hover:text-white transition duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            href="https://twitter.com"
            className="mx-2 text-gray-400 hover:text-white transition duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <a
            href="https://linkedin.com"
            className="mx-2 text-gray-400 hover:text-white transition duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
