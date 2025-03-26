import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const DeleteOrder = createAsyncThunk("deleteorder", async (id, { rejectWithValue }) => {
    try {
        const res = await axios.delete(`${import.meta.env.VITE_API}/api/admin/deleteorder/${id}`, {
            withCredentials: true
        });
        return res.data
    } catch (error) {
        return rejectWithValue(error)
    }
});

const DeleteOrderSlice = createSlice({
    name: "deleteorder",
    initialState: {
        Order: null,
        loader: false,
        err: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(DeleteOrder.fulfilled, (state, action) => {
                state.loader = false;
                state.Order = action.payload;
                toast.success(action.payload.message)
            })
            .addCase(DeleteOrder.pending, (state) => {
                state.loader = true;
            })
            .addCase(DeleteOrder.rejected, (state, action) => {
                state.loader = false;
                state.err = action.payload
            })
    }
})

export default DeleteOrderSlice.reducer