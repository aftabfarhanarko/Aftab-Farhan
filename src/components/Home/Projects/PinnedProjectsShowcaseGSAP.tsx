"use client";
import React, { useEffect, useRef, useState, useId } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, ArrowUpRight, ArrowRight, X, Code2 } from "lucide-react";
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
  "#111111", // Deep Graphite Black
  "#161616", // Studio Charcoal
  "#243746", // Desaturated Slate Blue
  "#3D5F70", // Muted Muted Teal Blue
  "#1E282A", // Dark Olive Charcoal
  "#202A3A", // Deep Studio Navy
];

/**
 * Returns varied editorial layout alignment offsets for each project scene
 * to ensure visual composition diversity across scenes.
 */
function getArtworkCompositionClass(index: number): string {
  const mode = index % 4;
  if (mode === 1) return "md:translate-x-6 lg:translate-x-10"; // Slightly right-shifted
  if (mode === 2) return "md:-translate-x-6 lg:-translate-x-10"; // Slightly left-shifted
  if (mode === 3) return "md:-translate-y-2 lg:-translate-y-4 scale-[1.02]"; // Slightly larger / overlapped
  return "translate-x-0"; // Centered default
}

/**
 * Formats project title into bold sans-serif + italic serif key word
 * for high-end editorial studio aesthetic matching the reference image.
 */
