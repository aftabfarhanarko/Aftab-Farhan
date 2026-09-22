"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { SummaryItem } from "./types";

export default function DataSummary({ summary }: { summary: SummaryItem[] }) {
  return (
    <section>
      <h2 className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.28em] text-black/50 mb-3 sm:mb-4 px-0.5 font-['Bai_Jamjuree']">
        Data Summary
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
        {summary.map((item, i) => (
          <Link href={item.href} key={item.label}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-200 hover:border-[#FF6014] transition-all duration-300 group hover:-translate-y-0.5 shadow-sm hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-2">
                <item.icon className="w-5 h-5 text-black/40 group-hover:text-[#FF6014] transition-colors" />
                <div className="text-lg sm:text-xl font-black text-black font-['Bai_Jamjuree']">
                  {item.value}
                </div>
              </div>
              <div className="text-[9px] font-black uppercase tracking-widest text-black/50 truncate font-['Bai_Jamjuree']">
                {item.label}
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}