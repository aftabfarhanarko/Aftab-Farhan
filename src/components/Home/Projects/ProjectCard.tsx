"use client";
import React from "react";
import { ExternalLink, ArrowUpRight, GitBranch } from "lucide-react";
import {
  Project,
  categoryLabel,
  categoryBadge,
  categoryAccentBar,
  TechPill,
  ActionBtn,
} from "./types";

export default function ProjectCard({ project }: { project: Project }) {
  const badge =
    categoryBadge[project.category] ??
    "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-foreground/50";
  const accentBar =
    categoryAccentBar[project.category] ?? "from-foreground/20 to-transparent";

  return (
    <div className="group relative flex flex-col rounded-2xl border border-border bg-card/40 hover:border-foreground/[0.16] hover:bg-foreground/[0.035] transition-all duration-300 overflow-hidden">
      {/* Thumbnail */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover opacity-55 group-hover:opacity-75 group-hover:scale-[1.04] transition-all duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Overlay badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span
            className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest border rounded-lg backdrop-blur-sm ${badge}`}
          >
            {categoryLabel[project.category] || project.category}
          </span>
          <span className="px-2.5 py-1 text-[9px] font-bold text-foreground/40 bg-background/40 backdrop-blur-sm border border-border rounded-lg">
            {project.year}
          </span>
        </div>

        {/* Hover quick-actions */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-250">
          <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 bg-white text-black text-xs font-bold rounded-xl shadow-2xl hover:bg-white/90 transition-colors"
          >
            <ExternalLink className="w-3 h-3" /> Live
          </a>
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 bg-background/80 text-foreground text-xs font-bold rounded-xl border border-border backdrop-blur-sm hover:bg-background/60 transition-colors"
            >
              <GitBranch className="w-3 h-3" /> Code
            </a>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        {/* Accent gradient line */}
        <div
          className={`h-px w-full bg-gradient-to-r ${accentBar} mb-4 rounded-full opacity-70`}
        />

        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="text-sm sm:text-[15px] font-bold text-foreground/90 leading-snug">
            {project.title}
          </h4>
          <ArrowUpRight className="w-4 h-4 text-foreground/20 group-hover:text-foreground/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0 mt-0.5" />
        </div>

        <p className="text-[10px] font-bold text-foreground/30 mb-2 uppercase tracking-wider">
          {project.tagline}
          {project.client && ` ${project.client}`}
        </p>

        <p className="text-[12px] text-foreground/40 leading-relaxed mb-4 line-clamp-2 flex-1">
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
