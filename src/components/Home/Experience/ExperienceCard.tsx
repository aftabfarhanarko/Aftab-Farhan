"use client";
import React from "react";
import { Experience } from "./types";
import {
  ExperienceHeader,
  ExperienceRoles,
  ExperienceAchievements,
} from "./ExperienceComponents";

interface ExperienceCardProps {
  exp: Experience;
}

export default function ExperienceCard({ exp }: ExperienceCardProps) {
  return (
    <div key={exp.id} className="relative sm:pl-14">
      {/* Timeline dot (monochrome) */}
      <div
        className="absolute left-5 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-black dark:border-white hidden sm:block bg-black dark:bg-white"
        style={{ top: "1.75rem" }}
      />

      <div
        className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
          exp.type === "current"
            ? "border-black/20 dark:border-white/20 bg-black/[0.04] dark:bg-white/[0.05]"
            : "border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]"
        }`}
      >
        {/* Top accent line */}
        <div className="h-[2px] w-full bg-black dark:bg-white opacity-20" />

        <div className="p-5 sm:p-6">
          <ExperienceHeader exp={exp} />

          <ExperienceRoles roles={exp.roles} />

          {/* Tech Stack */}
          {exp.techStack && exp.techStack.length > 0 && (
            <div className="mt-5 pt-4 border-t border-black/10 dark:border-white/10">
              <p className="text-[10px] font-bold text-black/30 dark:text-white/30 uppercase tracking-widest mb-2">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-1.5">
                {exp.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-[11px] sm:text-xs font-medium bg-black/[0.04] dark:bg-white/[0.05] border border-black/10 dark:border-white/10 rounded-lg text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:border-black/25 dark:hover:border-white/25 transition-all"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {exp.achievements && exp.achievements.length > 0 && (
            <ExperienceAchievements achievements={exp.achievements} />
          )}
        </div>
      </div>
    </div>
  );
}
