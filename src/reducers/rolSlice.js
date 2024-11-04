import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchRolesApi,
  fetchRolApi,
  addRolApi,
  updateRolApi,
  deleteRolApi,
} from '../services/rolServices';

// Thunks para acciones asíncronas
export const fetchRoles = createAsyncThunk('roles/fetchRoles', async (_, { rejectWithValue }) => {
  try {
    const data = await fetchRolesApi();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchRol = createAsyncThunk('roles/fetchRol', async (id, { rejectWithValue }) => {
  try {
    const data = await fetchRolApi(id);
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const addRol = createAsyncThunk('roles/addRol', async (rol, { rejectWithValue }) => {
  try {
    const data = await addRolApi(rol);
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateRol = createAsyncThunk('roles/updateRol', async ({ id, rol }, { rejectWithValue }) => {
  try {
    const data = await updateRolApi(id, rol);
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteRol = createAsyncThunk('roles/deleteRol', async (id, { rejectWithValue }) => {
  try {
    await deleteRolApi(id);
    return { id };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Slice de rol
const rolSlice = createSlice({
  name: 'roles',
  initialState: {
    roles: [],
    rol: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Roles
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Rol
      .addCase(fetchRol.fulfilled, (state, action) => {
        state.rol = action.payload;
        state.loading = false;
      })

      // Add Rol
      .addCase(addRol.fulfilled, (state, action) => {
        state.roles.push(action.payload);
      })

      // Update Rol
      .addCase(updateRol.fulfilled, (state, action) => {
        const index = state.roles.findIndex(rol => rol.id === action.payload.id);
        if (index !== -1) {
          state.roles[index] = action.payload;
        }
      })

      // Delete Rol
      .addCase(deleteRol.fulfilled, (state, action) => {
        state.roles = state.roles.filter(rol => rol.id !== action.payload.id);
      })

      .addCase(deleteRol.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default rolSlice.reducer;
