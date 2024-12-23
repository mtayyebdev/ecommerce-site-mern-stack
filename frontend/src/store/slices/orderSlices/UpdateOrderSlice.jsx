import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const UpdateOrder = createAsyncThunk('updateorder', async (data, { rejectWithValue }) => {
    try {
        const res = await axios.patch(`${import.meta.env.VITE_API}/api/auth/updateorder/${data.orderId}`, data, {
            withCredentials: true
        })
        return res.data;
    }
    catch (error) {
        return rejectWithValue(error);
    }
})

const UpdateOrderSlice = createSlice({
    name: 'updateorder',
    initialState: {
        data: null,
        err: null,
        loader: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(UpdateOrder.pending, (state) => {
                state.loader = true;
            })
            .addCase(UpdateOrder.fulfilled, (state, action) => {
                state.loader = false;
                state.data = action.payload;
            })
            .addCase(UpdateOrder.rejected, (state, action) => {
                state.loader = false;
                state.err = action.payload;
            })
    }
})

export default UpdateOrderSlice.reducer