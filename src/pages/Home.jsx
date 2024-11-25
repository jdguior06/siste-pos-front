// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { login } from "../services/authServices";

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login();
      navigate('/login');
    } catch (error) {
      console.error("Error en la autenticación:", error);
    }
  };

  const handlePlanes = () => {
    navigate('/planes'); // Redirige al catálogo de planes
  };

  const handleHome = () => {
    navigate('/home'); // Redirige al Home
  };
  
  return (
    <div className="p-4 relative min-h-screen p-4 bg-gray-900 min-h-screen text-gray-300">
      {/* Contenedor de botones en la esquina superior derecha */}
      <div className="absolute top-4 right-4 flex space-x-4">

      </div >
      <div>
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-100">Bienvenido </h2>
      </div>
    </div>
  );
};

export default Home;
