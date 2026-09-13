"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  Layers,
  User,
  Clock,
  Briefcase,
  Sparkles,
  ChevronRight,
  Loader2,
  Code2,
  CheckCircle2,
  Globe,
  Terminal,
  Server,
  Database,
  Cpu,
  Layout,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  groupTechStack,
  normalizeTechnicalChallenges,
  KeyFeatureItem,
  TechnicalChallengeItem,
} from "@/components/Home/Projects/ProjectCaseStudyModal";

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

interface ProjectDetail {
  id: string;
  title: string;
  tagline?: string;
  role?: string;
  description: string;
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
  tech: string[];
}

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (!id) return;

    async function fetchProject() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/projects/${id}`);
        if (!res.ok) {
          throw new Error("Project not found");
        }
        const data = await res.json();
        setProject(data);
      } catch (err: any) {
        setError(err.message || "Failed to load project details");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProject();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-[70vh] bg-transparent text-slate-900 flex flex-col items-center justify-center p-6">
        <Loader2 className="w-10 h-10 text-[#FF6014] animate-spin mb-4" />
        <p className="text-slate-600 font-medium">Loading project case study...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-[70vh] bg-transparent text-slate-900 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 flex items-center justify-center mb-4 shadow-lg">
          <Code2 className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Project Not Found</h1>
        <p className="text-slate-600 max-w-md mb-6">{error || "The requested project case study could not be found."}</p>
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-all shadow-md cursor-pointer"
        >
          <ArrowLeft size={16} />
          Go Back
        </button>
      </div>
    );
  }

  const allImages = Array.from(
    new Set([project.image, ...(project.gallery || [])].filter(Boolean) as string[])
  );
  const currentImage = allImages[activeImageIndex] || project.image || "";
  const techGroups = groupTechStack(project.tech || []);

  return (
    <div className="bg-transparent text-slate-900 py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Navigation Trail */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-[#FF6014]/50 hover:bg-slate-50 transition-all text-xs sm:text-sm font-semibold shadow-xs group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#FF6014] group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <ChevronRight size={12} className="text-slate-400" />
            <span className="text-slate-500">Projects</span>
            <ChevronRight size={12} className="text-slate-400" />
            <span className="text-[#FF6014] font-semibold truncate max-w-[160px]">{project.title}</span>
          </div>
        </div>

        {/* 1. HEADER BAR */}
        <motion.header
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#FF6014]/10 text-[#FF6014] border border-[#FF6014]/20">
                {project.category.replace("_", " ")}
              </span>
              <span className="text-xs font-bold text-slate-400">
                {project.year || "2026"}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {project.title}
            </h1>
            {project.tagline && (
              <p className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl leading-relaxed">
                {project.tagline}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {project.demoLink && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#FF6014] hover:bg-[#E0530A] text-white text-sm font-bold hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
            )}

            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-sm font-bold hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                <GithubIcon className="w-4 h-4 text-slate-800" />
                GitHub
              </a>
            )}
          </div>
        </motion.header>

        {/* 2. EXECUTIVE SUMMARY (2-COLUMN LAYOUT: 70% Left Column, 30% Right Sidebar) */}
        <section className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-start">
          
          {/* LEFT COLUMN (70% = 7 cols in 10-col grid) */}
          <div className="lg:col-span-7 space-y-6">
            {project.overview && (
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-3">
                <h2 className="text-xs font-black uppercase tracking-widest text-[#FF6014] flex items-center gap-2">
                  <Sparkles size={16} />
                  Project Overview
                </h2>
                <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-medium">
                  {project.overview}
                </p>
              </div>
            )}

            {project.problemStatement && (
              <div className="p-6 sm:p-8 rounded-3xl bg-amber-500/5 border border-amber-500/20 space-y-3">
                <h2 className="text-xs font-black uppercase tracking-widest text-amber-600 flex items-center gap-2">
                  <Terminal size={16} />
                  Problem Statement
                </h2>
                <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-medium">
                  {project.problemStatement}
                </p>
              </div>
            )}

            {project.description && !project.overview && (
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-3">
                <h2 className="text-xs font-black uppercase tracking-widest text-[#FF6014] flex items-center gap-2">
                  <Sparkles size={16} />
                  Project Description
                </h2>
                <p className="text-slate-700 text-base leading-relaxed font-medium whitespace-pre-line">
                  {project.description}
                </p>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR (30% = 3 cols in 10-col grid) - STICKY META INFO CARD */}
          <div className="lg:col-span-3 lg:sticky lg:top-8 space-y-4">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-5">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Briefcase size={14} className="text-[#FF6014]" />
                Project Metadata
              </h3>

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
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Globe size={14} className="text-[#FF6014]" />
              Interactive Media Showcase & Gallery ({allImages.length} Screenshots)
            </h2>

            <div className="rounded-3xl border border-slate-200 bg-slate-950 overflow-hidden group">
              {/* Main Image Display */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] max-h-[600px] overflow-hidden bg-slate-950 flex items-center justify-center p-2 sm:p-4">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImage}
                    src={currentImage}
                    alt={project.title}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="w-full h-full object-contain max-h-[560px] rounded-xl shadow-2xl"
                  />
                </AnimatePresence>
              </div>
            </div>

            {/* Clickable Image Thumbnails Grid */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 pt-1">
                {allImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative aspect-[16/10] rounded-2xl overflow-hidden border-2 transition-all cursor-pointer bg-slate-900 ${
                      activeImageIndex === idx
                        ? "border-[#FF6014] ring-2 ring-[#FF6014]/40 scale-105 opacity-100"
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
              <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <CheckCircle2 size={15} className="text-emerald-500" />
                Key Features & Capabilities
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.keyFeatures.map((feature, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-white border border-slate-200 space-y-2 hover:border-[#FF6014]/40 transition-colors"
                  >
                    <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF6014]" />
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">
                      {feature.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technical Challenges (Clean White Design) */}
          {project.technicalChallenges &&
            project.technicalChallenges.length > 0 && (() => {
              const normalizedChallenges = normalizeTechnicalChallenges(project.technicalChallenges);
              if (normalizedChallenges.length === 0) return null;
              return (
                <div className="space-y-4">
                  <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <Code2 size={15} className="text-[#FF6014]" />
                    Technical Challenges & Solutions
                  </h2>

                  <div className="space-y-4">
                    {normalizedChallenges.map((tc, idx) => (
                      <div
                        key={idx}
                        className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 text-slate-900 space-y-4 shadow-sm"
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
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <Cpu size={15} className="text-[#FF6014]" />
            Technologies & System Architecture Stack
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Frontend */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
                <Layout size={14} className="text-[#FF6014]" />
                <span>Frontend</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {techGroups.Frontend.length > 0 ? (
                  techGroups.Frontend.map((item, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800"
                    >
                      {item}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 font-medium">React, Next.js, TypeScript</span>
                )}
              </div>
            </div>

            {/* Backend */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
                <Server size={14} className="text-blue-500" />
                <span>Backend & APIs</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {techGroups.Backend.length > 0 ? (
                  techGroups.Backend.map((item, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800"
                    >
                      {item}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 font-medium">Node.js, Express, Nest.js</span>
                )}
              </div>
            </div>

            {/* Database */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
                <Database size={14} className="text-emerald-500" />
                <span>Database & ORM</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {techGroups.Database.length > 0 ? (
                  techGroups.Database.map((item, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800"
                    >
                      {item}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 font-medium">PostgreSQL, TypeORM</span>
                )}
              </div>
            </div>

            {/* DevOps & Tools */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
                <Cpu size={14} className="text-purple-500" />
                <span>DevOps & Tools</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {techGroups["DevOps & Tools"].length > 0 ? (
                  techGroups["DevOps & Tools"].map((item, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800"
                    >
                      {item}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 font-medium">Git, Docker, Vercel</span>
                )}
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
