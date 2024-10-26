import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategorias, addCategoria, updateCategoria, deleteCategoria } from "../reducers/categoriaSlice";
import CategoriaModal from "../components/CategoriaModal";
import CategoriaDeleteModal from "../components/CategoriaDeleteModal";

const CategoriasPage = () => {
  const dispatch = useDispatch();
  const { categorias, loading, error } = useSelector((state) => state.categorias);

  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategoria, setSelectedCategoria] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showInactive, setShowInactive] = useState(false); // Checkbox para mostrar inactivos
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchCategorias());
  }, [dispatch]);

  const handleOpenModal = (categoria = null) => {
    setSelectedCategoria(categoria);
    setIsEditing(!!categoria);
    setOpenModal(true);
  };

  const handleOpenDeleteModal = (categoria) => {
    setSelectedCategoria(categoria);
    setOpenDeleteModal(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteCategoria(id));
    setOpenDeleteModal(false);
  };

  const handleSave = (categoria) => {
    if (isEditing) {
      dispatch(updateCategoria({ id: selectedCategoria.id, categoria }));
    } else {
      dispatch(addCategoria(categoria));
    }
    setOpenModal(false);
  };

  // Filtrar categorías según búsqueda y estado activo/inactivo
  const filteredCategorias = categorias.filter(categoria =>
    (showInactive || categoria.activo) && 
    categoria.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastCategoria = currentPage * categoriesPerPage;
  const indexOfFirstCategoria = indexOfLastCategoria - categoriesPerPage;
  const currentCategorias = filteredCategorias.slice(indexOfFirstCategoria, indexOfLastCategoria);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div className="text-center text-xl">Cargando...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Gestión de Categorías</h2>
      
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Buscar Categoría"
          className="border border-gray-300 rounded-lg py-2 px-4 w-1/2 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg shadow transform transition hover:scale-105"
          onClick={() => handleOpenModal()}
        >
          Crear Categoría
        </button>

        {/* Checkbox para mostrar inactivos */}
        <div className="flex items-center ml-4">
          <input
            type="checkbox"
            id="showInactive"
            className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            checked={showInactive}
            onChange={() => setShowInactive(!showInactive)}
          />
          <label htmlFor="showInactive" className="text-gray-700">Mostrar inactivos</label>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-gray-800 font-semibold">Nombre</th>
              <th className="py-3 px-4 text-left text-gray-800 font-semibold">Descripción</th>
              <th className="py-3 px-4 text-left text-gray-800 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentCategorias.map((categoria) => (
              <tr
                key={categoria.id}
                className={`${
                  categoria.activo ? "bg-white" : "bg-gray-200"
                } hover:bg-gray-50 transition`}
              >
                <td className="py-3 px-4 text-gray-700">{categoria.nombre}</td>
                <td className="py-3 px-4 text-gray-700">{categoria.descripcion || "Sin descripción"}</td>
                <td className="py-3 px-4 flex space-x-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-lg shadow transform transition hover:scale-105"
                    onClick={() => handleOpenModal(categoria)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg shadow transform transition hover:scale-105"
                    onClick={() => handleOpenDeleteModal(categoria)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-8">
        <nav className="inline-flex space-x-2">
          {Array.from({ length: Math.ceil(filteredCategorias.length / categoriesPerPage) }, (_, i) => (
            <button
              key={i + 1}
              className={`px-4 py-2 rounded-lg border ${
                currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'
              } shadow transition`}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </nav>
      </div>

      {/* Modal para crear/editar */}
      <CategoriaModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        selectedCategoria={selectedCategoria}
        onSave={handleSave}
        isEditing={isEditing}
      />

      {/* Modal de confirmación de eliminación */}
      <CategoriaDeleteModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        selectedCategoria={selectedCategoria}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default CategoriasPage;
