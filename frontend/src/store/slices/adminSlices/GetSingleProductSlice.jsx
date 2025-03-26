import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetSingleProduct = createAsyncThunk("getsingleproduct", async (id, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API}/api/admin/getproduct/${id}`, {
            withCredentials: true
        });
        return res.data
    } catch (error) {
        return rejectWithValue(error)
    }
});

const GetSingleProductSlice = createSlice({
    name: "getsingleproduct",
    initialState: {
        product: null,
        loader: false,
        err: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetSingleProduct.fulfilled, (state, action) => {
                state.loader = false;
                state.product = action.payload
            })
            .addCase(GetSingleProduct.pending, (state) => {
                state.loader = true;
            })
            .addCase(GetSingleProduct.rejected, (state, action) => {
                state.loader = false;
                state.err = action.payload
            })
    }
})

export default GetSingleProductSlice.reducer