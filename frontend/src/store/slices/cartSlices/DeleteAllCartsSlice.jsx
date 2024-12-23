import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'

export const DeleteAllCarts = createAsyncThunk("deleteallcarts", async (data, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_API}/api/cart/deletecarts`, { withCredentials: true })
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

const DeleteAllCartsSlice = createSlice({
    name: "deleteallcarts",
    initialState: {
        data: null,
        loading: false,
        err: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(DeleteAllCarts.pending, (state) => {
                state.loading = true
            })
            .addCase(DeleteAllCarts.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
                toast.success(action.payload.message)
            })
            .addCase(DeleteAllCarts.rejected, (state, action) => {
                state.loading = false;
                state.err = action.payload;
                toast.error(action.payload.response.data)
            })
    }
})

export default DeleteAllCartsSlice.reducer