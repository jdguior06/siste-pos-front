import React, { useState } from "react";
import {
  XMarkIcon,
  HomeIcon,
  UsersIcon,
  ChartBarIcon,
  CogIcon,
  ShoppingCartIcon,
  CubeIcon,
  UserIcon,
  TruckIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearAuth } from "../reducers/authSlice";

const Sidebar = ({ isOpen, toggleSidebar, selectedSucursal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(clearAuth());
    navigate("/login");
  };

  return (
    <div
      className={`flex flex-col bg-gray-900 text-white w-64 py-6 px-3 absolute inset-y-0 left-0 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:relative lg:translate-x-0 transition duration-300 ease-in-out shadow-lg border-r border-gray-700`}
    >
      {/* Botón para cerrar el sidebar en pantallas pequeñas */}
      <button
        onClick={toggleSidebar}
        className="absolute top-2 right-2 lg:hidden"
      >
        <XMarkIcon className="w-6 h-6 text-white" />
      </button>

      <nav className="space-y-1 flex-1"> {/* Flex-1 para ocupar el espacio disponible */}
        {!selectedSucursal ? (
          <>
            <Link
              to="/sucursales"
              className={`flex items-center py-2 px-3 rounded-lg transition duration-200 hover:bg-red-600 ${
                location.pathname === "/sucursales" ? "bg-red-700" : ""
              }`}
            >
              <HomeIcon className="w-5 h-5 mr-2" /> Todas las Sucursales
            </Link>
            <Link
              to="/ventas-globales"
              className={`flex items-center py-2 px-3 rounded-lg transition duration-200 hover:bg-red-600 ${
                location.pathname === "/ventas-globales" ? "bg-red-700" : ""
              }`}
            >
              <ShoppingCartIcon className="w-5 h-5 mr-2" /> Ventas Globales
            </Link>
          </>
        ) : (
          <>
            <div className="text-center mb-4">
              <h2 className="text-lg font-semibold bg-yellow-500 text-gray-900 rounded-lg py-1.5">
                {selectedSucursal.nombre}
              </h2>
            </div>

            <Link
              to={`/sucursales/${selectedSucursal.id}/panel/almacenes`}
              className={`flex items-center py-2 px-3 rounded-lg transition duration-200 hover:bg-red-600 ${
                location.pathname.includes("/almacenes") ? "bg-red-700" : ""
              }`}
            >
              <CubeIcon className="w-5 h-5 mr-2" /> Almacenes
            </Link>
            <Link
              to={`/sucursales/${selectedSucursal.id}/panel/cajas`}
              className={`flex items-center py-2 px-3 rounded-lg transition duration-200 hover:bg-red-600 ${
                location.pathname.includes("/cajas") ? "bg-red-700" : ""
              }`}
            >
              <TruckIcon className="w-5 h-5 mr-2" /> Cajas
            </Link>
            <Link
              to={`/sucursales/${selectedSucursal.id}/ventas`}
              className={`flex items-center py-2 px-3 rounded-lg transition duration-200 hover:bg-red-600 ${
                location.pathname.includes("/ventas") ? "bg-red-700" : ""
              }`}
            >
              <ShoppingCartIcon className="w-5 h-5 mr-2" /> Ventas
            </Link>
            <Link
              to={`/sucursales/${selectedSucursal.id}/reportes`}
              className={`flex items-center py-2 px-3 rounded-lg transition duration-200 hover:bg-red-600 ${
                location.pathname.includes("/reportes") ? "bg-red-700" : ""
              }`}
            >
              <ChartBarIcon className="w-5 h-5 mr-2" /> Reportes
            </Link>
          </>
        )}

        <Link
          to="/employees"
          className={`flex items-center py-2 px-3 rounded-lg transition duration-200 hover:bg-red-600 ${
            location.pathname.includes("/employees") ? "bg-red-700" : ""
          }`}
        >
          <UsersIcon className="w-5 h-5 mr-2" /> Personal
        </Link>

        {/* Desplegable para Productos y Categorías */}
        <div>
          <button
            className="w-full flex items-center text-left py-2 px-3 rounded-lg transition duration-200 hover:bg-red-600"
            onClick={() => setIsProductsOpen(!isProductsOpen)}
          >
            <CubeIcon className="w-5 h-5 mr-2" /> Productos
            {isProductsOpen ? (
              <ChevronUpIcon className="w-5 h-5 ml-auto" />
            ) : (
              <ChevronDownIcon className="w-5 h-5 ml-auto" />
            )}
          </button>
          {isProductsOpen && (
            <div className="pl-6 space-y-1">
              <Link
                to="/productos"
                className={`block py-2 px-3 rounded-lg transition duration-200 hover:bg-red-600 ${
                  location.pathname === "/productos" ? "bg-red-700" : ""
                }`}
              >
                Productos
              </Link>
              <Link
                to="/categorias"
                className={`block py-2 px-3 rounded-lg transition duration-200 hover:bg-red-600 ${
                  location.pathname === "/categorias" ? "bg-red-700" : ""
                }`}
              >
                Categorías
              </Link>
            </div>
          )}
        </div>

        <Link
          to="/clientes"
          className={`flex items-center py-2 px-3 rounded-lg transition duration-200 hover:bg-red-600 ${
            location.pathname.includes("/clientes") ? "bg-red-700" : ""
          }`}
        >
          <UserIcon className="w-5 h-5 mr-2" /> Clientes
        </Link>
        <Link
          to="/proveedores"
          className={`flex items-center py-2 px-3 rounded-lg transition duration-200 hover:bg-red-600 ${
            location.pathname.includes("/proveedores") ? "bg-red-700" : ""
          }`}
        >
          <TruckIcon className="w-5 h-5 mr-2" /> Proveedores
        </Link>
        <Link
          to="/settings"
          className={`flex items-center py-2 px-3 rounded-lg transition duration-200 hover:bg-red-600 ${
            location.pathname.includes("/settings") ? "bg-red-700" : ""
          }`}
        >
          <CogIcon className="w-5 h-5 mr-2" /> Configuración
        </Link>
      </nav>

      {/* Botón para cerrar sesión al final */}
      <button
        onClick={handleLogout}
        className="flex items-center w-full py-2 px-3 mt-auto rounded-lg transition duration-200 hover:bg-red-600"
      >
        <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" /> Cerrar Sesión
      </button>
    </div>
  );
};

export default Sidebar;
