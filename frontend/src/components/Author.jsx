import React from "react";
import { Link } from "react-router-dom";

const AuthorInfo = ({ author }) => {
  if (!author) return null;

  const { _id, firstName, lastName, image } = author;

  return (
    <div className="flex items-center gap-3 mt-3">
      {/* Author image */}
      <img
        src={
          image ||
          "https://cdn-icons-png.flaticon.com/512/149/149071.png" // fallback avatar
        }
        alt={`${firstName || "Unknown"} ${lastName || ""}`}
        className="w-10 h-10 rounded-full object-cover border border-gray-300"
      />


      <div className="flex flex-col">
        <Link
          to={`/users/${_id}`}
          className="text-sm font-semibold text-white hover:text-blue-600 transition"
        >
          {firstName} {lastName}
        </Link>
        <span className="text-xs text-white">Author</span>
      </div>
    </div>
  );
};

export default AuthorInfo;
