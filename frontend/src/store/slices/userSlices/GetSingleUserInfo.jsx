import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetSingleInfo = createAsyncThunk("getsingleinfo", async (id, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API}/api/auth/getsingleinfo/${id}`, {
            withCredentials: true
        })
        return res.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

const GetSingleInfoSlice = createSlice({
    name: "getsingleinfo",
    initialState: {
        data: null,
        loader: false,
        err: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetSingleInfo.pending, (state) => {
                state.loader = true;
            })
            .addCase(GetSingleInfo.fulfilled, (state, action) => {
                state.loader = false;
                state.data = action.payload.data;
                
            })
            .addCase(GetSingleInfo.rejected, (state, action) => {
                state.loader = false;
                state.err = action.payload
            })
    }
})


export default GetSingleInfoSlice.reducer;