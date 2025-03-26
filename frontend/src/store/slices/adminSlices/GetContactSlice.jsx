import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetContacts = createAsyncThunk("getcontacts", async (data, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API}/api/admin/getcontacts`, {
            withCredentials: true
        });
        return res.data
    } catch (error) {
        return rejectWithValue(error)
    }
});

const GetContactsSlice = createSlice({
    name: "getcontacts",
    initialState: {
        contacts: null,
        loader: false,
        err: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetContacts.fulfilled, (state, action) => {
                state.loader = false;
                state.contacts = action.payload
            })
            .addCase(GetContacts.pending, (state) => {
                state.loader = true;
            })
            .addCase(GetContacts.rejected, (state, action) => {
                state.loader = false;
                state.err = action.payload
            })
    }
})

export default GetContactsSlice.reducer