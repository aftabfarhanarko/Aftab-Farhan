"use client";
import React from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { Project, itemVariants } from "./types";

interface AboutHighlightsProps {
  projects: Project[];
  quoteText: string;
  quoteAuthor: string;
  mentorTitle: string;
  mentorDescription: string;
}

export default function AboutHighlights({
  projects,
  quoteText,
  quoteAuthor,
  mentorTitle,
  mentorDescription,
}: AboutHighlightsProps) {
  return (
    <>
      {/* Projects card */}
      {projects.length > 0 && (
        <motion.div
          variants={itemVariants}
          className="rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.07] dark:border-white/[0.07] overflow-hidden text-left"
        >
          <div className="px-5 py-3.5 border-b border-black/[0.06] dark:border-white/[0.06]">
            <p className="text-[11px] font-bold text-black/70 dark:text-white uppercase tracking-[0.15em]">
              Recent Projects
            </p>
          </div>
          <div className="divide-y divide-black/[0.05] dark:divide-white/[0.05]">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="px-5 py-4 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
              >
                <p className="text-[12px] font-semibold text-black/75 dark:text-white mb-1">
                  {project.title}
                </p>
                <p className="text-[11px] text-black/40 dark:text-white/90 leading-relaxed">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Quote */}
      {quoteText && (
        <motion.div
          variants={itemVariants}
          className="border-l-2 border-black/20 dark:border-white/20 bg-black/[0.02] dark:bg-white/[0.02] px-5 py-4 rounded-r-2xl text-left"
        >
          <blockquote className="text-sm text-black/50 dark:text-white/90 italic font-light leading-relaxed">
            &ldquo;{quoteText}&rdquo;
          </blockquote>
          {quoteAuthor && (
            <p className="text-right text-[10px] text-black/30 dark:text-white/90 mt-2 tracking-wide">
              {quoteAuthor}
            </p>
          )}
        </motion.div>
      )}

      {/* Mentor */}
      {mentorTitle && (
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.07] dark:border-white/[0.07] px-4 py-3.5 text-left"
        >
          <div className="w-9 h-9 rounded-lg bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.07] dark:border-white/[0.07] flex items-center justify-center shrink-0">
            <Users
              size={14}
              className="text-black/45 dark:text-white/45"
              strokeWidth={1.5}
            />
          </div>
          <div>
            <p className="text-sm font-medium text-black/75 dark:text-white/90 leading-none mb-1">
              {mentorTitle}
            </p>
            <p className="text-[11px] text-black/35 dark:text-white/85 font-light">
              {mentorDescription}
            </p>
          </div>
        </motion.div>
      )}
    </>
  );
}
