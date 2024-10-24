import React, { useState } from 'react';
import { 
  XMarkIcon, HomeIcon, UsersIcon, ChartBarIcon, CogIcon, ShoppingCartIcon, 
  CubeIcon, UserIcon, TruckIcon, ArrowRightOnRectangleIcon, ChevronDownIcon, ChevronUpIcon
} from '@heroicons/react/24/outline';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearAuth } from '../reducers/authSlice';

const Sidebar = ({ isOpen, toggleSidebar, selectedSucursal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Para obtener la ruta actual

  // Estado para manejar la apertura de submenús
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isBranchesOpen, setIsBranchesOpen] = useState(false);

  // Manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(clearAuth());
    navigate('/login');
  };

  return (
    <div className={`bg-gray-900 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition duration-200 ease-in-out`}>
      {/* Botón para cerrar el sidebar en pantallas pequeñas */}
      <button onClick={toggleSidebar} className="absolute top-1 right-1 lg:hidden">
        <XMarkIcon className="w-6 h-6 text-white" />
      </button>

      <nav className="space-y-2">
        {!selectedSucursal ? (
          <>
            {/* Si no hay una sucursal seleccionada, mostrar el menú general */}
            <Link 
              to="/sucursales" 
              className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-red-600 hover:shadow-lg ${location.pathname === '/sucursales' ? 'bg-red-700' : ''}`}
            >
              <HomeIcon className="w-5 h-5 inline mr-2" /> Todas las Sucursales
            </Link>
            <Link 
              to="/ventas-globales" 
              className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-red-600 hover:shadow-lg ${location.pathname === '/ventas-globales' ? 'bg-red-700' : ''}`}
            >
              <ShoppingCartIcon className="w-5 h-5 inline mr-2" /> Ventas Globales
            </Link>
          </>
        ) : (
          <>
            {/* Si una sucursal está seleccionada, mostrar el menú específico de gestión */}
            <h2 className="text-lg font-bold mb-4 text-yellow-400">{selectedSucursal.nombre}</h2>

            {/* Sección de Gestión de Sucursal */}
            <Link 
              to={`/sucursales/${selectedSucursal.id}/panel/almacenes`} 
              className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-red-600 hover:shadow-lg ${location.pathname.includes('/almacenes') ? 'bg-red-700' : ''}`}
            >
              <CubeIcon className="w-5 h-5 inline mr-2" /> Almacenes
            </Link>
            <Link 
              to={`/sucursales/${selectedSucursal.id}/cajas`} 
              className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-red-600 hover:shadow-lg ${location.pathname.includes('/cajas') ? 'bg-red-700' : ''}`}
            >
              <TruckIcon className="w-5 h-5 inline mr-2" /> Cajas
            </Link>
            <Link 
              to={`/sucursales/${selectedSucursal.id}/ventas`} 
              className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-red-600 hover:shadow-lg ${location.pathname.includes('/ventas') ? 'bg-red-700' : ''}`}
            >
              <ShoppingCartIcon className="w-5 h-5 inline mr-2" /> Ventas
            </Link>
            <Link 
              to={`/sucursales/${selectedSucursal.id}/reportes`} 
              className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-red-600 hover:shadow-lg ${location.pathname.includes('/reportes') ? 'bg-red-700' : ''}`}
            >
              <ChartBarIcon className="w-5 h-5 inline mr-2" /> Reportes
            </Link>
          </>
        )}

        {/* Opciones generales del sistema */}
        <Link 
          to="/employees" 
          className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-red-600 hover:shadow-lg ${location.pathname.includes('/employees') ? 'bg-red-700' : ''}`}
        >
          <UsersIcon className="w-5 h-5 inline mr-2" /> Personal
        </Link>
        <Link to="/productos" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-red-600 hover:shadow-lg">
          <CubeIcon className="w-5 h-5 inline mr-2" /> Productos
        </Link>
        <Link to="/categorias" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-red-600 hover:shadow-lg">
          <CubeIcon className="w-5 h-5 inline mr-2" /> Categorias
        </Link>
        <Link 
          to="/clientes" 
          className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-red-600 hover:shadow-lg ${location.pathname.includes('/clientes') ? 'bg-red-700' : ''}`}
        >
          <UserIcon className="w-5 h-5 inline mr-2" /> Clientes
        </Link>
        <Link 
          to="/proveedores" 
          className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-red-600 hover:shadow-lg ${location.pathname.includes('/proveedores') ? 'bg-red-700' : ''}`}
        >
          <TruckIcon className="w-5 h-5 inline mr-2" /> Proveedores
        </Link>
        <Link 
          to="/settings" 
          className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-red-600 hover:shadow-lg ${location.pathname.includes('/settings') ? 'bg-red-700' : ''}`}
        >
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
