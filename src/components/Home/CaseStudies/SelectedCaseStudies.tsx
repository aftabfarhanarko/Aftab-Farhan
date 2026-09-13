"use client";

import React from "react";
import { motion } from "framer-motion";
import { FolderKanban, ExternalLink, ArrowRight, Layers, CheckCircle } from "lucide-react";

const caseStudies = [
  {
    id: "case-1",
    badge: "Enterprise SaaS Architecture",
    title: "High Scale Portfolio Management System",
    problem: "Need for real-time content management with sub-50ms latency across global edge servers.",
    solution: "Implemented Next.js App Router, Prisma ORM caching, PostgreSQL connection pooling, and optimistic UI hydration.",
    results: [
      "Sub-50ms Time to First Byte (TTFB)",
      "99.9% Uptime under high concurrency",
      "Seamless CMS control panel with NextAuth security",
    ],
    tech: ["Next.js 15", "TypeScript", "Prisma", "PostgreSQL", "TailwindCSS", "GSAP"],
    link: "/dashboard",
  },
  {
    id: "case-2",
    badge: "Real-Time AI Assistant",
    title: "Context-Aware Gemini AI Assistant System",
    problem: "Users needed real-time conversational answers regarding engineering projects and tech stack capabilities.",
    solution: "Designed streaming response pipelines integrated with Gemini Data Analytics API & fallback intent classification.",
    results: [
      "Instant streaming responses with <200ms initial token latency",
      "Interactive data drawer UI integrated into main portfolio",
      "Automated fallback handling for maximum reliability",
    ],
    tech: ["React", "Gemini API", "Node.js", "WebSockets", "Framer Motion"],
    link: "#",
  },
];

import SectionHeader from "@/components/Common/SectionHeader";

export default function SelectedCaseStudies() {
  return (
    <section id="case-studies" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Header */}
        <SectionHeader
          badge="TECHNICAL BREAKDOWN"
          titlePrefix="Selected"
          titleHighlight="Case Studies"
          subtitle="Deep dive into production engineering solutions, system architecture decisions, and measured performance outcomes."
          align="left"
          icon={FolderKanban}
        />

        {/* Case Studies Cards */}
        <div className="space-y-8">
          {caseStudies.map((cs, idx) => (
            <motion.div
              key={cs.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
              className="group p-7 sm:p-10 rounded-2xl glass-card-compact hover:border-orange-300 transition-all duration-300 shadow-xs hover:shadow-xl relative overflow-hidden cursor-default"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#FF6014]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: Problem & Solution */}
                <div className="lg:col-span-7 space-y-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-[#FF6014] text-[11px] font-black uppercase tracking-widest">
                    {cs.badge}
                  </span>
                  
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight group-hover:text-[#FF6014] transition-colors">
                    {cs.title}
                  </h3>

                  <div className="space-y-3 pt-2">
                    <div className="p-4 rounded-xl glass-card-compact border border-slate-200/80">
                      <span className="text-xs font-bold text-red-500 uppercase tracking-wider block mb-1">
                        The Challenge / Problem
                      </span>
                      <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                        {cs.problem}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-orange-50/60 border border-orange-200/60">
                      <span className="text-xs font-bold text-[#FF6014] uppercase tracking-wider block mb-1">
                        Engineering Solution
                      </span>
                      <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                        {cs.solution}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column: Outcomes & Tech Stack */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6 pt-2 lg:pt-0 lg:border-l lg:border-slate-200/80 lg:pl-8">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#FF6014]" />
                      Key Measured Outcomes
                    </h4>
                    
                    <div className="space-y-2.5">
                      {cs.results.map((res, rIdx) => (
                        <div key={rIdx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-slate-800 font-semibold">
                            {res}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5">
                      Tech Stack Used
                    </h4>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {cs.tech.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 rounded-xl glass-card-compact text-slate-800 font-bold text-[11px] hover:border-orange-300 transition-colors"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {cs.link !== "#" && (
                      <a
                        href={cs.link}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF6014] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#FF6014]/90 transition-all shadow-md shadow-orange-500/20 group/btn"
                      >
                        View System In Action
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    )}
                  </div>

                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}