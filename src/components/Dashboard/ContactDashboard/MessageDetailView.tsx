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
      <div className="h-full min-h-[400px] border-2 border-dashed border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center text-center p-10">
        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
          <MessageSquare className="w-10 h-10 text-white/10" />
        </div>
        <h3 className="text-xl font-black mb-2">Select a message</h3>
        <p className="text-white/20 font-medium max-w-xs">
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
      className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 lg:p-10 sticky top-10"
    >
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
            <User className="w-6 h-6 text-white/40" />
          </div>
          <div>
            <h2 className="text-xl font-black">{message.name}</h2>
            <p className="text-sm font-medium text-white/40 flex items-center gap-1">
              <AtSign className="w-3 h-3" /> {message.email}
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            if (!confirm("Delete this message?")) return;
            onDelete(message.id);
          }}
          className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-colors"
          type="button"
          aria-label="Delete message"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
            Subject
          </span>
          <p className="text-lg font-bold text-white/80">{message.subject}</p>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
            Message
          </span>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-white/70 leading-relaxed font-medium whitespace-pre-wrap">
            {message.message}
          </div>
        </div>

        <div className="pt-4 flex gap-3">
          <a
            href={`mailto:${message.email}`}
            className="flex-1 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-center text-xs sm:text-sm hover:scale-[1.02] transition-transform"
          >
            Reply via Email
          </a>
        </div>
      </div>
    </motion.div>
  );
}

