import React, { useMemo } from "react";

const MessageItem = ({ message, isMe }) => {
    const time = useMemo(() => {
        const date = new Date(message.createdAt);
        return date.toString() === "Invalid Date"
            ? ""
            : date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }, [message.createdAt]);

    return (
        <div className={`chat ${isMe ? "chat-end" : "chat-start"} mb-2 animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            {!isMe && (
                <div className="chat-image avatar">
                    <div className="w-8 rounded-full ring-1 ring-gray-700">
                        <img src={message?.photoUrl || "/default.png"} alt="sender" />
                    </div>
                </div>
            )}
            <div className="chat-header text-[10px] opacity-70 mb-0.5 mx-1">
                {message?.firstName} {message?.lastName}
            </div>
            <div className={`chat-bubble max-w-[85%] sm:max-w-[75%] break-words whitespace-pre-wrap ${isMe
                ? "bg-blue-600 text-white !rounded-2xl !rounded-tr-none"
                : "bg-gray-700 text-gray-100 !rounded-2xl !rounded-tl-none border border-gray-600"
                } shadow-lg p-3 text-sm sm:text-base`}>
                {message.text}
            </div>
            <div className="chat-footer opacity-50 text-[10px] mt-1 flex items-center gap-1">
                <time>{time}</time>
                {isMe && (
                    <span className="flex">
                        {message.seen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-blue-400">
                                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                <path fillRule="evenodd" d="M11.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" className="-ml-2" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-gray-400">
                                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                            </svg>
                        )}
                    </span>
                )}
            </div>
        </div>
    );
};

export default MessageItem;
