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
        <div className="flex items-center gap-1 p-1.5 bg-slate-100 border border-slate-200 rounded-xl overflow-x-auto">
          {tabs.map(({ id, label, icon: Icon, count }) => (
            <button
              key={id}
              onClick={() => {
                setActiveTab(id);
                setActiveCategory("all");
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                activeTab === id
                  ? "bg-[#FF6014] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">
                {id === "all" ? "All" : id === "my" ? "Personal" : "Client"}
              </span>
              <span
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  activeTab === id ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
                }`}
              >
                {count}
              </span>
            </button>
          ))}
        </div>
        <span className="text-xs text-slate-500 font-semibold hidden sm:block">
          {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Dynamic Category Chips Row */}
      {availableCategories.length > 0 && (
        <div className="flex md:flex-wrap items-center gap-2 mb-8 p-1.5 bg-slate-50 border border-slate-200 rounded-xl max-w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] whitespace-nowrap">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all border cursor-pointer shrink-0 ${
              activeCategory === "all"
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-600 border-slate-200 hover:text-slate-900 hover:border-slate-300"
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
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all border cursor-pointer shrink-0 ${
                  activeCategory === key
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-600 border-slate-200 hover:text-slate-900 hover:border-slate-300"
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
