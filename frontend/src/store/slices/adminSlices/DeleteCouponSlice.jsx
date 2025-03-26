import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const DeleteCoupon = createAsyncThunk("deletecoupon", async (id, { rejectWithValue }) => {
    try {
        const res = await axios.delete(`${import.meta.env.VITE_API}/api/admin/deletecoupon/${id}`, {
            withCredentials: true
        });
        return res.data
    } catch (error) {
        return rejectWithValue(error)
    }
});

const DeleteCouponSlice = createSlice({
    name: "deletecoupon",
    initialState: {
        Coupon: null,
        loader: false,
        err: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(DeleteCoupon.fulfilled, (state, action) => {
                state.loader = false;
                state.Coupon = action.payload
                toast.success(action.payload.message)
            })
            .addCase(DeleteCoupon.pending, (state) => {
                state.loader = true;
            })
            .addCase(DeleteCoupon.rejected, (state, action) => {
                state.loader = false;
                state.err = action.payload
            })
    }
})

export default DeleteCouponSlice.reducer