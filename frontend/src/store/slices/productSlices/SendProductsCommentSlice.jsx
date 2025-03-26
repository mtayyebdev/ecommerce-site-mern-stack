import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify';

export const SendProductsComment = createAsyncThunk('sendproductscomment', async ({ id, data }, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_API}/api/product/send-comment/${id}`, data, {
            withCredentials: true
        })
        return res.data;
    }
    catch (error) {
        return rejectWithValue(error);
    }
})

const SendProductsCommentSlice = createSlice({
    name: "sendproductscomment",
    initialState: {
        comment: null,
        loading: false,
        err: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(SendProductsComment.pending, (state) => {
                state.loading = true;
            })
            .addCase(SendProductsComment.fulfilled, (state, action) => {
                state.loading = false;
                state.comment = action.payload;
                toast.success(action.payload.message)
            })
            .addCase(SendProductsComment.rejected, (state, action) => {
                state.loading = false;
                state.err = action.payload;
            })
    }
});

export default SendProductsCommentSlice.reducer