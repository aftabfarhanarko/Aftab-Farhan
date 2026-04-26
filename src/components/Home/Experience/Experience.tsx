"use client";
import React, { useState } from "react";
import {
  Shield,
  ClipboardList,
  Code2,
  CheckCircle2,
  MapPin,
  ExternalLink,
  Briefcase,
  Star,
} from "lucide-react";

const experiences = [
  {
    id: 1,
    company: "NexoviaSoft",
    logo: "N",
    logoColor: "#6366F1",
    url: "https://www.nexoviasoft.com",
    location: "Ragpur, Bangladesh",
    period: "2026 – Present",
    type: "current",
    roles: [
      {
        title: "Chief Operating Officer",
        subtitle: "COO · Full-time",
        Icon: Shield,
        responsibilities: [
          "Led daily operations and strategic planning for company growth",
          "Managed cross-functional teams including development, design, and marketing",
          "Optimized workflow processes resulting in 40% faster project delivery",
          "Oversaw resource allocation and budget management for 9+ projects",
          "Established company policies and operational frameworks",
          "Drove business development and client relationship management",
        ],
      },
      {
        title: "Senior Project Manager",
        subtitle: "Project Management · Full-time",
        Icon: ClipboardList,
        responsibilities: [
          "Managed end-to-end delivery of 30+ enterprise web development projects",
          "Coordinated between clients and technical teams for clear communication",
          "Implemented Agile/Scrum methodologies for efficient project execution",
          "Monitored project timelines, milestones, and deliverables",
          "Conducted quality assurance and ensured premium solution delivery",
          "Led client meetings, requirement gathering, and project planning sessions",
        ],
      },
    ],
    techStack: [
      "React",
      "Typescript",
      "Next.js",
      "Node.js",
      "MongoDB",
      "PostgreSQL",
    ],
    achievements: [
      { metric: "9+", label: "Projects Delivered" },
      { metric: "60%", label: "Efficiency Increase" },
      { metric: "8+", label: "Enterprise Clients" },
      { metric: "8+", label: "Team Members" },
    ],
  },
  // {
  //   id: 2,
  //   company: "TechSolutions Ltd",
  //   logo: "T",
  //   logoColor: "#10B981",
  //   url: "#",
  //   location: "Remote · Dhaka, Bangladesh",
  //   period: "2021 – 2023",
  //   type: "previous",
  //   roles: [
  //     {
  //       title: "Senior Full-Stack Developer",
  //       subtitle: "Full-time · Team Lead",
  //       Icon: Code2,
  //       responsibilities: [
  //         "Led a team of 5 developers in building scalable web applications",
  //         "Architected and developed RESTful APIs serving 100K+ daily requests",
  //         "Implemented microservices architecture reducing system downtime by 60%",
  //         "Mentored junior developers and conducted thorough code reviews",
  //         "Optimized database queries resulting in 45% faster response times",
  //         "Integrated third-party services including payment gateways and analytics",
  //       ],
  //     },
  //   ],
  //   techStack: [
  //     "React",
  //     "Node.js",
  //     "Express",
  //     "MySQL",
  //     "Redis",
  //     "Docker",
  //     "GitHub Actions",
  //   ],
  //   achievements: [
  //     { metric: "15+", label: "Apps Launched" },
  //     { metric: "100K+", label: "Daily Users" },
  //     { metric: "45%", label: "Performance Gain" },
  //     { metric: "5", label: "Team Members Led" },
  //   ],
  // },
  // {
  //   id: 3,
  //   company: "DigitalCraft Agency",
  //   logo: "D",
  //   logoColor: "#F59E0B",
  //   url: "#",
  //   location: "Dhaka, Bangladesh",
  //   period: "2019 – 2021",
  //   type: "previous",
  //   roles: [
  //     {
  //       title: "Web Developer",
  //       subtitle: "Full-time · Frontend Focus",
  //       Icon: Code2,
  //       responsibilities: [
  //         "Developed responsive and interactive web applications for 20+ clients",
  //         "Converted Figma designs into pixel-perfect React components",
  //         "Implemented state management with Redux and Context API",
  //         "Optimized website performance achieving 95+ Lighthouse scores",
  //         "Collaborated closely with designers and backend developers",
  //         "Built custom e-commerce solutions with payment integrations",
  //       ],
  //     },
  //   ],
  //   techStack: [
  //     "React",
  //     "JavaScript",
  //     "Redux",
  //     "SASS",
  //     "Webpack",
  //     "Jest",
  //     "Storybook",
  //   ],
  //   achievements: [
  //     { metric: "20+", label: "Websites Built" },
  //     { metric: "95+", label: "Performance Score" },
  //     { metric: "100%", label: "Client Satisfaction" },
  //     { metric: "10+", label: "E-comm Stores" },
  //   ],
  // },
];

