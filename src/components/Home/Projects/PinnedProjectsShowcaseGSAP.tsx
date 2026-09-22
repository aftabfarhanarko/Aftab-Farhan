"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  ExternalLink,
  ArrowRight,
  X,
  Code2,
  CheckCircle2,
  Briefcase,
  User,
  Users,
} from "lucide-react";
import { Project, categoryLabel } from "./types";

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);



interface Highlight {
  title: string;
  detail: string;
}

function getRecruiterHighlights(project: Project): Highlight[] {
  const highlights: Highlight[] = [];

  if (project.category === "FULL_STACK") {
    highlights.push({
      title: "FULL-STACK ARCHITECTURE",
      detail: "Scalable client-server architecture with REST/GraphQL APIs.",
    });
  } else if (project.category === "AI_ML") {
    highlights.push({
      title: "AI & AGENTIC WORKFLOW",
      detail: "LLM agent integration & real-time prompt processing.",
    });
  } else if (project.category === "E_COMMERCE") {
    highlights.push({
      title: "E-COMMERCE & PAYMENTS",
      detail: "Cart architecture, inventory, and payment gateway integration.",
    });
  } else if (project.tagline) {
    highlights.push({
      title: project.tagline.toUpperCase(),
      detail: "Responsive component architecture.",
    });
  }

  if (project.tech.includes("Next.js") || project.tech.includes("React")) {
    highlights.push({
      title: "NEXT.JS & TYPESCRIPT",
      detail: "SSR, static optimization & type-safe frontend.",
    });
  } else {
    highlights.push({
      title: "PRODUCTION & CI/CD",
      detail: "Automated deployment, testing & performance monitoring.",
    });
  }

  return highlights.slice(0, 2);
}

interface PinnedProjectsShowcaseGSAPProps {
  projects: Project[];
}

