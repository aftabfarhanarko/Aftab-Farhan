
"use client";

import React, { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  Send,
  Sparkles,
  Bot,
  User,
  MessageSquare,
  Calendar,
  Activity,
  RefreshCw,
  Clock,
  ArrowRight,
  Sparkle,
  Trash
} from "lucide-react";

interface Message {
  id: string;
  role: string;
  content: string;
  createdAt: string;
}

interface ChatSession {
  id: string;
  userName: string;
  userId: string | null;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
}

interface DashboardChatsResponse {
  sessions: ChatSession[];
  stats: {
    totalSessions: number;
    totalMessages: number;
    avgMessagesPerSession: string;
  };
}

export default function ChatDashboard() {
  const queryClient = useQueryClient();
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Simulator State
  const [simMessages, setSimMessages] = useState<Array<{ role: string; content: string }>>([
    { role: "assistant", content: "Hello! I am Arko's AI Portfolio Assistant. How can I help you test our chat flows today?" }
  ]);
  const [simInput, setSimInput] = useState("");
  const [simSessionId, setSimSessionId] = useState<string | null>(null);
  const [isSimLoading, setIsSimLoading] = useState(false);
  const simEndRef = useRef<HTMLDivElement>(null);
  const logEndRef = useRef<HTMLDivElement>(null);

  // Fetch all chat sessions & stats
  const { data, isLoading, isError, refetch } = useQuery<DashboardChatsResponse>({
    queryKey: ["dashboard-chats"],
    queryFn: async () => (await axios.get<DashboardChatsResponse>("/api/chat/dashboard")).data,
  });

  // Delete session mutation
  const deleteSessionMutation = useMutation({
    mutationFn: async (id: string | null) => {
      const url = id ? `/api/chat/dashboard?id=${id}` : "/api/chat/dashboard";
      return (await axios.delete(url)).data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard-chats"] });
      if (selectedSessionId) {
        setSelectedSessionId(null);
      }
    }
  });

  // Scroll simulator to bottom
  useEffect(() => {
    simEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [simMessages]);

  // Scroll conversation log to bottom
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedSessionId, data?.sessions]);

  // Filtered Sessions
  const filteredSessions = data?.sessions.filter(session =>
    session.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.messages.some(m => m.content.toLowerCase().includes(searchQuery.toLowerCase()))
  ) || [];

  const selectedSession = data?.sessions.find(s => s.id === selectedSessionId);

  // Send simulator message
  const handleSendSim = async (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const textToSend = customText || simInput;
    if (!textToSend.trim() || isSimLoading) return;

    if (!customText) {
      setSimInput("");
    }

    const newUserMsg = { role: "user", content: textToSend };
    setSimMessages(prev => [...prev, newUserMsg]);
    setIsSimLoading(true);

    try {
      // API call requires messages to match { role: string, text: string } or similar
      const chatHistory = simMessages.map(m => ({
        role: m.role,
        text: m.content
      }));
      chatHistory.push({ role: "user", text: textToSend });

      const res = await axios.post("/api/chat", {
        messages: chatHistory,
        sessionId: simSessionId || undefined,
        userName: "Dashboard Tester"
      });

      if (res.data.reply) {
        setSimMessages(prev => [...prev, { role: "assistant", content: res.data.reply }]);
      }
      if (res.data.sessionId) {
        setSimSessionId(res.data.sessionId);
      }

      // Invalidate dashboard chats list so the simulator conversations show up in logs
      queryClient.invalidateQueries({ queryKey: ["dashboard-chats"] });
    } catch (err) {
      console.error(err);
      setSimMessages(prev => [...prev, { role: "assistant", content: "Error communicating with AI. Please make sure GEMINI_API_KEY / OPENROUTER_API_KEY is configured in your .env file." }]);
    } finally {
      setIsSimLoading(false);
    }
  };

  const clearTesterSession = () => {
    setSimMessages([
      { role: "assistant", content: "Hello! I am Arko's AI Portfolio Assistant. How can I help you test our chat flows today?" }
    ]);
    setSimSessionId(null);
  };

  const presetQueries = [
    { label: "Developer Skills", text: "What programming languages and frameworks do you use?" },
    { label: "Recent Projects", text: "Show me some of your recent web projects." },
    { label: "Who built you?", text: "Who is your developer/creator?" },
    { label: "Experience Details", text: "Where have you worked before?" }
  ];

  return (
    <div className="w-full space-y-8 text-white">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="text-rose-500 w-5 h-5" />
            <span className="text-xs uppercase tracking-widest text-white/30 font-bold">AI Customer Service</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Arko's Portfolio AI Manager</h1>
          <p className="text-xs sm:text-sm text-white/45 font-medium mt-1">
            Monitor real-time user query sessions, inspect logs, and run agent simulations.
          </p>
        </div>
        <button
          onClick={() => refetch()}
          className="self-start sm:self-auto flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition cursor-pointer"
        >
          <RefreshCw size={12} className={isLoading ? "animate-spin text-rose-400" : "text-white/60"} />
          Refresh Data
        </button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-md">
          <div className="text-xs font-semibold text-white/40 uppercase tracking-wider">Total Conversations</div>
          <div className="text-2xl font-black mt-2 text-rose-400">{isLoading ? "..." : data?.stats.totalSessions}</div>
          <div className="text-[10px] text-white/30 mt-1">Active customer support threads</div>
        </div>
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-md">
          <div className="text-xs font-semibold text-white/40 uppercase tracking-wider">Total AI Messages</div>
          <div className="text-2xl font-black mt-2 text-blue-400">{isLoading ? "..." : data?.stats.totalMessages}</div>
          <div className="text-[10px] text-white/30 mt-1">Total exchanged dialogs</div>
        </div>
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-md">
          <div className="text-xs font-semibold text-white/40 uppercase tracking-wider">Avg Messages / Session</div>
          <div className="text-2xl font-black mt-2 text-emerald-400">{isLoading ? "..." : data?.stats.avgMessagesPerSession}</div>
          <div className="text-[10px] text-white/30 mt-1">Engagement density metric</div>
        </div>
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-md flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-white/40 uppercase tracking-wider">Gemini status</div>
            <div className="text-sm font-bold mt-2 text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              API Online
            </div>
            <div className="text-[10px] text-white/30 mt-1">OpenRouter Gateway</div>
          </div>
          <Activity className="text-rose-500/20 w-10 h-10" />
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px] items-stretch">

        {/* Left Column: Sessions List (4/12 cols) */}
        <div className="lg:col-span-4 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-md flex flex-col h-[600px] overflow-hidden">
          <div className="p-4 border-b border-white/5 flex flex-col gap-3">
            <h2 className="text-sm font-bold tracking-wider uppercase text-white/50">Conversations List</h2>
            <input
              type="text"
              placeholder="Search user name or message..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg text-xs bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-rose-500/50 transition"
            />
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1.5 custom-scrollbar">
            {isLoading ? (
              <div className="h-full flex items-center justify-center text-xs text-white/40">Loading conversations...</div>
            ) : filteredSessions.length === 0 ? (
              <div className="h-full flex items-center justify-center text-xs text-white/40">No conversations found</div>
            ) : (
              filteredSessions.map((session) => {
                const isActive = session.id === selectedSessionId;
                const lastMsg = session.messages[session.messages.length - 1];
                const lastMsgText = lastMsg ? lastMsg.content : "No messages yet";
                const date = new Date(session.updatedAt);
                const timeAgo = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                return (
                  <button
                    key={session.id}
                    onClick={() => setSelectedSessionId(session.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer block ${isActive
                        ? "bg-rose-500/10 border-rose-500/30 text-white"
                        : "bg-white/[0.01] border-white/5 hover:bg-white/5 hover:border-white/10 text-white/60 hover:text-white"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold truncate max-w-[180px]">{session.userName}</span>
                      <span className="text-[9px] text-white/30 flex items-center gap-1 font-mono">
                        <Clock size={8} /> {timeAgo}
                      </span>
                    </div>
                    <p className="text-[11px] text-white/40 truncate mt-1">{lastMsgText}</p>
                    <div className="mt-2 flex items-center justify-between text-[9px] text-white/30 font-mono">
                      <span>{session.messages.length} messages</span>
                      <span className="truncate max-w-[120px]">{session.id.split("-")[0]}...</span>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {data && data.sessions.length > 0 && (
            <div className="p-3 border-t border-white/5 bg-black/10">
              <button
                onClick={() => {
                  if (confirm("Are you sure you want to clear all chat logs? This cannot be undone.")) {
                    deleteSessionMutation.mutate(null);
                  }
                }}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[10px] font-bold text-red-400 hover:text-red-300 bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 hover:border-red-500/20 transition cursor-pointer"
              >
                <Trash2 size={10} /> Clear All Logs
              </button>
            </div>
          )}
        </div>

        {/* Center Column: Transcript Viewer (5/12 cols) */}
        <div className="lg:col-span-5 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-md flex flex-col h-[600px] overflow-hidden">
          {selectedSession ? (
            <>
              {/* Header */}
              <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                <div>
                  <h3 className="text-xs font-bold text-rose-400">SESSION TRANSLCRIPT</h3>
                  <div className="font-extrabold text-sm mt-0.5">{selectedSession.userName}</div>
                  <div className="text-[9px] text-white/30 font-mono mt-0.5">{selectedSession.id}</div>
                </div>
                <button
                  onClick={() => {
                    if (confirm("Delete this conversation session?")) {
                      deleteSessionMutation.mutate(selectedSession.id);
                    }
                  }}
                  className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition cursor-pointer"
                  title="Delete Session"
                >
                  <Trash size={14} />
                </button>
              </div>

              {/* Message List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {selectedSession.messages.map((message) => {
                  const isBot = message.role === "assistant";
                  return (
                    <div
                      key={message.id}
                      className={`flex gap-3 max-w-[85%] ${isBot ? "mr-auto" : "ml-auto flex-row-reverse"}`}
                    >
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${isBot
                            ? "bg-rose-500/10 border-rose-500/20 text-rose-400"
                            : "bg-blue-500/10 border-blue-500/20 text-blue-400"
                          }`}
                      >
                        {isBot ? <Bot size={14} /> : <User size={14} />}
                      </div>
                      <div
                        className={`p-3 rounded-xl text-xs leading-relaxed ${isBot
                            ? "bg-white/5 text-white/90 rounded-tl-none border border-white/5"
                            : "bg-rose-500/15 text-white rounded-tr-none border border-rose-500/20"
                          }`}
                      >
                        <p className="whitespace-pre-wrap">{message.content}</p>
                        <div className="text-[8px] text-white/20 mt-1.5 text-right font-mono">
                          {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={logEndRef} />
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-white/30 space-y-3">
              <MessageSquare size={36} className="text-white/10" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider">No Session Selected</p>
                <p className="text-[11px] mt-1 max-w-[200px]">Select a user thread on the left to inspect conversation logs.</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Simulator (3/12 cols) */}
        <div className="lg:col-span-3 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-md flex flex-col h-[600px] overflow-hidden">
          <div className="p-4 border-b border-white/5 flex items-center justify-between bg-black/10">
            <div>
              <h2 className="text-xs font-bold text-blue-400">AI WORKFLOW TESTER</h2>
              <p className="text-[10px] text-white/40 mt-0.5">Chat directly with the bot</p>
            </div>
            {simSessionId && (
              <button
                onClick={clearTesterSession}
                className="text-[9px] px-1.5 py-0.5 rounded border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white/60 transition cursor-pointer"
              >
                Reset Chat
              </button>
            )}
          </div>

          {/* Simulator Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar bg-black/5">
            {simMessages.map((msg, index) => {
              const isBot = msg.role === "assistant";
              return (
                <div key={index} className={`flex gap-2 max-w-[90%] ${isBot ? "mr-auto" : "ml-auto flex-row-reverse"}`}>
                  <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 text-[10px] border ${isBot ? "bg-rose-500/10 border-rose-500/20 text-rose-400" : "bg-blue-500/10 border-blue-500/20 text-blue-400"
                    }`}>
                    {isBot ? <Bot size={10} /> : <User size={10} />}
                  </div>
                  <div className={`p-2.5 rounded-lg text-[11px] leading-relaxed ${isBot ? "bg-white/5 text-white/90 border border-white/5 rounded-tl-none" : "bg-blue-500/20 text-white border border-blue-500/30 rounded-tr-none"
                    }`}>
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              );
            })}
            {isSimLoading && (
              <div className="flex gap-2 max-w-[90%] mr-auto">
                <div className="w-5 h-5 rounded flex items-center justify-center border bg-rose-500/10 border-rose-500/20 text-rose-400">
                  <Bot size={10} className="animate-pulse" />
                </div>
                <div className="p-2.5 rounded-lg text-[11px] bg-white/5 border border-white/5 rounded-tl-none text-white/40 italic">
                  Bot is typing...
                </div>
              </div>
            )}
            <div ref={simEndRef} />
          </div>

          {/* Preset Chips */}
          <div className="p-2 border-t border-white/5 bg-black/10 flex flex-wrap gap-1">
            {presetQueries.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendSim(undefined, q.text)}
                disabled={isSimLoading}
                className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-white/60 hover:text-white transition cursor-pointer"
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendSim} className="p-2.5 border-t border-white/5 bg-white/[0.01] flex gap-1.5 items-center">
            <input
              type="text"
              placeholder="Ask simulator..."
              value={simInput}
              onChange={(e) => setSimInput(e.target.value)}
              className="flex-1 px-3 py-1.5 rounded-lg text-xs bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-rose-500/50 transition"
              disabled={isSimLoading}
            />
            <button
              type="submit"
              disabled={isSimLoading || !simInput.trim()}
              className="w-7 h-7 rounded-lg flex items-center justify-center bg-rose-600 hover:bg-rose-500 text-white transition disabled:opacity-40 disabled:hover:bg-rose-600 cursor-pointer"
            >
              <Send size={12} />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
