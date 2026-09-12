import React from "react";
import { ExternalLink, Sparkles, Briefcase, Users, Calendar, User, CheckCircle2, ArrowRight } from "lucide-react";
import { Project, categoryLabel } from "./types";
import Link from "next/link";

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

function getTechnicalHighlights(project: Project): string[] {
  const highlights: string[] = [];
  
  if (project.category === "FULL_STACK") {
    highlights.push("End-to-End Full Stack & API Webhooks Integration");
  } else if (project.category === "AI_ML") {
    highlights.push("LLM API Integration & Intelligent Vector Workflows");
  } else if (project.category === "E_COMMERCE") {
    highlights.push("High-Scale Product Catalog & Transaction Engine");
  } else if (project.tagline) {
    highlights.push(project.tagline);
  }

  if (project.tech.includes("Next.js") || project.tech.includes("React")) {
    highlights.push("Responsive Next.js & TypeScript User Interface");
  } else if (project.tech.includes("Node.js") || project.tech.includes("Express") || project.tech.includes("NestJS")) {
    highlights.push("RESTful API & Microservices Backend Architecture");
  } else {
    highlights.push("Clean Modular Architecture & Performance Optimization");
  }

  if (project.tech.some(t => ["PostgreSQL", "Prisma", "MongoDB", "Redis"].includes(t))) {
    highlights.push("Optimized Database Schema & ORM Data Access");
  } else if (project.projectType === "CLIENT") {
    highlights.push("Production Client Deployment & High Availability");
  } else {
    highlights.push("Role-Based Workflows & Automated Security");
  }

  return highlights.slice(0, 3);
}

export default function FeaturedCard({ project }: { project: Project }) {
  const highlights = getTechnicalHighlights(project);

  return (
    <div className="group relative mb-10 sm:mb-14 rounded-2xl overflow-hidden glass-card-featured transition-all duration-300 p-6 sm:p-10 lg:p-12 hover:border-orange-400/50 hover:shadow-2xl">
      {/* Top Sweep Beam */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF6014]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

      {/* Top right status badge */}
      <div className="absolute top-5 right-5 z-20 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border bg-orange-50/90 border-orange-200/90 backdrop-blur-md shadow-xs">
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
              01 — FEATURED SHOWCASE • {categoryLabel[project.category] || project.category || "PROJECT"}
            </span>
          </div>

          <h3 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-900 tracking-tight leading-[1.1] mb-3 group-hover:text-[#FF6014] transition-colors duration-200">
            {project.title}
          </h3>

          {project.tagline && (
            <p className="text-[#FF6014] font-extrabold text-sm sm:text-base uppercase tracking-wider mb-4">
              {project.tagline}
            </p>
          )}

          {/* Meta Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="px-3 py-1 text-xs font-bold text-emerald-900 bg-emerald-50 border border-emerald-200 rounded-full flex items-center gap-1.5 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Production Ready
            </span>
            {project.projectType === "CLIENT" ? (
              <span className="px-3 py-1 text-xs font-bold text-amber-900 bg-amber-50 border border-amber-200 rounded-full flex items-center gap-1.5 shadow-2xs">
                <Briefcase className="w-3.5 h-3.5 text-amber-600" />
                <span>Client Project</span>
                {project.client && <span className="text-amber-700 font-semibold">• {project.client}</span>}
              </span>
            ) : project.projectType === "TEAM" ? (
              <span className="px-3 py-1 text-xs font-bold bg-slate-100 border border-slate-200 rounded-full text-slate-800 flex items-center gap-1.5 shadow-2xs">
                <Users className="w-3.5 h-3.5 text-slate-600" />
                Team Project
              </span>
            ) : (
              <span className="px-3 py-1 text-xs font-bold bg-slate-100 border border-slate-200 rounded-full text-slate-800 flex items-center gap-1.5 shadow-2xs">
                <User className="w-3.5 h-3.5 text-slate-600" />
                Personal Project
              </span>
            )}
            {project.year && (
              <span className="px-3 py-1 text-xs font-bold bg-slate-100 border border-slate-200 rounded-full text-slate-800 flex items-center gap-1.5 shadow-2xs">
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
                <p key={idx} className="text-base sm:text-lg text-slate-800 leading-[1.7] font-medium text-justify">
                  {trimmed}
                </p>
              );
            })}
          </div>

          {/* Key Technical Highlights */}
          <div className="mb-6 pt-4 border-t border-slate-200/70">
            <span className="text-xs font-black uppercase tracking-wider text-slate-700 block mb-2.5">
              Key Technical Highlights
            </span>
            <div className="space-y-2">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-slate-800 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#FF6014] mt-0.5 shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech pills */}
          {project.tech && project.tech.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 text-xs font-bold glass-card-compact rounded-xl text-slate-900 hover:border-orange-300 hover:text-[#FF6014] transition-colors"
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
                className="px-6 py-3 bg-[#FF6014] hover:bg-[#E5530F] text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-2 shadow-md shadow-orange-500/20 active:scale-95"
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
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-2 active:scale-95"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            )}
            <Link
              href={`/projects/${project.id}`}
              className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 shadow-xs active:scale-95"
            >
              <span>Case Study</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#FF6014]" />
            </Link>
          </div>
        </div>

        {/* Right Column (Showcase Mockup Frame) */}
        <div className="lg:col-span-5 w-full flex justify-center">
          <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200/90 bg-white flex flex-col shadow-lg group/frame">
            {/* Header Bar */}
            <div className="px-4 py-2.5 bg-slate-100/90 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
              </div>
              <div className="px-3 py-0.5 rounded bg-white border border-slate-200 text-xs font-mono text-slate-600 truncate max-w-[200px]">
                {project.demoLink ? project.demoLink.replace(/^https?:\/\/(www\.)?/, "") : "preview.app"}
              </div>
              <div className="w-8" />
            </div>

            {/* Image Preview */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-[340px] w-full overflow-hidden bg-slate-50">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-top group-hover/frame:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
