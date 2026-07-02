"use client";
import React from "react";
import { motion } from "framer-motion";

export function TerminalCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="absolute -top-24 -left-6 hidden xl:block z-20"
    >
      <div className="rounded-xl border border-border bg-background/85 backdrop-blur-md shadow-2xl overflow-hidden w-52">
        <div className="flex items-center gap-1.5 px-3 py-2 bg-foreground/5 border-b border-foreground/15">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-foreground/70" />
          <span className="ml-2 text-[10px] text-foreground/30 font-mono">
            terminal
          </span>
        </div>
        <div className="p-3 font-mono text-[11px] space-y-1 text-left">
          <p className="text-foreground/40">$ git status</p>
          <p className="text-foreground">On branch main</p>
          <p className="text-foreground/40">$ deploy --prod</p>
          <p className="text-foreground">Build success</p>
        </div>
      </div>
    </motion.div>
  );
}

export function CurrentStackBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay: 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="absolute -bottom-20 right-0 hidden xl:block z-20"
    >
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="px-4 py-2.5 rounded-xl bg-background/85 border border-foreground/25 backdrop-blur-md shadow-xl"
      >
        <div className="text-[10px] font-black text-foreground/30 uppercase tracking-widest">
          Current Stack
        </div>
        <div className="text-xs font-bold text-foreground mt-0.5">
          TypeScript Next
        </div>
      </motion.div>
    </motion.div>
  );
}

export function FloatingIconBadges() {
  return (
    <>
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-6 right-2 p-3 rounded-xl bg-background/85 border border-foreground/25 backdrop-blur-md text-foreground/70 shadow-xl z-20 hover:text-foreground hover:scale-110 hover:border-border transition-all duration-200 cursor-pointer"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-0 p-3 rounded-xl bg-background/85 border border-foreground/25 backdrop-blur-md text-foreground/70 shadow-xl z-20 hover:text-foreground hover:scale-110 hover:border-border transition-all duration-200 cursor-pointer"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5V19A9 3 0 0 0 21 19V5" />
          <path d="M3 12A9 3 0 0 0 21 12" />
        </svg>
      </motion.div>

      <motion.div
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-xl bg-background/85 border border-foreground/25 backdrop-blur-md text-foreground/70 shadow-xl z-20 hover:text-foreground hover:scale-110 hover:border-border transition-all duration-200 cursor-pointer"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          <line x1="3" x2="21" y1="9" y2="9" />
          <line x1="9" x2="9" y1="21" y2="9" />
        </svg>
      </motion.div>
    </>
  );
}
