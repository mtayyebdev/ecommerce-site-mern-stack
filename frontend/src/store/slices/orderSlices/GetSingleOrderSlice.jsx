import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const GetSingleOrder = createAsyncThunk("getsingleorder", async (id, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API}/api/auth/getorder/${id}`, {
            withCredentials: true,
        })
        return res.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

const GetSignleOrderSlice = createSlice({
    name: "getsingleorder",
    initialState: {
        order: null,
        loader: false,
        err: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetSingleOrder.pending, (state) => {
                state.loader = true
            })
            .addCase(GetSingleOrder.fulfilled, (state, action) => {
                state.loader = false;
                state.order = action.payload;
            })
            .addCase(GetSingleOrder.rejected, (state,action) => {
                state.loader = false;
                state.err = action.payload;
            })
    }
})

export default GetSignleOrderSlice.reducer