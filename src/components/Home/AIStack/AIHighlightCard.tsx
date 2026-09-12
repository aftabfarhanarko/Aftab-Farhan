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
    <div className="lg:col-span-4 h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedAIInfo.id}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.25 }}
          className="relative p-6 rounded-3xl border bg-white flex flex-col h-full justify-between min-h-[320px] sm:min-h-[340px] shadow-xl"
          style={{
            borderColor: selectedAIInfo.color,
            boxShadow: `0 16px 36px -12px ${selectedAIInfo.color}30`,
          }}
        >
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div
                className="relative p-1.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 shrink-0 shadow-xs"
                style={{ boxShadow: `0 4px 12px -3px ${selectedAIInfo.color}33` }}
              >
                <img
                  src={selectedAIInfo.logoUrl}
                  alt={selectedAIInfo.name}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>

              <div className="min-w-0 text-left">
                <h4 className="text-xl font-bold text-slate-900 leading-tight truncate">
                  {selectedAIInfo.name}
                </h4>
                <span className="text-xs font-semibold text-slate-500">{selectedAIInfo.type}</span>
              </div>
            </div>

            <div className="space-y-4 text-left">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1.5">
                  Primary Role in Stack
                </span>
                <p className="text-base font-bold text-slate-900">{selectedAIInfo.role}</p>
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1.5">
                  Capabilities &amp; Integration
                </span>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                  {selectedAIInfo.description}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400 font-mono">Status</span>
            <span className="flex items-center gap-1.5 font-bold text-emerald-600">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 animate-ping opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Active Tool
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}