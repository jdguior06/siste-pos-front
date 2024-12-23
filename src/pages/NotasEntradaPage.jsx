import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  crearNotaEntrada,
  fetchNotasBySucursalAlmacen,
} from "../reducers/notaEntradaSlice";
import { fetchAlmacenes } from "../reducers/almacenSlice";
import { fetchProveedores } from "../reducers/proveedorSlice";
import NotaEntradaForm from "../components/NotaEntradaModal";
import DetallesNotaModal from "../components/DetalleNotaModal";
import { fetchProductos } from "../reducers/productoSlice";
import { useParams } from "react-router-dom"; 

const NotaEntradaPage = () => {
  const dispatch = useDispatch();
  const { id: idSucursal, idAlmacen } = useParams(); 

  // Estado de Redux
  const notasEntrada = useSelector(
    (state) => state.notasEntrada.notasEntrada || []
  );
  const loadingNotas = useSelector((state) => state.notasEntrada.loading);
  const productos = useSelector((state) => state.productos.productos); 
  const almacenes = useSelector((state) => state.almacenes.almacenes);
  const proveedores = useSelector((state) => state.proveedores.proveedores);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNota, setSelectedNota] = useState(null); 

  useEffect(() => {
    if (idSucursal && idAlmacen) {
      console.log("ID de Sucursal:", idSucursal);
      console.log("ID de Almacén:", idAlmacen);

      dispatch(fetchNotasBySucursalAlmacen({ idSucursal, idAlmacen }));
      dispatch(fetchProductos());
      dispatch(fetchAlmacenes(idSucursal));
      dispatch(fetchProveedores());
    } else {
      console.error("ID o ID de Almacén no están definidos");
    }
  }, [dispatch, idSucursal, idAlmacen]);

  const handleCreateNota = (formData) => {
    dispatch(crearNotaEntrada(formData))
      .then(() => {
        dispatch(fetchNotasBySucursalAlmacen({ idSucursal, idAlmacen }));
      })
      .catch((error) => {
        console.error("Error al crear la nota de entrada:", error);
      });
  };
  const handleRowClick = (nota) => {
    setSelectedNota(nota); 
  };

  return (
    <div>
      <h1>Nota de Entrada</h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Crear Nota de Entrada
      </button>

      {/* Modal para crear nueva nota de entrada */}
      {isModalOpen && (
        <NotaEntradaForm
          almacenId={idAlmacen}
          productos={productos}
          almacenes={almacenes}
          proveedores={proveedores}
          onSubmit={handleCreateNota}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* Mostrar Notas de Entrada */}
      {loadingNotas ? (
        <p>Cargando notas...</p>
      ) : (
        <div>
          {notasEntrada.length > 0 ? (
            notasEntrada.map(
              (nota) => (
                (
                  <div
                    key={nota.id}
                    className="p-4 border border-gray-300 rounded mb-4 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleRowClick(nota)}
                  >
                    <p>
                      <strong>Nota ID:</strong> {nota.id}
                    </p>
                    {/* <p><strong>Proveedor:</strong> {nota.proveedorId}</p>
                <p><strong>Almacén:</strong> {nota.almacenId}</p> */}
                    <p>
                      <strong>Total:</strong> ${nota.total}
                    </p>
                  </div>
                )
              )
            )
          ) : (
            <p>No hay notas disponibles para este almacén.</p>
          )}
        </div>
      )}
      {/* Modal para detalles de nota */}
      {selectedNota && (
        <DetallesNotaModal
          nota={selectedNota}
          onClose={() => setSelectedNota(null)} // Cerrar modal
        />
      )}
    </div>
  );
};

export default NotaEntradaPage;
