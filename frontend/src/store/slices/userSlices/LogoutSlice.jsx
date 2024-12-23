import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'

export const Logout = createAsyncThunk("logout", async (data, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API}/api/auth/logout`, {
            withCredentials: true
        })
        return res.data;
    }
    catch (error) {
        return rejectWithValue(error);
    }
})

const LogoutSlice = createSlice({
    name: "logout",
    initialState: {
        user: null,
        err: null,
        loader: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(Logout.pending, (state) => {
                state.loader = true
            })
            .addCase(Logout.fulfilled, (state, action) => {
                state.user = action.payload;
                toast.success(action.payload.message);
                state.loader = false;
            })
            .addCase(Logout.rejected, (state, action) => {
                state.loader = false;
                toast.error(action.payload.response.data.message);
                state.err = action.payload
            })
    }
})

export default LogoutSlice.reducer;