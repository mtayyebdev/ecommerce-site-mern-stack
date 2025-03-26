import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetOrders = createAsyncThunk("getorders", async (data, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API}/api/admin/getorders`, {
            withCredentials: true
        });
        return res.data
    } catch (error) {
        return rejectWithValue(error)
    }
});

const GetOrdersSlice = createSlice({
    name: "getorders",
    initialState: {
        orders: null,
        loader: false,
        err: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetOrders.fulfilled, (state, action) => {
                state.loader = false;
                state.orders = action.payload
            })
            .addCase(GetOrders.pending, (state) => {
                state.loader = true;
            })
            .addCase(GetOrders.rejected, (state, action) => {
                state.loader = false;
                state.err = action.payload
            })
    }
})

export default GetOrdersSlice.reducer