import api from '../utils/api'; // Tu instancia de Axios configurada

export const fetchProveedoresApi = async () => {
  try {
    const response = await api.get('/proveedor');
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener proveedores');
  }
};

export const fetchProveedorApi = async (id) => {
  try {
    const response = await api.get(`/proveedor/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener proveedor');
  }
};

export const addProveedorApi = async (proveedor) => {
  try {
    const response = await api.post('/proveedor', proveedor);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al agregar proveedor');
  }
};

export const updateProveedorApi = async (id, proveedor) => {
  try {
    const response = await api.patch(`/proveedor/${id}`, proveedor);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al actualizar proveedor');
  }
};

export const deleteProveedorApi = async (id) => {
  try {
    await api.patch(`/proveedor/${id}/desactivar`);
    return id;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al eliminar proveedor');
  }
};
