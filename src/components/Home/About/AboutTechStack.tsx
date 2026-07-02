"use client";
import React from "react";
import { motion } from "framer-motion";
import { itemVariants } from "./types";

interface AboutTechStackProps {
  frontendSkills: string[];
  backendSkills: string[];
  tools: string[];
}

export default function AboutTechStack({ frontendSkills, backendSkills, tools }: AboutTechStackProps) {
  return (
    <>
      {/* Core Stack */}
      {(frontendSkills.length > 0 || backendSkills.length > 0) && (
        <motion.div variants={itemVariants} className="space-y-4 text-left">
          {frontendSkills.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-foreground/50">
                Frontend
              </p>
              <div className="flex flex-wrap gap-2">
                {frontendSkills.map((skill, i) => (
                  <span
                    key={`frontend-${i}`}
                    className="text-[11px] px-3 py-1.5 rounded-lg border border-foreground/10 text-foreground/80 bg-foreground/[0.03] hover:bg-foreground/[0.06] hover:border-foreground/20 transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {backendSkills.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-foreground/50">
                Backend
              </p>
              <div className="flex flex-wrap gap-2">
                {backendSkills.map((skill, i) => (
                  <span
                    key={`backend-${i}`}
                    className="text-[11px] px-3 py-1.5 rounded-lg border border-foreground/10 text-foreground/80 bg-foreground/[0.03] hover:bg-foreground/[0.06] hover:border-foreground/20 transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Tools chips */}
      {tools.length > 0 && (
        <motion.div variants={itemVariants} className="space-y-3 text-left">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/45">
            Tools & Workflow
          </p>
          <div className="flex flex-wrap gap-1.5">
            {tools.map((tool, i) => (
              <span
                key={`tool-${i}`}
                className="text-[11px] px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10 dark:text-white/95 bg-black/[0.025] dark:bg-white/[0.025] hover:border-black/20 dark:hover:border-white/20 hover:text-black/70 dark:hover:text-white/70 transition-all duration-200 cursor-default tracking-wide"
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
}
