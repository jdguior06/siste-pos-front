// productoAlmacenSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    fetchProductosAlmacenApi,
    fetchProductoAlmacenApi,
} from '../services/productAlmacenService';

// Thunk para obtener todos los productos en un almacén específico
export const fetchProductosAlmacen = createAsyncThunk(
    'productoAlmacen/fetchProductosAlmacen',
    async (idAlmacen, { rejectWithValue }) => {
        try {
            const data = await fetchProductosAlmacenApi(idAlmacen);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Thunk para obtener un producto específico en el almacén por su ID
export const fetchProductoAlmacen = createAsyncThunk(
    'productoAlmacen/fetchProductoAlmacen',
    async (id, { rejectWithValue }) => {
        try {
            const data = await fetchProductoAlmacenApi(id);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Slice de ProductoAlmacen
const productoAlmacenSlice = createSlice({
    name: 'productoAlmacen',
    initialState: {
        productosAlmacen: [],
        productoAlmacen: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductosAlmacen.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProductosAlmacen.fulfilled, (state, action) => {
                state.loading = false;
                state.productosAlmacen = action.payload;
            })
            .addCase(fetchProductosAlmacen.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchProductoAlmacen.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProductoAlmacen.fulfilled, (state, action) => {
                state.loading = false;
                state.productoAlmacen = action.payload;
            })
            .addCase(fetchProductoAlmacen.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default productoAlmacenSlice.reducer;
