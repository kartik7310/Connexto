import { createSlice } from '@reduxjs/toolkit'
export const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
   blogs:[]
  },
  reducers: {
    setBlogs:(state,action)=>{
         state.blogs = action.payload;
    },
      addBlog: (state, action) => {
      state.blogs.push(action.payload);
  
},
   removeBlogs: (state,actions) =>{
       state.blogs = state.blogs.filter((blog)=>blog._id !==actions.payload);
     
    },
     updateBlogs: (state,actions) =>{
      const updated= actions.payload;
      const index = state.blogs.findIndex((blog)=>blog._id === updated._id);
     if(index==-1){
      state.blogs[index]={...state.blogs[index],...updated}
     }
    },
  },
})


export const {addBlogs,removeBlogs,updateBlogs } = blogSlice.actions

export default blogSlice.reducer