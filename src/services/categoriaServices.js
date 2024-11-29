import api from '../utils/api';  // Instancia configurada de Axios

// Obtener todas las categorías
export const fetchCategoriasApi = async () => {
  try {
    const response = await api.get('/categoria');
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener las categorías');
  }
};

// Obtener una categoría por ID
export const fetchCategoriaApi = async (id) => {
  try {
    const response = await api.get(`/categoria/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener la categoría');
  }
};

// Crear una nueva categoría
export const addCategoriaApi = async (categoria) => {
  try {
    const response = await api.post('/categoria', categoria);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al crear la categoría');
  }
};

// Actualizar una categoría existente
export const updateCategoriaApi = async (id, categoria) => {
  try {
    const response = await api.patch(`/categoria/${id}`, categoria);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al actualizar la categoría');
  }
};

// Eliminar (desactivar) una categoría
export const deleteCategoriaApi = async (id) => {
  try {
    await api.patch(`/categoria/${id}/desactivar`);
    return id;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al desactivar la categoría');
  }
};
