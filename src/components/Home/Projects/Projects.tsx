"use client";
import React, { useState } from "react";

const Projects = () => {
  const [activeTab, setActiveTab] = useState<"all" | "my" | "client">("all");

  const projects = {
    my: [
      {
        id: 1,
        title: "DevFlow",
        description:
          "A comprehensive developer workflow management platform with real-time collaboration features.",
        image: "/api/placeholder/600/400",
        tech: ["React", "TypeScript", "Node.js", "PostgreSQL", "Socket.io"],
        category: "Full-Stack",
        demoLink: "#",
        githubLink: "#",
        featured: true,
      },
      {
        id: 2,
        title: "TaskFlow AI",
        description:
          "AI-powered task management application with smart prioritization and natural language processing.",
        image: "/api/placeholder/600/400",
        tech: ["Next.js", "OpenAI", "Prisma", "Tailwind CSS", "Redis"],
        category: "AI/ML",
        demoLink: "#",
        githubLink: "#",
        featured: true,
      },
      {
        id: 3,
        title: "Portfolio 3D",
        description:
          "Interactive 3D portfolio website with WebGL animations and smooth scrolling experiences.",
        image: "/api/placeholder/600/400",
        tech: ["Three.js", "React", "GSAP", "Framer Motion", "Vite"],
        category: "Frontend",
        demoLink: "#",
        githubLink: "#",
        featured: false,
      },
    ],
    client: [
      {
        id: 4,
        title: "E-Commerce Platform",
        description:
          "Full-featured e-commerce solution with inventory management, payment integration, and analytics dashboard.",
        image: "/api/placeholder/600/400",
        tech: ["Next.js", "Stripe", "MongoDB", "AWS S3", "Tailwind CSS"],
        category: "E-Commerce",
        client: "Fashion Retail Co.",
        demoLink: "#",
        featured: true,
      },
      {
        id: 5,
        title: "Healthcare Management System",
        description:
          "Patient management and appointment scheduling system for a multi-location healthcare provider.",
        image: "/api/placeholder/600/400",
        tech: ["React", "Express.js", "PostgreSQL", "JWT", "Docker"],
        category: "Healthcare",
        client: "MediCare Group",
        demoLink: "#",
        featured: true,
      },
      {
        id: 6,
        title: "Real Estate Portal",
        description:
          "Property listing and management platform with advanced search filters and virtual tour integration.",
        image: "/api/placeholder/600/400",
        tech: ["Next.js", "GraphQL", "PostGIS", "Mapbox", "Node.js"],
        category: "Real Estate",
        client: "HomeFinders Inc.",
        demoLink: "#",
        featured: false,
      },
    ],
  };

  const allProjects = [...projects.my, ...projects.client];

  const getActiveProjects = () => {
    if (activeTab === "all") return allProjects;
    return projects[activeTab];
  };

  const featuredProjects = allProjects.filter((p) => p.featured);

  return (
    <section id="projects" className="mb-32 scroll-mt-24">
      {/* Header */}
      <div className="flex items-center gap-6 mb-12">
        <div className="relative">
          <h2 className="text-3xl lg:text-4xl font-black text-foreground tracking-tight">
            Projects
          </h2>
          <div className="absolute -bottom-3 left-0 w-20 h-1 bg-foreground rounded-full" />
        </div>
        <div className="h-px flex-1 bg-foreground/10" />
        <span className="text-sm font-mono text-foreground/40 hidden sm:block">
          &lt;portfolio /&gt;
        </span>
      </div>

      {/* Featured Projects */}
      <div className="mb-12">
        <h3 className="text-lg font-bold text-foreground/80 mb-6 flex items-center gap-3">
          <span className="w-2 h-2 bg-foreground rounded-full" />
          Featured Work
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {featuredProjects.slice(0, 2).map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-2xl bg-foreground/5 border border-white/10 hover:border-white/30 transition-all duration-300"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-xl font-bold text-foreground mb-1">
                      {project.title}
                    </h4>
                    <p className="text-sm text-foreground/50">
                      {project.category}{" "}
                      {project.client && `• ${project.client}`}
                    </p>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium bg-foreground/10 text-foreground rounded-full">
                    Featured
                  </span>
                </div>
                <p className="text-foreground/60 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs bg-foreground/5 border border-white/10 rounded-md text-foreground/60"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="px-2 py-1 text-xs bg-foreground/5 border border-white/10 rounded-md text-foreground/40">
                      +{project.tech.length - 4}
                    </span>
                  )}
                </div>
                <div className="flex gap-3">
                  <a
                    href={project.demoLink}
                    className="px-4 py-2 text-sm font-medium bg-foreground text-white rounded-lg hover:bg-foreground/90 transition-colors"
                  >
                    Live Demo
                  </a>
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      className="px-4 py-2 text-sm font-medium border border-white/10 rounded-lg text-foreground/70 hover:border-white/50 hover:text-foreground transition-colors"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-white/10">
        {[
          { id: "all", label: "All Projects", count: allProjects.length },
          { id: "my", label: "My Projects", count: projects.my.length },
          {
            id: "client",
            label: "Client Projects",
            count: projects.client.length,
          },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-6 py-3 text-sm font-medium transition-all relative ${
              activeTab === tab.id
                ? "text-foreground"
                : "text-foreground/50 hover:text-foreground/70"
            }`}
          >
            <span className="flex items-center gap-2">
              {tab.label}
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  activeTab === tab.id
                    ? "bg-foreground/10 text-foreground"
                    : "bg-foreground/10 text-foreground/40"
                }`}
              >
                {tab.count}
              </span>
            </span>
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-foreground rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getActiveProjects().map((project) => (
          <div
            key={project.id}
            className="group rounded-xl bg-foreground/5 border border-white/10 hover:border-white/30 overflow-hidden transition-all duration-300"
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-foreground">{project.title}</h4>
                <span className="text-xs px-2 py-1 bg-foreground/10 text-foreground rounded-full">
                  {project.category}
                </span>
              </div>
              <p className="text-foreground/50 text-xs mb-3">
                {project.client ? `Client Project` : "Personal Project"}
                {project.client && ` • ${project.client}`}
              </p>
              <p className="text-foreground/60 text-sm leading-relaxed mb-4 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tech.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-xs bg-foreground/5 border border-white/10 rounded-md text-foreground/50"
                  >
                    {tech}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="px-2 py-0.5 text-xs bg-foreground/5 border border-white/10 rounded-md text-foreground/40">
                    +{project.tech.length - 3}
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <a
                  href={project.demoLink}
                  className="flex-1 px-3 py-2 text-xs font-medium text-center bg-foreground/10 text-foreground rounded-lg hover:bg-foreground/20 transition-colors"
                >
                  Demo
                </a>
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    className="flex-1 px-3 py-2 text-xs font-medium text-center border border-white/10 rounded-lg text-foreground/60 hover:border-white/50 transition-colors"
                  >
                    Code
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {getActiveProjects().length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📂</div>
          <p className="text-foreground/50">No projects to display</p>
        </div>
      )}

      {/* View More Button */}
      <div className="text-center mt-12">
        <button className="px-8 py-3 border border-white/30 rounded-full text-foreground font-medium hover:bg-foreground/10 transition-colors">
          View All Projects
        </button>
      </div>
    </section>
  );
};

export default Projects;



