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
    period: "2016 – 2020",
    grade: "CGPA 3.75 / 4.00",
    accent: "#6366F1",
    description:
      "Comprehensive diploma program covering computer programming, database management, networking, and software development fundamentals.",
    achievements: [
      "Specialized in Software Engineering & Development",
      "Completed final year project on E-Commerce Platform",
      "Active member of Programming Club",
      "Participated in National Hackathon 2019",
    ],
    courses: [
      "Programming in C & C++",
      "Data Structures & Algorithms",
      "Database Management Systems",
      "HTML, CSS, JavaScript",
      "Computer Networking",
      "Object-Oriented Programming",
      "Software Engineering",
      "Operating Systems",
    ],
  },
];

const certifications = [
  {
    id: 1,
    title: "Full Stack Development",
    issuer: "Programming Hero",
    year: "2021",
    credential: "PH-MERN-2021-089",
    accent: "#10B981",
  },
  {
    id: 2,
    title: "Advanced React & Next.js",
    issuer: "Udemy",
    year: "2022",
    credential: "UD-REACT-2022-156",
    accent: "#3B82F6",
  },
  {
    id: 3,
    title: "Node.js & Express Mastery",
    issuer: "Coursera",
    year: "2022",
    credential: "CO-NODE-2022-234",
    accent: "#F59E0B",
  },
  {
    id: 4,
    title: "TypeScript for Professionals",
    issuer: "Udemy",
    year: "2023",
    credential: "UD-TS-2023-078",
    accent: "#3178C6",
  },
];

export default function Education() {
  const [activeTab, setActiveTab] = useState<"education" | "certifications">("education");

  return (
    <section id="education" className="mb-16 sm:mb-24 lg:mb-32 scroll-mt-24 px-4 sm:px-6 lg:px-0">

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

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] mb-4">
            <span className="text-foreground">My</span>
            <br />
            <span className="text-foreground/25">Education</span>
          </h2>

          <p className="text-sm sm:text-base text-foreground/50 leading-relaxed mb-8 max-w-xs">
            Academic foundations and professional certifications that have shaped my technical expertise and growth.
          </p>

          {/* Mini stats */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {[
              { v: "4yr", l: "Diploma" },
              { v: "4+", l: "Certs" },
              { v: "3.75", l: "CGPA" },
              { v: "2020", l: "Graduated" },
            ].map(({ v, l }) => (
              <div
                key={l}
                className="p-3 rounded-xl bg-foreground/[0.04] border border-white/10 text-center"
              >
                <div className="text-xl font-black text-foreground">{v}</div>
                <div className="text-[10px] font-medium text-foreground/40 uppercase tracking-wide mt-0.5">
                  {l}
                </div>
              </div>
            ))}
          </div>

          {/* Tab switcher */}
          <div className="flex flex-col gap-1">
            {[
              { id: "education", label: "Academic Education", Icon: GraduationCap },
              { id: "certifications", label: "Certifications", Icon: Award },
            ].map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as typeof activeTab)}
                className={`text-left flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeTab === id
                    ? "bg-foreground text-background"
                    : "text-foreground/50 hover:text-foreground hover:bg-foreground/5"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>

          {/* Continuous learning card */}
          <div className="mt-6 p-4 rounded-xl border border-white/10 bg-foreground/[0.03]">
            <div className="flex items-center gap-2 mb-2">
              <Library className="w-4 h-4 text-foreground/40" />
              <span className="text-xs font-bold text-foreground/40 uppercase tracking-wider">
                Continuous Learning
              </span>
            </div>
            <p className="text-xs text-foreground/50 leading-relaxed">
              Currently exploring advanced system architecture and cloud-native development practices.
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
                    style={{ background: `linear-gradient(90deg, ${edu.accent}, transparent)` }}
                  />

                  <div className="p-5 sm:p-6">
                    {/* Institution header */}
                    <div className="flex items-start justify-between gap-3 mb-5">
                      <div className="flex items-center gap-3 sm:gap-4">
                        {/* Logo */}
                        <div
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shrink-0 border"
                          style={{ background: `${edu.accent}18`, borderColor: `${edu.accent}44` }}
                        >
                          <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: edu.accent }} />
                        </div>
                        <div>
                          <h3 className="text-base sm:text-xl font-bold text-foreground leading-tight">
                            {edu.degree}
                          </h3>
                          <p className="text-xs sm:text-sm font-medium mt-0.5" style={{ color: edu.accent }}>
                            {edu.field}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        <span
                          className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold border"
                          style={{ color: edu.accent, borderColor: `${edu.accent}44`, background: `${edu.accent}15` }}
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

                    <p className="text-xs sm:text-sm text-foreground/60 leading-relaxed mb-5">
                      {edu.description}
                    </p>

                    {/* Achievements */}
                    <div className="mb-5">
                      <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest mb-3">
                        Key Achievements
                      </p>
                      <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2">
                        {edu.achievements.map((a, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle2
                              className="w-3.5 h-3.5 mt-0.5 shrink-0"
                              style={{ color: edu.accent }}
                            />
                            <span className="text-xs sm:text-sm text-foreground/65 leading-relaxed">{a}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Courses */}
                    <div className="pt-4 border-t border-white/8">
                      <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest mb-3">
                        Relevant Coursework
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {edu.courses.map((c, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 text-[11px] sm:text-xs font-medium bg-foreground/[0.05] border border-white/10 rounded-lg text-foreground/60 hover:text-foreground hover:border-white/25 transition-all"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Summary footer */}
              <div className="p-4 sm:p-5 rounded-xl bg-foreground/[0.03] border border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-500/15 border border-indigo-500/20">
                    <GraduationCap className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-foreground">
                      Diploma in Computer Science & Technology
                    </p>
                    <p className="text-[10px] sm:text-xs text-foreground/40">
                      Rangpur Polytechnic Institute · 2016–2020
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1.5 bg-indigo-500/15 text-indigo-400 border border-indigo-500/25 rounded-full text-xs font-bold">
                  CGPA 3.75 / 4.00
                </span>
              </div>
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
                    style={{ background: `linear-gradient(90deg, ${cert.accent}, transparent)` }}
                  />

                  <div className="p-4 sm:p-5">
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div
                        className="p-2.5 rounded-xl border shrink-0 group-hover:scale-110 transition-transform duration-300"
                        style={{ background: `${cert.accent}18`, borderColor: `${cert.accent}44` }}
                      >
                        <BadgeCheck className="w-5 h-5" style={{ color: cert.accent }} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm sm:text-base font-bold text-foreground leading-tight">
                          {cert.title}
                        </h4>
                        <p className="text-xs text-foreground/50 mt-0.5">{cert.issuer}</p>

                        <div className="flex flex-wrap items-center gap-2 mt-3">
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                            style={{ color: cert.accent, borderColor: `${cert.accent}44`, background: `${cert.accent}15` }}
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
                  Continuously adding new certifications — always learning & growing.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}