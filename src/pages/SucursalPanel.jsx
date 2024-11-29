import {
  Outlet,
  Link,
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline"; // Asegúrate de tener Heroicons o reemplázalo con otro ícono
import { useTheme } from "../context/ThemeContext"; // Importa useTheme para el tema actual

const SucursalPanel = ({ selectedSucursal }) => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme(); // Extrae el tema actual

  useEffect(() => {
    // Redirige a la página de sucursales si no hay una sucursal seleccionada
    if (!selectedSucursal) {
      navigate("/sucursales");
    }
  }, [selectedSucursal, navigate]);

  if (!selectedSucursal) return null;

  const isActiveLink = (path) => {
    return location.pathname.includes(path)
      ? "bg-blue-600 text-white"
      : "text-blue-500";
  };

  return (
    <div
      className="container mx-auto p-3"
      style={{ color: theme.textColor, backgroundColor: theme.backgroundColor }}
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-3xl font-bold" style={{ color: theme.textColor }}>
          Panel de Administración - {selectedSucursal.nombre}
        </h2>
        <button
          onClick={() => navigate("/sucursales")}
          className="flex items-center py-2 px-4 rounded-lg shadow-md transition-transform hover:scale-105"
          style={{
            backgroundColor: theme.primaryColor,
            color: theme.textColor,
          }}
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Volver a Sucursales
        </button>
        {/* <button
          onClick={() => {
            navigate("/sucursales");
            window.location.reload(); // Recarga la página después de navegar
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white flex items-center py-2 px-4 rounded-lg shadow-md transition-transform hover:scale-105"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Volver a Sucursales
        </button> */}
      </div>

      <div className="flex space-x-2 mb-3">
        <Link
          to={`/sucursales/${id}/panel/almacenes`}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${isActiveLink(
            "almacenes"
          )}`}
          style={{
            color: location.pathname.includes("almacenes")
              ? theme.textColor
              : theme.primaryColor,
            backgroundColor: location.pathname.includes("almacenes")
              ? theme.primaryColor
              : theme.backgroundColor,
          }}
        >
          Almacenes
        </Link>
        <Link
          to={`/sucursales/${id}/panel/cajas`}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${isActiveLink(
            "cajas"
          )}`}
          style={{
            color: location.pathname.includes("cajas")
              ? theme.textColor
              : theme.primaryColor,
            backgroundColor: location.pathname.includes("cajas")
              ? theme.primaryColor
              : theme.backgroundColor,
          }}
        >
          Cajas
        </Link>
        <Link
          to={`/sucursales/${id}/panel/ventas`}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${isActiveLink(
            "ventas"
          )}`}
          style={{
            color: location.pathname.includes("ventas")
              ? theme.textColor
              : theme.primaryColor,
            backgroundColor: location.pathname.includes("ventas")
              ? theme.primaryColor
              : theme.backgroundColor,
          }}
        >
          Ventas
        </Link>
        <Link
          to={`/sucursales/${id}/panel/reportes`}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${isActiveLink(
            "reportes"
          )}`}
          style={{
            color: location.pathname.includes("reportes")
              ? theme.textColor
              : theme.primaryColor,
            backgroundColor: location.pathname.includes("reportes")
              ? theme.primaryColor
              : theme.backgroundColor,
          }}
        >
          Reportes
        </Link>
      </div>

      <div
        className="rounded-lg shadow-lg p-4"
        style={{
          backgroundColor: theme.backgroundColor,
          color: theme.textColor,
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default SucursalPanel;
