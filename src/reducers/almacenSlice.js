import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAlmacenesApi,
  fetchAlmacenApi,
  fetchAllAlmacenesSinFiltroApi,
  fetchAlmacenPorProveedorApi,
  addAlmacenApi,
  updateAlmacenApi,
  deleteAlmacenApi,
} from '../services/almacenServices';

// Obtener almacenes de una sucursal
export const fetchAlmacenes = createAsyncThunk(
  'almacenes/fetchAlmacenes',
  async (idSucursal, { rejectWithValue }) => {
    try {
      const data = await fetchAlmacenesApi(idSucursal);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Obtener un almacén específico de una sucursal
export const fetchAlmacen = createAsyncThunk(
  'almacenes/fetchAlmacen',
  async ({ idSucursal, idAlmacen }, { rejectWithValue }) => {
    try {
      const data = await fetchAlmacenApi(idSucursal, idAlmacen);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// Obtener todos los almacenes sin filtrar por sucursal
export const fetchAllAlmacenesSinFiltro = createAsyncThunk(
  'almacenes/fetchAllAlmacenesSinFiltro',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchAllAlmacenesSinFiltroApi();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Obtener almacén asociado a un proveedor
export const fetchAlmacenPorProveedor = createAsyncThunk(
  'almacenes/fetchAlmacenPorProveedor',
  async (proveedorId, { rejectWithValue }) => {
    try {
      const data = await fetchAlmacenPorProveedorApi(proveedorId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Crear un almacén en una sucursal
export const addAlmacen = createAsyncThunk(
  'almacenes/addAlmacen',
  async ({ idSucursal, almacen }, { rejectWithValue }) => {
    try {
      const data = await addAlmacenApi(idSucursal, almacen);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Actualizar un almacén en una sucursal
export const updateAlmacen = createAsyncThunk(
  'almacenes/updateAlmacen',
  async ({ idSucursal, idAlmacen, almacen }, { rejectWithValue }) => {
    try {
      const data = await updateAlmacenApi(idSucursal, idAlmacen, almacen);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Desactivar un almacén en una sucursal
export const deleteAlmacen = createAsyncThunk(
  'almacenes/deleteAlmacen',
  async ({ idSucursal, idAlmacen }, { rejectWithValue }) => {
    try {
      await deleteAlmacenApi(idSucursal, idAlmacen);
      return { idAlmacen };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const almacenSlice = createSlice({
  name: 'almacenes',
  initialState: {
    almacenes: [],
    almacen: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Obtener almacenes de una sucursal
      .addCase(fetchAlmacenes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAlmacenes.fulfilled, (state, action) => {
        state.loading = false;
        state.almacenes = action.payload;
      })
      .addCase(fetchAlmacenes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Obtener un almacén específico de una sucursal
      .addCase(fetchAlmacen.fulfilled, (state, action) => {
        state.almacen = action.payload;
        state.loading = false;
      })

      // Obtener todos los almacenes sin filtrar por sucursal
      .addCase(fetchAllAlmacenesSinFiltro.fulfilled, (state, action) => {
        state.almacenes = action.payload;
        state.loading = false;
      })

      // Obtener almacén asociado a un proveedor
      .addCase(fetchAlmacenPorProveedor.fulfilled, (state, action) => {
        state.almacenes = action.payload;
        state.loading = false;
      })

      // Crear un almacén
      .addCase(addAlmacen.fulfilled, (state, action) => {
        state.almacenes.push(action.payload);
      })

      // Actualizar un almacén
      .addCase(updateAlmacen.fulfilled, (state, action) => {
        const index = state.almacenes.findIndex((almacen) => almacen.id === action.payload.id);
        if (index !== -1) {
          state.almacenes[index] = action.payload;
        }
      })

      // Desactivar un almacén
      .addCase(deleteAlmacen.fulfilled, (state, action) => {
        state.almacenes = state.almacenes.filter((almacen) => almacen.id !== action.payload.idAlmacen);
      })
      .addCase(deleteAlmacen.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default almacenSlice.reducer;