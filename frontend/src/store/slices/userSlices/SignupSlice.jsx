import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import axios from 'axios'

export const SignUp = createAsyncThunk("signup", async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API}/api/auth/signup`, data)
        return response.data;
    } catch (error) {
        return rejectWithValue(error)
    }
})

const SingupSlice = createSlice({
    name: "signup",
    initialState: {
        data: null,
        err: null,
        loader: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(SignUp.pending, (state) => {
                state.loader = true;
            })
            .addCase(SignUp.fulfilled, (state, action) => {
                state.loader = false;
                toast.success(action.payload.message);
                state.data = action.payload;
            })
            .addCase(SignUp.rejected, (state, action) => {
                state.loader = false;
                toast.error(action.payload.response.data.message);
                state.err = action.payload
            })
    }
});

export default SingupSlice.reducer;