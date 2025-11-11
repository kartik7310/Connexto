import React from "react";
import { Trash2, Edit } from "lucide-react";

const BlogsButton = ({ isAuthor, onEdit, onDelete }) => {
 
  if (!isAuthor) return null;

  return (
    <div className="flex items-center gap-3 mt-4">

      <button
        onClick={onEdit}
        className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
      >
        <Edit className="w-4 h-4" />
        <span>Edit</span>
      </button>


      <button
        onClick={onDelete}
        className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition"
      >
        <Trash2 className="w-4 h-4" />
        <span>Delete</span>
      </button>
    </div>
  );
};

export default BlogsButton;
