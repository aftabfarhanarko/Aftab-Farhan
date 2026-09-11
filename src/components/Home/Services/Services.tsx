"use client";
import React from "react";
import { Layers, Rocket } from "lucide-react";
import { techStack, services, additionalServices } from "./servicesData";
import ServiceCard from "./ServiceCard";
import DevOpsWorkflow from "./ServiceCard";

const Services = () => {
  return (
    <section id="services" className="mb-20 sm:mb-24 scroll-mt-24">
      {/* Header */}
      <div className="flex flex-col items-center justify-center text-center sm:flex-row sm:items-center sm:justify-start sm:text-left gap-6 mb-10">
        <div className="flex flex-col items-center sm:items-start">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF6014] mb-2">
            Professional Offerings
          </span>
          <h2 className="text-[36px] sm:text-[44px] md:text-[48px] font-black text-slate-900 tracking-tight leading-tight">
            Digital Engineering <span className="text-[#FF6014]">Services</span>
          </h2>
        </div>
        <div className="h-px flex-1 bg-slate-200 hidden sm:block" />
      </div>

      {/* DevOps / Deployment Workflow */}
      <DevOpsWorkflow />

      {/* Extended Capabilities */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 mb-8 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-3">
          <Rocket size={20} className="text-[#FF6014]" />
          Extended Engineering Capabilities
        </h3>
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3">
          {additionalServices.map((service) => (
            <span
              key={service.label}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold bg-slate-50 border border-slate-200 rounded-xl text-slate-800 hover:border-orange-300 transition-all cursor-default justify-center sm:justify-start"
            >
              <span className="text-[#FF6014] shrink-0">{service.icon}</span>
              <span>{service.label}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;