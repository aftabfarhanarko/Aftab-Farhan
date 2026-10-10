"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Layers,
  User,
  Clock,
  Briefcase,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Loader2,
  Code2,
  CheckCircle2,
  Globe,
  Terminal,
  Server,
  Database,
  Cpu,
  Layout,
  Pause,
  Play,
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
  const [isSliding, setIsSliding] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const slideIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const allImagesRef = useRef<string[]>([]);

  const goToImage = useCallback((idx: number) => {
    setActiveImageIndex(idx);
  }, []);

  const goNext = useCallback(() => {
    setActiveImageIndex((prev) => (prev + 1) % allImagesRef.current.length);
  }, []);

  const goPrev = useCallback(() => {
    setActiveImageIndex((prev) =>
      prev === 0 ? allImagesRef.current.length - 1 : prev - 1
    );
  }, []);

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
        setActiveImageIndex(0);
      } catch (err: any) {
        setError(err.message || "Failed to load project details");
      } finally {
        setIsLoading(false);
        if (typeof window !== "undefined") {
          window.scrollTo(0, 0);
        }
      }
    }

    fetchProject();
  }, [id]);

  // Derive images safely even while project is still null (keeps hook order stable)
  const allImages = project
    ? Array.from(
        new Set(
          [project.image, ...(project.gallery || [])].filter(Boolean) as string[]
        )
      )
    : [];
  allImagesRef.current = allImages;

  // Gallery auto-slide — always called in the same order on every render
  useEffect(() => {
    if (allImages.length <= 1) return;
    if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
    if (!isSliding || isHovered) return;

    slideIntervalRef.current = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % allImagesRef.current.length);
    }, 3500);

    return () => {
      if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
    };
  }, [isSliding, isHovered, allImages.length]);

  // ---- Early returns AFTER all hooks ----
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
        <p className="text-slate-600 max-w-md mb-6">
          {error || "The requested project case study could not be found."}
        </p>
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
            <Link href="/" className="hover:text-slate-900 transition-colors">
              Home
            </Link>
            <ChevronRight size={12} className="text-slate-400" />
            <span className="text-slate-500">Projects</span>
            <ChevronRight size={12} className="text-slate-400" />
            <span className="text-[#FF6014] font-semibold truncate max-w-[160px]">
              {project.title}
            </span>
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

        {/* 2. EXECUTIVE SUMMARY */}
        <section className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-start">
          {/* LEFT COLUMN */}
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

          {/* RIGHT SIDEBAR */}
          <div className="lg:col-span-3 lg:sticky lg:top-8 space-y-4">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-5">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 border-b border-slate-100 pb-3 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Briefcase size={15} className="text-[#FF6014]" />
                  Project Metadata
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold border border-slate-200">
                  Verified
                </span>
              </h3>

              <div className="space-y-3.5">
                <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-1">
                  <span className="text-slate-400 font-extrabold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                    <User size={13} className="text-[#FF6014]" /> Developer Role
                  </span>
                  <div className="pt-0.5">
                    <span className="inline-block px-2.5 py-1 rounded-xl bg-[#FF6014]/10 text-[#FF6014] border border-[#FF6014]/20 text-xs font-black">
                      {project.role || "Lead Full-Stack Developer"}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-1">
                  <span className="text-slate-400 font-extrabold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                    <Layers size={13} className="text-indigo-500" /> Project Type
                  </span>
                  <div className="pt-0.5">
                    <span className="inline-block px-2.5 py-1 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-black tracking-wide">
                      {project.projectType || "TEAM"}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-1">
                  <span className="text-slate-400 font-extrabold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                    <Globe size={13} className="text-emerald-500" /> Client / Organization
                  </span>
                  <p className="text-xs font-bold text-slate-900 pt-0.5">
                    {project.client || "Independent Project"}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-1">
                  <span className="text-slate-400 font-extrabold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                    <Clock size={13} className="text-amber-500" /> Duration & Timeline
                  </span>
                  <div className="text-xs font-bold text-slate-900 pt-0.5 flex flex-col gap-0.5">
                    <span>{project.duration || "14 Days"}</span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      ({project.startDate || "03-05-26"} – {project.endDate || "17-05-26"})
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-1">
                  <span className="text-slate-400 font-extrabold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                    <Layout size={13} className="text-purple-500" /> Domain Category
                  </span>
                  <div className="pt-0.5">
                    <span className="inline-block px-2.5 py-1 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 text-xs font-black uppercase">
                      {project.category.replace("_", " ")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. MEDIA GALLERY — no black side gaps */}
        {allImages.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <Globe size={14} className="text-[#FF6014]" />
                Interactive Media Showcase &amp; Gallery ({allImages.length} Screenshots)
              </h2>
              {allImages.length > 1 && (
                <button
                  type="button"
                  onClick={() => setIsSliding((s) => !s)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-600 hover:border-[#FF6014]/40 hover:text-[#FF6014] transition-all cursor-pointer"
                >
                  {isSliding ? (
                    <Pause className="w-3.5 h-3.5" />
                  ) : (
                    <Play className="w-3.5 h-3.5" />
                  )}
                  {isSliding ? "Pause" : "Play"}
                </button>
              )}
            </div>

            <div
              className="rounded-3xl border border-slate-200 bg-white overflow-hidden group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Main Image — fills frame edge-to-edge */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] max-h-[560px] overflow-hidden bg-slate-100">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImage}
                    src={currentImage}
                    alt={project.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                </AnimatePresence>

                {/* Prev / Next Arrows */}
                {allImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={goPrev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 flex items-center justify-center text-white backdrop-blur-sm transition-all cursor-pointer opacity-0 group-hover:opacity-100 z-10"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 flex items-center justify-center text-white backdrop-blur-sm transition-all cursor-pointer opacity-0 group-hover:opacity-100 z-10"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Slide dots */}
                {allImages.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                    {allImages.map((_, di) => (
                      <button
                        key={di}
                        type="button"
                        onClick={() => goToImage(di)}
                        className={`block rounded-full transition-all duration-300 cursor-pointer ${
                          di === activeImageIndex
                            ? "w-5 h-1.5 bg-[#FF6014]"
                            : "w-1.5 h-1.5 bg-white/70 hover:bg-white"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Progress bar */}
              {allImages.length > 1 && (
                <div className="relative h-0.5 bg-slate-200">
                  <div
                    key={`${activeImageIndex}-${isSliding}`}
                    className={`absolute inset-y-0 left-0 bg-[#FF6014] ${
                      isSliding && !isHovered ? "animate-gallery-progress" : ""
                    }`}
                    style={{
                      width:
                        !isSliding || isHovered
                          ? `${((activeImageIndex + 1) / allImages.length) * 100}%`
                          : undefined,
                      animationDuration: "3.5s",
                    }}
                  />
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 pt-1">
                {allImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      goToImage(idx);
                      setIsSliding(false);
                    }}
                    className={`relative aspect-[16/10] rounded-2xl overflow-hidden border-2 transition-all cursor-pointer bg-slate-100 ${
                      activeImageIndex === idx
                        ? "border-[#FF6014] ring-2 ring-[#FF6014]/40 scale-105 opacity-100"
                        : "border-slate-200 opacity-70 hover:opacity-100 hover:border-slate-400 hover:scale-105"
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover object-top"
                    />
                    {activeImageIndex === idx && (
                      <div className="absolute inset-0 bg-[#FF6014]/10" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </section>
        )}

        {/* 4. CORE FEATURES & TECHNICAL CHALLENGES */}
        <section className="space-y-8">
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

          {project.technicalChallenges &&
            project.technicalChallenges.length > 0 &&
            (() => {
              const normalizedChallenges = normalizeTechnicalChallenges(
                project.technicalChallenges
              );
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

        {/* 5. TECH STACK SECTION */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Cpu size={15} className="text-[#FF6014]" />
              Technologies & System Architecture Stack
            </h2>
            {project.tech && project.tech.length > 0 && (
              <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                {project.tech.length} Technologies
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Frontend */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 hover:border-orange-300 transition-colors shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-900">
                  <Layout size={15} className="text-[#FF6014]" />
                  <span>Frontend</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-[#FF6014]" />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {techGroups.Frontend.length > 0 ? (
                  techGroups.Frontend.map((item, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-xl bg-orange-50 border border-orange-200 text-xs font-extrabold text-orange-900"
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
            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 hover:border-blue-300 transition-colors shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-900">
                  <Server size={15} className="text-blue-500" />
                  <span>Backend & APIs</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-blue-500" />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {techGroups.Backend.length > 0 ? (
                  techGroups.Backend.map((item, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-xl bg-blue-50 border border-blue-200 text-xs font-extrabold text-blue-900"
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
            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 hover:border-emerald-300 transition-colors shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-900">
                  <Database size={15} className="text-emerald-500" />
                  <span>Database & ORM</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {techGroups.Database.length > 0 ? (
                  techGroups.Database.map((item, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-extrabold text-emerald-900"
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
            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 hover:border-purple-300 transition-colors shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-900">
                  <Cpu size={15} className="text-purple-500" />
                  <span>DevOps & Tools</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-purple-500" />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {techGroups["DevOps & Tools"].length > 0 ? (
                  techGroups["DevOps & Tools"].map((item, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-xl bg-purple-50 border border-purple-200 text-xs font-extrabold text-purple-900"
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

          {project.tech && project.tech.length > 0 && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white text-slate-900 space-y-4 shadow-xs border border-slate-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-[#FF6014]" />
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-700">
                    All Verified Project Technologies & Libraries
                  </h3>
                </div>
                <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  Total: {project.tech.length}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, i) => (
                  <span
                    key={i}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-extrabold text-slate-800 hover:bg-slate-100 hover:border-[#FF6014]/50 transition-all cursor-default"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}