import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetUsers = createAsyncThunk("getusers", async (data, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API}/api/admin/getusers`, {
            withCredentials: true
        });
        return res.data
    } catch (error) {
        return rejectWithValue(error)
    }
});

const GetUsersSlice = createSlice({
    name: "getusers",
    initialState: {
        users: null,
        loader: false,
        err: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetUsers.fulfilled, (state, action) => {
                state.loader = false;
                state.users = action.payload
            })
            .addCase(GetUsers.pending, (state) => {
                state.loader = true;
            })
            .addCase(GetUsers.rejected, (state, action) => {
                state.loader = false;
                state.err = action.payload
            })
    }
})

export default GetUsersSlice.reducer