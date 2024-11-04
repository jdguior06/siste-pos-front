import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchPermisosApi,
} from '../services/permisoServices';

export const fetchPermisos = createAsyncThunk('permisos/fetchPermisos', async (_, { rejectWithValue }) => {
  try {
    const data = await fetchPermisosApi();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const permisoSlice = createSlice({
  name: 'permisos',
  initialState: {
    permisos: [],
    permiso: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch permisos
      .addCase(fetchPermisos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPermisos.fulfilled, (state, action) => {
        state.loading = false;
        state.permisos = action.payload;
      })
      .addCase(fetchPermisos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default permisoSlice.reducer;
