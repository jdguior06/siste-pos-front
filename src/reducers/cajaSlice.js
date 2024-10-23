import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCajasApi,fetchCajaApi, addCajaApi, updateCajaApi, deleteCajaApi } from '../services/cajaServices';  // Importamos los servicios

export const fetchCajas = createAsyncThunk('cajas/fetchCajas', async (_, { rejectWithValue }) => {
    try {
        const response = await fetchCajasApi();  
        return response;  
    } catch (error) {
        return rejectWithValue(error.message);  
    }
});


export const fetchCaja = createAsyncThunk('cajas/fetchCaja', async (id, { rejectWithValue }) => {
    try {
      const response = await fetchCajaApi(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  });
  


export const addCaja = createAsyncThunk('cajas/addCaja', async (caja, { rejectWithValue }) => {
    try {
        const response = await addCajaApi(caja);  
        return response;  
    } catch (error) {
        return rejectWithValue(error.message);  
    }
});

export const updateCaja = createAsyncThunk('cajas/updateCaja', async ({ id, caja }, { rejectWithValue }) => {
    try {
        const response = await updateCajaApi(id,caja);  
        return response;  
    } catch (error) {
        return rejectWithValue(error.message);  
    }
});



export const deleteCaja = createAsyncThunk('cajas/deleteCaja', async (id, { rejectWithValue }) => {
    try {
        const response = await deleteCajaApi(id);  
        return { id };  
    } catch (error) {
        return rejectWithValue(error.message);  
    }
});


  

const cajaSlice = createSlice({
    name: 'cajas',
    initialState: {
        cajas: [],
        caja: null,
        loading: false,
        error:null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCajas.pending, (state) => {
                //state.status = 'loading';
                state.loading = true;   
            })
            .addCase(fetchCajas.fulfilled, (state, action) => {
               //state.status = 'succeeded';
                //state.items = action.payload;
                state.loading = false;
                state.cajas = action.payload;
            })
            .addCase(fetchCajas.rejected, (state, action) => {
               // state.status = 'failed';
               // state.error = action.payload;
                state.loading = false;
                state.error = action.payload;
            })

            
            .addCase(fetchCaja.fulfilled, (state, action) => {
                // state.items.push(action.payload);
                state.caja=action.payload;
                state.loading = false;
             })


            .addCase(addCaja.fulfilled, (state, action) => {
                //state.items.push(action.payload);
                state.cajas.push(action.payload);
            })
           
            .addCase(updateCaja.fulfilled, (state, action) => {
                const index = state.cajas.findIndex(caja => caja.id === action.payload.id);
                if (index !== -1) {
                    state.cajas[index] = action.payload;
                }
            })

            .addCase(deleteCaja.fulfilled, (state, action) => {
                state.cajas = state.cajas.filter(caja=> caja.id !== action.payload.id);
            })

            .addCase(deleteCaja.rejected, (state, action) => {
                state.error =  action.payload;
            });

           
    }
});

export default cajaSlice.reducer;