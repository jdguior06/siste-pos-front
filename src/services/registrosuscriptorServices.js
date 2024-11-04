// src/services/registrosuscriptorServices.js
import api from '../utils/api';
import { toast } from "react-toastify";

export const registerUser = async (usuarioDTO, planDTO) => {
  try {
    const response = await api.post("/suscriptor/crear", {
      usuarioDTO,
      planDTO,
    });

    toast.success("Registro exitoso");
    return { success: true, message: response.data.message };
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Error en el registro";
    toast.error(errorMessage);
    return { success: false, message: errorMessage };
  }
};
