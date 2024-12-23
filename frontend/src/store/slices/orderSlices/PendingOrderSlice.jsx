import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    orders: [],
    err: null,
    loading: false
}

const PendingOrderSlice = createSlice({
    name: "pendingOrder",
    initialState,
    reducers: {
        orderData: (state, action) => {
            state.orders.push(action.payload)
        },
        DeleteOrderData: (state, action) => {
            state.orders = state.orders.filter((item) => item._id !== action.payload)
            toast.success("Order Removed Successfully.")
        },
        ClearData: (state) => {
            state.orders = []
        }
    }
})

export const { orderData,DeleteOrderData,ClearData } = PendingOrderSlice.actions
export default PendingOrderSlice.reducer