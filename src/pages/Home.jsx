
import UserInfo from "../components/UserInfo";
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
    <div>
      <h2 className="text-2xl font-bold mb-6">Bienvenido al Dashboard</h2>
      <div className="mb-4">
        <UserInfo /> {/* Agrega UserInfo aquí */}
      </div>
      <p>Este es el resumen de tu punto de venta.</p>
    </div>
  );
};

export default Home;
