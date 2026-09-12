// ToolCard.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";

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
  shortName?: string;
}

interface ToolCardProps {
  tool: Tool;
  isActive: boolean;
  onClick: () => void;
  index?: number;
}

export default function ToolCard({ tool, isActive, onClick, index = 0 }: ToolCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      data-cursor-parallax
      data-parallax-speed="6"
      data-parallax-scale="1.03"
      className={`relative w-full p-4 sm:p-5 rounded-2xl border text-left cursor-pointer flex flex-col justify-between h-40 sm:h-44 focus-visible:outline-none transition-all duration-300 backdrop-blur-xl ${
        isActive
          ? "bg-white shadow-xl ring-2 ring-orange-500/50"
          : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-md"
      }`}
      style={{
        borderColor: isActive ? tool.color : "#E2E8F0",
        boxShadow: isActive
          ? `0 12px 28px -8px ${tool.color}30, 0 0 0 1px ${tool.color}40`
          : undefined,
      }}
    >
      {/* Top row: logo + comfort */}
      <div className="flex items-start justify-between w-full">
        <div
          className="relative p-1.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 shrink-0 transition-transform shadow-xs"
          style={
            isActive
              ? { boxShadow: `0 4px 12px -3px ${tool.color}44` }
              : undefined
          }
        >
          <img src={tool.logoUrl} alt={tool.name} className="w-full h-full object-contain rounded-lg" />
        </div>

        <div className="text-right">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">
            Comfort
          </span>
          <span
            className="text-base sm:text-lg font-black tabular-nums transition-colors duration-300"
            style={{ color: isActive ? tool.color : "#0F172A" }}
          >
            {tool.usage}%
          </span>
        </div>
      </div>

      {/* Bottom: name + meta */}
      <div className="w-full mt-4">
        <span className="text-[10px] font-black tracking-widest uppercase text-slate-400 block mb-1">
          {tool.type}
        </span>
        <div className="flex items-center gap-2">
          <h3 className="text-[15px] sm:text-base font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
            {tool.name}
          </h3>
          {isActive && (
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: tool.color }}
            />
          )}
        </div>
        <div className="mt-3 h-2 bg-slate-100 border border-slate-200/80 rounded-full overflow-hidden w-full">
          <motion.div
            className={`h-full bg-gradient-to-r ${tool.accentColor}`}
            initial={{ width: 0 }}
            animate={{ width: `${tool.usage}%` }}
            transition={{ duration: 0.8, delay: 0.1 }}
          />
        </div>
      </div>
    </motion.button>
  );
}