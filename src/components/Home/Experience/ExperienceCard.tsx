"use client";
import React from "react";
import { Experience } from "./types";
import { motion } from "framer-motion";
import {
  ExperienceHeader,
  ExperienceRoles,
  ExperienceAchievements,
} from "./ExperienceComponents";

interface ExperienceCardProps {
  exp: Experience;
}

export default function ExperienceCard({ exp }: ExperienceCardProps) {
  const isCurrent = exp.type === "current";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative sm:pl-10 mb-8 group"
    >
      {/* Timeline dot with Beacon Aura */}
      <div className="absolute left-5 -translate-x-1/2 top-7 hidden sm:flex items-center justify-center z-20">
        {isCurrent && (
          <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-[#FF6014] opacity-50" />
        )}
        <div
          className={`w-4 h-4 rounded-full border-2 border-white shadow-md z-10 transition-transform duration-300 group-hover:scale-125 ${
            isCurrent ? "bg-[#FF6014] ring-4 ring-orange-500/20" : "bg-slate-400 group-hover:bg-[#FF6014]"
          }`}
        />
      </div>

      {/* Main Experience Card with Glass Design System */}
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 350, damping: 24 }}
        className={`rounded-2xl overflow-hidden transition-all duration-300 relative glass-card-primary ${
          isCurrent
            ? "border-orange-300 ring-1 ring-orange-500/20"
            : "hover:border-orange-300"
        }`}
      >
        {/* Sweep Glow Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF6014]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="p-6 sm:p-8">
          <ExperienceHeader exp={exp} />
          <ExperienceRoles roles={exp.roles} />

          {/* Tech Stack Chips */}
          {exp.techStack && exp.techStack.length > 0 && (
            <div className="mt-6 pt-5 border-t border-slate-200">
              <p className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {exp.techStack.map((tech) => (
                  <motion.span
                    key={tech}
                    whileHover={{ scale: 1.08, y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="px-3 py-1.5 text-xs font-bold bg-slate-50 border border-slate-300 rounded-lg text-slate-900 hover:border-orange-300 hover:text-[#FF6014] hover:bg-orange-50/50 transition-all duration-200 cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          )}

          {exp.achievements && exp.achievements.length > 0 && (
            <ExperienceAchievements achievements={exp.achievements} />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
