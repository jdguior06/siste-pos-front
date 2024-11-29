import api from '../utils/api';

export const fetchNotasEntradaApi = async () => {
  try {
      const response = await api.get('/notaEntrada');
      return response.data.data; // Ajustado para devolver solo la lista de notas
  } catch (error) {
      throw new Error(
          error.response?.data?.message || 'Error al obtener notas de entrada'
      );
  }
};

export const fetchNotaEntradaApi = async (id) => {
  try {
      const response = await api.get(`/notaEntrada/${id}`);
      return response.data.data; // Ajustado para devolver solo la nota específica
  } catch (error) {
      throw new Error(
          error.response?.data?.message || 'Error al obtener la nota de entrada'
      );
  }
};

export const crearNotaEntradaApi = async (notaEntradaCompletoDto) => {
  try {
      const response = await api.post('/notaEntrada', notaEntradaCompletoDto);
      return response.data.data; // Ajustado para devolver solo los datos creados
  } catch (error) {
      throw new Error(
          error.response?.data?.message || 'Error al crear la nota de entrada'
      );
  }
};