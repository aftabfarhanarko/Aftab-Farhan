"use client";
import React from "react";
import { motion } from "framer-motion";
import { Code2, Cpu, Database, Flame, Sparkles } from "lucide-react";

// Floating Tech Badge component with infinite smooth bobbing motion
export function FloatingIconBadges() {
  const badges = [
    {
      label: "Next.js 16",
      icon: <Sparkles className="w-3.5 h-3.5 text-[#FF6014]" />,
      className: "-top-3 -left-4 sm:-top-6 sm:-left-8",
      delay: 0,
      duration: 4,
    },
    {
      label: "React & TS",
      icon: <Code2 className="w-3.5 h-3.5 text-blue-500" />,
      className: "top-1/4 -right-4 sm:top-1/3 sm:-right-10",
      delay: 0.8,
      duration: 4.5,
    },
    {
      label: "Node & Nest",
      icon: <Cpu className="w-3.5 h-3.5 text-emerald-500" />,
      className: "bottom-12 -left-4 sm:bottom-16 sm:-left-10",
      delay: 1.4,
      duration: 3.8,
    },
    {
      label: "Full Stack",
      icon: <Flame className="w-3.5 h-3.5 text-orange-500" />,
      className: "-bottom-4 right-6 sm:-bottom-6 sm:right-10",
      delay: 2.1,
      duration: 4.2,
    },
  ];

  return (
    <>
      {badges.map((badge, idx) => (
        <motion.div
          key={badge.label}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -10, 0],
          }}
          transition={{
            opacity: { duration: 0.6, delay: 0.4 + idx * 0.1 },
            scale: { duration: 0.6, delay: 0.4 + idx * 0.1 },
            y: {
              duration: badge.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: badge.delay,
            },
          }}
          className={`absolute ${badge.className} z-30 pointer-events-none hidden min-[440px]:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-white/90 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,1)] text-xs font-bold text-slate-800`}
        >
          {badge.icon}
          <span>{badge.label}</span>
        </motion.div>
      ))}
    </>
  );
}

// Interactive Live Status Floating Card
export function CurrentStackBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="absolute -top-6 right-2 sm:-top-8 sm:right-4 z-20 hidden md:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/90 shadow-[0_12px_30px_-5px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(255,255,255,1)]"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6014] opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF6014]" />
      </span>
      <div className="flex flex-col text-left leading-none">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">Status</span>
        <span className="text-xs font-bold text-slate-900 mt-0.5">Shipping Scalable Apps</span>
      </div>
    </motion.div>
  );
}

// Background Ambient Glowing Lights
export function AmbientBackgroundGlow() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-10 left-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-gradient-to-br from-orange-400/15 via-amber-300/10 to-transparent blur-[90px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/3 right-10 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full bg-gradient-to-tl from-indigo-400/10 via-purple-300/10 to-transparent blur-[100px]"
      />
    </div>
  );
}
