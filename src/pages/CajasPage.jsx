import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchCajas,
  addCaja,
  updateCaja,
  deleteCaja,
} from "../reducers/cajaSlice";
import CajaModal from "../components/CajaModal";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

const CajasPage = () => {
  console.log("Cargando cajas...");
  const dispatch = useDispatch();
  const { id } = useParams();

  const { cajas = [], loading, error } = useSelector((state) => state.cajas);

  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCaja, setSelectedCaja] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showInactive, setShowInactive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (id) dispatch(fetchCajas(id));
  }, [dispatch, id]);

  const handleOpenModal = (caja = null) => {
    setSelectedCaja(caja);
    setIsEditing(!!caja);
    setOpenModal(true);
  };

  const handleSave = async (caja) => {
    if (isEditing) {
      await dispatch(updateCaja({ idSucursal: id, idCaja: caja.id, caja }));
    } else {
      await dispatch(addCaja({ idSucursal: id, caja }));
    }
    setOpenModal(false);
    dispatch(fetchCajas(id));
  };

  const handleDelete = async (idCaja) => {
    await dispatch(deleteCaja({ idSucursal: id, idCaja }));
    dispatch(fetchCajas(id));
  };

  // Filtrar cajas (asegurándonos de que cajas esté definido)
  const filteredCajas = (cajas || []).filter(
    (caja) =>
      (showInactive || caja.activo) &&
      caja.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginación
  const totalPages = Math.ceil(filteredCajas.length / itemsPerPage);
  const currentCajas = filteredCajas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <CajaModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        selectedCaja={selectedCaja}
        onSave={handleSave}
        isEditing={isEditing}
      />

      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Gestión de Cajas</h2>

        {/* Barra de búsqueda, filtro de inactivos y botón para crear */}
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Buscar caja"
            className="border border-gray-300 rounded-lg py-2 px-4 w-1/2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg shadow-sm transition transform hover:scale-105"
            onClick={() => handleOpenModal()}
          >
            Crear Caja
          </button>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="showInactive"
              className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
              checked={showInactive}
              onChange={() => setShowInactive(!showInactive)}
            />
            <label htmlFor="showInactive" className="text-gray-700">
              Mostrar inactivos
            </label>
          </div>
        </div>

        {/* Tabla de cajas */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="border-b border-gray-300 py-3 px-4 text-left">ID</th>
                <th className="border-b border-gray-300 py-3 px-4 text-left">Nombre</th>
                <th className="border-b border-gray-300 py-3 px-4 text-left">Sucursal</th>
                <th className="border-b border-gray-300 py-3 px-4 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentCajas.map((caja) => (
                <tr
                  key={caja.id}
                  className={`${caja.activo ? "bg-white hover:bg-gray-50" : "bg-gray-200"} transition`}
                >
                  <td className="border-b border-gray-200 py-3 px-4">{caja.id}</td>
                  <td className="border-b border-gray-200 py-3 px-4">{caja.nombre}</td>
                  <td className="border-b border-gray-200 py-3 px-4">{caja.sucursal?.nombre || 'N/A'}</td>
                  <td className="border-b border-gray-200 py-3 px-4">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-lg shadow-sm transition transform hover:scale-105 mr-2"
                      onClick={() => handleOpenModal(caja)}
                    >
                      <PencilSquareIcon className="h-5 w-5 mr-1" />
                      Editar
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg shadow-sm transition transform hover:scale-105"
                      onClick={() => handleDelete(caja.id)}
                    >
                      <TrashIcon className="h-5 w-5 mr-1" />
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

export default CajasPage;
