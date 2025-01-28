import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const CancelOrder = createAsyncThunk("cancelorder", async (id, { rejectWithValue }) => {
    try {
        const res = await axios.delete(`${import.meta.env.VITE_API}/api/auth/cancelorder/${id}`, {
            withCredentials: true
        })
        return res.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

const CancelOrderSlice = createSlice({
    name: "cancelorder",
    initialState: {
        err: null,
        loader: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(CancelOrder.pending, (state) => {
                state.loader = true;
            })
            .addCase(CancelOrder.fulfilled, (state, action) => {
                state.loader = false;
                toast.success(action.payload.message);
            })
            .addCase(CancelOrder.rejected, (state, action) => {
                state.loader = false;
                state.err = action.payload;
            })
    }
})

export default CancelOrderSlice.reducer