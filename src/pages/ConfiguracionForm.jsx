// src/pages/ConfiguracionForm.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const ConfiguracionForm = () => {
  const navigate = useNavigate();

  const goToBackup = () => {
    navigate("/backup"); // Navegación a la página de backup
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
        Configuraciones Generales
      </h1>

      {/* Botón para ir al formulario de Backup */}
      <div className="mt-8 text-center">
        <button
          onClick={goToBackup}
          className="bg-green-600 text-white py-2 px-4 rounded-lg mt-4 hover:bg-green-700 transition duration-300"
        >
          Backup
        </button>
      </div>
    </div>
  );
};

export default ConfiguracionForm;
