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
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
      whileHover={{
        borderColor: "rgba(234, 88, 12, 0.3)",
        boxShadow: "0 20px 40px -15px rgba(234, 88, 12, 0.12)",
      }}
      className="cursor-pointer group relative flex flex-col rounded-[2rem] border border-slate-200 bg-white overflow-hidden transition-all duration-300 text-left shadow-lg"
    >
      {/* Spotlight */}
      {spotlight.show && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(220px circle at ${spotlight.x}px ${spotlight.y}px, rgba(234,88,12,0.06), transparent 80%)`,
          }}
        />
      )}

      {/* Sweep Glare Shine */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-orange-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1200ms] ease-out pointer-events-none" />

      {/* Sleek Certificate Frame */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50 border-b border-slate-100 group/img">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300">
            <Trophy className="w-12 h-12" />
          </div>
        )}
        
        {/* Top Trophy Badge */}
        <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-xl bg-white/90 backdrop-blur-md flex items-center gap-1.5 border border-slate-200 text-amber-600 text-xs font-bold shadow-md">
          <Trophy className="w-3.5 h-3.5 text-amber-500" />
          <span>Certificate</span>
        </div>

        {/* Hover View Hint */}
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
            Click to View Full Certificate
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="p-6 flex-1 flex flex-col justify-between" style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest block font-mono">
              {item.title || "Certification"}
            </span>

            {item.startDate && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-md shadow-xs">
                <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                {item.startDate} {item.endDate ? `– ${item.endDate}` : ""}
              </span>
            )}
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug group-hover:text-orange-600 transition-colors">
            {item.issuer}
          </h3>

          <h4 className="text-sm sm:text-base font-bold text-slate-700 leading-snug">
            {item.name}
          </h4>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium line-clamp-3">
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
        <div className="lg:sticky lg:top-28 flex flex-col items-center text-center lg:items-start lg:text-left space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/10 text-orange-600 text-xs font-bold shadow-xs">
            <Star className="w-3.5 h-3.5 text-orange-600" />
            <span>Credentials</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-slate-900">
            Certifications &amp; <span className="text-orange-600">Achievements</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium max-w-xs mx-auto lg:mx-0">
            Official certifications and technical course credentials validating my web development expertise.
          </p>
        </div>

        {/* Right Grid */}
        <div>
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
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
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:grid md:grid-cols-[1.2fr_1fr] max-h-[85vh] md:max-h-[80vh] text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 rounded-xl border border-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
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
                    <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest font-mono">
                      {selectedItem.title}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                      {selectedItem.issuer}
                    </h3>
                    <h4 className="text-base font-bold text-slate-700">
                      {selectedItem.name}
                    </h4>
                  </div>

                  {selectedItem.startDate && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>
                        {selectedItem.startDate} {selectedItem.endDate ? `– ${selectedItem.endDate}` : ""}
                      </span>
                    </div>
                  )}

                  <div className="h-px bg-slate-100 my-4" />

                  <div className="space-y-2">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest font-mono block">
                      Credential Details
                    </span>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium whitespace-pre-line">
                      {selectedItem.description}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="px-6 py-2.5 bg-orange-600 text-white hover:bg-orange-700 active:scale-[0.98] transition-all rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md"
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
