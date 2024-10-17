import api from '../utils/api';  

export const fetchSucursalesApi = async () => {
  try {
    const response = await api.get('/sucursal');
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener las sucursales');
  }
};

export const fetchSucursalApi = async (id) => {
  try {
    const response = await api.get(`/sucursal/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener la sucursal');
  }
};

export const addSucursalApi = async (sucursal) => {
  try {
    const response = await api.post('/sucursal', sucursal);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al crear la sucursal');
  }
};

export const updateSucursalApi = async (id, sucursal) => {
  try {
    const response = await api.patch(`/sucursal/${id}`, sucursal);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al actualizar la sucursal');
  }
};

export const deleteSucursalApi = async (id) => {
  try {
    await api.patch(`/sucursal/${id}/desactivar`);
    return id;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al desactivar la sucursal');
  }
};
