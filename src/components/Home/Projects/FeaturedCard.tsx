"use client";
import React, { useRef, useState } from "react";
import { ExternalLink, Sparkles } from "lucide-react";
import { Project, categoryLabel, categoryGlow, ActionBtn } from "./types";

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
      className={`group relative mb-10 sm:mb-12 rounded-[2rem] overflow-hidden border transition-all duration-500 shadow-xl hover:shadow-2xl flex items-center min-h-[500px] sm:min-h-[560px] p-4 sm:p-8 lg:p-12 ${
        project.currentlyWorking
          ? "border-emerald-500/30 hover:border-emerald-500/50"
          : "border-border hover:border-foreground/[0.15]"
      }`}
    >
      {/* Full Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-center scale-[1.01] group-hover:scale-[1.04] transition-all duration-[1200ms] ease-out brightness-[0.4] group-hover:brightness-[0.45] contrast-[1.05]"
        />
        {/* Deep rich gradient overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10" />
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
          background: `radial-gradient(500px circle at ${pos.x}% ${pos.y}%, ${
            project.currentlyWorking ? "rgba(16,185,129,0.12)" : glow
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

      {/* Floating Glassmorphic Content Card */}
      <div className="relative z-20 max-w-xl w-full p-6 sm:p-8 rounded-[1.75rem] border border-white/[0.08] bg-black/65 backdrop-blur-xl shadow-[0_24px_50px_rgba(0,0,0,0.5)] group-hover:border-white/[0.15] transition-all duration-500">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-foreground/45 mb-2.5">
          {categoryLabel[project.category] || project.tagline || "Project"}
        </p>

        <h3 className="text-xl sm:text-3xl font-black text-white tracking-tight leading-[1.05] mb-3.5">
          {project.title}
        </h3>

        {/* Meta badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4.5">
          <span className="px-2.5 py-1 text-[9px] font-black uppercase tracking-wider bg-white/5 border border-white/10 rounded-lg text-white/80">
            {project.projectType === "CLIENT" ? "Client Project" : "Personal"}
          </span>
          {project.client && (
            <span className="px-2.5 py-1 text-[9px] font-black uppercase tracking-wider bg-white/5 border border-white/10 rounded-lg text-white/70">
              {project.client}
            </span>
          )}
          {project.year && (
            <span className="px-2.5 py-1 text-[9px] font-black uppercase tracking-wider bg-white/5 border border-white/10 rounded-lg text-white/70">
              {project.year}
            </span>
          )}
        </div>

        <p className="text-[12.5px] sm:text-[13px] text-white/60 leading-relaxed mb-6 font-medium whitespace-pre-line">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-7">
          {project.tech.slice(0, 7).map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/[0.04] border border-white/[0.08] rounded-lg text-white/50 hover:border-white/20 hover:text-white/85 transition-all duration-200"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2.5">
          <ActionBtn
            href={project.demoLink}
            icon={ExternalLink}
            label="Visit Website"
            filled
          />
          {project.githubLink && (
            <ActionBtn
              href={project.githubLink}
              icon={Github}
              label="Source Code"
            />
          )}
        </div>
      </div>
    </div>
  );
}
