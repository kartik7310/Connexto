import { createSlice } from '@reduxjs/toolkit'
export const feedSlice = createSlice({
  name: 'feeds',
  initialState: {
   feed:null
  },
  reducers: {
    addFeed: (state,data) => {
        state.feed = data.payload
    },
    removeFeed: (state) => {
       state.feed=null 
      
    },
  },
})


export const {addFeed,removeFeed } = feedSlice.actions

export default feedSlice.reducer