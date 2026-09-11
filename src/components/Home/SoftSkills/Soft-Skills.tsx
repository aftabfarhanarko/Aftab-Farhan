"use client";
import React from "react";
import { motion } from "framer-motion";
import { Users, MessageSquare, ShieldCheck, Brain, Target, Compass, Code2, Layers } from "lucide-react";

export default function SoftSkills() {
  const leadershipItems = [
    {
      title: "Client Communication",
      icon: MessageSquare,
      desc: "Translating complex technical architecture into clear business outcomes for non-technical stakeholders and client leads.",
    },
    {
      title: "Team Leadership",
      icon: Users,
      desc: "Guiding frontend and backend developers through technical challenges, code reviews, and structured task assignments.",
    },
    {
      title: "Strategic Thinking",
      icon: Compass,
      desc: "Aligning software architecture with product roadmaps, performance targets, and scalability goals.",
    },
    {
      title: "Problem Solving",
      icon: Brain,
      desc: "Diagnosing complex system bottlenecks, root cause failures, and database queries in production environments.",
    },
    {
      title: "Project Ownership",
      icon: Target,
      desc: "Taking end-to-end accountability for feature delivery from initial requirement gathering to production deployment.",
    },
    {
      title: "Requirement Analysis",
      icon: Layers,
      desc: "Breaking down ambiguous product specifications into clean, actionable engineering tasks and API contracts.",
    },
  ];

  return (
    <section id="leadership" className="mb-20 sm:mb-24 scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8 flex flex-col items-center sm:items-start text-center sm:text-left"
      >
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF6014] mb-2">
          Collaboration & Governance
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Leadership & <span className="text-[#FF6014]">Collaboration</span>
        </h2>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal mt-2">
          Key non-technical competencies and engineering management principles that ensure smooth project execution and team alignment.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {leadershipItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-orange-300 transition-all duration-200 text-left shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#FF6014]">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}