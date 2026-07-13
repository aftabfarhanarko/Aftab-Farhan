// AIHighlightCard.tsx
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
    <div className="lg:col-span-4 h-full lg:sticky lg:top-24 lg:self-start">
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedAIInfo.id}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.25 }}
          className="relative p-6 rounded-3xl border bg-[#111114] flex flex-col h-full justify-between min-h-[360px] sm:min-h-[380px]"
          style={{
            borderColor: selectedAIInfo.color,
            boxShadow: `0 16px 32px -16px ${selectedAIInfo.color}33`,
          }}
        >
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div
                className="relative p-1.5 rounded-2xl bg-white flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 shrink-0"
                style={{ boxShadow: `0 4px 12px -3px ${selectedAIInfo.color}44` }}
              >
                <img
                  src={selectedAIInfo.logoUrl}
                  alt={selectedAIInfo.name}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>

              <div className="min-w-0 text-left">
                <h4 className="text-lg font-bold text-white leading-tight truncate">
                  {selectedAIInfo.name}
                </h4>
                <span className="text-xs font-semibold text-white/45">{selectedAIInfo.type}</span>
              </div>
            </div>

            <div className="space-y-4 text-left">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-white/35 block mb-1.5">
                  Primary Role in Stack
                </span>
                <p className="text-sm font-bold text-white/90">{selectedAIInfo.role}</p>
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-white/35 block mb-1.5">
                  Capabilities &amp; Integration
                </span>
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-medium">
                  {selectedAIInfo.description}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.07] flex items-center justify-between text-xs">
            <span className="text-white/40 font-mono">Status</span>
            <span className="flex items-center gap-1.5 font-bold text-emerald-400">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 animate-ping opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              Active Tool
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}