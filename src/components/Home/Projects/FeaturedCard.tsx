"use client";
import React, { useRef, useState } from "react";
import { ExternalLink, GitBranch, Sparkles } from "lucide-react";
import { Project, categoryLabel, categoryGlow, ActionBtn } from "./types";

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
      className="group relative mb-10 sm:mb-12 rounded-[2rem] overflow-hidden border border-border bg-card/40 hover:border-foreground/[0.15] transition-all duration-500 shadow-lg hover:shadow-2xl"
    >
      {/* Bg image blurred */}
      <div className="absolute inset-0">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover scale-[1.08] opacity-30 blur-[3px] group-hover:opacity-40 group-hover:scale-[1.04] transition-all duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-background/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/75 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
      </div>

      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025]"
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
          background: `radial-gradient(500px circle at ${pos.x}% ${pos.y}%, ${glow}, transparent 70%)`,
        }}
      />

      {/* Glow top edge */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${glow} 50%, transparent 100%)`,
        }}
      />

      {/* Featured badge */}
      <div className="absolute top-5 right-5 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 backdrop-blur-sm">
        <Sparkles className="w-3 h-3 text-amber-400" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
          Featured
        </span>
      </div>

      <div className="relative z-10 grid lg:grid-cols-[1fr_1.3fr] gap-8 sm:gap-10 p-6 sm:p-10 lg:p-14 items-center">
        {/* Left: content */}
        <div className="max-w-2xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-foreground/50 mb-3">
            {categoryLabel[project.category] || project.tagline || "Project"}
          </p>

          <h3 className="text-2xl md:text-4xl font-black text-foreground tracking-tight leading-[0.95] mb-4 group-hover:text-foreground transition-colors">
            {project.title}
          </h3>

          {/* Meta badges */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-card/60 border border-border rounded-lg text-foreground/75 backdrop-blur-sm">
              {project.projectType === "CLIENT" ? "Client Project" : "Personal"}
            </span>
            {project.client && (
              <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-card/60 border border-border rounded-lg text-foreground/65 backdrop-blur-sm">
                {project.client}
              </span>
            )}
            {project.year && (
              <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-card/60 border border-border rounded-lg text-foreground/65 backdrop-blur-sm">
                {project.year}
              </span>
            )}
          </div>

          <p className="text-sm sm:text-[15px] text-foreground/55 leading-relaxed mb-7 max-w-xl">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mb-7">
            {project.tech.slice(0, 6).map((t) => (
              <span
                key={t}
                className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider bg-card/50 border border-border/70 rounded-xl text-foreground/55 backdrop-blur-sm hover:border-foreground/20 hover:text-foreground/75 transition-all duration-200"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <ActionBtn
              href={project.demoLink}
              icon={ExternalLink}
              label="Visit Website"
              filled
            />
            {project.githubLink && (
              <ActionBtn
                href={project.githubLink}
                icon={GitBranch}
                label="Source Code"
              />
            )}
          </div>
        </div>

        {/* Right: preview image */}
        <div className="relative lg:justify-self-end w-full">
          {/* Glow behind image */}
          <div
            className="absolute -inset-4 rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-700"
            style={{ background: glow }}
          />
          <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-border/60 bg-card shadow-[0_24px_80px_rgba(0,0,0,0.35)] group-hover:shadow-[0_32px_100px_rgba(0,0,0,0.45)] group-hover:border-foreground/[0.12] transition-all duration-500">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-700 ease-out"
            />
            {/* Subtle vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>

          {/* Floating dot decorations */}
          <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full border border-border/40 opacity-50 group-hover:opacity-80 transition-opacity" />
          <div className="absolute -bottom-4 -left-4 w-10 h-10 rounded-full border border-border/30 opacity-30 group-hover:opacity-60 transition-opacity" />
        </div>
      </div>
    </div>
  );
}
