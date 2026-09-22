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
      
      {/* Status pill with pulsing aura */}
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.03 }}
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-orange-50 border border-orange-200 text-sm font-bold text-[#FF6014] w-fit shadow-sm cursor-default"
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
        <motion.div
          whileHover={{ y: -3, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="group relative overflow-hidden p-6 rounded-2xl glass-card-primary transition-all duration-300 space-y-3 cursor-default"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-orange-50 border border-orange-200 text-[#FF6014] group-hover:bg-[#FF6014] group-hover:text-white transition-colors duration-300">
              <Rocket className="w-5 h-5 transition-transform group-hover:scale-110" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#FF6014] transition-colors">
              Full Stack Software Development
            </h3>
          </div>
          <p className="text-base sm:text-lg text-slate-800 leading-[1.7] font-medium text-justify">
            {roleDescription || "Full Stack Developer responsible for designing, developing, and maintaining scalable web applications using modern frontend and backend technologies. Focused on writing clean, efficient code and delivering high-quality software solutions from concept to deployment."}
          </p>
        </motion.div>

        {/* Pillar 2: Frontend & Backend Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            whileHover={{ y: -3, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="group p-6 rounded-2xl glass-card-primary transition-all duration-300 space-y-2.5 cursor-default"
          >
            <div className="flex items-center gap-2.5 text-slate-900">
              <div className="p-2 rounded-xl bg-orange-50 border border-orange-200 text-[#FF6014] group-hover:bg-[#FF6014] group-hover:text-white transition-colors duration-300">
                <Code2 className="w-5 h-5 transition-transform group-hover:scale-110" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 group-hover:text-[#FF6014] transition-colors">
                Frontend &amp; UI/UX
              </h4>
            </div>
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium text-justify">
              Crafting responsive interfaces with React.js, Next.js 16, TypeScript, Tailwind CSS, and Framer Motion with pixel-perfect precision.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -3, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="group p-6 rounded-2xl glass-card-primary transition-all duration-300 space-y-2.5 cursor-default"
          >
            <div className="flex items-center gap-2.5 text-slate-900">
              <div className="p-2 rounded-xl bg-orange-50 border border-orange-200 text-[#FF6014] group-hover:bg-[#FF6014] group-hover:text-white transition-colors duration-300">
                <Cpu className="w-5 h-5 transition-transform group-hover:scale-110" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 group-hover:text-[#FF6014] transition-colors">
                Backend &amp; Cloud
              </h4>
            </div>
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium text-justify">
              Designing secure RESTful &amp; GraphQL APIs, microservices, authentication systems, and cloud deployments with Node.js, Express, NestJS, and Docker.
            </p>
          </motion.div>
        </div>

        {/* Pillar 3: Engineering Quality */}
        <motion.div
          whileHover={{ y: -3, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="group p-6 rounded-2xl glass-card-primary transition-all duration-300 space-y-2.5 cursor-default"
        >
          <div className="flex items-center gap-2.5 text-slate-900">
            <div className="p-2 rounded-xl bg-orange-50 border border-orange-200 text-[#FF6014] group-hover:bg-[#FF6014] group-hover:text-white transition-colors duration-300">
              <ShieldCheck className="w-5 h-5 transition-transform group-hover:scale-110" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 group-hover:text-[#FF6014] transition-colors">
              Engineering Quality &amp; Principles
            </h4>
          </div>
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium text-justify">
            Adhering to SOLID principles, Clean Architecture, and automated workflows. Experienced with PostgreSQL, MongoDB, Redis, Prisma ORM, CI/CD pipelines, and performance optimization.
          </p>
        </motion.div>

      </motion.div>

      <AboutTechStack
        frontendSkills={frontendSkills}
        backendSkills={backendSkills}
        tools={tools}
      />

      <div className="h-px bg-slate-200" />

      <AboutHighlights
        quoteText={quoteText}
        quoteAuthor={quoteAuthor}
        mentorTitle={mentorTitle}
        mentorDescription={mentorDescription}
      />
    </div>
  );
}
