"use client";
import React from "react";
import { motion } from "framer-motion";
import { Stat, Proficiency, itemVariants } from "./types";

interface AboutProfileProps {
  stats: Stat[];
  proficiencies: Proficiency[];
  availabilityText: string;
}

export default function AboutProfile({ stats, proficiencies, availabilityText }: AboutProfileProps) {
  return (
    <div className="lg:col-span-2 flex flex-col gap-6 lg:gap-8 lg:sticky lg:top-24 lg:self-start flex flex-col items-center text-center lg:items-start lg:text-left">
      {/* Role tag + heading */}
      <motion.div variants={itemVariants} className="flex flex-col items-center lg:items-start">
        <h2 className="text-2xl md:text-4xl font-black tracking-tight leading-none text-foreground mb-4">
          About <span className="text-foreground/25">Me.</span>
        </h2>
        <p className="text-sm sm:text-base text-foreground/60 leading-relaxed">
          Building with purpose. Shipping with precision.
        </p>
      </motion.div>

      {stats.length > 0 && (
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="group p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.07] dark:border-white/[0.07] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-colors duration-300"
            >
              <p className="text-xl font-black text-foreground mb-1 group-hover:scale-105 transition-transform origin-left text-left">
                {stat.num}
              </p>
              <p className="text-[9px] uppercase tracking-[0.18em] text-black/35 dark:text-white/35 font-bold text-left">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      )}

      {/* Proficiency bars */}
      {proficiencies.length > 0 && (
        <motion.div variants={itemVariants} className="flex flex-col gap-3 w-full max-w-xs lg:max-w-none">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/30 dark:text-white/30 text-left">
            Proficiency
          </p>
          {proficiencies.map((p, i) => (
            <div key={i}>
              <div className="flex justify-between items-center mb-1.5 text-left">
                <span className="text-[11px] text-black/60 dark:text-white/60">
                  {p.name}
                </span>
                <span className="text-[10px] text-black/30 dark:text-white/30">
                  {p.pct}%
                </span>
              </div>
              <div className="h-[3px] rounded-full bg-black/[0.06] dark:bg-white/[0.06] overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-black dark:bg-white"
                  initial={{ width: 0 }}
                  animate={{ width: `${p.pct}%` }}
                  transition={{
                    duration: 1,
                    delay: i * 0.08,
                    ease: "easeOut",
                  }}
                />
              </div>
            </div>
          ))}
        </motion.div>
      )}

      <div className="h-px bg-black/[0.06] dark:bg-white/[0.06] w-full" />

      {/* Availability badge */}
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.07] dark:border-white/[0.07] w-fit"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
        <span className="text-xs font-medium text-black/55 dark:text-white/55">
          {availabilityText}
        </span>
      </motion.div>
    </div>
  );
}
