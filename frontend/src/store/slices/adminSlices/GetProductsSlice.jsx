import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetProducts = createAsyncThunk("getproducts", async (data, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API}/api/admin/getproducts`, {
            withCredentials: true
        });
        return res.data
    } catch (error) {
        return rejectWithValue(error)
    }
});

const GetProductsSlice = createSlice({
    name: "getproducts",
    initialState: {
        products: null,
        loader: false,
        err: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetProducts.fulfilled, (state, action) => {
                state.loader = false;
                state.products = action.payload
            })
            .addCase(GetProducts.pending, (state) => {
                state.loader = true;
            })
            .addCase(GetProducts.rejected, (state, action) => {
                state.loader = false;
                state.err = action.payload
            })
    }
})

export default GetProductsSlice.reducer