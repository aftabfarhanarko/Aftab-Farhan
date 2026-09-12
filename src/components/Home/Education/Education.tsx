"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import {
  GraduationCap,
  MapPin,
  BookOpen,
  Calendar,
  Library,
  Star,
  Award,
  Sparkles,
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

function EducationCard({ edu, index }: { edu: EducationData; index: number }) {
  const isCSE =
    edu.degree.toLowerCase().includes("engineering") ||
    edu.field.toLowerCase().includes("cse") ||
    edu.degree.toLowerCase().includes("b.sc");

  const focusPills = isCSE
    ? [
        "Data Structures & Algorithms",
        "Software Engineering",
        "Web Technologies",
        "Database Management Systems",
        "Object-Oriented Programming",
      ]
    : [
        "General Science & Physics",
        "Higher Mathematics",
        "Analytical Problem Solving",
        "Academic Excellence",
      ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden transition-all duration-300 relative text-left shadow-sm hover:shadow-xl hover:shadow-orange-500/10 hover:border-orange-300 p-6 sm:p-8 group"
    >
      {/* Top ambient orange line beam on hover */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#FF6014]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
        <div className="flex items-start gap-4">
          {/* Animated Icon Badge */}
          <motion.div
            whileHover={{ scale: 1.08, rotate: -6 }}
            className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0 bg-orange-50/80 border border-orange-200/80 shadow-sm group-hover:bg-[#FF6014] group-hover:border-[#FF6014] transition-all duration-300"
          >
            <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8 text-[#FF6014] group-hover:text-white transition-colors duration-300" />
          </motion.div>

          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight group-hover:text-[#FF6014] transition-colors duration-300">
              {edu.degree}
            </h3>
            <p className="text-sm sm:text-base font-bold mt-1 text-slate-800">
              {edu.field}
            </p>
          </div>
        </div>

        {/* Badges / Meta */}
        <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-2 shrink-0 sm:w-auto w-full">
          {edu.grade && (
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="px-3.5 py-1 rounded-full text-xs font-black border border-amber-300/80 text-amber-900 bg-amber-50/90 shadow-sm flex items-center gap-1.5"
            >
              <Award className="w-3.5 h-3.5 text-amber-600" />
              CGPA: {edu.grade}
            </motion.span>
          )}
          <span className="text-xs font-bold text-slate-800 bg-slate-100/90 px-3.5 py-1 rounded-full border border-slate-200/90 whitespace-nowrap flex items-center gap-1.5 shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-[#FF6014]" />
            {edu.period}
          </span>
        </div>
      </div>

      {/* Institution + location */}
      <div className="flex flex-wrap items-center gap-2.5 mb-5 text-sm font-bold text-slate-700 bg-slate-50/80 p-3 rounded-xl border border-slate-100">
        <div className="flex items-center gap-2 text-slate-900">
          <BookOpen className="w-4 h-4 text-[#FF6014] shrink-0" />
          <span className="font-bold">{edu.institution}</span>
        </div>
        <span className="text-slate-300 hidden sm:inline">•</span>
        <div className="flex items-center gap-1.5 text-slate-700">
          <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
          <span>{edu.location}</span>
        </div>
      </div>

      {/* Focus & Key Academic Modules */}
      <div>
        <div className="flex items-center gap-1.5 mb-3 text-xs font-bold uppercase tracking-wider text-slate-700">
          <Sparkles className="w-3.5 h-3.5 text-[#FF6014]" />
          <span>Key Academic Specializations & Foundations</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {focusPills.map((pill) => (
            <motion.span
              key={pill}
              whileHover={{ scale: 1.05, y: -2 }}
              className="px-3 py-1.5 text-xs font-bold bg-white border border-slate-200/90 rounded-xl text-slate-900 shadow-sm hover:border-orange-300 hover:bg-orange-50/50 hover:text-[#FF6014] transition-all duration-200 cursor-default"
            >
              {pill}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Education() {
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
      className="mb-20 sm:mb-24 scroll-mt-24 px-4 sm:px-6 lg:px-0"
    >
      <div className="grid lg:grid-cols-[330px_1fr] gap-10 lg:gap-16 items-start">
        {/* Left sticky panel */}
        <div className="lg:sticky lg:top-28 flex flex-col items-center text-center lg:items-start lg:text-left space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-200/80 bg-orange-50/80 text-[#FF6014] text-xs font-black shadow-sm"
          >
            <Star className="w-4 h-4 text-[#FF6014] fill-[#FF6014]/20" />
            <span>Academic Qualifications</span>
          </motion.div>

          <h2 className="text-[36px] sm:text-[44px] md:text-[48px] font-black tracking-tight leading-tight text-slate-900">
            My <span className="text-[#FF6014]">Education</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-800 leading-[1.7] font-medium max-w-xs mx-auto lg:mx-0">
            Academic foundations that have shaped my analytical mindset and software engineering expertise.
          </p>

          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="mt-4 p-6 rounded-2xl border border-slate-200/90 bg-white text-left shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-300 space-y-2.5 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FF6014]" />
            <div className="flex items-center gap-2.5">
              <Library className="w-5 h-5 text-[#FF6014]" />
              <span className="text-xs font-black text-slate-900 uppercase tracking-wider">
                Continuous Learning
              </span>
            </div>
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
              Currently exploring advanced distributed system architectures, microservices, and cloud-native solutions.
            </p>
          </motion.div>
        </div>

        {/* Right content */}
        <div>
          <div className="space-y-6">
            {isLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-[#FF6014]" />
              </div>
            ) : education && education.length > 0 ? (
              education.map((edu, idx) => (
                <EducationCard key={edu.id} edu={edu} index={idx} />
              ))
            ) : (
              <div className="text-center py-20 text-slate-700 font-medium border border-dashed border-slate-300 rounded-2xl bg-slate-50">
                No education data available at the moment.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}