import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const CreateUserInfo = createAsyncThunk("createuserinfo", async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${import.meta.env.API}/api/auth/createinfo`,data)
        return res.data;
    }
    catch (error) {
        return rejectWithValue(error);
    }
})

const CreateUserInfoSlice = createSlice({
    name: "createuserinfo",
    initialState: {
        data: null,
        err: null,
        loader: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(CreateUserInfo.pending, (state) => {
            state.loader = true;        
            })
            .addCase(CreateUserInfo.fulfilled, (state, action) => {
                state.loader = false;
                state.data = action.payload;
            })
            .addCase(CreateUserInfo.rejected, (state, action) => {
                state.loader = false;
                state.err = action.payload
            })
    }
})

export default CreateUserInfoSlice.reducer;