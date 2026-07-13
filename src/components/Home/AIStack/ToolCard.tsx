"use client";
import React, { useState } from "react";
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
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, show: false });

  const glowColor = tool.color || "rgba(255,255,255,0.08)";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const tiltX = ((y - rect.height / 2) / (rect.height / 2)) * -8;
    const tiltY = ((x - rect.width / 2) / (rect.width / 2)) * 8;

    setTilt({ x: tiltX, y: tiltY });
    setSpotlight({ x, y, show: true });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setSpotlight({ x: 0, y: 0, show: false });
  };

  return (
    <motion.div
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        borderColor: isActive ? tool.color : undefined,
        boxShadow: isActive ? `0 20px 40px -15px ${tool.color}35, inset 0 0 0 1px ${tool.color}35` : undefined
      }}
      whileHover={{
        borderColor: isActive ? tool.color : "rgba(255, 255, 255, 0.12)",
        boxShadow: !isActive ? `0 20px 40px -15px ${glowColor}25` : undefined,
      }}
      className={`relative p-5 rounded-2xl border text-left cursor-pointer transition-all duration-300 overflow-hidden flex flex-col justify-between h-48 group ${
        isActive 
          ? "bg-[#0E0E10]/95" 
          : "border-white/[0.06] bg-[#0E0E10]/80 hover:bg-[#0E0E10]/90"
      }`}
    >
      {/* Spotlight */}
      {spotlight.show && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(150px circle at ${spotlight.x}px ${spotlight.y}px, ${glowColor}15, transparent 80%)`,
          }}
        />
      )}

      {/* Sweep Glare Shine */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1200ms] ease-out pointer-events-none" />

      {/* Top Section */}
      <div className="flex items-start justify-between relative z-10" style={{ transform: "translateZ(25px)", transformStyle: "preserve-3d" }}>
        <motion.div 
          whileHover={{ scale: 1.1, rotate: 10 }}
          transition={{ type: "spring", stiffness: 300, damping: 12 }}
          className="p-1 rounded-xl bg-white border border-white/10 flex items-center justify-center w-14 h-14 transition-all duration-300 shadow-md shrink-0"
        >
          <img 
            src={tool.logoUrl} 
            alt={tool.name} 
            className="w-10 h-10 object-contain rounded-lg" 
          />
        </motion.div>
        <div className="text-right">
          <span className="text-[10px] font-black text-white/30 uppercase tracking-widest block mb-0.5">
            Comfort
          </span>
          <span 
            className="text-lg font-black transition-colors duration-300"
            style={{ color: isActive ? tool.color : "#ffffff" }}
          >
            {tool.usage}%
          </span>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative z-10 mt-4" style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
        <span className="text-[10px] font-black tracking-widest uppercase text-white/30 block mb-1">
          {tool.type}
        </span>
        <div className="flex items-center gap-2">
          <h3 className="text-base font-bold text-white group-hover:text-white transition-colors">
            {tool.name}
          </h3>
          {isActive && (
            <span className="w-2 h-2 rounded-full shrink-0 animate-pulse" style={{ backgroundColor: tool.color }} />
          )}
        </div>
        <div className="mt-3.5 h-1.5 bg-white/[0.03] border border-white/[0.06] rounded-full overflow-hidden w-full">
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
