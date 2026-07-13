// ToolCard.tsx
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
  index?: number;
}

export default function ToolCard({ tool, isActive, onClick, index = 0 }: ToolCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, show: false });

  const glowColor = tool.color || "rgba(255,255,255,0.08)";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const tiltX = ((y - rect.height / 2) / (rect.height / 2)) * -6;
    const tiltY = ((x - rect.width / 2) / (rect.width / 2)) * 6;

    setTilt({ x: tiltX, y: tiltY });
    setSpotlight({ x, y, show: true });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setSpotlight({ x: 0, y: 0, show: false });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl group"
    >
      {/* Animated gradient border ring — active state only */}
      {isActive && (
        <motion.div
          className="absolute -inset-px rounded-2xl opacity-90 pointer-events-none"
          style={{
            background: `conic-gradient(from 0deg, ${tool.color}, transparent 30%, transparent 70%, ${tool.color})`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
      )}

      <motion.button
        type="button"
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        layout
        style={{
          transformStyle: "preserve-3d",
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          boxShadow: isActive
            ? `0 24px 48px -18px ${tool.color}4D, 0 0 0 1px ${tool.color}40, inset 0 1px 0 0 rgba(255,255,255,0.05)`
            : undefined,
        }}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className={`relative w-full p-5 rounded-2xl border text-left cursor-pointer overflow-hidden flex flex-col justify-between h-44 sm:h-48 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08080A] transition-colors duration-300 ${isActive
            ? "bg-[#111114] border-white/[0.09]"
            : "bg-[#0C0C0E] border-white/[0.06] hover:border-white/[0.12] hover:bg-[#101012]"
          }`}
      >
        {/* Spotlight */}
        {spotlight.show && (
          <div
            className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
            style={{
              background: `radial-gradient(150px circle at ${spotlight.x}px ${spotlight.y}px, ${glowColor}16, transparent 80%)`,
            }}
          />
        )}

        {/* Sweep glare */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/[0.035] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1100ms] ease-out pointer-events-none" />

        {/* Ambient glow when active */}
        {isActive && (
          <div
            className="absolute -right-8 -top-8 w-28 h-28 rounded-full blur-3xl opacity-25 pointer-events-none"
            style={{ backgroundColor: tool.color }}
          />
        )}

        {/* Top row: logo + comfort */}
        <div
          className="flex items-start justify-between relative z-10"
          style={{ transform: "translateZ(25px)", transformStyle: "preserve-3d" }}
        >
          <motion.div
            whileHover={{ scale: 1.08, rotate: 8 }}
            transition={{ type: "spring", stiffness: 300, damping: 12 }}
            className="relative p-1.5 rounded-xl bg-white flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 shrink-0 shadow-lg shadow-black/40"
            style={
              isActive
                ? { boxShadow: `0 0 0 2px ${tool.color}66, 0 8px 20px -6px ${tool.color}66` }
                : undefined
            }
          >
            <img src={tool.logoUrl} alt={tool.name} className="w-full h-full object-contain rounded-lg" />
            {isActive && (
              <motion.span
                className="absolute inset-0 rounded-xl"
                style={{ boxShadow: `0 0 0 2px ${tool.color}` }}
                animate={{ opacity: [0.6, 0, 0.6], scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </motion.div>

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
        <div className="relative z-10 mt-4" style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
          <span className="text-[9px] sm:text-[10px] font-black tracking-widest uppercase text-white/35 block mb-1">
            {tool.type}
          </span>
          <div className="flex items-center gap-2">
            <h3 className="text-[15px] sm:text-base font-bold text-white/90 group-hover:text-white transition-colors">
              {tool.name}
            </h3>
            {isActive && (
              <motion.span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: tool.color }}
                animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </div>
          <div className="mt-3.5 h-1.5 bg-white/[0.04] border border-white/[0.06] rounded-full overflow-hidden w-full">
            <motion.div
              className={`h-full bg-gradient-to-r ${tool.accentColor} relative`}
              initial={{ width: 0 }}
              whileInView={{ width: `${tool.usage}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 + index * 0.06, ease: "easeOut" }}
            >
              {isActive && (
                <motion.div
                  className="absolute inset-0 bg-white/40"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
                  style={{ width: "30%" }}
                />
              )}
            </motion.div>
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
}