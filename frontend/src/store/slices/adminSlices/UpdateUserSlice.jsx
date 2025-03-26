import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'

export const UpdateUsers = createAsyncThunk("updateusers", async (data, { rejectWithValue }) => {
    try {
        const res = await axios.patch(`${import.meta.env.VITE_API}/api/admin/updateuser/${data.id}`, data, {
            withCredentials: true
        })
        return res.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

const UpdateUserSlice = createSlice({
    name: "updateusers",
    initialState: {
        data: null,
        err: null,
        loading: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(UpdateUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                toast.success(action.payload.message);
            })
            .addCase(UpdateUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(UpdateUsers.rejected, (state, action) => {
                state.loading = false;
                state.err = action.payload;
            })
    }
});

export default UpdateUserSlice.reducer