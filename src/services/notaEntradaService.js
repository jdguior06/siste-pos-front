import api from '../utils/api';

// Obtener todas las notas de entrada
export const fetchNotasEntradaApi = async () => {
  try {
    const response = await api.get('/notaEntrada');
    return response.data; // O ajusta según la estructura de tu respuesta
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Error al obtener notas de entrada'
    );
  }
};

// Obtener una nota de entrada por ID
export const fetchNotaEntradaApi = async (id) => {
  try {
    const response = await api.get(`/notaEntrada/${id}`);
    return response.data; // O ajusta según la estructura de tu respuesta
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Error al obtener la nota de entrada'
    );
  }
};

// Crear una nueva nota de entrada
export const crearNotaEntradaApi = async (notaEntradaCompletoDto) => {
  try {
    const response = await api.post('/notaEntrada', notaEntradaCompletoDto);
    return response.data; // O ajusta según la estructura de tu respuesta
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Error al crear la nota de entrada'
    );
  }
};

// Eliminar una nota de entrada
export const eliminarNotaEntradaApi = async (id) => {
  try {
    await api.delete(`/notaEntrada/${id}`);
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Error al eliminar la nota de entrada'
    );
  }
};
