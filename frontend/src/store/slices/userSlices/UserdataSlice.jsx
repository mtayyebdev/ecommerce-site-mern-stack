import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const UserData = createAsyncThunk("userdata", async (data, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API}/api/auth/getuser`, {
            withCredentials: true
        })
        return response.data;
    }
    catch (error) {
        return rejectWithValue(error)
    }
})

const UserdataSlice = createSlice({
    name: "userdata",
    initialState: {
        user: null,
        err: null,
        loader: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(UserData.pending, (state) => {
                state.loader = true;
            })
            .addCase(UserData.fulfilled, (state, action) => {
                state.loader = false;
                state.user = action.payload;
            })
            .addCase(UserData.rejected, (state, action) => {
                state.loader = false;
                state.user = null;
                state.err = action.payload
            })
    }
})

export default UserdataSlice.reducer