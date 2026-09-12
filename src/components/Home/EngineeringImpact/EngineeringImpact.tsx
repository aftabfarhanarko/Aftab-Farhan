"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Cpu, Server, ShieldCheck, ArrowUpRight, Activity } from "lucide-react";

const impactMetrics = [
  {
    id: 1,
    title: "High-Throughput API Architecture",
    metric: "99.98%",
    subtext: "Uptime across production services",
    description: "Designed resilient microservices & caching strategies using Redis & Node.js, eliminating database bottlenecks under heavy load.",
    icon: Server,
    color: "#FF6014",
  },
  {
    id: 2,
    title: "Frontend Latency Reduction",
    metric: "65%",
    subtext: "Faster Core Web Vitals (LCP/INP)",
    description: "Optimized Next.js dynamic routing, streaming SSR, bundle splitting, and GSAP GPU acceleration for instantaneous page loads.",
    icon: Zap,
    color: "#10B981",
  },
  {
    id: 3,
    title: "Scalable State & Data Pipelines",
    metric: "10M+",
    subtext: "Daily processed data events",
    description: "Built decoupled state hydration systems with Prisma, SQL query indexing, and real-time WebSocket sync for enterprise tools.",
    icon: Cpu,
    color: "#6366F1",
  },
  {
    id: 4,
    title: "Zero-Downtime CI/CD Security",
    metric: "100%",
    subtext: "Automated test & deploy pass rate",
    description: "Established automated Docker build checks, automated regression test suites, and secret isolation for cloud infrastructure.",
    icon: ShieldCheck,
    color: "#EC4899",
  },
];

export default function EngineeringImpact() {
  return (
    <section id="engineering-impact" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-[#FF6014] text-[11px] font-bold uppercase tracking-wider mb-2.5">
              <Activity className="w-3.5 h-3.5" />
              Measurable Performance
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-[40px] font-black text-slate-900 tracking-tight leading-tight">
              Engineering <span className="text-[#FF6014]">Impact</span>
            </h2>
          </div>
          <p className="text-slate-600 max-w-md text-xs sm:text-sm font-medium leading-relaxed">
            Architecting robust full-stack applications with an unrelenting focus on performance benchmarks, scalability, and clean system design.
          </p>
        </div>

        {/* Grid of Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {impactMetrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                className="group relative p-6 sm:p-7 rounded-2xl glass-card-compact hover:border-orange-300 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-xl cursor-default text-left"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#FF6014]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div 
                      className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${item.color}15`, color: item.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      0{item.id}
                    </span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-['Bai_Jamjuree'] mb-1">
                    {item.metric}
                  </h3>
                  <p className="text-[11px] font-bold text-[#FF6014] uppercase tracking-wider mb-3">
                    {item.subtext}
                  </p>
                  
                  <h4 className="text-sm sm:text-base font-bold text-slate-800 mb-1.5 leading-snug group-hover:text-[#FF6014] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs font-bold text-slate-500 group-hover:text-slate-900 transition-colors">
                  <span>Production Standard</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#FF6014] transition-colors" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}