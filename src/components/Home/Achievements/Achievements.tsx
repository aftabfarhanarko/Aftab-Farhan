"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { Trophy, Loader2, Calendar, ExternalLink, CheckCircle2, ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/Common/SectionHeader";

interface AchievementData {
  id: string;
  image: string;
  title: string;
  name: string;
  issuer: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface AchievementCardProps {
  item: AchievementData;
}

function AchievementCard({ item }: AchievementCardProps) {
  const router = useRouter();
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = React.useState({ x: 0, y: 0, show: false });

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

  const handleNavigate = () => {
    router.push(`/achievements/${item.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onClick={handleNavigate}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor-parallax
      data-cursor-label="VIEW DETAILS ↗"
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="cursor-pointer group relative flex flex-col rounded-2xl glass-card-featured overflow-hidden transition-all duration-300 text-left hover:border-orange-300"
    >
      {/* Top Sweep Light Beam */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF6014]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

      {/* Radial Spotlight Follow */}
      {spotlight.show && (
        <div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(240px circle at ${spotlight.x}px ${spotlight.y}px, rgba(255, 96, 20, 0.08), transparent 80%)`,
          }}
        />
      )}

      {/* Certificate Thumbnail Frame */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-50 border-b border-slate-100 group/img">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover object-top group-hover:scale-106 transition-all duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300 bg-orange-50/30">
            <Trophy className="w-12 h-12 text-[#FF6014]/40" />
          </div>
        )}
        
        {/* Top Trophy Tag */}
        <div className="absolute top-3.5 left-3.5 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md flex items-center gap-1.5 border border-slate-200 text-[#FF6014] text-xs font-bold shadow-md z-10">
          <Trophy className="w-3.5 h-3.5 text-[#FF6014]" />
          <span>Verified Certificate</span>
        </div>

        {/* Hover View Full Overlay */}
        <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-10">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF6014] text-white text-xs font-bold shadow-xl transform translate-y-3 group-hover:translate-y-0 transition-all duration-300">
            <span>View Full Details</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between" style={{ transform: "translateZ(15px)", transformStyle: "preserve-3d" }}>
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-black text-[#FF6014] uppercase tracking-widest block font-mono">
              {item.title || "Certification"}
            </span>

            {item.startDate && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full shadow-2xs">
                <Calendar className="w-3 h-3 text-slate-500 shrink-0" />
                {item.startDate} {item.endDate ? `– ${item.endDate}` : ""}
              </span>
            )}
          </div>

          <div className="flex items-start justify-between gap-2">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug group-hover:text-[#FF6014] transition-colors">
              {item.issuer}
            </h3>
            <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-[#FF6014] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
          </div>

          <h4 className="text-sm sm:text-base font-bold text-slate-800 leading-snug">
            {item.name}
          </h4>

          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium line-clamp-2 text-justify">
            {item.description}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-slate-600 uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            Verified Credential
          </span>
          <span className="text-xs font-bold text-[#FF6014] group-hover:underline flex items-center gap-1">
            Details &rarr;
          </span>
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
      className="mb-20 sm:mb-24 scroll-mt-24 w-full"
    >
      {/* Header & Section Metrics */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-200/80">
        <SectionHeader
          badge="OFFICIAL QUALIFICATIONS & CERTIFICATIONS"
          titlePrefix="Recognitions &"
          titleHighlight="Milestones"
          subtitle="A curated showcase of verified technical certifications, competitive engineering honors, and industry qualifications."
          align="left"
          icon={Trophy}
          className="mb-0"
        />

        {/* Verified Certificate Stat Badge */}
        <div className="shrink-0 flex items-center gap-4 p-4 rounded-2xl bg-orange-50/60 border border-orange-200/80 shadow-2xs">
          <div className="p-3 rounded-xl bg-[#FF6014] text-white shadow-md">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 font-mono tracking-tight">
              {achievements ? String(achievements.length).padStart(2, "0") : "00"}
            </div>
            <div className="text-[11px] font-mono font-extrabold text-[#FF6014] uppercase tracking-wider">
              Verified Credentials
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Achievement Cards */}
      <div>
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#FF6014]" />
          </div>
        ) : achievements && achievements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((item) => (
              <AchievementCard
                key={item.id}
                item={item}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-500 border border-dashed border-dashed border-slate-300 rounded-3xl bg-slate-50/50">
            No achievements found.
          </div>
        )}
      </div>
    </section>
  );
}
