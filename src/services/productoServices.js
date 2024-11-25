import api from '../utils/api'; // Tu instancia de Axios configurada

export const fetchProductosApi = async () => {
  try {
    const response = await api.get('/producto');
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener productos');
  }
};

export const fetchProductoApi = async (id) => {
  try {
    const response = await api.get(`/producto/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener producto');
  }
};

export const addProductoApi = async (producto) => {
  try {
    const response = await api.post('/producto', producto);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al agregar producto');
  }
};

export const updateProductoApi = async (id, producto) => {
  try {
    const response = await api.patch(`/producto/${id}`, producto);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al actualizar producto');
  }
};

export const deleteProductoApi = async (id) => {
  try {
    await api.patch(`/producto/${id}/desactivar`);
    return id;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al eliminar producto');
  }
};
