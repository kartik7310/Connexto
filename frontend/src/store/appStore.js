import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../store/store-slices/userSlice"
import feedReducer from "../store/store-slices/feedSlice"
import connectionReducer from "../store/store-slices/connectionSlice"
import requestReducer from "../store/store-slices/requestSlice"
import blogReducer from "../store/store-slices/blogSlice"

export  const  store =  configureStore({
  reducer: {
   user: userReducer,
   feed:feedReducer,
   connection:connectionReducer,
   request:requestReducer,
   blogs:blogReducer
  
  },
})