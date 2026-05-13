"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { ActionItem } from "./types";

export default function QuickActions({ actions }: { actions: ActionItem[] }) {
  return (
    <section>
      <h2 className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.28em] text-white/35 mb-3 sm:mb-4 px-0.5">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {actions.map((a, i) => (
          <Link href={a.href} key={a.title}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/10 hover:border-white/20 hover:from-white/[0.07] transition-all group flex items-center gap-4"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white text-black flex items-center justify-center shrink-0 group-hover:rotate-6 transition-transform">
                <a.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm sm:text-base font-bold leading-tight mb-0.5 truncate">
                  {a.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-white/40 font-medium truncate">
                  {a.desc}
                </p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
