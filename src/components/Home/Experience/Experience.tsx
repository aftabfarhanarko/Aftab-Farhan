"use client";
import React, { useState, useEffect, useRef } from "react";
import { Star, Briefcase } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Experience as ExperienceType } from "./types";
import ExperienceCard from "./ExperienceCard";
import SectionHeader from "@/components/Common/SectionHeader";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const leftPanelRef = useRef<HTMLDivElement | null>(null);

  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await fetch("/api/experience");
        if (res.ok) {
          const data = await res.json();
          setExperiences(data);
        }
      } catch (error) {
        console.error("Error fetching experiences:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  useEffect(() => {
    if (isLoading || !sectionRef.current || !leftPanelRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 90px",
          end: "bottom bottom",
          pin: leftPanelRef.current,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoading, experiences]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-[#FF6014] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (experiences.length === 0) return null;

  return (
    <section id="experience" ref={sectionRef} className="mb-20 sm:mb-24 scroll-mt-24 px-4 sm:px-6 lg:px-0 relative">
      <div className="grid lg:grid-cols-[340px_1fr] gap-10 lg:gap-16 items-start">
        {/* Left panel - GSAP Pin & Sticky */}
        <div ref={leftPanelRef} className="lg:sticky lg:top-24 self-start space-y-6 z-20">
          <SectionHeader
            badge="CAREER PATH"
            titlePrefix="Professional"
            titleHighlight="Experience"
            subtitle="A chronological timeline of my professional engineering journey, highlighting key technical positions and measurable achievements."
            align="left"
            icon={Star}
            className="mb-0"
          />

          <div className="p-5 rounded-2xl glass-card-primary text-left space-y-2 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FF6014]" />
            <div className="flex items-center gap-2 text-[#FF6014]">
              <Briefcase className="w-4 h-4 shrink-0" />
              <span className="text-xs font-black uppercase tracking-wider text-slate-900 font-mono">
                Engineering Proven Record
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              Delivering production-grade applications, driving performance optimization, and scaling technical infrastructure.
            </p>
          </div>
        </div>

        {/* Right timeline */}
        <div className="relative">
          {/* Vertical Glowing Gradient Line */}
          <div className="absolute left-5 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#FF6014] via-orange-400 to-slate-200 hidden sm:block opacity-80" />

          <div className="space-y-6">
            {experiences.map((exp) => (
              <ExperienceCard key={exp.id} exp={exp} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
