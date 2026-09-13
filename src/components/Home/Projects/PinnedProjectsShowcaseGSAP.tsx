"use client";
import React, { useEffect, useRef, useState, useId } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ExternalLink,
  ArrowUpRight,
  ArrowRight,
  X,
  Code2,
  CheckCircle2,
  Calendar,
  Clock,
  Briefcase,
  User,
  Users,
  Layers,
  Terminal,
  Sparkles,
} from "lucide-react";
import { Project, categoryLabel } from "./types";
import { useRouter } from "next/navigation";
import ProjectCaseStudyModal, { normalizeTechnicalChallenges } from "./ProjectCaseStudyModal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// Vibrant rich studio color palette for full-screen poster scenes (No plain black shades)
const VIBRANT_STUDIO_PALETTE = [
  "#2563EB", // Royal Blue
  "#7C3AED", // Vivid Purple
  "#059669", // Emerald Green
  "#D97706", // Rich Amber
  "#DC2626", // Crimson Red
  "#0284C7", // Bright Sky Blue
  "#C026D3", // Electric Magenta
  "#0D9488", // Deep Teal
  "#4F46E5", // Deep Indigo
  "#E11D48", // Vivid Rose
  "#2563EB", // Cobalt Blue
  "#9333EA", // Bright Violet
  "#16A34A", // Lush Emerald
  "#EA580C", // Vibrant Orange / Coral
  "#0284C7", // Cyan Blue
  "#B91C1C", // Deep Crimson
  "#6D28D9", // Deep Purple
  "#0369A1", // Ocean Blue
  "#BE123C", // Deep Rose
  "#15803D", // Forest Green
];

