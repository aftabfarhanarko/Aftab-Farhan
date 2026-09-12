"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Loader2, Star, Calendar, X, ExternalLink, CheckCircle2, ArrowUpRight } from "lucide-react";

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
  onClick: () => void;
}

function AchievementCard({ item, onClick }: AchievementCardProps) {
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor-parallax
      data-parallax-speed="8"
      data-parallax-scale="1.03"
      data-cursor-label="CERTIFICATE ↗"
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
        <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-10">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF6014] text-white text-xs font-bold shadow-xl transform translate-y-3 group-hover:translate-y-0 transition-all duration-300">
            <span>View Full Certificate</span>
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
  const [selectedItem, setSelectedItem] = useState<AchievementData | null>(null);

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
      className="mb-20 sm:mb-24 scroll-mt-24 px-4 sm:px-6 lg:px-0"
    >
      <div className="grid lg:grid-cols-[320px_1fr] gap-10 lg:gap-16 items-start">
        {/* Left Panel */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 text-[#FF6014] text-xs font-bold shadow-sm">
            <Star className="w-3.5 h-3.5 text-[#FF6014] animate-pulse" />
            <span>Official Qualifications</span>
          </div>

          <h2 className="text-[32px] sm:text-[38px] lg:text-[42px] font-black tracking-tight leading-tight text-slate-900">
            Certifications &amp; <span className="text-[#FF6014]">Achievements</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-medium max-w-xs mx-auto lg:mx-0">
            Official certifications, engineering courses, and technical achievements validating full stack software capabilities.
          </p>
        </div>

        {/* Right Grid */}
        <div>
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-[#FF6014]" />
            </div>
          ) : achievements && achievements.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((item) => (
                <AchievementCard
                  key={item.id}
                  item={item}
                  onClick={() => setSelectedItem(item)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-slate-500 border border-dashed border-slate-300 rounded-3xl bg-slate-50/50">
              No achievements found.
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-slate-900/65 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:grid md:grid-cols-[1.2fr_1fr] max-h-[85vh] md:max-h-[80vh] text-left z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 p-2.5 bg-white/90 hover:bg-slate-100 text-slate-700 hover:text-slate-900 rounded-xl border border-slate-200 transition-all cursor-pointer shadow-md"
              >
                <X className="w-4.5 h-4.5" />
              </button>

              {/* Left: Full Image */}
              <div className="relative bg-slate-50 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-200 overflow-hidden min-h-[260px] md:min-h-[480px]">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-full object-contain max-h-[40vh] md:max-h-[75vh] p-4"
                />
              </div>

              {/* Right: Info */}
              <div className="p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[45vh] md:max-h-[80vh]">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs font-black text-[#FF6014] uppercase tracking-widest font-mono">
                      {selectedItem.title}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                      {selectedItem.issuer}
                    </h3>
                    <h4 className="text-base font-bold text-slate-800">
                      {selectedItem.name}
                    </h4>
                  </div>

                  {selectedItem.startDate && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-800">
                      <Calendar className="w-3.5 h-3.5 text-[#FF6014]" />
                      <span>
                        {selectedItem.startDate} {selectedItem.endDate ? `– ${selectedItem.endDate}` : ""}
                      </span>
                    </div>
                  )}

                  <div className="h-px bg-slate-100 my-4" />

                  <div className="space-y-2">
                    <span className="text-xs font-black text-slate-700 uppercase tracking-widest font-mono block">
                      Credential Details
                    </span>
                    <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium whitespace-pre-line">
                      {selectedItem.description}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="px-6 py-2.5 bg-[#FF6014] text-white hover:bg-[#E5530F] active:scale-[0.98] transition-all rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md"
                  >
                    Close Viewer
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
