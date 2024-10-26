import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAlmacenes,
  addAlmacen,
  updateAlmacen,
  deleteAlmacen,
} from "../reducers/almacenSlice";
import AlmacenModal from "../components/AlmacenModal";
import { PencilSquareIcon, TrashIcon, BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import { useParams,useNavigate } from "react-router-dom";

const AlmacenesPage = () => {
  console.log("cargando almacenes");
  const dispatch = useDispatch();
  const { id } = useParams(); // Obtenemos el ID de la sucursal desde la URL
  const { almacenes, loading, error } = useSelector((state) => state.almacenes);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAlmacen, setSelectedAlmacen] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showInactive, setShowInactive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Número de almacenes por página

  useEffect(() => {
    dispatch(fetchAlmacenes(id)); // Fetch almacenes para la sucursal
  }, [dispatch, id]);

  const handleOpenModal = (almacen = null) => {
    setSelectedAlmacen(almacen);
    setIsEditing(!!almacen);
    setOpenModal(true);
  };

  const handleSelectAlmacen= (almacen) => {
    console.log('Almacen seleccionado:', almacen);
     // Actualizamos el almacen seleccionado
    console.log('Redirigiendo a:', `/sucursales/${id}/panel/almacenes/${almacen.id}`);
    navigate(`/sucursales/${id}/panel/almacenes/${almacen.id}`);  // Redirigimos al inventario del almacen
  };

  const handleSave = async (almacen) => {
    if (isEditing) {
      await dispatch(updateAlmacen({ idSucursal: id, idAlmacen: almacen.id, almacen }));
    } else {
      await dispatch(addAlmacen({ idSucursal: id, almacen }));
    }
    setOpenModal(false);
    dispatch(fetchAlmacenes(id));
  };

  const handleDelete = async (idAlmacen) => {
    await dispatch(deleteAlmacen({ idSucursal: id, idAlmacen }));
    dispatch(fetchAlmacenes(id));
  };

  const filteredAlmacenes = almacenes.filter(
    (almacen) =>
      (showInactive || almacen.activo) &&
      (almacen.numero.toString().includes(searchTerm.toLowerCase()) ||
        almacen.descripcion.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Paginación
  const totalPages = Math.ceil(filteredAlmacenes.length / itemsPerPage);
  const paginatedAlmacenes = filteredAlmacenes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <AlmacenModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        selectedAlmacen={selectedAlmacen}
        onSave={handleSave}
        isEditing={isEditing}
      />

      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Gestión de Almacenes</h2>

        {/* Barra de búsqueda, filtro de inactivos y botón para crear */}
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Buscar Almacén"
            className="border border-gray-300 rounded-lg py-2 px-4 w-1/2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg shadow-sm transition transform hover:scale-105"
            onClick={() => handleOpenModal()}
          >
            Crear Almacén
          </button>

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

        {/* Lista de almacenes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedAlmacenes.map((almacen) => (
            <div key={almacen.id} className={`p-4 rounded-lg shadow-lg ${almacen.activo ? 'bg-white' : 'bg-gray-200'}`}>
              <h3 className="text-xl font-bold mb-2">Almacén #{almacen.numero}</h3>
              <p className="text-sm text-gray-600"><strong>Descripción:</strong> {almacen.descripcion}</p>
              <p className="text-sm text-gray-600"><strong>Sucursal:</strong> {almacen.sucursal.nombre}</p>

              <div className="flex justify-between items-center mt-4">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-lg shadow-sm flex items-center"
                  onClick={() => handleOpenModal(almacen)}
                >
                  <PencilSquareIcon className="h-5 w-5 mr-1" />
                  Editar
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-lg shadow-sm flex items-center"
                  onClick={() => handleSelectAlmacen(almacen)}
                >
                  <PencilSquareIcon className="h-5 w-5 mr-1" />
                  Seleccionar
                </button>


                <button
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg shadow-sm flex items-center"
                  onClick={() => handleDelete(almacen.id)}
                >
                  <TrashIcon className="h-5 w-5 mr-1" />
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Paginación */}
        <div className="flex justify-center mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="mx-2 py-2 px-4 bg-gray-300 rounded-lg disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="py-2 px-4">{`Página ${currentPage} de ${totalPages}`}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="mx-2 py-2 px-4 bg-gray-300 rounded-lg disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>
    </>
  );
};

export default AlmacenesPage;
