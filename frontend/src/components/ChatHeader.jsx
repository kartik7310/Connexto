import React from "react";
import { Link } from "react-router-dom";

const ChatHeader = ({ user, isLoading }) => {
    if (isLoading) {
        return (
            <div className="flex items-center gap-3 p-4 border-b border-gray-700 bg-gray-800/60 backdrop-blur-md rounded-t-2xl animate-pulse">
                <div className="w-10 h-10 rounded-full bg-gray-700" />
                <div className="flex-1">
                    <div className="h-4 w-32 bg-gray-700 rounded mb-2" />
                    <div className="h-3 w-20 bg-gray-700 rounded" />
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-3 p-4 border-b border-gray-700 bg-gray-800/60 backdrop-blur-md rounded-t-2xl sticky top-0 z-10">
            <Link to={`/user/${user?._id}`} className="shrink-0 group">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500/30 group-hover:border-blue-500 transition-colors">
                    <img
                        src={user?.photoUrl || "/default.png"}
                        alt={user?.firstName || "User"}
                        className="w-full h-full object-cover"
                    />
                </div>
            </Link>
            <div className="flex-1 min-w-0">
                <h2 className="font-bold text-gray-100 truncate flex items-center gap-2">
                    {user?.firstName} {user?.lastName}
                    <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                </h2>
                <p className="text-xs text-gray-400">Online</p>
            </div>
        </div>
    );
};

export default ChatHeader;