function renderEditorialTitle(title: string) {
  const words = title.trim().split(" ");
  if (words.length === 1) {
    return <span className="font-sans font-black tracking-tight">{title}</span>;
  }

  // Last word gets elegant serif italic styling if multi-word
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

/**
 * Extracts a concise 1-2 sentence human-readable summary
 */
function getConciseDescription(description: string, tagline?: string): string {
  if (!description) return tagline || "Production software application engineered for high performance and scale.";
  
  const sentences = description.split(/(?<=\.)\s+/).filter(Boolean);
  if (sentences.length >= 2) {
    return `${sentences[0]} ${sentences[1]}`;
  }
  if (sentences.length === 1 && sentences[0].length > 160) {
    return sentences[0].slice(0, 155) + "...";
  }
  return sentences[0] || tagline || description;
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

      // 1. Navbar Hiding ScrollTrigger: Hides navbar as soon as Projects stage enters 35% viewport
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

        // Position all full-screen scenes absolutely on top of each other
        gsap.set(scenes, {
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        });

        // Set initial states: Scene 0 is active; Scenes 1..N start BELOW the viewport (yPercent: 100%)
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
              yPercent: 100, // Starts completely below viewport
              zIndex: 10 + i,
              pointerEvents: "none",
            });
          }
        });

        // Set initial stage background color
        if (bgOverlayRef.current) {
          gsap.set(bgOverlayRef.current, {
            backgroundColor: SCENE_BACKGROUNDS[0 % SCENE_BACKGROUNDS.length],
          });
        }

        if (totalTransitions <= 0) return;

        // Master Scroll Timeline: Full-screen scenes slide UP smoothly from bottom over previous scene
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

            // Outgoing scene animation (scale down to 0.94, move up -5%, fade out)
            sceneTL.to(
              scene,
              {
                scale: 0.94,
                yPercent: -5,
                opacity: 0.3,
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

            // Incoming scene animation (slides UP smoothly from bottom: yPercent: 100% -> 0%, scale: 1.04 -> 1, opacity: 0 -> 1)
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

            // Incoming artwork presentation reveal with clip-path inset & scale reveal
            const nextArtwork = nextScene.querySelector(`.scene-artwork-${scopeId}`);
            if (nextArtwork) {
              sceneTL.fromTo(
                nextArtwork,
                {
                  scale: 1.1,
                  yPercent: 8,
                  opacity: 0,
                  clipPath: "inset(4% 4% 4% 4%)",
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

            // Incoming description, tech stack, and action links reveal
            const nextFooter = nextScene.querySelector(`.scene-footer-${scopeId}`);
            if (nextFooter) {
              sceneTL.fromTo(
                nextFooter,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
                0.3
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
      {/* Full-Screen Pinned Stage (100vw x 100vh Full Page Showcase) */}
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
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-black/40 pointer-events-none z-1" />

        {/* Project Scenes Stack */}
        <div className="relative w-full h-full z-10">
          {projects.map((project, index) => {
            const isFirst = index === 0;
            const contextLabel = getContextLabel(project.category, project.projectType);
            const compositionClass = getArtworkCompositionClass(index);
            const conciseDesc = getConciseDescription(project.description, project.tagline);
            
            const mainTech = project.tech ? project.tech.slice(0, 5) : [];
            const extraTechCount = project.tech && project.tech.length > 5 ? project.tech.length - 5 : 0;

            return (
              <article
                key={project.id}
                className={`project-scene-${scopeId} w-full h-full p-6 sm:p-10 lg:p-14 flex flex-col justify-between items-center text-white select-none overflow-hidden ${
                  isFirst ? "relative" : "absolute inset-0"
                }`}
                style={{
                  opacity: isFirst ? 1 : 0,
                  pointerEvents: isFirst ? "auto" : "none",
                }}
              >
                {/* 1. TOP EDITORIAL BAR (Floating Header) */}
                <div className="w-full flex items-center justify-between z-20 pt-2 sm:pt-4">
                  {/* Top-Left: Small Editorial Index */}
                  <span className="font-mono text-sm sm:text-base tracking-widest font-light text-white/90">
                    ({String(index + 1).padStart(2, "0")})
                  </span>

                  {/* Top-Right: Contextual Editorial Label */}
                  <span className="font-sans text-xs sm:text-sm tracking-wide font-medium text-white/90">
                    {contextLabel}
                  </span>
                </div>

                {/* 2. CENTER PIECE: HUGE EDITORIAL TITLE + LARGE ARTWORK COMPOSITION */}
                <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center flex-1 my-auto relative z-10 py-1 sm:py-3">
                  {/* Massive Editorial Project Title */}
                  <h2
                    onClick={() => router.push(`/projects/${project.id}`)}
                    className={`scene-title-${scopeId} text-[clamp(44px,7.5vw,130px)] leading-[0.95] text-center tracking-tight text-white mb-3 sm:mb-5 cursor-pointer drop-shadow-xl transition-transform duration-500 hover:scale-[1.01]`}
                  >
                    {renderEditorialTitle(project.title)}
                  </h2>

                  {/* Large Centered Project Artwork Presentation with dynamic layout offsets */}
                  <div
                    onClick={() => router.push(`/projects/${project.id}`)}
                    className={`scene-artwork-${scopeId} relative w-[85vw] sm:w-[70vw] lg:w-[62vw] max-w-[1100px] h-[38vh] sm:h-[46vh] lg:h-[52vh] max-h-[640px] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl shadow-black/50 cursor-pointer group border border-white/10 transition-transform duration-700 ease-out ${compositionClass}`}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Subtle Hover Overlay */}
                    <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                      <span className="px-5 py-2.5 rounded-full bg-white/95 backdrop-blur-md text-slate-900 text-xs font-extrabold uppercase tracking-widest shadow-2xl flex items-center gap-2">
                        View Case Study <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3. BOTTOM EDITORIAL SUPPORTING FOOTER */}
                <div
                  className={`scene-footer-${scopeId} w-full max-w-3xl mx-auto flex flex-col items-center gap-2 z-20 pb-2 sm:pb-4 text-center`}
                >
                  {/* Concise 1-2 Sentence Human-Readable Summary */}
                  <p className="text-xs sm:text-sm font-medium text-white/90 tracking-wide max-w-xl leading-relaxed">
                    {conciseDesc}
                  </p>

                  {/* User-Friendly Readable Tech Stack Line */}
                  <div className="flex items-center gap-2 flex-wrap justify-center font-mono text-[11px] sm:text-xs text-white/80 tracking-wider">
                    <span className="font-bold text-white/90">STACK</span>
                    <span>:</span>
                    <span>{mainTech.join(" · ")}</span>
                    {extraTechCount > 0 && (
                      <button
                        type="button"
                        onClick={() => setTechModalProject(project)}
                        className="underline text-white/90 hover:text-white transition-colors cursor-pointer ml-1"
                      >
                        (+{extraTechCount} more)
                      </button>
                    )}
                  </div>

                  {/* Essential Metadata Badge */}
                  <div className="font-mono text-[10px] sm:text-[11px] text-white/70 tracking-widest uppercase">
                    <span>{project.year || "2026"}</span>
                    <span className="mx-2">·</span>
                    <span>{project.projectType === "CLIENT" ? "CLIENT PRODUCTION" : "TEAM RELEASE"}</span>
                  </div>

                  {/* Minimal Editorial Text Action Links */}
                  <div className="flex items-center gap-6 pt-1 sm:pt-2">
                    {project.demoLink && (
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1 text-xs sm:text-sm font-bold tracking-wider text-white uppercase hover:opacity-80 transition-opacity"
                      >
                        <span className="border-b border-white/60 group-hover:border-white pb-0.5">
                          VIEW LIVE
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    )}

                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1 text-xs sm:text-sm font-bold tracking-wider text-white/90 uppercase hover:text-white transition-colors"
                      >
                        <span className="border-b border-white/40 group-hover:border-white pb-0.5">
                          GITHUB
                        </span>
                        <GithubIcon className="w-3.5 h-3.5" />
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() => router.push(`/projects/${project.id}`)}
                      className="group inline-flex items-center gap-1 text-xs sm:text-sm font-bold tracking-wider text-white/80 uppercase hover:text-white transition-colors cursor-pointer"
                    >
                      <span className="border-b border-white/30 group-hover:border-white pb-0.5">
                        CASE STUDY
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
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
