import api from '../utils/api';

// Obtener detalles de una nota de entrada por su ID
export const fetchDetallesNotaApi = async (idNota) => {
  try {
    const response = await api.get(`/detalle-nota/nota/${idNota}`);
    return response.data; // O ajusta según la estructura de tu respuesta
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Error al obtener detalles de la nota de entrada'
    );
  }
};

// Obtener un detalle específico por su ID
export const fetchDetalleNotaApi = async (id) => {
  try {
    const response = await api.get(`/detalle-nota/${id}`);
    return response.data; // O ajusta según la estructura de tu respuesta
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Error al obtener el detalle de la nota de entrada'
    );
  }
};

// Crear un nuevo detalle
export const crearDetalleNotaApi = async (detalleNotaDto, idNota) => {
  try {
    const response = await api.post(`/detalle-nota?notaId=${idNota}`, detalleNotaDto); // Ajusta la ruta si es necesario
    return response.data; // O ajusta según la estructura de tu respuesta
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Error al crear el detalle de la nota de entrada'
    );
  }
};

// Eliminar un detalle
export const eliminarDetalleNotaApi = async (id) => {
  try {
    await api.delete(`/detalle-nota/${id}`);
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Error al eliminar el detalle de la nota de entrada'
    );
  }
};
