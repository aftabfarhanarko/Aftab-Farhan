"use client";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import Link from "next/link";
import {
  ExternalLink,
  ArrowUpRight,
  X,
  Code2,
  Briefcase,
  User,
  Users,
  Check,
} from "lucide-react";
import { Project, categoryLabel } from "./types";

const ACCENT = "#FF6014";
const SLIDE_INTERVAL = 3000;

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

interface Highlight {
  title: string;
  detail: string;
}

function getRecruiterHighlights(project: Project): Highlight[] {
  const highlights: Highlight[] = [];

  if (project.category === "FULL_STACK") {
    highlights.push({
      title: "Full-stack architecture",
      detail: "Scalable client-server architecture with REST/GraphQL APIs.",
    });
  } else if (project.category === "AI_ML") {
    highlights.push({
      title: "AI & agentic workflow",
      detail: "LLM agent integration & real-time prompt processing.",
    });
  } else if (project.category === "E_COMMERCE") {
    highlights.push({
      title: "E-commerce & payments",
      detail: "Cart architecture, inventory, and payment gateway integration.",
    });
  } else if (project.tagline) {
    highlights.push({
      title: project.tagline,
      detail: "Responsive component architecture.",
    });
  }

  if (project.tech?.includes("Next.js") || project.tech?.includes("React")) {
    highlights.push({
      title: "Next.js & TypeScript",
      detail: "SSR, static optimization & type-safe frontend.",
    });
  } else {
    highlights.push({
      title: "Production & CI/CD",
      detail: "Automated deployment, testing & performance monitoring.",
    });
  }

  return highlights.slice(0, 2);
}

function getProjectImages(p: Project): string[] {
  return Array.from(
    new Set([p.image, ...(p.gallery || [])].filter(Boolean) as string[])
  );
}

const typeStyles: Record<
  string,
  { label: string; className: string; Icon: typeof User }
> = {
  CLIENT: {
    label: "Client",
    className: "bg-amber-50 text-amber-800 border-amber-200",
    Icon: Briefcase,
  },
  TEAM: {
    label: "Team",
    className: "bg-indigo-50 text-indigo-800 border-indigo-200",
    Icon: Users,
  },
  PERSONAL: {
    label: "Personal",
    className: "bg-emerald-50 text-emerald-800 border-emerald-200",
    Icon: User,
  },
};

/* Hides the native scrollbar without disabling scrolling */
const noScrollbar =
  "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden";

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

interface PinnedProjectsShowcaseGSAPProps {
  projects: Project[];
}

