"use client";
import React from "react";
import { Layers, Rocket } from "lucide-react";
import { techStack, services, additionalServices } from "./servicesData";
import ServiceCard from "./ServiceCard";

const Services = () => {
  return (
    <section id="services" className="mb-32 scroll-mt-24">
      {/* Header */}
      <div className="flex flex-col items-center justify-center text-center sm:flex-row sm:items-center sm:justify-start sm:text-left gap-6 mb-12">
        <div className="relative flex flex-col items-center sm:items-start">
          <h2 className="text-2xl md:text-4xl font-black text-foreground tracking-tight leading-none">
            All-in-One Digital Services Expert
          </h2>
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 w-20 h-1 bg-foreground rounded-full" />
        </div>
        <div className="h-px flex-1 bg-foreground/10 hidden sm:block" />
        <span className="text-sm font-mono text-foreground/40 hidden sm:block">
          &lt;what-i-do /&gt;
        </span>
      </div>

      {/* ── Tech Stack Banner ───────────────────────────────────────────── */}
      <div className="mb-12 p-6 rounded-2xl bg-foreground/5 border border-border">
        <div className="flex items-center gap-3 mb-4">
          <Layers size={18} className="text-foreground/60" />
          <p className="text-sm font-semibold text-foreground/60 uppercase tracking-wider">
            Technologies & Languages I Work With
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {techStack.map((t) => (
            <span
              key={t.name}
              className={`px-3 py-1.5 text-xs font-medium border rounded-lg ${t.color}`}
            >
              {t.name}
            </span>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      {/* Also Build */}
      <div className="p-8 rounded-2xl bg-foreground/5 border border-border mb-8">
        <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-3">
          <Rocket size={18} />
          Also Build
        </h3>
        <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2">
          {additionalServices.map((service) => (
            <span
              key={service.label}
              className="flex items-center gap-2 px-3 py-2 text-[10px] sm:text-sm bg-foreground/5 border border-border rounded-full text-foreground/70 hover:text-foreground hover:border-foreground/30 transition-colors cursor-default justify-center sm:justify-start"
            >
              <span className="opacity-60 flex-shrink-0">{service.icon}</span>
              <span className="truncate sm:overflow-visible sm:whitespace-normal">{service.label}</span>
            </span>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-8 p-8 rounded-2xl bg-gradient-to-r from-foreground/10 via-foreground/5 to-transparent border border-border">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Ready to start your project?
            </h3>
            <p className="text-foreground/60">
              Let's discuss your idea and turn it into a real product together.
            </p>
          </div>
          <button className="px-8 py-3 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-colors whitespace-nowrap">
            Get in Touch
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;