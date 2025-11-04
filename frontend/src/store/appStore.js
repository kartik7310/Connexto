import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../store/store-slices/userSlice"
import feedReducer from "../store/store-slices/feedSlice"
export  const  store =  configureStore({
  reducer: {
   user: userReducer,
   feed:feedReducer
  },
})