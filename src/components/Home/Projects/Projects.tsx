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

  // Find the project currently marked as active / currently working
  const currentlyWorkingProject = allProjects.find((p) => p.currentlyWorking);
  
  // Use currently working project on top, fallback to featured project, then first project
  const topProject = currentlyWorkingProject ?? allProjects.find((p) => p.featured) ?? allProjects[0];

  const filteredProjects = allProjects.filter((p) => {
    // Hide the currently working project from the main grid if it is displayed on top
    if (currentlyWorkingProject && p.id === currentlyWorkingProject.id) return false;

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
      label: "All Project",
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
      label: "Client Project",
      icon: Briefcase,
      count: allProjects.filter((p) => p.projectType === "CLIENT").length,
    },
  ];

  return (
    <section id="projects" className="mb-16 sm:mb-20 scroll-mt-24">
      {/* Centered on mobile title block */}
      <div className="flex flex-col items-center justify-center text-center sm:flex-row sm:items-end sm:justify-start sm:text-left gap-4 sm:gap-6 mb-8">
        <div className="flex flex-col items-center sm:items-start">
          <div className="flex items-center gap-2 mb-3">
            <Code2 className="w-3.5 h-3.5 text-foreground/40" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-foreground/40">
              Selected Work
            </span>
          </div>

          <h2 className="text-[clamp(28px,5vw,48px)] text-2xl md:text-4xl font-black text-foreground tracking-tight leading-none">
            <span className="text-foreground">Proje</span>
            <span className="text-foreground/25">cts</span>
          </h2>
        </div>
        <div className="flex-1 mb-2 hidden sm:block">
          <div className="h-px bg-gradient-to-r from-border to-transparent" />
        </div>
        <span className="text-xs font-mono text-foreground/20 mb-2 hidden sm:block">
          &lt;portfolio /&gt;
        </span>
      </div>

      <p className="text-xs sm:text-sm text-foreground/50 leading-relaxed mb-10 max-w-2xl text-center sm:text-left mx-auto sm:mx-0">
        A curated showcase of production-ready full-stack applications, advanced SaaS platforms, AI/ML integrations, and custom business portals built with modern architectures.
      </p>

      {isLoading ? (
        <ProjectsSkeleton />
      ) : (
        <>
          {/* Top Hero Project (Currently Working / Featured) */}
          {topProject && <FeaturedCard project={topProject} />}

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

          {/* Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 rounded-2xl border border-dashed border-black/10 dark:border-white/10 w-full">
              <p className="text-xs text-foreground/40 uppercase tracking-[0.2em] font-semibold">
                No projects to display in this category
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );
}
