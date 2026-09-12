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
} from "lucide-react";
import { Project, categoryLabel } from "./types";
import { useRouter } from "next/navigation";

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

// Curated studio-style dark color palette for full-screen poster scenes
const SCENE_BACKGROUNDS = [
  "#0F172A", // Rich Dark Slate
  "#111827", // Charcoal Slate
  "#161D2F", // Studio Navy
  "#172554", // Deep Blue
  "#1E293B", // Dark Slate Blue
  "#0B132B", // Deep Midnight
];

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
          y: "-180%",
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
          y: "0%",
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
          pointerEvents: "auto",
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
        if (bgOverlayRef.current) {
          gsap.set(bgOverlayRef.current, {
            backgroundColor: SCENE_BACKGROUNDS[0 % SCENE_BACKGROUNDS.length],
          });
        }

        if (totalTransitions <= 0) return;

        // Master Scroll Timeline: Scenes slide UP from bottom over previous scene
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinStageRef.current,
            pin: true,
            pinSpacing: true,
            start: "top top",
            end: () => `+=${totalTransitions * window.innerHeight * 0.85}`,
            scrub: 1.15,
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
            const nextBgColor = SCENE_BACKGROUNDS[(i + 1) % SCENE_BACKGROUNDS.length];

            const sceneTL = gsap.timeline();

            // Background color interpolation
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

            // Outgoing scene animation: complete fade out (opacity: 0) to prevent text bleeding/overlap
            sceneTL.to(
              scene,
              {
                scale: 0.94,
                yPercent: -5,
                opacity: 0,
                duration: 1,
                ease: "power2.inOut",
                onComplete: () => {
                  gsap.set(scene, { pointerEvents: "none" });
                },
                onReverseComplete: () => {
                  gsap.set(scene, { pointerEvents: "auto" });
                },
              },
              0
            );

            // Incoming scene animation (slides UP from bottom)
            sceneTL.to(
              nextScene,
              {
                opacity: 1,
                scale: 1,
                yPercent: 0,
                duration: 1,
                ease: "power2.inOut",
                onStart: () => {
                  gsap.set(nextScene, { pointerEvents: "auto" });
                },
              },
              0
            );

            // Incoming title reveal
            const nextTitle = nextScene.querySelector(`.scene-title-${scopeId}`);
            if (nextTitle) {
              sceneTL.fromTo(
                nextTitle,
                { opacity: 0, yPercent: 12 },
                { opacity: 1, yPercent: 0, duration: 0.8, ease: "power2.out" },
                0.15
              );
            }

            // Incoming artwork presentation reveal
            const nextArtwork = nextScene.querySelector(`.scene-artwork-${scopeId}`);
            if (nextArtwork) {
              sceneTL.fromTo(
                nextArtwork,
                {
                  scale: 1.08,
                  yPercent: 8,
                  opacity: 0,
                  clipPath: "inset(3% 3% 3% 3%)",
                },
                {
                  scale: 1,
                  yPercent: 0,
                  opacity: 1,
                  clipPath: "inset(0% 0% 0% 0%)",
                  duration: 0.9,
                  ease: "power2.out",
                },
                0.1
              );
            }

            // Incoming recruiter details reveal
            const nextDetails = nextScene.querySelector(`.scene-details-${scopeId}`);
            if (nextDetails) {
              sceneTL.fromTo(
                nextDetails,
                { opacity: 0, y: 18 },
                { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
                0.25
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
          style={{ backgroundColor: SCENE_BACKGROUNDS[0] }}
        />

        {/* Ambient Subtle Studio Lighting */}
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-black/50 pointer-events-none z-1" />

        {/* Project Scenes Stack */}
        <div className="relative w-full h-full z-10">
          {projects.map((project, index) => {
            const isFirst = index === 0;
            const contextLabel = getContextLabel(project.category, project.projectType);
            const highlights = getRecruiterHighlights(project);
            const bgColor = SCENE_BACKGROUNDS[index % SCENE_BACKGROUNDS.length];
            
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
                  backgroundColor: bgColor, // Solid background per scene to prevent text bleed
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

                {/* 2. CENTER SECTION: BALANCED FONT-SCALED TITLE + ARTWORK */}
                <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center flex-1 my-auto relative z-10 py-1 sm:py-2">
                  {/* Compact Font-Scaled Title (Max 2 Lines) */}
                  <h2
                    onClick={() => router.push(`/projects/${project.id}`)}
                    data-cursor-title-parallax
                    className={`scene-title-${scopeId} text-[clamp(26px,3.8vw,52px)] leading-[1.1] text-center tracking-tight text-white mb-2 sm:mb-3 cursor-pointer drop-shadow-md transition-transform duration-300 hover:scale-[1.01] max-w-5xl`}
                  >
                    {renderEditorialTitle(project.title)}
                  </h2>

                  {/* High-Resolution Project Artwork (Balanced 30-40vh Height) */}
                  <div
                    onClick={() => router.push(`/projects/${project.id}`)}
                    data-cursor="project"
                    data-cursor-label="VIEW PROJECT ↗"
                    data-cursor-parallax
                    data-parallax-speed="12"
                    data-parallax-scale="1.025"
                    className={`scene-artwork-${scopeId} project-image-scroll-layer relative w-[88vw] sm:w-[74vw] lg:w-[62vw] max-w-[1050px] h-[30vh] sm:h-[36vh] lg:h-[40vh] max-h-[460px] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl shadow-black/60 cursor-pointer group border border-white/15 transition-all duration-500 ease-out`}
                  >
                    <div className="project-image-mouse-layer w-full h-full">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>

                    {/* Subtle Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                      <span className="px-5 py-2.5 rounded-full bg-white backdrop-blur-md text-slate-950 text-xs font-extrabold uppercase tracking-widest shadow-2xl flex items-center gap-2">
                        View Full Details <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3. RECRUITER-FOCUSED TECHNICAL DETAILS & TIMELINE PANEL */}
                <div
                  className={`scene-details-${scopeId} w-full max-w-5xl mx-auto flex flex-col gap-2.5 z-20 pb-2 sm:pb-3 bg-slate-950/80 backdrop-blur-md border border-white/10 rounded-2xl p-3.5 sm:p-4 text-left shadow-xl`}
                >
                  {/* Timeline, Client & Type Metric Bar */}
                  <div className="flex items-center justify-between gap-3 flex-wrap border-b border-white/10 pb-2">
                    <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-white/90">
                      <span className="flex items-center gap-1 text-[#FF6014]">
                        <Calendar className="w-3.5 h-3.5" /> {project.year || "2026"}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1 text-slate-300">
                        {project.projectType === "CLIENT" ? (
                          <>
                            <Briefcase className="w-3.5 h-3.5 text-amber-400" /> CLIENT PRODUCTION
                          </>
                        ) : project.projectType === "TEAM" ? (
                          <>
                            <Users className="w-3.5 h-3.5 text-blue-400" /> TEAM RELEASE
                          </>
                        ) : (
                          <>
                            <User className="w-3.5 h-3.5 text-emerald-400" /> PERSONAL WORK
                          </>
                        )}
                      </span>
                      {project.duration && (
                        <>
                          <span>·</span>
                          <span className="flex items-center gap-1 text-slate-300">
                            <Clock className="w-3.5 h-3.5 text-sky-400" /> DURATION: {project.duration}
                          </span>
                        </>
                      )}
                    </div>

                    {project.client && (
                      <span className="font-mono text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        CLIENT: {project.client}
                      </span>
                    )}
                  </div>

                  {/* Recruiter Engineering Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-0.5">
                    {highlights.map((h, hIdx) => (
                      <div
                        key={hIdx}
                        className="flex items-start gap-2 bg-white/5 border border-white/10 p-2 rounded-xl"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#FF6014] shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] font-mono font-bold text-[#FF6014] uppercase tracking-wider block">
                            {h.title}
                          </span>
                          <p className="text-xs text-slate-200 font-medium leading-tight">
                            {h.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* High-Contrast Crisp Technology Badges & Action Buttons */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-white/10">
                    {/* Tech Badges */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-mono text-xs font-bold text-white/90 mr-1">TECH STACK:</span>
                      {displayedTech.map((techItem) => (
                        <span
                          key={techItem}
                          className="px-2.5 py-0.5 text-xs font-mono font-semibold bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors"
                        >
                          {techItem}
                        </span>
                      ))}
                      {remainingTechCount > 0 && (
                        <button
                          type="button"
                          onClick={() => setTechModalProject(project)}
                          className="px-2.5 py-0.5 text-xs font-mono font-bold bg-[#FF6014]/20 border border-[#FF6014]/40 text-[#FF6014] hover:bg-[#FF6014]/30 rounded-lg transition-colors cursor-pointer"
                        >
                          +{remainingTechCount} more
                        </button>
                      )}
                    </div>

                    {/* Prominent Action Buttons */}
                    <div className="flex items-center gap-2.5 shrink-0">
                      {project.demoLink && (
                        <a
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-[#FF6014] hover:bg-[#E5530F] rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                        </a>
                      )}

                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all active:scale-95 cursor-pointer"
                        >
                          <GithubIcon className="w-3.5 h-3.5" /> GitHub
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={() => router.push(`/projects/${project.id}`)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-white transition-colors cursor-pointer"
                      >
                        Case Study <ArrowRight className="w-3.5 h-3.5" />
                      </button>
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
    </div>
  );
}
