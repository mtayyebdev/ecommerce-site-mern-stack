import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'

export const UpdateOrderStatus = createAsyncThunk("updateorderstatus", async (data, { rejectWithValue }) => {
    try {
        const res = await axios.patch(`${import.meta.env.VITE_API}/api/admin/updateorderstatus/${data.id}`, data, {
            withCredentials: true
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error)
    }
});

const UpdateOrderStatusSlice = createSlice({
    name: "updateorderstatus",
    initialState: {
        order: null,
        loader: false,
        err: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(UpdateOrderStatus.pending, (state) => {
                state.loader = true;
            })
            .addCase(UpdateOrderStatus.fulfilled, (state, action) => {
                state.loader = false;
                state.order = action.payload;
                toast.success(action.payload.message)
            })
            .addCase(UpdateOrderStatus.rejected, (state, action) => {
                state.err = action.payload;
                state.loader = false;
            })
    }
});

export default UpdateOrderStatusSlice.reducer;