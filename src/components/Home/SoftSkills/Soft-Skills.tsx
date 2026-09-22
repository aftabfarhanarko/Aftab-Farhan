"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Globe,
  ShieldCheck,
  Brain,
  Target,
  MessageSquare,
  Award,
  Sparkles,
  Layers,
} from "lucide-react";

import SectionHeader from "@/components/Common/SectionHeader";

export default function SoftSkills() {
  const fullStackSoftSkills = [
    {
      title: "Fluent English & Client Communication",
      icon: Globe,
      badge: "Global Communication",
      desc: "Fluent verbal and written English communication for conducting live client demos, technical sprint reviews, requirement discovery calls, and clear asynchronous documentation across global distributed teams.",
      tags: ["Fluent English", "Client Demos", "Remote Standups", "Technical Writing"],
    },
    {
      title: "Cross-Functional Full-Stack Teamwork",
      icon: Users,
      badge: "Team Dynamics",
      desc: "Bridging frontend UI/UX designers, backend engineers, database architects, and QA teams. Synchronizing API contracts, resolving technical blockers, and maintaining sprint velocity.",
      tags: ["Frontend & Backend Sync", "API Contracts", "Agile Sprints", "PR Reviews"],
    },
    {
      title: "Technical Leadership & Mentorship",
      icon: Award,
      badge: "Technical Leadership",
      desc: "Leading engineering initiatives, establishing clean code guidelines, conducting rigorous peer pull-request reviews, and mentoring junior developers on system design and SOLID principles.",
      tags: ["Tech Leadership", "Code Reviews", "SOLID Design", "Developer Mentorship"],
    },
    {
      title: "Tech-to-Business Stakeholder Alignment",
      icon: MessageSquare,
      badge: "Business Alignment",
      desc: "Translating full-stack technical tradeoffs, cloud infrastructure decisions, and database indexing strategies into actionable business metrics and ROI for founders, clients, and non-technical stakeholders.",
      tags: ["Stakeholder Sync", "Tech-to-Business", "ROI & Scalability", "Product Strategy"],
    },
    {
      title: "Analytical Debugging & Incident RCA",
      icon: Brain,
      badge: "Problem Solving",
      desc: "Systematically isolating complex production bugs, async memory leaks, high-concurrency race conditions, and database lockups using structured Root Cause Analysis (RCA).",
      tags: ["Root Cause RCA", "Performance Audits", "Production Debugging", "Incident Response"],
    },
    {
      title: "End-to-End Architecture Ownership",
      icon: Target,
      badge: "Full Ownership",
      desc: "Driving complete feature lifecycles from initial DB schema design and REST/GraphQL endpoint modeling to reactive UI implementation, automated testing, and CI/CD production release.",
      tags: ["Full-Stack Ownership", "DB Schema Design", "E2E Scaffolding", "CI/CD Deploy"],
    },
  ];

  return (
    <section id="leadership" className="mb-20 sm:mb-24 scroll-mt-24">
      {/* Section Header */}
      <SectionHeader
        badge="FULL-STACK LEADERSHIP & SOFT SKILLS"
        titlePrefix="Soft Skills &"
        titleHighlight="Communication"
        subtitle="Professional technical leadership, fluent English client communication, cross-functional full-stack teamwork, and end-to-end product ownership."
        align="left"
        icon={Sparkles}
      />

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {fullStackSoftSkills.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="group relative p-6 rounded-2xl glass-card-primary hover:border-orange-300 transition-all duration-300 text-left flex flex-col justify-between overflow-hidden cursor-default min-h-[300px]"
            >
              {/* Top Accent Beam */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF6014]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-200/80 flex items-center justify-center text-[#FF6014] group-hover:bg-[#FF6014] group-hover:text-white group-hover:scale-105 group-hover:rotate-[-4deg] transition-all duration-300 shadow-xs">
                    <Icon className="w-5 h-5 transition-transform duration-300" strokeWidth={2.2} />
                  </div>
                  <span className="text-[10px] font-mono font-black text-[#FF6014] bg-orange-50/80 border border-orange-200/70 px-2 py-0.5 rounded-md uppercase">
                    {item.badge}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-lg sm:text-[19px] font-black text-slate-900 tracking-tight group-hover:text-[#FF6014] transition-colors leading-snug mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Tag Pills */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100 mt-4">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[10px] sm:text-[11px] font-extrabold text-slate-700 bg-slate-100/80 border border-slate-200 rounded-md group-hover:border-orange-200 group-hover:bg-orange-50/50 group-hover:text-[#FF6014] transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}