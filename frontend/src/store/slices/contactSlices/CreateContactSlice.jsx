import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'

export const CreateContact = createAsyncThunk("createcontact", async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_API}/api/contact/createcontact`, data, {
            withCredentials: true
        })
        return res.data;
    }
    catch (error) {
        return rejectWithValue(error);
    }
})

const CreateContactSlice = createSlice({
    name: "createcontact",
    initialState: {
        data: null,
        err: null,
        loader: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(CreateContact.pending, (state) => {
                state.loader = true;
            })
            .addCase(CreateContact.fulfilled, (state, action) => {
                state.loader = false;
                state.data = action.payload;
                toast.success(action.payload.message);
            })
            .addCase(CreateContact.rejected, (state, action) => {
                state.loader = false;
                state.err = action.payload
            })
    }
})

export default CreateContactSlice.reducer;