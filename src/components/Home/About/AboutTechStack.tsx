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
            <div className="space-y-2.5">
              <p className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-500">
                Frontend
              </p>
              <div className="flex flex-wrap gap-2">
                {frontendSkills.map((skill, i) => (
                  <span
                    key={`frontend-${i}`}
                    className="text-xs sm:text-sm font-medium px-3.5 py-2 rounded-xl border border-slate-200 text-slate-800 bg-white hover:bg-orange-50 hover:border-orange-200 shadow-xs transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {backendSkills.length > 0 && (
            <div className="space-y-2.5">
              <p className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-500">
                Backend
              </p>
              <div className="flex flex-wrap gap-2">
                {backendSkills.map((skill, i) => (
                  <span
                    key={`backend-${i}`}
                    className="text-xs sm:text-sm font-medium px-3.5 py-2 rounded-xl border border-slate-200 text-slate-800 bg-white hover:bg-orange-50 hover:border-orange-200 shadow-xs transition-all duration-200 cursor-default"
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
        <motion.div variants={itemVariants} className="space-y-2.5 text-left">
          <p className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-500">
            Tools & Workflow
          </p>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool, i) => (
              <span
                key={`tool-${i}`}
                className="text-xs sm:text-sm font-medium px-3.5 py-2 rounded-xl border border-slate-200 text-slate-800 bg-white hover:bg-orange-50 hover:border-orange-200 shadow-xs transition-all duration-200 cursor-default tracking-wide"
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
