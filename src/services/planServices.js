// src/services/planServices.js
import api from '../utils/api';

export const fetchPlanes = async () => {
  try {
    const response = await api.get('/plan');
    return response.data.data; // Devuelve solo los datos de los planes
  } catch (error) {
    console.error("Error al obtener los planes:", error);
    throw error;
  }
};
