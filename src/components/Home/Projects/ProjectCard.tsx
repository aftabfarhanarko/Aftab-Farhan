"use client";
import React, { useRef, useState } from "react";
import { ExternalLink, ArrowUpRight, Info, X, Calendar, Layers, User, Loader2, Clock } from "lucide-react";
import {
  Project,
  categoryLabel,
  categoryBadge,
  categoryAccentBar,
  categoryGlow,
  TechPill,
  ActionBtn,
} from "./types";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<Project | null>(null);
  const [isModalLoading, setIsModalLoading] = useState(false);

  const badge =
    categoryBadge[project.category] ??
    "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-foreground/50";
  const accentBar =
    categoryAccentBar[project.category] ?? "from-foreground/20 to-transparent";
  const glow = categoryGlow[project.category] ?? "rgba(255,255,255,0.06)";

  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlight({ x, y, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setSpotlight((s) => ({ ...s, opacity: 0 }));
  };

  const handleOpenDetails = async () => {
    setIsModalOpen(true);
    setIsModalLoading(true);
    try {
      const res = await fetch(`/api/projects/${project.id}`);
      if (res.ok) {
        const data = await res.json();
        setModalData(data);
      } else {
        setModalData(project);
      }
    } catch (error) {
      console.error("Error loading project details:", error);
      setModalData(project);
    } finally {
      setIsModalLoading(false);
    }
  };

  const displayProject = modalData || project;

  return (
    <>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative flex flex-col rounded-2xl border border-border bg-card/30 hover:border-foreground/[0.18] transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl backdrop-blur-md"
      >
        {/* Spotlight overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 rounded-2xl"
          style={{
            opacity: spotlight.opacity,
            background: `radial-gradient(280px circle at ${spotlight.x}% ${spotlight.y}%, ${glow}, transparent 70%)`,
          }}
        />

        {/* Category glow border */}
        <div
          className="pointer-events-none absolute inset-0 z-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${glow} 0%, transparent 60%)`,
          }}
        />

        {/* Thumbnail */}
        <div className="relative aspect-[16/9] overflow-hidden bg-black/10">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-50 group-hover:opacity-85 group-hover:scale-[1.06] transition-all duration-700 ease-out contrast-[1.02] brightness-[0.95] group-hover:brightness-100 group-hover:contrast-100"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />

          {/* Top badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
            <div className="flex items-center gap-1.5">
              <span
                className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-widest border rounded-lg backdrop-blur-sm shadow-sm ${badge}`}
              >
                {categoryLabel[project.category] || project.category}
              </span>
              {project.projectType === "CLIENT" && (
                <span className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 rounded-lg backdrop-blur-sm shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                  </span>
                  Client Project
                </span>
              )}
            </div>
            <span className="px-3 py-1.5 text-[10px] font-black text-foreground/60 bg-black/50 backdrop-blur-sm border border-white/10 rounded-lg">
              {project.year}
            </span>
          </div>

          {/* Hover quick-actions */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 bg-white text-black text-xs font-bold rounded-xl shadow-2xl hover:bg-white/90 transition-all active:scale-95 hover:shadow-white/20 hover:shadow-lg"
            >
              <ExternalLink className="w-3 h-3" /> Live
            </a>
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 bg-black/60 text-white text-xs font-bold rounded-xl border border-white/20 backdrop-blur-sm hover:bg-black/50 transition-all active:scale-95"
              >
                <Github className="w-3 h-3 text-white" /> Code
              </a>
            )}
          </div>

          {/* Bottom accent line */}
          <div
            className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${accentBar} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
          />
        </div>

        {/* Body */}
        <div className="relative z-10 flex flex-col flex-1 p-4 sm:p-5">
          {/* Accent gradient line */}
          <div
            className={`h-px w-full bg-gradient-to-r ${accentBar} mb-4 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
          />

          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h4 className="text-sm sm:text-[15px] font-bold text-foreground/90 leading-snug group-hover:text-foreground transition-colors duration-200">
              {project.title}
            </h4>
            <ArrowUpRight className="w-4 h-4 text-foreground/20 group-hover:text-foreground/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0 mt-0.5" />
          </div>

          <p className="text-[10px] font-bold text-foreground/30 mb-2.5 uppercase tracking-wider">
            {project.tagline}
            {project.client && ` · ${project.client}`}
          </p>

          <p className="text-[12px] text-foreground/45 leading-relaxed mb-4 line-clamp-2 flex-1">
            {project.description}
          </p>

          {/* Tech pills - Shows all technologies */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tech.map((t) => (
              <TechPill key={t} label={t} />
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-2 flex-wrap items-center mt-auto">
            <ActionBtn
              href={project.demoLink}
              icon={ExternalLink}
              label="Live Demo"
              filled
              sm
            />
            {project.githubLink && (
              <ActionBtn
                href={project.githubLink}
                icon={Github}
                label="Source"
                sm
              />
            )}
            <button
              onClick={handleOpenDetails}
              className="inline-flex items-center gap-1.5 font-semibold transition-all duration-200 active:scale-95 px-3.5 py-2 text-[11px] rounded-xl border border-border/70 text-foreground/55 hover:border-foreground/25 hover:text-foreground/80 bg-card/40 hover:bg-card/60 backdrop-blur-sm cursor-pointer ml-auto"
              type="button"
            >
              <Info className="w-3.5 h-3.5" />
              Details
            </button>
          </div>
        </div>
      </div>

      {/* Premium Project Details Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-all duration-300">
          <div className="relative w-full max-w-2xl bg-card border border-border rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] transition-all duration-300">
            {/* Header / Top Image section */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/10 shrink-0 border-b border-border/40">
              <img
                src={displayProject.image}
                alt={displayProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 border border-white/10 text-white/70 hover:text-white hover:bg-black/80 transition-all cursor-pointer z-20"
                type="button"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Title & Category Badge */}
              <div className="absolute bottom-4 left-6 right-6 z-10">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-widest border rounded-lg backdrop-blur-sm ${badge}`}>
                    {categoryLabel[displayProject.category] || displayProject.category}
                  </span>
                  {displayProject.projectType === "CLIENT" && (
                    <span className="px-2.5 py-1 text-[9px] font-black uppercase tracking-widest bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 rounded-lg backdrop-blur-sm flex items-center gap-1.5 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Client Project
                    </span>
                  )}
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight leading-none">
                  {displayProject.title}
                </h3>
              </div>
            </div>

            {/* Modal Body / Scrollable Content */}
            {isModalLoading ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-4 flex-1 bg-card">
                <Loader2 className="w-8 h-8 animate-spin text-foreground/45" />
                <p className="text-[10px] font-black text-foreground/40 uppercase tracking-widest animate-pulse">
                  Fetching details...
                </p>
              </div>
            ) : (
              <div className="p-6 overflow-y-auto space-y-6 flex-1">
                {/* Premium Meta Info Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-b border-border/40 pb-6">
                  <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.04] backdrop-blur-sm">
                    <span className="text-[9px] font-bold text-foreground/40 uppercase tracking-wider flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-foreground/50" /> Timeline
                    </span>
                    <span className="text-xs font-semibold text-foreground/80">
                      {displayProject.startDate && displayProject.endDate
                        ? `${displayProject.startDate} - ${displayProject.endDate}`
                        : displayProject.year || "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.04] backdrop-blur-sm">
                    <span className="text-[9px] font-bold text-foreground/40 uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-foreground/50" /> Duration
                    </span>
                    <span className="text-xs font-semibold text-foreground/80">
                      {displayProject.duration || "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.04] backdrop-blur-sm">
                    <span className="text-[9px] font-bold text-foreground/40 uppercase tracking-wider flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-foreground/50" /> Client
                    </span>
                    <span className="text-xs font-semibold text-foreground/80 truncate" title={displayProject.client || "Personal Project"}>
                      {displayProject.client || "Personal Project"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.04] backdrop-blur-sm">
                    <span className="text-[9px] font-bold text-foreground/40 uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-foreground/50" /> Project Type
                    </span>
                    <span className="text-xs font-semibold text-foreground/80">
                      {displayProject.projectType === "CLIENT" ? "Client Work" : "Personal Work"}
                    </span>
                  </div>
                </div>

                {/* Tagline & Description */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-black text-foreground/35 uppercase tracking-widest">
                    About Project
                  </h4>
                  <p className="text-xs sm:text-sm font-bold text-foreground/85 leading-relaxed">
                    {displayProject.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-foreground/60 leading-relaxed whitespace-pre-line">
                    {displayProject.description}
                  </p>
                </div>

                {/* Technologies */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black text-foreground/35 uppercase tracking-widest">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {displayProject.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider bg-card/60 border border-border rounded-xl text-foreground/75 backdrop-blur-sm shadow-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Footer / Call To Actions */}
            <div className="p-5 border-t border-border/40 bg-card/20 flex gap-3 shrink-0">
              <a
                href={displayProject.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-foreground text-background font-bold text-xs rounded-xl shadow-lg hover:bg-foreground/90 transition-all active:scale-[0.98]"
              >
                <ExternalLink className="w-4 h-4" />
                Visit Website
              </a>
              {displayProject.githubLink && (
                <a
                  href={displayProject.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 border border-border/80 bg-card hover:bg-card/60 text-foreground/80 hover:text-foreground font-bold text-xs rounded-xl transition-all active:scale-[0.98]"
                >
                  <Github className="w-4 h-4" />
                  Source Code
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
