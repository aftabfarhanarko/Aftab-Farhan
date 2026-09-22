"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Layout,
  Building2,
  ShoppingCart,
  CalendarCheck,
  ShoppingBag,
  Zap,
  LayoutDashboard,
  Bot,
  ArrowUpRight,
} from "lucide-react";

import SectionHeader from "@/components/Common/SectionHeader";

export default function Services() {
  const capabilities = [
    {
      title: "Enterprise SaaS Platforms",
      icon: Layout,
      desc: "Scalable multi-tenant cloud ecosystems featuring robust AuthN/AuthZ, subscription management, role-based access control, and API webhooks.",
      tags: ["Multi-Tenant", "AuthN/AuthZ", "Stripe/Billing"],
    },
    {
      title: "Business Management Systems",
      icon: Building2,
      desc: "Mission-critical operational platforms, CRM/ERP portals, automated business workflows, and real-time business intelligence analytics.",
      tags: ["ERP & CRM", "Workflow Automation", "Analytics"],
    },
    {
      title: "Digital Marketplace Platforms",
      icon: ShoppingCart,
      desc: "High-scale multi-vendor marketplaces engineered for complex multi-role workflows (Customer, Vendor, Admin) and transaction engines.",
      tags: ["Multi-Vendor", "Escrow & Payouts", "Role Engine"],
    },
    {
      title: "Booking & Dispatch Systems",
      icon: CalendarCheck,
      desc: "Real-time appointment scheduling platforms with automated dispatching, dynamic availability calendars, and instant SMS/Email notifications.",
      tags: ["Real-Time Sync", "Calendar Engines", "Dispatch"],
    },
    {
      title: "High-Scale E-Commerce",
      icon: ShoppingBag,
      desc: "Custom headless e-commerce architectures with high-speed product catalog indexing, cart engines, and secure payment gateway integrations.",
      tags: ["Headless Commerce", "Payment Gateways", "Cart State"],
    },
    {
      title: "Real-Time Event-Driven Apps",
      icon: Zap,
      desc: "Low-latency WebSockets and Socket.IO applications built for instant messaging, collaborative document state, and live activity streams.",
      tags: ["WebSockets", "Socket.IO", "Live Data Sync"],
    },
    {
      title: "Data-Dense Admin Control Centers",
      icon: LayoutDashboard,
      desc: "High-density management dashboards featuring interactive charts, server-side data tables, granular filtering, and system audit logging.",
      tags: ["Chart Analytics", "Data Tables", "Audit Logs"],
    },
    {
      title: "AI & LLM Powered Applications",
      icon: Bot,
      desc: "Intelligent web platforms integrated with LLM APIs, vector search, automated agentic workflows, and conversational AI interfaces.",
      tags: ["LLM Integration", "Agentic Workflows", "Vector AI"],
    },
  ];

  return (
    <section id="services" className="mb-20 sm:mb-24 scroll-mt-24">
      {/* Section Header */}
      <SectionHeader
        badge="PRODUCT SOLUTIONS & ARCHITECTURE"
        titlePrefix="What I"
        titleHighlight="Build."
        subtitle="Specialized software development capabilities tailored for enterprise production scale."
        align="left"
      />

      {/* Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {capabilities.map((cap, idx) => {
          const Icon = cap.icon;
          return (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
              data-cursor-parallax

              className="group relative p-6 rounded-2xl glass-card-primary hover:border-orange-300 transition-all duration-300 text-left flex flex-col justify-between overflow-hidden cursor-default min-h-[300px]"
            >
              {/* Sweep Light Beam on Hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF6014]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="space-y-4">
                {/* Icon Header */}
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-200/80 flex items-center justify-center text-[#FF6014] group-hover:bg-[#FF6014] group-hover:text-white group-hover:scale-105 group-hover:rotate-[-4deg] transition-all duration-300 shadow-xs">
                    <Icon className="w-5 h-5 transition-transform duration-300" strokeWidth={2.2} />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-[#FF6014] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200" />
                </div>

                {/* Title & Description */}
                <div>
                  <h3 data-cursor-title-parallax className="text-lg sm:text-[19px] font-black text-slate-900 tracking-tight group-hover:text-[#FF6014] transition-colors leading-snug mb-2">
                    {cap.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium text-justify">
                    {cap.desc}
                  </p>
                </div>
              </div>

              {/* Tag Pills */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100 mt-4">
                {cap.tags.map((tag) => (
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