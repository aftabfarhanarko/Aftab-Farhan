"use client";

import React from "react";
import { motion } from "framer-motion";
import type { StatItem } from "./types";

export default function StatsGrid({ stats }: { stats: StatItem[] }) {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3.5 sm:gap-4">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          whileHover={{ y: -4, scale: 1.02 }}
          data-cursor-hover-x="3"
          className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-[#FF6014] transition-all duration-300 group cursor-default text-left relative overflow-hidden shadow-sm hover:shadow-lg"
        >
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#FF6014] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF6014]/10 border border-[#FF6014]/20 flex items-center justify-center text-[#FF6014] group-hover:scale-110 transition-transform">
              <s.icon className="w-5 h-5" />
            </div>
            <span className="w-2 h-2 rounded-full bg-[#FF6014] opacity-70 group-hover:opacity-100 group-hover:scale-125 transition-all" />
          </div>

          <div className="text-2xl sm:text-3xl font-black text-black leading-tight tracking-tight group-hover:text-[#FF6014] transition-colors">
            {s.value}
          </div>
          <div className="text-[11px] font-black uppercase tracking-wider text-black/50 mt-1">
            {s.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}