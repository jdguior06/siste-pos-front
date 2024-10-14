import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchProveedoresApi,
  fetchProveedorApi,
  addProveedorApi,
  updateProveedorApi,
  deleteProveedorApi,
} from '../services/proveedorService';  // Importamos los servicios API

// Thunks para las acciones asíncronas
export const fetchProveedores = createAsyncThunk('proveedores/fetchProveedores', async (_, { rejectWithValue }) => {
  try {
    const data = await fetchProveedoresApi();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchProveedor = createAsyncThunk('proveedores/fetchProveedor', async (id, { rejectWithValue }) => {
  try {
    const data = await fetchProveedorApi(id);
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const addProveedor = createAsyncThunk('proveedores/addProveedor', async (proveedor, { rejectWithValue }) => {
  try {
    const data = await addProveedorApi(proveedor);
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateProveedor = createAsyncThunk('proveedores/updateProveedor', async ({ id, proveedor }, { rejectWithValue }) => {
  try {
    const data = await updateProveedorApi(id, proveedor);
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteProveedor = createAsyncThunk('proveedores/deleteProveedor', async (id, { rejectWithValue }) => {
  try {
    const data = await deleteProveedorApi(id);
    return { id };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Slice de proveedores
const proveedorSlice = createSlice({
  name: 'proveedores',
  initialState: {
    proveedores: [],
    proveedor: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch proveedores
      .addCase(fetchProveedores.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProveedores.fulfilled, (state, action) => {
        state.loading = false;
        state.proveedores = action.payload;
      })
      .addCase(fetchProveedores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch proveedor
      .addCase(fetchProveedor.fulfilled, (state, action) => {
        state.proveedor = action.payload;
        state.loading = false;
      })

      // Add proveedor
      .addCase(addProveedor.fulfilled, (state, action) => {
        state.proveedores.push(action.payload);
      })

      // Update proveedor
      .addCase(updateProveedor.fulfilled, (state, action) => {
        const index = state.proveedores.findIndex(proveedor => proveedor.id === action.payload.id);
        if (index !== -1) {
          state.proveedores[index] = action.payload;
        }
      })

      // Delete proveedor
      .addCase(deleteProveedor.fulfilled, (state, action) => {
        state.proveedores = state.proveedores.filter(proveedor => proveedor.id !== action.payload.id);
      })

      .addCase(deleteProveedor.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default proveedorSlice.reducer;
