// src/pages/ConfiguracionBackup.jsx
import React from "react";
import BackupDownloadButton from "../components/BackupDownloadButton";
import BackupUploadForm from "../components/BackupUploadForm";

const BackupForm = () => {
  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg space-y-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
        Configuración de Backups
      </h1>
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Descargar Backup</h2>
        <BackupDownloadButton />
      </div>
      <div className="space-y-4 mt-8">
        <h2 className="text-lg font-semibold">Cargar y Restaurar Backup</h2>
        <BackupUploadForm />
      </div>
    </div>
  );
};

export default BackupForm;
