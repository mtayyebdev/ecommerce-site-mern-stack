import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'

export const CreateCoupon = createAsyncThunk("createcoupon", async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_API}/api/admin/createcoupon`, data, {
            withCredentials: true
        })
        return res.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

const CreateCouponSlice = createSlice({
    name: "createcoupon",
    initialState: {
        data: null,
        err: null,
        loading: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(CreateCoupon.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                toast.success(action.payload.message)
            })
            .addCase(CreateCoupon.pending, (state) => {
                state.loading = true;
            })
            .addCase(CreateCoupon.rejected, (state, action) => {
                state.loading = false;
                state.err = action.payload;
                toast.error(action.payload.response.data.message)
            })
    }
});

export default CreateCouponSlice.reducer