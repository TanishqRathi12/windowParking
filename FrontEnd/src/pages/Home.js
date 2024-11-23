import React from 'react';
import { Link } from 'react-router-dom';
import { Car, UserCircle, MapPin, Clock, CreditCard, Phone } from 'lucide-react';

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-600">GetParking</h1>
          <div className="space-x-4">
            <Link
              to="/adminlogin"
              className="inline-flex items-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              <UserCircle className="mr-2" size={20} />
              <span>Admin Login</span>
            </Link>
            <Link
              to="/available"
              className="inline-flex items-center bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
            >
              <Car className="mr-2" size={20} />
              <span>Get My Parking</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Find Your Perfect Parking Spot</h2>
          <p className="text-xl text-gray-600">Quick, easy, and convenient parking solutions for your city adventures.</p>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<MapPin size={40} className="text-blue-500" />}
            title="Multiple Locations"
            description="Find parking spots across various locations in the city."
          />
          <FeatureCard
            icon={<Clock size={40} className="text-green-500" />}
            title="24/7 Availability"
            description="Access parking any time of the day or night."
          />
          <FeatureCard
            icon={<CreditCard size={40} className="text-purple-500" />}
            title="Easy Payment"
            description="Secure and quick payment options for your convenience."
          />
        </section>

        <section className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Why Choose GetParking?</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Guaranteed parking spots</li>
            <li>Real-time availability updates</li>
            <li>Competitive pricing</li>
            <li>User-friendly mobile app</li>
            <li>Excellent customer support</li>
          </ul>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 GetParking. All rights reserved.</p>
          <div className="mt-4 flex justify-center items-center">
            <Phone size={20} className="mr-2" />
            <span>Contact us: 1-800-GET-PARK</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default HomePage;

