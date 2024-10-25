import { Outlet, Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline"; // Asegúrate de tener Heroicons o reemplázalo con otro ícono

const SucursalPanel = ({ selectedSucursal }) => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirige a la página de sucursales si no hay una sucursal seleccionada
    if (!selectedSucursal) {
      navigate('/sucursales');
    }
  }, [selectedSucursal, navigate]);

  if (!selectedSucursal) return null;

  const isActiveLink = (path) => {
    return location.pathname.includes(path) ? "bg-blue-600 text-white" : "text-blue-500";
  };

  return (
    <div className="container mx-auto p-3">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-3xl font-bold">
          Panel de Administración - {selectedSucursal.nombre}
        </h2>
        <button
          onClick={() => navigate('/sucursales')}
          className="bg-blue-500 hover:bg-blue-600 text-white flex items-center py-2 px-4 rounded-lg shadow-md transition-transform hover:scale-105"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Volver a Sucursales
        </button>
      </div>

      <div className="flex space-x-2 mb-3">
        <Link
          to={`/sucursales/${id}/panel/almacenes`}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${isActiveLink('almacenes')}`}
        >
          Almacenes
        </Link>
        <Link
          to={`/sucursales/${id}/panel/cajas`}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${isActiveLink('cajas')}`}
        >
          Cajas
        </Link>
        <Link
          to={`/sucursales/${id}/panel/ventas`}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${isActiveLink('ventas')}`}
        >
          Ventas
        </Link>
        <Link
          to={`/sucursales/${id}/panel/reportes`}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${isActiveLink('reportes')}`}
        >
          Reportes
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default SucursalPanel;
