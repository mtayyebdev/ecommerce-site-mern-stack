import { configureStore } from '@reduxjs/toolkit'

// user slices...............................
import UserDataSlice from './slices/userSlices/UserdataSlice.jsx'
import SignupSlice from './slices/userSlices/SignupSlice.jsx'
import LoginSlice from './slices/userSlices/LoginSlice.jsx'
import LogoutSlice from './slices/userSlices/LogoutSlice.jsx'
import CreateUserInfoSlice from './slices/userSlices/CreateUserInfoSlice.jsx'
import DeleteUserInfoSlice from './slices/userSlices/DeleteUserInfoSlice.jsx'
import GetUserInfoSlice from './slices/userSlices/GetUserInfoSlice.jsx'
import UpdateUserSlice from './slices/userSlices/UpdateUserSlice.jsx'
import UpdateUserInfoSlice from './slices/userSlices/UpdateUserInfoSlice.jsx'
import UpdatePasswordSlice from './slices/userSlices/UpdatePasswordSlice.jsx'

// order slices..................................
import CreateOrderSlice from './slices/orderSlices/CreateOrderSlice.jsx'
import GetOrdersSlice from './slices/orderSlices/GetOrdersSlice.jsx'
import PendingOrderSlice from './slices/orderSlices/PendingOrderSlice.jsx'
import UpdateOrderSlice from './slices/orderSlices/UpdateOrderSlice.jsx'
import GetSingleOrderSlice from './slices/orderSlices/GetSingleOrderSlice.jsx'

// coupon slices...............................
import GetCouponSlice from './slices/couponSlices/GetCouponSlice.jsx'

// cart slices...............................
import CreateCartSlice from './slices/cartSlices/CreateCartSlice.jsx'
import DeleteCartSlice from './slices/cartSlices/DeleteCartSlice.jsx'
import GetCartSlice from './slices/cartSlices/GetCartSlice.jsx'
import UpdateCartSlice from './slices/cartSlices/UpdateCartSlice.jsx'
import DeleteAllCartsSlice from './slices/cartSlices/DeleteAllCartsSlice.jsx'

// products slices...............................
import GetProductsSlice from './slices/productSlices/GetProductsSlice.jsx'
import GetSingleProductSlice from './slices/productSlices/GetSingleProductSlice.jsx'

export const store = configureStore({
    reducer: {
        // user slices...............................
        userdata: UserDataSlice,
        signup: SignupSlice,
        login: LoginSlice,
        logout: LogoutSlice,
        createuserinfo: CreateUserInfoSlice,
        deleteuserinfo: DeleteUserInfoSlice,
        getuserinfo: GetUserInfoSlice,
        updateuser: UpdateUserSlice,
        updateuserinfo: UpdateUserInfoSlice,
        updatepassword: UpdatePasswordSlice,

        // order slices.............................
        createorder: CreateOrderSlice,
        getorders: GetOrdersSlice,
        pendingorder: PendingOrderSlice,
        updateorder:UpdateOrderSlice,
        getsingleorder:GetSingleOrderSlice,

        // coupon slices...............................
        getcoupon: GetCouponSlice,

        // cart slices...............................
        createcart: CreateCartSlice,
        deletecart: DeleteCartSlice,
        getcart: GetCartSlice,
        updatecart: UpdateCartSlice,
        deleteallcarts: DeleteAllCartsSlice,

        // products slices...............................
        getproducts: GetProductsSlice,
        getsingleproduct: GetSingleProductSlice
    }
})