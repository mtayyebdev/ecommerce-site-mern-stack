import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const DeleteContact = createAsyncThunk("deletecontact", async (id, { rejectWithValue }) => {
    try {
        const res = await axios.delete(`${import.meta.env.VITE_API}/api/admin/deletecontact/${id}`, {
            withCredentials: true
        });
        return res.data
    } catch (error) {
        return rejectWithValue(error)
    }
});

const DeleteContactSlice = createSlice({
    name: "deletecontact",
    initialState: {
        contact: null,
        loader: false,
        err: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(DeleteContact.fulfilled, (state, action) => {
                state.loader = false;
                state.contact = action.payload
                toast.success(action.payload.message)
            })
            .addCase(DeleteContact.pending, (state) => {
                state.loader = true;
            })
            .addCase(DeleteContact.rejected, (state, action) => {
                state.loader = false;
                state.err = action.payload
            })
    }
})

export default DeleteContactSlice.reducer