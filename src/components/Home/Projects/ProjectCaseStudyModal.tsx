"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Calendar,
  Layers,
  User,
  Clock,
  Briefcase,
  Sparkles,
  CheckCircle2,
  Code2,
  Terminal,
  Server,
  Database,
  Cpu,
  Globe,
  Layout,
} from "lucide-react";

export interface KeyFeatureItem {
  title: string;
  detail: string;
}

export interface TechnicalChallengeItem {
  challenge: string;
  solution: string;
}

export interface ProjectCaseStudyData {
  id: string;
  title: string;
  tagline?: string;
  role?: string;
  description?: string;
  image?: string;
  gallery?: string[];
  overview?: string;
  problemStatement?: string;
  keyFeatures?: KeyFeatureItem[];
  technicalChallenges?: TechnicalChallengeItem[];
  demoLink?: string;
  githubLink?: string;
  category: string;
  year?: string;
  featured?: boolean;
  currentlyWorking?: boolean;
  projectType?: string;
  client?: string;
  startDate?: string;
  endDate?: string;
  duration?: string;
  tech?: string[];
}

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
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

export function groupTechStack(techList: string[] = []) {
  const frontendKeywords = [
    "next",
    "react",
    "typescript",
    "javascript",
    "redux",
    "rtk",
    "framer",
    "tailwind",
    "html",
    "css",
    "ui",
    "shadcn",
    "vue",
  ];
  const backendKeywords = [
    "node",
    "express",
    "nest",
    "rest",
    "graphql",
    "socket",
    "jwt",
    "passport",
    "oauth",
    "api",
    "auth",
  ];
  const databaseKeywords = [
    "postgres",
    "typeorm",
    "prisma",
    "mongo",
    "redis",
    "sql",
    "db",
    "orm",
  ];

  const groups = {
    Frontend: [] as string[],
    Backend: [] as string[],
    Database: [] as string[],
    "DevOps & Tools": [] as string[],
  };

  techList.forEach((tech) => {
    const lower = tech.toLowerCase();
    if (frontendKeywords.some((k) => lower.includes(k))) {
      groups.Frontend.push(tech);
    } else if (backendKeywords.some((k) => lower.includes(k))) {
      groups.Backend.push(tech);
    } else if (databaseKeywords.some((k) => lower.includes(k))) {
      groups.Database.push(tech);
    } else {
      groups["DevOps & Tools"].push(tech);
    }
  });

  return groups;
}

export function normalizeTechnicalChallenges(tcList: any[] = []) {
  if (!tcList || tcList.length === 0) return [];

  const hasKeyFormat = tcList.some(
    (item) => item.challenge === "Challenge" || item.challenge === "Solution"
  );

  if (hasKeyFormat) {
    const challengeItem = tcList.find((item) => item.challenge === "Challenge");
    const solutionItem = tcList.find((item) => item.challenge === "Solution");

    if (challengeItem || solutionItem) {
      return [
        {
          challenge: challengeItem?.solution || challengeItem?.detail || challengeItem?.challenge || "",
          solution: solutionItem?.solution || solutionItem?.detail || solutionItem?.challenge || "",
        },
      ];
    }
  }

  return tcList.map((tc) => ({
    challenge: tc.challenge === "Challenge" ? tc.solution : tc.challenge || "",
    solution: tc.challenge === "Solution" ? tc.solution : tc.solution || "",
  }));
}

