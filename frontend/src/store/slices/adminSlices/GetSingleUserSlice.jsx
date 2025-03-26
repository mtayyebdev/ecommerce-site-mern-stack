import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetSingleUser = createAsyncThunk("getsingleuser", async (id, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API}/api/admin/getuser/${id}`, {
            withCredentials: true
        });
        return res.data
    } catch (error) {
        return rejectWithValue(error)
    }
});

const GetSingleUserSlice = createSlice({
    name: "getsingleuser",
    initialState: {
        user: null,
        loader: false,
        err: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetSingleUser.fulfilled, (state, action) => {
                state.loader = false;
                state.user = action.payload
            })
            .addCase(GetSingleUser.pending, (state) => {
                state.loader = true;
            })
            .addCase(GetSingleUser.rejected, (state, action) => {
                state.loader = false;
                state.err = action.payload
            })
    }
})

export default GetSingleUserSlice.reducer