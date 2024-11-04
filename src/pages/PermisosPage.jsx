import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPermisos } from '../reducers/permisoSlice';

// Función para transformar el nombre del permiso
const formatPermisoNombre = (nombre) => {
  return nombre
    .replace("PERMISO_", "")  // Elimina el prefijo "PERMISO_"
    .replace(/_/g, " ")       // Reemplaza guiones bajos con espacios
    .toUpperCase();           // Opcional: convierte a mayúsculas
};

const PermisosPage = () => {
  const dispatch = useDispatch();
  const { permisos, loading, error } = useSelector((state) => state.permisos);

  useEffect(() => {
    dispatch(fetchPermisos());
  }, [dispatch]);

  if (loading) return <p className="text-center text-gray-500">Cargando permisos...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">Lista de Permisos</h1>
      <ul className="divide-y divide-gray-200">
        {permisos.map((permiso) => (
          <li key={permiso.id} className="py-3 px-4 flex justify-between items-center hover:bg-gray-50">
            <span className="text-gray-700">{formatPermisoNombre(permiso.nombre)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PermisosPage;
