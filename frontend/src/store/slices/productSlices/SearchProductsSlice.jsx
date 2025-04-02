import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const SearchProducts = createAsyncThunk('searchproducts', async ({ query, datas }, { rejectWithValue }) => {    
    try {
        const res = await axios.post(`${import.meta.env.VITE_API}/api/product/search?s=${query}`, datas)
        return res.data;
    }
    catch (error) {
        return rejectWithValue(error);
    }
})

const SearchProductsSlice = createSlice({
    name: "searchproducts",
    initialState: {
        products: null,
        loading: false,
        err: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(SearchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(SearchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.data;
            })
            .addCase(SearchProducts.rejected, (state, action) => {
                state.loading = false;
                state.err = action.payload;
            })
    }
});

export default SearchProductsSlice.reducer