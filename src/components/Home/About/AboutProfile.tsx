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
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-[#FF6014] text-xs font-bold shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#FF6014]" />
          <span>Full Stack Developer</span>
        </div>
        <h2 className="text-[32px] sm:text-[38px] lg:text-[40px] font-black tracking-tight leading-tight text-slate-900 pt-1">
          About <span className="text-[#FF6014]">Me.</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          Building with purpose. Shipping with precision.
        </p>
      </motion.div>

      {/* Stat Cards */}
      {stats.length > 0 && (
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 gap-3.5 w-full"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-orange-300 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <p className="text-3xl sm:text-4xl font-black text-slate-900 group-hover:text-[#FF6014] transition-colors text-left tracking-tight">
                {stat.num || "20+"}
              </p>
              <p className="text-xs uppercase tracking-wider text-slate-500 font-bold text-left mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      )}

      {/* Core Technical Highlights */}
      {proficiencies.length > 0 && (
        <motion.div variants={itemVariants} className="flex flex-col gap-3 w-full">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500 text-left">
            Core Competencies
          </p>
          <div className="flex flex-wrap gap-2">
            {proficiencies.map((p, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-xs"
              >
                {p.name}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      <div className="h-px bg-slate-200 w-full" />

      {/* Availability badge */}
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-700 shadow-sm"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF6014] animate-pulse shrink-0" />
        <span>{availabilityText}</span>
      </motion.div>
    </div>
  );
}
