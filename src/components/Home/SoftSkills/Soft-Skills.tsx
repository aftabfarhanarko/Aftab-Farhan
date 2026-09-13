"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  MessageSquare,
  ShieldCheck,
  Brain,
  Target,
  Compass,
  Layers,
  ArrowUpRight,
} from "lucide-react";

import SectionHeader from "@/components/Common/SectionHeader";

export default function SoftSkills() {
  const leadershipItems = [
    {
      title: "Executive Stakeholder Alignment",
      icon: MessageSquare,
      desc: "Translating complex cloud architectures and technical choices into clear strategic business value for clients, founders, and non-technical stakeholders.",
      tags: ["Tech-to-Business", "Stakeholder Sync", "Strategy"],
    },
    {
      title: "Engineering Team Leadership",
      icon: Users,
      desc: "Guiding cross-functional frontend and backend developers through technical challenges, architecture reviews, code quality, and agile sprint delivery.",
      tags: ["Technical Mentorship", "Sprint Execution", "Code Reviews"],
    },
    {
      title: "Product & Architecture Strategy",
      icon: Compass,
      desc: "Aligning multi-tier system architecture with long-term product roadmaps, high-availability targets, performance SLAs, and scaling milestones.",
      tags: ["Product Roadmap", "System Scaling", "SLA Targets"],
    },
    {
      title: "Root-Cause System Diagnostics",
      icon: Brain,
      desc: "Diagnosing complex production bottlenecks, database query locks, memory leaks, and distributed API latency issues under high user traffic.",
      tags: ["Root Cause RCA", "Performance Audits", "Debugging"],
    },
    {
      title: "End-to-End Feature Ownership",
      icon: Target,
      desc: "Driving end-to-end accountability from initial product discovery, API schema contract definitions, and database migrations to production launch.",
      tags: ["Full Ownership", "Schema Design", "Launch Delivery"],
    },
    {
      title: "Technical Requirement Specifications",
      icon: Layers,
      desc: "Deconstructing ambiguous business requirements into high-fidelity engineering specifications, clean API schemas, and structured sprint tasks.",
      tags: ["API Contracts", "Technical Specs", "Task Breakdown"],
    },
  ];

  return (
    <section id="leadership" className="mb-20 sm:mb-24 scroll-mt-24">
      {/* Section Header */}
      <SectionHeader
        badge="GOVERNANCE & TEAM EXCELLENCE"
        titlePrefix="How I"
        titleHighlight="Work."
        subtitle="Core professional capabilities, engineering philosophy, and collaborative team leadership principles."
        align="left"
        icon={Users}
      />

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {leadershipItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="group relative p-6 rounded-2xl glass-card-primary hover:border-orange-300 transition-all duration-300 text-left flex flex-col justify-between overflow-hidden cursor-default min-h-[290px]"
            >
              {/* Top Accent Beam */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF6014]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-200/80 flex items-center justify-center text-[#FF6014] group-hover:bg-[#FF6014] group-hover:text-white group-hover:scale-105 group-hover:rotate-[-4deg] transition-all duration-300 shadow-xs">
                    <Icon className="w-5 h-5 transition-transform duration-300" strokeWidth={2.2} />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-[#FF6014] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
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