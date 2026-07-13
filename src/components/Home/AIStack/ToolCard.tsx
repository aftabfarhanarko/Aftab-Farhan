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
      className={`relative w-full p-5 rounded-2xl border text-left cursor-pointer flex flex-col justify-between h-44 sm:h-48 focus-visible:outline-none transition-all duration-300 ${
        isActive
          ? "bg-[#111114]"
          : "bg-[#0C0C0E] border-white/[0.06] hover:bg-[#101012]"
      }`}
      style={{
        borderColor: isActive ? tool.color : "rgba(255, 255, 255, 0.06)",
        boxShadow: isActive
          ? `0 12px 24px -10px ${tool.color}33, 0 0 0 1px ${tool.color}30`
          : undefined,
      }}
    >
      {/* Top row: logo + comfort */}
      <div className="flex items-start justify-between w-full">
        <div
          className="relative p-1.5 rounded-xl bg-white flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 shrink-0 transition-transform"
          style={
            isActive
              ? { boxShadow: `0 4px 12px -3px ${tool.color}44` }
              : undefined
          }
        >
          <img src={tool.logoUrl} alt={tool.name} className="w-full h-full object-contain rounded-lg" />
        </div>

        <div className="text-right">
          <span className="text-[9px] sm:text-[10px] font-black text-white/35 uppercase tracking-widest block mb-0.5">
            Comfort
          </span>
          <span
            className="text-base sm:text-lg font-black tabular-nums transition-colors duration-300"
            style={{ color: isActive ? tool.color : "#F5F5F7" }}
          >
            {tool.usage}%
          </span>
        </div>
      </div>

      {/* Bottom: name + meta */}
      <div className="w-full mt-4">
        <span className="text-[9px] sm:text-[10px] font-black tracking-widest uppercase text-white/35 block mb-1">
          {tool.type}
        </span>
        <div className="flex items-center gap-2">
          <h3 className="text-[15px] sm:text-base font-bold text-white/90 group-hover:text-white transition-colors">
            {tool.name}
          </h3>
          {isActive && (
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: tool.color }}
            />
          )}
        </div>
        <div className="mt-3.5 h-1.5 bg-white/[0.04] border border-white/[0.06] rounded-full overflow-hidden w-full">
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