export default function PinnedProjectsShowcaseGSAP({
  projects,
}: PinnedProjectsShowcaseGSAPProps) {
  const [techModalProject, setTechModalProject] = useState<Project | null>(null);
  const [activeGalleryIndices, setActiveGalleryIndices] = useState<Record<string, number>>({});

  if (projects.length === 0) return null;

  return (
    <div className="w-full relative">
      {/* 2-Column Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full">
        {projects.map((project, index) => {
          const highlights = getRecruiterHighlights(project);
          const displayedTech = project.tech ? project.tech.slice(0, 5) : [];
          const remainingTechCount = project.tech && project.tech.length > 5 ? project.tech.length - 5 : 0;

          const allProjectImages = Array.from(
            new Set([project.image, ...(project.gallery || [])].filter(Boolean) as string[])
          );
          const currentGalleryIdx = activeGalleryIndices[project.id] || 0;
          const activeImage = allProjectImages[currentGalleryIdx] || project.image;

          return (
            <article
              key={project.id}
              className="group relative rounded-3xl p-5 sm:p-7 flex flex-col justify-between bg-white text-slate-900 overflow-hidden shadow-md border border-slate-200/90 transition-all duration-300 hover:border-[#FF6014]/50  hover:-translate-y-1"
            >
              {/* Top Accent Beam */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#FF6014] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

              <div className="space-y-4">
                {/* 1. Header Badges */}
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs tracking-widest font-extrabold text-[#FF6014] bg-[#FF6014]/10 border border-[#FF6014]/20 px-2.5 py-0.5 rounded-full">
                      ({String(index + 1).padStart(2, "0")})
                    </span>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">
                      {categoryLabel[project.category] || project.category}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border flex items-center gap-1">
                    {project.projectType === "CLIENT" ? (
                      <span className="bg-amber-50 text-amber-800 border-amber-200 flex items-center gap-1">
                        <Briefcase className="w-3 h-3 text-amber-600" /> CLIENT
                      </span>
                    ) : project.projectType === "TEAM" ? (
                      <span className="bg-indigo-50 text-indigo-800 border-indigo-200 flex items-center gap-1">
                        <Users className="w-3 h-3 text-indigo-600" /> TEAM
                      </span>
                    ) : (
                      <span className="bg-emerald-50 text-emerald-800 border-emerald-200 flex items-center gap-1">
                        <User className="w-3 h-3 text-emerald-600" /> PERSONAL
                      </span>
                    )}
                  </span>
                </div>

                {/* 2. Title linking to dedicated details page */}
                <Link
                  href={`/projects/${project.id}`}
                  className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 leading-snug cursor-pointer group-hover:text-[#FF6014] transition-colors block"
                >
                  {project.title}
                </Link>

                {/* 3. Browser Mockup Display (Website Frame) */}
                <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 flex flex-col shadow-xs group-hover:shadow-md transition-shadow">
                  {/* Window Bar */}
                  <div className="w-full h-8 bg-slate-100 border-b border-slate-200 px-3 flex items-center justify-between z-10 shrink-0">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 block" />
                    </div>
                    <div className="px-3 py-0.5 rounded-full bg-white border border-slate-200 text-[10px] font-mono text-slate-600 truncate max-w-[200px] shadow-2xs font-bold">
                      {project.demoLink ? project.demoLink.replace(/^https?:\/\//, "") : `${project.title.toLowerCase().replace(/\s+/g, "")}.com`}
                    </div>
                    <span className="text-[9px] font-mono font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                      LIVE PREVIEW
                    </span>
                  </div>

                  {/* Screenshot Display linking to dedicated details page */}
                  <Link
                    href={`/projects/${project.id}`}
                    className="relative w-full h-[220px] sm:h-[250px] overflow-hidden bg-slate-950 flex items-center justify-center p-1 cursor-pointer group/img block"
                  >
                    <img
                      src={activeImage}
                      alt={project.title}
                      className="w-full h-full object-contain rounded-lg transition-transform duration-300 group-hover/img:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <span className="px-4 py-2 rounded-full bg-white text-slate-900 text-xs font-bold shadow-lg flex items-center gap-1.5">
                        View Details <ArrowRight className="w-3.5 h-3.5 text-[#FF6014]" />
                      </span>
                    </div>
                  </Link>

                  {/* Gallery Thumbnails */}
                  {allProjectImages.length > 1 && (
                    <div className="p-2 bg-slate-50 border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto">
                      <span className="text-[10px] font-mono text-slate-500 font-bold uppercase px-1 shrink-0">
                        Gallery ({allProjectImages.length}):
                      </span>
                      {allProjectImages.map((imgUrl, imgIdx) => (
                        <button
                          key={imgIdx}
                          type="button"
                          onClick={() =>
                            setActiveGalleryIndices((prev) => ({
                              ...prev,
                              [project.id]: imgIdx,
                            }))
                          }
                          className={`w-10 h-7 rounded-md overflow-hidden border transition-all shrink-0 cursor-pointer ${
                            currentGalleryIdx === imgIdx
                              ? "border-[#FF6014] ring-1 ring-[#FF6014]"
                              : "border-slate-300 opacity-70 hover:opacity-100"
                          }`}
                        >
                          <img src={imgUrl} alt="Thumb" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* 4. Overview / Tagline */}
                {project.overview || project.tagline ? (
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed line-clamp-2">
                    {project.overview || project.tagline}
                  </p>
                ) : null}

                {/* 5. Recruiter Highlights */}
                <div className="space-y-2 pt-1">
                  {highlights.map((h, hIdx) => (
                    <div
                      key={hIdx}
                      className="flex items-start gap-2 bg-slate-50 border border-slate-200/80 p-2.5 rounded-xl"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#FF6014] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-mono font-extrabold text-[#FF6014] uppercase tracking-wider block">
                          {h.title}
                        </span>
                        <p className="text-xs text-slate-800 font-medium leading-tight">
                          {h.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 6. Footer: Tech Stack Badges & Actions */}
              <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
                {/* Tech Stack Pills */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {displayedTech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-[11px] font-mono font-extrabold bg-slate-100 border border-slate-200 rounded-lg text-slate-800"
                    >
                      {t}
                    </span>
                  ))}
                  {remainingTechCount > 0 && (
                    <button
                      type="button"
                      onClick={() => setTechModalProject(project)}
                      className="px-2.5 py-1 text-[11px] font-mono font-extrabold bg-[#FF6014] text-white rounded-lg hover:bg-orange-600 transition-colors cursor-pointer"
                    >
                      +{remainingTechCount} more
                    </button>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-2 pt-1">
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-[#FF6014] hover:bg-orange-600 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <ExternalLink size={13} /> Live Demo
                    </a>
                  )}

                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <GithubIcon className="w-3.5 h-3.5 text-slate-800" /> Code
                    </a>
                  )}

                  <Link
                    href={`/projects/${project.id}`}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    Case Study <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Tech Stack Full Modal / Overlay */}
      {techModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 shadow-2xl text-slate-900 space-y-4 relative">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-[#FF6014]" />
                <h4 className="font-extrabold text-base sm:text-lg">
                  Tech Stack — {techModalProject.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setTechModalProject(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 font-medium">
              Complete technology stack powering this digital release ({techModalProject.tech.length} total):
            </p>

            <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto p-1">
              {techModalProject.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 text-xs font-mono font-extrabold bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setTechModalProject(null)}
                className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
