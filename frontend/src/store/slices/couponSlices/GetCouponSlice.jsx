import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'

export const GetCoupon = createAsyncThunk('coupon', async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_API}/api/coupon/getcoupon`, data)
        return res.data;
    }
    catch (error) {
        return rejectWithValue(error);
    }
})

const GetCouponSlice = createSlice({
    name: 'coupon',
    initialState: {
        coupon: null,
        err: null,
        loading: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetCoupon.pending, (state) => {
                state.loading = true;
            })
            .addCase(GetCoupon.fulfilled, (state, action) => {
                state.loading = false;
                state.coupon = action.payload.data;
                toast.success(action.payload.message)
            })
            .addCase(GetCoupon.rejected, (state, action) => {
                state.loading = false;
                state.err = action.payload;
                toast.error(action.payload.response.data.message)
            })
    }
})

export default GetCouponSlice.reducer;