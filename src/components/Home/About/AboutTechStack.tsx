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
            <div className="p-5 rounded-2xl glass-card-primary space-y-3">
              <p className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#FF6014]">
                Frontend Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {frontendSkills.map((skill, i) =>
                  skill.length > 40 ? (
                    <p key={`frontend-${i}`} className="text-sm sm:text-base text-slate-900 leading-relaxed font-semibold">
                      {skill}
                    </p>
                  ) : (
                    <motion.span
                      key={`frontend-${i}`}
                      whileHover={{ scale: 1.06, y: -2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="text-sm font-bold px-4 py-2 rounded-xl border border-slate-300 text-slate-900 bg-slate-50 hover:bg-orange-50 hover:border-orange-300 hover:text-[#FF6014] transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </motion.span>
                  )
                )}
              </div>
            </div>
          )}

          {backendSkills.length > 0 && (
            <div className="p-5 rounded-2xl glass-card-primary space-y-3">
              <p className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#FF6014]">
                Backend Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {backendSkills.map((skill, i) =>
                  skill.length > 40 ? (
                    <p key={`backend-${i}`} className="text-sm sm:text-base text-slate-900 leading-relaxed font-semibold">
                      {skill}
                    </p>
                  ) : (
                    <motion.span
                      key={`backend-${i}`}
                      whileHover={{ scale: 1.06, y: -2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="text-sm font-bold px-4 py-2 rounded-xl border border-slate-300 text-slate-900 bg-slate-50 hover:bg-orange-50 hover:border-orange-300 hover:text-[#FF6014] transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </motion.span>
                  )
                )}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Tools chips */}
      {tools.length > 0 && (
        <motion.div variants={itemVariants} className="text-left">
          <div className="p-5 rounded-2xl glass-card-primary space-y-3">
            <p className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#FF6014]">
              Tools &amp; Workflow
            </p>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool, i) =>
                tool.length > 40 ? (
                  <p key={`tool-${i}`} className="text-sm sm:text-base text-slate-900 leading-relaxed font-semibold">
                    {tool}
                  </p>
                ) : (
                  <motion.span
                    key={`tool-${i}`}
                    whileHover={{ scale: 1.06, y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="text-sm font-bold px-4 py-2 rounded-xl border border-slate-300 text-slate-900 bg-slate-50 hover:bg-orange-50 hover:border-orange-300 hover:text-[#FF6014] transition-all duration-200 cursor-default tracking-wide"
                  >
                    {tool}
                  </motion.span>
                )
              )}
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
