import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'


export const UpdateUser = createAsyncThunk("updateuser", async (data, { rejectWithValue }) => {
    try {
        const response = await axios.patch(`${import.meta.env.API}/api/auth/updateuser`, data)
        return response.data;
    } catch (error) {
        return rejectWithValue(error)
    }
})

const UpdateUserSlice = createSlice({
    name: "updateuser",
    initialState: {
        data: null,
        err: null,
        loader: false
    },
    extraReducers:(builder)=>{
        builder
        .addCase(UpdateUser.pending, (state) => {
            state.loader = true;
        })
        .addCase(UpdateUser.fulfilled, (state, action) => {
            state.loader = false;
            state.data = action.payload;
        })
        .addCase(UpdateUser.rejected, (state, action) => {
            state.loader = false;
            state.err = action.payload;
        })
    }
});

export default UpdateUserSlice.reducer;