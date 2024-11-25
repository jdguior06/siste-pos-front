import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProveedores, addProveedor, updateProveedor, deleteProveedor } from "../reducers/proveedorSlice";
import ProveedorModal from "../components/ProveedorModal";
import ProveedorDeleteModal from "../components/ProveedorDeleteModal";

const ProveedoresPage = () => {
  const dispatch = useDispatch();
  const { proveedores, loading, error } = useSelector((state) => state.proveedores);

  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProveedor, setSelectedProveedor] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showInactive, setShowInactive] = useState(true);  // Estado para el checkbox de mostrar inactivos
  const [currentPage, setCurrentPage] = useState(1);  // Estado para la paginación
  const [proveedoresPerPage] = useState(5);  // Número de proveedores por página

  useEffect(() => {
    dispatch(fetchProveedores());
  }, [dispatch]);

  const handleOpenModal = (proveedor = null) => {
    setSelectedProveedor(proveedor);
    setIsEditing(!!proveedor);
    setOpenModal(true);
  };

  const handleOpenDeleteModal = (proveedor) => {
    setSelectedProveedor(proveedor);
    setOpenDeleteModal(true);
  };

  const handleSave = async (proveedor) => {
    if (isEditing) {
      await dispatch(updateProveedor({ id: proveedor.id, proveedor }));
    } else {
      await dispatch(addProveedor(proveedor));
    }
    setOpenModal(false);
    dispatch(fetchProveedores());
  };

  const handleDelete = async (id) => {
    await dispatch(deleteProveedor(id));
    setOpenDeleteModal(false);
    dispatch(fetchProveedores());
  };

  // Filtrar proveedores por búsqueda y estado activo/inactivo
  const filteredProveedores = proveedores.filter(proveedor =>
    (showInactive || proveedor.activo) &&
    (proveedor.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
     proveedor.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Paginación: calcular índices
  const indexOfLastProveedor = currentPage * proveedoresPerPage;
  const indexOfFirstProveedor = indexOfLastProveedor - proveedoresPerPage;
  const currentProveedores = filteredProveedores.slice(indexOfFirstProveedor, indexOfLastProveedor);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {/* Modal para crear o editar proveedor */}
      <ProveedorModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        selectedProveedor={selectedProveedor}
        onSave={handleSave}
        isEditing={isEditing}
      />

      {/* Modal de confirmación de eliminación */}
      <ProveedorDeleteModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        selectedProveedor={selectedProveedor}
        onDelete={handleDelete}
      />

      <div className="proveedores-page container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Gestión de Proveedores</h2>

        <div className="flex justify-between items-center mb-6">
          {/* Input de búsqueda */}
          <input
            type="text"
            placeholder="Buscar Proveedor"
            className="border border-gray-300 rounded-lg py-2 px-4 w-1/2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Botón para crear proveedor */}
          <button
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg shadow-sm transition transform hover:scale-105"
            onClick={() => handleOpenModal()}
          >
            Crear Proveedor
          </button>

          {/* Checkbox para mostrar inactivos */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="showInactive"
              className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
              checked={showInactive}
              onChange={() => setShowInactive(!showInactive)}
            />
            <label htmlFor="showInactive" className="text-gray-700">Mostrar inactivos</label>
          </div>
        </div>

        {/* Tabla de proveedores */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="border-b border-gray-300 py-3 px-4 text-left">Nombre</th>
                <th className="border-b border-gray-300 py-3 px-4 text-left">Email</th>
                <th className="border-b border-gray-300 py-3 px-4 text-left">Teléfono</th>
                <th className="border-b border-gray-300 py-3 px-4 text-left">Dirección</th>
                <th className="border-b border-gray-300 py-3 px-4 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentProveedores.map((proveedor) => (
                <tr key={proveedor.id} className={`${proveedor.activo ? 'bg-white hover:bg-gray-50' : 'bg-gray-200'} transition`}>
                  <td className="border-b border-gray-200 py-3 px-4">{proveedor.nombre}</td>
                  <td className="border-b border-gray-200 py-3 px-4">{proveedor.email}</td>
                  <td className="border-b border-gray-200 py-3 px-4">{proveedor.telefono}</td>
                  <td className="border-b border-gray-200 py-3 px-4">{proveedor.direccion}</td>
                  <td className="border-b border-gray-200 py-3 px-4">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-lg shadow-sm transition transform hover:scale-105 mr-2"
                      onClick={() => handleOpenModal(proveedor)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg shadow-sm transition transform hover:scale-105"
                      onClick={() => handleOpenDeleteModal(proveedor)}
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
            {Array.from({ length: Math.ceil(filteredProveedores.length / proveedoresPerPage) }, (_, i) => (
              <button
                key={i + 1}
                className={`px-4 py-2 rounded-lg border ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'} border-gray-300 shadow-sm transition`}
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

export default ProveedoresPage;
