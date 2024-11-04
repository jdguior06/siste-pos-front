import api from '../utils/api';  // Instancia configurada de Axios

// Obtener todos los usuarios con filtro de búsqueda opcional
export const fetchUsuariosApi = async (searchTerm = "") => {
  try {
    const response = await api.get(`/user`, { params: { search: searchTerm } });
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener los usuarios');
  }
};

// Obtener un usuario por ID
export const fetchUsuarioApi = async (id) => {
  try {
    const response = await api.get(`/user/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener el usuario');
  }
};

// Crear un nuevo usuario
export const addUsuarioApi = async (usuario) => {
  try {
    const response = await api.post('/user', usuario);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al crear el usuario');
  }
};

// Actualizar un usuario existente
export const updateUsuarioApi = async (id, usuario) => {
  try {
    const response = await api.patch(`/user/${id}`, usuario);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al actualizar el usuario');
  }
};

// Desactivar un usuario
export const deactivateUsuarioApi = async (id) => {
  try {
    await api.patch(`/user/${id}/desactivar`);
    return id;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al desactivar el usuario');
  }
};

// Activar un usuario
export const activateUsuarioApi = async (id) => {
  try {
    await api.patch(`/user/${id}/activar`);
    return id;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al activar el usuario');
  }
};
