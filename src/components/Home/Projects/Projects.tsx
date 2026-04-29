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
} from "lucide-react";

// ── Data ────────────────────────────────────────────────────────────────────
const projects = {
  my: [
    {
      id: 1,
      title: "DevFlow",
      tagline: "Real-time developer collaboration",
      description:
        "A comprehensive developer workflow management platform with real-time collaboration features and integrated CI/CD pipelines.",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80&auto=format&fit=crop",
      tech: ["React", "TypeScript", "Node.js", "PostgreSQL", "Socket.io"],
      category: "Full-Stack",
      demoLink: "#",
      githubLink: "#",
      featured: true,
      year: "2024",
    },
    {
      id: 2,
      title: "TaskFlow AI",
      tagline: "Intelligent task prioritization",
      description:
        "AI-powered task management with smart prioritization and natural language processing for effortless productivity.",
      image:
        "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80&auto=format&fit=crop",
      tech: ["Next.js", "OpenAI", "Prisma", "Tailwind CSS", "Redis"],
      category: "AI/ML",
      demoLink: "#",
      githubLink: "#",
      featured: false,
      year: "2024",
    },
    {
      id: 3,
      title: "Portfolio 3D",
      tagline: "WebGL-powered interactive portfolio",
      description:
        "Interactive 3D portfolio with WebGL animations and smooth scrolling experiences built with Three.js.",
      image:
        "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80&auto=format&fit=crop",
      tech: ["Three.js", "React", "GSAP", "Framer Motion", "Vite"],
      category: "Frontend",
      demoLink: "#",
      githubLink: "#",
      featured: false,
      year: "2023",
    },
  ],
  client: [
    {
      id: 4,
      title: "E-Commerce Platform",
      tagline: "End-to-end retail solution",
      description:
        "Full-featured e-commerce solution with inventory management, Stripe payment integration, and live analytics dashboard.",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80&auto=format&fit=crop",
      tech: ["Next.js", "Stripe", "MongoDB", "AWS S3", "Tailwind CSS"],
      category: "E-Commerce",
      client: "Fashion Retail Co.",
      demoLink: "#",
      githubLink: undefined,
      featured: false,
      year: "2024",
    },
    {
      id: 5,
      title: "Healthcare System",
      tagline: "Multi-location patient management",
      description:
        "Patient management and appointment scheduling system for a multi-location healthcare provider with HIPAA compliance.",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80&auto=format&fit=crop",
      tech: ["React", "Express.js", "PostgreSQL", "JWT", "Docker"],
      category: "Healthcare",
      client: "MediCare Group",
      demoLink: "#",
      githubLink: undefined,
      featured: false,
      year: "2023",
    },
    {
      id: 6,
      title: "Real Estate Portal",
      tagline: "Smart property discovery platform",
      description:
        "Property listing platform with advanced search filters, PostGIS geo-queries, and virtual tour integration.",
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80&auto=format&fit=crop",
      tech: ["Next.js", "GraphQL", "PostGIS", "Mapbox", "Node.js"],
      category: "Real Estate",
      client: "HomeFinders Inc.",
      demoLink: "#",
      githubLink: undefined,
      featured: false,
      year: "2023",
    },
  ],
};

type Tab = "all" | "my" | "client";
const allProjects = [...projects.my, ...projects.client];
const featuredProject = allProjects.find((p) => p.featured) ?? allProjects[0];

// ── category accent colors ───────────────────────────────────────────────────
const categoryColor: Record<string, string> = {
  "Full-Stack": "from-blue-500/20 to-cyan-500/10 border-blue-500/20 text-blue-300/80",
  "AI/ML": "from-violet-500/20 to-purple-500/10 border-violet-500/20 text-violet-300/80",
  Frontend: "from-pink-500/20 to-rose-500/10 border-pink-500/20 text-pink-300/80",
  "E-Commerce": "from-amber-500/20 to-orange-500/10 border-amber-500/20 text-amber-300/80",
  Healthcare: "from-emerald-500/20 to-teal-500/10 border-emerald-500/20 text-emerald-300/80",
  "Real Estate": "from-sky-500/20 to-blue-500/10 border-sky-500/20 text-sky-300/80",
};

