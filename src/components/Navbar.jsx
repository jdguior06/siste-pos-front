import React from 'react';
import { Menu, Home, ShoppingCart, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import ThemedButton from './ThemedButton';

const Navbar = ({ toggleSidebar }) => {
  const { theme } = useTheme();

  return (
    <nav
      className="text-white p-4 shadow-lg flex justify-between items-center"
      style={{ backgroundColor: theme.primaryColor }} // Aplicamos el color personalizado
    >
      {/* Icono y título */}
      <div className="flex items-center space-x-4">
        <button onClick={toggleSidebar} className="lg:hidden">
          <Menu size={24} className="text-white hover:text-red-300 transition duration-200" />
        </button>
        <h1 className="text-2xl font-bold tracking-wide">Restaurant POS</h1>
      </div>

      {/* Links de navegación */}
      <div className="hidden md:flex space-x-6 items-center">
        <Link
          to="/"
          className="hover:bg-opacity-75 p-2 rounded-full transition duration-300 hover:shadow-lg"
        >
          <Home size={20} className="m-auto" />
        </Link>
        <Link
          to="/orders"
          className="hover:bg-opacity-75 p-2 rounded-full transition duration-300 hover:shadow-lg"
        >
          <ShoppingCart size={20} className="m-auto" />
        </Link>
        <Link
          to="/menu"
          className="hover:bg-opacity-75 p-2 rounded-full transition duration-300 hover:shadow-lg"
        >
          <ClipboardList size={20} className="m-auto" />
        </Link>
      </div>

      {/* Información del usuario y botón de Nueva Orden */}
      <div className="flex items-center space-x-4">
        {/* Muestra el usuario actualmente logueado */}
        <ThemedButton variant="secondary" onClick={() => alert('Botón Secundario')}>
          Nueva Orden
        </ThemedButton>
      </div>
    </nav>
  );
};

export default Navbar;
