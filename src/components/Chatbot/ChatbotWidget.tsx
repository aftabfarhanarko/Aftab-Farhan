"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
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

export default function ChatbotWidget() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

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
      icon: <Code2 size={10} className="text-emerald-400" />, 
      text: "What programming languages and frameworks do you use?" 
    },
    { 
      label: "Projects", 
      icon: <FolderGit2 size={10} className="text-emerald-400" />, 
      text: "Show me some of your recent web projects." 
    },
    { 
      label: "Experience", 
      icon: <Briefcase size={10} className="text-emerald-400" />, 
      text: "Where have you worked before?" 
    },
    { 
      label: "Education", 
      icon: <GraduationCap size={10} className="text-emerald-400" />, 
      text: "Tell me about your educational background." 
    },
    { 
      label: "Soft Skills", 
      icon: <Brain size={10} className="text-emerald-400" />, 
      text: "What are your soft skills and communication strengths?" 
    },
    { 
      label: "AI Workflow", 
      icon: <Sparkles size={10} className="text-emerald-400" />, 
      text: "Can you explain your 6-stage AI-Native workflow (DeepSeek, Windsurf, Cursor, Grok, Antigravity, Trae)?" 
    },
    { 
      label: "Services", 
      icon: <Wrench size={10} className="text-emerald-400" />, 
      text: "What kind of development services do you offer to clients?" 
    },
  ];

  return (
    // Fixed positioning updated to place the chatbot on the right edge on desktop and bottom on mobile, avoiding overlays
    <div className="fixed z-50 font-sans bottom-24 right-4 md:bottom-44 md:right-8">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="w-[90vw] sm:w-[380px] h-[550px] mb-4 rounded-2xl overflow-hidden shadow-2xl border border-black/10 dark:border-zinc-800/80 flex flex-col relative"
            style={{
              background: isDark
                ? "linear-gradient(160deg, rgba(10, 10, 12, 0.96) 0%, rgba(20, 20, 25, 0.96) 100%)"
                : "linear-gradient(160deg, rgba(255, 255, 255, 0.98) 0%, rgba(245, 247, 250, 0.98) 100%)",
              backdropFilter: "blur(20px)",
              boxShadow: isDark
                ? "0 10px 40px -10px rgba(16, 185, 129, 0.2)"
                : "0 10px 40px -10px rgba(16, 185, 129, 0.1)",
            }}
          >
            {/* Custom Clear Confirmation Dialog Overlay */}
            <AnimatePresence>
              {showConfirmClear && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-6"
                >
                  <motion.div
                    initial={{ scale: 0.9, y: 15 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 15 }}
                    className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 w-full max-w-[280px] shadow-[0_10px_30px_rgba(0,0,0,0.5)] text-center space-y-4"
                  >
                    <h4 className="text-sm font-bold text-zinc-100">Clear Chat History?</h4>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      Are you sure you want to permanently clear all messages in this session?
                    </p>
                    <div className="flex gap-2 justify-center pt-1.5">
                      <button
                        type="button"
                        onClick={() => setShowConfirmClear(false)}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition cursor-pointer border border-zinc-700/50"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={confirmClearChat}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-500 transition cursor-pointer border border-emerald-500/30"
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
                  className="absolute bottom-20 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 border border-emerald-500"
                >
                  <span className="text-[14px]">✓</span>
                  <span>{toastMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Header */}
            <div className="p-4 border-b border-black/5 dark:border-zinc-800/60 flex items-center justify-between bg-black/[0.01] dark:bg-white/[0.02]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-emerald-500/30 flex items-center justify-center shadow-lg shadow-emerald-500/10 text-emerald-400">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5">
                    Arko's Portfolio AI
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  </h3>
                  <p className="text-[10px] text-slate-500 dark:text-zinc-500 font-medium mt-0.5">Online & Ready to Assist</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={triggerClearChatConfirm}
                  className="text-[10px] px-2 py-1 rounded bg-black/5 dark:bg-zinc-850 hover:bg-black/10 dark:hover:bg-zinc-800 text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-emerald-400 transition cursor-pointer font-bold border border-black/5 dark:border-zinc-800"
                  title="Clear Chat Session"
                >
                  Clear
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg bg-black/5 dark:bg-zinc-850 hover:bg-black/10 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-slate-855 dark:hover:text-zinc-200 transition cursor-pointer border border-black/5 dark:border-zinc-800"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-50/50 dark:bg-zinc-950/20">
              {messages.map((msg, index) => {
                const isBot = msg.role === "assistant";
                return (
                  <div key={index} className={`flex gap-3 max-w-[85%] ${isBot ? "mr-auto" : "ml-auto flex-row-reverse"}`}>
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${
                        isBot 
                          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500 dark:text-emerald-400" 
                          : "bg-zinc-500/10 border-zinc-500/20 text-zinc-500 dark:text-zinc-400"
                      }`}
                    >
                      {isBot ? <Bot size={13} /> : <User size={13} />}
                    </div>
                    <div
                      className={`p-3 rounded-xl text-xs md:text-sm leading-relaxed ${
                        isBot
                          ? "bg-white dark:bg-zinc-900/90 text-slate-800 dark:text-zinc-200 border border-slate-200 dark:border-zinc-800/80 rounded-tl-none shadow-sm"
                          : "bg-emerald-500/10 dark:bg-emerald-500/15 text-slate-900 dark:text-emerald-300 border border-emerald-500/20 dark:border-emerald-500/30 rounded-tr-none"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                );
              })}
              {isLoading && (
                <div className="flex gap-3 max-w-[85%] mr-auto">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center border bg-emerald-500/10 border-emerald-500/20 text-emerald-400">
                    <Bot size={13} className="animate-pulse" />
                  </div>
                  <div className="p-3 rounded-xl text-xs md:text-sm bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800/80 rounded-tl-none text-slate-400 dark:text-zinc-500 italic">
                    AI is writing response...
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Starter Chips - Dynamic Lucide Icons Rendered Inline */}
            <div className="p-2 border-t border-slate-200 dark:border-zinc-800/60 bg-slate-50 dark:bg-zinc-950/40 flex flex-wrap gap-1.5 max-h-[85px] overflow-y-auto custom-scrollbar">
              {starterPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickPrompt(prompt.text)}
                  disabled={isLoading}
                  className="text-[9px] font-bold px-2.5 py-1 rounded-full bg-white dark:bg-zinc-900/50 hover:bg-slate-100 dark:hover:bg-emerald-500/10 border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-emerald-400 hover:border-emerald-500/30 dark:hover:border-emerald-500/20 transition cursor-pointer flex items-center gap-1.5"
                >
                  {prompt.icon}
                  <span>{prompt.label}</span>
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 border-t border-slate-200 dark:border-zinc-800/60 bg-white dark:bg-zinc-950/60 flex gap-2 items-center">
              <input
                type="text"
                placeholder="Ask something..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 px-3.5 py-2 rounded-xl text-xs md:text-sm bg-slate-100 dark:bg-zinc-900/70 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-655 focus:outline-none focus:border-emerald-500/50 transition"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-8 h-8 rounded-xl flex items-center justify-center bg-emerald-600 hover:bg-emerald-500 text-white transition disabled:opacity-40 disabled:hover:bg-emerald-600 cursor-pointer shadow-lg shadow-emerald-500/20 border border-emerald-500/30"
              >
                <Send size={13} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button - Sleek techy glassmorphic style with emerald-glow shadow */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-2xl bg-zinc-950/90 dark:bg-zinc-900/90 border border-emerald-500/30 text-emerald-400 hover:text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.15)] flex items-center justify-center cursor-pointer relative group"
        style={{
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
            >
              <X size={24} className="text-emerald-400 group-hover:text-emerald-300" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative"
            >
              <MessageSquare size={22} className="text-emerald-400 group-hover:text-emerald-300" />
              {/* Pulsing Dot */}
              <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border border-black/40"></span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
