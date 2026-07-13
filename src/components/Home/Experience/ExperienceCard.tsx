"use client";
import React, { useState } from "react";
import { Experience } from "./types";
import { motion } from "framer-motion";
import {
  ExperienceHeader,
  ExperienceRoles,
  ExperienceAchievements,
} from "./ExperienceComponents";

interface ExperienceCardProps {
  exp: Experience;
}

export default function ExperienceCard({ exp }: ExperienceCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, show: false });

  const glowColor = exp.type === "current" ? "rgba(59,130,246,0.15)" : "rgba(255,255,255,0.08)";

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
    <div key={exp.id} className="relative sm:pl-14 mb-8">
      {/* Timeline dot (monochrome) with pulse/scale when container hovered */}
      <div
        className="absolute left-5 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 border-white bg-white hidden sm:block shadow-[0_0_12px_rgba(255,255,255,0.3)] transition-all duration-300 z-10"
        style={{ 
          top: "1.75rem",
          transform: spotlight.show ? "translateX(-50%) scale(1.3)" : "translateX(-50%) scale(1)" 
        }}
      />

      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: "preserve-3d",
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
        whileHover={{
          borderColor: "rgba(255, 255, 255, 0.12)",
          boxShadow: `0 25px 50px -12px ${glowColor}`,
        }}
        className={`rounded-[2rem] border overflow-hidden transition-all duration-300 relative bg-[#0E0E10]/85 backdrop-blur-xl ${
          exp.type === "current"
            ? "border-blue-500/20"
            : "border-white/[0.06]"
        }`}
      >
        {/* Spotlight */}
        {spotlight.show && (
          <div
            className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
            style={{
              background: `radial-gradient(200px circle at ${spotlight.x}px ${spotlight.y}px, ${glowColor.replace("0.15", "0.08")}, transparent 80%)`,
            }}
          />
        )}

        {/* Sweep Glare Shine */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1200ms] ease-out pointer-events-none" />

        {/* Top accent line */}
        <div className={`h-[2px] w-full ${exp.type === "current" ? "bg-blue-500/40" : "bg-white/20"}`} />

        <div className="p-6 sm:p-7 relative z-10">
          <div style={{ transform: "translateZ(25px)", transformStyle: "preserve-3d" }}>
            <ExperienceHeader exp={exp} />
          </div>

          <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
            <ExperienceRoles roles={exp.roles} />
          </div>

          {/* Tech Stack */}
          {exp.techStack && exp.techStack.length > 0 && (
            <div 
              style={{ transform: "translateZ(15px)", transformStyle: "preserve-3d" }}
              className="mt-6 pt-4 border-t border-white/[0.06]"
            >
              <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-3">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {exp.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-xs font-semibold bg-white/[0.02] border border-white/[0.06] rounded-xl text-white/70 hover:text-white hover:bg-white/[0.06] hover:border-white/15 transition-all duration-150"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {exp.achievements && exp.achievements.length > 0 && (
            <div style={{ transform: "translateZ(10px)", transformStyle: "preserve-3d" }}>
              <ExperienceAchievements achievements={exp.achievements} />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
