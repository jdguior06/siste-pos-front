import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCajas, addCaja, updateCaja, deleteCaja } from "../reducers/cajaSlice";
import { fetchSucursales} from "../reducers/sucursalSlice";
import CajaModal from "../components/CajaModal";
import CajaDeleteModal from "../components/CajaDeleteModal";

const CajasPage = () => {
    const dispatch = useDispatch();
    const { cajas, loading, error } = useSelector((state) => state.cajas);
    const{sucursales} = useSelector((state) => state.sucursales);
    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedCaja, setSelectedCaja] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [showInactive, setShowInactive] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [cajasPerPage] = useState(5);

    useEffect(() => {
        dispatch(fetchCajas());
        dispatch(fetchSucursales());
    }, [dispatch]);

    const handleOpenModal = (caja = null) => {
        setSelectedCaja(caja);
        setIsEditing(!!caja);
        setOpenModal(true);
    };

    const handleOpenDeleteModal = (caja) => {
        setSelectedCaja(caja);
        setOpenDeleteModal(true);
    };

    const handleDelete = async (id) => {
        await dispatch(deleteCaja(id));
        setOpenDeleteModal(false);
        dispatch(fetchCajas());
    };

    const handleSave = async (caja) => {
        if (isEditing) {
            await dispatch(updateCaja({ id: caja.id, caja }));
        } else {
            await dispatch(addCaja(caja));
        }
        setOpenModal(false);
        dispatch(fetchCajas());
    };

  //  const filteredCajas = cajas.filter(caja =>
 //       (showInactive || caja.activo) &&
 //       (`${caja.nombre}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
 //           caja.codigo.toString().includes(searchTerm))
   // );


    // Filtrar productos según búsqueda y estado activo/inactivo
    const filteredCajas = cajas.filter(
    (caja) =>
      (showInactive || caja.activo) &&
      (caja.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caja.sucursal.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
  );



    const indexOfLastCaja = currentPage * cajasPerPage;
    const indexOfFirstCaja = indexOfLastCaja - cajasPerPage;
    const currentCajas = filteredCajas.slice(indexOfFirstCaja, indexOfLastCaja);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) return <div className="text-center text-xl">Cargando...</div>;
    if (error) return <div className="text-center text-red-500">Error: {error}</div>;

    return (
        <>
            {/* Modal para crear o editar caja */}
            <CajaModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                selectedCaja={selectedCaja}
                onSave={handleSave}
                isEditing={isEditing}
                sucursales={sucursales}
            />

            {/* Modal de confirmación de eliminación */}


            
            <CajaDeleteModal
                open={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
                selectedCaja={selectedCaja}
                onDelete={handleDelete}
            />

            <div className="caja-page container mx-auto p-6">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Gestión de Cajas</h2>

                {/* Control para búsqueda y checkbox de inactivos */}
                <div className="flex justify-between items-center mb-6">
                    <input
                        type="text"
                        placeholder="Buscar Caja"
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
                        <label htmlFor="showInactive" className="text-gray-700">Mostrar inactivos</label>
                    </div>
                </div>

                {/* Tabla de cajas */}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="border-b border-gray-300 py-3 px-4 text-left">ID</th>
                                <th className="border-b border-gray-300 py-3 px-4 text-left">Nombre</th>
                                <th className="border-b border-gray-300 py-3 px-4 text-left">sucursal</th>
                                <th className="border-b border-gray-300 py-3 px-4 text-left">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCajas.map((caja) => (
                                <tr
                                    key={caja.id}
                                    className={`${caja.activo ? 'bg-white hover:bg-gray-50' : 'bg-gray-200'} transition`}
                                >
                                    <td className="border-b border-gray-200 py-3 px-4">{caja.id}</td>
                                    <td className="border-b border-gray-200 py-3 px-4">{caja.nombre}</td>
                                    <td className="border-b border-gray-200 py-3 px-4">{caja.sucursal?.nombre}</td>
                                    <td className="border-b border-gray-200 py-3 px-4">
                                        <button
                                            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-lg shadow-sm transition transform hover:scale-105 mr-2"
                                            onClick={() => handleOpenModal(caja)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg shadow-sm transition transform hover:scale-105"
                                            onClick={() => handleOpenDeleteModal(caja)}
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
                        {Array.from({ length: Math.ceil(filteredCajas.length / cajasPerPage) }, (_, i) => (
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

export default CajasPage;