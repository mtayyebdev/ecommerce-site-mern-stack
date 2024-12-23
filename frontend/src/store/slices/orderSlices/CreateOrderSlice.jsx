import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'

export const CreateOrder = createAsyncThunk("createorder", async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_API}/api/auth/createorder`, data,{
            withCredentials: true
        })
        return res.data;
    }
    catch (error) {
        return rejectWithValue(error);
    }
})

const CreateOrderSlice = createSlice({
    name: "createorder",
    initialState: {
        data: null,
        err: null,
        loader: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(CreateOrder.pending, (state) => {
                state.loader = true;
            })
            .addCase(CreateOrder.fulfilled, (state, action) => {
                state.loader = false;
                state.data = action.payload;
                toast.success(action.payload.message);

            })
            .addCase(CreateOrder.rejected, (state, action) => {
                state.loader = false;
                state.err = action.payload
                toast.error(action.payload.response.data.message);
            })
    }
})

export default CreateOrderSlice.reducer;