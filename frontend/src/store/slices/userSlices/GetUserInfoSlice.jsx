import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const GetUserInfo = createAsyncThunk("getuserinfo", async (data, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API}/api/auth/getinfo`,{
            withCredentials: true
        })
        return res.data;
    } catch (error) {
        return rejectWithValue(error)
    }
})

const GetUserInfoSlice = createSlice({
    name: "getuserinfo",
    initialState: {
        data: null,
        err: null,
        loader: false
    },
    extraReducers: (builder) => {
        builder
        .addCase(GetUserInfo.pending, (state) => {
            state.loader = true;
        })
        .addCase(GetUserInfo.fulfilled, (state, action) => {
            state.loader = false;
            state.data = action.payload.data;
        })
        .addCase(GetUserInfo.rejected, (state, action) => {
            state.loader = false;
            state.err = action.payload;
        })
    }
})

export default GetUserInfoSlice.reducer;