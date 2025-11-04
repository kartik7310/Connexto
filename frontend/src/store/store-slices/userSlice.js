import { createSlice } from '@reduxjs/toolkit'
export const userSlice = createSlice({
  name: 'users',
  initialState: {
   user:null
  },
  reducers: {
    addUser: (state,data) => {
        state.user = data.payload
    },
    removeUser: (state) => {
       state.user=null 
      
    },
  },
})


export const {addUser,removeUser } = userSlice.actions

export default userSlice.reducer