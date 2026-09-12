"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layers, Terminal, Database, Code2, Sparkles, CheckCircle2 } from "lucide-react";

const engineeringPrinciples = [
  {
    id: "01",
    title: "Domain Driven & Modular Architecture",
    category: "System Design",
    icon: Layers,
    points: [
      "Strict separation of concerns across presentation, business logic, and API layers",
      "Decoupled microservices & clean modular structures for maintainable scaling",
      "Robust TypeScript contract definitions avoiding dynamic runtime type drift",
    ],
  },
  {
    id: "02",
    title: "High-Performance Full Stack Execution",
    category: "Full Stack Precision",
    icon: Code2,
    points: [
      "Server-side rendering (SSR) combined with incremental static regeneration (ISR)",
      "Optimized database queries with indexing, eager loading, and connection pooling",
      "Asynchronous background task processing & web-worker offloading",
    ],
  },
  {
    id: "03",
    title: "Data Integrity & Fault Tolerant Storage",
    category: "Database & Security",
    icon: Database,
    points: [
      "ACID compliant transactions using PostgreSQL and Prisma ORM",
      "Automated fallback states, rate limiting, and strict input validation",
      "Secure authentication with NextAuth session management and RBAC security",
    ],
  },
  {
    id: "04",
    title: "Developer Workflow & Continuous Delivery",
    category: "DevOps & Tooling",
    icon: Terminal,
    points: [
      "Automated linting, formatting, typechecks, and regression testing",
      "Docker containerized environments ensuring seamless parity from dev to prod",
      "Vercel & Docker deployment pipelines with automated health checks",
    ],
  },
];

export default function HowIEngineer() {
  return (
    <section id="how-i-engineer" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-[#FF6014] text-[11px] font-bold uppercase tracking-wider mb-2.5">
              <Sparkles className="w-3.5 h-3.5" />
              Core Methodology
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-[40px] font-black text-slate-900 tracking-tight leading-tight">
              How I <span className="text-[#FF6014]">Engineer</span>
            </h2>
          </div>
          <p className="text-slate-600 max-w-md text-xs sm:text-sm font-medium leading-relaxed">
            My foundational engineering principles for creating scalable, maintainable, and enterprise-ready software solutions.
          </p>
        </div>

        {/* Grid of Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {engineeringPrinciples.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                className="group relative p-7 sm:p-8 rounded-2xl glass-card-compact hover:border-orange-300 transition-all duration-300 shadow-xs hover:shadow-xl overflow-hidden cursor-default"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#FF6014]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-orange-50 text-[#FF6014] border border-orange-200/60 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-[#FF6014] uppercase tracking-wider block">
                        {item.category}
                      </span>
                      <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight group-hover:text-[#FF6014] transition-colors">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <span className="text-xl font-black text-slate-300 group-hover:text-[#FF6014] transition-colors font-['Bai_Jamjuree']">
                    {item.id}
                  </span>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-200/80">
                  {item.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#FF6014] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                        {pt}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}