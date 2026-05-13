"use client";

import React, { useState } from "react";
import {
  ExternalLink,
  Star,
  Briefcase,
  User,
  Layers,
  GitBranch,
  ArrowUpRight,
  Code2,
  Sparkles,
  Loader2,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  demoLink: string;
  githubLink?: string;
  category: string;
  year: string;
  featured: boolean;
  projectType: string;
  client?: string;
  tech: string[];
}


const categoryLabel: Record<string, string> = {
  FULL_STACK: "Full-Stack",
  AI_ML: "AI/ML",
  FRONTEND: "Frontend",
  E_COMMERCE: "E-Commerce",
  HEALTHCARE: "Healthcare",
  REAL_ESTATE: "Real Estate",
};

const categoryColor: Record<string, string> = {
  FULL_STACK: "from-blue-500/20 to-cyan-500/10 border-blue-500/20 text-blue-300/80",
  AI_ML: "from-violet-500/20 to-purple-500/10 border-violet-500/20 text-violet-300/80",
  FRONTEND: "from-pink-500/20 to-rose-500/10 border-pink-500/20 text-pink-300/80",
  E_COMMERCE: "from-amber-500/20 to-orange-500/10 border-amber-500/20 text-amber-300/80",
  HEALTHCARE: "from-emerald-500/20 to-teal-500/10 border-emerald-500/20 text-emerald-300/80",
  REAL_ESTATE: "from-sky-500/20 to-blue-500/10 border-sky-500/20 text-sky-300/80",
};

const categoryBadge: Record<string, string> = {
  FULL_STACK: "bg-blue-500/10 border-blue-500/25 text-blue-300/90",
  AI_ML: "bg-violet-500/10 border-violet-500/25 text-violet-300/90",
  FRONTEND: "bg-pink-500/10 border-pink-500/25 text-pink-300/90",
  E_COMMERCE: "bg-amber-500/10 border-amber-500/25 text-amber-300/90",
  HEALTHCARE: "bg-emerald-500/10 border-emerald-500/25 text-emerald-300/90",
  REAL_ESTATE: "bg-sky-500/10 border-sky-500/25 text-sky-300/90",
};


function Pill({ label }: { label: string }) {
  return (
    <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-white/[0.05] border border-white/[0.09] rounded-lg text-white/45">
      {label}
    </span>
  );
}

function IconLink({
  href,
  icon: Icon,
  label,
  filled = false,
  small = false,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  filled?: boolean;
  small?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 font-semibold transition-all duration-200 active:scale-95 ${
        small ? "px-3.5 py-2 text-[11px] rounded-xl" : "px-5 py-2.5 text-xs rounded-xl"
      } ${
        filled
          ? "bg-white text-black hover:bg-white/90 shadow-lg shadow-white/10"
          : "border border-white/15 text-white/55 hover:border-white/35 hover:text-white bg-white/[0.03]"
      }`}
    >
      <Icon className={small ? "w-3 h-3" : "w-3.5 h-3.5"} />
      {label}
    </a>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const accent = categoryColor[project.category] ?? "from-white/10 to-white/5 border-white/10 text-white/50";
  const badge = categoryBadge[project.category] ?? "bg-white/5 border-white/10 text-white/50";

  return (
    <div className="group relative flex flex-col rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-white/[0.15] transition-all duration-400 overflow-hidden">
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-[1.05] transition-all duration-600 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest border rounded-lg backdrop-blur-sm ${badge}`}>
            {categoryLabel[project.category] || project.category}
          </span>
          <span className="px-2.5 py-1 text-[9px] font-bold text-white/40 bg-black/40 backdrop-blur-sm border border-white/[0.08] rounded-lg">
            {project.year}
          </span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 bg-white text-black text-xs font-bold rounded-xl shadow-2xl hover:bg-white/90 transition-colors"
          >
            <ExternalLink className="w-3 h-3" /> Live
          </a>
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 bg-black/80 text-white text-xs font-bold rounded-xl border border-white/20 backdrop-blur-sm hover:bg-black/60 transition-colors"
            >
              <GitBranch className="w-3 h-3" /> Code
            </a>
          )}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className={`h-px w-full bg-gradient-to-r ${accent.split(" ")[0]} ${accent.split(" ")[1]} mb-4 rounded-full opacity-60`} />
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h4 className="text-[15px] font-bold text-white leading-snug">{project.title}</h4>
          <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 flex-shrink-0 mt-0.5" />
        </div>
        <p className="text-[11px] font-semibold text-white/35 mb-2 uppercase tracking-wider">
          {project.tagline}
          {project.client && ` ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â· ${project.client}`}
        </p>
        <p className="text-[12px] text-white/45 leading-relaxed mb-4 line-clamp-2 flex-1">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.slice(0, 3).map((t) => <Pill key={t} label={t} />)}
          {project.tech.length > 3 && <Pill label={`+${project.tech.length - 3}`} />}
        </div>
        <div className="flex gap-2">
          <IconLink href={project.demoLink} icon={ExternalLink} label="Live Demo" filled small />
          {project.githubLink && <IconLink href={project.githubLink} icon={GitBranch} label="Source" small />}
        </div>
      </div>
    </div>
  );
}


