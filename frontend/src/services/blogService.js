import { apiEndpoints, baseUrl } from "../utils/constants";
import axios from "axios";
class BlogService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async fetchAllBlogs(params = {}) {
    try {
      const url = this.baseUrl + apiEndpoints.fetchAllBlogs;
      const res = await axios.get(url,{
        params,
        withCredentials:true
      })
      console.log("res",res);
      
      return res.data?.data;
    } catch (err) {
      const serverMsg =
        err?.response?.data?.message || err?.response?.data?.error;
      throw new Error(serverMsg || "something went wrong");
    }
  }

  async fetchSingleBlog(blogId) {
    try {
      const url = `${this.baseUrl}${apiEndpoints.fetchSingleBlog.replace(
        ":blogId",
        blogId
      )}`;
      const res = await axios.get(url, { withCredentials: true });
      return res.data?.data;
    } catch (err) {
      const serverMsg =
        err?.response?.data?.message || err?.response?.data?.error;
      throw new Error(
        serverMsg || "Something went wrong while fetching the blog"
      );
    }
  }

  async updateBlog(blogId, blogPayload) {

    
    try {
      const url = `${this.baseUrl}${apiEndpoints.updateBlog.replace(":blogId",blogId)}`;
      const res = await axios.patch(url, blogPayload, {
        withCredentials: true,
      });
      return res.data?.data;
    } catch (err) {
      const serverMsg =
        err?.response?.data?.message || err?.response?.data?.error;
      throw new Error(
        serverMsg || "Something went wrong while fetching the blog"
      );
    }
  }

  async createBlog(blogPayload) {
    try {
      const url = `${this.baseUrl}${apiEndpoints.createBlog}`;
      const res = await axios.post(url, blogPayload, {
        withCredentials: true,
      });
      return res.data?.data;
    } catch (err) {
      const serverMsg =
        err?.response?.data?.message || err?.response?.data?.error;
      throw new Error(
        serverMsg || "Something went wrong while fetching the blog"
      );
    }
  }

  async getImageKitAuth(token) {
  const url = `${this.baseUrl}${apiEndpoints.imagekitAuth}`;
  try {
    const res = await axios.get(url, {
  withCredentials:true,
    timeout: 15000,
    });
    
    
    return res?.data
  } catch (err) {
    const serverMsg =
      err?.response?.data?.message || err?.response?.data?.error || err.message;
    throw new Error(
      serverMsg || "Something went wrong while fetching ImageKit auth params"
    );
  }
}
 
  async deleteBlog(blogId) {
    try {
      const url = `${this.baseUrl}${apiEndpoints.deleteBlog.replace(":blogId",blogId)}`;
      const res = await axios.delete(url, {
        withCredentials: true,
      });
      return res.data?.data;
    } catch (err) {
      const serverMsg =
        err?.response?.data?.message || err?.response?.data?.error;
      throw new Error(
        serverMsg || "Something went wrong while fetching the blog"
      );
    }
  }

  async likeBlog(blogId) {
    try {
      const url = `${this.baseUrl}${apiEndpoints.likeBlog.replace(":blogId", blogId)}`;
      const res = await axios.post(url, {}, { withCredentials: true });
      return res.data?.data;
    } catch (err) {
      const serverMsg = err?.response?.data?.message || err?.response?.data?.error;
      throw new Error(serverMsg || "Something went wrong while liking the blog");
    }
  }

  async addComment(blogId, content) {
    try {
      const url = `${this.baseUrl}${apiEndpoints.addComment.replace(":blogId", blogId)}`;
      const res = await axios.post(url, { content }, { withCredentials: true });
      return res.data?.data;
    } catch (err) {
      const serverMsg = err?.response?.data?.message || err?.response?.data?.error;
      throw new Error(serverMsg || "Something went wrong while adding comment");
    }
  }

  async fetchComments(blogId) {
    try {
      const url = `${this.baseUrl}${apiEndpoints.fetchComments.replace(":blogId", blogId)}`;
      const res = await axios.get(url, { withCredentials: true });
      return res.data?.data;
    } catch (err) {
      const serverMsg = err?.response?.data?.message || err?.response?.data?.error;
      throw new Error(serverMsg || "Something went wrong while fetching comments");
    }
  }
}

export default new BlogService(baseUrl);
