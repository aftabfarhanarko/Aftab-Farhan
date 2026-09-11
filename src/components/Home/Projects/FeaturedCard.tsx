"use client";
import React from "react";
import { ExternalLink, Sparkles, Briefcase, Users, Calendar, User } from "lucide-react";
import { Project, categoryLabel } from "./types";

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

export default function FeaturedCard({ project }: { project: Project }) {
  return (
    <div className="group relative mb-10 sm:mb-14 rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 p-6 sm:p-10 lg:p-12">
      {/* Top right status badge */}
      <div className="absolute top-5 right-5 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full border bg-orange-50 border-orange-200">
        {project.currentlyWorking ? (
          <>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6014] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6014]"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF6014]">
              Active / Currently Working
            </span>
          </>
        ) : (
          <>
            <Sparkles className="w-3.5 h-3.5 text-[#FF6014]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF6014]">
              Featured Project
            </span>
          </>
        )}
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full relative">
        
        {/* Left Column (Content) */}
        <div className="lg:col-span-7 flex flex-col text-left">
          <div className="mb-3">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF6014]">
              {categoryLabel[project.category] || project.category || "PROJECT"}
            </span>
          </div>

          <h3 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-900 tracking-tight leading-[1.1] mb-4">
            {project.title}
            {project.tagline && (
              <span className="text-slate-600 font-bold text-lg sm:text-xl block mt-2">
                {project.tagline}
              </span>
            )}
          </h3>

          {/* Meta Badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            {project.projectType === "CLIENT" ? (
              <span className="px-3 py-1 text-xs font-bold text-amber-900 bg-amber-50 border border-amber-200 rounded-full flex items-center gap-1.5 shadow-sm">
                <Briefcase className="w-3.5 h-3.5 text-amber-600" />
                <span>Client Project</span>
                {project.client && <span className="text-amber-700 font-semibold">• {project.client}</span>}
              </span>
            ) : project.projectType === "TEAM" ? (
              <span className="px-3 py-1 text-xs font-bold bg-slate-100 border border-slate-200 rounded-full text-slate-800 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-slate-600" />
                Team Project
              </span>
            ) : (
              <span className="px-3 py-1 text-xs font-bold bg-slate-100 border border-slate-200 rounded-full text-slate-800 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-600" />
                Personal Project
              </span>
            )}
            {project.year && (
              <span className="px-3 py-1 text-xs font-bold bg-slate-100 border border-slate-200 rounded-full text-slate-800 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-600" />
                {project.year}
              </span>
            )}
          </div>

          {/* Project Description */}
          <div className="space-y-2 mb-6 max-w-xl">
            {project.description.split("\n").map((line, idx) => {
              const trimmed = line.trim();
              if (!trimmed) return null;
              return (
                <p key={idx} className="text-base sm:text-lg text-slate-600 leading-[1.7] font-normal">
                  {trimmed}
                </p>
              );
            })}
          </div>

          {/* Tech pills */}
          {project.tech && project.tech.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 text-xs font-semibold bg-slate-100 border border-slate-200 rounded-lg text-slate-800"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* Call to Actions */}
          <div className="flex flex-wrap gap-3">
            {project.demoLink && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 bg-[#FF6014] hover:bg-[#E5530F] text-white rounded-xl font-bold text-sm transition-all duration-200 flex items-center gap-2 shadow-sm"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200 rounded-xl font-bold text-sm transition-all duration-200 flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            )}
          </div>
        </div>

        {/* Right Column (Showcase Mockup Frame) */}
        <div className="lg:col-span-5 w-full flex justify-center">
          <div className="relative w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-50 flex flex-col shadow-sm">
            {/* Header Bar */}
            <div className="px-4 py-2.5 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
              </div>
              <div className="px-3 py-0.5 rounded bg-white border border-slate-200 text-xs font-mono text-slate-500 truncate max-w-[200px]">
                {project.demoLink ? project.demoLink.replace(/^https?:\/\/(www\.)?/, "") : "preview.app"}
              </div>
              <div className="w-8" />
            </div>

            {/* Image Preview */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-[320px] w-full overflow-hidden bg-white">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-top hover:scale-105 transition-all duration-500 ease-out"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
