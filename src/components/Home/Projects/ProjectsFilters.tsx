"use client";
import React from "react";
import { Project, categoryLabel } from "./types";

interface FilterTab {
  id: "all" | "my" | "client";
  label: string;
  icon: React.ElementType;
  count: number;
}

interface ProjectsFiltersProps {
  activeTab: "all" | "my" | "client";
  setActiveTab: (tab: "all" | "my" | "client") => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  allProjects: Project[];
  tabs: FilterTab[];
  availableCategories: string[];
  filteredProjects: Project[];
}

export default function ProjectsFilters({
  activeTab,
  setActiveTab,
  activeCategory,
  setActiveCategory,
  allProjects,
  tabs,
  availableCategories,
  filteredProjects,
}: ProjectsFiltersProps) {
  return (
    <>
      {/* Filter tabs + count */}
      <div className="flex items-center justify-between mb-6 sm:mb-8 gap-4 flex-wrap">
        <div className="flex items-center gap-1 p-1 bg-card/40 border border-border rounded-2xl overflow-x-auto">
          {tabs.map(({ id, label, icon: Icon, count }) => (
            <button
              key={id}
              onClick={() => {
                setActiveTab(id);
                setActiveCategory("all");
              }}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-[11px] font-bold transition-all duration-200 whitespace-nowrap cursor-pointer
                ${
                  activeTab === id
                    ? "bg-white text-black shadow-lg"
                    : "text-foreground/40 hover:text-foreground/65"
                }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">
                {id === "all" ? "All" : id === "my" ? "Personal" : "Client"}
              </span>
              <span
                className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold
                  ${activeTab === id ? "bg-black/10 text-black/55" : "bg-card/60 text-foreground/40"}`}
              >
                {count}
              </span>
            </button>
          ))}
        </div>
        <span className="text-[11px] text-foreground/35 font-medium hidden sm:block">
          {filteredProjects.length} project
          {filteredProjects.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Dynamic Category Chips Row */}
      {availableCategories.length > 0 && (
        <div className="flex md:flex-wrap items-center gap-2 mb-8 p-1.5 bg-foreground/[0.02] dark:bg-white/[0.02] border border-border/50 rounded-2xl max-w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] whitespace-nowrap">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-3 py-1.5 rounded-xl text-[10px] sm:text-xs font-bold transition-all border cursor-pointer shrink-0 ${
              activeCategory === "all"
                ? "bg-foreground text-background border-transparent"
                : "bg-transparent text-foreground/50 border-border hover:text-foreground/75"
            }`}
          >
            All Categories ({allProjects.length})
          </button>
          {availableCategories.map((key) => {
            const count = allProjects.filter(p => p.category === key).length;
            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-3 py-1.5 rounded-xl text-[10px] sm:text-xs font-bold transition-all border cursor-pointer shrink-0 ${
                  activeCategory === key
                    ? "bg-foreground text-background border-transparent"
                    : "bg-transparent text-foreground/50 border-border hover:text-foreground/75"
                }`}
              >
                {categoryLabel[key] || key} ({count})
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}
