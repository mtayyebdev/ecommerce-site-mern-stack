import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const GetCart = createAsyncThunk('getcart', async (data, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API}/api/cart/getcart`,{
            withCredentials: true
        })
        return res.data;
    }
    catch (error) {
        return rejectWithValue(error);
    }
})

const GetCartSlice = createSlice({
    name: "getcart",
    initialState: {
        cart: null,
        loading: false,
        err: null
    },
    extraReducers: (builder) => {
        builder
        .addCase(GetCart.pending, (state) => {
            state.loading = true;
        })
        .addCase(GetCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            
        })
        .addCase(GetCart.rejected, (state, action) => {
            state.loading = false;
            state.cart = null;
            state.err = action.payload;
            
        })
    }
})

export default GetCartSlice.reducer