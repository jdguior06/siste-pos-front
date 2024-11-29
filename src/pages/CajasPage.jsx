import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchCajas,
  addCaja,
  updateCaja,
  deleteCaja,
} from "../reducers/cajaSlice";
import CajaModal from "../components/CajaModal";
import AperturaCajaModal from "../components/AperturaCajaModal";
import { PencilSquareIcon, TrashIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../context/ThemeContext";
import { verificarSesionAbierta } from "../reducers/cajaSesionSlice";

const CajasPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { theme } = useTheme();

  const { cajas = [], loading, error } = useSelector((state) => state.cajas);

  const [openModal, setOpenModal] = useState(false);
  const [openAperturaModal, setOpenAperturaModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCaja, setSelectedCaja] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showInactive, setShowInactive] = useState(false);

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

  const handleOpenAperturaModal = async (caja) => {
    try {
      const { mismaSesion, sesion } = await dispatch(verificarSesionAbierta(caja.id)).unwrap();
  
      if (sesion) {
        if (mismaSesion) {
          alert('Sesión abierta encontrada. Redirigiendo a la sesión actual...');
          navigate(`/cajas/${caja.id}/sesion/${sesion.id}`, { state: { idSucursal: id } });
        } else {
          alert('La caja tiene una sesión abierta, pero pertenece a otro usuario.');
        }
      } else {
        // No hay sesión abierta, abrir el modal de apertura
        setSelectedCaja(caja);
        setOpenAperturaModal(true);
      }
    } catch (error) {
      alert(error.message || 'Error al verificar la sesión.');
    }
  };

  // Filtrar cajas
  const filteredCajas = (cajas || []).filter(
    (caja) =>
      (showInactive || caja.activo) &&
      caja.nombre.toLowerCase().includes(searchTerm.toLowerCase())
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

      {/* Modal para la apertura de caja */}
      <AperturaCajaModal
        open={openAperturaModal}
        onClose={() => setOpenAperturaModal(false)}
        selectedCaja={selectedCaja}
        idSucursal={id}
      />

      <div className="container mx-auto p-6" style={{ color: theme.textColor, backgroundColor: theme.backgroundColor }}>
        <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: theme.textColor }}>Gestión de Cajas</h2>

        {/* Barra de búsqueda y opciones de visualización */}
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
          <div className="flex items-center ml-4">
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

        {/* Grid de cajas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCajas.map((caja) => (
            <div key={caja.id} className="border p-4 rounded-lg shadow-lg" style={{ backgroundColor: theme.backgroundColor }}>
              <h3 className="text-xl font-bold mb-2" style={{ color: theme.primaryColor }}>{caja.nombre}</h3>
              <p>ID: {caja.id}</p>
              <p>Sucursal: {caja.sucursal?.nombre || "N/A"}</p>
              <p>Estado: {caja.activo ? "Activa" : "Inactiva"}</p>

              {/* Acciones */}
              <div className="flex justify-between mt-4">
                <button
                  className="flex items-center py-1 px-3 rounded-lg shadow-sm transition transform hover:scale-105"
                  style={{ backgroundColor: theme.primaryColor, color: theme.textColor }}
                  onClick={() => handleOpenAperturaModal(caja)}
                >
                  <CurrencyDollarIcon className="h-5 w-5 mr-1 inline" />
                  Aperturar
                </button>
                <button
                  className="flex items-center py-1 px-3 rounded-lg shadow-sm transition transform hover:scale-105"
                  style={{ backgroundColor: theme.primaryColor, color: theme.textColor }}
                  onClick={() => handleOpenModal(caja)}
                >
                  <PencilSquareIcon className="h-5 w-5 mr-1 inline" />
                  
                </button>
                <button
                  className="flex items-center py-1 px-3 rounded-lg shadow-sm transition transform hover:scale-105"
                  style={{ backgroundColor: "#FF4B4B", color: theme.textColor }}
                  onClick={() => handleDelete(caja.id)}
                >
                  <TrashIcon className="h-5 w-5 mr-1 inline" />
                  
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CajasPage;
