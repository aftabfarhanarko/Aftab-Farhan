"use client";

import React from "react";
import { motion } from "framer-motion";
import type { StatItem } from "./types";

export default function StatsGrid({ stats }: { stats: StatItem[] }) {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 hover:border-white/20 transition-colors group"
        >
          <div
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${s.color}`}
          >
            <s.icon className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="text-xl sm:text-2xl font-black mb-0.5">
            {s.value}
          </div>
          <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white/35 leading-tight">
            {s.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
