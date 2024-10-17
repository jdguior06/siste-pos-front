import React from 'react';
import { XMarkIcon, UsersIcon, ChartBarIcon, CogIcon, ShoppingCartIcon, CubeIcon, UserIcon, TruckIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearAuth } from '../reducers/authSlice';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Manejar el cierre de sesión
  const handleLogout = () => {
    // Limpiar token de localStorage
    localStorage.removeItem('token');
    
    // Limpiar el estado de autenticación en Redux
    dispatch(clearAuth());

    // Redirigir al usuario al login
    navigate('/login');
  };

  return (
    <div className={`bg-gray-900 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition duration-200 ease-in-out`}>
      {/* Botón para cerrar el sidebar en pantallas pequeñas */}
      <button onClick={toggleSidebar} className="absolute top-1 right-1 lg:hidden">
        <XMarkIcon className="w-6 h-6 text-white" />
      </button>

      {/* Navegación del sidebar */}
      <nav className="space-y-2">
        <Link to="/sales" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-red-600 hover:shadow-lg">
          <ShoppingCartIcon className="w-5 h-5 inline mr-2" /> Ventas
        </Link>
        <Link to="/sucursales" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-red-600 hover:shadow-lg">
          <CubeIcon className="w-5 h-5 inline mr-2" /> Sucursales
        </Link>
        <Link to="/productos" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-red-600 hover:shadow-lg">
          <CubeIcon className="w-5 h-5 inline mr-2" /> Productos
        </Link>
        <Link to="/categorias" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-red-600 hover:shadow-lg">
          <CubeIcon className="w-5 h-5 inline mr-2" /> Categorias
        </Link>
        <Link to="/employees" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-red-600 hover:shadow-lg">
          <UsersIcon className="w-5 h-5 inline mr-2" /> Personal
        </Link>
        <Link to="/clientes" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-red-600 hover:shadow-lg">
          <UserIcon className="w-5 h-5 inline mr-2" /> Clientes
        </Link>
        <Link to="/proveedores" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-red-600 hover:shadow-lg">
          <TruckIcon className="w-5 h-5 inline mr-2" /> Proveedores
        </Link>
        <Link to="/reports" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-red-600 hover:shadow-lg">
          <ChartBarIcon className="w-5 h-5 inline mr-2" /> Reportes
        </Link>
        <Link to="/settings" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-red-600 hover:shadow-lg">
          <CogIcon className="w-5 h-5 inline mr-2" /> Configuración
        </Link>

        {/* Botón para cerrar sesión */}
        <button
          onClick={handleLogout}
          className="block w-full text-left py-2.5 px-4 rounded transition duration-200 hover:bg-red-600 hover:shadow-lg"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5 inline mr-2" /> Cerrar Sesión
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
