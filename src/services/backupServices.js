// src/services/backupServices.js
import api from '../utils/api'; // Asegúrate de que `api` esté configurado con la baseURL correcta
import { toast } from "react-toastify";

// Método para descargar el backup
export const downloadBackup = async () => {
  try {
    const response = await api.get('/backup/download', {
      responseType: 'blob', // Indica que la respuesta es un archivo binario
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'backup.sql'); // Nombre del archivo de descarga
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);

    toast.success("Backup descargado exitosamente.");
  } catch (error) {
    toast.error("Error al descargar el backup.");
  }
};

// Método para subir el backup y restaurarlo en la base de datos
export const uploadBackup = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await api.post('/backup/upload', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    toast.success(response.data || "Backup restaurado exitosamente.");
  } catch (error) {
    const errorMessage = error.response?.data || "Error al cargar el backup. Revisa el log del servidor.";
    toast.error(errorMessage);
  }
};