export default function ProjectCaseStudyModal({
  isOpen,
  onClose,
  project,
}: {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectCaseStudyData | null;
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!isOpen || !project) return null;

  // Combine cover image and gallery images for media gallery viewer
  const allImages = Array.from(
    new Set(
      [project.image, ...(project.gallery || [])].filter(Boolean) as string[],
    ),
  );
  const currentImage = allImages[activeImageIndex] || project.image || "";

  const techGroups = groupTechStack(project.tech || []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-40"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-[96vw] lg:max-w-6xl xl:max-w-7xl bg-white border border-slate-200 rounded-3xl sm:rounded-[2.5rem] shadow-2xl z-50 flex flex-col max-h-[92vh] overflow-hidden text-slate-900"
      >
        {/* 1. HEADER BAR */}
        <header className="px-6 py-5 sm:px-8 border-b border-slate-100 bg-white/95 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between gap-4">
          <div className="space-y-0.5 max-w-2xl truncate">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#FF6014]/10 text-[#FF6014] border border-[#FF6014]/20">
                {project.category.replace("_", " ")}
              </span>
              <span className="text-xs font-bold text-slate-400">
                {project.year || "2026"}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 truncate">
              {project.title}
            </h2>
            {project.tagline && (
              <p className="text-xs sm:text-sm text-slate-500 font-medium truncate">
                {project.tagline}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {project.demoLink && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-[#FF6014] hover:bg-[#E0530A] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#FF6014]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <ExternalLink size={15} />
                <span className="hidden sm:inline">Live Demo</span>
              </a>
            )}

            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs sm:text-sm font-bold hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <GithubIcon className="w-4 h-4 text-slate-800" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
            )}

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-all cursor-pointer"
              type="button"
              title="Close Case Study"
            >
              <X size={20} />
            </button>
          </div>
        </header>

        {/* SCROLLABLE MODAL BODY */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-10">
          
          {/* 2. EXECUTIVE SUMMARY (2-COLUMN LAYOUT: 70% Left, 30% Right Sticky Sidebar) */}
          <section className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-start">
            
            {/* LEFT COLUMN (70% = 7 cols in 10-col grid) */}
            <div className="lg:col-span-7 space-y-6">
              {project.overview && (
                <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-xs space-y-3">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wider text-xs">
                    <Sparkles size={16} className="text-[#FF6014]" />
                    Project Overview
                  </h3>
                  <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-medium">
                    {project.overview}
                  </p>
                </div>
              )}

              {project.problemStatement && (
                <div className="p-6 sm:p-8 rounded-3xl bg-amber-500/5 border border-amber-500/20 shadow-xs space-y-3">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wider text-xs">
                    <Terminal size={16} className="text-amber-600" />
                    Problem Statement
                  </h3>
                  <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-medium">
                    {project.problemStatement}
                  </p>
                </div>
              )}

              {project.description && !project.overview && (
                <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-xs space-y-3">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wider text-xs">
                    <Sparkles size={16} className="text-[#FF6014]" />
                    Project Summary
                  </h3>
                  <p className="text-slate-700 text-base leading-relaxed font-medium whitespace-pre-line">
                    {project.description}
                  </p>
                </div>
              )}
            </div>

            {/* RIGHT SIDEBAR (30% = 3 cols in 10-col grid) - STICKY META INFO CARD */}
            <div className="lg:col-span-3 lg:sticky lg:top-4 space-y-4">
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-lg space-y-5">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <Briefcase size={14} className="text-[#FF6014]" />
                  Project Metadata
                </h4>

                <div className="space-y-4 text-xs font-medium">
                  {/* Role */}
                  <div className="space-y-1">
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                      <User size={12} className="text-[#FF6014]" /> Developer Role
                    </span>
                    <p className="text-sm font-bold text-slate-900">
                      {project.role || "Lead Full-Stack Developer"}
                    </p>
                  </div>

                  {/* Project Type */}
                  <div className="space-y-1">
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                      <Layers size={12} className="text-[#FF6014]" /> Project Type
                    </span>
                    <p className="text-sm font-bold text-slate-900">
                      {project.projectType || "TEAM"}
                    </p>
                  </div>

                  {/* Client */}
                  <div className="space-y-1">
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                      <Globe size={12} className="text-[#FF6014]" /> Client / Organization
                    </span>
                    <p className="text-sm font-bold text-slate-900">
                      {project.client || "Independent Project"}
                    </p>
                  </div>

                  {/* Duration & Timeline */}
                  <div className="space-y-1">
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                      <Clock size={12} className="text-[#FF6014]" /> Duration & Timeline
                    </span>
                    <p className="text-sm font-bold text-slate-900">
                      {project.duration || "14 Days"}{" "}
                      <span className="text-slate-400 font-normal">
                        ({project.startDate || "03-05-26"} – {project.endDate || "17-05-26"})
                      </span>
                    </p>
                  </div>

                  {/* Category */}
                  <div className="space-y-1">
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                      <Layout size={12} className="text-[#FF6014]" /> Domain Category
                    </span>
                    <p className="text-sm font-bold text-slate-900">
                      {project.category.replace("_", " ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. MEDIA GALLERY (MAIN DISPLAY + GRID THUMBNAILS) */}
          {allImages.length > 0 && (
            <section className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <Globe size={14} className="text-[#FF6014]" />
                Interactive Media Showcase & Gallery ({allImages.length} Screenshots)
              </h3>

              <div className="rounded-3xl border border-slate-200 bg-slate-950 shadow-xl overflow-hidden group">
                {/* Main Large Image Display */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] max-h-[580px] overflow-hidden bg-slate-950 flex items-center justify-center p-2 sm:p-4">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImage}
                      src={currentImage}
                      alt={project.title}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="w-full h-full object-contain max-h-[540px] rounded-xl shadow-2xl"
                    />
                  </AnimatePresence>
                </div>
              </div>

              {/* Grid of Clickable Image Thumbnails */}
              {allImages.length > 1 && (
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 pt-1">
                  {allImages.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-slate-900 ${
                        activeImageIndex === idx
                          ? "border-[#FF6014] ring-2 ring-[#FF6014]/40 scale-105 shadow-md opacity-100"
                          : "border-slate-200 opacity-60 hover:opacity-100 hover:border-slate-400"
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover object-top"
                      />
                    </button>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* 4. CORE FEATURES & TECHNICAL CHALLENGES */}
          <section className="space-y-8">
            {/* Key Features Grid */}
            {project.keyFeatures && project.keyFeatures.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-500" />
                  Key Features & Capabilities
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.keyFeatures.map((feature, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1.5 hover:border-[#FF6014]/40 transition-colors"
                    >
                      <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#FF6014]" />
                        {feature.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                        {feature.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Challenges (Code-Card Style) */}
            {project.technicalChallenges &&
              project.technicalChallenges.length > 0 && (() => {
                const normalizedChallenges = normalizeTechnicalChallenges(project.technicalChallenges);
                if (normalizedChallenges.length === 0) return null;
                return (
                  <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                      <Code2 size={15} className="text-[#FF6014]" />
                      Technical Challenges & Solutions
                    </h3>

                    <div className="space-y-4">
                      {normalizedChallenges.map((tc, idx) => (
                        <div
                          key={idx}
                          className="p-6 rounded-3xl bg-white border border-slate-200 text-slate-900 space-y-4 shadow-sm"
                        >
                          {/* Challenge */}
                          {tc.challenge && (
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-2 text-rose-600 text-xs font-extrabold uppercase tracking-wider">
                                <Terminal size={14} className="text-rose-600" />
                                <span>Engineering Challenge</span>
                              </div>
                              <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed pl-4 border-l-2 border-rose-500 bg-rose-50/40 p-2.5 rounded-r-xl">
                                {tc.challenge}
                              </p>
                            </div>
                          )}

                          {/* Solution */}
                          {tc.solution && (
                            <div className="space-y-1.5 pt-3 border-t border-slate-100">
                              <div className="flex items-center gap-2 text-emerald-600 text-xs font-extrabold uppercase tracking-wider">
                                <CheckCircle2 size={14} className="text-emerald-600" />
                                <span>Architecture Solution</span>
                              </div>
                              <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed pl-4 border-l-2 border-emerald-500 bg-emerald-50/40 p-2.5 rounded-r-xl">
                                {tc.solution}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
          </section>

          {/* 5. TECH STACK SECTION (GROUPED BADGES: Frontend, Backend, Database, DevOps/Tools) */}
          <section className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Cpu size={15} className="text-[#FF6014]" />
              Technologies & System Architecture Stack
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Frontend */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                  <Layout size={14} className="text-[#FF6014]" />
                  <span>Frontend</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {techGroups.Frontend.length > 0 ? (
                    techGroups.Frontend.map((item, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-xs"
                      >
                        {item}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 font-medium">
                      React, Next.js, TypeScript
                    </span>
                  )}
                </div>
              </div>

              {/* Backend */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                  <Server size={14} className="text-blue-500" />
                  <span>Backend & APIs</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {techGroups.Backend.length > 0 ? (
                    techGroups.Backend.map((item, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-xs"
                      >
                        {item}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 font-medium">
                      Node.js, Express, Nest.js
                    </span>
                  )}
                </div>
              </div>

              {/* Database */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                  <Database size={14} className="text-emerald-500" />
                  <span>Database & ORM</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {techGroups.Database.length > 0 ? (
                    techGroups.Database.map((item, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-xs"
                      >
                        {item}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 font-medium">
                      PostgreSQL, TypeORM
                    </span>
                  )}
                </div>
              </div>

              {/* DevOps & Tools */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                  <Cpu size={14} className="text-purple-500" />
                  <span>DevOps & Tools</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {techGroups["DevOps & Tools"].length > 0 ? (
                    techGroups["DevOps & Tools"].map((item, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-xs"
                      >
                        {item}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 font-medium">
                      Git, Docker, Vercel
                    </span>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
