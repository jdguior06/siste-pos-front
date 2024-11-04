import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchUsuariosApi,
  fetchUsuarioApi,
  addUsuarioApi,
  updateUsuarioApi,
  deactivateUsuarioApi,
  activateUsuarioApi,
} from '../services/usuarioServices';

// Thunks para acciones asíncronas
export const fetchUsuarios = createAsyncThunk('usuarios/fetchUsuarios', async (searchTerm = "", { rejectWithValue }) => {
  try {
    const data = await fetchUsuariosApi(searchTerm);
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchUsuario = createAsyncThunk('usuarios/fetchUsuario', async (id, { rejectWithValue }) => {
  try {
    const data = await fetchUsuarioApi(id);
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const addUsuario = createAsyncThunk('usuarios/addUsuario', async (usuario, { rejectWithValue }) => {
  try {
    const data = await addUsuarioApi(usuario);
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateUsuario = createAsyncThunk('usuarios/updateUsuario', async ({ id, usuario }, { rejectWithValue }) => {
  try {
    const data = await updateUsuarioApi(id, usuario);
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deactivateUsuario = createAsyncThunk('usuarios/deactivateUsuario', async (id, { rejectWithValue }) => {
  try {
    await deactivateUsuarioApi(id);
    return id;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const activateUsuario = createAsyncThunk('usuarios/activateUsuario', async (id, { rejectWithValue }) => {
  try {
    await activateUsuarioApi(id);
    return id;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Slice de usuario
const usuarioSlice = createSlice({
  name: 'usuarios',
  initialState: {
    usuarios: [],
    usuario: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Usuarios
      .addCase(fetchUsuarios.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsuarios.fulfilled, (state, action) => {
        state.loading = false;
        state.usuarios = action.payload;
      })
      .addCase(fetchUsuarios.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Usuario
      .addCase(fetchUsuario.fulfilled, (state, action) => {
        state.usuario = action.payload;
        state.loading = false;
      })

      // Add Usuario
      .addCase(addUsuario.fulfilled, (state, action) => {
        state.usuarios.push(action.payload);
      })

      // Update Usuario
      .addCase(updateUsuario.fulfilled, (state, action) => {
        const index = state.usuarios.findIndex(usuario => usuario.id === action.payload.id);
        if (index !== -1) {
          state.usuarios[index] = action.payload;
        }
      })

      // Deactivate Usuario
      .addCase(deactivateUsuario.fulfilled, (state, action) => {
        state.usuarios = state.usuarios.map(usuario => 
          usuario.id === action.payload ? { ...usuario, activo: false } : usuario
        );
      })

      // Activate Usuario
      .addCase(activateUsuario.fulfilled, (state, action) => {
        state.usuarios = state.usuarios.map(usuario => 
          usuario.id === action.payload ? { ...usuario, activo: true } : usuario
        );
      })

      // Manejar errores en cualquier acción
      .addCase(deactivateUsuario.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(activateUsuario.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default usuarioSlice.reducer;
