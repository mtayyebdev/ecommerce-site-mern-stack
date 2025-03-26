import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify';

export const UpdatePassword = createAsyncThunk('updatepassword', async (data, { rejectWithValue }) => {
    try {
        const res = await axios.patch(`${import.meta.env.VITE_API}/api/auth/updatepassword`, data, {
            withCredentials: true
        })
        return res.data;
    }
    catch (error) {
        return rejectWithValue(error);
    }
})

const UpdatePasswordSlice = createSlice({
    name: 'updatepassword',
    initialState: {
        loading: false,
        data: null,
        err: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(UpdatePassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(UpdatePassword.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                toast.success(action.payload.message)
            })
            .addCase(UpdatePassword.rejected, (state, action) => {
                state.loading = false;
                state.err = action.payload;
                toast.error(action.payload.response.data.message)
            })
    }
})

export default UpdatePasswordSlice.reducer