import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchCategoriasApi,
  fetchCategoriaApi,
  addCategoriaApi,
  updateCategoriaApi,
  deleteCategoriaApi,
} from '../services/categoriaServices';

// Thunks para acciones asíncronas
export const fetchCategorias = createAsyncThunk('categorias/fetchCategorias', async (_, { rejectWithValue }) => {
  try {
    const data = await fetchCategoriasApi();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchCategoria = createAsyncThunk('categorias/fetchCategoria', async (id, { rejectWithValue }) => {
  try {
    const data = await fetchCategoriaApi(id);
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const addCategoria = createAsyncThunk('categorias/addCategoria', async (categoria, { rejectWithValue }) => {
  try {
    const data = await addCategoriaApi(categoria);
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateCategoria = createAsyncThunk('categorias/updateCategoria', async ({ id, categoria }, { rejectWithValue }) => {
  try {
    const data = await updateCategoriaApi(id, categoria);
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteCategoria = createAsyncThunk('categorias/deleteCategoria', async (id, { rejectWithValue }) => {
  try {
    const data = await deleteCategoriaApi(id);
    return { id };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Slice de categoría
const categoriaSlice = createSlice({
  name: 'categorias',
  initialState: {
    categorias: [],
    categoria: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Categorias
      .addCase(fetchCategorias.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategorias.fulfilled, (state, action) => {
        state.loading = false;
        state.categorias = action.payload;
      })
      .addCase(fetchCategorias.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Categoria
      .addCase(fetchCategoria.fulfilled, (state, action) => {
        state.categoria = action.payload;
        state.loading = false;
      })

      // Add Categoria
      .addCase(addCategoria.fulfilled, (state, action) => {
        state.categorias.push(action.payload);
      })

      // Update Categoria
      .addCase(updateCategoria.fulfilled, (state, action) => {
        const index = state.categorias.findIndex(categoria => categoria.id === action.payload.id);
        if (index !== -1) {
          state.categorias[index] = action.payload;
        }
      })

      // Delete Categoria
      .addCase(deleteCategoria.fulfilled, (state, action) => {
        state.categorias = state.categorias.filter(categoria => categoria.id !== action.payload.id);
      })

      .addCase(deleteCategoria.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default categoriaSlice.reducer;
