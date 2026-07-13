"use client";
import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  tech: string[];
  color: string;
  borderColor: string;
  iconColor: string;
}

export default function ServiceCard({ service }: { service: Service }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, show: false });

  const glowColor = service.iconColor.includes("blue") ? "rgba(59,130,246,0.15)" :
                    service.iconColor.includes("green") ? "rgba(16,185,129,0.15)" :
                    service.iconColor.includes("amber") ? "rgba(245,158,11,0.15)" :
                    service.iconColor.includes("pink") ? "rgba(236,72,153,0.15)" :
                    service.iconColor.includes("purple") ? "rgba(139,92,246,0.15)" :
                    service.iconColor.includes("teal") ? "rgba(20,184,166,0.15)" :
                    "rgba(255,255,255,0.08)";

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
      className={`group relative rounded-[2rem] bg-gradient-to-br ${service.color} border border-white/[0.06] backdrop-blur-xl transition-all duration-300 overflow-hidden text-left`}
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

      <div className="p-7 relative z-10">
        
        {/* Spring icon container */}
        <motion.div 
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
          className={`w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] shadow-inner flex items-center justify-center mb-6 shrink-0 transition-all duration-300 ${service.iconColor}`}
          style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
        >
          {service.icon}
        </motion.div>

        {/* Title & Description */}
        <div style={{ transform: "translateZ(25px)", transformStyle: "preserve-3d" }} className="mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-2.5 group-hover:text-white transition-colors">
            {service.title}
          </h3>
          <p className="text-xs sm:text-[13px] text-white/50 leading-relaxed font-medium">
            {service.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }} className="mb-6">
          <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-3">
            Tech Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {service.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-xs font-semibold bg-white/[0.02] border border-white/[0.06] rounded-xl text-white/70 hover:text-white hover:bg-white/[0.06] hover:border-white/15 transition-all duration-150"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Features List */}
        <div
          style={{ transform: "translateZ(15px)", transformStyle: "preserve-3d" }}
          className="space-y-3"
        >
          <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">
            Key Features
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {service.features.slice(0, 6).map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-white/60 flex-shrink-0" />
                <span className="text-xs font-medium text-white/75">{feature}</span>
              </div>
            ))}
          </div>
          {service.features.length > 6 && (
            <p className="text-[11px] font-medium text-white/30 mt-2">
              +{service.features.length - 6} more features
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
