import React from 'react';
import { Menu, Home, ShoppingCart, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => (
  <nav className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 shadow-lg">
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <button onClick={toggleSidebar} className="lg:hidden">
          <Menu size={24} className="text-white hover:text-red-300 transition duration-200" />
        </button>
        <h1 className="text-2xl font-bold tracking-wide">Restaurant POS</h1>
      </div>
      <div className="hidden md:flex space-x-6">
        <Link
          to="/"
          className="hover:bg-red-800 p-2 rounded-full transition duration-300 hover:shadow-lg"
        >
          <Home size={20} className="m-auto" />
        </Link>
        <Link
          to="/orders"
          className="hover:bg-red-800 p-2 rounded-full transition duration-300 hover:shadow-lg"
        >
          <ShoppingCart size={20} className="m-auto" />
        </Link>
        <Link
          to="/menu"
          className="hover:bg-red-800 p-2 rounded-full transition duration-300 hover:shadow-lg"
        >
          <ClipboardList size={20} className="m-auto" />
        </Link>
      </div>
      <button className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold px-4 py-2 rounded-full shadow-md hover:shadow-lg transition duration-300">
        Nueva Orden
      </button>
    </div>
  </nav>
);

export default Navbar;
