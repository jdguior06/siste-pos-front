import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchClientesApi, addClienteApi, updateClienteApi, deleteClienteApi } from '../services/clienteServices';  // Importamos los servicios

export const fetchClientes = createAsyncThunk('clientes/fetchClientes', async (_, { rejectWithValue }) => {
  try {
    const data = await fetchClientesApi();  
    return data;  
  } catch (error) {
    return rejectWithValue(error.message);  
  }
});

export const addCliente = createAsyncThunk('clientes/addCliente', async (cliente, { rejectWithValue }) => {
  try {
    const data = await addClienteApi(cliente);  
    return data;  
  } catch (error) {
    return rejectWithValue(error.message);  
  }
});

export const updateCliente = createAsyncThunk('clientes/updateCliente', async (cliente, { rejectWithValue }) => {
  try {
    const data = await updateClienteApi(cliente);  
    return data;  
  } catch (error) {
    return rejectWithValue(error.message);  
  }
});

export const deleteCliente = createAsyncThunk('clientes/deleteCliente', async (id, { rejectWithValue }) => {
  try {
    const data = await deleteClienteApi(id);  // Llamamos al servicio de eliminación
    return { id };  // Devolvemos los datos al fulfilled
  } catch (error) {
    return rejectWithValue(error.message);  // En caso de error, rechazamos con un mensaje
  }
});


const clienteSlice = createSlice({
  name: 'clientes',
  initialState: {
    clientes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch clientes
      .addCase(fetchClientes.pending, (state) => {
        state.loading = true;
        state.error = null;  // Resetear errores anteriores
      })
      .addCase(fetchClientes.fulfilled, (state, action) => {
        state.loading = false;
        state.clientes = action.payload;  // Asignamos la lista de clientes (data)
      })
      .addCase(fetchClientes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;  // Mostramos el mensaje de error
      })

      // Add cliente
      .addCase(addCliente.fulfilled, (state, action) => {
        state.clientes.push(action.payload);  // Agregamos el cliente recién creado
      })

      // Update cliente
      .addCase(updateCliente.fulfilled, (state, action) => {
        const index = state.clientes.findIndex(cliente => cliente.id === action.payload.id);
        if (index !== -1) {
          state.clientes[index] = action.payload;  // Actualizamos el cliente modificado
        }
      })

      .addCase(deleteCliente.fulfilled, (state, action) => {
        state.clientes = state.clientes.filter(cliente => cliente.id !== action.payload.id);  // Eliminamos el cliente del estado
      })
      .addCase(deleteCliente.rejected, (state, action) => {
        state.error = action.payload;  // Guardamos el error en caso de fallo
      });
  },
});

export default clienteSlice.reducer;
