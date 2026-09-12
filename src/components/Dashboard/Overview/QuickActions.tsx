"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { ActionItem } from "./types";
import { ArrowUpRight } from "lucide-react";

export default function QuickActions({ actions }: { actions: ActionItem[] }) {
  return (
    <section>
      <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#FF6014] mb-3 sm:mb-4 px-0.5 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#FF6014] inline-block animate-pulse" />
        Quick Management Actions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {actions.map((a, i) => (
          <Link href={a.href} key={a.title}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              whileHover={{ y: -3, scale: 1.01 }}
              className="p-4 sm:p-5 rounded-2xl glass-card-primary hover:border-orange-300 transition-all duration-300 group flex items-center justify-between gap-4 cursor-pointer shadow-xs hover:shadow-md relative overflow-hidden"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#FF6014]/10 border border-[#FF6014]/20 flex items-center justify-center text-[#FF6014] group-hover:scale-110 transition-transform">
                  <a.icon className="w-5 h-5" />
                </div>
                <div className="min-w-0 text-left">
                  <h3 className="text-sm sm:text-base font-black text-slate-900 leading-tight group-hover:text-[#FF6014] transition-colors truncate">
                    {a.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium truncate mt-0.5">
                    {a.desc}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4.5 h-4.5 text-slate-400 group-hover:text-[#FF6014] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
