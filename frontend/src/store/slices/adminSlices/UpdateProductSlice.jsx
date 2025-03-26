import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify';

export const UpdateProduct = createAsyncThunk("updateproduct", async (data, { rejectWithValue }) => {
    try {
        const res = await axios.patch(`${import.meta.env.VITE_API}/api/admin/updateproduct/${data.id}`, data.formData, {
            withCredentials: true
        })
        return res.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

const UpdateProductSlice = createSlice({
    name: "updateproduct",
    initialState: {
        data: null,
        err: null,
        loading: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(UpdateProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                toast.success(action.payload.message);

            })
            .addCase(UpdateProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(UpdateProduct.rejected, (state, action) => {
                state.loading = false;
                state.err = action.error;
            })
    }
});

export default UpdateProductSlice.reducer