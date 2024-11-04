import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchUsuarios,
  deactivateUsuario,
  activateUsuario
} from '../reducers/usuarioSlice';
import { fetchRoles } from '../reducers/rolSlice'; // Importa la acción para cargar roles
import UsuarioModal from '../components/UsuarioModal';
import { PlusIcon, PencilIcon, XCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const UsuariosPage = () => {
  const dispatch = useDispatch();
  const { usuarios, loading, error } = useSelector((state) => state.usuarios);
  const { roles } = useSelector((state) => state.roles); // Obtén la lista de roles desde el estado

  const [searchTerm, setSearchTerm] = useState("");
  const [showOnlyActive, setShowOnlyActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUsuarios());
    dispatch(fetchRoles()); // Carga los roles cuando se monta la página
  }, [dispatch]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleCheckboxChange = (e) => setShowOnlyActive(e.target.checked);

  const filteredUsuarios = usuarios
    .filter((usuario) => usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((usuario) => (showOnlyActive ? usuario.activo : true));

  const openModal = (user = null) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const toggleUserStatus = (id, isActive) => {
    if (isActive) {
      dispatch(deactivateUsuario(id));
    } else {
      dispatch(activateUsuario(id));
    }
  };

  if (loading) return <p className="text-gray-600">Cargando usuarios...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Gestión de Usuarios</h1>

      {/* Barra de Búsqueda */}
      <div className="mb-6 flex items-center space-x-4">
        <input
          type="text"
          placeholder="Buscar usuario..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
        />
        <label className="flex items-center space-x-2 text-gray-700">
          <input
            type="checkbox"
            checked={showOnlyActive}
            onChange={handleCheckboxChange}
            className="form-checkbox h-5 w-5 text-blue-500 transition duration-150 ease-in-out"
          />
          <span>Solo activos</span>
        </label>
      </div>

      {/* Botón Agregar Usuario */}
      <button
        onClick={() => openModal()}
        className="mb-6 flex items-center space-x-2 bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-200"
      >
        <PlusIcon className="w-5 h-5" />
        <span>Agregar Usuario</span>
      </button>

      {/* Lista de Usuarios */}
      <div className="overflow-x-auto">
        <table className="w-full mb-6 border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-600">
              <th className="py-3 px-4 border">Nombre</th>
              <th className="py-3 px-4 border">Apellido</th>
              <th className="py-3 px-4 border">Email</th>
              <th className="py-3 px-4 border">Rol</th> {/* Nueva columna de Rol */}
              <th className="py-3 px-4 border">Estado</th>
              <th className="py-3 px-4 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsuarios.map((usuario) => (
              <tr key={usuario.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border">{usuario.nombre}</td>
                <td className="py-3 px-4 border">{usuario.apellido}</td>
                <td className="py-3 px-4 border">{usuario.email}</td>
                <td className="py-3 px-4 border text-center">
                  {usuario.rol[0]?.nombre || "Sin rol"} {/* Muestra el rol o "Sin rol" si no existe */}
                </td>
                <td className="py-3 px-4 border text-center">
                  {usuario.activo ? (
                    <span className="inline-flex items-center text-green-600">
                      <CheckCircleIcon className="w-5 h-5 mr-1" />
                      Activo
                    </span>
                  ) : (
                    <span className="inline-flex items-center text-red-600">
                      <XCircleIcon className="w-5 h-5 mr-1" />
                      Inactivo
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 border flex space-x-2">
                  <button
                    onClick={() => openModal(usuario)}
                    className="flex items-center text-blue-500 hover:text-blue-600 transition duration-150"
                  >
                    <PencilIcon className="w-5 h-5 mr-1" />
                    Editar
                  </button>
                  <button
                    onClick={() => toggleUserStatus(usuario.id, usuario.activo)}
                    className={`flex items-center ${
                      usuario.activo ? "text-red-500 hover:text-red-600" : "text-green-500 hover:text-green-600"
                    } transition duration-150`}
                  >
                    {usuario.activo ? (
                      <>
                        <XCircleIcon className="w-5 h-5 mr-1" />
                        Desactivar
                      </>
                    ) : (
                      <>
                        <CheckCircleIcon className="w-5 h-5 mr-1" />
                        Activar
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Crear/Editar Usuario */}
      {isModalOpen && (
        <UsuarioModal
          isOpen={isModalOpen}
          onClose={closeModal}
          user={editingUser}
          roles={roles} // Pasa la lista de roles al modal
        />
      )}
    </div>
  );
};

export default UsuariosPage;
