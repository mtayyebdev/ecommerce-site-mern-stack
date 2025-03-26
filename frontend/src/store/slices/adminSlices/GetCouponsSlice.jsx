import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetCoupons = createAsyncThunk("getcoupons", async (data, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API}/api/admin/getcoupons`, {
            withCredentials: true
        });
        return res.data
    } catch (error) {
        return rejectWithValue(error)
    }
});

const GetCouponsSlice = createSlice({
    name: "getcoupons",
    initialState: {
        coupons: null,
        loader: false,
        err: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetCoupons.fulfilled, (state, action) => {
                state.loader = false;
                state.coupons = action.payload
            })
            .addCase(GetCoupons.pending, (state) => {
                state.loader = true;
            })
            .addCase(GetCoupons.rejected, (state, action) => {
                state.loader = false;
                state.err = action.payload
            })
    }
})

export default GetCouponsSlice.reducer