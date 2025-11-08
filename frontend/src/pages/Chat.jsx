

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../webSocket/socket";
import { useSelector } from "react-redux";
import chatService from "../services/chatService";

const Chat = () => {
  const userData = useSelector((store) => store.user.user);
  const { _id: userId, firstName: meFirstName, lastName: meLastName, photoUrl: mePhoto } = userData || {};
  const { targetUserId } = useParams();

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const endRef = useRef(null);
  const socketRef = useRef(null);

  // --- helpers
  const normalize = (raw) => {
    // Works for both API and socket payloads
    const sender =
      typeof raw.senderId === "object" && raw.senderId !== null
        ? raw.senderId
        : raw.senderId
        ? { _id: raw.senderId }
        : 
          (raw.firstName === meFirstName
            ? { _id: userId, firstName: meFirstName, lastName: meLastName, photoUrl: mePhoto }
            : { _id: targetUserId });

    return {
      id: raw._id || raw.id || crypto.randomUUID(),
      text: raw.text ?? "",
      createdAt: raw.createdAt || new Date().toISOString(),
      senderId: sender?._id,
      firstName: sender?.firstName,
      lastName: sender?.lastName,
      photoUrl: sender?.photoUrl,
    };
  };

  const handleSend = () => {
    const text = inputMessage.trim();
    if (!text || !socketRef.current) return;

    // just emit; server will broadcast back → normalize on receive
    socketRef.current.emit("send-message", {
      firstName: meFirstName,
      userId,
      targetUserId,
      text,
    });

    setInputMessage("");
  };

  // auto-scroll
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  // socket connect + listeners
  useEffect(() => {
    if (!userId || !targetUserId) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", { userId, targetUserId, firstName: meFirstName });

    socket.on("receiveMessage", (payload) => {
      // Normalize payload so it matches API message shape
      const msg = normalize(payload);

      // if the server also echoes my own message, that's fine; bubbles align via senderId
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.disconnect();
      socketRef.current = null;
    };
  }, [userId, targetUserId, meFirstName]);

  // initial load from API
  const fetchChats = async () => {
    try {
      const res = await chatService.chats(targetUserId); 
      const chat = Array.isArray(res) ? res[0] ?? null : res;

      if (!chat) {
        setMessages([]);
        return;
      }

      const msgs = (chat.message || [])
        .slice()
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        .map((m) => normalize(m));

      setMessages(msgs);
    } catch (error) {
      console.log(error?.message || error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, [targetUserId]);

  return (
    <div className="w-full">
      <div className="mx-auto max-w-3xl px-3 sm:px-4 lg:px-0 flex flex-col h-[calc(100vh-160px)]">
        <div className="flex-1 overflow-y-auto overscroll-contain rounded-md sm:rounded-xl border border-gray-700 bg-gray-800/40 p-3 sm:p-5 text-gray-100 space-y-3 sm:space-y-4">
          {messages?.map((m) => {
            const isMe = String(m.senderId) === String(userId);
            return (
              <div key={m.id} className={`chat ${isMe ? "chat-end" : "chat-start"}`}>
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full overflow-hidden">
                    <img src={m.photoUrl || "/default.png"} alt={(m.firstName || "User") + " profile"} />
                  </div>
                </div>

                <div className="chat-header">
                  {(m.firstName || "User")}{m.lastName ? ` ${m.lastName}` : ""}
                  <time className="text-xs opacity-50 ml-1">
                    {new Date(m.createdAt).toString() === "Invalid Date"
                      ? ""
                      : new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </time>
                </div>

                <div className="chat-bubble max-w-[80%] sm:max-w-[70%] break-words whitespace-pre-wrap">
                  {m.text}
                </div>
              </div>
            );
          })}
          <div ref={endRef} />
        </div>

        <div className="sticky bottom-0 left-0 right-0 mt-3 sm:mt-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Message…"
              aria-label="Type your message"
              className="flex-1 rounded-xl bg-gray-900 border border-gray-700 px-3 sm:px-4 py-3 text-gray-100 outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              onClick={handleSend}
              disabled={!inputMessage.trim()}
              className="shrink-0 rounded-xl px-4 sm:px-6 py-3 font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Send
            </button>
          </div>
          <div style={{ paddingBottom: "env(safe-area-inset-bottom)" }} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
