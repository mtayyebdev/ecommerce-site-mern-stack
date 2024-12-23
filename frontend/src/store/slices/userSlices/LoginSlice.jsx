import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'

export const LogIn = createAsyncThunk("login", async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API}/api/auth/login`, data, {
            withCredentials: true
        })
        return response.data;
    } catch (error) {
        return rejectWithValue(error)
    }
})

const LoginSlice = createSlice({
    name: "login",
    initialState: {
        data: null,
        err: null,
        loader: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(LogIn.pending, (state) => {
                state.loader = true;
            })
            .addCase(LogIn.fulfilled, (state, action) => {
                state.loader = false;
                toast.success(action.payload.message);
                state.data = action.payload;
            })
            .addCase(LogIn.rejected, (state, action) => {
                state.loader = false;
                toast.error(action.payload.response.data.message);
                state.err = action.payload
            })
    }
});

export default LoginSlice.reducer;