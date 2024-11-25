import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductosAlmacen } from "../reducers/productAlmacenSlice";

const InventarioPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id, idAlmacen } = useParams();

    // Seleccionar los productos del estado de Redux
    const { productosAlmacen, loading, error } = useSelector((state) => state.productAlmacenes);

    // Cargar los productos al montar el componente
    useEffect(() => {
        if (idAlmacen) {
            dispatch(fetchProductosAlmacen(idAlmacen));
        }
    }, [dispatch, idAlmacen]);

    // Renderizar la interfaz según el estado de carga y error
    if (loading) {
        return <p>Cargando inventario...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h1>Inventario del Almacén {idAlmacen}</h1>
             {/* Botón para ir a Notas de Entrada */}
             <button
                onClick={() => navigate(`/sucursales/${id}/panel/almacenes/${idAlmacen}/notas-entrada`)}
                className="p-2 bg-blue-500 text-white rounded mb-4"
            >
                Ver Notas de Entrada
            </button>

            <table>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Stock</th>
                        {/* <th>Activo</th> */}
                    </tr>
                </thead>
                <tbody>
                    {productosAlmacen.length > 0 ? (
                        productosAlmacen.map((producto) => (
                            <tr key={producto.id_producto}>
                                <td>{producto.nombre}</td>
                                <td>{producto.stock}</td>
                                {/* <td>{producto.activo ? "Sí" : "No"}</td> */}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No hay productos en este almacén</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default InventarioPage;
