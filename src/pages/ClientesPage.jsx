import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClientes, addCliente, updateCliente, deleteCliente } from "../reducers/clienteSlice";
import ClienteModal from "../components/ClienteModal";
import ClienteDeleteModal from "../components/ClienteDeleteModal";
import { useTheme } from "../context/ThemeContext"; // Importa useTheme para usar los colores del tema

const ClientesPage = () => {
  const dispatch = useDispatch();
  const { clientes, loading, error } = useSelector((state) => state.clientes);
  const { theme } = useTheme(); // Extrae el tema actual

  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showInactive, setShowInactive] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchClientes());
  }, [dispatch]);

  const handleOpenModal = (client = null) => {
    setSelectedClient(client);
    setIsEditing(!!client);
    setOpenModal(true);
  };

  const handleOpenDeleteModal = (client) => {
    setSelectedClient(client);
    setOpenDeleteModal(true);
  };

  const handleDelete = async (id) => {
    await dispatch(deleteCliente(id));
    setOpenDeleteModal(false);
    dispatch(fetchClientes());
  };

  const handleSave = async (cliente) => {
    if (isEditing) {
      await dispatch(updateCliente(cliente));
    } else {
      await dispatch(addCliente(cliente));
    }
    setOpenModal(false);
    dispatch(fetchClientes());
  };

  const filteredClientes = clientes.filter(cliente =>
    (showInactive || cliente.activo) &&
    (`${cliente.nombre} ${cliente.apellido}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.nit.toString().includes(searchTerm))
  );

  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClientes = filteredClientes.slice(indexOfFirstClient, indexOfLastClient);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div className="text-center text-xl">Cargando...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <>
      {/* Modal para crear o editar cliente */}
      <ClienteModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        selectedClient={selectedClient}
        onSave={handleSave}
        isEditing={isEditing}
      />

      {/* Modal de confirmación de eliminación */}
      <ClienteDeleteModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        selectedClient={selectedClient}
        onDelete={handleDelete}
      />

      <div className="clientes-page container mx-auto p-6" style={{ color: theme.textColor, backgroundColor: theme.backgroundColor }}>
        <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: theme.textColor }}>Gestión de Clientes</h2>

        {/* Control para búsqueda y checkbox de inactivos */}
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Buscar Cliente"
            className="border rounded-lg py-2 px-4 w-1/2 shadow-sm focus:outline-none focus:ring-2 transition"
            style={{ color: theme.textColor, backgroundColor: theme.backgroundColor, borderColor: theme.primaryColor }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button
            className="py-2 px-6 rounded-lg shadow-sm transition transform hover:scale-105"
            style={{ backgroundColor: theme.primaryColor, color: theme.textColor }}
            onClick={() => handleOpenModal()}
          >
            Crear Cliente
          </button>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="showInactive"
              className="mr-2 h-4 w-4 border rounded transition"
              style={{ backgroundColor: theme.backgroundColor, borderColor: theme.primaryColor }}
              checked={showInactive}
              onChange={() => setShowInactive(!showInactive)}
            />
            <label htmlFor="showInactive" style={{ color: theme.textColor }}>Mostrar inactivos</label>
          </div>
        </div>

        {/* Tabla de clientes */}
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-lg shadow-lg" style={{ backgroundColor: theme.backgroundColor }}>
            <thead className="text-gray-700" style={{ color: theme.textColor, backgroundColor: theme.primaryColor }}>
              <tr>
                <th className="border-b py-3 px-4 text-left">ID</th>
                <th className="border-b py-3 px-4 text-left">Nombre</th>
                <th className="border-b py-3 px-4 text-left">Email</th>
                <th className="border-b py-3 px-4 text-left">NIT</th>
                <th className="border-b py-3 px-4 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentClientes.map((cliente) => (
                <tr
                  key={cliente.id}
                  className={`${cliente.activo ? '' : 'bg-gray-200'}`}
                  style={{ color: theme.textColor }}
                >
                  <td className="border-b py-3 px-4">{cliente.id}</td>
                  <td className="border-b py-3 px-4">{`${cliente.nombre} ${cliente.apellido}`}</td>
                  <td className="border-b py-3 px-4">{cliente.email || 'No disponible'}</td>
                  <td className="border-b py-3 px-4">{cliente.nit || 'No disponible'}</td>
                  <td className="border-b py-3 px-4">
                    <button
                      className="py-1 px-3 rounded-lg shadow-sm transition transform hover:scale-105 mr-2"
                      style={{ backgroundColor: theme.primaryColor, color: theme.textColor }}
                      onClick={() => handleOpenModal(cliente)}
                    >
                      Editar
                    </button>
                    <button
                      className="py-1 px-3 rounded-lg shadow-sm transition transform hover:scale-105"
                      style={{ backgroundColor: '#FF4B4B', color: theme.textColor }}
                      onClick={() => handleOpenDeleteModal(cliente)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="flex justify-center mt-8">
          <nav className="inline-flex space-x-2">
            {Array.from({ length: Math.ceil(filteredClientes.length / clientsPerPage) }, (_, i) => (
              <button
                key={i + 1}
                className={`px-4 py-2 rounded-lg border shadow-sm transition`}
                style={{
                  backgroundColor: currentPage === i + 1 ? theme.primaryColor : theme.backgroundColor,
                  color: currentPage === i + 1 ? theme.textColor : theme.textColor,
                  borderColor: theme.primaryColor,
                }}
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default ClientesPage;
