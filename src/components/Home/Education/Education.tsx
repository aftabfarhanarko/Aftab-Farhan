
"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
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
        <div className="lg:sticky lg:top-28">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/10 dark:border-white/15 bg-black/[0.03] dark:bg-white/5 mb-5">
            <Star className="w-3.5 h-3.5 text-black/40 dark:text-white/50" />
            <span className="text-xs font-semibold text-black/50 dark:text-white/50 uppercase tracking-widest">
              Qualifications
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-none mb-4">
            <span className="text-foreground">My </span>
            <span className="text-foreground/25">Education</span>
          </h2>

          <p className="text-sm sm:text-base text-foreground/60 leading-relaxed mb-8 max-w-xs">
            Academic foundations that have shaped my technical expertise and growth.
          </p>

          {/* Continuous learning card */}
          <div className="mt-6 p-4 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.03]">
            <div className="flex items-center gap-2 mb-2">
              <Library className="w-4 h-4 text-black/40 dark:text-white/40" />
              <span className="text-xs font-bold text-foreground/40 uppercase tracking-wider">
                Continuous Learning
              </span>
            </div>
            <p className="text-xs text-black/50 dark:text-white/50 leading-relaxed">
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
                  <Loader2 className="w-8 h-8 animate-spin text-black/20 dark:text-white/20" />
                </div>
              ) : education && education.length > 0 ? (
                education.map((edu) => (
                  <div
                    key={edu.id}
                    className="rounded-2xl border border-black/10 dark:border-white/15 bg-black/[0.02] dark:bg-white/[0.03] overflow-hidden"
                  >
                    {/* Top accent line (monochrome) */}
                    <div className="h-[2px] w-full bg-black dark:bg-white opacity-20" />

                    <div className="p-5 sm:p-6">
                      {/* Institution header */}
                      <div className="flex items-start justify-between gap-3 mb-5">
                        <div className="flex items-center gap-3 sm:gap-4">
                          {/* Logo placeholder */}
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shrink-0 bg-black/[0.08] dark:bg-white/[0.08] border border-black/10 dark:border-white/10">
                            <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-black/70 dark:text-white/70" />
                          </div>
                          <div>
                            <h3 className="text-base sm:text-xl font-bold text-foreground leading-tight">
                              {edu.degree}
                            </h3>
                            <p className="text-xs sm:text-sm font-medium mt-0.5 text-black/60 dark:text-white/60">
                              {edu.field}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-1.5 shrink-0">
                          {edu.grade && (
                            <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold border border-black/10 dark:border-white/20 text-foreground bg-black/[0.06] dark:bg-white/[0.08]">
                              {edu.grade}
                            </span>
                          )}
                          <span className="text-xs font-semibold text-black/50 dark:text-white/50 bg-black/[0.05] dark:bg-white/[0.06] px-3 py-1 rounded-full border border-black/10 dark:border-white/10 whitespace-nowrap flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {edu.period}
                          </span>
                        </div>
                      </div>

                      {/* Institution + location */}
                      <div className="flex flex-wrap items-center gap-2 mb-4 text-xs text-black/50 dark:text-white/50">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{edu.institution}</span>
                        <span className="text-black/20 dark:text-white/20">Â·</span>
                        <MapPin className="w-3 h-3" />
                        <span>{edu.location}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 text-black/30 dark:text-white/30 border border-dashed border-black/10 dark:border-white/10 rounded-2xl">
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