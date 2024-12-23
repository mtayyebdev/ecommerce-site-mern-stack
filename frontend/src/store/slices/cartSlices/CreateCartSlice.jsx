import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import {toast} from 'react-toastify'

export const CreateCart = createAsyncThunk('createcart', async ({ quantity, id }, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_API}/api/cart/createcart/${id}`, {
            quantity
        }, {
            withCredentials: true
        })
        return res.data;
    }
    catch (error) {
        return rejectWithValue(error);
    }
})

const CreateCartSlice = createSlice({
    name: "createcart",
    initialState: {
        cart: null,
        loading: false,
        err: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(CreateCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(CreateCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                toast.success(action.payload.message)

            })
            .addCase(CreateCart.rejected, (state, action) => {
                state.loading = false;
                state.err = action.payload;
                toast.error(action.payload.response.data.message)
            })
    }
})

export default CreateCartSlice.reducer;