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
    // sticky: card stays pinned in the viewport while the tool grid scrolls past it
    <div className="lg:col-span-4 h-full lg:sticky lg:top-24 lg:self-start">
      <div className="relative rounded-3xl">
        {/* Rotating animated gradient ring, always on, colored per active tool */}
        <motion.div
          key={`${selectedAIInfo.id}-ring`}
          className="absolute -inset-[1.5px] rounded-3xl opacity-70 pointer-events-none blur-[1px]"
          style={{
            background: `conic-gradient(from 0deg, ${selectedAIInfo.color}, transparent 25%, transparent 75%, ${selectedAIInfo.color})`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedAIInfo.id}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transformStyle: "preserve-3d",
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            }}
            whileHover={{
              boxShadow: `0 30px 60px -12px ${glowColor}35`,
            }}
            initial={{ opacity: 0, x: 16, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative p-6 rounded-3xl border border-white/[0.07] bg-[#0E0E10]/90 backdrop-blur-xl overflow-hidden flex flex-col h-full justify-between min-h-[380px]"
          >
            {/* Spotlight */}
            {spotlight.show && (
              <div
                className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(220px circle at ${spotlight.x}px ${spotlight.y}px, ${glowColor}18, transparent 80%)`,
                }}
              />
            )}

            {/* Sweep Glare Shine */}
            <motion.div
              className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent pointer-events-none"
              initial={{ x: "-120%" }}
              animate={{ x: "120%" }}
              transition={{ duration: 1.4, delay: 0.15, ease: "easeOut" }}
            />

            {/* Ambient blurred glow background */}
            <motion.div
              className="absolute -left-16 -bottom-16 w-56 h-56 rounded-full blur-3xl pointer-events-none"
              style={{ backgroundColor: selectedAIInfo.color }}
              animate={{ opacity: [0.18, 0.28, 0.18] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            <div style={{ transform: "translateZ(25px)", transformStyle: "preserve-3d" }} className="relative z-10">
              <div className="flex items-center gap-4 mb-5">
                <motion.div
                  whileHover={{ scale: 1.06, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 12 }}
                  className="relative p-1 rounded-2xl bg-white border border-white/10 flex items-center justify-center w-16 h-16 shadow-md shrink-0"
                  style={{ boxShadow: `0 0 0 2px ${selectedAIInfo.color}45, 0 10px 24px -8px ${selectedAIInfo.color}55` }}
                >
                  <img src={selectedAIInfo.logoUrl} alt={selectedAIInfo.name} className="w-12 h-12 object-contain rounded-lg" />
                </motion.div>

                <div>
                  <motion.h4
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                    className="text-lg font-bold text-white leading-tight"
                  >
                    {selectedAIInfo.name}
                  </motion.h4>
                  <span className="text-xs font-semibold text-white/40">{selectedAIInfo.type}</span>
                </div>
              </div>

              <motion.div
                className="space-y-4 text-left"
                style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
                }}
              >
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/30 block mb-1.5">
                    Primary Role in Stack
                  </span>
                  <p className="text-sm font-bold text-white">{selectedAIInfo.role}</p>
                </motion.div>
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/30 block mb-1.5">
                    Capabilities &amp; Integration
                  </span>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-medium">
                    {selectedAIInfo.description}
                  </p>
                </motion.div>
              </motion.div>
            </div>

            <div
              style={{ transform: "translateZ(15px)", transformStyle: "preserve-3d" }}
              className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs relative z-10"
            >
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
    </div>
  );
}