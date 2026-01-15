import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  tags:{
    type: [String],
    default: [],
  },
  blogImage:{
    type: String,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  publishedAt: {
    type: Date,
    default: Date.now
  },

}, { timestamps: true });

blogSchema.index({tags:"text",title:"text"})
const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
