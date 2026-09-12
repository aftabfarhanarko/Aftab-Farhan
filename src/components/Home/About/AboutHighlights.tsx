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

function ProjectsCard({ projects }: { projects: Project[] }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -3 }}
      className="rounded-2xl border border-slate-200 bg-white overflow-hidden text-left shadow-sm hover:border-orange-300 hover:shadow-md transition-all duration-300"
    >
      <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/80">
        <p className="text-xs font-black text-slate-700 uppercase tracking-widest">
          Recent Focus Projects
        </p>
      </div>
      <div className="divide-y divide-slate-100">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="px-5 py-4 hover:bg-orange-50/50 transition-colors cursor-default"
          >
            <p className="text-sm sm:text-base font-bold text-slate-900 mb-1">
              {project.title}
            </p>
            <p className="text-sm text-slate-800 leading-relaxed font-medium">
              {project.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function MentorCard({ title, description }: { title: string; description: string }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
      className="flex items-center gap-3.5 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-left shadow-sm hover:border-orange-300 hover:shadow-md transition-all duration-300 cursor-default group"
    >
      <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center shrink-0 text-[#FF6014] group-hover:bg-[#FF6014] group-hover:text-white transition-colors duration-300">
        <Users size={18} />
      </div>
      <div>
        <p className="text-base font-bold text-slate-900 mb-0.5 group-hover:text-[#FF6014] transition-colors">
          {title}
        </p>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
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
          whileHover={{ y: -2 }}
          className="border-l-4 border-[#FF6014] bg-slate-50/80 px-5 py-4 rounded-r-2xl text-left border border-slate-200 border-l-[#FF6014] shadow-xs hover:shadow-sm transition-all"
        >
          <blockquote className="text-sm sm:text-base text-slate-900 italic font-semibold leading-relaxed">
            &ldquo;{quoteText}&rdquo;
          </blockquote>
          {quoteAuthor && (
            <p className="text-right text-xs text-slate-700 mt-2 tracking-wide font-mono uppercase font-bold">
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
