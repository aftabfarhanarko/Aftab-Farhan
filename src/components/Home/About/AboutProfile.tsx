"use client";
import React from "react";
import { motion } from "framer-motion";
import { Stat, Proficiency, itemVariants } from "./types";
import { Sparkles } from "lucide-react";

interface AboutProfileProps {
  stats: Stat[];
  proficiencies: Proficiency[];
  availabilityText: string;
}

export default function AboutProfile({ stats, proficiencies, availabilityText }: AboutProfileProps) {
  return (
    <div className="lg:col-span-2 flex flex-col gap-6 lg:gap-8 lg:sticky lg:top-24 lg:self-start items-center text-center lg:items-start lg:text-left">
      {/* Role tag + heading */}
      <motion.div variants={itemVariants} className="flex flex-col items-center lg:items-start space-y-2">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-[#FF6014] text-xs font-bold shadow-sm transition-transform cursor-default"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FF6014] animate-pulse" />
          <span>Full Stack Developer</span>
        </motion.div>

        <h2 className="text-[32px] sm:text-[38px] lg:text-[40px] font-black tracking-tight leading-tight text-slate-900 pt-1">
          About <span className="text-[#FF6014]">Me.</span>
        </h2>
        
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-semibold">
          Building with purpose. Shipping with precision.
        </p>
      </motion.div>

      {/* Stat Cards with Glass Design System */}
      {stats.length > 0 && (
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 gap-3.5 w-full"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
              className="group p-4.5 sm:p-5 rounded-2xl glass-card-compact hover:border-orange-300 transition-all duration-300 flex flex-col justify-between min-h-[105px] cursor-default text-left relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#FF6014]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <p className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#FF6014] transition-colors leading-snug tracking-tight">
                {stat.label}
              </p>
              <p className="text-xl sm:text-2xl font-black text-[#FF6014] mt-2 tracking-tight">
                {stat.num || "20+"}
              </p>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Core Technical Highlights */}
      {proficiencies.length > 0 && (
        <motion.div variants={itemVariants} className="flex flex-col gap-3 w-full">
          <p className="text-xs font-black uppercase tracking-[0.15em] text-slate-800 text-left">
            Core Competencies
          </p>
          <div className="flex flex-wrap gap-2">
            {proficiencies.map((p, i) => (
              <motion.span
                key={i}
                whileHover={{ scale: 1.06, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="px-3.5 py-1.5 rounded-xl glass-card-compact text-xs font-bold text-slate-900 shadow-2xs cursor-default hover:border-orange-300 hover:text-[#FF6014] transition-colors"
              >
                {p.name}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}

      <div className="h-px bg-slate-200/80 w-full" />

      {/* Availability badge */}
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        className="flex items-center gap-2.5 px-4.5 py-3 rounded-xl glass-card-compact text-sm font-bold text-slate-900 shadow-sm cursor-default"
      >
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6014] opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF6014]" />
        </span>
        <span>{availabilityText}</span>
      </motion.div>
    </div>
  );
}
