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
          className={`p-5 rounded-2xl border transition-all cursor-pointer group ${
            selectedId === msg.id
              ? "bg-white/10 border-white/20"
              : "bg-white/[0.03] border-white/5 hover:border-white/10"
          }`}
        >
          <div className="flex justify-between items-start mb-2">
            <h3
              className={`font-bold truncate pr-4 ${
                msg.status === "UNREAD" ? "text-white" : "text-white/40"
              }`}
            >
              {msg.name}
            </h3>
            <span
              className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                msg.status === "UNREAD"
                  ? "bg-green-500 text-black"
                  : "bg-white/5 text-white/20"
              }`}
            >
              {msg.status}
            </span>
          </div>
          <p className="text-xs text-white/40 font-medium mb-3 truncate">
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

