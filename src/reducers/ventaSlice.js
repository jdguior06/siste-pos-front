import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { realizarVentaApi } from '../services/ventaService';

// Acción asíncrona para realizar una venta
export const realizarVenta = createAsyncThunk(
  'venta/realizarVenta',
  async (ventaData, { rejectWithValue }) => {
    try {
      const data = await realizarVentaApi(ventaData);
      return data;  // Esta será la respuesta enviada al fulfilled
    } catch (error) {
      // Rechaza el valor con un mensaje claro del error
      return rejectWithValue(error.message);
    }
  }
);

const ventaSlice = createSlice({
  name: 'venta',
  initialState: {
    ventas: [],      // Almacena las ventas realizadas
    ultimaVenta: null, // Almacena la última venta realizada
    error: null,     // Almacena el mensaje de error en caso de fallo
    loading: false,  // Indica si hay una operación en curso
  },
  reducers: {
    limpiarError: (state) => {
      state.error = null; // Limpia cualquier error almacenado
    },
    limpiarUltimaVenta: (state) => {
      state.ultimaVenta = null; // Limpia el estado de la última venta
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(realizarVenta.pending, (state) => {
        state.loading = true;   // Activa el estado de carga
        state.error = null;     // Limpia errores anteriores
        state.ultimaVenta = null; // Limpia la última venta para evitar confusión
      })
      .addCase(realizarVenta.fulfilled, (state, action) => {
        state.loading = false; // Finaliza el estado de carga
        state.ventas.push(action.payload); // Agrega la venta realizada al arreglo
        state.ultimaVenta = action.payload; // Almacena la última venta realizada
      })
      .addCase(realizarVenta.rejected, (state, action) => {
        state.loading = false; // Finaliza el estado de carga
        state.error = action.payload; // Almacena el mensaje de error
      });
  },
});

// Exporta los reducers para limpiar errores y última venta
export const { limpiarError, limpiarUltimaVenta } = ventaSlice.actions;
export default ventaSlice.reducer;
