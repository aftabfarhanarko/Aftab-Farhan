"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

interface Stat {
  num: string;
  label: string;
}

interface Project {
  title: string;
  description: string;
}

interface AboutData {
  roleTag?: string;
  roleDescription?: string;
  introParagraphs?: string[];
  clientFocusedText?: string;
  stats?: Stat[];
  frontendSkills?: string[];
  backendSkills?: string[];
  tools?: string[];
  projects?: Project[];
  quoteText?: string;
  quoteAuthor?: string;
  mentorTitle?: string;
  mentorDescription?: string;
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
    console.log("About component mounted");
    if (aboutData) console.log("About Data:", aboutData);
    if (error) console.error("About Query Error:", error);
  }, [aboutData, error]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-black/10 dark:text-white/10" />
      </div>
    );
  }

  const roleTag = aboutData?.roleTag || "Full Stack Developer";
  const roleDescription = aboutData?.roleDescription || "";
  const introParagraphs = Array.isArray(aboutData?.introParagraphs)
    ? aboutData.introParagraphs
    : [];
  const clientFocusedText =
    aboutData?.clientFocusedText || "Client focused & fully committed";
  const stats = Array.isArray(aboutData?.stats) ? aboutData.stats : [];
  const frontendSkills = Array.isArray(aboutData?.frontendSkills)
    ? aboutData.frontendSkills
    : [];
  const backendSkills = Array.isArray(aboutData?.backendSkills)
    ? aboutData.backendSkills
    : [];
  const tools = Array.isArray(aboutData?.tools) ? aboutData.tools : [];
  const projects = Array.isArray(aboutData?.projects) ? aboutData.projects : [];
  const quoteText = aboutData?.quoteText || "";
  const quoteAuthor = aboutData?.quoteAuthor || "";
  const mentorTitle = aboutData?.mentorTitle || "";
  const mentorDescription = aboutData?.mentorDescription || "";

  return (
    <section id="about" className=" -mt-40 mb-20">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid lg:grid-cols-5 gap-y-12 lg:gap-x-14 items-start"
      >
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 flex flex-col gap-12">
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-black/40 dark:text-white/40 border border-black/10 dark:border-white/10 rounded-full px-4 py-1.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-black/40 dark:bg-white/40 inline-block" />
              {roleTag}
            </span>
            <h2
              className="font-black tracking-tight leading-none text-black dark:text-white mb-8"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(40px, 6vw, 58px)",
              }}
            >
              About{" "}
              <span className="text-black/30 dark:text-white/30">Me.</span>
            </h2>
          </motion.div>

       
          {stats.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4 mt-4"
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group p-5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.07] dark:border-white/[0.07] hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300"
                >
                  <p className="text-2xl font-black text-black dark:text-white mb-1 group-hover:scale-110 transition-transform origin-left">
                    {stat.num}
                  </p>
                  <p className="text-[10px] uppercase tracking-widest text-black/40 dark:text-white/40 font-bold">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-3 flex flex-col gap-10 sm:gap-14">
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 p-4 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 w-fit"
          >
            <div className="relative">
              <div className="w-2.5 h-2.5 rounded-full bg-black dark:bg-white" />
              <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-black dark:bg-white animate-ping" />
            </div>
            <span className="text-sm font-medium text-black/70 dark:text-white/70">
              {clientFocusedText}
            </span>
          </motion.div>
          {roleDescription && (
            <p className="text-base sm:text-lg text-black/60 dark:text-white/60 leading-relaxed font-light">
              {roleDescription}
            </p>
          )}

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 gap-8"
          >
            {(frontendSkills.length > 0 || backendSkills.length > 0) && (
              <div className="space-y-4">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-black/30 dark:text-white/30">
                  Core Stack
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {[...frontendSkills, ...backendSkills].map((skill, i) => (
                    <span
                      key={`${skill}-${i}`}
                      className="text-[11px] px-3 py-1.5 rounded-lg border border-black/5 dark:border-white/5 text-black/70 dark:text-white/80 bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {tools.length > 0 && (
              <div className="space-y-4">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-black/30 dark:text-white/30">
                  Tools & Workflow
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {tools.map((tech, i) => (
                    <span
                      key={`${tech}-${i}`}
                      className="text-[11px] px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10 text-black/50 dark:text-white/90 bg-black/[0.03] dark:bg-white/[0.03] hover:border-black/20 dark:hover:border-white/20 hover:text-black/70 dark:hover:text-white/70 transition-colors cursor-default tracking-wide"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {projects.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.07] dark:border-white/[0.07] px-6 py-5"
            >
              <p className="text-sm font-bold text-black dark:text-white mb-3">
                Recent Client Projects Summary
              </p>
              <div className="space-y-3">
                {projects.map((project, idx) => (
                  <div key={idx}>
                    <p className="text-xs font-semibold text-black/70 dark:text-white/70">
                      {project.title}
                    </p>
                    <p className="text-[11px] text-black/45 dark:text-white/45 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {quoteText && (
            <motion.div
              variants={itemVariants}
              className="rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.07] dark:border-white/[0.07] border-l-2 border-l-black/20 dark:border-l-white/20 px-6 py-5"
              style={{ borderRadius: "0 16px 16px 0" }}
            >
              <blockquote className="text-sm text-black/55 dark:text-white/55 italic font-light leading-relaxed">
                &ldquo;{quoteText}&rdquo;
              </blockquote>
              {quoteAuthor && (
                <p className="text-right text-[11px] text-black/30 dark:text-white/30 mt-2">
                  — {quoteAuthor}
                </p>
              )}
            </motion.div>
          )}

          {mentorTitle && (
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.07] dark:border-white/[0.07] px-4 py-3.5"
            >
              <div className="w-9 h-9 rounded-lg bg-black/[0.05] dark:bg-white/[0.05] border border-black/[0.07] dark:border-white/[0.07] flex items-center justify-center shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-black/50 dark:text-white/50"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-black/80 dark:text-white/80 leading-none mb-1">
                  {mentorTitle}
                </p>
                <p className="text-xs text-black/35 dark:text-white/35 font-light">
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
