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
}

export default function ToolCard({ tool, isActive, onClick }: ToolCardProps) {
  return (
    <motion.div
      onClick={onClick}
      className={`relative p-5 rounded-2xl border text-left cursor-pointer transition-all duration-300 overflow-hidden flex flex-col justify-between h-48 group ${
        isActive 
          ? "border-transparent bg-transparent" 
          : "border-black/10 dark:border-white/10 bg-transparent hover:border-black/20 dark:hover:border-white/20 hover:bg-black/[0.01] dark:hover:bg-white/[0.01]"
      }`}
      style={{
        borderColor: isActive ? tool.color : undefined,
        boxShadow: isActive ? `0 0 25px -5px ${tool.color}25, inset 0 0 0 1px ${tool.color}35` : "none"
      }}
      whileHover={{ y: -4 }}
    >
      {/* Top Section */}
      <div className="flex items-start justify-between relative z-10">
        <div 
          className="p-2 rounded-xl bg-black/[0.05] dark:bg-white/[0.05] border border-black/5 dark:border-white/5 flex items-center justify-center w-14 h-14 transition-all duration-300"
          style={{
            backgroundColor: isActive ? `${tool.color}15` : undefined,
            borderColor: isActive ? `${tool.color}35` : undefined
          }}
        >
          <img 
            src={tool.logoUrl} 
            alt={tool.name} 
            className="w-10 h-10 object-contain rounded-lg" 
          />
        </div>
        <div className="text-right">
          <span className="text-[10px] font-bold text-black/40 dark:text-white/40 uppercase block">
            Comfort
          </span>
          <span 
            className="text-lg font-black transition-colors duration-300"
            style={{ color: isActive ? tool.color : "inherit" }}
          >
            {tool.usage}%
          </span>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative z-10 mt-4">
        <span className="text-[10px] font-bold tracking-wider uppercase opacity-40 block mb-0.5">
          {tool.type}
        </span>
        <div className="flex items-center gap-1.5">
          <h3 className="text-base font-bold text-foreground group-hover:text-black dark:group-hover:text-white transition-colors">
            {tool.name}
          </h3>
          {isActive && (
            <span className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse" style={{ backgroundColor: tool.color }} />
          )}
        </div>
        <div className="mt-2 h-1 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden w-full">
          <motion.div 
            className={`h-full bg-gradient-to-r ${tool.accentColor}`}
            initial={{ width: 0 }}
            animate={{ width: `${tool.usage}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
