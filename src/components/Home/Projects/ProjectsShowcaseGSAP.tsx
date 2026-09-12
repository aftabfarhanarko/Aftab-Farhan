"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, ArrowRight, ExternalLink } from "lucide-react";
import { Project } from "./types";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProjectsShowcaseGSAPProps {
  projects: Project[];
}

export default function ProjectsShowcaseGSAP({ projects }: ProjectsShowcaseGSAPProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const featuredProjects = projects.slice(0, 3); // Take top 3 featured projects for high-end scroll story

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || featuredProjects.length === 0 || !containerRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".gsap-project-card");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0.2, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "top 30%",
              scrub: 0.8,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [featuredProjects]);

  if (featuredProjects.length === 0) return null;

  return (
    <div ref={containerRef} className="mb-16 space-y-8">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-4 h-4 text-[#FF6014]" />
        <span className="text-xs font-bold uppercase tracking-widest text-[#FF6014]">
          Spotlight Engineering Showcase
        </span>
      </div>

      <div className="space-y-8">
        {featuredProjects.map((project) => (
          <div
            key={project.id}
            className="gsap-project-card p-6 sm:p-8 lg:p-10 rounded-2xl glass-card-primary hover:border-orange-300 transition-all duration-300 grid lg:grid-cols-12 gap-8 items-center relative overflow-hidden group"
          >
            {/* Top Sweep Beam */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF6014]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

            <div className="lg:col-span-7 space-y-4 text-left">
              <span className="px-3 py-1 text-xs font-bold text-[#FF6014] bg-orange-50/90 border border-orange-200 rounded-full inline-block">
                {project.category}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight group-hover:text-[#FF6014] transition-colors">
                {project.title}
              </h3>
              <p className="text-base text-slate-800 leading-relaxed max-w-xl font-medium text-justify">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tech?.slice(0, 5).map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 text-xs font-bold glass-card-compact rounded-xl text-slate-900 hover:border-orange-300 hover:text-[#FF6014] transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="pt-4 flex items-center gap-4">
                <Link
                  href={`/projects/${project.id}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#FF6014] hover:text-[#E5530F] transition-colors"
                >
                  View Full Case Study <ArrowRight className="w-4 h-4" />
                </Link>
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Live Site
                  </a>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
