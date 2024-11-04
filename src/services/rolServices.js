import api from '../utils/api';  // Instancia configurada de Axios

// Obtener todos los roles
export const fetchRolesApi = async () => {
  try {
    const response = await api.get('/rol');
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener los roles');
  }
};

// Obtener un rol por ID
export const fetchRolApi = async (id) => {
  try {
    const response = await api.get(`/rol/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener el rol');
  }
};

// Crear un nuevo rol
export const addRolApi = async (rol) => {
  try {
    const response = await api.post('/rol', rol);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al crear el rol');
  }
};

// Actualizar un rol existente
export const updateRolApi = async (id, rol) => {
  try {
    const response = await api.patch(`/rol/${id}`, rol);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al actualizar el rol');
  }
};

// Eliminar (desactivar) un rol
export const deleteRolApi = async (id) => {
  try {
    await api.delete(`/rol/${id}`);
    return id;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al desactivar el rol');
  }
};
