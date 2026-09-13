"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Trophy,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Loader2,
  ExternalLink,
  Award,
  ShieldCheck,
  Building2,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

interface AchievementDetail {
  id: string;
  image: string;
  title: string;
  name: string;
  issuer: string;
  startDate?: string;
  endDate?: string;
  description: string;
  createdAt?: string;
}

export default function AchievementDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [achievement, setAchievement] = useState<AchievementDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchAchievement() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/achievements/${id}`);
        if (!res.ok) {
          throw new Error("Achievement credential not found");
        }
        const data = await res.json();
        setAchievement(data);
      } catch (err: any) {
        setError(err.message || "Failed to load achievement details");
      } finally {
        setIsLoading(false);
      }
    }

    fetchAchievement();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-[70vh] bg-transparent text-slate-900 flex flex-col items-center justify-center p-6">
        <Loader2 className="w-10 h-10 text-[#FF6014] animate-spin mb-4" />
        <p className="text-slate-600 font-medium">Loading verified credential details...</p>
      </div>
    );
  }

  if (error || !achievement) {
    return (
      <div className="min-h-[70vh] bg-transparent text-slate-900 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 flex items-center justify-center mb-4 shadow-lg">
          <Trophy className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Credential Not Found</h1>
        <p className="text-slate-600 max-w-md mb-6">{error || "The requested achievement record could not be found."}</p>
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-all shadow-md cursor-pointer"
        >
          <ArrowLeft size={16} />
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-transparent text-slate-900 py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-[#FF6014]/50 hover:bg-slate-50 transition-all text-xs sm:text-sm font-semibold shadow-xs group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#FF6014] group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <ChevronRight size={12} className="text-slate-400" />
            <span className="text-slate-500">Achievements</span>
            <ChevronRight size={12} className="text-slate-400" />
            <span className="text-[#FF6014] font-semibold truncate max-w-[160px]">{achievement.name}</span>
          </div>
        </div>

        {/* 1. HERO HEADER BANNER */}
        <motion.header
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-extrabold uppercase tracking-wider bg-[#FF6014]/10 text-[#FF6014] border border-[#FF6014]/20 flex items-center gap-1.5">
                <Trophy size={14} />
                {achievement.title || "Certification"}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                <CheckCircle2 size={13} /> Verified Credential
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {achievement.name}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 font-bold flex items-center gap-2">
              <Building2 size={18} className="text-[#FF6014]" />
              {achievement.issuer}
            </p>
          </div>

          {achievement.startDate && (
            <div className="shrink-0 p-4 rounded-2xl bg-orange-50/70 border border-orange-200/80 text-left sm:text-right space-y-1">
              <span className="text-[10px] font-mono font-extrabold text-[#FF6014] uppercase tracking-widest block">
                ISSUANCE TIMELINE
              </span>
              <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5 sm:justify-end">
                <Calendar size={14} className="text-[#FF6014]" />
                {achievement.startDate} {achievement.endDate ? `– ${achievement.endDate}` : ""}
              </span>
            </div>
          )}
        </motion.header>

        {/* 2. TWO-COLUMN DETAILS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: HD Certificate Image Showcase (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7 space-y-4"
          >
            <div className="rounded-3xl border border-slate-200 bg-slate-950 p-3 sm:p-4 shadow-xl overflow-hidden group relative">
              <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl bg-slate-900 flex items-center justify-center">
                {achievement.image ? (
                  <img
                    src={achievement.image}
                    alt={achievement.name}
                    className="w-full h-full object-contain max-h-[560px]"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-12 text-slate-400 space-y-2">
                    <Trophy className="w-16 h-16 text-[#FF6014]/50" />
                    <p className="text-sm font-medium">Verified Certificate Document</p>
                  </div>
                )}
              </div>

              {/* Watermark / Badge */}
              <div className="absolute top-6 left-6 px-3.5 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/20 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg">
                <ShieldCheck size={15} className="text-emerald-400" />
                <span>Authentic Record</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Credential Metadata & Description (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Overview / Detailed Statement Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xs font-black uppercase tracking-widest text-[#FF6014] flex items-center gap-2 border-b border-slate-100 pb-3">
                <Sparkles size={16} />
                Achievement Summary & Breakdown
              </h2>
              <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-medium whitespace-pre-line">
                {achievement.description}
              </p>
            </div>

            {/* Credential Metadata Card */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 border-b border-slate-100 pb-3">
                <Award size={15} className="text-[#FF6014]" />
                Official Credential Metadata
              </h3>

              <div className="space-y-3.5 text-xs font-medium">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <span className="text-slate-400 font-bold uppercase tracking-wider">Issuing Organization</span>
                  <span className="font-bold text-slate-900">{achievement.issuer}</span>
                </div>

                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <span className="text-slate-400 font-bold uppercase tracking-wider">Credential Domain</span>
                  <span className="font-bold text-[#FF6014]">{achievement.title}</span>
                </div>

                {achievement.startDate && (
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <span className="text-slate-400 font-bold uppercase tracking-wider">Issuance Date</span>
                    <span className="font-bold text-slate-900">{achievement.startDate}</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-1">
                  <span className="text-slate-400 font-bold uppercase tracking-wider">Verification Status</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 size={13} /> Active & Verified
                  </span>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
