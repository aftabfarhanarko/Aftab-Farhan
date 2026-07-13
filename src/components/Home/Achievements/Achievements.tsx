"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { Trophy, Award, Loader2, Star } from "lucide-react";

interface AchievementData {
  id: string;
  image: string;
  title: string;
  name: string;
  issuer: string;
  description: string;
}

function AchievementCard({ item }: { item: AchievementData }) {
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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
      whileHover={{
        borderColor: "rgba(255, 255, 255, 0.12)",
        boxShadow: "0 25px 50px -15px rgba(255, 255, 255, 0.05)",
      }}
      className="group relative flex flex-col rounded-[2rem] border border-white/[0.06] bg-[#0E0E10]/85 backdrop-blur-xl overflow-hidden transition-all duration-300 text-left"
    >
      {/* Spotlight */}
      {spotlight.show && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(220px circle at ${spotlight.x}px ${spotlight.y}px, rgba(255,255,255,0.05), transparent 80%)`,
          }}
        />
      )}

      {/* Sweep Glare Shine */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1200ms] ease-out pointer-events-none" />

      {/* Certificate Image Wrapper */}
      <div className="relative aspect-video w-full overflow-hidden bg-white/5 border-b border-white/[0.06]">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-all duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/10">
            <Trophy className="w-12 h-12" />
          </div>
        )}
        <div className="absolute top-4 left-4 w-8 h-8 rounded-lg bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/10">
          <Trophy className="w-4.5 h-4.5 text-amber-400" />
        </div>
      </div>

      {/* Details */}
      <div className="p-6 flex-1 flex flex-col justify-between" style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
        <div className="space-y-2.5">
          <span className="text-[10px] font-black text-white/30 uppercase tracking-widest font-mono block">
            {item.title}
          </span>
          <h3 className="text-lg sm:text-xl font-black text-white tracking-tight leading-tight pt-0.5">
            {item.issuer}
          </h3>
          <h4 className="text-xs sm:text-sm font-bold text-white/60 leading-snug group-hover:text-white/80 transition-colors">
            {item.name}
          </h4>
          <p className="text-xs text-white/40 leading-relaxed font-medium line-clamp-3">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Achievements() {
  const { data: achievements, isLoading } = useQuery<AchievementData[]>({
    queryKey: ["achievements"],
    queryFn: async () => {
      const res = await axios.get("/api/achievements");
      return res.data;
    },
  });

  return (
    <section
      id="achievements"
      className="mb-12 sm:mb-16 lg:mb-20 scroll-mt-24 px-4 sm:px-6 lg:px-0"
    >
      <div className="grid lg:grid-cols-[320px_1fr] gap-10 lg:gap-16 items-start">
        {/* Left Sticky Panel */}
        <div className="lg:sticky lg:top-28 flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 mb-5">
            <Star className="w-3.5 h-3.5 text-white/50" />
            <span className="text-xs font-semibold text-white/50 uppercase tracking-widest">
              Milestones
            </span>
          </div>

          <h2 className="text-2xl md:text-4xl font-black tracking-tight leading-none mb-4">
            <span className="text-foreground">Key </span>
            <span className="text-foreground/25">Achievements</span>
          </h2>

          <p className="text-sm sm:text-base text-foreground/60 leading-relaxed mb-8 max-w-xs mx-auto lg:mx-0">
            Certifications, awards, and credentials that validate my technical proficiency and career milestones.
          </p>

          <div className="mt-6 p-4 rounded-xl border border-white/10 bg-white/[0.03] text-left">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-white/40" />
              <span className="text-xs font-bold text-white/40 uppercase tracking-wider">
                Verifiable Credentials
              </span>
            </div>
            <p className="text-xs text-white/50 leading-relaxed">
              Every certification is backed by official digital badges and verify links.
            </p>
          </div>
        </div>

        {/* Right Grid */}
        <div>
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-white/20" />
            </div>
          ) : achievements && achievements.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((item) => (
                <AchievementCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-white/30 border border-dashed border-white/10 rounded-2xl">
              No achievements found.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
