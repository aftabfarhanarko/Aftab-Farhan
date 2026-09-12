"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, Inbox } from "lucide-react";
import type { ContactMessage } from "./types";

export default function MessagesList({
  messages,
  selectedId,
  onSelect,
}: {
  messages: ContactMessage[];
  selectedId: string | null;
  onSelect: (msg: ContactMessage) => void;
}) {
  if (messages.length === 0) {
    return (
      <div className="p-12 border-2 border-dashed border-white/5 rounded-3xl text-center">
        <Inbox className="w-12 h-12 text-white/10 mx-auto mb-4" />
        <p className="text-white/40 font-bold uppercase tracking-widest text-xs">
          No messages yet
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <motion.div
          key={msg.id}
          layout
          onClick={() => onSelect(msg)}
          className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer group ${
            selectedId === msg.id
              ? "glass-card-primary border-[#FF6014]/60 shadow-lg shadow-[#FF6014]/10"
              : "glass-card-compact border-black/10 dark:border-white/10 hover:border-[#FF6014]/40"
          }`}
        >
          <div className="flex justify-between items-start mb-2">
            <h3
              className={`font-black truncate pr-4 font-['Bai_Jamjuree'] ${
                msg.status === "UNREAD" ? "text-foreground dark:text-white" : "text-foreground/50 dark:text-white/40"
              }`}
            >
              {msg.name}
            </h3>
            <span
              className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full font-['Bai_Jamjuree'] ${
                msg.status === "UNREAD"
                  ? "bg-[#FF6014] text-white shadow-md shadow-[#FF6014]/30"
                  : "bg-black/5 dark:bg-white/5 text-foreground/40 dark:text-white/30 border border-black/10 dark:border-white/10"
              }`}
            >
              {msg.status}
            </span>
          </div>
          <p className="text-xs text-foreground/60 dark:text-white/50 font-medium mb-3 truncate">
            {msg.subject}
          </p>
          <div className="flex items-center justify-between text-[10px] font-bold text-white/20 uppercase tracking-tighter">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />{" "}
              {new Date(msg.createdAt).toLocaleDateString()}
            </span>
            <span className="group-hover:text-white/40 transition-colors">
              View Details →
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

