"use client";

import React from "react";
import { motion } from "framer-motion";
import { AtSign, MessageSquare, Trash2, User } from "lucide-react";
import type { ContactMessage } from "./types";

export default function MessageDetailView({
  message,
  onDelete,
}: {
  message: ContactMessage | null;
  onDelete: (id: string) => void;
}) {
  if (!message) {
    return (
      <div className="h-full min-h-[400px] border border-dashed border-gray-300 rounded-3xl flex flex-col items-center justify-center text-center p-10 bg-white">
        <div className="w-16 h-16 rounded-2xl bg-[#FF6014]/10 border border-[#FF6014]/20 flex items-center justify-center mb-5">
          <MessageSquare className="w-7 h-7 text-[#FF6014]" />
        </div>
        <h3 className="text-lg font-black mb-2 text-black font-['Bai_Jamjuree']">
          Select a message
        </h3>
        <p className="text-xs text-black/50 font-medium max-w-xs">
          Choose an inquiry from the list to view full details and respond.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      key={message.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 lg:p-10 sticky top-10 shadow-sm"
    >
      {/* ===== Header: Avatar + Name/Email + Delete ===== */}
      <div className="flex justify-between items-start mb-8 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-[#FF6014]/10 border border-[#FF6014]/20 flex items-center justify-center shrink-0">
            <User className="w-5 h-5 text-[#FF6014]" />
          </div>
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-black text-black truncate font-['Bai_Jamjuree']">
              {message.name}
            </h2>
            <p className="text-xs sm:text-sm font-medium text-black/60 flex items-center gap-1 truncate">
              <AtSign className="w-3 h-3 shrink-0" /> {message.email}
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            if (!confirm("Delete this message?")) return;
            onDelete(message.id);
          }}
          className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl hover:bg-red-600 hover:text-white hover:border-red-600 transition-all shrink-0"
          type="button"
          aria-label="Delete message"
        >
          <Trash2 className="w-4.5 h-4.5" />
        </button>
      </div>

      {/* ===== Body: Subject + Message ===== */}
      <div className="space-y-6">
        <div className="space-y-1.5">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/50 font-['Bai_Jamjuree']">
            Subject
          </span>
          <p className="text-base sm:text-lg font-black text-black font-['Bai_Jamjuree']">
            {message.subject}
          </p>
        </div>

        <div className="space-y-1.5">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/50 font-['Bai_Jamjuree']">
            Message
          </span>
          <div className="p-5 sm:p-6 rounded-2xl bg-gray-50 border border-gray-200 text-black/80 leading-relaxed font-medium whitespace-pre-wrap text-sm">
            {message.message}
          </div>
        </div>

        {/* ===== Action: Reply via Email ===== */}
        <div className="pt-4">
          <a
            href={`mailto:${message.email}`}
            className="block w-full py-3.5 bg-[#FF6014] text-white rounded-xl font-black uppercase tracking-widest text-center text-xs sm:text-sm hover:bg-[#e5540f] hover:scale-[1.01] active:scale-[0.99] transition-all shadow-sm hover:shadow-md font-['Bai_Jamjuree']"
          >
            Reply via Email
          </a>
        </div>
      </div>
    </motion.div>
  );
}