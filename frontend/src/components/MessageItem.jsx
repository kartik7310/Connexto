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
            <div className="chat-footer opacity-50 text-[10px] mt-1 space-x-1">
                <time>{time}</time>
                {isMe && <span>· Sent</span>}
            </div>
        </div>
    );
};

export default MessageItem;
