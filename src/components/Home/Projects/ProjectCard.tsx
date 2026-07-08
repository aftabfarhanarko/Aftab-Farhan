"use client";
import React, { useRef, useState } from "react";
import { ExternalLink, ArrowUpRight, GitBranch, Star } from "lucide-react";
import {
  Project,
  categoryLabel,
  categoryBadge,
  categoryAccentBar,
  categoryGlow,
  TechPill,
  ActionBtn,
} from "./types";

export default function ProjectCard({ project }: { project: Project }) {
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

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col rounded-2xl border border-border bg-card/40 hover:border-foreground/[0.18] transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl"
      style={{
        boxShadow: `0 0 0 0 transparent`,
      }}
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
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover opacity-50 group-hover:opacity-80 group-hover:scale-[1.06] transition-all duration-700 ease-out"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <span
            className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest border rounded-lg backdrop-blur-sm ${badge}`}
          >
            {categoryLabel[project.category] || project.category}
          </span>
          <span className="px-2.5 py-1 text-[9px] font-bold text-foreground/50 bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg">
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
              <GitBranch className="w-3 h-3" /> Code
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

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.slice(0, 3).map((t) => (
            <TechPill key={t} label={t} />
          ))}
          {project.tech.length > 3 && (
            <TechPill label={`+${project.tech.length - 3}`} />
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 flex-wrap">
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
              icon={GitBranch}
              label="Source"
              sm
            />
          )}
        </div>
      </div>
    </div>
  );
}
