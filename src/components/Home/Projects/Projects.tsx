"use client";

import React, { useState } from "react";
import {
  ExternalLink,
  Star,
  Briefcase,
  User,
  Layers,
  GitBranch,
  ArrowUpRight,
  Code2,
  Sparkles,
  Loader2,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Ã¢â€â‚¬Ã¢â€â‚¬ Types Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  demoLink: string;
  githubLink?: string;
  category: string;
  year: string;
  featured: boolean;
  projectType: string;
  client?: string;
  tech: string[];
}

// Ã¢â€â‚¬Ã¢â€â‚¬ Category meta Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
const categoryLabel: Record<string, string> = {
  FULL_STACK: "Full-Stack",
  AI_ML: "AI / ML",
  FRONTEND: "Frontend",
  E_COMMERCE: "E-Commerce",
  HEALTHCARE: "Healthcare",
  REAL_ESTATE: "Real Estate",
};

const categoryBadge: Record<string, string> = {
  FULL_STACK: "bg-blue-500/10  border-blue-500/25   text-blue-300/90",
  AI_ML: "bg-violet-500/10 border-violet-500/25 text-violet-300/90",
  FRONTEND: "bg-pink-500/10  border-pink-500/25   text-pink-300/90",
  E_COMMERCE: "bg-amber-500/10 border-amber-500/25  text-amber-300/90",
  HEALTHCARE: "bg-emerald-500/10 border-emerald-500/25 text-emerald-300/90",
  REAL_ESTATE: "bg-sky-500/10   border-sky-500/25    text-sky-300/90",
};

const categoryAccentBar: Record<string, string> = {
  FULL_STACK: "from-blue-500/40   to-cyan-500/0",
  AI_ML: "from-violet-500/40 to-purple-500/0",
  FRONTEND: "from-pink-500/40   to-rose-500/0",
  E_COMMERCE: "from-amber-500/40  to-orange-500/0",
  HEALTHCARE: "from-emerald-500/40 to-teal-500/0",
  REAL_ESTATE: "from-sky-500/40    to-blue-500/0",
};

// Ã¢â€â‚¬Ã¢â€â‚¬ Tiny helpers Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function TechPill({ label }: { label: string }) {
  return (
    <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-white/[0.05] border border-white/[0.09] rounded-lg text-white/45">
      {label}
    </span>
  );
}

