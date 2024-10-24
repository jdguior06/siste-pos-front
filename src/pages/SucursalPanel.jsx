import { Outlet, Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SucursalPanel = ({ selectedSucursal }) => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Si no hay una sucursal seleccionada, redirigir a la página de sucursales
    if (!selectedSucursal) {
      navigate('/sucursales');
    }
  }, [selectedSucursal, navigate]);

  if (!selectedSucursal) return null;

  const isActiveLink = (path) => {
    return location.pathname.includes(path) ? "bg-blue-600 text-white" : "text-blue-500";
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">
        Panel de Administración - {selectedSucursal.nombre}
      </h2>

      <div className="flex space-x-4 mb-6">
        <Link
          to={`/sucursales/${id}/panel/almacenes`}
          className={`px-4 py-2 rounded-lg transition-colors ${isActiveLink('almacenes')}`}
        >
          Almacenes
        </Link>
        <Link
          to={`/sucursales/${id}/panel/cajas`}
          className={`px-4 py-2 rounded-lg transition-colors ${isActiveLink('cajas')}`}
        >
          Cajas
        </Link>
        <Link
          to={`/sucursales/${id}/panel/ventas`}
          className={`px-4 py-2 rounded-lg transition-colors ${isActiveLink('ventas')}`}
        >
          Ventas
        </Link>
        <Link
          to={`/sucursales/${id}/panel/reportes`}
          className={`px-4 py-2 rounded-lg transition-colors ${isActiveLink('reportes')}`}
        >
          Reportes
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default SucursalPanel;
