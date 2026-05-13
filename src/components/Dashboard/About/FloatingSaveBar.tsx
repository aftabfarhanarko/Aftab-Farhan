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
        className="bg-foreground/90 backdrop-blur-2xl px-3 py-2 rounded-full shadow-[0_16px_40px_rgba(0,0,0,0.5)] border border-white/20 flex items-center justify-between gap-3"
      >
        <div className="pl-3">
          <span className="text-background text-[9px] font-black uppercase tracking-[0.2em] opacity-40 block">
            Dashboard
          </span>
          <p className="text-background text-[11px] font-bold -mt-0.5 leading-tight">
            About Editor
          </p>
        </div>
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 px-5 py-3 bg-white text-black rounded-full font-black text-[11px] uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 whitespace-nowrap"
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

