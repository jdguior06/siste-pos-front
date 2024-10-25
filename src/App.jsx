import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import ProductosPage from "./pages/ProductosPage";
import CategoriasPage from "./pages/CategoriasPage";
import ClientesPage from "./pages/ClientesPage";
import ProveedoresPage from "./pages/ProveedoresPage";
import SucursalesPage from "./pages/SucursalesPage";
import SucursalPanel from "./pages/SucursalPanel";
import AlmacenesPage from "./pages/AlmacenesPage";
import CajasPage from "./pages/CajasPage";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./layouts/Dashboard";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { clearAuth, setAuth } from "./reducers/authSlice";

function App() {
  const dispatch = useDispatch();
  const [selectedSucursal, setSelectedSucursal] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setAuth({ token }));
    } else {
      dispatch(clearAuth());
    }
  }, [dispatch]);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Dashboard selectedSucursal={selectedSucursal} />}>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/clientes" element={<ClientesPage />} />
            <Route path="/proveedores" element={<ProveedoresPage />} />
            <Route path="/productos" element={<ProductosPage />} />
            <Route path="/categorias" element={<CategoriasPage />} />
            <Route 
              path="/sucursales" 
              element={<SucursalesPage setSelectedSucursal={setSelectedSucursal} />} 
            />

            {/* Ruta de panel para cada sucursal */}
            <Route path="/sucursales/:id/panel" element={<SucursalPanel selectedSucursal={selectedSucursal} />}>
              {/* Ruta anidada para almacenes */}
              <Route index element={<Navigate to="almacenes" replace/>} />
              <Route path="almacenes" element={<AlmacenesPage />} />
              <Route path="cajas" element={<CajasPage />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
