"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroStat, fadeLeft, fadeUp } from "./types";
import { Download, Eye, Sparkles, ArrowRight, Code2 } from "lucide-react";

interface HeroLeftProps {
  name: string;
  title: string;
  description: string;
  stats: HeroStat[];
}

const dynamicRoles = [
  "Full Stack Developer",
  "Technical Lead",
  "Next.js & Node.js Specialist",
  "SaaS & Cloud Architect",
];

export default function HeroLeft({ name, title, description, stats }: HeroLeftProps) {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % dynamicRoles.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex-1 flex flex-col gap-6 z-10 max-w-2xl order-2 md:order-1 items-center md:items-start pt-0">
      
      {/* Animated Availability Status Pill */}
      <motion.div {...fadeLeft(0.08)}>
        <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs sm:text-sm font-bold bg-orange-50/90 border border-orange-200/90 text-[#FF6014] shadow-sm backdrop-blur-md hover:scale-105 transition-transform cursor-default">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6014] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF6014]" />
          </span>
          <span>Available for Freelance &amp; Key Projects</span>
        </span>
      </motion.div>

      {/* Greeting & Name */}
      <motion.div {...fadeLeft(0.14)} className="text-center md:text-left space-y-1.5">
        <h1 className="text-[28px] sm:text-[38px] lg:text-[46px] font-black text-slate-900 tracking-tight leading-[1.1]">
          {name || "Aftab Farhan Arko"}
        </h1>

        {/* Dynamic Animated Role Switcher */}
        <div className="h-8 sm:h-9 flex items-center justify-center md:justify-start overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIndex}
              initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl lg:text-[22px] font-extrabold text-[#FF6014] tracking-tight flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF6014] shrink-0" />
              <span>{dynamicRoles[roleIndex]}</span>
            </motion.p>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Bio / Description */}
      <motion.p
        {...fadeLeft(0.24)}
        className="text-base sm:text-lg text-slate-800 leading-[1.75] text-center md:text-left max-w-xl font-medium"
      >
        Building scalable web applications, SaaS platforms, APIs and business solutions using modern JavaScript and TypeScript technologies.
      </motion.p>

      {/* High-End Animated CTA Buttons */}
      <motion.div {...fadeUp(0.35)} className="flex flex-wrap justify-center md:justify-start gap-3 mt-1 w-full md:w-auto">
        <motion.a
          href="#projects"
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6014] hover:bg-[#E5530F] px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-bold text-white shadow-md shadow-orange-500/20 transition-all cursor-pointer w-full sm:w-auto overflow-hidden"
        >
          {/* Sweep Light Beam */}
          <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
          <Eye size={16} className="transition-transform group-hover:scale-110" />
          <span>View Projects</span>
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </motion.a>

        <motion.a
          href="/Aftab-Farhan.pdf"
          download="Aftab-Farhan.pdf"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-300 px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-bold text-slate-900 shadow-sm transition-all cursor-pointer w-full sm:w-auto"
        >
          <Download size={16} className="text-[#FF6014]" />
          <span>Download CV</span>
        </motion.a>
      </motion.div>

      {/* Verified Real Stats Bar with Staggered Entrance */}
      <motion.div
        {...fadeUp(0.45)}
        className="flex flex-wrap gap-6 sm:gap-10 pt-5 mt-2 border-t border-slate-200/80 w-full justify-center md:justify-start"
      >
        <motion.div
          whileHover={{ y: -2 }}
          className="group cursor-default text-center md:text-left transition-transform"
        >
          <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight group-hover:text-[#FF6014] transition-colors duration-300">
            2+ Years
          </div>
          <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mt-0.5 flex items-center gap-1 justify-center md:justify-start">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6014]" />
            Experience
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="group cursor-default text-center md:text-left transition-transform"
        >
          <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight group-hover:text-[#FF6014] transition-colors duration-300">
            Production
          </div>
          <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mt-0.5 flex items-center gap-1 justify-center md:justify-start">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6014]" />
            Web Applications
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="group cursor-default text-center md:text-left transition-transform"
        >
          <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight group-hover:text-[#FF6014] transition-colors duration-300">
            Technical
          </div>
          <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mt-0.5 flex items-center gap-1 justify-center md:justify-start">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6014]" />
            Leadership
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
