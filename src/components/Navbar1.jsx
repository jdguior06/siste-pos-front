// src/components/Navbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/home');
  };

  const handlePlanes = () => {
    navigate('/planes');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <nav className="bg-red-800 p-4 shadow-md fixed top-0 w-full z-10">
      <div className="container mx-auto flex justify-end space-x-4">
        <button
          onClick={handleHome}
          className="text-red-200 py-2 px-4 rounded-lg hover:bg-red-600 hover:text-white transition duration-300"
        >
          Inicio
        </button>
        <button
          onClick={handlePlanes}
          className="text-red-200 py-2 px-4 rounded-lg hover:bg-red-600 hover:text-white transition duration-300"
        >
          Planes de Suscripción
        </button>
        <button
          onClick={handleLogin}
          className="text-red-200 py-2 px-4 rounded-lg hover:bg-red-600 hover:text-white transition duration-300"
        >
          Iniciar Sesión
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
