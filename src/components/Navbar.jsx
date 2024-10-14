import React from 'react';
import { Menu, Home, ShoppingCart, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => (
  <nav className="bg-red-600 text-white p-4 shadow-lg">
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <button onClick={toggleSidebar} className="lg:hidden">
          <Menu size={24} className="text-white" />
        </button>
        <h1 className="text-2xl font-bold">Restaurant POS</h1>
      </div>
      <div className="hidden md:flex space-x-4">
        <Link to="/" className="hover:bg-red-700 p-2 rounded"><Home size={20} /></Link>
        <Link to="/orders" className="hover:bg-red-700 p-2 rounded"><ShoppingCart size={20} /></Link>
        <Link to="/menu" className="hover:bg-red-700 p-2 rounded"><ClipboardList size={20} /></Link>
      </div>
      <button className="bg-red-500 hover:bg-red-400 px-4 py-2 rounded shadow">
        Nueva Orden
      </button>
    </div>
  </nav>
);

export default Navbar;
