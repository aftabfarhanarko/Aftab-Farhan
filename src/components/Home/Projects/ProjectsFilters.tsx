"use client";
import React from "react";
import { motion } from "framer-motion";
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
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="space-y-4 w-full"
    >
      {/* 6. Primary Filter Tabs - Premium Segmented Control */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="p-1.5 bg-slate-100/90 border border-slate-200/90 rounded-2xl inline-flex items-center gap-1.5 max-w-full overflow-x-auto shadow-2xs">
          {tabs.map(({ id, label, icon: Icon, count }) => (
            <button
              key={id}
              onClick={() => {
                setActiveTab(id);
                setActiveCategory("all");
              }}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap cursor-pointer select-none ${
                activeTab === id
                  ? "bg-[#FF6014] text-white shadow-xs scale-[1.01]"
                  : "text-slate-700 hover:text-slate-900 hover:bg-white/80"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${activeTab === id ? "text-white" : "text-[#FF6014]"}`} />
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">
                {id === "all" ? "All" : id === "my" ? "Personal" : "Client"}
              </span>
              <span
                className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold transition-colors ${
                  activeTab === id
                    ? "bg-white/20 text-white"
                    : "bg-slate-200/90 text-slate-700"
                }`}
              >
                {count}
              </span>
            </button>
          ))}
        </div>

        {/* Live Filter Match Counter Badge */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono font-semibold text-slate-700 bg-slate-50/90 border border-slate-200/90 px-3.5 py-1.5 rounded-full shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-[#FF6014] animate-pulse" />
          <span>
            SHOWING {filteredProjects.length} / {allProjects.length} RELEASES
          </span>
        </div>
      </div>

      {/* 7. Dynamic Secondary Category Chips Row */}
      {availableCategories.length > 0 && (
        <div className="flex items-center gap-1.5 p-1 bg-slate-50/80 border border-slate-200/80 rounded-2xl max-w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] whitespace-nowrap">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 border cursor-pointer shrink-0 select-none ${
              activeCategory === "all"
                ? "bg-slate-900 text-white border-slate-900 shadow-2xs"
                : "bg-white text-slate-700 border-slate-200/90 hover:text-[#FF6014] hover:border-orange-300"
            }`}
          >
            All Categories ({allProjects.length})
          </button>
          {availableCategories.map((key) => {
            const count = allProjects.filter((p) => p.category === key).length;
            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 border cursor-pointer shrink-0 select-none ${
                  activeCategory === key
                    ? "bg-slate-900 text-white border-slate-900 shadow-2xs"
                    : "bg-white text-slate-700 border-slate-200/90 hover:text-[#FF6014] hover:border-orange-300"
                }`}
              >
                {categoryLabel[key] || key} ({count})
              </button>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}

