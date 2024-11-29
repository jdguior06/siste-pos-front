import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchNotasEntradaApi,
  fetchNotaEntradaApi,
  crearNotaEntradaApi,
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

export const crearNotaEntrada = createAsyncThunk('notasEntrada/crearNotaEntrada', async (notaEntradaCompletoDto, { rejectWithValue }) => {
  try {
    const data = await crearNotaEntradaApi(notaEntradaCompletoDto);
    return data;  // Asegúrate de que la respuesta esté en el formato esperado
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

      // Crear nota de entrada
      .addCase(crearNotaEntrada.fulfilled, (state, action) => {
        state.notasEntrada.push(action.payload);
      })
  },
});

export default notaEntradaSlice.reducer;
