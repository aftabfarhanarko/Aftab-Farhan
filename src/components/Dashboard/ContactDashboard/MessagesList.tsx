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
      <div className="p-12 border border-dashed border-gray-300 rounded-2xl text-center bg-white">
        <div className="w-12 h-12 rounded-xl bg-[#FF6014]/10 border border-[#FF6014]/20 flex items-center justify-center mx-auto mb-4">
          <Inbox className="w-5 h-5 text-[#FF6014]" />
        </div>
        <p className="text-[10px] font-black uppercase tracking-widest text-black/40 font-['Bai_Jamjuree']">
          No messages yet
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {messages.map((msg) => {
        const isSelected = selectedId === msg.id;
        const isUnread = msg.status === "UNREAD";

        return (
          <motion.div
            key={msg.id}
            layout
            onClick={() => onSelect(msg)}
            className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer group ${
              isSelected
                ? "bg-white border-[#FF6014] shadow-md ring-2 ring-[#FF6014]/10"
                : "bg-white border-gray-200 hover:border-[#FF6014] hover:shadow-md shadow-sm"
            }`}
          >
            {/* Header row: name + status badge */}
            <div className="flex justify-between items-start mb-2">
              <h3
                className={`font-black truncate pr-4 font-['Bai_Jamjuree'] ${
                  isUnread ? "text-black" : "text-black/60"
                }`}
              >
                {msg.name}
              </h3>
              <span
                className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full font-['Bai_Jamjuree'] ${
                  isUnread
                    ? "bg-[#FF6014] text-white shadow-sm"
                    : "bg-gray-100 text-black/50 border border-gray-200"
                }`}
              >
                {msg.status}
              </span>
            </div>

            {/* Subject */}
            <p className="text-xs text-black/60 font-medium mb-3 truncate">
              {msg.subject}
            </p>

            {/* Footer row: date + view details */}
            <div className="flex items-center justify-between text-[10px] font-black text-black/40 uppercase tracking-wider font-['Bai_Jamjuree']">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#FF6014]" />
                {new Date(msg.createdAt).toLocaleDateString()}
              </span>
              <span className="group-hover:text-[#FF6014] transition-colors">
                View Details →
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}