"use client";
import React, { useRef, useState } from "react";
import { ExternalLink, ArrowUpRight, Info, Calendar, Layers, User, Briefcase, Users } from "lucide-react";
import {
  Project,
  categoryLabel,
} from "./types";
import { useRouter } from "next/navigation";

const Github = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function ProjectCard({ project }: { project: Project }) {
  const router = useRouter();

  const handleOpenDetails = () => {
    router.push(`/projects/${project.id}`);
  };

  return (
    <div
      onClick={handleOpenDetails}
      className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white hover:border-orange-300 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md cursor-pointer"
    >
      {/* Header Bar */}
      <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between z-10">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
        </div>

        {/* Category Pill */}
        <span className="px-2.5 py-0.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-full flex items-center gap-1">
          <Layers className="w-3 h-3 text-[#FF6014] shrink-0" />
          {categoryLabel[project.category] || project.category}
        </span>
      </div>

      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 border-b border-slate-200">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-500 ease-out"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center gap-1.5 z-10 pointer-events-none">
          {project.projectType === "CLIENT" ? (
            <span className="px-2.5 py-1 text-xs font-bold text-amber-900 bg-amber-50/90 border border-amber-200 rounded-full flex items-center gap-1 shadow-sm">
              <Briefcase className="w-3 h-3 text-amber-600 shrink-0" />
              Client Project
            </span>
          ) : project.projectType === "TEAM" ? (
            <span className="px-2.5 py-1 text-xs font-bold text-slate-800 bg-white/90 border border-slate-200 rounded-full flex items-center gap-1 shadow-sm">
              <Users className="w-3 h-3 text-slate-600 shrink-0" />
              Team Project
            </span>
          ) : (
            <span className="px-2.5 py-1 text-xs font-bold text-slate-800 bg-white/90 border border-slate-200 rounded-full flex items-center gap-1 shadow-sm">
              <User className="w-3 h-3 text-slate-600 shrink-0" />
              Personal Project
            </span>
          )}

          {project.year && (
            <span className="px-2.5 py-1 text-xs font-bold text-slate-800 bg-white/90 border border-slate-200 rounded-full flex items-center gap-1 shadow-sm ml-auto">
              <Calendar className="w-3 h-3 text-slate-600 shrink-0" />
              {project.year}
            </span>
          )}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug group-hover:text-[#FF6014] transition-colors duration-200">
            {project.title}
          </h3>
          <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-[#FF6014] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0 mt-1" />
        </div>

        {project.tagline && (
          <p className="text-xs font-bold text-[#FF6014] mb-3 uppercase tracking-wider">
            {project.tagline}
          </p>
        )}

        <p className="text-sm sm:text-base text-slate-800 leading-relaxed mb-5 font-medium flex-1 text-justify">
          {project.description}
        </p>

        {/* Tech Stack Badges */}
        {project.tech && project.tech.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-xs font-bold bg-slate-100 border border-slate-300 rounded-lg text-slate-900"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Actions Bar */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex gap-2 flex-wrap items-center mt-auto pt-4 border-t border-slate-200"
        >
          {project.demoLink && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-[#FF6014] hover:bg-[#E5530F] rounded-xl shadow-sm transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Live Demo
            </a>
          )}

          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-all"
            >
              <Github className="w-3.5 h-3.5" /> GitHub
            </a>
          )}

          <button
            onClick={handleOpenDetails}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-sm transition-all ml-auto cursor-pointer"
            type="button"
          >
            <Info className="w-3.5 h-3.5" /> Details
          </button>
        </div>
      </div>
    </div>
  );
}
