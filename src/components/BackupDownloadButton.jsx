// src/components/BackupDownloadButton.jsx
import React from "react";
import { downloadBackup } from "../services/backupServices";

const BackupDownloadButton = () => {
  const handleDownload = async () => {
    await downloadBackup();
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
    >
      Descargar Backup
    </button>
  );
};

export default BackupDownloadButton;
