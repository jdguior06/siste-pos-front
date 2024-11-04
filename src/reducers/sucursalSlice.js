import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchSucursalesApi,
  fetchSucursalApi,
  addSucursalApi,
  updateSucursalApi,
  deleteSucursalApi,
} from '../services/sucursalService';

export const fetchSucursales = createAsyncThunk('sucursales/fetchSucursales', async (_, { rejectWithValue }) => {
  try {
    const data = await fetchSucursalesApi();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchSucursal = createAsyncThunk('sucursales/fetchSucursal', async (id, { rejectWithValue }) => {
  try {
    const data = await fetchSucursalApi(id);
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const addSucursal = createAsyncThunk('sucursales/addSucursal', async (sucursal, { rejectWithValue }) => {
  try {
    const data = await addSucursalApi(sucursal);
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateSucursal = createAsyncThunk('sucursales/updateSucursal', async ({ id, sucursal }, { rejectWithValue }) => {
  try {
    const data = await updateSucursalApi(id, sucursal);
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteSucursal = createAsyncThunk('sucursales/deleteSucursal', async (id, { rejectWithValue }) => {
  try {
    await deleteSucursalApi(id);
    return { id };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const sucursalSlice = createSlice({
  name: 'sucursales',
  initialState: {
    sucursales: [],
    sucursal: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch sucursales
      .addCase(fetchSucursales.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSucursales.fulfilled, (state, action) => {
        state.loading = false;
        state.sucursales = action.payload;
      })
      .addCase(fetchSucursales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch sucursal
      .addCase(fetchSucursal.fulfilled, (state, action) => {
        state.sucursal = action.payload;
        state.loading = false;
      })

      // Add sucursal
      .addCase(addSucursal.fulfilled, (state, action) => {
        state.sucursales.push(action.payload);
      })

      // Update sucursal
      .addCase(updateSucursal.fulfilled, (state, action) => {
        const index = state.sucursales.findIndex(sucursal => sucursal.id === action.payload.id);
        if (index !== -1) {
          state.sucursales[index] = action.payload;
        }
      })

      // Delete sucursal
      .addCase(deleteSucursal.fulfilled, (state, action) => {
        state.sucursales = state.sucursales.filter(sucursal => sucursal.id !== action.payload.id);
      })

      .addCase(deleteSucursal.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default sucursalSlice.reducer;
