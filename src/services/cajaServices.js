import api from '../utils/api';  // Esto sigue siendo tu instancia de Axios configurada

/*
export const fetchCajasApi = async () => {
    try {
        const response = await api.get('/caja');
        if (response.data.statusCode === 200) {
            return response.data.data;  // Devuelve la lista de cajas
        } else {
            throw new Error(response.data.message || "Error al obtener cajas");
        }
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error de red caja555");
    }
};
*/

export const fetchCajasApi = async () => {
    try {
      const response = await api.get('/caja');
     console.log('response.data.data', response.data);
      return response.data.data;

    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obetenr caja');
    }
  };

  export const fetchCajaApi = async (id) => {
    try {
      const response = await api.get(`/caja/${id}`);
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener la caja');
    }
  };

/*
export const fetchCajaApi = async (id) => {
    try {
      const response = await api.get(`/caja/${id}`);
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener la caja');
    }
 };

*/

export const addCajaApi = async (caja) => {
    try {
        const response = await api.post('/caja', caja);
        
            return response.data.data;  // Devuelve la caja creada
       
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error de red");
    }
};

export const updateCajaApi = async (id,caja) => {
    try {
        const response = await api.put(`/caja/${id}`, caja);  // Use PUT for full updates
       
            return response.data.data;  // Devuelve la caja actualizada
       
        
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al actualizar caja");
    }
};

export const deleteCajaApi = async (id) => {  // Use DELETE for actual deletions
    try {
         await api.patch(`/caja/${id}/desactivar`);//`/cliente/${id}/desactivar`
       
            return id;  // Devuelve la confirmación de eliminación
        } catch (error) {
        throw new Error(error.response?.data?.message || "Error al eliminar caja");
    }
};