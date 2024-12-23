import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const UpdateCart = createAsyncThunk('updatecart', async (data, { rejectWithValue }) => {
    try {
        const res = await axios.patch(`${import.meta.env.VITE_API}/api/cart/updatecart/${data.id}`, {
            quantity: data.quantity
        },{
            withCredentials: true
        })
        return res.data;
    }
    catch (error) {
        return rejectWithValue(error);
    }
})

const UpdateCartSlice = createSlice({
    name: "updatecart",
    initialState: {
        data: null,
        err: null,
        loading: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(UpdateCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(UpdateCart.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(UpdateCart.rejected, (state, action) => {
                state.loading = false;
                state.err = action.payload;
            })
    }
})

export default UpdateCartSlice.reducer