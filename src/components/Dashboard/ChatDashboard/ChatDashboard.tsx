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
  Activity,
  RefreshCw,
  Clock,
  Trash,
  Search,
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
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Simulator State
  const [simMessages, setSimMessages] = useState<
    Array<{ role: string; content: string }>
  >([
    {
      role: "assistant",
      content:
        "Hello! I am Arko's AI Portfolio Assistant. How can I help you test our chat flows today?",
    },
  ]);
  const [simInput, setSimInput] = useState("");
  const [simSessionId, setSimSessionId] = useState<string | null>(null);
  const [isSimLoading, setIsSimLoading] = useState(false);
  const simEndRef = useRef<HTMLDivElement>(null);
  const logEndRef = useRef<HTMLDivElement>(null);

  // Fetch all chat sessions & stats
  const { data, isLoading, isError, refetch } = useQuery<DashboardChatsResponse>({
    queryKey: ["dashboard-chats"],
    queryFn: async () =>
      (await axios.get<DashboardChatsResponse>("/api/chat/dashboard")).data,
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
    },
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
  const filteredSessions =
    data?.sessions.filter(
      (session) =>
        session.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.messages.some((m) =>
          m.content.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
    ) || [];

  const selectedSession = data?.sessions.find(
    (s) => s.id === selectedSessionId,
  );

  // Send simulator message
  const handleSendSim = async (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const textToSend = customText || simInput;
    if (!textToSend.trim() || isSimLoading) return;

    if (!customText) {
      setSimInput("");
    }

    const newUserMsg = { role: "user", content: textToSend };
    setSimMessages((prev) => [...prev, newUserMsg]);
    setIsSimLoading(true);

    try {
      const chatHistory = simMessages.map((m) => ({
        role: m.role,
        text: m.content,
      }));
      chatHistory.push({ role: "user", text: textToSend });

      const res = await axios.post("/api/chat", {
        messages: chatHistory,
        sessionId: simSessionId || undefined,
        userName: "Dashboard Tester",
      });

      if (res.data.reply) {
        setSimMessages((prev) => [
          ...prev,
          { role: "assistant", content: res.data.reply },
        ]);
      }
      if (res.data.sessionId) {
        setSimSessionId(res.data.sessionId);
      }

      queryClient.invalidateQueries({ queryKey: ["dashboard-chats"] });
    } catch (err) {
      console.error(err);
      setSimMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Error communicating with AI. Please make sure GEMINI_API_KEY / OPENROUTER_API_KEY is configured in your .env file.",
        },
      ]);
    } finally {
      setIsSimLoading(false);
    }
  };

  const clearTesterSession = () => {
    setSimMessages([
      {
        role: "assistant",
        content:
          "Hello! I am Arko's AI Portfolio Assistant. How can I help you test our chat flows today?",
      },
    ]);
    setSimSessionId(null);
  };

  const presetQueries = [
    {
      label: "Developer Skills",
      text: "What programming languages and frameworks do you use?",
    },
    {
      label: "Recent Projects",
      text: "Show me some of your recent web projects.",
    },
    { label: "Who built you?", text: "Who is your developer/creator?" },
    { label: "Experience Details", text: "Where have you worked before?" },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 space-y-6">
        {/* ===== Header ===== */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-2 mb-2 font-['Bai_Jamjuree']">
              <Sparkles className="text-[#FF6014] w-4 h-4" />
              <span className="text-[9px] uppercase tracking-[0.22em] text-black/50 font-black">
                AI Customer Service
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight font-['Bai_Jamjuree'] text-black">
              Arko&apos;s Portfolio AI Manager
            </h1>
            <p className="text-xs sm:text-sm text-black/60 font-medium mt-1">
              Monitor real-time user query sessions, inspect logs, and run agent
              simulations.
            </p>
          </div>
          <button
            onClick={() => refetch()}
            className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest bg-white border border-gray-200 hover:border-[#FF6014] text-black/70 hover:text-[#FF6014] transition cursor-pointer font-['Bai_Jamjuree'] shadow-sm hover:shadow-md"
          >
            <RefreshCw
              size={14}
              className={isLoading ? "animate-spin text-[#FF6014]" : "text-[#FF6014]"}
            />
            Refresh Data
          </button>
        </header>

        {/* ===== Stats Grid ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="text-[10px] font-black text-black/50 uppercase tracking-widest font-['Bai_Jamjuree']">
              Total Conversations
            </div>
            <div className="text-2xl font-black mt-2 text-[#FF6014] font-['Bai_Jamjuree']">
              {isLoading ? "…" : data?.stats.totalSessions ?? 0}
            </div>
            <div className="text-[10px] text-black/50 mt-1 font-medium">
              Active customer support threads
            </div>
          </div>
          <div className="p-5 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="text-[10px] font-black text-black/50 uppercase tracking-widest font-['Bai_Jamjuree']">
              Total AI Messages
            </div>
            <div className="text-2xl font-black mt-2 text-black font-['Bai_Jamjuree']">
              {isLoading ? "…" : data?.stats.totalMessages ?? 0}
            </div>
            <div className="text-[10px] text-black/50 mt-1 font-medium">
              Total exchanged dialogs
            </div>
          </div>
          <div className="p-5 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="text-[10px] font-black text-black/50 uppercase tracking-widest font-['Bai_Jamjuree']">
              Avg Messages / Session
            </div>
            <div className="text-2xl font-black mt-2 text-[#FF6014] font-['Bai_Jamjuree']">
              {isLoading ? "…" : data?.stats.avgMessagesPerSession ?? "0.0"}
            </div>
            <div className="text-[10px] text-black/50 mt-1 font-medium">
              Engagement density metric
            </div>
          </div>
          <div className="p-5 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
            <div>
              <div className="text-[10px] font-black text-black/50 uppercase tracking-widest font-['Bai_Jamjuree']">
                Gemini Status
              </div>
              <div className="text-xs font-black mt-2 text-emerald-700 flex items-center gap-1.5 font-['Bai_Jamjuree']">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                API Online
              </div>
              <div className="text-[10px] text-black/50 mt-1 font-medium">
                OpenRouter Gateway
              </div>
            </div>
            <Activity className="text-rose-400/40 w-9 h-9" />
          </div>
        </div>

        {/* ===== Main Grid ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px] items-stretch">
          {/* ===== Left Column: Sessions List ===== */}
          <div className="lg:col-span-4 rounded-2xl border border-gray-200 bg-white flex flex-col h-[600px] overflow-hidden shadow-sm">
            <div className="p-4 border-b border-gray-100 flex flex-col gap-3 bg-gray-50/60">
              <div className="flex items-center justify-between">
                <h2 className="text-[10px] font-black tracking-widest uppercase text-black/50 font-['Bai_Jamjuree']">
                  Conversations List
                </h2>
                {filteredSessions.length > 0 && (
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#FF6014]/10 text-[#FF6014] border border-[#FF6014]/20">
                    {filteredSessions.length}
                  </span>
                )}
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-black/30" />
                <input
                  type="text"
                  placeholder="Search user name or message..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-white border border-gray-200 text-black placeholder:text-black/30 focus:outline-none focus:border-[#FF6014] focus:ring-2 focus:ring-[#FF6014]/10 transition font-medium"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
              {isLoading ? (
                <div className="h-full flex items-center justify-center text-xs text-black/50 font-medium">
                  Loading conversations...
                </div>
              ) : filteredSessions.length === 0 ? (
                <div className="h-full flex items-center justify-center text-xs text-black/50 font-medium">
                  No conversations found
                </div>
              ) : (
                filteredSessions.map((session) => {
                  const isActive = session.id === selectedSessionId;
                  const lastMsg =
                    session.messages[session.messages.length - 1];
                  const lastMsgText = lastMsg
                    ? lastMsg.content
                    : "No messages yet";
                  const date = new Date(session.updatedAt);
                  const timeAgo = date.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  return (
                    <button
                      key={session.id}
                      onClick={() => setSelectedSessionId(session.id)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer block ${
                        isActive
                          ? "bg-[#FF6014]/5 border-[#FF6014] text-black shadow-sm"
                          : "bg-white border-gray-200 hover:bg-gray-50 hover:border-[#FF6014] text-black/70"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black truncate max-w-[180px] font-['Bai_Jamjuree'] text-black">
                          {session.userName}
                        </span>
                        <span className="text-[9px] font-bold text-black/50 flex items-center gap-1 font-mono">
                          <Clock size={10} className="text-[#FF6014]" />{" "}
                          {timeAgo}
                        </span>
                      </div>
                      <p className="text-[11px] text-black/60 truncate mt-1 font-medium">
                        {lastMsgText}
                      </p>
                      <div className="mt-2.5 flex items-center justify-between text-[9px] text-black/50 font-mono font-medium">
                        <span className="px-1.5 py-0.5 rounded bg-gray-100">
                          {session.messages.length} messages
                        </span>
                        <span className="truncate max-w-[120px]">
                          {session.id.split("-")[0]}...
                        </span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {data && data.sessions.length > 0 && (
              <div className="p-3 border-t border-gray-100 bg-gray-50/60">
                <button
                  onClick={() => {
                    if (
                      confirm(
                        "Are you sure you want to clear all chat logs? This cannot be undone.",
                      )
                    ) {
                      deleteSessionMutation.mutate(null);
                    }
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-black uppercase tracking-widest text-red-600 hover:text-white bg-red-50 hover:bg-red-600 border border-red-200 hover:border-red-600 transition cursor-pointer font-['Bai_Jamjuree']"
                >
                  <Trash2 size={12} /> Clear All Logs
                </button>
              </div>
            )}
          </div>

          {/* ===== Center Column: Transcript Viewer ===== */}
          <div className="lg:col-span-5 rounded-2xl border border-gray-200 bg-white flex flex-col h-[600px] overflow-hidden shadow-sm">
            {selectedSession ? (
              <>
                {/* Header */}
                <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/60">
                  <div>
                    <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-[#FF6014] font-['Bai_Jamjuree']">
                      Session Transcript
                    </h3>
                    <div className="font-black text-sm mt-0.5 text-black font-['Bai_Jamjuree']">
                      {selectedSession.userName}
                    </div>
                    <div className="text-[9px] text-black/50 font-mono mt-0.5">
                      {selectedSession.id}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm("Delete this conversation session?")) {
                        deleteSessionMutation.mutate(selectedSession.id);
                      }
                    }}
                    className="p-2 rounded-xl bg-red-50 border border-red-200 text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600 transition cursor-pointer"
                    title="Delete Session"
                  >
                    <Trash size={14} />
                  </button>
                </div>

                {/* Message List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-gray-50/40">
                  {selectedSession.messages.map((message) => {
                    const isBot = message.role === "assistant";
                    return (
                      <div
                        key={message.id}
                        className={`flex gap-3 max-w-[88%] ${
                          isBot ? "mr-auto" : "ml-auto flex-row-reverse"
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 border ${
                            isBot
                              ? "bg-[#FF6014]/10 border-[#FF6014]/20 text-[#FF6014]"
                              : "bg-blue-50 border-blue-200 text-blue-600"
                          }`}
                        >
                          {isBot ? <Bot size={14} /> : <User size={14} />}
                        </div>
                        <div
                          className={`p-3.5 rounded-2xl text-xs leading-relaxed font-medium ${
                            isBot
                              ? "bg-white text-black/90 rounded-tl-none border border-gray-200 shadow-sm"
                              : "bg-[#FF6014] text-white rounded-tr-none border border-[#FF6014]"
                          }`}
                        >
                          <p className="whitespace-pre-wrap">
                            {message.content}
                          </p>
                          <div
                            className={`text-[8px] mt-1.5 text-right font-mono font-medium ${
                              isBot ? "text-black/40" : "text-white/80"
                            }`}
                          >
                            {new Date(message.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={logEndRef} />
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-[#FF6014]/10 border border-[#FF6014]/20 flex items-center justify-center">
                  <MessageSquare size={24} className="text-[#FF6014]" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest font-['Bai_Jamjuree'] text-black/60">
                    No Session Selected
                  </p>
                  <p className="text-xs text-black/50 font-medium mt-1 max-w-[220px]">
                    Select a user thread on the left to inspect conversation
                    logs.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ===== Right Column: Simulator ===== */}
          <div className="lg:col-span-3 rounded-2xl border border-gray-200 bg-white flex flex-col h-[600px] overflow-hidden shadow-sm">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/60">
              <div>
                <h2 className="text-[10px] font-black tracking-widest uppercase text-blue-600 font-['Bai_Jamjuree']">
                  AI Workflow Tester
                </h2>
                <p className="text-[10px] text-black/50 font-medium mt-0.5">
                  Chat directly with the bot
                </p>
              </div>
              {simSessionId && (
                <button
                  onClick={clearTesterSession}
                  className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 hover:border-[#FF6014] text-black/60 hover:text-[#FF6014] transition cursor-pointer font-['Bai_Jamjuree']"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Simulator Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar bg-gray-50/40">
              {simMessages.map((msg, index) => {
                const isBot = msg.role === "assistant";
                return (
                  <div
                    key={index}
                    className={`flex gap-2 max-w-[92%] ${
                      isBot ? "mr-auto" : "ml-auto flex-row-reverse"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 border ${
                        isBot
                          ? "bg-[#FF6014]/10 border-[#FF6014]/20 text-[#FF6014]"
                          : "bg-blue-50 border-blue-200 text-blue-600"
                      }`}
                    >
                      {isBot ? <Bot size={10} /> : <User size={10} />}
                    </div>
                    <div
                      className={`p-2.5 rounded-xl text-[11px] leading-relaxed font-medium ${
                        isBot
                          ? "bg-white text-black/90 border border-gray-200 rounded-tl-none shadow-sm"
                          : "bg-blue-600 text-white border border-blue-600 rounded-tr-none"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                );
              })}
              {isSimLoading && (
                <div className="flex gap-2 max-w-[92%] mr-auto">
                  <div className="w-5 h-5 rounded-lg flex items-center justify-center border bg-[#FF6014]/10 border-[#FF6014]/20 text-[#FF6014]">
                    <Bot size={10} className="animate-pulse" />
                  </div>
                  <div className="p-2.5 rounded-xl text-[11px] bg-white border border-gray-200 rounded-tl-none text-black/40 italic font-medium shadow-sm">
                    Bot is typing...
                  </div>
                </div>
              )}
              <div ref={simEndRef} />
            </div>

            {/* Preset Chips */}
            <div className="p-2.5 border-t border-gray-100 bg-gray-50/60 flex flex-wrap gap-1.5">
              {presetQueries.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendSim(undefined, q.text)}
                  disabled={isSimLoading}
                  className="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg bg-white hover:bg-[#FF6014]/5 border border-gray-200 hover:border-[#FF6014] text-black/60 hover:text-[#FF6014] transition cursor-pointer font-['Bai_Jamjuree'] disabled:opacity-40"
                >
                  {q.label}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSendSim}
              className="p-2.5 border-t border-gray-100 bg-white flex gap-1.5 items-center"
            >
              <input
                type="text"
                placeholder="Ask simulator..."
                value={simInput}
                onChange={(e) => setSimInput(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl text-xs bg-white border border-gray-200 text-black placeholder:text-black/30 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition font-medium"
                disabled={isSimLoading}
              />
              <button
                type="submit"
                disabled={isSimLoading || !simInput.trim()}
                className="w-8 h-8 rounded-xl flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white transition disabled:opacity-40 cursor-pointer shadow-sm hover:shadow-md"
              >
                <Send size={12} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}