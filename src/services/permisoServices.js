import api from '../utils/api';  

export const fetchPermisosApi = async () => {
  try {
    const response = await api.get('/permiso');
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener los permisos');
  }
};