"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Award, Loader2, Star, Calendar, X } from "lucide-react";

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
      onClick={onClick}
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
      className="cursor-pointer group relative flex flex-col rounded-[2rem] border border-white/[0.06] bg-[#0E0E10]/85 backdrop-blur-xl overflow-hidden transition-all duration-300 text-left"
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
      <div className="relative aspect-video w-full overflow-hidden bg-white/5 border-b border-white/[0.06] flex items-center justify-center p-3">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-contain rounded-lg group-hover:scale-[1.02] transition-all duration-700"
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
          <div className="flex flex-wrap items-center gap-2 pt-0.5">
            <h3 className="text-lg sm:text-xl font-black text-white tracking-tight leading-none">
              {item.issuer}
            </h3>
            {item.startDate && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-white/40 font-mono bg-white/[0.04] border border-white/[0.06] px-1.5 py-0.5 rounded-md">
                <Calendar className="w-2.5 h-2.5 text-white/35 shrink-0" />
                {item.startDate} {item.endDate ? `– ${item.endDate}` : ""}
              </span>
            )}
          </div>
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
                <AchievementCard
                  key={item.id}
                  item={item}
                  onClick={() => setSelectedItem(item)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-white/30 border border-dashed border-white/10 rounded-2xl">
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
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="relative w-full max-w-4xl bg-[#09090b] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:grid md:grid-cols-[1.2fr_1fr] max-h-[85vh] md:max-h-[80vh] text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 p-2.5 bg-black/60 hover:bg-black/80 text-white/50 hover:text-white rounded-xl border border-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left: Full Image */}
              <div className="relative bg-[#020202] flex items-center justify-center border-b md:border-b-0 md:border-r border-white/10 overflow-hidden min-h-[260px] md:min-h-[480px]">
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
                    <span className="text-[10px] font-black text-white/30 uppercase tracking-widest font-mono">
                      {selectedItem.title}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                      {selectedItem.issuer}
                    </h3>
                    <h4 className="text-sm font-bold text-white/70">
                      {selectedItem.name}
                    </h4>
                  </div>

                  {selectedItem.startDate && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 text-[11px] font-bold text-white/60 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-white/40" />
                      <span>
                        {selectedItem.startDate} {selectedItem.endDate ? `– ${selectedItem.endDate}` : ""}
                      </span>
                    </div>
                  )}

                  <div className="h-px bg-white/10 my-4" />

                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-white/30 uppercase tracking-widest font-mono block">
                      Credential Details
                    </span>
                    <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-medium whitespace-pre-line">
                      {selectedItem.description}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex justify-end">
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="px-6 py-2.5 bg-white text-black hover:scale-[1.02] active:scale-[0.98] transition-all rounded-xl font-black text-xs uppercase tracking-wider cursor-pointer"
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
