import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetSingleProduct = createAsyncThunk('getsingleproduct', async (id, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API}/api/product/getsingleproduct/${id}`)
        return res.data;
    }
    catch (error) {
        return rejectWithValue(error);
    }
})

const GetSingleProductSlice = createSlice({
    name: "getsingleproduct",
    initialState: {
        product: null,
        loading: false,
        err: null
    },
    extraReducers: (builder) => {
        builder
        .addCase(GetSingleProduct.pending, (state) => {
            state.loading = true;
        })
        .addCase(GetSingleProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload;
        })
        .addCase(GetSingleProduct.rejected, (state, action) => {
            state.loading = false;
            state.err = action.payload;
        })
    }
});

export default GetSingleProductSlice.reducer