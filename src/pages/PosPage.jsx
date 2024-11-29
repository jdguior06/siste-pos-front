import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  addToCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
} from "../reducers/cartSlice";
import { fetchProductosConsolidados } from "../reducers/productoSlice";
import { fetchClientes, addCliente } from "../reducers/clienteSlice";
import { realizarVenta, cierreCaja } from "../reducers/cajaSesionSlice";
import { useTheme } from "../context/ThemeContext";
import ClienteModal from "../components/ClienteModal";
import MetodoPagoModal from "../components/MetodoPagoModal";

const PosPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { sesionId } = useParams();
  const idSucursal = location.state?.idSucursal;
  const { theme } = useTheme();

  const products = useSelector(
    (state) => state.productos.productosConsolidados
  );
  const cartItems = useSelector((state) => state.cart.items);
  const clientes = useSelector((state) => state.clientes.clientes);
  const total = cartItems.reduce(
    (acc, item) => acc + item.precioVenta * item.cantidad,
    0
  );

  const [selectedCliente, setSelectedCliente] = useState(null);
  const [isClienteModalOpen, setIsClienteModalOpen] = useState(false);
  const [isMetodoPagoModalOpen, setIsMetodoPagoModalOpen] = useState(false);
  const [metodosPago, setMetodosPago] = useState([]);
  const [ventaPendiente, setVentaPendiente] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [clienteSearchTerm, setClienteSearchTerm] = useState("");
  const [errorVenta, setErrorVenta] = useState("");

  useEffect(() => {
    if (idSucursal) {
      dispatch(fetchProductosConsolidados(idSucursal));
      dispatch(fetchClientes());
    } else {
      alert("ID de sucursal no encontrado. Redirigiendo al inicio.");
      navigate("/");
    }
  }, [dispatch, idSucursal, navigate]);

  // Ejecuta la venta solo cuando `metodosPago` esté actualizado
  useEffect(() => {
    if (ventaPendiente) {
      handleConfirmarVenta();
      setVentaPendiente(false); // Resetea el estado
    }
  }, [ventaPendiente, metodosPago]);

  const handleAddToCart = (product) => dispatch(addToCart(product));
  const handleRemoveFromCart = (productId) =>
    dispatch(removeFromCart(productId));
  const handleQuantityChange = (productId, quantity) =>
    dispatch(updateCartQuantity({ productId, quantity }));

  const handleOpenClienteModal = () => setIsClienteModalOpen(true);

  const handleSaveCliente = async (clienteData) => {
    try {
      const newCliente = await dispatch(addCliente(clienteData)).unwrap();
      setSelectedCliente(newCliente);
      setIsClienteModalOpen(false);
    } catch (error) {
      alert(`Error al agregar cliente: ${error.message}`);
    }
  };

  const handlePagar = () => {
    if (cartItems.length === 0) {
      alert("El carrito está vacío. Agrega productos antes de pagar.");
      return;
    }
    setErrorVenta("");
    setIsMetodoPagoModalOpen(true);
  };

  const handleConfirmarVenta = async () => {
    console.log("Estado de metodosPago en POS:", metodosPago);

    const sumaPagos = metodosPago.reduce(
      (acc, metodo) => acc + parseFloat(metodo.monto || 0),
      0
    );

    if (sumaPagos < total) {
      setErrorVenta(
        `El total de los métodos de pago (${sumaPagos.toFixed(
          2
        )}) no cubre el total de la venta (${total.toFixed(2)}).`
      );
      return;
    }

    const ventaData = {
      id_cliente: selectedCliente ? selectedCliente.id : null,
      id_caja_sesion: parseInt(sesionId),
      detalleVentaDTOS: cartItems.map((item) => ({
        id_producto: item.id,
        cantidad: item.cantidad,
      })),
      metodosPago,
    };

    console.log("Datos enviados a la API:", JSON.stringify(ventaData, null, 2));

    try {
      await dispatch(realizarVenta(ventaData));
      alert("Venta realizada con éxito");
      dispatch(clearCart());
      setSelectedCliente(null);
      dispatch(fetchProductosConsolidados(idSucursal));
      dispatch(fetchClientes());

      setMetodosPago([]);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleCierreCaja = async () => {
    try {
      await dispatch(cierreCaja(sesionId));
      alert("Caja cerrada con éxito");
      navigate("/dashboard");
    } catch (error) {
      alert(`Error al cerrar la caja: ${error.message}`);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredClientes = clientes.filter(
    (cliente) =>
      `${cliente.nombre} ${cliente.apellido}`
        .toLowerCase()
        .includes(clienteSearchTerm.toLowerCase()) ||
      cliente.email?.toLowerCase().includes(clienteSearchTerm.toLowerCase()) ||
      cliente.nit?.toString().includes(clienteSearchTerm)
  );

  return (
    <div style={{ color: theme.textColor }}>
      <nav className="bg-gray-800 p-4 flex justify-between items-center">
        <h1 className="text-white font-bold text-lg">Punto de Venta</h1>
        <button
          onClick={handleCierreCaja}
          className="bg-red-600 text-white py-2 px-4 rounded-lg"
        >
          Cerrar Caja
        </button>
      </nav>

      <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <ClienteModal
          open={isClienteModalOpen}
          onClose={() => setIsClienteModalOpen(false)}
          onSave={handleSaveCliente}
        />

        <MetodoPagoModal
          open={isMetodoPagoModalOpen}
          onClose={() => setIsMetodoPagoModalOpen(false)}
          total={total}
          onSave={(selectedMetodosPago) => {
            setMetodosPago(selectedMetodosPago);
            setIsMetodoPagoModalOpen(false); // Cierra el modal
            setVentaPendiente(true); // Indica que la venta está pendiente
          }}
        />

        <div className="md:col-span-2">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Productos</h2>
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Buscar productos"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border rounded-lg py-3 px-5 shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-4 top-3.5 h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 16l-4-4m0 0l4-4m-4 4h16"
              />
            </svg>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.producto.id}
                className="border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
              >
                <img
                  src={
                    product.producto.foto ||
                    "https://via.placeholder.com/150?text=No+Image"
                  }
                  alt={product.producto.nombre}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-800 mb-1 truncate">
                    {product.producto.nombre}
                  </h3>
                  <p className="text-gray-600 mb-1">
                    Precio:{" "}
                    <span className="text-gray-800 font-semibold">
                      ${product.producto.precioVenta.toFixed(2)}
                    </span>
                  </p>
                  <p
                    className={`mb-3 font-semibold ${
                      product.totalStock < 5 ? "text-red-500" : "text-green-600"
                    }`}
                  >
                    Stock: {product.totalStock}
                  </p>
                  <button
                    onClick={() => handleAddToCart(product.producto)}
                    className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Agregar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border rounded-lg p-6 shadow-lg bg-white">
          {errorVenta && (
            <p className="text-red-500 mb-4 text-sm">{errorVenta}</p>
          )}

          {cartItems.length === 0 ? (
            <p className="text-gray-600 text-lg">
              Tu carrito está vacío. Añade productos para comenzar.
            </p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-gray-50 border rounded-lg shadow-sm p-4"
                >
                  <div className="flex items-center">
                    <img
                      src={item.foto || "https://via.placeholder.com/60"}
                      alt={item.nombre}
                      className="w-16 h-16 object-cover rounded-lg mr-4"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700">
                        {item.nombre}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Precio: ${item.precioVenta.toFixed(2)}
                      </p>
                      <p className="text-gray-500 text-sm">
                        Total: ${(item.precioVenta * item.cantidad).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.cantidad - 1)
                      }
                      disabled={item.cantidad <= 1}
                      className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 disabled:bg-gray-100"
                    >
                      <span className="sr-only">Disminuir cantidad</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-5 h-5 text-gray-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18 12H6"
                        />
                      </svg>
                    </button>
                    <span className="text-gray-800 font-medium">
                      {item.cantidad}
                    </span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.cantidad + 1)
                      }
                      className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                    >
                      <span className="sr-only">Aumentar cantidad</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-5 h-5 text-gray-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v12m6-6H6"
                        />
                      </svg>
                    </button>

                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="p-2 bg-red-100 rounded-full hover:bg-red-200"
                    >
                      <span className="sr-only">Eliminar producto</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-5 h-5 text-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}

              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-700 flex justify-between">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </h3>
              </div>
            </div>
          )}

          <div className="mt-6 space-y-6">
            <label className="block text-gray-700 font-medium mb-2">
              Seleccione o busque un cliente:
            </label>
            <input
              type="text"
              placeholder="Buscar cliente (nombre, apellido, email, NIT)"
              value={clienteSearchTerm}
              onChange={(e) => setClienteSearchTerm(e.target.value)}
              className="border rounded-lg px-4 py-2 w-full shadow-sm focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-700 mb-4"
            />
            <select
              onChange={(e) =>
                setSelectedCliente(
                  clientes.find(
                    (cliente) => cliente.id === Number(e.target.value)
                  ) || null
                )
              }
              className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sin cliente (anónimo)</option>
              {filteredClientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.email} - {cliente.nit || "Sin NIT"}
                </option>
              ))}
            </select>
            <button
              onClick={handleOpenClienteModal}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600"
            >
              Agregar nuevo cliente
            </button>
            <button
              onClick={handlePagar}
              className="mt-4 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 text-lg font-bold"
            >
              Pagar ${total.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PosPage;
