import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addRol, updateRol } from '../reducers/rolSlice';

const RoleModal = ({ isOpen, onClose, role, permisos }) => {
  const dispatch = useDispatch();

  // Inicializar los estados del nombre y los permisos
  const [nombre, setNombre] = useState(role ? role.nombre : "");
  const [nombrePermiso, setNombrePermiso] = useState(role ? role.permiso.map((permiso) => permiso.nombre) : []);

  useEffect(() => {
    if (role) {
      setNombre(role.nombre);
      setNombrePermiso(role.permiso ? role.permiso.map((permiso) => permiso.nombre) : []);
    }
  }, [role]);

  const handleNombreChange = (e) => setNombre(e.target.value);

  // Manejar la selección de permisos
  const handlePermisoChange = (e) => {
    const selectedPermiso = e.target.value;
    setNombrePermiso((prev) =>
      prev.includes(selectedPermiso)
        ? prev.filter((permiso) => permiso !== selectedPermiso)
        : [...prev, selectedPermiso]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const rolData = { nombre, nombrePermiso };

    if (role) {
      dispatch(updateRol({ id: role.id, rol: rolData }));
    } else {
      dispatch(addRol(rolData));
    }

    onClose();
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-xl font-semibold mb-4">{role ? "Editar Rol" : "Crear Nuevo Rol"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={handleNombreChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Permisos</label>
            <div className="flex flex-wrap">
              {permisos.map((permiso) => (
                <label key={permiso.id} className="mr-4 mb-2">
                  <input
                    type="checkbox"
                    value={permiso.nombre}
                    checked={nombrePermiso.includes(permiso.nombre)}
                    onChange={handlePermisoChange}
                  />
                  <span className="ml-2">{permiso.nombre.replace("PERMISO_", "").replace(/_/g, " ")}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 px-4 py-2 rounded bg-gray-400 text-white">Cancelar</button>
            <button type="submit" className="px-4 py-2 rounded bg-blue-500 text-white">{role ? "Actualizar" : "Crear"}</button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default RoleModal;
