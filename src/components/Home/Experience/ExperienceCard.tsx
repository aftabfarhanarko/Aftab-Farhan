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
  return (
    <div key={exp.id} className="relative sm:pl-10 mb-8">
      {/* Timeline dot */}
      <div
        className="absolute left-5 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-white bg-[#FF6014] hidden sm:block shadow-md z-10"
        style={{ top: "1.75rem" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`rounded-2xl border overflow-hidden transition-all duration-300 relative bg-white shadow-sm hover:shadow-md ${
          exp.type === "current"
            ? "border-orange-300"
            : "border-slate-200"
        }`}
      >
        <div className="p-6 sm:p-8">
          <ExperienceHeader exp={exp} />
          <ExperienceRoles roles={exp.roles} />

          {/* Tech Stack */}
          {exp.techStack && exp.techStack.length > 0 && (
            <div className="mt-6 pt-5 border-t border-slate-200">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {exp.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-xs font-semibold bg-slate-100 border border-slate-200 rounded-lg text-slate-700"
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
      </motion.div>
    </div>
  );
}
