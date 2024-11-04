import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAlmacenesApi,
  fetchAlmacenApi,
  addAlmacenApi,
  updateAlmacenApi,
  deleteAlmacenApi,
  fetchAllAlmacenesApi,
} from '../services/almacenServices';

export const fetchAllAlmacenes = createAsyncThunk(
  'almacenes/fetchAllAlmacenes',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchAllAlmacenesApi(); // Llama al servicio para obtener todos los almacenes
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Obtener todos los almacenes de una sucursal
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
    //fetch all almacenes
    .addCase(fetchAllAlmacenes.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchAllAlmacenes.fulfilled, (state, action) => {
      state.loading = false;
      state.almacenes = action.payload; // Almacena todos los almacenes obtenidos
      console.log("Todos los almacenes cargados:", state.almacenes);
    })
    .addCase(fetchAllAlmacenes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
      // Fetch almacenes
      .addCase(fetchAlmacenes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAlmacenes.fulfilled, (state, action) => {
        state.loading = false;
        state.almacenes = action.payload;
        console.log("estado de almacenes", state.almacenes)
      })
      .addCase(fetchAlmacenes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch almacén
      .addCase(fetchAlmacen.fulfilled, (state, action) => {
        state.almacen = action.payload;
        state.loading = false;
      })

      // Add almacén
      .addCase(addAlmacen.fulfilled, (state, action) => {
        state.almacenes.push(action.payload);
      })

      // Update almacén
      .addCase(updateAlmacen.fulfilled, (state, action) => {
        const index = state.almacenes.findIndex(almacen => almacen.id === action.payload.id);
        if (index !== -1) {
          state.almacenes[index] = action.payload;
        }
      })

      // Delete almacén (desactivar)
      .addCase(deleteAlmacen.fulfilled, (state, action) => {
        state.almacenes = state.almacenes.filter(almacen => almacen.id !== action.payload.idAlmacen);
      })

      .addCase(deleteAlmacen.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default almacenSlice.reducer;