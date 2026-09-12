"use client";
import React, { useState } from "react";
import { Code2, Layers, User, Briefcase } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Project, categoryLabel } from "./types";
import ProjectCard from "./ProjectCard";
import FeaturedCard from "./FeaturedCard";
import ProjectsSkeleton from "./ProjectsSkeleton";
import ProjectsFilters from "./ProjectsFilters";

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
  const featuredIds = new Set(displayFeaturedList.map((p) => p.id));

  const filteredProjects = allProjects.filter((p) => {
    if (activeTab === "my" && p.projectType !== "MY") return false;
    if (activeTab === "client" && p.projectType !== "CLIENT") return false;
    if (activeCategory !== "all" && p.category !== activeCategory) return false;
    return true;
  });

  const availableCategories = Object.keys(categoryLabel).filter(catKey => 
    allProjects.some(p => p.category === catKey)
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
    <section id="projects" className="mb-20 sm:mb-24 scroll-mt-24">
      {/* Title block */}
      <div className="flex flex-col items-center justify-center text-center sm:flex-row sm:items-end sm:justify-start sm:text-left gap-4 sm:gap-6 mb-6">
        <div className="flex flex-col items-center sm:items-start">
          <div className="flex items-center gap-2 mb-2">
            <Code2 className="w-4 h-4 text-[#FF6014]" />
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#FF6014]">
              01 — SELECTED WORK
            </span>
          </div>

          <h2 className="text-[32px] sm:text-[38px] lg:text-[42px] font-black text-slate-900 tracking-tight leading-tight">
            Featured <span className="text-[#FF6014]">Projects</span>
          </h2>
        </div>
        <div className="flex-1 mb-3 hidden sm:block">
          <div className="h-px bg-slate-200/90" />
        </div>
      </div>

      <p className="text-base sm:text-lg text-slate-800 leading-[1.7] mb-10 max-w-2xl text-center sm:text-left mx-auto sm:mx-0 font-medium">
        A curated collection of production-ready applications, SaaS platforms, and real-world digital products.
      </p>

      {isLoading ? (
        <ProjectsSkeleton />
      ) : (
        <>
          {/* Alternating Editorial Showcase for Featured Projects */}
          {displayFeaturedList.length > 0 && (
            <div className="mb-14 sm:mb-20 space-y-12 sm:space-y-16">
              {displayFeaturedList.map((project, idx) => (
                <FeaturedCard key={project.id} project={project} index={idx} />
              ))}
            </div>
          )}

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

          {/* Curated 2-Column Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 w-full">
              <p className="text-sm text-slate-500 uppercase tracking-wider font-bold">
                No projects available in this category at the moment.
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );
}
