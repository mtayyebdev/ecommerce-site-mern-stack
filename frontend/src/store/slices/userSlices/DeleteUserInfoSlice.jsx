import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const DeleteUerInfo = createAsyncThunk("deleteuserinfo", async (data, { rejectWithValue }) => {
    try {
        const res = await axios.delete(`${import.meta.env.API}/api/auth/deleteinfo`)
        return res.data;
    }
    catch (error) {
        return rejectWithValue(error);
    }
})

const DeleteUserInfoSlice = createSlice({
    name: "deleteuserinfo",
    initialState: {
        data: null,
        err: null,
        loader: false
    },
    extraReducers: (builder)=>{
        builder
        .addCase(DeleteUerInfo.pending, (state) => {
            state.loader = true;
        })
        .addCase(DeleteUerInfo.fulfilled, (state, action) => {
            state.loader = false;
            state.data = action.payload;
        })
        .addCase(DeleteUerInfo.rejected, (state, action) => {
            state.loader = false;
            state.err = action.payload
        })

    }
})

export default DeleteUserInfoSlice.reducer;