"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { Project, itemVariants } from "./types";

interface AboutHighlightsProps {
  projects: Project[];
  quoteText: string;
  quoteAuthor: string;
  mentorTitle: string;
  mentorDescription: string;
}

// 3D Tilt Card Wrapper for Recent Projects
function ProjectsCard({ projects }: { projects: Project[] }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, show: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const tiltX = ((y - rect.height / 2) / (rect.height / 2)) * -4;
    const tiltY = ((x - rect.width / 2) / (rect.width / 2)) * 4;

    setTilt({ x: tiltX, y: tiltY });
    setSpotlight({ x, y, show: true });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setSpotlight({ x: 0, y: 0, show: false });
  };

  return (
    <motion.div
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
      whileHover={{
        borderColor: "rgba(255, 255, 255, 0.12)",
        boxShadow: "0 20px 40px -15px rgba(255, 255, 255, 0.05)",
      }}
      className="rounded-3xl border border-white/[0.06] bg-[#0E0E10]/80 backdrop-blur-xl overflow-hidden text-left relative transition-all duration-300"
    >
      {/* Spotlight */}
      {spotlight.show && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(180px circle at ${spotlight.x}px ${spotlight.y}px, rgba(255,255,255,0.04), transparent 80%)`,
          }}
        />
      )}

      {/* Sweep Glare Shine */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1200ms] ease-out pointer-events-none" />

      <div className="px-5 py-4 border-b border-white/[0.06] relative z-10" style={{ transform: "translateZ(20px)" }}>
        <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">
          Recent Projects
        </p>
      </div>
      <div className="divide-y divide-white/[0.05] relative z-10" style={{ transform: "translateZ(15px)" }}>
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="px-5 py-4 hover:bg-white/[0.02] transition-colors"
          >
            <p className="text-xs sm:text-[13px] font-bold text-white mb-1.5">
              {project.title}
            </p>
            <p className="text-xs text-white/50 leading-relaxed font-medium">
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// 3D Tilt Card Wrapper for Mentor info
function MentorCard({ title, description }: { title: string; description: string }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, show: false });

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
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
      whileHover={{
        borderColor: "rgba(255, 255, 255, 0.12)",
        boxShadow: "0 15px 30px -10px rgba(255, 255, 255, 0.05)",
      }}
      className="flex items-center gap-3.5 rounded-[1.5rem] border border-white/[0.06] bg-[#0E0E10]/80 backdrop-blur-xl px-5 py-4 text-left relative transition-all duration-300 overflow-hidden"
    >
      {/* Spotlight */}
      {spotlight.show && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(120px circle at ${spotlight.x}px ${spotlight.y}px, rgba(255,255,255,0.04), transparent 80%)`,
          }}
        />
      )}

      {/* Sweep Glare Shine */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1200ms] ease-out pointer-events-none" />

      {/* Spring icon rotate */}
      <motion.div 
        whileHover={{ scale: 1.1, rotate: 360 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
        className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] shadow-inner flex items-center justify-center shrink-0"
        style={{ transform: "translateZ(20px)" }}
      >
        <Users
          size={16}
          className="text-white/80"
          strokeWidth={1.5}
        />
      </motion.div>
      <div style={{ transform: "translateZ(15px)" }}>
        <p className="text-sm font-bold text-white mb-1">
          {title}
        </p>
        <p className="text-xs text-white/50 leading-relaxed font-medium">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default function AboutHighlights({
  projects,
  quoteText,
  quoteAuthor,
  mentorTitle,
  mentorDescription,
}: AboutHighlightsProps) {
  return (
    <>
      {/* Recent Projects card */}
      {projects.length > 0 && (
        <ProjectsCard projects={projects} />
      )}

      {/* Quote */}
      {quoteText && (
        <motion.div
          variants={itemVariants}
          className="border-l-2 border-white/20 bg-white/[0.02] px-5 py-4.5 rounded-r-2xl text-left hover:border-white/40 hover:bg-white/[0.04] transition-all duration-300"
        >
          <blockquote className="text-xs sm:text-sm text-white/60 italic font-light leading-relaxed">
            &ldquo;{quoteText}&rdquo;
          </blockquote>
          {quoteAuthor && (
            <p className="text-right text-[10px] text-white/35 mt-2 tracking-wide font-mono uppercase">
              {quoteAuthor}
            </p>
          )}
        </motion.div>
      )}

      {/* Mentor */}
      {mentorTitle && (
        <MentorCard title={mentorTitle} description={mentorDescription} />
      )}
    </>
  );
}
