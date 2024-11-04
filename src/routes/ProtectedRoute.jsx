import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth); // Verifica si el usuario está autenticado

  if (!isAuthenticated) {
    // Si no está autenticado, redirige al login
    return <Navigate to="/" replace />;
  }

  // Si está autenticado, renderiza las rutas anidadas (usando Outlet)
  return <Outlet />;
};

export default ProtectedRoute;
