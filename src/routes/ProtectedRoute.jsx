import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth); // Verifica si el usuario está autenticado

  if (!isAuthenticated) {
    // Si no está autenticado, redirige al login
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, renderiza las rutas anidadas (usando Outlet)
  return <Outlet />;
};

export default ProtectedRoute;