const categoryBadge: Record<string, string> = {
  "Full-Stack": "bg-blue-500/10 border-blue-500/25 text-blue-300/90",
  "AI/ML": "bg-violet-500/10 border-violet-500/25 text-violet-300/90",
  Frontend: "bg-pink-500/10 border-pink-500/25 text-pink-300/90",
  "E-Commerce": "bg-amber-500/10 border-amber-500/25 text-amber-300/90",
  Healthcare: "bg-emerald-500/10 border-emerald-500/25 text-emerald-300/90",
  "Real Estate": "bg-sky-500/10 border-sky-500/25 text-sky-300/90",
};

// ── pill ─────────────────────────────────────────────────────────────────────
function Pill({ label }: { label: string }) {
  return (
    <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-white/[0.05] border border-white/[0.09] rounded-lg text-white/45">
      {label}
    </span>
  );
}

// ── icon link ────────────────────────────────────────────────────────────────
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

// ── project card ─────────────────────────────────────────────────────────────
function ProjectCard({ project }: { project: (typeof allProjects)[0] }) {
  const accent = categoryColor[project.category] ?? "from-white/10 to-white/5 border-white/10 text-white/50";
  const badge = categoryBadge[project.category] ?? "bg-white/5 border-white/10 text-white/50";

  return (
    <div className="group relative flex flex-col rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-white/[0.15] transition-all duration-400 overflow-hidden">
      {/* image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-[1.05] transition-all duration-600 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        {/* top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest border rounded-lg backdrop-blur-sm ${badge}`}>
            {project.category}
          </span>
          <span className="px-2.5 py-1 text-[9px] font-bold text-white/40 bg-black/40 backdrop-blur-sm border border-white/[0.08] rounded-lg">
            {project.year}
          </span>
        </div>
        {/* hover overlay with quick links */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a href={project.demoLink} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 bg-white text-black text-xs font-bold rounded-xl shadow-2xl hover:bg-white/90 transition-colors">
            <ExternalLink className="w-3 h-3" /> Live
          </a>
          {project.githubLink && (
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 bg-black/80 text-white text-xs font-bold rounded-xl border border-white/20 backdrop-blur-sm hover:bg-black/60 transition-colors">
              <GitBranch className="w-3 h-3" /> Code
            </a>
          )}
        </div>
      </div>

      {/* content */}
      <div className="flex flex-col flex-1 p-5">
        {/* gradient accent line */}
        <div className={`h-px w-full bg-gradient-to-r ${accent.split(" ")[0]} ${accent.split(" ")[1]} mb-4 rounded-full opacity-60`} />

        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h4 className="text-[15px] font-bold text-white leading-snug">{project.title}</h4>
          <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 flex-shrink-0 mt-0.5" />
        </div>

        <p className="text-[11px] font-semibold text-white/35 mb-2 uppercase tracking-wider">
          {project.tagline}
          {"client" in project && project.client && ` · ${project.client}`}
        </p>

        <p className="text-[12px] text-white/45 leading-relaxed mb-4 line-clamp-2 flex-1">
          {project.description}
        </p>

        {/* tech */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.slice(0, 3).map((t) => <Pill key={t} label={t} />)}
          {project.tech.length > 3 && <Pill label={`+${project.tech.length - 3}`} />}
        </div>

        {/* links */}
        <div className="flex gap-2">
          <IconLink href={project.demoLink} icon={ExternalLink} label="Live Demo" filled small />
          {project.githubLink && (
            <IconLink href={project.githubLink} icon={GitBranch} label="Source" small />
          )}
        </div>
      </div>
    </div>
  );
}

// ── main ─────────────────────────────────────────────────────────────────────
export default function Projects() {
  const [activeTab, setActiveTab] = useState<Tab>("all");

  const getActive = () => activeTab === "all" ? allProjects : projects[activeTab];

  const tabs: { id: Tab; label: string; icon: React.ElementType; count: number }[] = [
    { id: "all", label: "All Projects", icon: Layers, count: allProjects.length },
    { id: "my", label: "Personal", icon: User, count: projects.my.length },
    { id: "client", label: "Client Work", icon: Briefcase, count: projects.client.length },
  ];

  return (
    <section id="projects" className="mb-24 sm:mb-32 scroll-mt-24 px-4 sm:px-6 lg:px-0">

      {/* ── Section heading ── */}
      <div className="flex items-end gap-6 mb-14">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Code2 className="w-3.5 h-3.5 text-white/25" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/25">
              Selected Work
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-none">
            Projects
            <span className="text-white/15">.</span>
          </h2>
        </div>
        <div className="flex-1 mb-2">
          <div className="h-px bg-gradient-to-r from-white/10 to-transparent" />
        </div>
        <span className="text-xs font-mono text-white/20 mb-2 hidden sm:block">
          &lt;portfolio /&gt;
        </span>
      </div>

      {/* ── Featured Hero ── */}
      <div className="relative mb-16 rounded-[2rem] overflow-hidden border border-white/[0.09] group cursor-pointer">

        {/* full bg image */}
        <div className="absolute inset-0">
          <img
            src={featuredProject.image}
            alt={featuredProject.title}
            className="w-full h-full object-cover opacity-25 group-hover:opacity-35 group-hover:scale-[1.03] transition-all duration-1000 ease-out"
          />
          {/* layered gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          {/* grid texture */}
          <div className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(255,255,255,1) 39px,rgba(255,255,255,1) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(255,255,255,1) 39px,rgba(255,255,255,1) 40px)",
            }}
          />
          {/* noise texture */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* content */}
        <div className="relative z-10 p-8 sm:p-12 lg:p-16 min-h-[400px] flex flex-col justify-between">

          {/* top row */}
          <div className="flex items-start justify-between">
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/[0.12] bg-white/[0.05] backdrop-blur-md">
              <Star className="w-3 h-3 text-amber-400/90 fill-amber-400/90" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/55">
                Featured Project
              </span>
              <Sparkles className="w-3 h-3 text-white/30" />
            </div>
            <span className={`px-3.5 py-2 text-[10px] font-bold uppercase tracking-widest border rounded-xl backdrop-blur-sm ${categoryBadge[featuredProject.category]}`}>
              {featuredProject.category}
            </span>
          </div>

          {/* bottom content */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mt-12">
            <div className="max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/30 mb-3">
                {featuredProject.tagline}
              </p>
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[0.95] mb-5">
                {featuredProject.title}
              </h3>
              <p className="text-sm sm:text-[15px] text-white/50 leading-relaxed mb-8 max-w-xl">
                {featuredProject.description}
              </p>

              {/* tech stack */}
              <div className="flex flex-wrap gap-2 mb-8">
                {featuredProject.tech.map((t) => (
                  <span key={t}
                    className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider bg-white/[0.06] border border-white/[0.1] rounded-xl text-white/50 backdrop-blur-sm">
                    {t}
                  </span>
                ))}
              </div>

              {/* cta buttons */}
              <div className="flex flex-wrap gap-3">
                <IconLink href={featuredProject.demoLink} icon={ExternalLink} label="View Live" filled />
                {featuredProject.githubLink && (
                  <IconLink href={featuredProject.githubLink} icon={GitBranch} label="Source Code" />
                )}
              </div>
            </div>

            {/* right stats */}
            <div className="flex flex-row lg:flex-col gap-3 flex-shrink-0">
              {[
                { label: "Year", value: featuredProject.year ?? "2024" },
                { label: "Stack", value: `${featuredProject.tech.length} libs` },
                { label: "Type", value: "client" in featuredProject && featuredProject.client ? "Client" : "Personal" },
              ].map(({ label, value }) => (
                <div key={label} className="px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl backdrop-blur-sm text-center min-w-[80px]">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/25 mb-0.5">{label}</div>
                  <div className="text-sm font-bold text-white/70">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="flex items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-1 p-1 bg-white/[0.03] border border-white/[0.07] rounded-2xl">
          {tabs.map(({ id, label, icon: Icon, count }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[11px] font-bold transition-all duration-200 ${
                activeTab === id
                  ? "bg-white text-black shadow-lg"
                  : "text-white/40 hover:text-white/65"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
              <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
                activeTab === id ? "bg-black/10 text-black/55" : "bg-white/[0.06] text-white/25"
              }`}>
                {count}
              </span>
            </button>
          ))}
        </div>
        <span className="text-[11px] text-white/25 font-medium hidden sm:block">
          {getActive().length} projects
        </span>
      </div>

      {/* ── Grid ── */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {getActive().map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {getActive().length === 0 && (
        <div className="text-center py-20 rounded-2xl border border-dashed border-white/[0.07]">
          <p className="text-xs text-white/25 uppercase tracking-[0.2em] font-semibold">
            No projects to display
          </p>
        </div>
      )}

      {/* ── View more ── */}
      <div className="text-center mt-14">
        <a href="#" className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/15 rounded-full text-[11px] font-bold text-white/45 hover:border-white/35 hover:text-white/80 transition-all duration-200 active:scale-95 uppercase tracking-widest">
          View All Projects
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

    </section>
  );
}