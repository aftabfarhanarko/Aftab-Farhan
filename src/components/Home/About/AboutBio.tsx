"use client";
import React from "react";
import { motion } from "framer-motion";
import { Project, itemVariants } from "./types";
import AboutTechStack from "./AboutTechStack";
import AboutHighlights from "./AboutHighlights";
import { Code2, Cpu, ShieldCheck, Rocket } from "lucide-react";

interface AboutBioProps {
  clientFocusedText: string;
  roleDescription: string;
  introParagraphs: string[];
  frontendSkills: string[];
  backendSkills: string[];
  tools: string[];
  projects: Project[];
  quoteText: string;
  quoteAuthor: string;
  mentorTitle: string;
  mentorDescription: string;
}

export default function AboutBio({
  clientFocusedText,
  roleDescription,
  introParagraphs,
  frontendSkills,
  backendSkills,
  tools,
  projects,
  quoteText,
  quoteAuthor,
  mentorTitle,
  mentorDescription,
}: AboutBioProps) {
  return (
    <div className="lg:col-span-3 flex flex-col gap-6">
      
      {/* Status pill */}
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-orange-50 border border-orange-200 text-sm font-semibold text-[#FF6014] w-fit shadow-sm"
      >
        <div className="relative w-2.5 h-2.5 shrink-0">
          <span className="absolute inset-0 rounded-full bg-[#FF6014] animate-ping opacity-60" />
          <span className="relative block w-2.5 h-2.5 rounded-full bg-[#FF6014]" />
        </div>
        <span>{clientFocusedText}</span>
      </motion.div>

      {/* Engineering Pillars Cards */}
      <motion.div variants={itemVariants} className="space-y-4">
        
        {/* Pillar 1: Full-Stack Engineering */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-orange-200 hover:shadow-md transition-all space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-orange-100/80 text-[#FF6014]">
              <Rocket className="w-5 h-5 text-[#FF6014]" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Full Stack Software Development</h3>
          </div>
          <p className="text-base sm:text-lg text-slate-600 leading-[1.7]">
            {roleDescription || "Full Stack Developer responsible for designing, developing, and maintaining scalable web applications using modern frontend and backend technologies. Focused on writing clean, efficient code and delivering high-quality software solutions from concept to deployment."}
          </p>
        </div>

        {/* Pillar 2: Frontend & Backend Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-orange-200 hover:shadow-md transition-all space-y-2.5">
            <div className="flex items-center gap-2.5 text-slate-900">
              <Code2 className="w-5 h-5 text-[#FF6014]" />
              <h4 className="text-lg font-bold text-slate-900">Frontend & UI/UX</h4>
            </div>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Crafting responsive interfaces with React.js, Next.js 16, TypeScript, Tailwind CSS, and Framer Motion with pixel-perfect precision.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-orange-200 hover:shadow-md transition-all space-y-2.5">
            <div className="flex items-center gap-2.5 text-slate-900">
              <Cpu className="w-5 h-5 text-[#FF6014]" />
              <h4 className="text-lg font-bold text-slate-900">Backend & Cloud</h4>
            </div>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Designing secure RESTful & GraphQL APIs, microservices, authentication systems, and cloud deployments with Node.js, Express, NestJS, and Docker.
            </p>
          </div>
        </div>

        {/* Pillar 3: Engineering Quality */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-orange-200 hover:shadow-md transition-all space-y-2.5">
          <div className="flex items-center gap-2.5 text-slate-900">
            <ShieldCheck className="w-5 h-5 text-[#FF6014]" />
            <h4 className="text-lg font-bold text-slate-900">Engineering Quality & Principles</h4>
          </div>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Adhering to SOLID principles, Clean Architecture, and automated workflows. Experienced with PostgreSQL, MongoDB, Redis, Prisma ORM, CI/CD pipelines, and performance optimization.
          </p>
        </div>

      </motion.div>

      <AboutTechStack
        frontendSkills={frontendSkills}
        backendSkills={backendSkills}
        tools={tools}
      />

      <div className="h-px bg-slate-200" />

      <AboutHighlights
        projects={projects}
        quoteText={quoteText}
        quoteAuthor={quoteAuthor}
        mentorTitle={mentorTitle}
        mentorDescription={mentorDescription}
      />
    </div>
  );
}
