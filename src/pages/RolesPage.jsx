import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRoles } from '../reducers/rolSlice';
import { fetchPermisos } from '../reducers/permisoSlice';
import RoleModal from '../components/RoleModal';

const RolesPage = () => {
  const dispatch = useDispatch();
  const { roles, loading: rolesLoading, error: rolesError } = useSelector((state) => state.roles);
  const { permisos, loading: permisosLoading, error: permisosError } = useSelector((state) => state.permisos);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rolesPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);

  useEffect(() => {
    dispatch(fetchRoles());
    dispatch(fetchPermisos());
  }, [dispatch]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const filteredRoles = roles.filter(role => 
    role.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRole = currentPage * rolesPerPage;
  const indexOfFirstRole = indexOfLastRole - rolesPerPage;
  const currentRoles = filteredRoles.slice(indexOfFirstRole, indexOfLastRole);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const openModal = (role = null) => {
    setEditingRole(role);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingRole(null);
  };

  if (rolesLoading || permisosLoading) return <p>Cargando...</p>;
  if (rolesError || permisosError) return <p>Error: {rolesError || permisosError}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">Gestión de Roles</h1>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar rol..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <button
        onClick={() => openModal()}
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
      >
        Agregar Rol
      </button>

      <table className="w-full mb-4 border">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border">Nombre</th>
            <th className="py-2 px-4 border">Permisos</th>
            <th className="py-2 px-4 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentRoles.map((role) => (
            <tr key={role.id}>
              <td className="py-2 px-4 border">{role.nombre}</td>
              <td className="py-2 px-4 border">
                {/* Mapear y formatear los nombres de permisos */}
                {role.permiso.map((permiso) => permiso.nombre.replace("PERMISO_", "").replace(/_/g, " ")).join(", ")}
              </td>
              <td className="py-2 px-4 border">
                <button
                  onClick={() => openModal(role)}
                  className="text-blue-500 mr-2"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center">
        {Array.from({ length: Math.ceil(filteredRoles.length / rolesPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 mx-1 rounded ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {isModalOpen && (
        <RoleModal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          role={editingRole} 
          permisos={permisos} 
        />
      )}
    </div>
  );
};

export default RolesPage;