export default function PinnedProjectsShowcaseGSAP({
  projects,
}: PinnedProjectsShowcaseGSAPProps) {
  const [techModalProject, setTechModalProject] = useState<Project | null>(null);
  const [activeIndex, setActiveIndex] = useState<Record<string, number>>({});
  const [paused, setPausedState] = useState<Record<string, boolean>>({});
  const [fadingOut, setFadingOut] = useState<Record<string, boolean>>({});

  // Ref mirror of `paused` so the interval never has to call setState
  // inside another setState updater (which double-fires in Strict Mode).
  const pausedRef = useRef<Record<string, boolean>>({});
  const indexRef = useRef<Record<string, number>>({});
  const intervalsRef = useRef<Record<string, ReturnType<typeof setInterval>>>({});
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const imagesById = useMemo(() => {
    const map: Record<string, string[]> = {};
    projects.forEach((p) => {
      map[p.id] = getProjectImages(p);
    });
    return map;
  }, [projects]);

  const setPaused = useCallback((id: string, value: boolean) => {
    pausedRef.current[id] = value;
    setPausedState((prev) => ({ ...prev, [id]: value }));
  }, []);

  const goTo = useCallback((id: string, next: number) => {
    setFadingOut((prev) => ({ ...prev, [id]: true }));
    const t = setTimeout(() => {
      indexRef.current[id] = next;
      setActiveIndex((prev) => ({ ...prev, [id]: next }));
      setFadingOut((prev) => ({ ...prev, [id]: false }));
    }, 160);
    timeoutsRef.current.push(t);
  }, []);

  const advance = useCallback(
    (id: string) => {
      const imgs = imagesById[id];
      if (!imgs || imgs.length <= 1) return;
      const current = indexRef.current[id] || 0;
      goTo(id, (current + 1) % imgs.length);
    },
    [imagesById, goTo]
  );

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    projects.forEach((p) => {
      const imgs = imagesById[p.id];
      if (!imgs || imgs.length <= 1) return;
      if (intervalsRef.current[p.id]) clearInterval(intervalsRef.current[p.id]);
      intervalsRef.current[p.id] = setInterval(() => {
        if (!pausedRef.current[p.id]) advance(p.id);
      }, SLIDE_INTERVAL);
    });

    return () => {
      Object.values(intervalsRef.current).forEach(clearInterval);
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [projects, imagesById, advance]);

  // Close modal on Escape
  useEffect(() => {
    if (!techModalProject) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setTechModalProject(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [techModalProject]);

  if (projects.length === 0) return null;

  return (
    <div className="w-full relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full">
        {projects.map((project) => {
          const highlights = getRecruiterHighlights(project);
          const tech = project.tech || [];
          const displayedTech = tech.slice(0, 5);
          const remainingTechCount = Math.max(0, tech.length - 5);

          const images = imagesById[project.id] || [];
          const currentIdx = activeIndex[project.id] || 0;
          const activeImage = images[currentIdx] || project.image;
          const isPaused = !!paused[project.id];
          const kind = typeStyles[project.projectType || "PERSONAL"] || typeStyles.PERSONAL;
          const KindIcon = kind.Icon;

          const urlLabel = project.demoLink
            ? project.demoLink.replace(/^https?:\/\//, "").replace(/\/$/, "")
            : `${project.title.toLowerCase().replace(/\s+/g, "")}.com`;

          return (
            <article
              key={project.id}
              className="group relative flex flex-col rounded-[28px] bg-white text-slate-900 overflow-hidden border border-slate-200/80 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_-12px_rgba(15,23,42,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6014]/40 hover:shadow-[0_2px_4px_rgba(15,23,42,0.04),0_28px_56px_-16px_rgba(255,96,20,0.28)]"
            >
              {/* Accent line on hover */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[#FF6014] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20" />

              <div className="flex flex-col flex-1 p-5 sm:p-6 gap-4">
                {/* Header: category + project type */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-slate-500">
                    {categoryLabel[project.category] || project.category}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-bold leading-none ${kind.className}`}
                  >
                    <KindIcon className="w-3 h-3" aria-hidden="true" />
                    {kind.label}
                  </span>
                </div>

                {/* Title */}
                <Link
                  href={`/projects/${project.id}`}
                  className="block text-xl sm:text-[26px] font-black tracking-tight text-slate-900 leading-[1.15] transition-colors group-hover:text-[#FF6014] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6014] rounded-md"
                >
                  {project.title}
                </Link>

                {/* Browser frame */}
                <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm transition-shadow group-hover:shadow-md">
                  {/* Window bar */}
                  <div className="h-9 bg-slate-50 border-b border-slate-200 px-3 flex items-center gap-3">
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <div className="flex-1 min-w-0 flex justify-center">
                      <div className="max-w-full truncate rounded-full bg-white border border-slate-200 px-3 py-0.5 text-[10px] font-mono font-semibold text-slate-500">
                        {urlLabel}
                      </div>
                    </div>
                    <span className="shrink-0 inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 motion-safe:animate-ping" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      </span>
                      Live
                    </span>
                  </div>

                  {/* Screenshot — fills the frame edge to edge (no black bars) */}
                  <Link
                    href={`/projects/${project.id}`}
                    aria-label={`View ${project.title} case study`}
                    className="group/img relative block w-full aspect-[16/10] overflow-hidden bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#FF6014]"
                    onMouseEnter={() => setPaused(project.id, true)}
                    onMouseLeave={() => setPaused(project.id, false)}
                    onFocus={() => setPaused(project.id, true)}
                    onBlur={() => setPaused(project.id, false)}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      key={activeImage}
                      src={activeImage}
                      alt={project.title}
                      className={`absolute inset-0 h-full w-full object-cover object-top transition-all duration-500 ease-out group-hover/img:scale-[1.03] ${
                        fadingOut[project.id]
                          ? "opacity-0 scale-[1.02]"
                          : "opacity-100"
                      }`}
                    />

                    {/* Bottom fade so overlay UI stays readable on any screenshot */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/40 to-transparent" />

                    {/* Story-style progress segments */}
                    {images.length > 1 && (
                      <div className="pointer-events-none absolute top-2.5 inset-x-3 flex gap-1 z-10">
                        {images.map((_, i) => (
                          <span
                            key={i}
                            className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/50 backdrop-blur-sm"
                          >
                            {i < currentIdx && (
                              <span className="absolute inset-0 bg-[#FF6014]" />
                            )}
                            {i === currentIdx && (
                              <span
                                key={`${project.id}-${currentIdx}-${isPaused}`}
                                className={`absolute inset-y-0 left-0 bg-[#FF6014] ${
                                  isPaused ? "w-full" : "animate-gallery-progress"
                                }`}
                              />
                            )}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Counter */}
                    {images.length > 1 && (
                      <span className="pointer-events-none absolute bottom-2.5 left-3 z-10 rounded-full bg-slate-950/55 px-2.5 py-1 text-[10px] font-mono font-bold text-white backdrop-blur-md">
                        {currentIdx + 1} / {images.length}
                      </span>
                    )}

                    {/* Hover CTA */}
                    <span className="pointer-events-none absolute bottom-2.5 right-3 z-10 inline-flex items-center gap-1 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-slate-900 shadow-lg opacity-0 translate-y-1 transition-all duration-200 group-hover/img:opacity-100 group-hover/img:translate-y-0">
                      View case study
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#FF6014]" />
                    </span>
                  </Link>

                  {/* Thumbnail strip */}
                  {images.length > 1 && (
                    <div
                      className="border-t border-slate-200 bg-slate-50 px-3 py-2.5"
                      onMouseEnter={() => setPaused(project.id, true)}
                      onMouseLeave={() => setPaused(project.id, false)}
                    >
                      <div
                        className={`flex items-center gap-2 overflow-x-auto overflow-y-hidden p-1 ${noScrollbar}`}
                        role="tablist"
                        aria-label={`${project.title} screenshots`}
                      >
                        {images.map((imgUrl, imgIdx) => {
                          const active = currentIdx === imgIdx;
                          return (
                            <button
                              key={imgUrl}
                              type="button"
                              role="tab"
                              aria-selected={active}
                              aria-label={`Show screenshot ${imgIdx + 1}`}
                              onClick={() => {
                                if (!active) goTo(project.id, imgIdx);
                              }}
                              className={`relative h-10 w-16 shrink-0 overflow-hidden rounded-lg bg-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6014] ${
                                active
                                  ? "ring-2 ring-[#FF6014] ring-offset-2 ring-offset-slate-50"
                                  : "ring-1 ring-slate-300 opacity-60 hover:opacity-100 hover:ring-slate-400"
                              }`}
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={imgUrl}
                                alt=""
                                loading="lazy"
                                decoding="async"
                                className="h-full w-full object-cover object-top"
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Overview */}
                {(project.overview || project.tagline) && (
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 max-w-[68ch]">
                    {project.overview || project.tagline}
                  </p>
                )}

                {/* Highlights */}
                <ul className="space-y-2">
                  {highlights.map((h) => (
                    <li
                      key={h.title}
                      className="flex items-start gap-3 rounded-xl border border-slate-200/80 bg-slate-50/70 px-3 py-2.5"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FF6014]/10 text-[#FF6014]">
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[13px] font-bold text-slate-900 leading-tight">
                          {h.title}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-600 leading-snug">
                          {h.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Footer pushed to the bottom so both cards align */}
                <div className="mt-auto pt-4 border-t border-slate-100 space-y-4">
                  {/* Tech stack */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {displayedTech.map((t) => (
                      <span
                        key={t}
                        className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-mono font-semibold text-slate-700"
                      >
                        {t}
                      </span>
                    ))}
                    {remainingTechCount > 0 && (
                      <button
                        type="button"
                        onClick={() => setTechModalProject(project)}
                        className="rounded-lg bg-[#FF6014] px-2.5 py-1 text-[11px] font-mono font-bold text-white transition-colors hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6014] focus-visible:ring-offset-2 cursor-pointer"
                      >
                        +{remainingTechCount} more
                      </button>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center justify-end gap-2">
                    {project.demoLink && (
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-[#FF6014] px-4 py-2.5 text-xs font-bold text-white shadow-[0_6px_16px_-6px_rgba(255,96,20,0.7)] transition-all hover:bg-orange-600 hover:shadow-[0_8px_20px_-6px_rgba(255,96,20,0.8)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6014] focus-visible:ring-offset-2 cursor-pointer"
                      >
                        <ExternalLink size={13} /> Live demo
                      </a>
                    )}

                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-800 transition-all hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 cursor-pointer"
                      >
                        <GithubIcon className="w-3.5 h-3.5" /> Code
                      </a>
                    )}

                    <Link
                      href={`/projects/${project.id}`}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 cursor-pointer"
                    >
                      Case study <ArrowUpRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Tech stack modal */}
      {techModalProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label={`Tech stack for ${techModalProject.title}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) setTechModalProject(null);
          }}
        >
          <div className="relative w-full max-w-lg space-y-4 rounded-3xl border border-slate-200 bg-white p-6 text-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 min-w-0">
                <Code2 className="w-5 h-5 shrink-0 text-[#FF6014]" />
                <h4 className="truncate text-base sm:text-lg font-extrabold">
                  Tech stack: {techModalProject.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setTechModalProject(null)}
                aria-label="Close"
                className="rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs font-medium text-slate-600">
              {techModalProject.tech.length} technologies used in this project:
            </p>

            <div className="flex max-h-60 flex-wrap gap-2 overflow-y-auto p-1">
              {techModalProject.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-mono font-semibold text-slate-800"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setTechModalProject(null)}
                className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-slate-800 cursor-pointer"
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