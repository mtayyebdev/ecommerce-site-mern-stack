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
import GetSingleInfoSlice from './slices/userSlices/GetSingleUserInfo.jsx'
import updateInfoShippingSlice from './slices/userSlices/UpdateInfoShippingSlice.jsx'

// order slices..................................
import CreateOrderSlice from './slices/orderSlices/CreateOrderSlice.jsx'
import GetOrdersSlice from './slices/orderSlices/GetOrdersSlice.jsx'
import PendingOrderSlice from './slices/orderSlices/PendingOrderSlice.jsx'
import UpdateOrderSlice from './slices/orderSlices/UpdateOrderSlice.jsx'
import GetSingleOrderSlice from './slices/orderSlices/GetSingleOrderSlice.jsx'
import CancelOrderSlice from './slices/orderSlices/CancelOrderSlice.jsx'

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
import SearchProductsSlice from './slices/productSlices/SearchProductsSlice.jsx'
import SendProductsCommentSlice from './slices/productSlices/SendProductsCommentSlice.jsx'
import GetProductsReviewsSlice from './slices/productSlices/GetProductsReviewsSlice.jsx'

// contact slices..................................
import CreateContactSlice from './slices/contactSlices/CreateContactSlice.jsx'

// admin slices...........................................
import GetUsersAdminSlice from './slices/adminSlices/GetUsersSlice.jsx'
import GetProductsAdminSlice from './slices/adminSlices/GetProductsSlice.jsx'
import GetCouponsAdminSlice from './slices/adminSlices/GetCouponsSlice.jsx'
import GetOrdersAdminSlice from './slices/adminSlices/GetOrdersSlice.jsx'
import GetSingleUserSlice from './slices/adminSlices/GetSingleUserSlice.jsx'
import GetSingleProductAdminSlice from './slices/adminSlices/GetSingleProductSlice.jsx'
import DeleteUsersSlice from './slices/adminSlices/DeleteUserSlice.jsx'
import DeleteProductsSlice from './slices/adminSlices/DeleteProductsSlice.jsx'
import UpdateUserAdminSlice from './slices/adminSlices/UpdateUserSlice.jsx'
import CreateProductAdminSlice from './slices/adminSlices/CreateProductSlice.jsx'
import UpdateProductAdminSlice from './slices/adminSlices/UpdateProductSlice.jsx'
import CreateCouponAdminSlice from './slices/adminSlices/CreateCouponSlice.jsx'
import DeleteCouponAdminSlice from './slices/adminSlices/DeleteCouponSlice.jsx'
import DeleteOrderAdminSlice from './slices/adminSlices/DeleteOrderSlice.jsx'
import UpdateOrderStatusAdminSlice from './slices/adminSlices/UpdateOrderStatusSlice.jsx'
import GetContactsAdminSlice from './slices/adminSlices/GetContactSlice.jsx'
import DeleteContactAdminSlice from './slices/adminSlices/DeleteContactSlice.jsx'


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
    getsingleinfo: GetSingleInfoSlice,
    updateinfoshipping: updateInfoShippingSlice,

    // order slices.............................
    createorder: CreateOrderSlice,
    getorders: GetOrdersSlice,
    pendingorder: PendingOrderSlice,
    updateorder: UpdateOrderSlice,
    getsingleorder: GetSingleOrderSlice,
    cancelorder: CancelOrderSlice,

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
    getsingleproduct: GetSingleProductSlice,
    searchproducts: SearchProductsSlice,
    sendcomment: SendProductsCommentSlice,
    getproductsreviews:GetProductsReviewsSlice,

    // contact slices................................
    createcontact: CreateContactSlice,

    // admin slices....................................
    getadminusers: GetUsersAdminSlice,
    getadminproducts: GetProductsAdminSlice,
    getadminorders: GetOrdersAdminSlice,
    getadmincoupons: GetCouponsAdminSlice,
    deleteadminusers: DeleteUsersSlice,
    deleteadminproducts: DeleteProductsSlice,
    updateadminuser: UpdateUserAdminSlice,
    createadminproduct: CreateProductAdminSlice,
    updateadminproduct: UpdateProductAdminSlice,
    createadmincoupon: CreateCouponAdminSlice,
    deleteadmincoupon: DeleteCouponAdminSlice,
    deleteadminorder: DeleteOrderAdminSlice,
    getadminsingleuser: GetSingleUserSlice,
    getadminsingleproduct: GetSingleProductAdminSlice,
    updateorderstatus: UpdateOrderStatusAdminSlice,
    getcontacts: GetContactsAdminSlice,
    deletecontact: DeleteContactAdminSlice,
  }
})