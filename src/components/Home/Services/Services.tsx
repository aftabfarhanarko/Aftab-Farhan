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
} from "lucide-react";

export default function Services() {
  const capabilities = [
    {
      title: "SaaS Platforms",
      icon: Layout,
      desc: "Multi-tenant cloud applications with authentication, subscription tiers, role-based access control, and API integrations.",
    },
    {
      title: "Business Management Systems",
      icon: Building2,
      desc: "Internal operational software, ERP/CRM portals, workflow automation tools, and business analytics dashboards.",
    },
    {
      title: "Marketplace Platforms",
      icon: ShoppingCart,
      desc: "Multi-vendor digital marketplaces with complex user roles (customer, vendor, agent, admin) and transaction management.",
    },
    {
      title: "Booking & Service Platforms",
      icon: CalendarCheck,
      desc: "Real-time appointment scheduling, service request dispatching, and dynamic calendar availability systems.",
    },
    {
      title: "E-commerce Systems",
      icon: ShoppingBag,
      desc: "Scalable online stores with product catalogs, shopping carts, order tracking, and secure payment gateway integration.",
    },
    {
      title: "Real-time Applications",
      icon: Zap,
      desc: "Event-driven web apps with WebSockets and Socket.IO for live messaging, notifications, and real-time data sync.",
    },
    {
      title: "Admin Dashboards",
      icon: LayoutDashboard,
      desc: "Data-dense management panels featuring data tables, filtering, chart visualizations, and system control centers.",
    },
    {
      title: "AI-Powered Applications",
      icon: Bot,
      desc: "Web platforms integrated with AI model APIs, intelligent automation workflows, and conversational interfaces.",
    },
  ];

  return (
    <section id="capabilities" className="mb-20 sm:mb-24 scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8 flex flex-col items-center sm:items-start text-center sm:text-left"
      >
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF6014] mb-2">
          Product Solutions
        </span>
        <h2 className="text-[32px] sm:text-[38px] lg:text-[40px] font-black text-slate-900 tracking-tight leading-tight">
          What I <span className="text-[#FF6014]">Build</span>
        </h2>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal mt-2">
          Custom software solutions engineered to solve operational challenges, automate business processes, and scale web products.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {capabilities.map((cap, idx) => {
          const Icon = cap.icon;
          return (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
              className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-orange-300 transition-all duration-200 text-left shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#FF6014]">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                  {cap.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {cap.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}