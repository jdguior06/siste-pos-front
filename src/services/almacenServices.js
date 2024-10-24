import api from '../utils/api';

// Obtener todos los almacenes de una sucursal
export const fetchAlmacenesApi = async (idSucursal) => {
  try {
    const response = await api.get(`/sucursales/${idSucursal}/almacen`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener los almacenes');
  }
};

// Obtener un almacén específico de una sucursal
export const fetchAlmacenApi = async (idSucursal, idAlmacen) => {
  try {
    const response = await api.get(`/sucursales/${idSucursal}/almacen/${idAlmacen}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener el almacén');
  }
};

// Crear un nuevo almacén en una sucursal
export const addAlmacenApi = async (idSucursal, almacen) => {
  try {
    const response = await api.post(`/sucursales/${idSucursal}/almacen`, almacen);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al crear el almacén');
  }
};

// Actualizar un almacén existente en una sucursal
export const updateAlmacenApi = async (idSucursal, idAlmacen, almacen) => {
  try {
    const response = await api.patch(`/sucursales/${idSucursal}/almacen/${idAlmacen}`, almacen);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al actualizar el almacén');
  }
};

// Desactivar un almacén de una sucursal
export const deleteAlmacenApi = async (idSucursal, idAlmacen) => {
  try {
    await api.patch(`/sucursales/${idSucursal}/almacen/${idAlmacen}/desactivar`);
    return idAlmacen;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al desactivar el almacén');
  }
};
