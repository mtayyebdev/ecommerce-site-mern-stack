import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from 'react-toastify'

export const DeleteProduct = createAsyncThunk("deleteproduct", async (id, { rejectWithValue }) => {
    try {
        const res = await axios.delete(`${import.meta.env.VITE_API}/api/admin/deleteproduct/${id}`, {
            withCredentials: true
        });
        return res.data
    } catch (error) {
        return rejectWithValue(error)
    }
});

const DeleteProductSlice = createSlice({
    name: "deleteproduct",
    initialState: {
        product: null,
        loader: false,
        err: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(DeleteProduct.fulfilled, (state, action) => {
                state.loader = false;
                state.product = action.payload;
                toast.success(action.payload.message)
            })
            .addCase(DeleteProduct.pending, (state) => {
                state.loader = true;
            })
            .addCase(DeleteProduct.rejected, (state, action) => {
                state.loader = false;
                state.err = action.payload
            })
    }
})

export default DeleteProductSlice.reducer