"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SystemStatus({ isError }: { isError: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`p-4 sm:p-5 rounded-2xl flex items-center justify-between border transition-all duration-300 shadow-sm hover:shadow-md ${
        isError
          ? "bg-red-50 border-red-300 hover:border-red-400"
          : "bg-emerald-50 border-emerald-300 hover:border-emerald-400"
      }`}
      role="status"
      aria-live="polite"
      aria-label={isError ? "Backend connection error" : "Backend connected"}
    >
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center">
          <motion.span
            className={`absolute inline-flex h-3 w-3 rounded-full ${
              isError ? "bg-red-400" : "bg-emerald-400"
            }`}
            animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <span
            className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
              isError ? "bg-red-500" : "bg-emerald-500"
            }`}
          />
        </div>
        <span
          className={`text-[10px] sm:text-xs font-black uppercase tracking-widest font-['Bai_Jamjuree'] ${
            isError ? "text-red-600" : "text-emerald-600"
          }`}
        >
          {isError ? "Backend Error" : "Backend Connected"}
        </span>
      </div>
      <div className="hidden sm:block text-[9px] font-bold text-black/40 uppercase tracking-widest font-['Bai_Jamjuree']">
        Version 2.0.4 · April 2026
      </div>
    </motion.div>
  );
}