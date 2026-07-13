"use client";
import React, { useState } from "react";
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
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, show: false });

  const glowColor = selectedAIInfo.color || "rgba(255,255,255,0.08)";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const tiltX = ((y - rect.height / 2) / (rect.height / 2)) * -4;
    const tiltY = ((x - rect.width / 2) / (rect.width / 2)) * 4;

    setTilt({ x: tiltX, y: tiltY });
    setSpotlight({ x, y, show: true });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setSpotlight({ x: 0, y: 0, show: false });
  };

  return (
    <div className="lg:col-span-4 h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedAIInfo.id}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transformStyle: "preserve-3d",
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            borderColor: "rgba(255, 255, 255, 0.06)",
          }}
          whileHover={{
            borderColor: "rgba(255, 255, 255, 0.12)",
            boxShadow: `0 25px 50px -12px ${glowColor}25`,
          }}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
          className="p-6 rounded-3xl border bg-[#0E0E10]/85 backdrop-blur-xl relative overflow-hidden flex flex-col h-full justify-between min-h-[350px]"
        >
          {/* Spotlight */}
          {spotlight.show && (
            <div
              className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
              style={{
                background: `radial-gradient(220px circle at ${spotlight.x}px ${spotlight.y}px, ${glowColor}15, transparent 80%)`,
              }}
            />
          )}

          {/* Sweep Glare Shine */}
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1200ms] ease-out pointer-events-none" />

          {/* Ambient blurred glow background */}
          <div className="absolute -left-16 -bottom-16 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-500" style={{ backgroundColor: selectedAIInfo.color }} />

          <div style={{ transform: "translateZ(25px)", transformStyle: "preserve-3d" }}>
            <div className="flex items-center gap-4 mb-5">
              
              {/* Spring scale/rotation on logo container */}
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 12 }}
                className="p-1 rounded-2xl bg-white border border-white/10 flex items-center justify-center w-16 h-16 shadow-md shrink-0"
              >
                <img src={selectedAIInfo.logoUrl} alt={selectedAIInfo.name} className="w-12 h-12 object-contain rounded-lg" />
              </motion.div>

              <div>
                <h4 className="text-lg font-bold text-white leading-tight">{selectedAIInfo.name}</h4>
                <span className="text-xs font-semibold text-white/40">{selectedAIInfo.type}</span>
              </div>
            </div>

            <div className="space-y-4 text-left" style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-white/30 block mb-1.5">Primary Role in Stack</span>
                <p className="text-sm font-bold text-white">{selectedAIInfo.role}</p>
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-white/30 block mb-1.5">Capabilities & Integration</span>
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-medium">{selectedAIInfo.description}</p>
              </div>
            </div>
          </div>

          <div 
            style={{ transform: "translateZ(15px)", transformStyle: "preserve-3d" }}
            className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs relative z-10"
          >
            <span className="text-white/40 font-mono">Status</span>
            <span className="flex items-center gap-1.5 font-bold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Active Tool
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
