import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchDetallesNotaApi,
  fetchDetalleNotaApi,
  crearDetalleNotaApi,
  eliminarDetalleNotaApi,
} from '../services/detalleNotaService';  // Importamos los servicios API

// Thunks para las acciones asíncronas
export const fetchDetallesNota = createAsyncThunk('detallesNota/fetchDetallesNota', async (idNota, { rejectWithValue }) => {
  try {
    const data = await fetchDetallesNotaApi(idNota);
    return data;  // Asegúrate de que la respuesta esté en el formato esperado
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchDetalleNota = createAsyncThunk('detallesNota/fetchDetalleNota', async (id, { rejectWithValue }) => {
  try {
    const data = await fetchDetalleNotaApi(id);
    return data;  // Asegúrate de que la respuesta esté en el formato esperado
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const crearDetalleNota = createAsyncThunk('detallesNota/crearDetalleNota', async ({ detalleNotaDto, idNota }, { rejectWithValue }) => {
  try {
    const data = await crearDetalleNotaApi(detalleNotaDto, idNota);
    return data;  // Asegúrate de que la respuesta esté en el formato esperado
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const eliminarDetalleNota = createAsyncThunk('detallesNota/eliminarDetalleNota', async (id, { rejectWithValue }) => {
  try {
    await eliminarDetalleNotaApi(id);
    return { id };  // Devolvemos el ID para eliminarlo del estado
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Slice de detalles de nota
const detalleNotaSlice = createSlice({
  name: 'detallesNota',
  initialState: {
    detallesNota: [],
    detalleNota: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch detalles de nota
      .addCase(fetchDetallesNota.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDetallesNota.fulfilled, (state, action) => {
        state.loading = false;
        state.detallesNota = action.payload;
      })
      .addCase(fetchDetallesNota.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch detalle de nota
      .addCase(fetchDetalleNota.fulfilled, (state, action) => {
        state.detalleNota = action.payload;
        state.loading = false;
      })

      // Crear detalle de nota
      .addCase(crearDetalleNota.fulfilled, (state, action) => {
        state.detallesNota.push(action.payload);
      })

      // Eliminar detalle de nota
      .addCase(eliminarDetalleNota.fulfilled, (state, action) => {
        state.detallesNota = state.detallesNota.filter(detalle => detalle.id !== action.payload.id);
      })
      
      .addCase(eliminarDetalleNota.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default detalleNotaSlice.reducer;
