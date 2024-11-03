import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSucursales, addSucursal, updateSucursal, deleteSucursal } from "../reducers/sucursalSlice";
import SucursalModal from "../components/SucursalModal";
import { PencilSquareIcon, TrashIcon, BuildingStorefrontIcon } from "@heroicons/react/24/outline"; 
import { useNavigate } from "react-router-dom";

const SucursalesPage = ({ setSelectedSucursal }) => {  // Añadimos setSelectedSucursal como prop
  const dispatch = useDispatch();
  const { sucursales, loading, error } = useSelector((state) => state.sucursales);
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSucursalLocal, setSelectedSucursalLocal] = useState(null);  // Estado local para el modal
  const [searchTerm, setSearchTerm] = useState("");
  const [showInactive, setShowInactive] = useState(false);

  useEffect(() => {
    dispatch(fetchSucursales());
  }, [dispatch]);

  const handleOpenModal = (sucursal = null) => {
    setSelectedSucursalLocal(sucursal);
    setIsEditing(!!sucursal);
    setOpenModal(true);
  };

  const handleSave = async (sucursal) => {
    if (isEditing) {
      await dispatch(updateSucursal({ id: sucursal.id, sucursal }));
    } else {
      await dispatch(addSucursal(sucursal));
    }
    setOpenModal(false);
    dispatch(fetchSucursales());
  };

  const handleDelete = async (id) => {
    await dispatch(deleteSucursal(id));
    dispatch(fetchSucursales());
  };

  const filteredSucursales = sucursales.filter(
    (sucursal) =>
      (showInactive || sucursal.activo) &&
      (sucursal.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
       sucursal.codigo.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  // Función para gestionar la selección de la sucursal y redirigir al panel
  const handleSelectSucursal = (sucursal) => {
    
    setSelectedSucursal(sucursal);  // Actualizamos la sucursal seleccionada globalmente
    console.log('Redirigiendo a:', `/sucursales/${sucursal.id}/panel`);
    navigate(`/sucursales/${sucursal.id}/panel`);  // Redirigimos al panel de la sucursal
  };

  return (
    <>
      <SucursalModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        selectedSucursal={selectedSucursalLocal}
        onSave={handleSave}
        isEditing={isEditing}
      />

      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Gestión de Sucursales</h2>

        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Buscar Sucursal"
            className="border border-gray-300 rounded-lg py-2 px-4 w-1/2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg shadow-sm transition transform hover:scale-105"
            onClick={() => handleOpenModal()}
          >
            Crear Sucursal
          </button>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="showInactive"
              className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
              checked={showInactive}
              onChange={() => setShowInactive(!showInactive)}
            />
            <label htmlFor="showInactive" className="text-gray-700">Mostrar inactivas</label>
          </div>
        </div>

        {/* Lista de sucursales en formato de tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSucursales.map((sucursal) => (
            <div key={sucursal.id} className={`p-4 rounded-lg shadow-lg ${sucursal.activo ? 'bg-white' : 'bg-gray-200'}`}>
              <h3 className="text-xl font-bold mb-2">{sucursal.nombre}</h3>
              <p className="text-sm text-gray-600"><strong>Código:</strong> {sucursal.codigo}</p>
              <p className="text-sm text-gray-600"><strong>Nit:</strong> {sucursal.nit}</p>
              <p className="text-sm text-gray-600"><strong>Razón Social:</strong> {sucursal.razon_social}</p>
              <p className="text-sm text-gray-600"><strong>Dirección:</strong> {sucursal.direccion}</p>

              <div className="flex justify-between items-center mt-4">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-lg shadow-sm flex items-center"
                  onClick={() => handleOpenModal(sucursal)}
                >
                  <PencilSquareIcon className="h-5 w-5 mr-1" />
                  
                </button>

                <button
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg shadow-sm flex items-center"
                  onClick={() => handleDelete(sucursal.id)}
                >
                  <TrashIcon className="h-5 w-5 mr-1" />
                  
                </button>

                {/* Botón para seleccionar la sucursal y mostrar las opciones de administración */}
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-lg shadow-sm flex items-center"
                  onClick={() => handleSelectSucursal(sucursal)}  // Aquí seleccionamos la sucursal
                >
                  <BuildingStorefrontIcon className="h-5 w-5 mr-1" />
                  Seleccionar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SucursalesPage;
