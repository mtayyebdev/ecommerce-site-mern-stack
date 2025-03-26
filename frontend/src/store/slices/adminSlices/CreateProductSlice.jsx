import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'

export const CreateProduct = createAsyncThunk("createproduct", async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_API}/api/admin/createproduct`, data, {
            withCredentials: true
        })
        return res.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

const CreateProductSlice = createSlice({
    name: "createproduct",
    initialState: {
        data: null,
        err: null,
        loading: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(CreateProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                toast.success(action.payload.message);
            })
            .addCase(CreateProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(CreateProduct.rejected, (state, action) => {
                state.loading = false;
                state.err = action.payload;
            })
    }
});

export default CreateProductSlice.reducer