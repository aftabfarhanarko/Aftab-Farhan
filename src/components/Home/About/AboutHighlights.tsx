"use client";
import React, { useState } from "react";
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

// 3D Tilt Card Wrapper for Recent Projects
function ProjectsCard({ projects }: { projects: Project[] }) {
  return (
    <motion.div
      variants={itemVariants}
      className="rounded-2xl border border-slate-200 bg-white overflow-hidden text-left shadow-sm"
    >
      <div className="px-5 py-4 border-b border-slate-100 bg-slate-50">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
          Recent Focus Projects
        </p>
      </div>
      <div className="divide-y divide-slate-100">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="px-5 py-4 hover:bg-slate-50 transition-colors"
          >
            <p className="text-sm sm:text-base font-bold text-slate-900 mb-1">
              {project.title}
            </p>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function MentorCard({ title, description }: { title: string; description: string }) {
  return (
    <motion.div
      variants={itemVariants}
      className="flex items-center gap-3.5 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-left shadow-sm"
    >
      <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center shrink-0">
        <Users
          size={18}
          className="text-[#FF6014]"
        />
      </div>
      <div>
        <p className="text-base font-bold text-slate-900 mb-0.5">
          {title}
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
          {description}
        </p>
      </div>
    </motion.div>
  );
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
      {/* Recent Projects card */}
      {projects.length > 0 && (
        <ProjectsCard projects={projects} />
      )}

      {/* Quote */}
      {quoteText && (
        <motion.div
          variants={itemVariants}
          className="border-l-2 border-[#FF6014] bg-slate-50 px-5 py-4 rounded-r-2xl text-left border border-slate-200 border-l-[#FF6014]"
        >
          <blockquote className="text-sm sm:text-base text-slate-700 italic font-medium leading-relaxed">
            &ldquo;{quoteText}&rdquo;
          </blockquote>
          {quoteAuthor && (
            <p className="text-right text-xs text-slate-500 mt-2 tracking-wide font-mono uppercase">
              {quoteAuthor}
            </p>
          )}
        </motion.div>
      )}

      {/* Mentor */}
      {mentorTitle && (
        <MentorCard title={mentorTitle} description={mentorDescription} />
      )}
    </>
  );
}
