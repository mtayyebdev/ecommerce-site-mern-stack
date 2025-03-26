import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetProductsReviews = createAsyncThunk('getproductsreviews', async (id, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API}/api/product/getreviews/${id}`, {
            withCredentials: true
        })
        return res.data;
    }
    catch (error) {
        return rejectWithValue(error);
    }
})

const GetProductsReviewsSlice = createSlice({
    name: "getproductsreviews",
    initialState: {
        reviews: null,
        loading: false,
        err: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetProductsReviews.pending, (state) => {
                state.loading = true;
            })
            .addCase(GetProductsReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload.data;
            })
            .addCase(GetProductsReviews.rejected, (state, action) => {
                state.loading = false;
                state.err = action.payload;
            })
    }
})

export default GetProductsReviewsSlice.reducer