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
} from "lucide-react";
import { motion } from "framer-motion";

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

interface KeyFeatureItem {
  title: string;
  detail: string;
}

interface TechnicalChallengeItem {
  challenge: string;
  solution: string;
}

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
        <p className="text-slate-600 font-medium">Loading project showcase...</p>
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

  return (
    <div className="bg-transparent text-slate-900 py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Navigation & Header Trail */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-[#FF6014]/50 hover:bg-slate-50 transition-all text-xs sm:text-sm font-semibold shadow-sm group cursor-pointer"
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

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          {/* Professional Developer Branding Banner */}
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-orange-500/10 via-orange-500/5 to-transparent border border-orange-500/20 shadow-md space-y-2 relative overflow-hidden">
            <div className="flex flex-wrap items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#FF6014]">
              <Sparkles size={14} className="text-[#FF6014]" />
              <span>Full-Stack Engineering Case Study</span>
              <span className="hidden sm:inline text-slate-300">|</span>
              <span className="text-slate-900 font-bold">{project.role || "Lead Full-Stack Developer"}</span>
            </div>
            <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed max-w-4xl">
              Engineered with modern full-stack web standards, scalable database architecture, and pixel-perfect interactive user experience.
            </p>
          </div>

          {/* Category & Status Tags */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#FF6014]/15 border border-[#FF6014]/30 text-[#FF6014] shadow-xs">
              {project.category}
            </span>

            {project.currentlyWorking && (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 border border-emerald-200 text-emerald-700 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Active Development
              </span>
            )}

            {project.featured && (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-50 border border-amber-200 text-amber-700 shadow-xs">
                <Sparkles size={13} />
                Featured Project
              </span>
            )}
          </div>

          {/* Title & Tagline */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              {project.title}
            </h1>
            {project.tagline && (
              <p className="text-lg sm:text-xl text-slate-600 font-medium max-w-3xl leading-relaxed">
                {project.tagline}
              </p>
            )}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            {project.demoLink && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#FF6014] hover:bg-[#E0530A] text-white text-sm font-bold shadow-lg shadow-[#FF6014]/25 hover:shadow-[#FF6014]/40 hover:-translate-y-0.5 transition-all cursor-pointer"
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
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-sm font-bold shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <GithubIcon className="w-4 h-4 text-slate-800" />
                Source Code
              </a>
            )}
          </div>
        </motion.div>

        {/* MacOS Interactive Preview Frame */}
        {project.image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden group/frame"
          >
            {/* MacOS Window Top Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-100/90 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-600/40" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600/40" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600/40" />
              </div>

              <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-white border border-slate-200 text-[11px] text-slate-600 font-mono max-w-sm truncate shadow-xs">
                <Globe size={11} className="text-[#FF6014]" />
                <span className="truncate">{project.demoLink || `https://project-showcase/${project.id}`}</span>
              </div>

              <div className="w-12" />
            </div>

            {/* Showcase Image */}
            <div className="relative overflow-hidden bg-slate-50">
              <img
                src={project.image}
                alt={project.title}
                className="w-full max-h-[580px] object-cover object-top transition-transform duration-700 group-hover/frame:scale-[1.02]"
              />
            </div>
          </motion.div>
        )}

        {/* Quick Highlights / Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-md space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <User size={13} className="text-[#FF6014]" /> Client / Org
            </span>
            <p className="text-base font-bold text-slate-900 truncate">
              {project.client || (project.projectType === "CLIENT" ? "Client Work" : "Own Product")}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-md space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Layers size={13} className="text-[#FF6014]" /> Role / Type
            </span>
            <p className="text-base font-bold text-slate-900 truncate">
              {project.role || project.projectType || "Lead Developer"}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-md space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Calendar size={13} className="text-[#FF6014]" /> Timeline / Year
            </span>
            <p className="text-base font-bold text-slate-900">
              {project.year || project.startDate || "2026"}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-md space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Clock size={13} className="text-[#FF6014]" /> Duration
            </span>
            <p className="text-base font-bold text-slate-900">
              {project.duration || "Production Ready"}
            </p>
          </div>
        </div>

        {/* Detailed Case Study / Engineering Overview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {project.overview && (
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-3">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles size={18} className="text-[#FF6014]" />
                  Executive Overview
                </h2>
                <p className="text-slate-700 text-base leading-relaxed font-medium">
                  {project.overview}
                </p>
              </div>
            )}

            {project.problemStatement && (
              <div className="p-6 sm:p-8 rounded-3xl bg-amber-500/5 border border-amber-500/20 shadow-xl space-y-3">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Terminal size={18} className="text-amber-600" />
                  Problem Statement
                </h2>
                <p className="text-slate-700 text-base leading-relaxed font-medium">
                  {project.problemStatement}
                </p>
              </div>
            )}

            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Sparkles size={18} className="text-[#FF6014]" />
                Project Description & Architecture
              </h2>

              <div className="text-slate-700 text-base sm:text-lg leading-relaxed whitespace-pre-line space-y-3 font-medium">
                {project.description}
              </div>
            </div>

            {project.keyFeatures && project.keyFeatures.length > 0 && (
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-emerald-600" />
                  Key Features & Core Capabilities
                </h2>
                <div className="grid grid-cols-1 gap-4 pt-1">
                  {project.keyFeatures.map((kf, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                      <h3 className="font-bold text-slate-900 text-base">{kf.title}</h3>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed">{kf.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.technicalChallenges && project.technicalChallenges.length > 0 && (
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Code2 size={18} className="text-[#FF6014]" />
                  Technical Challenges & Solutions
                </h2>
                <div className="grid grid-cols-1 gap-4 pt-1">
                  {project.technicalChallenges.map((tc, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-orange-500/5 border border-orange-500/20 space-y-2">
                      <div className="font-bold text-slate-900 text-sm">
                        <span className="text-[#FF6014] font-extrabold uppercase text-xs tracking-wider mr-2">Challenge:</span>
                        {tc.challenge}
                      </div>
                      <div className="text-sm text-slate-700 font-medium leading-relaxed">
                        <span className="text-emerald-600 font-extrabold uppercase text-xs tracking-wider mr-2">Solution:</span>
                        {tc.solution}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.gallery && project.gallery.length > 0 && (
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Globe size={18} className="text-[#FF6014]" />
                  Project Screenshots & Gallery
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  {project.gallery.map((gUrl, idx) => (
                    <div key={idx} className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                      <img src={gUrl} alt={`Gallery screenshot ${idx + 1}`} className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Technologies & Tech Stack Sidebar */}
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Code2 size={16} className="text-[#FF6014]" />
                Technologies & Tools
              </h3>

              <div className="flex flex-wrap gap-2 pt-1">
                {project.tech && project.tech.length > 0 ? (
                  project.tech.map((techItem, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 hover:border-[#FF6014]/60 transition-all shadow-xs"
                    >
                      {techItem}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-500">Next.js, TypeScript, Tailwind CSS, Node.js</span>
                )}
              </div>
            </div>

            {/* Quick Contact Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-orange-500/10 via-white to-slate-50 border border-orange-500/20 shadow-xl space-y-3">
              <h3 className="text-base font-bold text-slate-900">
                Interested in similar engineering solutions?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                I can help build high-performance scalable web applications tailored to your business needs.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#FF6014] hover:text-[#ff7c42] transition-colors pt-1"
              >
                Let&apos;s build something together →
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

