import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetProducts = createAsyncThunk('getproducts', async (data, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API}/api/product/getproducts`)
        return res.data;
    }
    catch (error) {
        return rejectWithValue(error);
    }
})

const GetProductsSlice = createSlice({
    name: "getproducts",
    initialState: {
        products: null,
        loading: false,
        err: null
    },
    extraReducers: (builder) => {
        builder
        .addCase(GetProducts.pending, (state) => {
            state.loading = true;
        })
        .addCase(GetProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        })
        .addCase(GetProducts.rejected, (state, action) => {
            state.loading = false;
            state.err = action.payload;
        })
    }
})

export default GetProductsSlice.reducer