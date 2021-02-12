import { createStore, combineReducers, applyMiddleware, configureStore, createAsyncThunk } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    ProductsReducer,
    ProductDetailReducer,
    productDeleteReducer,
    productAddReducer,
    productEditReducer,
    productCreateReviewReducer,
    productTopRateReducer
} from "../reducres/productsReducer"

import { cartReducer } from '../reducres/cartReducer'

import {
    userLoginReducer,
    userRegisterReducer,
    userDetailReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userAdminDetailsReducer,
    userAdminUpdateReducer
} from '../reducres/userReducer'

import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    userOrdersReducer,
    orderListReducer,
    orderDeliverReducer
} from '../reducres/orderReducer'


const reducer = combineReducers({
    productList: ProductsReducer,
    productDetail: ProductDetailReducer,
    productDelete: productDeleteReducer,
    productAdd: productAddReducer,
    productEdit: productEditReducer,
    productCreateReview: productCreateReviewReducer,
    productTopRate: productTopRateReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetail: userDetailReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer,
    userOrders: userOrdersReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userAdminDetails: userAdminDetailsReducer,
    userAdminUpdate: userAdminUpdateReducer,

})

const cartItemFromStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems")) : []

const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")) : null

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress")) : {}

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
    ? JSON.parse(localStorage.getItem("paymentMethod")) : ""

const initialState = {
    cart: {
        cartItems: cartItemFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodFromStorage
    },
    userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

// const store = configureStore({ reducer, initialState })


export default store   