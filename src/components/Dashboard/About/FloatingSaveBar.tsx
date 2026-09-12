"use client";

import React from "react";
import { motion } from "framer-motion";
import { Loader2, Save } from "lucide-react";

export default function FloatingSaveBar({ isSaving }: { isSaving: boolean }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-sm px-0">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          delay: 0.3,
          type: "spring",
          stiffness: 260,
          damping: 24,
        }}
        className="glass-card-primary px-4 py-2.5 rounded-full shadow-[0_16px_40px_rgba(0,0,0,0.3)] border border-black/10 dark:border-white/20 flex items-center justify-between gap-4"
      >
        <div className="pl-2">
          <span className="text-foreground/40 dark:text-white/40 text-[9px] font-black uppercase tracking-[0.2em] block font-['Bai_Jamjuree']">
            Dashboard
          </span>
          <p className="text-foreground dark:text-white text-[11px] font-black -mt-0.5 leading-tight font-['Bai_Jamjuree']">
            About Editor
          </p>
        </div>
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#FF6014] text-white rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-[#FF6014]/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 whitespace-nowrap shadow-lg shadow-[#FF6014]/25 font-['Bai_Jamjuree']"
        >
          {isSaving ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Save className="w-3.5 h-3.5" />
          )}
          {isSaving ? "Saving..." : "Save"}
        </button>
      </motion.div>
    </div>
  );
}

