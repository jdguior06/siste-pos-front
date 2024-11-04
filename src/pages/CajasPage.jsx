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
import { useTheme } from "../context/ThemeContext"; // Importa useTheme para obtener los colores del tema

const CajasPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { theme } = useTheme(); // Extrae el tema actual

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

  // Filtrar cajas
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

  if (loading) return <div style={{ color: theme.textColor }}>Cargando...</div>;
  if (error) return <div style={{ color: theme.textColor }}>Error: {error}</div>;

  return (
    <>
      <CajaModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        selectedCaja={selectedCaja}
        onSave={handleSave}
        isEditing={isEditing}
      />

      <div className="container mx-auto p-6" style={{ color: theme.textColor, backgroundColor: theme.backgroundColor }}>
        <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: theme.textColor }}>Gestión de Cajas</h2>

        {/* Barra de búsqueda, filtro de inactivos y botón para crear */}
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Buscar caja"
            className="border rounded-lg py-2 px-4 w-1/2 shadow-sm focus:outline-none focus:ring-2 transition"
            style={{
              color: theme.textColor,
              backgroundColor: theme.backgroundColor,
              borderColor: theme.primaryColor,
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button
            className="py-2 px-6 rounded-lg shadow-sm transition transform hover:scale-105"
            style={{
              backgroundColor: theme.primaryColor,
              color: theme.textColor,
            }}
            onClick={() => handleOpenModal()}
          >
            Crear Caja
          </button>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="showInactive"
              className="mr-2 h-4 w-4 border rounded focus:ring transition"
              style={{
                backgroundColor: theme.backgroundColor,
                borderColor: theme.primaryColor,
              }}
              checked={showInactive}
              onChange={() => setShowInactive(!showInactive)}
            />
            <label htmlFor="showInactive" style={{ color: theme.textColor }}>
              Mostrar inactivos
            </label>
          </div>
        </div>

        {/* Tabla de cajas */}
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-lg shadow-lg" style={{ backgroundColor: theme.backgroundColor }}>
            <thead style={{ color: theme.textColor, backgroundColor: theme.primaryColor }}>
              <tr>
                <th className="border-b py-3 px-4 text-left">ID</th>
                <th className="border-b py-3 px-4 text-left">Nombre</th>
                <th className="border-b py-3 px-4 text-left">Sucursal</th>
                <th className="border-b py-3 px-4 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentCajas.map((caja) => (
                <tr
                  key={caja.id}
                  className={`${caja.activo ? '' : 'bg-gray-200'} transition`}
                  style={{ color: theme.textColor }}
                >
                  <td className="border-b py-3 px-4">{caja.id}</td>
                  <td className="border-b py-3 px-4">{caja.nombre}</td>
                  <td className="border-b py-3 px-4">{caja.sucursal?.nombre || 'N/A'}</td>
                  <td className="border-b py-3 px-4">
                    <button
                      className="py-1 px-3 rounded-lg shadow-sm transition transform hover:scale-105 mr-2"
                      style={{ backgroundColor: theme.primaryColor, color: theme.textColor }}
                      onClick={() => handleOpenModal(caja)}
                    >
                      <PencilSquareIcon className="h-5 w-5 mr-1 inline" />
                      Editar
                    </button>
                    <button
                      className="py-1 px-3 rounded-lg shadow-sm transition transform hover:scale-105"
                      style={{ backgroundColor: '#FF4B4B', color: theme.textColor }}
                      onClick={() => handleDelete(caja.id)}
                    >
                      <TrashIcon className="h-5 w-5 mr-1 inline" />
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
            className="mx-2 py-2 px-4 rounded-lg transition"
            style={{
              backgroundColor: currentPage === 1 ? '#ddd' : theme.primaryColor,
              color: currentPage === 1 ? '#999' : theme.textColor,
            }}
          >
            Anterior
          </button>
          <span className="py-2 px-4" style={{ color: theme.textColor }}>{`Página ${currentPage} de ${totalPages}`}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="mx-2 py-2 px-4 rounded-lg transition"
            style={{
              backgroundColor: currentPage === totalPages ? '#ddd' : theme.primaryColor,
              color: currentPage === totalPages ? '#999' : theme.textColor,
            }}
          >
            Siguiente
          </button>
        </div>
      </div>
    </>
  );
};

export default CajasPage;
