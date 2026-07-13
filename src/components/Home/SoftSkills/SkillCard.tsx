"use client";
import React, { useState, useEffect, useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface SubSkill {
  name: string;
  level: number;
}

interface SoftSkill {
  id: string;
  title: string;
  Icon: React.ElementType;
  level: number;
  description: string;
  subSkills: SubSkill[];
  examples: string[];
}

export function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export default function SkillCard({
  skill,
  delay = 0,
}: {
  skill: SoftSkill;
  delay?: number;
}) {
  const { ref, inView } = useInView(0.2);
  const { title, Icon, level, description, subSkills, examples } = skill;

  // States for 3D Tilt and Spotlight
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, show: false });

  // Custom glow color (we can make it violet/purple for a default premium vibe)
  const glowColor = "rgba(139,92,246,0.15)"; 

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const tiltX = ((y - rect.height / 2) / (rect.height / 2)) * -6;
    const tiltY = ((x - rect.width / 2) / (rect.width / 2)) * 6;

    setTilt({ x: tiltX, y: tiltY });
    setSpotlight({ x, y, show: true });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setSpotlight({ x: 0, y: 0, show: false });
  };

  return (
    <motion.div
      ref={ref}
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
      className="rounded-[2rem] border border-white/[0.06] bg-[#0E0E10]/85 backdrop-blur-xl transition-all duration-300 overflow-hidden text-left relative"
    >
      {/* Spotlight */}
      {spotlight.show && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(180px circle at ${spotlight.x}px ${spotlight.y}px, ${glowColor.replace("0.15", "0.08")}, transparent 80%)`,
          }}
        />
      )}

      {/* Sweep Glare Shine */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1200ms] ease-out pointer-events-none" />

      <div className="p-6 relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-5" style={{ transform: "translateZ(25px)", transformStyle: "preserve-3d" }}>
          
          {/* Spring icon rotation */}
          <motion.div 
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
            className="w-12 h-12 bg-white/[0.04] border border-white/[0.08] shadow-inner rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300"
          >
            <Icon className="w-5 h-5 text-white/90" />
          </motion.div>

          <div className="text-right">
            <div className="text-2xl sm:text-3xl font-black text-white leading-none">
              {level}%
            </div>
            <div className="text-[10px] sm:text-[11px] font-black text-white/30 uppercase tracking-wider mt-1">
              Proficiency
            </div>
          </div>
        </div>

        {/* Title & Description */}
        <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }} className="mb-5">
          <h3 className="text-base sm:text-lg font-bold text-white mb-2">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-white/50 leading-relaxed">
            {description}
          </p>
        </div>

        {/* 3 Progress Bars */}
        <div className="space-y-4 mb-6" style={{ transform: "translateZ(15px)", transformStyle: "preserve-3d" }}>
          {subSkills.map((sub, i) => (
            <div key={sub.name}>
              <div className="flex justify-between text-xs sm:text-sm mb-1.5 font-semibold">
                <span className="text-white/70">
                  {sub.name}
                </span>
                <span className="text-white/40">{sub.level}%</span>
              </div>
              <div className="h-2 bg-white/[0.03] border border-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                  style={{
                    width: inView ? `${sub.level}%` : "0%",
                    transition: `width 900ms cubic-bezier(0.4, 0, 0.2, 1) ${delay + i * 120}ms`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Real-World Examples */}
        <div 
          style={{ transform: "translateZ(10px)", transformStyle: "preserve-3d" }}
          className="mt-5 pt-4 border-t border-white/[0.06]"
        >
          <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-3">
            Real-World Application
          </p>
          <ul className="space-y-2">
            {examples.map((ex, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/40" />
                <span className="text-xs sm:text-[13px] text-white/70 leading-relaxed font-medium">
                  {ex}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