function getProjectSceneBg(index: number, projectId?: string): string {
  // Hash project ID if available to generate deterministic unique color index
  if (projectId) {
    let hash = 0;
    for (let i = 0; i < projectId.length; i++) {
      hash = projectId.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colorIdx = Math.abs(hash) % VIBRANT_STUDIO_PALETTE.length;
    return VIBRANT_STUDIO_PALETTE[colorIdx];
  }
  return VIBRANT_STUDIO_PALETTE[index % VIBRANT_STUDIO_PALETTE.length];
}

interface Highlight {
  title: string;
  detail: string;
}

/**
 * Parses description or generates recruiter-focused engineering highlights
 */
function getRecruiterHighlights(project: Project): Highlight[] {
  const highlights: Highlight[] = [];

  if (project.category === "FULL_STACK") {
    highlights.push({
      title: "FULL-STACK ARCHITECTURE & APIS",
      detail: "Scalable client-server architecture with REST/GraphQL services & state management.",
    });
  } else if (project.category === "AI_ML") {
    highlights.push({
      title: "AI ENGINE & AGENTIC WORKFLOW",
      detail: "Integrated LLM agent workflows and real-time prompt processing pipelines.",
    });
  } else if (project.category === "E_COMMERCE") {
    highlights.push({
      title: "E-COMMERCE & PAYMENT SYSTEM",
      detail: "Product management, cart architecture, and payment gateway integration.",
    });
  } else if (project.tagline) {
    highlights.push({
      title: project.tagline.toUpperCase(),
      detail: "Optimized user experience and responsive component architecture.",
    });
  }

  if (project.tech.includes("Next.js") || project.tech.includes("React")) {
    highlights.push({
      title: "NEXT.JS & TYPESCRIPT FRONTEND",
      detail: "Server-side rendering, component-driven UI, and static optimization.",
    });
  } else if (project.tech.includes("Node.js") || project.tech.includes("NestJS")) {
    highlights.push({
      title: "BACKEND SERVICES & DATABASE",
      detail: "Robust backend API services with structured database ORM schema.",
    });
  } else {
    highlights.push({
      title: "PRODUCTION DEPLOYMENT & CI/CD",
      detail: "Automated deployment, environment management, and performance monitoring.",
    });
  }

  return highlights.slice(0, 2);
}

/**
 * Formats project title into bold sans-serif + italic serif key word
 */
function renderEditorialTitle(title: string) {
  const words = title.trim().split(" ");
  if (words.length === 1) {
    return <span className="font-sans font-black tracking-tight">{title}</span>;
  }

  const mainText = words.slice(0, words.length - 1).join(" ");
  const accentWord = words[words.length - 1];

  return (
    <>
      <span className="font-sans font-black tracking-tight">{mainText} </span>
      <span className="font-serif italic font-normal text-white/95">{accentWord}</span>
    </>
  );
}

/**
 * Returns small contextual category label for top-right of scene
 */
function getContextLabel(category: string, projectType: string): string {
  const catName = categoryLabel[category] || category || "Full-Stack";
  if (catName.toLowerCase().includes("full-stack")) return "Explore Full-Stack Architecture";
  if (catName.toLowerCase().includes("ai")) return "Explore AI / Agentic Systems";
  if (catName.toLowerCase().includes("e-commerce")) return "Explore E-Commerce Platform";
  if (catName.toLowerCase().includes("frontend")) return "Explore UI/UX & Web Engineering";
  if (projectType === "CLIENT") return "Explore Client Software Solution";
  return `Explore ${catName} Project`;
}

interface PinnedProjectsShowcaseGSAPProps {
  projects: Project[];
}

export default function PinnedProjectsShowcaseGSAP({
  projects,
}: PinnedProjectsShowcaseGSAPProps) {
  const router = useRouter();
  const triggerRef = useRef<HTMLDivElement>(null);
  const pinStageRef = useRef<HTMLDivElement>(null);
  const bgOverlayRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [techModalProject, setTechModalProject] = useState<Project | null>(null);
  const [selectedCaseStudyProject, setSelectedCaseStudyProject] = useState<Project | null>(null);
  const [activeGalleryIndices, setActiveGalleryIndices] = useState<Record<string, number>>({});

  const scopeId = useId().replace(/:/g, "");

  useEffect(() => {
    if (typeof window === "undefined" || !pinStageRef.current || projects.length === 0) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const hideNavbar = () => {
      const mainNav = document.getElementById("main-navbar") || document.querySelector("header");
      if (mainNav) {
        gsap.to(mainNav, {
          yPercent: -180,
          opacity: 0,
          duration: 0.35,
          ease: "power2.out",
          pointerEvents: "none",
        });
      }
    };

    const showNavbar = () => {
      const mainNav = document.getElementById("main-navbar") || document.querySelector("header");
      if (mainNav) {
        gsap.to(mainNav, {
          yPercent: 0,
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
          pointerEvents: "auto",
          clearProps: "transform", // Clean up inline transforms so CSS margins handle centering perfectly
        });
      }
    };

    const ctx = gsap.context(() => {
      const totalTransitions = Math.max(1, projects.length - 1);

      // 1. Navbar Hiding ScrollTrigger
      ScrollTrigger.create({
        trigger: pinStageRef.current,
        start: "top 35%",
        end: () => `+=${(totalTransitions + 0.8) * window.innerHeight * 0.85}`,
        onEnter: hideNavbar,
        onLeave: showNavbar,
        onEnterBack: hideNavbar,
        onLeaveBack: showNavbar,
      });

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const scenes = gsap.utils.toArray<HTMLElement>(`.project-scene-${scopeId}`);
        if (scenes.length === 0) return;

        // Position all full-screen scenes absolutely
        gsap.set(scenes, {
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        });

        // Set initial states: Scene 0 is active; Scenes 1..N start below (yPercent: 100%)
        scenes.forEach((scene, i) => {
          if (i === 0) {
            gsap.set(scene, {
              opacity: 1,
              scale: 1,
              yPercent: 0,
              zIndex: 10,
              pointerEvents: "auto",
            });
          } else {
            gsap.set(scene, {
              opacity: 0,
              scale: 1.04,
              yPercent: 100,
              zIndex: 10 + i,
              pointerEvents: "none",
            });
          }
        });

        // Initial stage background
        if (bgOverlayRef.current && projects.length > 0) {
          gsap.set(bgOverlayRef.current, {
            backgroundColor: getProjectSceneBg(0, projects[0]?.id),
          });
        }

        if (totalTransitions <= 0) return;

        // Master Scroll Timeline: Scenes slide UP from bottom over previous scene with smooth scrub
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinStageRef.current,
            pin: true,
            pinSpacing: true,
            start: "top top",
            end: () => `+=${totalTransitions * window.innerHeight * 1.8}`,
            scrub: 1.2, // Ultra-smooth fluid scroll-driven animation
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const newIndex = Math.min(
                scenes.length - 1,
                Math.floor(self.progress * scenes.length)
              );
              setActiveIndex(newIndex);
            },
          },
        });

        scenes.forEach((scene, i) => {
          if (i < scenes.length - 1) {
            const nextScene = scenes[i + 1];
            const nextBgColor = getProjectSceneBg(i + 1, projects[i + 1]?.id);

            const sceneTL = gsap.timeline();

            // Background color smooth transition
            if (bgOverlayRef.current) {
              sceneTL.to(
                bgOverlayRef.current,
                {
                  backgroundColor: nextBgColor,
                  duration: 1,
                  ease: "power2.inOut",
                },
                0
              );
            }

            // Outgoing scene scale down and fade out completely to avoid background bleed & text overlap
            sceneTL.to(
              scene,
              {
                scale: 0.94,
                yPercent: -15,
                opacity: 0,
                duration: 1,
                ease: "power2.inOut",
                onComplete: () => {
                  gsap.set(scene, { pointerEvents: "none" });
                },
                onReverseComplete: () => {
                  gsap.set(scene, { pointerEvents: "auto", opacity: 1 });
                },
              },
              0
            );

            // Incoming scene smooth slide UP from bottom
            sceneTL.to(
              nextScene,
              {
                opacity: 1,
                scale: 1,
                yPercent: 0,
                duration: 1,
                ease: "power3.inOut",
                onStart: () => {
                  gsap.set(nextScene, { pointerEvents: "auto" });
                },
              },
              0
            );

            // Staggered Element Animations for incoming scene
            const nextTitle = nextScene.querySelector(`.scene-title-${scopeId}`);
            if (nextTitle) {
              sceneTL.fromTo(
                nextTitle,
                { opacity: 0, y: 35 },
                { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" },
                0.12
              );
            }

            const nextArtwork = nextScene.querySelector(`.scene-artwork-${scopeId}`);
            if (nextArtwork) {
              sceneTL.fromTo(
                nextArtwork,
                {
                  scale: 0.96,
                  y: 40,
                  opacity: 0,
                },
                {
                  scale: 1,
                  y: 0,
                  opacity: 1,
                  duration: 0.9,
                  ease: "power3.out",
                },
                0.18
              );
            }

            const nextDetails = nextScene.querySelector(`.scene-details-${scopeId}`);
            if (nextDetails) {
              sceneTL.fromTo(
                nextDetails,
                { opacity: 0, y: 45 },
                { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" },
                0.24
              );
            }

            tl.add(sceneTL);
          }
        });
      });

      ScrollTrigger.refresh();
    }, triggerRef);

    return () => {
      ctx.revert();
      showNavbar();
    };
  }, [projects, scopeId]);

  if (projects.length === 0) return null;

  return (
    <div ref={triggerRef} className="w-full relative">
      {/* Full-Screen Pinned Stage (100vw x 100vh) */}
      <div
        ref={pinStageRef}
        className="w-screen h-screen relative overflow-hidden flex items-center justify-center -mx-[calc((100vw-100%)/2)]"
      >
        {/* Dynamic Studio Background Layer */}
        <div
          ref={bgOverlayRef}
          className="absolute inset-0 w-full h-full transition-colors duration-700 ease-out z-0"
          style={{ backgroundColor: getProjectSceneBg(0, projects[0]?.id) }}
        />

        {/* Ambient Subtle Studio Lighting */}
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/30 via-transparent to-transparent pointer-events-none z-1" />

        {/* Project Scenes Stack */}
        <div className="relative w-full h-full z-10">
          {projects.map((project, index) => {
            const isFirst = index === 0;
            const contextLabel = getContextLabel(project.category, project.projectType);
            const highlights = getRecruiterHighlights(project);
            const bgColor = getProjectSceneBg(index, project.id);
            
            const displayedTech = project.tech ? project.tech.slice(0, 6) : [];
            const remainingTechCount = project.tech && project.tech.length > 6 ? project.tech.length - 6 : 0;

            return (
              <article
                key={project.id}
                className={`project-scene-${scopeId} w-full h-full p-4 sm:p-8 lg:p-10 flex flex-col justify-between items-center text-white select-none overflow-hidden ${
                  isFirst ? "relative" : "absolute inset-0"
                }`}
                style={{
                  opacity: isFirst ? 1 : 0,
                  pointerEvents: isFirst ? "auto" : "none",
                  backgroundColor: bgColor,
                  zIndex: index + 10,
                }}
              >
                {/* 1. TOP EDITORIAL BAR */}
                <div className="w-full flex items-center justify-between z-20 pt-1 sm:pt-2 max-w-7xl mx-auto">
                  {/* Top-Left: Index & Category Badge */}
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm sm:text-base tracking-widest font-bold text-[#FF6014] bg-orange-500/10 border border-orange-500/20 px-2.5 py-0.5 rounded-md">
                      ({String(index + 1).padStart(2, "0")})
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-white/90 hidden sm:inline-block">
                      {categoryLabel[project.category] || project.category}
                    </span>
                  </div>

                  {/* Top-Right: Contextual Editorial Label */}
                  <span className="font-sans text-xs sm:text-sm tracking-wide font-medium text-white/90">
                    {contextLabel}
                  </span>
                </div>

                {/* 2. CENTER SECTION: SPLIT 2-COLUMN LAYOUT (LEFT: IMAGES & GALLERY, RIGHT: FULL DETAILS & TECH) */}
                <div className="w-full max-w-[1700px] mx-auto flex-1 my-auto relative z-10 py-2 px-2 sm:px-6 flex flex-col justify-center">
                  {/* Title (Full Width Top) */}
                  <h2
                    onClick={() => setSelectedCaseStudyProject(project)}
                    data-cursor-title-parallax
                    className={`scene-title-${scopeId} text-[clamp(24px,3.2vw,44px)] font-black leading-[1.15] text-center lg:text-left tracking-tight text-white mb-3 sm:mb-4 cursor-pointer drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] transition-transform duration-300 hover:scale-[1.01]`}
                  >
                    {renderEditorialTitle(project.title)}
                  </h2>

                  {/* 2-Column Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                    
                    {/* LEFT COLUMN: Premium Laptop/Browser Mockup Showcase with Floating Gallery Thumbnails (7 Cols) */}
                    {(() => {
                      const allProjectImages = Array.from(
                        new Set([project.image, ...(project.gallery || [])].filter(Boolean) as string[])
                      );
                      const currentGalleryIdx = activeGalleryIndices[project.id] || 0;
                      const activeImage = allProjectImages[currentGalleryIdx] || project.image;

                      return (
                        <div
                          className={`scene-artwork-${scopeId} lg:col-span-7 flex flex-col justify-between h-full relative group`}
                        >
                          {/* Realistic macOS Web Browser Frame Container */}
                          <div
                            onClick={() => setSelectedCaseStudyProject(project)}
                            data-cursor="project"
                            data-cursor-label="VIEW CASE STUDY ↗"
                            data-cursor-parallax
                            className="project-image-scroll-layer relative w-full flex-1 min-h-[320px] sm:min-h-[380px] lg:min-h-[440px] max-h-[520px] rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border border-white/30 bg-slate-950 flex flex-col transition-all duration-500 ease-out hover:border-white/60"
                          >
                            {/* Browser Top Window Bar */}
                            <div className="w-full h-8 bg-slate-900/90 backdrop-blur-md border-b border-white/10 px-3 flex items-center justify-between z-20 shrink-0 select-none">
                              {/* macOS Window Controls */}
                              <div className="flex items-center gap-1.5">
                                <span className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-600/50 block" />
                                <span className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600/50 block" />
                                <span className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600/50 block" />
                              </div>

                              {/* Browser Address Bar Pill */}
                              <div className="px-4 py-0.5 rounded-full bg-slate-800/80 border border-white/10 text-[11px] font-mono text-slate-300 flex items-center gap-1.5 max-w-[220px] sm:max-w-xs truncate shadow-inner">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="truncate">{project.demoLink ? project.demoLink.replace(/^https?:\/\//, "") : `${project.title.toLowerCase().replace(/\s+/g, "")}.com`}</span>
                              </div>

                              {/* Window Action Indicator */}
                              <div className="text-[10px] font-mono text-white/50 hidden sm:block">
                                HD SCREENSHOT
                              </div>
                            </div>

                            {/* Main Screen Display Area (Object Contain to show 100% full screenshot without clipping) */}
                            <div className="project-image-mouse-layer relative w-full flex-1 overflow-hidden bg-slate-950 flex items-center justify-center p-1 sm:p-2">
                              <img
                                key={activeImage}
                                src={activeImage}
                                alt={project.title}
                                className="w-full h-full object-contain max-h-[460px] rounded-lg transition-all duration-300 ease-out"
                              />
                            </div>

                            {/* Subtle & Minimalist Hover Overlay */}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 pointer-events-none z-10">
                              <span className="px-5 py-2.5 rounded-full bg-white/95 text-slate-900 text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5 backdrop-blur-xs">
                                View Case Study <ArrowRight className="w-3.5 h-3.5 text-[#FF6014]" />
                              </span>
                            </div>
                          </div>

                          {/* Floating Sleek Glass Gallery Bar */}
                          {allProjectImages.length > 1 && (
                            <div className="mt-3 flex items-center justify-center gap-2 p-2 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/20 shadow-2xl shrink-0">
                              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-white/90 px-2 shrink-0 flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-[#FF6014]" /> Screenshots ({allProjectImages.length}):
                              </span>
                              <div className="flex items-center gap-2 overflow-x-auto p-0.5">
                                {allProjectImages.map((imgUrl, imgIdx) => (
                                  <button
                                    key={imgIdx}
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setActiveGalleryIndices((prev) => ({
                                        ...prev,
                                        [project.id]: imgIdx,
                                      }));
                                    }}
                                    className={`relative w-14 h-10 sm:w-16 sm:h-11 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer bg-slate-900 ${
                                      currentGalleryIdx === imgIdx
                                        ? "border-[#FF6014] ring-2 ring-[#FF6014]/40 opacity-100 shadow-md"
                                        : "border-white/30 opacity-60 hover:opacity-100 hover:border-white"
                                    }`}
                                    title={`View Screenshot ${imgIdx + 1}`}
                                  >
                                    <img src={imgUrl} alt={`Thumb ${imgIdx + 1}`} className="w-full h-full object-cover object-top" />
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })()}

                    {/* RIGHT COLUMN: Full Details Panel (5 Cols) - Transparent Dynamic Glass (No white block) */}
                    <div
                      className={`scene-details-${scopeId} lg:col-span-5 flex flex-col justify-between gap-4 text-left text-white overflow-y-auto max-h-[560px] pr-2.5 custom-showcase-scrollbar`}
                    >
                      {/* Timeline, Client & Type Metric Bar */}
                      <div className="flex items-center justify-between gap-2 flex-wrap border-b border-white/15 pb-3">
                        <div className="flex items-center gap-2.5 text-xs font-mono font-bold">
                          <span className="flex items-center gap-1.5 text-white bg-white/15 border border-white/20 px-2.5 py-1 rounded-lg shadow-sm">
                            <Calendar className="w-3.5 h-3.5 text-[#FF6014]" /> {project.year || "2026"}
                          </span>
                          <span className="text-white/40">·</span>
                          <span className="flex items-center gap-1.5 text-white/90">
                            {project.projectType === "CLIENT" ? (
                              <>
                                <Briefcase className="w-3.5 h-3.5 text-amber-300" /> CLIENT
                              </>
                            ) : project.projectType === "TEAM" ? (
                              <>
                                <Users className="w-3.5 h-3.5 text-sky-300" /> TEAM RELEASE
                              </>
                            ) : (
                              <>
                                <User className="w-3.5 h-3.5 text-emerald-300" /> PERSONAL
                              </>
                            )}
                          </span>
                          {project.duration && (
                            <>
                              <span className="text-white/40">·</span>
                              <span className="flex items-center gap-1.5 text-white/90">
                                <Clock className="w-3.5 h-3.5 text-amber-400" /> {project.duration} Days
                              </span>
                            </>
                          )}
                        </div>

                        {project.client && (
                          <span className="font-mono text-[10px] font-extrabold text-amber-300 uppercase tracking-wider bg-amber-500/20 border border-amber-400/30 px-2.5 py-1 rounded-lg shadow-sm">
                            {project.client}
                          </span>
                        )}
                      </div>

                      {/* Project Overview / Tagline */}
                      {project.overview || project.tagline ? (
                        <div className="space-y-1.5 bg-black/25 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-xl">
                          <span className="text-[10px] font-mono font-extrabold text-[#FF6014] uppercase tracking-widest block">
                            PROJECT OVERVIEW
                          </span>
                          <p className="text-xs sm:text-sm text-white/90 font-medium leading-relaxed drop-shadow-sm">
                            {project.overview || project.tagline}
                          </p>
                        </div>
                      ) : null}

                      {/* Recruiter Engineering Highlights Grid */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono font-extrabold text-white/70 uppercase tracking-widest block">
                          ENGINEERING HIGHLIGHTS
                        </span>
                        <div className="grid grid-cols-1 gap-2.5">
                          {highlights.map((h, hIdx) => (
                            <div
                              key={hIdx}
                              className="flex items-start gap-2.5 bg-black/25 backdrop-blur-md border border-white/20 p-3 rounded-2xl shadow-xl hover:border-white/40 transition-colors"
                            >
                              <CheckCircle2 className="w-4.5 h-4.5 text-[#FF6014] shrink-0 mt-0.5" />
                              <div>
                                <span className="text-[10px] font-mono font-bold text-[#FF6014] uppercase tracking-wider block">
                                  {h.title}
                                </span>
                                <p className="text-xs sm:text-sm text-white/90 font-semibold leading-snug drop-shadow-xs">
                                  {h.detail}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Full Tech Stack & Action Buttons */}
                      <div className="space-y-3.5 pt-3 border-t border-white/15">
                        {/* Tech Badges */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-mono text-xs font-extrabold text-white uppercase tracking-wider">
                              TECH STACK ({project.tech ? project.tech.length : 0}):
                            </span>
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            {displayedTech.map((techItem) => (
                              <span
                                key={techItem}
                                className="px-3 py-1.5 text-xs font-mono font-bold bg-black/40 backdrop-blur-md border border-white/25 rounded-xl text-white shadow-sm hover:border-[#FF6014] transition-colors"
                              >
                                {techItem}
                              </span>
                            ))}
                            {remainingTechCount > 0 && (
                              <button
                                type="button"
                                onClick={() => setTechModalProject(project)}
                                className="px-3 py-1.5 text-xs font-mono font-bold bg-[#FF6014] text-white border border-orange-400 rounded-xl hover:bg-orange-600 transition-colors cursor-pointer shadow-md"
                              >
                                +{remainingTechCount} more
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-end gap-2.5 pt-1">
                          {project.demoLink && (
                            <a
                              href={project.demoLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2.5 rounded-xl bg-[#FF6014] hover:bg-[#E0530A] text-white text-xs font-extrabold shadow-xl shadow-orange-600/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                            >
                              <ExternalLink size={14} /> Live Demo
                            </a>
                          )}

                          {project.githubLink && (
                            <a
                              href={project.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/30 text-xs font-extrabold backdrop-blur-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                            >
                              <GithubIcon className="w-4 h-4 text-white" /> GitHub
                            </a>
                          )}

                          <button
                            type="button"
                            onClick={() => setSelectedCaseStudyProject(project)}
                            className="px-4 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-slate-200 text-xs font-extrabold shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                          >
                            Case Study <ArrowRight size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Tech Stack Full Modal / Overlay */}
      {techModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl text-white space-y-4 relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-[#FF6014]" />
                <h4 className="font-bold text-base sm:text-lg">
                  Tech Stack — {techModalProject.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setTechModalProject(null)}
                className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400 font-medium">
              Complete technology stack powering this digital release ({techModalProject.tech.length} total):
            </p>

            <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto p-1">
              {techModalProject.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 text-xs font-mono font-semibold bg-slate-800 border border-slate-700/80 rounded-xl text-slate-200"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setTechModalProject(null)}
                className="px-4 py-2 text-xs font-bold text-slate-900 bg-white hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recruiter Full-Screen Case Study Modal */}
      <ProjectCaseStudyModal
        isOpen={!!selectedCaseStudyProject}
        onClose={() => setSelectedCaseStudyProject(null)}
        project={selectedCaseStudyProject}
      />
    </div>
  );
}
