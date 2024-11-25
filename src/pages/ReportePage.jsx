import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { fetchSucursales } from "../reducers/sucursalSlice";
import { fetchAlmacenes } from "../reducers/almacenSlice";
import { fetchProductos } from "../reducers/productoSlice";
import { fetchProveedores } from "../reducers/proveedorSlice";
import { fetchProductosAlmacen } from "../reducers/productAlmacenSlice";
import { fetchAllAlmacenes } from '../reducers/almacenSlice'; // Importa la nueva acción


const ReportePage = () => {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [sucursalId, setSucursalId] = useState("all");
  const [almacenId, setAlmacenId] = useState(""); 
  const [productoId, setProductoId] = useState("");
  const [proveedoresId, setProveedoresId] = useState("");
   // Nuevo estado

  const dispatch = useDispatch();

  const sucursales = useSelector((state) => state.sucursales.sucursales);
  console.log("Sucursales:", sucursales);
  const almacenes = useSelector((state) => state.almacenes.almacenes);
  console.log("Almacenes:", almacenes);
  const productos = useSelector((state) => state.productos.productos);
  const proveedores = useSelector((state) => state.proveedores.proveedores);
  const productosAlmacen = useSelector((state) => state.productAlmacenes?.productosAlmacen || []);

  useEffect(() => {
    dispatch(fetchSucursales());
    dispatch(fetchProveedores());
    dispatch(fetchAllAlmacenes()); // Llamada única para obtener todos los almacenes
  }, [dispatch]);

 

  useEffect(() => {
    if (almacenId && almacenId !== "all") {
      dispatch(fetchProductos(almacenId));
      dispatch(fetchProductosAlmacen(almacenId));
    }
  }, [dispatch, almacenId]);

  useEffect(() => {
    console.log("Productos en Almacén cargados:", productosAlmacen);
}, [productosAlmacen]);

  const generatePDF = () => {

    // Forzar `almacenId` a `"all"` si `sucursalId` es `"all"` y `almacenId` está vacío
    if (sucursalId === "all" && almacenId === "") {
      setAlmacenId("all");
    }

    console.log("Fecha Inicio:", fechaInicio);
    console.log("Fecha Fin:", fechaFin);
    console.log("Sucursal seleccionada:", sucursalId);
    console.log("Almacén seleccionado:", almacenId);
    console.log("Producto seleccionado:", productoId);
    console.log("Proveedor seleccionado:", proveedoresId);
    console.log("Productos en Almacén:", productosAlmacen);
    const doc = new jsPDF();
    doc.text("Reporte", 20, 20);

    if (fechaInicio && fechaFin) {
      doc.text(`Fecha: ${fechaInicio} - ${fechaFin}`, 20, 30);
    }

    // 1. Solo Sucursales seleccionadas FUNCIONA
    if (sucursalId === "all" && almacenId === "" && !productoId && !proveedoresId) {
      console.log("Generando reporte solo con Sucursales seleccionadas.");
      autoTable(doc, {
        head: [["ID", "Nombre", "Dirección"]],
        body: sucursales.map(s => [s.id, s.nombre, s.direccion]),
        startY: 40
      });
    }

   

       // 2. Todas las Sucursales y Almacenes Funciona
      else if (sucursalId === "all" && almacenId === "all" && !productoId && !proveedoresId) {
        console.log("Generando reporte para todas las Sucursales y sus Almacenes.");
       
        autoTable(doc, {
          head: [["Sucursal", "Almacén"]],
          body: sucursales.flatMap((sucursal) => {
            // Filtrar almacenes por sucursal.id en lugar de id_sucursal
            const almacenesDeSucursal = almacenes.filter(
              (a) => a.sucursal.id === sucursal.id
            );
            console.log(`Almacenes encontrados para Sucursal ${sucursal.nombre} (ID ${sucursal.id}):`, almacenesDeSucursal);
      
            return almacenesDeSucursal.length > 0
              ? almacenesDeSucursal.map((almacen) => [sucursal.nombre, almacen.descripcion])
              : [[sucursal.nombre, "Sin almacenes"]];
          }),
          startY: 40,
        });
      }

    // 3. Una Sucursal y todos sus Almacenes FUNCIONA
    else if (sucursalId !== "all" && almacenId === "all" && !productoId && !proveedoresId) {
      const selectedAlmacenes = almacenes.filter(a => a.sucursal.id === Number(sucursalId));
      autoTable(doc, {
        head: [["Almacén"]],
        body: selectedAlmacenes.map(a => [a.descripcion]),
        startY: 40
      });
    }

    // 4. Todos los Productos (sin relación con sucursal o almacén)
    else if (sucursalId === "all" && almacenId === "all" && productoId === "all" && !proveedoresId) {
      autoTable(doc, {
        head: [["Nombre", "Descripción", "Stock"]],
        body: productosAlmacen.map(p => [p.nombre, p.descripcion, p.stock]),
        startY: 40
      });
    }

     // 5. Sucursal y Almacén específicos, Todos los Productos en ese Almacén 
     else if (sucursalId && almacenId && productoId === "all" && !proveedoresId) {
      const selectedSucursal = sucursales.find(s => s.id === Number(sucursalId));
      const selectedAlmacen = almacenes.find(a => a.id === Number(almacenId));
   
      // Filtrar productos por el almacen seleccionado
      const productosEnAlmacen = productosAlmacen.filter(p => p.almacen_id === Number(almacenId));
      console.log("Sucursal seleccionada:", selectedSucursal);
      console.log("Almacén seleccionado:", selectedAlmacen);
      console.log("Productos filtrados en el almacén seleccionado:", productosEnAlmacen);
    
      autoTable(doc, {
        head: [["Sucursal", "Almacén", "Producto", "Descripción", "Stock"]],
        body: productosEnAlmacen.map(p => [
          selectedSucursal ? selectedSucursal.nombre : "",
          selectedAlmacen ? selectedAlmacen.descripcion : "",
          p.nombre,
          p.descripcion,
          p.stock
        ]),
        startY: 40
      });
    }
   
    
// 6. Sucursal, Almacén, y un Producto específico
else if (sucursalId && almacenId && productoId && !proveedoresId && productoId !== "all") {
  const selectedSucursal = sucursales.find(s => s.id === Number(sucursalId));
  const selectedAlmacen = almacenes.find(a => a.id === Number(almacenId));
  const selectedProducto = productos.find(p => p.id === Number(productoId));
  const productoAlmacen = productosAlmacen.find(p => p.id_producto === Number(productoId) && p.almacen_id === Number(almacenId));

  if (selectedProducto && productoAlmacen) {
    autoTable(doc, {
      head: [["Sucursal", "Almacén", "Producto", "Descripción", "Stock"]],
      body: [[
        selectedSucursal ? selectedSucursal.nombre : "",
        selectedAlmacen ? selectedAlmacen.descripcion : "",
        selectedProducto.nombre,
        productoAlmacen.descripcion,
        productoAlmacen.stock
      ]],
      startY: 40 // Puedes ajustar esta coordenada para la posición inicial de la tabla
    });
  } else {
    console.log("Producto específico no encontrado en el almacén especificado.");
  }
}


    // 7. Solo Proveedores
    else if (!sucursalId && !almacenId && !productoId && proveedoresId === "all") {
      autoTable(doc, {
        head: [["Proveedor"]],
        body: proveedores.map(p => [p.nombre]),
        startY: 40
      });
    }

    // 8. Sucursal, Almacén, Producto(s), y Proveedores relacionados
    else if (sucursalId && almacenId && (productoId || productoId === "all") && proveedoresId === "all") {
      const proveedoresFiltrados = proveedores.filter(proveedor => 
        productosAlmacen.some(pa => pa.id_proveedor === proveedor.id && pa.almacen_id === almacenId)
      );
      autoTable(doc, {
        head: [["Proveedor"]],
        body: proveedoresFiltrados.map(p => [p.nombre]),
        startY: 40
      });
    }

    // Guardar PDF
    doc.save("reporte.pdf");
  };

  return (
    <div style={{ padding: "20px", textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "24px", color: "#333" }}>Reportes</h1>
      <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "20px", maxWidth: "700px", margin: "0 auto", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <div style={{ flex: "1", marginRight: "10px" }}>
            <label style={{ display: "block", fontWeight: "bold", color: "#555" }}>Fecha Inicio</label>
            <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />
          </div>
          <div style={{ flex: "1", marginRight: "10px" }}>
            <label style={{ display: "block", fontWeight: "bold", color: "#555" }}>Fecha Fin</label>
            <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />
          </div>
          <button onClick={generatePDF} style={{ padding: "10px 20px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
            Generar Reporte
          </button>
        </div>

        <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "20px" }}>
          <div style={{ flex: "1", marginRight: "10px" }}>
            <label style={{ display: "block", fontWeight: "bold", color: "#555" }}>Sucursal</label>
            <select value={sucursalId} onChange={(e) => setSucursalId(e.target.value)} style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}>
              <option value="all">Todas las Sucursales</option>
              {sucursales.map((sucursal) => (
                <option key={sucursal.id} value={sucursal.id}>
                  {sucursal.nombre}
                </option>
              ))}
            </select>
          </div>

          <div style={{ flex: "1", marginRight: "10px" }}>
            <label style={{ display: "block", fontWeight: "bold", color: "#555" }}>Almacen</label>
            <select value={almacenId} onChange={(e) => {const value = e.target.value;
              console.log("Almacén seleccionado:", value); // Para verificar
              setAlmacenId(Number(e.target.value));
            }} style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}>
              <option value="all">Todos los Almacenes</option>
              {almacenes.map((almacen) => (
                <option key={almacen.id} value={almacen.id}>
                  {almacen.descripcion}
                </option>
              ))}
            </select>
          </div>

          <div style={{ flex: "1" }}>
            <label style={{ display: "block", fontWeight: "bold", color: "#555" }}>Productos</label>
            <select value={productoId} onChange={(e) => setProductoId(e.target.value)} style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}>
              <option value="all">Todos los Productos</option>
              {productos.map((producto) => (
                <option key={producto.id} value={producto.id}>
                  {producto.nombre}
                </option>
              ))}
            </select>
          </div>

          <div style={{ flex: "1" }}>
            <label style={{ display: "block", fontWeight: "bold", color: "#555" }}>Proveedores</label>
            <select value={proveedoresId} onChange={(e) => setProveedoresId(e.target.value)} style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}>
              <option value="all">Todos los Proveedores</option>
              {proveedores.map((proveedor) => (
                <option key={proveedor.id} value={proveedor.id}>
                  {proveedor.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportePage;
