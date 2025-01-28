import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for updating shipping info
export const updateInfoShipping = createAsyncThunk(
    'updateinfoshipping',
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.patch(`${import.meta.env.VITE_API}/api/auth/updateinfoshipping/${id}`,id,{
                withCredentials: true,
            })
            return res.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const updateInfoShippingSlice = createSlice({
    name: 'updateinfoshipping',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateInfoShipping.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateInfoShipping.fulfilled, (state, action) => {
                state.loading = false;
                state.shippingInfo = action.payload;
            })
            .addCase(updateInfoShipping.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default updateInfoShippingSlice.reducer;