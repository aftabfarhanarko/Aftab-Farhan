"use client";
import React from "react";
import { motion } from "framer-motion";
import { HeroStat, fadeLeft, fadeUp } from "./types";
import { Download, Eye } from "lucide-react";

interface HeroLeftProps {
  name: string;
  title: string;
  description: string;
  stats: HeroStat[];
}

export default function HeroLeft({ name, title, description, stats }: HeroLeftProps) {
  return (
    <div className="flex-1 flex flex-col gap-6 z-10 max-w-2xl order-2 md:order-1 items-center md:items-start pt-4">
      
      {/* Availability Status Pill */}
      <motion.div {...fadeLeft(0.08)}>
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold bg-orange-50 border border-orange-200 text-[#FF6014] shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF6014] animate-pulse" />
          <span>Available for Hire & Key Projects</span>
        </span>
      </motion.div>

      {/* Greeting & Name */}
      <motion.div {...fadeLeft(0.14)} className="text-center md:text-left space-y-2">
        <p className="text-base sm:text-lg font-bold text-slate-600 tracking-wide uppercase">
          Hello, I&apos;m <span className="text-[#FF6014] font-black">{name || "Aftab Farhan Arko"}</span>
        </p>
        <h1 className="text-[38px] min-[400px]:text-[44px] sm:text-[56px] lg:text-[68px] font-black text-slate-900 tracking-tight leading-[1.08]">
          Full Stack Developer | Technical Lead
        </h1>
      </motion.div>

      {/* Bio / Description */}
      <motion.p
        {...fadeLeft(0.24)}
        className="text-base sm:text-lg lg:text-[19px] text-slate-600 leading-[1.7] text-center md:text-left max-w-xl font-normal"
      >
        Building scalable web applications, SaaS platforms, APIs and business solutions using modern JavaScript and TypeScript technologies.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div {...fadeUp(0.35)} className="flex flex-wrap justify-center md:justify-start gap-4 mt-2 w-full md:w-auto">
        <motion.a
          href="#projects"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#FF6014] hover:bg-[#E5530F] px-8 py-4 text-base font-bold text-white shadow-lg shadow-orange-500/20 transition-all cursor-pointer w-full sm:w-auto"
        >
          <Eye size={18} />
          View Projects
        </motion.a>

        <motion.a
          href="#contact"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 px-8 py-4 text-base font-bold text-slate-900 transition-all cursor-pointer w-full sm:w-auto"
        >
          <Download size={18} />
          Download CV
        </motion.a>
      </motion.div>

      {/* Verified Real Stats Bar */}
      <motion.div
        {...fadeUp(0.45)}
        className="flex flex-wrap gap-8 sm:gap-12 pt-6 mt-4 border-t border-slate-200 w-full justify-center md:justify-start"
      >
        <div className="group cursor-default text-center md:text-left">
          <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight group-hover:text-[#FF6014] transition-colors duration-300">
            2+ Years
          </div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">
            Experience
          </div>
        </div>

        <div className="group cursor-default text-center md:text-left">
          <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight group-hover:text-[#FF6014] transition-colors duration-300">
            Production
          </div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">
            Web Applications
          </div>
        </div>

        <div className="group cursor-default text-center md:text-left">
          <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight group-hover:text-[#FF6014] transition-colors duration-300">
            Technical
          </div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">
            Leadership
          </div>
        </div>
      </motion.div>
    </div>
  );
}
