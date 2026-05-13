"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Users } from "lucide-react";

interface Stat {
  num: string;
  label: string;
}

interface Project {
  title: string;
  description: string;
}

interface Proficiency {
  name: string;
  pct: number;
}

interface AboutData {
  roleTag?: string;
  roleDescription?: string;
  introParagraphs?: string[];
  clientFocusedText?: string;
  stats?: Stat[];
  proficiencies?: Proficiency[];
  frontendSkills?: string[];
  backendSkills?: string[];
  tools?: string[];
  projects?: Project[];
  quoteText?: string;
  quoteAuthor?: string;
  mentorTitle?: string;
  mentorDescription?: string;
  availabilityText?: string;
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null);

  const {
    data: aboutData,
    isLoading,
    error,
  } = useQuery<AboutData>({
    queryKey: ["about"],
    queryFn: async () => {
      const res = await fetch("/api/about");
      if (!res.ok) throw new Error("Failed to fetch about data");
      return res.json();
    },
  });

  useEffect(() => {
    if (aboutData) console.log("About Data:", aboutData);
    if (error) console.error("About Query Error:", error);
  }, [aboutData, error]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-black/10 dark:text-white/10" />
      </div>
    );
  }

  // ── Data with fallbacks ──────────────────────────────────────────────────────
  const roleTag = aboutData?.roleTag ?? "Full Stack Developer";
  const roleDescription = aboutData?.roleDescription ?? "";
  const introParagraphs = Array.isArray(aboutData?.introParagraphs)
    ? aboutData!.introParagraphs
    : [];
  const clientFocusedText =
    aboutData?.clientFocusedText ?? "Client focused & fully committed";
  const availabilityText =
    aboutData?.availabilityText ?? "Available for freelance · Remote-friendly";
  const stats: Stat[] = Array.isArray(aboutData?.stats)
    ? aboutData!.stats!
    : [];
  const proficiencies: Proficiency[] = Array.isArray(aboutData?.proficiencies)
    ? aboutData!.proficiencies!
    : [];
  const frontendSkills: string[] = Array.isArray(aboutData?.frontendSkills)
    ? aboutData!.frontendSkills!
    : [];
  const backendSkills: string[] = Array.isArray(aboutData?.backendSkills)
    ? aboutData!.backendSkills!
    : [];
  const tools: string[] = Array.isArray(aboutData?.tools)
    ? aboutData!.tools!
    : [];
  const projects: Project[] = Array.isArray(aboutData?.projects)
    ? aboutData!.projects!
    : [];
  const quoteText = aboutData?.quoteText ?? "";
  const quoteAuthor = aboutData?.quoteAuthor ?? "";
  const mentorTitle = aboutData?.mentorTitle ?? "";
  const mentorDescription = aboutData?.mentorDescription ?? "";

  const allSkills = [...frontendSkills, ...backendSkills];

  // ────────────────────────────────────────────────────────────────────────────
  return (
    <section id="about" className="-mt-40 mb-16">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid lg:grid-cols-5 gap-y-12 lg:gap-x-16 items-start"
      >
        {/* ── LEFT COLUMN ───────────────────────────────────────────────────── */}
        <div className="lg:col-span-2 flex flex-col gap-8 lg:sticky lg:top-24 lg:self-start">
          {/* Role tag + heading */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-black/40 dark:text-white/40 border border-black/10 dark:border-white/10 rounded-full px-4 py-1.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-black/40 dark:bg-white/40 inline-block" />
              {roleTag}
            </span>

            <h2
              className="font-black tracking-tight leading-none text-black dark:text-white mb-3"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(38px, 5.5vw, 54px)",
              }}
            >
              About{" "}
              <span className="text-black/25 dark:text-white/25">Me.</span>
            </h2>

            <p
              className="text-xs text-black/40 dark:text-white/40 leading-relaxed"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Building with purpose. Shipping with precision.
            </p>
          </motion.div>

          {/* Stats */}
          {stats.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-3"
            >
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="group p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.07] dark:border-white/[0.07] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-colors duration-300"
                >
                  <p
                    className="text-xl font-black text-black dark:text-white mb-1 group-hover:scale-105 transition-transform origin-left"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {stat.num}
                  </p>
                  <p className="text-[9px] uppercase tracking-[0.18em] text-black/35 dark:text-white/35 font-bold">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          )}

          {/* Proficiency bars */}
          {proficiencies.length > 0 && (
            <motion.div variants={itemVariants} className="flex flex-col gap-3">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/30 dark:text-white/30">
                Proficiency
              </p>
              {proficiencies.map((p, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[11px] text-black/60 dark:text-white/60">
                      {p.name}
                    </span>
                    <span className="text-[10px] text-black/30 dark:text-white/30">
                      {p.pct}%
                    </span>
                  </div>
                  <div className="h-[3px] rounded-full bg-black/[0.06] dark:bg-white/[0.06] overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-black dark:bg-white"
                      initial={{ width: 0 }}
                      animate={{ width: `${p.pct}%` }}
                      transition={{
                        duration: 1,
                        delay: i * 0.08,
                        ease: "easeOut",
                      }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Divider */}
          <div className="h-px bg-black/[0.06] dark:bg-white/[0.06]" />

          {/* Availability badge */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.07] dark:border-white/[0.07] w-fit"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span className="text-xs font-medium text-black/55 dark:text-white/55">
              {availabilityText}
            </span>
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN ──────────────────────────────────────────────────── */}
        <div className="lg:col-span-3 flex flex-col gap-8">
          {/* Live status pill */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 w-fit"
          >
            <div className="relative w-2.5 h-2.5">
              <span className="absolute inset-0 rounded-full bg-black dark:bg-white animate-ping opacity-50" />
              <span className="relative block w-2.5 h-2.5 rounded-full bg-black dark:bg-white" />
            </div>
            <span className="text-sm font-medium text-black/70 dark:text-white/70">
              {clientFocusedText}
            </span>
          </motion.div>

          {/* Bio paragraphs */}
          {(roleDescription || introParagraphs.length > 0) && (
            <motion.div variants={itemVariants} className="flex flex-col gap-4">
              {roleDescription && (
                <p className="text-[15px] text-black/55 dark:text-white/55 leading-[1.85] font-light">
                  {roleDescription}
                </p>
              )}
              {introParagraphs.map((para, i) => (
                <p
                  key={i}
                  className="text-[15px] text-black/55 dark:text-white/55 leading-[1.85] font-light"
                >
                  {para}
                </p>
              ))}
            </motion.div>
          )}

          {/* Skills */}
          {allSkills.length > 0 && (
            <motion.div variants={itemVariants} className="space-y-3">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/30 dark:text-white/30">
                Core Stack
              </p>
              <div className="flex flex-wrap gap-1.5">
                {allSkills.map((skill, i) => (
                  <span
                    key={`skill-${i}`}
                    className="text-[11px] px-3 py-1.5 rounded-lg border border-black/[0.07] dark:border-white/[0.07] text-black/65 dark:text-white/75 bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.05] dark:hover:bg-white/[0.05] hover:border-black/15 dark:hover:border-white/15 transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Tools */}
          {tools.length > 0 && (
            <motion.div variants={itemVariants} className="space-y-3">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/30 dark:text-white/30">
                Tools & Workflow
              </p>
              <div className="flex flex-wrap gap-1.5">
                {tools.map((tool, i) => (
                  <span
                    key={`tool-${i}`}
                    className="text-[11px] px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10 text-black/50 dark:text-white/80 bg-black/[0.025] dark:bg-white/[0.025] hover:border-black/20 dark:hover:border-white/20 hover:text-black/70 dark:hover:text-white/70 transition-all duration-200 cursor-default tracking-wide"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Thin divider */}
          <div className="h-px bg-black/[0.06] dark:bg-white/[0.06]" />

          {/* Projects */}
          {projects.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.07] dark:border-white/[0.07] overflow-hidden"
            >
              <div className="px-5 py-3.5 border-b border-black/[0.06] dark:border-white/[0.06]">
                <p className="text-[11px] font-bold text-black/70 dark:text-white/70 uppercase tracking-[0.15em]">
                  Recent Projects
                </p>
              </div>
              <div className="divide-y divide-black/[0.05] dark:divide-white/[0.05]">
                {projects.map((project, idx) => (
                  <div
                    key={idx}
                    className="px-5 py-4 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                  >
                    <p className="text-[12px] font-semibold text-black/75 dark:text-white/75 mb-1">
                      {project.title}
                    </p>
                    <p className="text-[11px] text-black/40 dark:text-white/40 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Quote */}
          {quoteText && (
            <motion.div
              variants={itemVariants}
              className="border-l-2 border-black/20 dark:border-white/20 bg-black/[0.02] dark:bg-white/[0.02] px-5 py-4 rounded-r-2xl"
            >
              <blockquote className="text-sm text-black/50 dark:text-white/50 italic font-light leading-relaxed">
                &ldquo;{quoteText}&rdquo;
              </blockquote>
              {quoteAuthor && (
                <p className="text-right text-[10px] text-black/28 dark:text-white/28 mt-2 tracking-wide">
                  — {quoteAuthor}
                </p>
              )}
            </motion.div>
          )}

          {/* Mentor */}
          {mentorTitle && (
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.07] dark:border-white/[0.07] px-4 py-3.5"
            >
              <div className="w-9 h-9 rounded-lg bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.07] dark:border-white/[0.07] flex items-center justify-center shrink-0">
                <Users
                  size={14}
                  className="text-black/45 dark:text-white/45"
                  strokeWidth={1.5}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-black/75 dark:text-white/75 leading-none mb-1">
                  {mentorTitle}
                </p>
                <p className="text-[11px] text-black/35 dark:text-white/35 font-light">
                  {mentorDescription}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
