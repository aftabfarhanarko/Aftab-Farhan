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

function EducationCard({ edu }: { edu: EducationData }) {
  const isCSE = edu.degree.toLowerCase().includes("engineering") || edu.field.toLowerCase().includes("cse");
  const focusPills = isCSE
    ? ["Data Structures & Algorithms", "Software Engineering", "Web Technologies", "Database Management"]
    : ["General Science", "Physics & Mathematics", "Analytical Foundations"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all duration-300 relative text-left shadow-sm hover:shadow-md hover:border-orange-200 p-6 sm:p-7"
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 bg-orange-50 border border-orange-200 shadow-sm">
            <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-[#FF6014]" />
          </div>
          
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
              {edu.degree}
            </h3>
            <p className="text-sm font-semibold mt-1 text-slate-600">
              {edu.field}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-2 shrink-0 sm:w-auto w-full">
          {edu.grade && (
            <span className="px-3 py-1 rounded-full text-xs font-bold border border-slate-200 text-slate-800 bg-slate-100">
              GPA: {edu.grade}
            </span>
          )}
          <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3.5 py-1 rounded-full border border-slate-200 whitespace-nowrap flex items-center gap-1.5 shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            {edu.period}
          </span>
        </div>
      </div>

      {/* Institution + location */}
      <div className="flex flex-wrap items-center gap-2 mb-4 text-sm font-semibold text-slate-600">
        <div className="flex items-center gap-1.5 text-slate-800">
          <BookOpen className="w-4 h-4 text-[#FF6014]" />
          <span>{edu.institution}</span>
        </div>
        <span className="text-slate-300">•</span>
        <div className="flex items-center gap-1.5 text-slate-600">
          <MapPin className="w-4 h-4 text-slate-400" />
          <span>{edu.location}</span>
        </div>
      </div>

      {/* Focus & Key Academic Modules */}
      <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-2">
        {focusPills.map((pill) => (
          <span
            key={pill}
            className="px-3 py-1 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
          >
            {pill}
          </span>
        ))}
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
      <div className="grid lg:grid-cols-[320px_1fr] gap-10 lg:gap-16 items-start">
        {/* Left sticky panel */}
        <div className="lg:sticky lg:top-28 flex flex-col items-center text-center lg:items-start lg:text-left space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 text-[#FF6014] text-xs font-bold shadow-sm">
            <Star className="w-4 h-4 text-[#FF6014]" />
            <span>Academic Qualifications</span>
          </div>

          <h2 className="text-[36px] sm:text-[44px] md:text-[48px] font-black tracking-tight leading-tight text-slate-900">
            My <span className="text-[#FF6014]">Education</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-[1.7] font-normal max-w-xs mx-auto lg:mx-0">
            Academic foundations that have shaped my technical expertise and growth.
          </p>

          <div className="mt-4 p-6 rounded-2xl border border-slate-200 bg-white text-left shadow-sm space-y-2">
            <div className="flex items-center gap-2">
              <Library className="w-5 h-5 text-[#FF6014]" />
              <span className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Continuous Learning
              </span>
            </div>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Currently exploring advanced system architecture and cloud-native development practices.
            </p>
          </div>
        </div>

        {/* Right content */}
        <div>
          <div className="space-y-5">
            {isLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-[#FF6014]" />
              </div>
            ) : education && education.length > 0 ? (
              education.map((edu) => (
                <EducationCard key={edu.id} edu={edu} />
              ))
            ) : (
              <div className="text-center py-20 text-slate-500 border border-dashed border-slate-200 rounded-2xl bg-slate-50">
                No education data available at the moment.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}