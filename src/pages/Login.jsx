import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";  // Para la redirección
import { login } from "../services/authServices";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import heroLogin from "../assets/heroLogin.jpg";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector(state => state.auth); // Accede a isAuthenticated desde Redux

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();

    // Realiza la autenticación con el servicio de login
    const response = await dispatch(login(email, password));

    // Muestra una notificación dependiendo de la respuesta
    if (response.success) {
      toast.success(response.message);  // Login exitoso
    } else {
      toast.error(response.message);  // Error en el login
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Si el usuario ya está autenticado, redirigir al dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <ToastContainer />

      {/* Formulario de Login */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 p-8 bg-white">
        <h1 className="text-4xl font-bold mb-4 text-center lg:text-left">Iniciar Sesión</h1>
        <p className="mb-8 text-gray-600 text-center lg:text-left">
          Maneja tu restaurante como un profesional en el mercado
        </p>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm text-gray-700">
              Correo Electrónico
            </label>
            <div className="flex items-center border-b-2 border-gray-300 py-2 focus-within:border-blue-500 transition duration-300">
              <EnvelopeIcon className="h-6 w-6 text-gray-400" />
              <input
                className="w-full py-2 text-gray-700 focus:outline-none focus:ring-0 ml-2"
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="Ingresa tu dirección de correo"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm text-gray-700">
              Contraseña
            </label>
            <div className="flex items-center border-b-2 border-gray-300 py-2 focus-within:border-blue-500 transition duration-300">
              <LockClosedIcon className="h-6 w-6 text-gray-400" />
              <input
                className="w-full py-2 text-gray-700 focus:outline-none focus:ring-0 ml-2"
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 hover:bg-blue-700 transition duration-300"
          >
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>
      </div>

      {/* Imagen ajustada */}
      <div className="lg:w-1/2 w-full h-48 lg:h-full flex items-center">
        <img src={heroLogin} alt="Hero Login" className="h-full w-full object-cover" />
      </div>
    </div>
  );
};

export default Login;
