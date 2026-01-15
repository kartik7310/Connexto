// src/pages/BlogDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogService from "../services/blogService";
import { ClipboardEditIcon, Edit2Icon, FileEdit, Trash2 } from "lucide-react";
import AuthorInfo from "../components/Author";
import { useSelector } from "react-redux";
import { stripHtml } from "../utils/htmlparser";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Heart, MessageCircle, Send } from "lucide-react";

const BlogDetails = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user?.user);
  
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [isLiking, setIsLiking] = useState(false);

  useEffect(() => {
    const fetchBlogAndComments = async () => {
      try {
        const [blogData, commentsData] = await Promise.all([
          BlogService.fetchSingleBlog(blogId),
          BlogService.fetchComments(blogId),
        ]);
        setBlog(blogData);
        setComments(commentsData);
      } catch (err) {
        setError(err.message || "Failed to fetch blog details");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogAndComments();
  }, [blogId]);

  const handleLike = async () => {
    if (!user) {
      toast.error("Please login to like this blog");
      return;
    }
    try {
      setIsLiking(true);
      const updatedLikes = await BlogService.likeBlog(blogId);
      setBlog({ ...blog, likes: updatedLikes });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLiking(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to comment");
      return;
    }
    if (!commentContent.trim()) return;

    try {
      const newComment = await BlogService.addComment(blogId, commentContent);
      setComments([newComment, ...comments]);
      setCommentContent("");
      toast.success("Comment added");
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading)
    return <div className="text-center py-10 text-gray-500">Loading...</div>;

  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  if (!blog)
    return (
      <div className="text-center py-10 text-gray-500">Blog not found 😕</div>
    );

  const isAuthor = user?._id === blog?.author?._id;
  const hasLiked = blog.likes?.includes(user?._id);

  const handleDeleteBlog = async (blogId) => {
    try {
      await BlogService.deleteBlog(blogId);
      toast.success("Blog deleted successfully");
      navigate("/blogs");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <img
        src={blog.blogImage || "https://via.placeholder.com/800x400"}
        alt={blog.title}
        className="w-full h-64 object-cover rounded-xl mb-6 shadow-md"
      />
      <h1 className="text-4xl font-bold mb-4 text-gray-800">{blog.title}</h1>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-gray-500 font-medium">Read ~ 5 min</h2>
        <h3 className="text-gray-500 text-sm">
          Published on :{" "}
          <span className="text-blue-500 font-semibold">
            {new Date(blog.createdAt).toLocaleDateString()}
          </span>
        </h3>
      </div>

      <p className="text-gray-700 leading-relaxed text-lg mb-8">
        {stripHtml(blog.content)}
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        {Array.isArray(blog.tags) && blog.tags.length > 0 ? (
          blog.tags.map((tag, i) => (
            <span
              key={i}
              className="bg-blue-50 text-blue-600 text-sm font-semibold px-4 py-1 rounded-full border border-blue-100"
            >
              #{tag}
            </span>
          ))
        ) : (
          <span className="text-sm text-gray-400 italic">No tags</span>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-b border-gray-100 py-4 mb-8">
        <div className="flex items-center gap-6">
          <button
            onClick={handleLike}
            disabled={isLiking}
            className={`flex items-center gap-2 transition-all duration-200 ${
              hasLiked ? "text-red-500" : "text-gray-500 hover:text-red-500"
            } active:scale-95`}
          >
            <Heart className={`w-6 h-6 ${hasLiked ? "fill-current" : ""}`} />
            <span className="font-semibold">{blog.likes?.length || 0}</span>
          </button>
          <div className="flex items-center gap-2 text-gray-500">
            <MessageCircle className="w-6 h-6" />
            <span className="font-semibold">{comments.length}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <AuthorInfo author={blog.author} />
          {isAuthor && (
            <div className="flex gap-4 border-l border-gray-200 pl-4">
              <button
                className="text-gray-400 hover:text-blue-500 transition-colors"
                onClick={() => navigate(`/blogs/edit-blog/${blog._id}`)}
              >
                <FileEdit className="w-5 h-5" />
              </button>
              <button
                className="text-gray-400 hover:text-red-500 transition-colors"
                onClick={() => handleDeleteBlog(blog._id)}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-16 pt-10 border-t border-base-300">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-gray-800">
            Comments <span className="text-gray-400 font-normal ml-2">({comments.length})</span>
          </h3>
        </div>

        {user && (
          <div className="flex gap-4 mb-12 items-start">
            <img
              src={user.photoUrl || "https://via.placeholder.com/40"}
              alt={user.firstName}
              className="w-10 h-10 rounded-full object-cover shrink-0 border border-base-200"
            />
            <form onSubmit={handleAddComment} className="flex-1 relative group">
              <textarea
                rows="1"
                value={commentContent}
                onChange={(e) => {
                  setCommentContent(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
                placeholder="What are your thoughts?"
                className="w-full bg-base-100 border border-base-200 rounded-xl px-4 py-3 pr-12 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all shadow-sm resize-none overflow-hidden min-h-[48px]"
              />
              <button
                type="submit"
                disabled={!commentContent.trim()}
                className="absolute right-2 bottom-2 text-blue-600 p-2 rounded-lg hover:bg-blue-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all active:scale-90"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}

        <div className="divide-y divide-base-200">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment._id} className="py-8 transition-colors hover:bg-base-50/50 -mx-4 px-4 rounded-xl">
                <div className="flex items-start gap-4">
                  <img
                    src={comment.author?.photoUrl || "https://via.placeholder.com/40"}
                    alt={comment.author?.firstName}
                    className="w-10 h-10 rounded-full object-cover shrink-0 border border-base-100"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-gray-900 truncate">
                        {comment.author?.firstName} {comment.author?.lastName}
                      </p>
                      <span className="text-gray-300 text-xs">•</span>
                      <p className="text-xs text-gray-400">
                        {new Date(comment.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-md break-words">
                      {comment.content}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-4xl mb-4 opacity-20">💬</div>
              <p className="text-gray-400 italic">No comments yet. Be the first to share your thoughts!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
