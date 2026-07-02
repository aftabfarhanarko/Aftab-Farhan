"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Tool {
  id: string;
  name: string;
  type: string;
  description: string;
  color: string;
  accentColor: string;
  usage: number;
  role: string;
  logoUrl: string;
}

interface AIHighlightCardProps {
  selectedAIInfo: Tool;
}

export default function AIHighlightCard({ selectedAIInfo }: AIHighlightCardProps) {
  return (
    <div className="lg:col-span-4 h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedAIInfo.id}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
          className="p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.02] relative overflow-hidden flex flex-col h-full justify-between min-h-[350px]"
        >
          <div className="absolute -left-16 -bottom-16 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ backgroundColor: selectedAIInfo.color }} />
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-2xl bg-black/[0.04] dark:bg-white/[0.04] border border-black/5 dark:border-white/5 flex items-center justify-center w-16 h-16">
                <img src={selectedAIInfo.logoUrl} alt={selectedAIInfo.name} className="w-12 h-12 object-contain rounded-lg" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-foreground leading-tight">{selectedAIInfo.name}</h4>
                <span className="text-xs text-black/50 dark:text-white/50">{selectedAIInfo.type}</span>
              </div>
            </div>
            <div className="space-y-4 text-left">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-black/40 dark:text-white/40 block mb-1">Primary Role in Stack</span>
                <p className="text-sm font-semibold text-foreground">{selectedAIInfo.role}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-black/40 dark:text-white/40 block mb-1">Capabilities & Integration</span>
                <p className="text-xs sm:text-sm text-black/60 dark:text-white/60 leading-relaxed">{selectedAIInfo.description}</p>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs">
            <span className="text-black/40 dark:text-white/40">Status</span>
            <span className="flex items-center gap-1.5 font-bold text-emerald-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Active Tool
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
