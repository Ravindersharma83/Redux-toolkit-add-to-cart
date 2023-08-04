import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./slices/ProductSlice";
import CartSlice from "./slices/CartSlice";

const store = configureStore({
    reducer:{
        product:ProductSlice,
        cart:CartSlice
    }
})

export default store;