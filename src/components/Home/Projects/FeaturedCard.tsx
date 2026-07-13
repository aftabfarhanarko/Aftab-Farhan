"use client";
import React, { useRef, useState } from "react";
import { ExternalLink, Sparkles, Briefcase, Users, Calendar } from "lucide-react";
import { Project, categoryLabel, categoryGlow } from "./types";

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
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50, show: false });
  const glow = categoryGlow[project.category] ?? "rgba(255,255,255,0.05)";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      show: true,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPos((p) => ({ ...p, show: false }))}
      className={`group relative mb-10 sm:mb-12 rounded-[2rem] overflow-hidden border transition-all duration-500 shadow-xl hover:shadow-2xl flex items-center min-h-[500px] sm:min-h-[560px] p-6 sm:p-10 lg:p-14 ${
        project.currentlyWorking
          ? "border-emerald-500/30 hover:border-emerald-500/50"
          : "border-border hover:border-foreground/[0.15]"
      }`}
    >
      {/* Full Background Image (Blurred and Darkened for Ambient Glow) */}
      <div className="absolute inset-0 z-0">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-center scale-[1.05] transition-all duration-[1200ms] ease-out brightness-[0.18] blur-[12px] opacity-80 group-hover:brightness-[0.22] group-hover:scale-[1.08]"
        />
        {/* Deep rich gradient overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent z-10" />
      </div>

      {/* Grid texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] z-10 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(255,255,255,1) 39px,rgba(255,255,255,1) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(255,255,255,1) 39px,rgba(255,255,255,1) 40px)",
        }}
      />

      {/* Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-[2rem] transition-opacity duration-300"
        style={{
          opacity: pos.show ? 1 : 0,
          background: `radial-gradient(600px circle at ${pos.x}% ${pos.y}%, ${
            project.currentlyWorking ? "rgba(16,185,129,0.08)" : glow
          }, transparent 70%)`,
        }}
      />

      {/* Top right status badge */}
      <div className="absolute top-5 right-5 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-xl border backdrop-blur-sm bg-black/40 border-white/10">
        {project.currentlyWorking ? (
          <>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400">
              Active / Currently Working
            </span>
          </>
        ) : (
          <>
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-amber-400">
              Featured
            </span>
          </>
        )}
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full z-20 relative">
        
        {/* Left Column (Content) */}
        <div className="lg:col-span-7 flex flex-col text-left">
          {/* Tagline/Category with Line below */}
          <div className="mb-4">
            <span className="text-[11px] font-black uppercase tracking-[0.22em] text-white/50">
              {categoryLabel[project.category] || project.category || "PROJECT"}
            </span>
            <div className="h-[2px] w-12 bg-white/20 mt-2 rounded-full" />
          </div>

          {/* Title and Tagline combined */}
          <h3 className="text-2xl sm:text-4xl lg:text-[40px] font-black text-white tracking-tight leading-[1.1] mb-6">
            {project.title}
            {project.tagline && (
              <span className="text-white/80 font-medium text-lg sm:text-xl lg:text-[24px] block mt-2">
                {project.tagline}
              </span>
            )}
          </h3>

          {/* Meta Badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-6">
            {project.client && (
              <span className="px-3.5 py-1.5 text-[11px] font-semibold bg-white/[0.05] border border-white/[0.08] rounded-full text-white/80 flex items-center gap-1.5 backdrop-blur-sm shadow-sm">
                <Briefcase className="w-3.5 h-3.5 text-white/40" />
                {project.client}
              </span>
            )}
            <span className="px-3.5 py-1.5 text-[11px] font-semibold bg-white/[0.05] border border-white/[0.08] rounded-full text-white/80 flex items-center gap-1.5 backdrop-blur-sm shadow-sm">
              <Users className="w-3.5 h-3.5 text-white/40" />
              {project.projectType === "CLIENT" ? "Client Project" : "Personal Project"}
            </span>
            {project.year && (
              <span className="px-3.5 py-1.5 text-[11px] font-semibold bg-white/[0.05] border border-white/[0.08] rounded-full text-white/80 flex items-center gap-1.5 backdrop-blur-sm shadow-sm">
                <Calendar className="w-3.5 h-3.5 text-white/40" />
                {project.year}
              </span>
            )}
          </div>

          {/* Project Description */}
          <p className="text-[13px] sm:text-[14px] text-white/60 leading-relaxed mb-6 font-medium whitespace-pre-line max-w-xl">
            {project.description}
          </p>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.slice(0, 7).map((t) => (
              <span
                key={t}
                className="px-3.5 py-1 text-[11px] font-medium bg-white/[0.04] border border-white/[0.08] rounded-full text-white/50 hover:border-white/20 hover:text-white/80 transition-all duration-200"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Call to Actions */}
          <div className="flex flex-wrap gap-3">
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-transparent hover:bg-white/10 text-white border border-white/20 hover:border-white/40 rounded-full font-bold uppercase tracking-wider text-[11px] transition-all duration-300 active:scale-95 flex items-center gap-2"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Visit Website
            </a>
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-transparent hover:bg-white/10 text-white border border-white/20 hover:border-white/40 rounded-full font-bold uppercase tracking-wider text-[11px] transition-all duration-300 active:scale-95 flex items-center gap-2"
              >
                <Github className="w-3.5 h-3.5" />
                Source Code
              </a>
            )}
          </div>
        </div>

        {/* Right Column (Mockup Container) */}
        <div className="lg:col-span-5 w-full flex justify-center">
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-[350px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 bg-black/40 group/mockup flex items-center justify-center transition-transform duration-500 hover:scale-[1.01] hover:-rotate-1">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-center group-hover/mockup:scale-[1.03] transition-all duration-700 ease-out"
            />
            {/* Ambient inner glow ring */}
            <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none" />
            {/* Subtle backlight glow behind mockup */}
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/25 to-indigo-600/25 rounded-2xl blur opacity-30 group-hover/mockup:opacity-40 transition duration-1000 -z-10" />
          </div>
        </div>

      </div>
    </div>
  );
}