export default function Experience() {
  const [activeTab, setActiveTab] = useState<"all" | "current" | "previous">(
    "all",
  );

  const filtered =
    activeTab === "all"
      ? experiences
      : experiences.filter((e) => e.type === activeTab);

  return (
    <section
      id="experience"
      className="mb-16 sm:mb-24 lg:mb-32 scroll-mt-24 px-4 sm:px-6 lg:px-0"
    >
      {/* ── Two-column layout: left sticky title + right timeline ── */}
      <div className="grid lg:grid-cols-[320px_1fr] gap-10 lg:gap-16 items-start">
        {/* ── LEFT: sticky title panel ── */}
        <div className="lg:sticky lg:top-28">
          {/* Career Path badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-foreground/5 mb-5">
            <Star className="w-3.5 h-3.5 text-foreground/50" />
            <span className="text-xs font-semibold text-foreground/50 uppercase tracking-widest">
              Career Path
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] mb-4">
            <span className="text-foreground">Work</span>
            <br />
            <span className="text-foreground/25">Experience</span>
          </h2>

          <p className="text-sm sm:text-base text-foreground/50 leading-relaxed mb-8 max-w-xs">
            A chronological timeline of my professional journey, highlighting
            the teams I've worked with and the impact I've made along the way.
          </p>

          {/* Mini stats */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {[
              { v: "1.5+", l: "Years Exp." },
              { v: "10+", l: "Projects" },
              { v: "7+", l: "Clients" },
              { v: "12+", l: "Tech Stack" },
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
        </div>

        {/* ── RIGHT: timeline cards ── */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent hidden sm:block" />

          <div className="space-y-6">
            {filtered.map((exp) => (
              <div key={exp.id} className="relative sm:pl-14">
                {/* Timeline dot */}
                <div
                  className="absolute left-5 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-background hidden sm:block"
                  style={{ background: exp.logoColor, top: "1.75rem" }}
                />

                {/* Card */}
                <div
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    exp.type === "current"
                      ? "border-white/20 bg-foreground/[0.05]"
                      : "border-white/10 bg-foreground/[0.02]"
                  }`}
                >
                  {/* Card top accent line */}
                  <div
                    className="h-[2px] w-full"
                    style={{
                      background: `linear-gradient(90deg, ${exp.logoColor}, transparent)`,
                    }}
                  />

                  <div className="p-5 sm:p-6">
                    {/* Company header */}
                    <div className="flex items-start justify-between gap-3 mb-5">
                      <div className="flex items-center gap-3 sm:gap-4">
                        {/* Logo */}
                        <div
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-white text-lg sm:text-xl font-black shrink-0"
                          style={{
                            background: `${exp.logoColor}22`,
                            border: `1.5px solid ${exp.logoColor}44`,
                          }}
                        >
                          <Briefcase
                            className="w-5 h-5 sm:w-6 sm:h-6"
                            style={{ color: exp.logoColor }}
                          />
                        </div>

                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-foreground leading-tight">
                            {exp.company}
                          </h3>
                          <div className="flex flex-wrap items-center gap-1.5 mt-0.5 text-xs text-foreground/40">
                            <MapPin className="w-3 h-3" />
                            <span>{exp.location}</span>
                            {exp.url !== "#" && (
                              <>
                                <span>·</span>
                                <a
                                  href={exp.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
                                >
                                  {exp.url.replace("https://www.", "")}
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Period + current badge */}
                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        {exp.type === "current" && (
                          <span
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider"
                            style={{
                              borderColor: `${exp.logoColor}55`,
                              color: exp.logoColor,
                              background: `${exp.logoColor}15`,
                            }}
                          >
                            <span className="relative flex h-1.5 w-1.5">
                              <span
                                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                                style={{ background: exp.logoColor }}
                              />
                              <span
                                className="relative inline-flex rounded-full h-1.5 w-1.5"
                                style={{ background: exp.logoColor }}
                              />
                            </span>
                            Present
                          </span>
                        )}
                        <span className="text-xs font-semibold text-foreground/50 bg-foreground/[0.06] px-3 py-1 rounded-full border border-white/10 whitespace-nowrap">
                          {exp.period}
                        </span>
                      </div>
                    </div>

                    {/* Roles */}
                    <div className="space-y-5">
                      {exp.roles.map((role, ri) => {
                        const RIcon = role.Icon;
                        return (
                          <div key={ri}>
                            {ri > 0 && <div className="h-px bg-white/8 mb-5" />}
                            <div className="flex items-center gap-2.5 mb-3">
                              <div
                                className="p-1.5 rounded-lg border border-white/10"
                                style={{ background: `${exp.logoColor}18` }}
                              >
                                <RIcon
                                  className="w-4 h-4"
                                  style={{ color: exp.logoColor }}
                                />
                              </div>
                              <div>
                                <h4 className="text-sm sm:text-base font-bold text-foreground leading-tight">
                                  {role.title}
                                </h4>
                                <p className="text-[10px] sm:text-xs text-foreground/40">
                                  {role.subtitle}
                                </p>
                              </div>
                            </div>

                            <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1.5 ml-0 sm:ml-9">
                              {role.responsibilities.map((item, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <CheckCircle2
                                    className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                                    style={{ color: exp.logoColor }}
                                  />
                                  <span className="text-xs sm:text-sm text-foreground/65 leading-relaxed">
                                    {item}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>

                    {/* Tech Stack */}
                    <div className="mt-5 pt-4 border-t border-white/8">
                      <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest mb-2">
                        Tech Stack
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 text-[11px] sm:text-xs font-medium bg-foreground/[0.05] border border-white/10 rounded-lg text-foreground/60 hover:text-foreground hover:border-white/25 transition-all"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="mt-4 pt-4 border-t border-white/8">
                      <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest mb-3">
                        Key Achievements
                      </p>
                      <div className="grid grid-cols-4 gap-2">
                        {exp.achievements.map((a, i) => (
                          <div
                            key={i}
                            className="text-center p-2 sm:p-3 rounded-xl bg-foreground/[0.04] border border-white/8"
                          >
                            <div
                              className="text-base sm:text-lg font-black"
                              style={{ color: exp.logoColor }}
                            >
                              {a.metric}
                            </div>
                            <div className="text-[9px] sm:text-[10px] text-foreground/40 leading-tight mt-0.5">
                              {a.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
