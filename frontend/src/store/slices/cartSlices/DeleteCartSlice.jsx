import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {toast} from 'react-toastify'


export const DeleteCart = createAsyncThunk('deletecart', async (id, { rejectWithValue }) => {
    try {
        const res = await axios.delete(`${import.meta.env.VITE_API}/api/cart/deletecart/${id}`,{
            withCredentials: true
        })
        return res.data;
    }
    catch (error) {
        return rejectWithValue(error);
    }
})

const DeleteCartSlice = createSlice({
    name: "deletecart",
    initialState: {
        data: null,
        err: null,
        loading: false
    },
    extraReducers: (builder) => {
        builder
        .addCase(DeleteCart.pending, (state) => {
            state.loading = true;
        })
        .addCase(DeleteCart.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            toast.success(action.payload.message)
        })
        .addCase(DeleteCart.rejected, (state, action) => {
            state.loading = false;
            state.err = action.payload;
            toast.error(action.payload.response.data.message)
        })
    }
})

export default DeleteCartSlice.reducer;