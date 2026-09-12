"use client";
import React, { useState } from "react";
import { Code2, Layers, User, Briefcase, Terminal, Sparkles } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { Project, categoryLabel } from "./types";
import ProjectsSkeleton from "./ProjectsSkeleton";
import ProjectsFilters from "./ProjectsFilters";
import PinnedProjectsShowcaseGSAP from "./PinnedProjectsShowcaseGSAP";

// Framer motion variants for subtle, high-end entrance animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.215, 0.61, 0.355, 1] as const,
    },
  },
};

export default function Projects() {
  const [activeTab, setActiveTab] = useState<"all" | "my" | "client">("all");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const { data: allProjects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["projects-public"],
    queryFn: async () => {
      const res = await axios.get("/api/projects");
      return res.data;
    },
  });

  // Filter featured projects (currently working + featured)
  const featuredList = allProjects.filter((p) => p.currentlyWorking || p.featured);
  const displayFeaturedList = featuredList.length > 0 ? featuredList : allProjects.slice(0, 3);

  const filteredProjects = allProjects.filter((p) => {
    if (activeTab === "my" && p.projectType !== "MY") return false;
    if (activeTab === "client" && p.projectType !== "CLIENT") return false;
    if (activeCategory !== "all" && p.category !== activeCategory) return false;
    return true;
  });

  const availableCategories = Object.keys(categoryLabel).filter((catKey) =>
    allProjects.some((p) => p.category === catKey)
  );

  const tabs: {
    id: "all" | "my" | "client";
    label: string;
    icon: React.ElementType;
    count: number;
  }[] = [
    {
      id: "all",
      label: "All Projects",
      icon: Layers,
      count: allProjects.length,
    },
    {
      id: "my",
      label: "Personal",
      icon: User,
      count: allProjects.filter((p) => p.projectType === "MY").length,
    },
    {
      id: "client",
      label: "Client Projects",
      icon: Briefcase,
      count: allProjects.filter((p) => p.projectType === "CLIENT").length,
    },
  ];

  return (
    <section id="projects" className="scroll-mt-24 w-full relative">
      {/* Container aligned with max-w-7xl */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6">
        
        {/* Redesigned Premium Projects Header Area */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="relative mb-8 sm:mb-10"
        >
          {/* Subtle Editorial Background Number "01" */}
          <div
            aria-hidden="true"
            className="absolute -top-6 -left-3 sm:-top-8 sm:-left-4 select-none pointer-events-none font-mono font-black text-6xl sm:text-8xl text-slate-100/70 z-0 tracking-tighter"
          >
            01
          </div>

          {/* Two-Column Desktop Header Composition */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-10 pb-6 border-b border-slate-200/80">
            {/* LEFT COLUMN: Eyebrow, Heading, Description */}
            <div className="flex-1 max-w-3xl">
              {/* 1. EYEBROW */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-orange-500/5 border border-orange-500/20 mb-3 sm:mb-4"
              >
                <Terminal className="w-3.5 h-3.5 text-[#FF6014]" />
                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#FF6014]">
                  01 — SELECTED WORK
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6014] animate-pulse" />
              </motion.div>

              {/* 2. MAIN HEADING */}
              <motion.h2
                variants={itemVariants}
                className="text-3xl sm:text-4xl lg:text-[46px] font-black text-slate-900 tracking-tight leading-[1.15] mb-3 sm:mb-4"
              >
                Featured <span className="text-[#FF6014]">Projects</span>
              </motion.h2>

              {/* 4. DESCRIPTION */}
              <motion.p
                variants={itemVariants}
                className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl"
              >
                A curated collection of production-ready applications, SaaS platforms, and real-world digital products engineered for performance, scale, and user experience.
              </motion.p>
            </div>

            {/* RIGHT COLUMN: 5. TECHNICAL METRIC / PROJECT COUNT BADGE */}
            <motion.div
              variants={itemVariants}
              className="shrink-0 flex items-center md:flex-col md:items-end justify-between md:justify-end gap-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200/90 shadow-2xs md:max-w-xs"
            >
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                  {String(allProjects.length).padStart(2, "0")}
                </span>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] sm:text-xs font-bold text-[#FF6014] tracking-widest uppercase">
                    PROJECTS
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 font-semibold tracking-wider uppercase">
                    RELEASES
                  </span>
                </div>
              </div>

              <div className="h-8 w-px bg-slate-200 md:w-full md:h-px md:my-1" />

              <div className="flex items-center gap-1.5 text-[11px] font-mono font-medium text-slate-500">
                <Sparkles className="w-3.5 h-3.5 text-[#FF6014]" />
                <span>SYS.PORTFOLIO / V2.4</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {isLoading ? (
          <ProjectsSkeleton />
        ) : (
          <div className="space-y-8 sm:space-y-10 w-full">
            <ProjectsFilters
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              allProjects={allProjects}
              tabs={tabs}
              availableCategories={availableCategories}
              filteredProjects={filteredProjects}
            />

            {/* Full-Screen Editorial Pinned GSAP Showcase */}
            {filteredProjects.length > 0 ? (
              <PinnedProjectsShowcaseGSAP projects={filteredProjects} />
            ) : (
              <div className="text-center py-20 rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 w-full">
                <p className="text-sm text-slate-500 uppercase tracking-wider font-bold">
                  No projects available in this category at the moment.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

