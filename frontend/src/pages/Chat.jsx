

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createSocketConnection } from "../webSocket/socket";
import { useSelector } from "react-redux";
import chatService from "../services/chatService";
import userService from "../services/userService";
import ChatHeader from "../components/ChatHeader";
import MessageItem from "../components/MessageItem";
import { normalizeMessage } from "../utils/chatUtils";
import { ArrowLeftIcon } from "lucide-react";

const Chat = () => {
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user.user);
  const { _id: userId, firstName: meFirstName, lastName: meLastName, photoUrl: mePhoto } = userData || {};
  const { targetUserId } = useParams();

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [targetUser, setTargetUser] = useState(null);
  const [isHeaderLoading, setIsHeaderLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(false);
  const [isTargetTyping, setIsTargetTyping] = useState(false);

  const endRef = useRef(null);
  const socketRef = useRef(null);
  const chatContainerRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // --- Helpers ---
  const normalize = useCallback(
    (raw) =>
      normalizeMessage(raw, {
        userId,
        targetUserId,
        meFirstName,
        meLastName,
        mePhoto,
        targetUser,
      }),
    [userId, targetUserId, meFirstName, meLastName, mePhoto, targetUser]
  );

  const handleSend = () => {
    const text = inputMessage.trim();
    if (!text || !socketRef.current) return;

    socketRef.current.emit("send-message", {
      firstName: meFirstName,
      lastName: meLastName,
      photoUrl: mePhoto,
      userId,
      targetUserId,
      text,
    });

    setInputMessage("");
  };

  // --- Effects ---

  // Auto-scroll on new messages
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  // Socket connection
  useEffect(() => {
    if (!userId || !targetUserId) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", { userId, targetUserId, firstName: meFirstName });
    socket.emit("register-user", userId);

    socket.on("online-users-list", (onlineIds) => {
      setIsOnline(onlineIds.includes(String(targetUserId)));
    });

    socket.on("typing-status", ({ userId: senderId, isTyping }) => {
      if (String(senderId) === String(targetUserId)) {
        setIsTargetTyping(isTyping);
      }
    });

    socket.on("receiveMessage", (payload) => {
      const msg = normalize(payload);
      setMessages((prev) => {
        // Prevent duplicate messages if server echoes back
        if (prev.some((m) => m.id === msg.id)) return prev;
        return [...prev, msg];
      });

      // If message is from target user, mark as seen
      if (String(payload.senderId || payload.userId) === String(targetUserId)) {
        socket.emit("mark-messages-seen", { userId, targetUserId });
      }
    });

    socket.on("messages-seen", ({ userId: seerId, targetUserId: originalSenderId }) => {
      // If the target user (the one I'm chatting with) has seen MY messages
      if (String(seerId) === String(targetUserId)) {
        setMessages((prev) =>
          prev.map((m) =>
            String(m.senderId) === String(userId) ? { ...m, seen: true } : m
          )
        );
      }
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("messages-seen");
      socket.off("online-users-list");
      socket.off("typing-status");
      socket.disconnect();
      socketRef.current = null;
    };
  }, [userId, targetUserId, meFirstName, normalize]);

  // Initial load: target user and chat history
  const fetchData = async () => {
    if (!targetUserId) return;

    try {
      // Fetch target user profile for header
      setIsHeaderLoading(true);
      const userRes = await userService.getUserById(targetUserId);
      const tUser = userRes.data;
      setTargetUser(tUser);
      setIsHeaderLoading(false);

      // Fetch chat history
      const chatRes = await chatService.chats(targetUserId);
      const chat = Array.isArray(chatRes) ? chatRes[0] ?? null : chatRes;

      if (!chat) {
        setMessages([]);
        return;
      }

      const msgs = (chat.message || [])
        .slice()
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        .map((m) =>
          normalizeMessage(m, {
            userId,
            targetUserId,
            meFirstName,
            meLastName,
            mePhoto,
            targetUser: tUser,
          })
        );

      setMessages(msgs);

      // Mark messages as seen once loaded
      if (socketRef.current && msgs.some(m => String(m.senderId) === String(targetUserId) && !m.seen)) {
        socketRef.current.emit("mark-messages-seen", { userId, targetUserId });
      }
    } catch (error) {
      console.error("Error fetching chat data:", error);
      setIsHeaderLoading(false);
    }
  };

  useEffect(() => {
    if (targetUserId && userId) {
      fetchData();
    }
  }, [targetUserId, userId]);

  return (
    <>
      <div className="w-full flex justify-center py-2 sm:py-6 px-0 sm:px-6">

        <div className="w-full max-w-4xl flex flex-col h-[calc(100vh-100px)] bg-gray-900/40 backdrop-blur-xl border border-gray-700/50 rounded-none sm:rounded-2xl shadow-2xl overflow-hidden relative">

          <ChatHeader user={targetUser} isLoading={isHeaderLoading} isOnline={isOnline} />

          <div ref={chatContainerRef} className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-1 custom-scrollbar">
            {messages.length === 0 && !isHeaderLoading && (
              <div className="h-full flex flex-col items-center justify-center opacity-30 select-none">
                <div className="w-16 h-16 mb-4 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center">
                  <span className="text-2xl">💬</span>
                </div>
                <p className="text-sm font-medium">No messages yet. Start a conversation!</p>
              </div>
            )}

            {messages.map((m) => (
              <MessageItem key={m?.id} message={m} isMe={String(m?.senderId) === String(userId)} />
            ))}

            {isTargetTyping && (
              <div className="chat chat-start mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="chat-image avatar">
                  <div className="w-8 rounded-full ring-1 ring-gray-700">
                    <img src={targetUser?.photoUrl || "/default.png"} alt="sender" />
                  </div>
                </div>
                <div className="chat-bubble bg-gray-700/50 text-gray-300 !rounded-2xl !rounded-tl-none border border-gray-600/30 py-2 px-4 italic text-sm flex items-center gap-2">
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                  </span>
                  Typing...
                </div>
              </div>
            )}

            <div ref={endRef} />
          </div>

          <div className="p-2 bg-gray-800/40 border-t border-gray-700/50">
            <div className="flex items-center gap-1 group">
              <div className="flex-1 relative">
                <input
                  value={inputMessage}
                  onChange={(e) => {
                    setInputMessage(e.target.value);

                    // Emit typing status
                    if (socketRef.current && userId && targetUserId) {
                      socketRef.current.emit("typing-status", { userId, targetUserId, isTyping: true });

                      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
                      typingTimeoutRef.current = setTimeout(() => {
                        socketRef.current.emit("typing-status", { userId, targetUserId, isTyping: false });
                      }, 1000);
                    }
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type a message..."
                  className="w-full rounded-2xl bg-gray-950 border border-gray-700/50 px-3 py-2 text-sm sm:text-base text-gray-100 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-gray-600 shadow-inner"
                />
              </div>
              <button
                onClick={handleSend}
                disabled={!inputMessage.trim()}
                className="shrink-0 w-10 h-10 flex items-center justify-center rounded-2xl font-semibold text-white bg-blue-600 hover:bg-blue-500 active:scale-95 disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-600/20"
                aria-label="Send message"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 -rotate-45">
                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
