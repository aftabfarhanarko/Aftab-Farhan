"use client";
import React from "react";
import { motion } from "framer-motion";
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
    highlights.push("End-to-End Full Stack & API Integration");
  } else if (project.category === "AI_ML") {
    highlights.push("LLM Integration & Intelligent Workflows");
  } else if (project.category === "E_COMMERCE") {
    highlights.push("Product Catalog & Checkout Engine");
  } else if (project.tagline) {
    highlights.push(project.tagline);
  }

  if (project.tech.includes("Next.js") || project.tech.includes("React")) {
    highlights.push("Responsive Next.js & TypeScript UI");
  } else if (project.tech.includes("Node.js") || project.tech.includes("Express") || project.tech.includes("NestJS")) {
    highlights.push("RESTful API & Microservices Backend");
  } else {
    highlights.push("Clean Modular Architecture & Optimization");
  }

  if (project.tech.some(t => ["PostgreSQL", "Prisma", "MongoDB", "Redis"].includes(t))) {
    highlights.push("Optimized Database Schema & Data Access");
  } else if (project.projectType === "CLIENT") {
    highlights.push("Production Client Deployment");
  } else {
    highlights.push("Role-Based Workflows & Security");
  }

  return highlights.slice(0, 3);
}

interface FeaturedCardProps {
  project: Project;
  index?: number;
}

export default function FeaturedCard({ project, index = 0 }: FeaturedCardProps) {
  const highlights = getTechnicalHighlights(project);
  const isOdd = index % 2 === 1;
  const numString = (index + 1).toString().padStart(2, "0");

  // Get single clean summary paragraph
  const cleanSummary = project.description.split("\n")[0]?.trim() || project.description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative mb-8 sm:mb-12 rounded-3xl overflow-hidden glass-card-featured transition-all duration-300 p-5 sm:p-7 lg:p-8 hover:border-orange-400/50 hover:shadow-2xl"
    >
      {/* Top Sweep Beam */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF6014]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

      {/* Top right status badge */}
      <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border bg-orange-50/90 border-orange-200/90 backdrop-blur-md shadow-xs">
        {project.currentlyWorking ? (
          <>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6014] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6014]" />
            </span>
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#FF6014]">
              Active / Currently Working
            </span>
          </>
        ) : (
          <>
            <Sparkles className="w-3.5 h-3.5 text-[#FF6014]" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#FF6014]">
              Featured Project
            </span>
          </>
        )}
      </div>

      {/* Main Grid Layout (Alternating Editorial: 60/40 desktop split) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center w-full relative">
        
        {/* Project Image Column (Dynamic Floating Glass Browser Showcase) */}
        <div
          className={`w-full flex justify-center order-1 relative ${
            isOdd ? "lg:order-2 lg:col-span-7" : "lg:order-1 lg:col-span-7"
          }`}
        >
          {/* Ambient Accent Glow behind screenshot */}
          <div className="absolute -inset-3 bg-gradient-to-tr from-[#FF6014]/20 via-orange-400/10 to-transparent rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="relative w-full rounded-2xl overflow-hidden border border-slate-300/80 bg-slate-900 shadow-2xl group/frame transition-all duration-500 group-hover:border-orange-400/50 group-hover:shadow-orange-500/10">
            {/* Window Traffic Controls Header */}
            <div className="flex items-center justify-between px-3.5 py-2 bg-slate-900 border-b border-slate-800/80 text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              
              {/* URL Address Bar */}
              <div className="px-3 py-0.5 rounded-full bg-slate-800/90 border border-slate-700/80 text-[10px] font-mono text-slate-300 flex items-center gap-1.5 max-w-[220px] truncate shadow-inner">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="truncate">
                  {project.demoLink
                    ? project.demoLink.replace(/^https?:\/\/(www\.)?/, "")
                    : `${project.title.toLowerCase().replace(/\s+/g, "")}.com`}
                </span>
              </div>

              <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono">
                <span className="hidden sm:inline text-emerald-400 font-bold">SECURE</span>
              </div>
            </div>

            {/* Image Container with Hover Scale */}
            <div className="relative aspect-[16/9.5] w-full overflow-hidden bg-slate-950">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-top group-hover/frame:scale-104 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Project Information Column (Clean, Compact, Executive Spacing) */}
        <div
          className={`flex flex-col text-left order-2 ${
            isOdd ? "lg:order-1 lg:col-span-5" : "lg:order-2 lg:col-span-5"
          }`}
        >
          {/* Number & Category Badge */}
          <div className="mb-1.5">
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#FF6014]">
              {numString} — FEATURED PROJECT • {categoryLabel[project.category] || project.category || "PROJECT"}
            </span>
          </div>

          {/* Project Title */}
          <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-black text-slate-900 tracking-tight leading-[1.15] mb-1.5 group-hover:text-[#FF6014] transition-colors duration-200">
            {project.title}
          </h3>

          {/* Tagline */}
          {project.tagline && (
            <p className="text-[#FF6014] font-extrabold text-xs uppercase tracking-wider mb-2.5">
              {project.tagline}
            </p>
          )}

          {/* Context Badges */}
          <div className="flex flex-wrap items-center gap-1.5 mb-3">
            <span className="px-2.5 py-0.5 text-[11px] font-bold text-emerald-900 bg-emerald-50 border border-emerald-200 rounded-full flex items-center gap-1 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Production Ready
            </span>
            {project.projectType === "CLIENT" ? (
              <span className="px-2.5 py-0.5 text-[11px] font-bold text-amber-900 bg-amber-50 border border-amber-200 rounded-full flex items-center gap-1 shadow-2xs">
                <Briefcase className="w-3 h-3 text-amber-600" />
                <span>Client Project</span>
              </span>
            ) : project.projectType === "TEAM" ? (
              <span className="px-2.5 py-0.5 text-[11px] font-bold bg-slate-100 border border-slate-200 rounded-full text-slate-800 flex items-center gap-1 shadow-2xs">
                <Users className="w-3 h-3 text-slate-600" />
                Team Project
              </span>
            ) : (
              <span className="px-2.5 py-0.5 text-[11px] font-bold bg-slate-100 border border-slate-200 rounded-full text-slate-800 flex items-center gap-1 shadow-2xs">
                <User className="w-3 h-3 text-slate-600" />
                Personal Project
              </span>
            )}
            {project.year && (
              <span className="px-2.5 py-0.5 text-[11px] font-bold bg-slate-100 border border-slate-200 rounded-full text-slate-800 flex items-center gap-1 shadow-2xs">
                <Calendar className="w-3 h-3 text-slate-600" />
                {project.year}
              </span>
            )}
          </div>

          {/* Concise Summary Description */}
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium mb-3 text-justify line-clamp-3">
            {cleanSummary}
          </p>

          {/* Key Technical Features */}
          {highlights.length > 0 && (
            <div className="mb-3 pt-2.5 border-t border-slate-200/70">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-700 block mb-1.5">
                Key Features &amp; Architecture
              </span>
              <div className="space-y-1">
                {highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-slate-800 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6014] shrink-0" />
                    <span className="truncate">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Pills (Limited to top 5) */}
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

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {project.demoLink && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#FF6014] hover:bg-[#E5530F] text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 shadow-md shadow-orange-500/20 active:scale-95"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Live Demo
              </a>
            )}
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 active:scale-95"
              >
                <Github className="w-3.5 h-3.5" />
                GitHub
              </a>
            )}
            <Link
              href={`/projects/${project.id}`}
              className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-1 shadow-xs active:scale-95"
            >
              <span>Case Study</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#FF6014]" />
            </Link>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
