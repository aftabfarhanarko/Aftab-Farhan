import React from "react";
import { ExternalLink, ArrowUpRight, Info, Calendar, Layers, User, Briefcase, Users, CheckCircle2 } from "lucide-react";
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

function getTechnicalHighlights(project: Project): string[] {
  const highlights: string[] = [];
  
  if (project.category === "FULL_STACK") {
    highlights.push("Full-Stack Architecture & API Integration");
  } else if (project.category === "AI_ML") {
    highlights.push("LLM API & Agentic Workflow Engine");
  } else if (project.category === "E_COMMERCE") {
    highlights.push("Product Catalog & Checkout Engine");
  } else if (project.tagline) {
    highlights.push(project.tagline);
  }

  if (project.tech.includes("Next.js") || project.tech.includes("React")) {
    highlights.push("Next.js & TypeScript UI Architecture");
  } else if (project.tech.includes("Node.js") || project.tech.includes("Express") || project.tech.includes("NestJS")) {
    highlights.push("RESTful Services & Backend Logic");
  } else {
    highlights.push("Modular Engineering & Optimization");
  }

  if (project.tech.some(t => ["PostgreSQL", "Prisma", "MongoDB", "Redis"].includes(t))) {
    highlights.push("Database Schema & ORM Management");
  } else if (project.projectType === "CLIENT") {
    highlights.push("Production Client Deployment");
  } else {
    highlights.push("Role-Based Security & Workflows");
  }

  return highlights.slice(0, 2);
}

export default function ProjectCard({ project }: { project: Project }) {
  const router = useRouter();
  const highlights = getTechnicalHighlights(project);

  const handleOpenDetails = () => {
    router.push(`/projects/${project.id}`);
  };

  return (
    <div
      onClick={handleOpenDetails}
      data-cursor="project"
      data-cursor-label="VIEW PROJECT ↗"
      data-cursor-parallax
      data-parallax-speed="10"
      data-parallax-scale="1.025"
      className="group relative flex flex-col rounded-2xl glass-card-primary hover:border-orange-300 transition-all duration-300 overflow-hidden cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1.5"
    >
      {/* Top Sweep Beam */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF6014]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

      {/* Header Bar */}
      <div className="px-3.5 py-2 bg-slate-50/90 border-b border-slate-200/80 flex items-center justify-between z-10">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
        </div>

        {/* Category Pill */}
        <span className="px-2.5 py-0.5 text-[11px] font-bold text-slate-800 bg-white border border-slate-200/90 rounded-full flex items-center gap-1 shadow-2xs">
          <Layers className="w-3 h-3 text-[#FF6014] shrink-0" />
          {categoryLabel[project.category] || project.category}
        </span>
      </div>

      {/* Grid Container for Desktop Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 items-stretch flex-1 w-full">
        {/* Thumbnail Container (Desktop Left Column) */}
        <div className="md:col-span-5 relative aspect-[16/9.5] md:aspect-auto min-h-[220px] w-full overflow-hidden bg-slate-100 border-b md:border-b-0 md:border-r border-slate-200/80">
          <div className="project-image-mouse-layer w-full h-full">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-700 ease-out"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          {/* Badges Overlay */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex flex-wrap items-center gap-1.5 z-10 pointer-events-none">
            {project.projectType === "CLIENT" ? (
              <span className="px-2.5 py-0.5 text-[11px] font-bold text-amber-900 bg-amber-50/95 border border-amber-200 rounded-full flex items-center gap-1 shadow-sm backdrop-blur-xs">
                <Briefcase className="w-3 h-3 text-amber-600 shrink-0" />
                Client
              </span>
            ) : project.projectType === "TEAM" ? (
              <span className="px-2.5 py-0.5 text-[11px] font-bold text-slate-800 bg-white/95 border border-slate-200 rounded-full flex items-center gap-1 shadow-sm backdrop-blur-xs">
                <Users className="w-3 h-3 text-slate-600 shrink-0" />
                Team
              </span>
            ) : (
              <span className="px-2.5 py-0.5 text-[11px] font-bold text-slate-800 bg-white/95 border border-slate-200 rounded-full flex items-center gap-1 shadow-sm backdrop-blur-xs">
                <User className="w-3 h-3 text-slate-600 shrink-0" />
                Personal
              </span>
            )}

            {project.year && (
              <span className="px-2.5 py-0.5 text-[11px] font-bold text-slate-800 bg-white/95 border border-slate-200 rounded-full flex items-center gap-1 shadow-sm ml-auto backdrop-blur-xs">
                <Calendar className="w-3 h-3 text-slate-600 shrink-0" />
                {project.year}
              </span>
            )}
          </div>
        </div>

        {/* Card Content Body (Desktop Right Column) */}
        <div className="md:col-span-7 flex flex-col flex-1 p-4.5 sm:p-6 justify-between">
          <div>
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 data-cursor-title-parallax className="text-lg sm:text-2xl font-black text-slate-900 leading-snug group-hover:text-[#FF6014] transition-colors duration-200">
                {project.title}
              </h3>
              <ArrowUpRight className="w-4.5 h-4.5 text-slate-400 group-hover:text-[#FF6014] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0 mt-1" />
            </div>

            {project.tagline && (
              <p className="text-[11px] font-extrabold text-[#FF6014] mb-2 uppercase tracking-wider">
                {project.tagline}
              </p>
            )}

            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed mb-3 font-medium text-justify line-clamp-3">
              {project.description}
            </p>

            {/* Technical Highlights */}
            {highlights.length > 0 && (
              <div className="mb-3 pt-2.5 border-t border-slate-200/70 space-y-1">
                {highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-slate-800 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6014] shrink-0" />
                    <span className="truncate">{h}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            {/* Tech Stack Badges */}
            {project.tech && project.tech.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tech.slice(0, 5).map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 text-[11px] font-bold glass-card-compact rounded-lg text-slate-900 hover:border-orange-300 hover:text-[#FF6014] transition-colors"
                  >
                    {t}
                  </span>
                ))}
                {project.tech.length > 5 && (
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-100 border border-slate-200 rounded-lg text-slate-600">
                    +{project.tech.length - 5}
                  </span>
                )}
              </div>
            )}

            {/* Actions Bar */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex gap-2 flex-wrap items-center pt-3 border-t border-slate-200/80"
            >
              {project.demoLink && (
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-magnetic
                  data-magnetic-max="6"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-[#FF6014] hover:bg-[#E5530F] rounded-xl shadow-xs transition-all active:scale-95"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                </a>
              )}

              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-magnetic
                  data-magnetic-max="6"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-all active:scale-95"
                >
                  <Github className="w-3.5 h-3.5" /> GitHub
                </a>
              )}

              <button
                onClick={handleOpenDetails}
                data-cursor-magnetic
                data-magnetic-max="6"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl shadow-2xs transition-all ml-auto cursor-pointer active:scale-95"
                type="button"
              >
                <Info className="w-3.5 h-3.5 text-[#FF6014]" /> Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
