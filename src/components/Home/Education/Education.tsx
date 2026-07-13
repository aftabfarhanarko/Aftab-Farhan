"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import {
  GraduationCap,
  MapPin,
  BookOpen,
  Calendar,
  Library,
  Star,
  Loader2,
} from "lucide-react";

interface EducationData {
  id: string;
  degree: string;
  field: string;
  institution: string;
  shortName?: string;
  location: string;
  period: string;
  grade?: string;
}

function EducationCard({ edu }: { edu: EducationData }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, show: false });

  const glowColor = "rgba(255, 255, 255, 0.08)";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const tiltX = ((y - rect.height / 2) / (rect.height / 2)) * -5;
    const tiltY = ((x - rect.width / 2) / (rect.width / 2)) * 5;

    setTilt({ x: tiltX, y: tiltY });
    setSpotlight({ x, y, show: true });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setSpotlight({ x: 0, y: 0, show: false });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
      whileHover={{
        borderColor: "rgba(255, 255, 255, 0.12)",
        boxShadow: `0 20px 40px -15px ${glowColor}`,
      }}
      className="rounded-[2rem] border border-white/[0.06] bg-[#0E0E10]/85 backdrop-blur-xl overflow-hidden transition-all duration-300 relative text-left"
    >
      {/* Spotlight */}
      {spotlight.show && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(180px circle at ${spotlight.x}px ${spotlight.y}px, rgba(255,255,255,0.05), transparent 80%)`,
          }}
        />
      )}

      {/* Sweep Glare Shine */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1200ms] ease-out pointer-events-none" />

      {/* Top accent line */}
      <div className="h-[2px] w-full bg-white/20" />

      <div className="p-6 relative z-10">
        {/* Institution header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5" style={{ transform: "translateZ(25px)", transformStyle: "preserve-3d" }}>
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Spring graduation cap container */}
            <motion.div 
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 bg-white/[0.04] border border-white/[0.08] shadow-inner"
            >
              <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-white/90" />
            </motion.div>
            
            <div>
              <h3 className="text-base sm:text-xl font-bold text-white leading-tight">
                {edu.degree}
              </h3>
              <p className="text-xs sm:text-sm font-semibold mt-1 text-white/50">
                {edu.field}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-1.5 shrink-0 sm:w-auto w-full">
            {edu.grade && (
              <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold border border-white/20 text-white bg-white/[0.08]">
                {edu.grade}
              </span>
            )}
            <span className="text-xs font-semibold text-white/50 bg-white/[0.06] px-3 py-1 rounded-full border border-white/10 whitespace-nowrap flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {edu.period}
            </span>
          </div>
        </div>

        {/* Institution + location */}
        <div 
          style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}
          className="flex flex-wrap items-center gap-2 mb-2 text-xs font-semibold text-white/40"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>{edu.institution}</span>
          <span className="mx-1 text-white/20">•</span>
          <MapPin className="w-3.5 h-3.5" />
          <span>{edu.location}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Education() {
  const [activeTab] = useState<"education">("education");

  const { data: education, isLoading } = useQuery<EducationData[]>({
    queryKey: ["education"],
    queryFn: async () => {
      const res = await axios.get("/api/education");
      return res.data;
    },
  });

  return (
    <section
      id="education"
      className="mb-12 sm:mb-16 lg:mb-20 scroll-mt-24 px-4 sm:px-6 lg:px-0"
    >
      {/* Two-column layout */}
      <div className="grid lg:grid-cols-[320px_1fr] gap-10 lg:gap-16 items-start">
        {/* Left sticky panel */}
        <div className="lg:sticky lg:top-28 flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 mb-5">
            <Star className="w-3.5 h-3.5 text-white/50" />
            <span className="text-xs font-semibold text-white/50 uppercase tracking-widest">
              Qualifications
            </span>
          </div>

          <h2 className="text-2xl md:text-4xl font-black tracking-tight leading-none mb-4">
            <span className="text-foreground">My </span>
            <span className="text-foreground/25">Education</span>
          </h2>

          <p className="text-sm sm:text-base text-foreground/60 leading-relaxed mb-8 max-w-xs mx-auto lg:mx-0">
            Academic foundations that have shaped my technical expertise and growth.
          </p>

          {/* Continuous learning card */}
          <div className="mt-6 p-4 rounded-xl border border-white/10 bg-white/[0.03]">
            <div className="flex items-center gap-2 mb-2">
              <Library className="w-4 h-4 text-white/40" />
              <span className="text-xs font-bold text-white/40 uppercase tracking-wider">
                Continuous Learning
              </span>
            </div>
            <p className="text-xs text-white/50 leading-relaxed">
              Currently exploring advanced system architecture and cloud-native
              development practices.
            </p>
          </div>
        </div>

        {/* Right content */}
        <div>
          {/* Education Tab */}
          {activeTab === "education" && (
            <div className="space-y-5">
              {isLoading ? (
                <div className="flex justify-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-white/20" />
                </div>
              ) : education && education.length > 0 ? (
                education.map((edu) => (
                  <EducationCard key={edu.id} edu={edu} />
                ))
              ) : (
                <div className="text-center py-20 text-white/30 border border-dashed border-white/10 rounded-2xl">
                  No education data found.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}