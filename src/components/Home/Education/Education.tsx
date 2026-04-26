"use client";
import React, { useState } from "react";
import {
  GraduationCap,
  Award,
  MapPin,
  BookOpen,
  CheckCircle2,
  Star,
  Calendar,
  BadgeCheck,
  Library,
} from "lucide-react";

const education = [
  {
    id: 1,
    degree: "Diploma in Engineering",
    field: "Computer Science & Technology",
    institution: "Rangpur Polytechnic Institute",
    shortName: "RPI",
    location: "Rangpur, Bangladesh",
    period: "2023 – Running",
    grade: "0",
    accent: "#6366F1",
  },
];

export default function Education() {
  const [activeTab, setActiveTab] = useState<"education" | "certifications">(
    "education",
  );

  return (
    <section
      id="education"
      className="mb-16 sm:mb-24 lg:mb-32 scroll-mt-24 px-4 sm:px-6 lg:px-0"
    >
      {/* ── Two-column layout ── */}
      <div className="grid lg:grid-cols-[320px_1fr] gap-10 lg:gap-16 items-start">
        {/* ── LEFT: sticky title panel ── */}
        <div className="lg:sticky lg:top-28">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-foreground/5 mb-5">
            <Star className="w-3.5 h-3.5 text-foreground/50" />
            <span className="text-xs font-semibold text-foreground/50 uppercase tracking-widest">
              Qualifications
            </span>
          </div>

          <h2 className=" text-3xl lg:text-5xl font-black tracking-tight leading-[1.05] mb-4">
            <span className="text-foreground">My </span>

            <span className="text-foreground/25">Education</span>
          </h2>

          <p className="text-sm sm:text-base text-foreground/50 leading-relaxed mb-8 max-w-xs">
            Academic foundations and professional certifications that have
            shaped my technical expertise and growth.
          </p>

          {/* Continuous learning card */}
          <div className="mt-6 p-4 rounded-xl border border-white/10 bg-foreground/[0.03]">
            <div className="flex items-center gap-2 mb-2">
              <Library className="w-4 h-4 text-foreground/40" />
              <span className="text-xs font-bold text-foreground/40 uppercase tracking-wider">
                Continuous Learning
              </span>
            </div>
            <p className="text-xs text-foreground/50 leading-relaxed">
              Currently exploring advanced system architecture and cloud-native
              development practices.
            </p>
          </div>
        </div>

        {/* ── RIGHT: content panel ── */}
        <div>
          {/* ── EDUCATION TAB ── */}
          {activeTab === "education" && (
            <div className="space-y-5">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="rounded-2xl border border-white/15 bg-foreground/[0.03] overflow-hidden"
                >
                  {/* Top accent line */}
                  <div
                    className="h-[2px] w-full"
                    style={{
                      background: `linear-gradient(90deg, ${edu.accent}, transparent)`,
                    }}
                  />

                  <div className="p-5 sm:p-6">
                    {/* Institution header */}
                    <div className="flex items-start justify-between gap-3 mb-5">
                      <div className="flex items-center gap-3 sm:gap-4">
                        {/* Logo */}
                        <div
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shrink-0 border"
                          style={{
                            background: `${edu.accent}18`,
                            borderColor: `${edu.accent}44`,
                          }}
                        >
                          <GraduationCap
                            className="w-6 h-6 sm:w-7 sm:h-7"
                            style={{ color: edu.accent }}
                          />
                        </div>
                        <div>
                          <h3 className="text-base sm:text-xl font-bold text-foreground leading-tight">
                            {edu.degree}
                          </h3>
                          <p
                            className="text-xs sm:text-sm font-medium mt-0.5"
                            style={{ color: edu.accent }}
                          >
                            {edu.field}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        <span
                          className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold border"
                          style={{
                            color: edu.accent,
                            borderColor: `${edu.accent}44`,
                            background: `${edu.accent}15`,
                          }}
                        >
                          {edu.grade}
                        </span>
                        <span className="text-xs font-semibold text-foreground/50 bg-foreground/[0.06] px-3 py-1 rounded-full border border-white/10 whitespace-nowrap flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {edu.period}
                        </span>
                      </div>
                    </div>

                    {/* Institution + location */}
                    <div className="flex flex-wrap items-center gap-2 mb-4 text-xs text-foreground/50">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{edu.institution}</span>
                      <span className="text-foreground/20">·</span>
                      <MapPin className="w-3 h-3" />
                      <span>{edu.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── CERTIFICATIONS TAB ── */}
          {activeTab === "certifications" && (
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="rounded-2xl border border-white/10 bg-foreground/[0.02] overflow-hidden hover:border-white/20 hover:bg-foreground/[0.05] transition-all duration-300 group"
                >
                  {/* Accent line */}
                  <div
                    className="h-[2px] w-full"
                    style={{
                      background: `linear-gradient(90deg, ${cert.accent}, transparent)`,
                    }}
                  />

                  <div className="p-4 sm:p-5">
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div
                        className="p-2.5 rounded-xl border shrink-0 group-hover:scale-110 transition-transform duration-300"
                        style={{
                          background: `${cert.accent}18`,
                          borderColor: `${cert.accent}44`,
                        }}
                      >
                        <BadgeCheck
                          className="w-5 h-5"
                          style={{ color: cert.accent }}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm sm:text-base font-bold text-foreground leading-tight">
                          {cert.title}
                        </h4>
                        <p className="text-xs text-foreground/50 mt-0.5">
                          {cert.issuer}
                        </p>

                        <div className="flex flex-wrap items-center gap-2 mt-3">
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                            style={{
                              color: cert.accent,
                              borderColor: `${cert.accent}44`,
                              background: `${cert.accent}15`,
                            }}
                          >
                            {cert.year}
                          </span>
                          <span className="text-[10px] text-foreground/35 truncate">
                            ID: {cert.credential}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* More certs note */}
              <div className="sm:col-span-2 p-4 rounded-xl border border-dashed border-white/15 flex items-center gap-3 text-foreground/40">
                <Award className="w-4 h-4 shrink-0" />
                <p className="text-xs sm:text-sm">
                  Continuously adding new certifications — always learning &
                  growing.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