function ActionBtn({
  href,
  icon: Icon,
  label,
  filled = false,
  sm = false,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  filled?: boolean;
  sm?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 font-semibold transition-all duration-200 active:scale-95
        ${sm ? "px-3.5 py-2 text-[11px] rounded-xl" : "px-5 py-2.5 text-xs rounded-xl"}
        ${
          filled
            ? "bg-white text-black hover:bg-white/90 shadow-lg shadow-white/10"
            : "border border-white/15 text-white/55 hover:border-white/35 hover:text-white bg-white/[0.03]"
        }`}
    >
      <Icon className={sm ? "w-3 h-3" : "w-3.5 h-3.5"} />
      {label}
    </a>
  );
}

// Ã¢â€â‚¬Ã¢â€â‚¬ Skeleton Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function ProjectsSkeleton() {
  return (
    <div className="space-y-10">
      {/* Featured skeleton */}
      <div className="h-[380px] sm:h-[420px] rounded-[2rem] border border-white/[0.07] bg-white/[0.02] animate-pulse" />
      {/* Tabs skeleton */}
      <div className="flex gap-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-10 w-28 rounded-xl bg-white/[0.04] animate-pulse"
          />
        ))}
      </div>
      {/* Cards skeleton */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-white/[0.07] bg-white/[0.02] animate-pulse overflow-hidden"
          >
            <div className="aspect-[16/9] bg-white/[0.04]" />
            <div className="p-5 space-y-3">
              <div className="h-4 w-3/4 bg-white/[0.06] rounded" />
              <div className="h-3 w-full bg-white/[0.04] rounded" />
              <div className="h-3 w-5/6 bg-white/[0.04] rounded" />
              <div className="flex gap-1.5 pt-1">
                {[1, 2, 3].map((j) => (
                  <div
                    key={j}
                    className="h-6 w-14 rounded-lg bg-white/[0.04]"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Ã¢â€â‚¬Ã¢â€â‚¬ Project card Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function ProjectCard({ project }: { project: Project }) {
  const badge =
    categoryBadge[project.category] ??
    "bg-white/5 border-white/10 text-white/50";
  const accentBar =
    categoryAccentBar[project.category] ?? "from-white/20 to-transparent";

  return (
    <div className="group relative flex flex-col rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-white/[0.16] hover:bg-white/[0.035] transition-all duration-300 overflow-hidden">
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
          <span className="px-2.5 py-1 text-[9px] font-bold text-white/40 bg-black/40 backdrop-blur-sm border border-white/[0.08] rounded-lg">
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
              className="flex items-center gap-1.5 px-4 py-2 bg-black/80 text-white text-xs font-bold rounded-xl border border-white/20 backdrop-blur-sm hover:bg-black/60 transition-colors"
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
          <h4 className="text-sm sm:text-[15px] font-bold text-white/90 leading-snug">
            {project.title}
          </h4>
          <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0 mt-0.5" />
        </div>

        <p className="text-[10px] font-bold text-white/30 mb-2 uppercase tracking-wider">
          {project.tagline}
          {project.client && ` Ã‚Â· ${project.client}`}
        </p>

        <p className="text-[12px] text-white/40 leading-relaxed mb-4 line-clamp-2 flex-1">
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

// Ã¢â€â‚¬Ã¢â€â‚¬ Featured hero card Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function FeaturedCard({ project }: { project: Project }) {
  const badge =
    categoryBadge[project.category] ??
    "bg-white/5 border-white/10 text-white/50";

  return (
    <div className="relative mb-10 sm:mb-12 rounded-[2rem] overflow-hidden border border-white/[0.09] bg-white/[0.02]">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(255,255,255,1) 39px,rgba(255,255,255,1) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(255,255,255,1) 39px,rgba(255,255,255,1) 40px)",
        }}
      />

      <div className="relative z-10 grid lg:grid-cols-[1fr_1.25fr] gap-10 p-6 sm:p-10 lg:p-14 items-center">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/[0.12] bg-white/[0.05] backdrop-blur-md mb-6">
            <Star className="w-3 h-3 text-amber-400/90 fill-amber-400/90" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/55">
              Featured Project
            </span>
            <Sparkles className="w-3 h-3 text-white/30" />
          </div>

          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/30 mb-3">
            {project.tagline}
          </p>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight leading-[0.95] mb-4">
            {project.title}
          </h3>
          <p className="text-sm sm:text-[15px] text-white/50 leading-relaxed mb-7">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-7">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider bg-white/[0.06] border border-white/[0.1] rounded-xl text-white/50 backdrop-blur-sm"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <ActionBtn
              href={project.demoLink}
              icon={ExternalLink}
              label="View Live"
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

        <div className="relative">
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/[0.09] bg-black/50 shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
          </div>

          <div className="absolute top-4 right-4">
            <span
              className={`px-3.5 py-2 text-[10px] font-bold uppercase tracking-widest border rounded-xl backdrop-blur-sm ${badge}`}
            >
              {categoryLabel[project.category] || project.category}
            </span>
          </div>

          <div className="absolute bottom-4 right-4 flex flex-col gap-3">
            {[
              { label: "Year", value: project.year },
              { label: "Stack", value: `${project.tech.length} libs` },
              {
                label: "Type",
                value: project.projectType === "CLIENT" ? "Client" : "Personal",
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="px-4 py-3 bg-black/50 border border-white/[0.14] rounded-xl backdrop-blur-md text-center min-w-[120px]"
              >
                <div className="text-[9px] font-bold uppercase tracking-widest text-white/45 mb-0.5">
                  {label}
                </div>
                <div className="text-sm font-bold text-white/85">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default function Projects() {
  const [activeTab, setActiveTab] = useState<"all" | "my" | "client">("all");

  const { data: allProjects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["projects-public"],
    queryFn: async () => {
      const res = await axios.get("/api/projects");
      return res.data;
    },
  });

  const featuredProject = allProjects.find((p) => p.featured) ?? allProjects[0];

  const filteredProjects = allProjects.filter((p) => {
    if (activeTab === "all") return true;
    if (activeTab === "my") return p.projectType === "MY";
    if (activeTab === "client") return p.projectType === "CLIENT";
    return true;
  });

  const tabs: {
    id: "all" | "my" | "client";
    label: string;
    icon: React.ElementType;
    count: number;
  }[] = [
    {
      id: "all",
      label: "All Project",
      icon: Layers,
      count: allProjects.length,
    },
    {
      id: "my",
      label: "Personal",
      icon: User,
      count: allProjects.filter((p) => p.projectType === "MY").length,
    },
    {
      id: "client",
      label: "Client Project",
      icon: Briefcase,
      count: allProjects.filter((p) => p.projectType === "CLIENT").length,
    },
  ];

  return (
    <section id="projects" className="mb-16 sm:mb-20 scroll-mt-24">
      {/* Ã¢â€â‚¬Ã¢â€â‚¬ Section header Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */}
      <div className="flex items-end gap-4 sm:gap-6 mb-10 sm:mb-12">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Code2 className="w-3.5 h-3.5 text-foreground/40" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-foreground/40">
              Selected Work
            </span>
          </div>
          <h2 className="text-[clamp(28px,5vw,48px)] font-black text-foreground tracking-tight leading-none">
            Projects<span className="text-foreground/25">.</span>
          </h2>
        </div>
        <div className="flex-1 mb-2 hidden sm:block">
          <div className="h-px bg-gradient-to-r from-white/10 to-transparent" />
        </div>
        <span className="text-xs font-mono text-white/20 mb-2 hidden sm:block">
          &lt;portfolio /&gt;
        </span>
      </div>

      {isLoading ? (
        <ProjectsSkeleton />
      ) : (
        <>
          {/* Featured hero */}
          {featuredProject && <FeaturedCard project={featuredProject} />}

          {/* Filter tabs + count */}
          <div className="flex items-center justify-between mb-6 sm:mb-8 gap-4 flex-wrap">
            <div className="flex items-center gap-1 p-1 bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-x-auto">
              {tabs.map(({ id, label, icon: Icon, count }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-[11px] font-bold transition-all duration-200 whitespace-nowrap
                    ${
                      activeTab === id
                        ? "bg-white text-black shadow-lg"
                        : "text-white/40 hover:text-white/65"
                    }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{label}</span>
                  <span className="sm:hidden">
                    {id === "all" ? "All" : id === "my" ? "Personal" : "Client"}
                  </span>
                  <span
                    className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold
                      ${activeTab === id ? "bg-black/10 text-black/55" : "bg-white/[0.06] text-foreground/40"}`}
                  >
                    {count}
                  </span>
                </button>
              ))}
            </div>
            <span className="text-[11px] text-foreground/35 font-medium hidden sm:block">
              {filteredProjects.length} project
              {filteredProjects.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 rounded-2xl border border-dashed border-white/[0.07]">
              <p className="text-xs text-foreground/40 uppercase tracking-[0.2em] font-semibold">
                No projects to display
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );
}
