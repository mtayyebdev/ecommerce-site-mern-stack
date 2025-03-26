import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const DeleteUser = createAsyncThunk("deleteuser", async (id, { rejectWithValue }) => {
    try {
        const res = await axios.delete(`${import.meta.env.VITE_API}/api/admin/deleteuser/${id}`, {
            withCredentials: true
        });
        return res.data
    } catch (error) {
        return rejectWithValue(error)
    }
});

const DeleteUserSlice = createSlice({
    name: "deleteuser",
    initialState: {
        user: null,
        loader: false,
        err: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(DeleteUser.fulfilled, (state, action) => {
                state.loader = false;
                state.user = action.payload;
                toast.success(action.payload.message);
            })
            .addCase(DeleteUser.pending, (state) => {
                state.loader = true;
            })
            .addCase(DeleteUser.rejected, (state, action) => {
                state.loader = false;
                state.err = action.payload
            })
    }
})

export default DeleteUserSlice.reducer