export default function Projects() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const { data: allProjects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["projects-public"],
    queryFn: async () => {
      const res = await axios.get("/api/projects");
      return res.data;
    },
  });

  const featuredProject = allProjects.find((p) => p.featured) || allProjects[0];

  const filteredProjects = allProjects.filter((p) => {
    if (activeTab === "all") return true;
    if (activeTab === "my") return p.projectType === "MY";
    if (activeTab === "client") return p.projectType === "CLIENT";
    return true;
  });

  const tabs = [
    { id: "all", label: "All Projects", icon: Layers, count: allProjects.length },
    { id: "my", label: "Personal", icon: User, count: allProjects.filter(p => p.projectType === "MY").length },
    { id: "client", label: "Client Work", icon: Briefcase, count: allProjects.filter(p => p.projectType === "CLIENT").length },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-white/20" />
      </div>
    );
  }

  return (
    <section id="projects" className="mb-16 sm:mb-20 scroll-mt-24 px-4 sm:px-6 lg:px-0">
      <div className="flex items-end gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Code2 className="w-3.5 h-3.5 text-foreground/40" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-foreground/40">Selected Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-none">
            Projects<span className="text-foreground/25">.</span>
          </h2>
        </div>
        <div className="flex-1 mb-2">
          <div className="h-px bg-gradient-to-r from-white/10 to-transparent" />
        </div>
        <span className="text-xs font-mono text-white/20 mb-2 hidden sm:block">&lt;portfolio /&gt;</span>
      </div>

      {featuredProject && (
        <div className="relative mb-12 rounded-[2rem] overflow-hidden border border-white/[0.09] group cursor-pointer">
          <div className="absolute inset-0">
            <img
              src={featuredProject.image}
              alt={featuredProject.title}
              className="w-full h-full object-cover opacity-25 group-hover:opacity-35 group-hover:scale-[1.03] transition-all duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div
              className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(255,255,255,1) 39px,rgba(255,255,255,1) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(255,255,255,1) 39px,rgba(255,255,255,1) 40px)",
              }}
            />
            {/* wesdf */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="relative z-10 p-8 sm:p-12 lg:p-16 min-h-[400px] flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/[0.12] bg-white/[0.05] backdrop-blur-md">
                <Star className="w-3 h-3 text-amber-400/90 fill-amber-400/90" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/55">Featured Project</span>
                <Sparkles className="w-3 h-3 text-white/30" />
              </div>
              <span className={`px-3.5 py-2 text-[10px] font-bold uppercase tracking-widest border rounded-xl backdrop-blur-sm ${categoryBadge[featuredProject.category] || "bg-white/5"}`}>
                {categoryLabel[featuredProject.category] || featuredProject.category}
              </span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mt-12">
              <div className="max-w-2xl">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/30 mb-3">{featuredProject.tagline}</p>
                <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[0.95] mb-5">{featuredProject.title}</h3>
                <p className="text-sm sm:text-[15px] text-white/50 leading-relaxed mb-8 max-w-xl">{featuredProject.description}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {featuredProject.tech.map((t) => (
                    <span key={t} className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider bg-white/[0.06] border border-white/[0.1] rounded-xl text-white/50 backdrop-blur-sm">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <IconLink href={featuredProject.demoLink} icon={ExternalLink} label="View Live" filled />
                  {featuredProject.githubLink && <IconLink href={featuredProject.githubLink} icon={GitBranch} label="Source Code" />}
                </div>
              </div>

              <div className="flex flex-row lg:flex-col gap-3 flex-shrink-0">
                {[
                  { label: "Year", value: featuredProject.year },
                  { label: "Stack", value: `${featuredProject.tech.length} libs` },
                  { label: "Type", value: featuredProject.projectType === "CLIENT" ? "Client" : "Personal" },
                ].map(({ label, value }) => (
                  <div key={label} className="px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl backdrop-blur-sm text-center min-w-[80px]">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-0.5">{label}</div>
                    <div className="text-sm font-bold text-white/70">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-1 p-1 bg-white/[0.03] border border-white/[0.07] rounded-2xl">
          {tabs.map(({ id, label, icon: Icon, count }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[11px] font-bold transition-all duration-200 ${
                activeTab === id ? "bg-white text-black shadow-lg" : "text-white/40 hover:text-white/65"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
              <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${activeTab === id ? "bg-black/10 text-black/55" : "bg-white/[0.06] text-foreground/40"}`}>
                {count}
              </span>
            </button>
          ))}
        </div>
        <span className="text-[11px] text-foreground/40 font-medium hidden sm:block">{filteredProjects.length} projects</span>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-20 rounded-2xl border border-dashed border-white/[0.07]">
          <p className="text-xs text-foreground/40 uppercase tracking-[0.2em] font-semibold">No projects to display</p>
        </div>
      )}
    </section>
  );
}
