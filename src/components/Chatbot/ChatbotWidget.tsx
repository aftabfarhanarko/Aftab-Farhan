"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  MessageCircle,
  X, 
  Send, 
  Bot, 
  User, 
  Code2, 
  FolderGit2, 
  Briefcase, 
  GraduationCap, 
  Brain, 
  Sparkles, 
  Wrench 
} from "lucide-react";
import { useTheme } from "@/context/Theme";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function renderFormattedContent(content: string) {
  if (!content) return null;

  const parts = content.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\n)/g);

  return parts.map((part, index) => {
    if (!part) return null;

    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, linkText, linkUrl] = linkMatch;
      return (
        <a
          key={index}
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#FF6014] font-bold underline hover:opacity-80 transition-opacity inline-flex items-center gap-0.5"
        >
          {linkText} ↗
        </a>
      );
    }

    const boldMatch = part.match(/^\*\*([^*]+)\*\*$/);
    if (boldMatch) {
      return (
        <strong key={index} className="font-extrabold text-slate-900">
          {boldMatch[1]}
        </strong>
      );
    }

    if (part === "\n") {
      return <br key={index} />;
    }

    return <span key={index}>{part}</span>;
  });
}

export default function ChatbotWidget() {
  const { theme } = useTheme();
 

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize session and chat history from localStorage
  useEffect(() => {
    const savedSessionId = localStorage.getItem("portfolio_chat_session_id");
    const savedMessages = localStorage.getItem("portfolio_chat_messages");

    if (savedSessionId) {
      setSessionId(savedSessionId);
    }
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error("Failed to parse saved chat messages:", e);
      }
    } else {
      // Default welcome message
      setMessages([
        {
          role: "assistant",
          content: "Hello! I am Arko's AI Portfolio Assistant. How can I help you today? Feel free to ask about my projects, skills, or professional experience! (আমি আরকোর এআই অ্যাসিস্ট্যান্ট। আরকোর প্রজেক্ট, স্কিল বা কাজের অভিজ্ঞতা সম্পর্কে যেকোনো প্রশ্ন করতে পারেন!)",
        },
      ]);
    }
  }, []);

  // Save messages to localStorage when updated
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("portfolio_chat_messages", JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll to bottom when messages update or panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const textToSend = customText || input;
    if (!textToSend.trim() || isLoading) return;

    if (!customText) {
      setInput("");
    }

    const newUserMsg: Message = { role: "user", content: textToSend };
    const updatedMessages = [...messages, newUserMsg];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const historyPayload = updatedMessages.map((m) => ({
        role: m.role,
        text: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: historyPayload,
          sessionId: sessionId || undefined,
        }),
      });

      const data = await res.json();

      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Something went wrong. Please try again." },
        ]);
      }

      if (data.sessionId) {
        setSessionId(data.sessionId);
        localStorage.setItem("portfolio_chat_session_id", data.sessionId);
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm having trouble connecting right now. Please try again later or reach out to Arko directly via the Contact form.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickPrompt = (text: string) => {
    handleSend(undefined, text);
  };

  const triggerClearChatConfirm = () => {
    setShowConfirmClear(true);
  };

  const confirmClearChat = () => {
    localStorage.removeItem("portfolio_chat_session_id");
    localStorage.removeItem("portfolio_chat_messages");
    setSessionId(null);
    setMessages([
      {
        role: "assistant",
        content: "Hello! I am Arko's AI Portfolio Assistant. How can I help you today?",
      },
    ]);
    setShowConfirmClear(false);

    // Trigger toast message
    setToastMessage("Chat cleared / চ্যাট হিস্ট্রি মুছে ফেলা হয়েছে");
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Starter prompts configured with dynamic Lucide icons instead of raw emojis
  const starterPrompts = [
    {
      label: "Skills", 
      icon: <Code2 size={10} className="text-[#FF6014]" />, 
      text: "What programming languages and frameworks do you use?" 
    },
    { 
      label: "Projects", 
      icon: <FolderGit2 size={10} className="text-[#FF6014]" />, 
      text: "Show me some of your recent web projects." 
    },
    { 
      label: "Experience", 
      icon: <Briefcase size={10} className="text-[#FF6014]" />, 
      text: "Where have you worked before?" 
    },
    { 
      label: "Education", 
      icon: <GraduationCap size={10} className="text-[#FF6014]" />, 
      text: "Tell me about your educational background." 
    },
    { 
      label: "Soft Skills", 
      icon: <Brain size={10} className="text-[#FF6014]" />, 
      text: "What are your soft skills and communication strengths?" 
    },
    { 
      label: "AI Workflow", 
      icon: <Sparkles size={10} className="text-[#FF6014]" />, 
      text: "Can you explain your AI-Powered Engineering Workflow?" 
    },
    { 
      label: "Services", 
      icon: <Wrench size={10} className="text-[#FF6014]" />, 
      text: "What kind of development services do you offer to clients?" 
    },
  ];

  return (
    <div className="fixed z-50 font-sans bottom-24 right-4 md:bottom-36 md:right-8">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="w-[92vw] sm:w-[400px] h-[550px] max-h-[calc(100vh-140px)] mb-4 rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white flex flex-col relative"
            style={{
              boxShadow: "0 12px 40px -10px rgba(255, 96, 20, 0.15)",
            }}
          >
            {/* Custom Clear Confirmation Dialog Overlay */}
            <AnimatePresence>
              {showConfirmClear && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-6"
                >
                  <motion.div
                    initial={{ scale: 0.9, y: 15 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 15 }}
                    className="bg-white border border-slate-200 rounded-2xl p-5 w-full max-w-[280px] shadow-2xl text-center space-y-4"
                  >
                    <h4 className="text-sm font-bold text-slate-900">Clear Chat History?</h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      Are you sure you want to permanently clear all messages in this session?
                    </p>
                    <div className="flex gap-2 justify-center pt-1.5">
                      <button
                        type="button"
                        onClick={() => setShowConfirmClear(false)}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition cursor-pointer border border-slate-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={confirmClearChat}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#FF6014] text-white hover:bg-[#E5530F] transition cursor-pointer shadow-sm"
                      >
                        Clear
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Custom Toast Notification inside Chatbot Panel */}
            <AnimatePresence>
              {toastMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 25, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 25, scale: 0.9 }}
                  className="absolute bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#FF6014] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-orange-500/20 flex items-center gap-1.5 border border-orange-400"
                >
                  <span className="text-[14px]">✓</span>
                  <span>{toastMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center shadow-xs text-[#FF6014]">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                    Arko's Portfolio AI
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6014] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6014]"></span>
                    </span>
                  </h3>
                  <p className="text-[10px] text-slate-500 font-bold mt-0.5">Online &amp; Ready to Assist</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={triggerClearChatConfirm}
                  className="text-[10px] px-2.5 py-1 rounded-lg bg-white hover:bg-orange-50 text-slate-600 hover:text-[#FF6014] transition cursor-pointer font-bold border border-slate-200 hover:border-orange-200"
                  title="Clear Chat Session"
                >
                  Clear
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition cursor-pointer border border-slate-200"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Message Area */}
            <div
              data-lenis-prevent
              className="flex-1 overflow-y-auto p-3.5 space-y-3.5 custom-scrollbar bg-slate-50/40 overscroll-contain touch-pan-y"
            >
              {messages.map((msg, index) => {
                const isBot = msg.role === "assistant";
                return (
                  <div key={index} className={`flex gap-2.5 max-w-[92%] ${isBot ? "mr-auto" : "ml-auto flex-row-reverse"}`}>
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${
                        isBot 
                          ? "bg-orange-50 border-orange-200 text-[#FF6014]" 
                          : "bg-slate-100 border-slate-200 text-slate-700"
                      }`}
                    >
                      {isBot ? <Bot size={14} /> : <User size={14} />}
                    </div>
                    <div
                      className={`p-3 rounded-2xl text-xs sm:text-sm leading-relaxed font-medium break-words overflow-hidden min-w-0 ${
                        isBot
                          ? "bg-white text-slate-900 border border-slate-200/90 rounded-tl-none shadow-xs text-left"
                          : "bg-[#FF6014] text-white rounded-tr-none shadow-xs"
                      }`}
                      style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
                    >
                      <div className="whitespace-pre-wrap break-words">
                        {isBot ? renderFormattedContent(msg.content) : msg.content}
                      </div>
                    </div>
                  </div>
                );
              })}
              {isLoading && (
                <div className="flex gap-3 max-w-[85%] mr-auto">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center border bg-orange-50 border-orange-200 text-[#FF6014]">
                    <Bot size={14} className="animate-pulse" />
                  </div>
                  <div className="p-3 rounded-xl text-xs md:text-sm bg-white border border-slate-200/90 rounded-tl-none text-slate-500 italic font-medium">
                    AI is writing response...
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Starter Chips */}
            <div
              data-lenis-prevent
              className="p-2.5 border-t border-slate-200/80 bg-white flex flex-wrap gap-1.5 max-h-[90px] overflow-y-auto custom-scrollbar overscroll-contain touch-pan-y"
            >
              {starterPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickPrompt(prompt.text)}
                  disabled={isLoading}
                  className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-slate-50 hover:bg-orange-50 border border-slate-200 text-slate-800 hover:text-[#FF6014] hover:border-orange-300 transition cursor-pointer flex items-center gap-1.5 shadow-2xs"
                >
                  {prompt.icon}
                  <span>{prompt.label}</span>
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 border-t border-slate-200 bg-white flex gap-2 items-center">
              <input
                type="text"
                placeholder="Ask something..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl text-xs md:text-sm bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FF6014] focus:ring-1 focus:ring-[#FF6014] transition font-medium"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#FF6014] hover:bg-[#E5530F] text-white transition disabled:opacity-40 disabled:hover:bg-[#FF6014] cursor-pointer shadow-md shadow-orange-500/20"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-2xl bg-white border border-slate-200/90 shadow-2xl flex items-center justify-center cursor-pointer relative group transition-all duration-300"
        style={{
          boxShadow: "0 10px 30px -5px rgba(74, 37, 116, 0.2), 0 4px 12px -2px rgba(0, 0, 0, 0.08)",
          outline: "none",
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white shadow-md"
            >
              <X size={20} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative flex items-center justify-center"
            >
              <div className="w-10 h-10 rounded-full bg-[#4A2574] group-hover:bg-[#3D1D60] transition-colors flex items-center justify-center text-white shadow-md">
                <MessageCircle size={20} className="text-white fill-white" />
              </div>
              {/* Notification Dot */}
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6014] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#FF6014] border-2 border-white"></span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
