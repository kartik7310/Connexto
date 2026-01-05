import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, MessageSquare, X, Minus, ShieldCheck } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { baseUrl } from "../utils/constants";

export default function Chatbot() {
  const user = useSelector((state) => state.user?.user);
  const isPremium = user?.plan === "PREMIUM";
  console.log("isPremium",isPremium);
  

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "1",
      role: "assistant",
      content: "Hi, I’m Connexto. Ask me about your connections and blogs.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isTyping || !isPremium) return;

    const userMsg = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    try {
      const res = await axios.post(
        `${baseUrl}/chat/assistant`,
        {
          message: userMsg.content,
          history: updatedMessages.slice(-4).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        },
        { withCredentials: true }
      );

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: res.data.data,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-10 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="-mb-3 w-[380px] h-[450px] bg-base-800 border border-white/10 shadow-2xl rounded-3xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4">
            <div className="flex gap-3 items-center">
              <div className="bg-white/20 p-2 rounded-xl">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <span className="text-sm font-bold block">Connexto AI</span>
                <span className="text-[10px] opacity-80 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  Online
                </span>
              </div>
            </div>
            <button
              className="hover:bg-white/10 p-2 rounded-xl transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Minus size={20} />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-base-900/50"
          >
            {isPremium ? (
              messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${m.role === "assistant" ? "bg-indigo-500/20 text-indigo-400" : "bg-purple-500/20 text-purple-400"}`}>
                    {m.role === "assistant" ? <Bot size={16} /> : <User size={16} />}
                  </div>

                  <div
                    className={`px-4 py-3 text-sm rounded-2xl max-w-[80%] ${
                      m.role === "user"
                        ? "bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-600/10"
                        : "bg-base-700 text-slate-200 rounded-tl-none border border-white/5"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-base-800/50 rounded-2xl m-2 border border-dashed border-white/10">
                <div className="bg-indigo-500/10 p-4 rounded-full mb-4">
                  <ShieldCheck className="text-indigo-400" size={32} />
                </div>
                <p className="text-sm font-bold text-white">
                  Premium Feature
                </p>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  Upgrade to Premium to chat with your personal AI assistant.
                </p>
                <Link to="/premium" className="mt-6 btn btn-primary btn-sm rounded-xl">Upgrade Now</Link>
              </div>
            )}

            {isTyping && (
                <div className="flex gap-3 items-center opacity-70">
                   <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                      <Bot size={16} />
                   </div>
                   <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></span>
                   </div>
                </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-4 bg-base-800 border-t border-white/10"
          >
            <div className="relative flex gap-2">
                <input
                  className="w-full bg-base-700 border border-white/10 rounded-2xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all disabled:opacity-50"
                  placeholder={isPremium ? "Ask me anything..." : "Premium only..."}
                  value={input}
                  disabled={!isPremium || isTyping}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all disabled:bg-base-700 disabled:text-slate-500"
                  disabled={!input.trim() || isTyping || !isPremium}
                >
                  <Send size={18} />
                </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button
        className={`shadow-2xl h-14 w-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${isOpen ? 'bg-base-700 text-white rotate-90' : 'bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-indigo-600/30'}`}
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? "Close Chat" : "Open Chat AI"}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
}
