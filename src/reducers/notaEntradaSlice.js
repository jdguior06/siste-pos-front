import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchNotasEntradaApi,
  fetchNotaEntradaApi,
  fetchNotasByFechaApi,
  fetchNotasByProveedorApi,
  fetchNotasBySucursalAlmacenApi,
  crearNotaEntradaApi,
  eliminarNotaEntradaApi,
} from '../services/notaEntradaService';  // Importamos los servicios API

// Thunks para las acciones asíncronas
export const fetchNotasEntrada = createAsyncThunk('notasEntrada/fetchNotasEntrada', async (_, { rejectWithValue }) => {
  try {
    const data = await fetchNotasEntradaApi();
    return data;  // Asegúrate de que la respuesta esté en el formato esperado
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchNotaEntrada = createAsyncThunk('notasEntrada/fetchNotaEntrada', async (id, { rejectWithValue }) => {
  try {
    const data = await fetchNotaEntradaApi(id);
    return data;  // Asegúrate de que la respuesta esté en el formato esperado
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchNotasByProveedor = createAsyncThunk('notasEntrada/fetchNotasByProveedorApi', async (id, { rejectWithValue }) => {
  try {
    const data = await fetchNotasByProveedorApi(id);
    return data;  // Asegúrate de que la respuesta esté en el formato esperado
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchNotasByFecha = createAsyncThunk('notasEntrada/fetchNotasByFechaApi', async (fecha, { rejectWithValue }) => {
  try {
    const data = await fetchNotasByFechaApi(fecha);
    return data;  // Asegúrate de que la respuesta esté en el formato esperado
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchNotasBySucursalAlmacen = createAsyncThunk('notasEntrada/fetchNotasBySucursalAlmacenApi', async (idSucursal, idAlmacen, { rejectWithValue }) => {
  try {
    const data = await fetchNotasBySucursalAlmacenApi(idSucursal, idAlmacen);
    return data;  // Asegúrate de que la respuesta esté en el formato esperado
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const crearNotaEntrada = createAsyncThunk('notasEntrada/crearNotaEntrada', async (notaEntradaCompletoDto, { rejectWithValue }) => {
  try {
    const data = await crearNotaEntradaApi(notaEntradaCompletoDto);
    return data;  // Asegúrate de que la respuesta esté en el formato esperado
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const eliminarNotaEntrada = createAsyncThunk('notasEntrada/eliminarNotaEntrada', async (id, { rejectWithValue }) => {
  try {
    await eliminarNotaEntradaApi(id);
    return { id };  // Devolvemos el ID para eliminarlo del estado
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Slice de notas de entrada
const notaEntradaSlice = createSlice({
  name: 'notasEntrada',
  initialState: {
    notasEntrada: [],
    notaEntrada: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch notas de entrada
      .addCase(fetchNotasEntrada.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotasEntrada.fulfilled, (state, action) => {
        state.loading = false;
        state.notasEntrada = action.payload;
      })
      .addCase(fetchNotasEntrada.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch nota de entrada
      .addCase(fetchNotaEntrada.fulfilled, (state, action) => {
        state.notaEntrada = action.payload;
        state.loading = false;
      })
      
      // Fetch notas por proveedor
      .addCase(fetchNotasByProveedor.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotasByProveedor.fulfilled, (state, action) => {
        state.loading = false;
        state.notasEntrada = action.payload;
      })
      .addCase(fetchNotasByProveedor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch notas por fecha
      .addCase(fetchNotasByFecha.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotasByFecha.fulfilled, (state, action) => {
        state.loading = false;
        state.notasEntrada = action.payload;
      })
      .addCase(fetchNotasByFecha.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch notas por sucursal y almacén
      .addCase(fetchNotasBySucursalAlmacen.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotasBySucursalAlmacen.fulfilled, (state, action) => {
        state.loading = false;
        state.notasEntrada = action.payload;
      })
      .addCase(fetchNotasBySucursalAlmacen.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Crear nota de entrada
      .addCase(crearNotaEntrada.fulfilled, (state, action) => {
        state.notasEntrada.push(action.payload);
      })

      // Eliminar nota de entrada
      .addCase(eliminarNotaEntrada.fulfilled, (state, action) => {
        state.notasEntrada = state.notasEntrada.filter(nota => nota.id !== action.payload.id);
      })
      
      .addCase(eliminarNotaEntrada.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default notaEntradaSlice.reducer;
