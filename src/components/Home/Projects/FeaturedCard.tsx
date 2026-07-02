"use client";
import React from "react";
import { ExternalLink, GitBranch } from "lucide-react";
import { Project, categoryLabel, ActionBtn } from "./types";

export default function FeaturedCard({ project }: { project: Project }) {
  return (
    <div className="relative mb-10 sm:mb-12 rounded-[2rem] overflow-hidden border border-border bg-card/40">
      <div className="absolute inset-0">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover scale-[1.06] opacity-35 blur-[2px]"
        />
        <div className="absolute inset-0 bg-background/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/70 to-background/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/75 via-transparent to-transparent" />
      </div>
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(255,255,255,1) 39px,rgba(255,255,255,1) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(255,255,255,1) 39px,rgba(255,255,255,1) 40px)",
        }}
      />

      <div className="relative z-10 grid lg:grid-cols-[1fr_1.25fr] gap-10 p-6 sm:p-10 lg:p-14 items-center">
        <div className="max-w-2xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-foreground/55 mb-3">
            {categoryLabel[project.category] || project.tagline || "Project"}
          </p>

          <h3 className="text-2xl md:text-4xl font-black text-foreground tracking-tight leading-[0.95] mb-4">
            {project.title}
          </h3>

          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-card/60 border border-border rounded-lg text-foreground/75 backdrop-blur-sm">
              {project.projectType === "CLIENT" ? "Client Project" : "Personal"}
            </span>
            {project.client && (
              <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-card/60 border border-border rounded-lg text-foreground/65 backdrop-blur-sm">
                {project.client}
              </span>
            )}
            {project.year && (
              <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-card/60 border border-border rounded-lg text-foreground/65 backdrop-blur-sm">
                {project.year}
              </span>
            )}
          </div>

          <p className="text-sm sm:text-[15px] text-foreground/55 leading-relaxed mb-7 max-w-xl">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-7">
            {project.tech.slice(0, 6).map((t) => (
              <span
                key={t}
                className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider bg-card/60 border border-border rounded-xl text-foreground/55 backdrop-blur-sm"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <ActionBtn
              href={project.demoLink}
              icon={ExternalLink}
              label="Visit Website"
              filled
            />
            {project.githubLink && (
              <ActionBtn
                href={project.githubLink}
                icon={GitBranch}
                label="Source Code"
              />
            )}
          </div>
        </div>

        <div className="relative lg:justify-self-end w-full">
          <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-border bg-card shadow-[0_24px_80px_rgba(0,0,0,0.25)]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
