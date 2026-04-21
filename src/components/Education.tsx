"use client";
import React, { useState } from "react";

const Education = () => {
  const [activeTab, setActiveTab] = useState<"education" | "certifications">(
    "education",
  );

  const education = [
    {
      id: 1,
      degree: "Diploma in Engineering",
      field: "Computer Science & Technology",
      institution: "Rangpur Polytechnic Institute",
      shortName: "RPI",
      location: "Rangpur, Bangladesh",
      period: "2016 - 2020",
      grade: "CGPA 3.75 / 4.00",
      description:
        "Comprehensive diploma program covering computer programming, database management, networking, and software development fundamentals.",
      logo: "RPI",
      color: "from-foreground/5 to-transparent",
      borderColor: "border-white/10",
      iconBg: "bg-foreground/10",
      iconColor: "text-foreground",
      achievements: [
        "Specialized in Software Engineering and Software Engineering",
        "Completed final year project on E-Commerce Platform",
        "Active member of Programming Club",
        "Participated in National Hackathon 2019",
      ],
      courses: [
        "Programming in C & C++",
        "Data Structures & Algorithms",
        "Database Management Systems",
        "Software Engineering (HTML, CSS, JavaScript)",
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
      credential: "Certificate ID: PH-MERN-2021-089",
      color: "from-foreground/5 to-transparent",
      borderColor: "border-white/10",
    },
    {
      id: 2,
      title: "Advanced React & Next.js",
      issuer: "Udemy",
      year: "2022",
      credential: "Certificate ID: UD-REACT-2022-156",
      color: "from-foreground/5 to-transparent",
      borderColor: "border-white/10",
    },
    {
      id: 3,
      title: "Node.js & Express Mastery",
      issuer: "Coursera",
      year: "2022",
      credential: "Certificate ID: CO-NODE-2022-234",
      color: "from-yellow-500/20 to-orange-500/20",
      borderColor: "border-yellow-500/30",
    },
    {
      id: 4,
      title: "TypeScript for Professionals",
      issuer: "Udemy",
      year: "2023",
      credential: "Certificate ID: UD-TS-2023-078",
      color: "from-foreground/5 to-transparent",
      borderColor: "border-white/10",
    },
  ];

  return (
    <section id="education" className="mb-32 scroll-mt-24">
      {/* Header */}
      <div className="flex items-center gap-6 mb-12">
        <div className="relative">
          <h2 className="text-3xl lg:text-4xl font-black text-foreground tracking-tight">
            Education
          </h2>
          <div className="absolute -bottom-3 left-0 w-20 h-1 bg-foreground rounded-full" />
        </div>
        <div className="h-px flex-1 bg-foreground/10" />
        <span className="text-sm font-mono text-foreground/40 hidden sm:block">
          &lt;qualifications /&gt;
        </span>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-white/10">
        {[
          { id: "education", label: "Academic Education" },
          { id: "certifications", label: "Certifications" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-6 py-3 text-sm font-medium transition-all relative ${
              activeTab === tab.id
                ? "text-foreground"
                : "text-foreground/50 hover:text-foreground/70"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-foreground rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Education Content */}
      {activeTab === "education" && (
        <div className="space-y-6">
          {education.map((edu) => (
            <div key={edu.id} className="relative">
              {/* Main Education Card */}
              <div
                className={`p-6 lg:p-8 rounded-2xl bg-gradient-to-br ${edu.color} border ${edu.borderColor} backdrop-blur-sm`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Left - Institution Logo */}
                  <div
                    className={`w-20 h-20 rounded-2xl ${edu.iconBg} border ${edu.borderColor} flex items-center justify-center text-2xl font-black ${edu.iconColor}`}
                  >
                    {edu.logo}
                  </div>

                  {/* Right - Details */}
                  <div className="flex-1">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-3">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground">
                          {edu.degree}
                        </h3>
                        <p className="text-foreground font-medium mt-0.5">
                          {edu.field}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1.5 bg-foreground/10 text-foreground rounded-full text-xs font-medium">
                          {edu.grade}
                        </span>
                        <span className="text-sm font-medium text-foreground/60 bg-foreground/10 px-3 py-1.5 rounded-full">
                          {edu.period}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <svg
                        className="w-4 h-4 text-foreground/40"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      <span className="text-foreground/60 text-sm">
                        {edu.institution}
                      </span>
                      <span className="text-foreground/30">•</span>
                      <span className="text-foreground/50 text-sm">
                        {edu.location}
                      </span>
                    </div>

                    <p className="text-foreground/60 text-sm leading-relaxed mb-5">
                      {edu.description}
                    </p>

                    {/* Achievements */}
                    <div className="mb-5">
                      <h4 className="text-xs font-bold text-foreground/40 uppercase tracking-wider mb-3">
                        Key Achievements
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {edu.achievements.map((achievement, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <svg
                              className="w-4 h-4 text-foreground mt-0.5 flex-shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span className="text-sm text-foreground/70">
                              {achievement}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Courses */}
                    <div>
                      <h4 className="text-xs font-bold text-foreground/40 uppercase tracking-wider mb-3">
                        Relevant Coursework
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.courses.map((course, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-lg text-foreground/60"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Certifications Content */}
      {activeTab === "certifications" && (
        <div className="grid md:grid-cols-2 gap-4">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className={`p-5 rounded-xl bg-gradient-to-br ${cert.color} border ${cert.borderColor} backdrop-blur-sm transition-all hover:scale-[1.02]`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-foreground/70"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-foreground">{cert.title}</h4>
                  <p className="text-sm text-foreground/50 mt-0.5">
                    {cert.issuer}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-foreground">{cert.year}</span>
                    <span className="text-xs text-foreground/30">•</span>
                    <span className="text-xs text-foreground/40">
                      {cert.credential}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Continuous Learning */}
      <div className="mt-8 p-6 rounded-xl bg-foreground/5 border-l-4 border-l-foreground">
        <div className="flex items-start gap-4">
          <div className="text-3xl">📚</div>
          <div>
            <h4 className="font-bold text-foreground mb-2">
              Continuous Learning
            </h4>
            <p className="text-sm text-foreground/60 leading-relaxed">
              Technology never stands still, and neither do I. I'm constantly
              expanding my knowledge through online courses, technical
              documentation, and hands-on projects. Currently exploring advanced
              system architecture and cloud-native development practices.
            </p>
          </div>
        </div>
      </div>

      {/* Education Summary */}
      <div className="mt-6 p-5 rounded-xl bg-foreground/5 border border-white/10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎓</span>
            <div>
              <p className="text-sm font-medium text-foreground">
                Diploma in Computer Science & Technology
              </p>
              <p className="text-xs text-foreground/40">
                Rangpur Polytechnic Institute • 2016-2020
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 bg-foreground/10 text-foreground rounded-full text-xs font-medium">
              CGPA 3.75/4.00
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;



