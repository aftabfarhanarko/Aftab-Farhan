"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  BriefcaseBusiness,
  ChevronRight,
  Clock,
  Cpu,
  FileText,
  GraduationCap,
  Inbox,
  Layers,
  Link2,
  Mail,
  PlusCircle,
  Rocket,
  Sparkles,
  Star,
  UserRound,
  Wrench,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────
type DashboardOverviewResponse = {
  totals: {
    users: number;
    hero: number;
    about: number;
    projects: number;
    skills: number;
    skillCategories: number;
    education: number;
    experience: number;
    contactMessages: number;
    tech: number;
  };
  hero: { total: number; stats: number; socials: number };
  experience: { total: number; roles: number; achievements: number };
  messages: { total: number; unread: number; byStatus: Record<string, number> };
  projects: {
    total: number;
    featured: number;
    tech: number;
    projectTech: number;
    byCategory: Record<string, number>;
    byType: Record<string, number>;
  };
  skills: {
    total: number;
    categories: number;
    byCategory: Array<{ categoryId: string; title: string; count: number }>;
  };
};

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "UNREAD" | "READ" | "REPLIED" | "ARCHIVED";
  createdAt: string;
};

type IconType = React.ComponentType<{ className?: string }>;

// ── Helpers ────────────────────────────────────────────────────────────────────
const statusCls = (s: ContactMessage["status"]) => {
  if (s === "UNREAD")
    return "bg-green-500/20 text-green-400 border-green-500/20";
  if (s === "REPLIED") return "bg-blue-500/20 text-blue-300 border-blue-500/20";
  if (s === "ARCHIVED") return "bg-white/5 text-white/30 border-white/10";
  return "bg-white/5 text-white/40 border-white/10";
};

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ""
    : new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }).format(d);
};

const msgPreview = (t: string) => {
  const s = t.replace(/\s+/g, " ").trim();
  return s.length <= 100 ? s : `${s.slice(0, 100)}…`;
};

// ── Component ──────────────────────────────────────────────────────────────────
const DashboardOverview = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard-overview"],
    queryFn: async () =>
      (await axios.get<DashboardOverviewResponse>("/api/overview")).data,
  });

  const { data: recentMessages, isLoading: isMsgLoading } = useQuery({
    queryKey: ["dashboard-recent-messages"],
    queryFn: async () =>
      (
        await axios.get<ContactMessage[]>("/api/contact", {
          params: { limit: 6 },
        })
      ).data,
  });

  const stats: {
    label: string;
    value: string;
    icon: IconType;
    color: string;
  }[] = [
    {
      label: "Projects",
      value: isLoading ? "…" : String(data?.projects.total ?? 0),
      icon: Rocket,
      color: "bg-blue-500/10 text-blue-400",
    },
    {
      label: "Experience",
      value: isLoading ? "…" : String(data?.experience.total ?? 0),
      icon: BriefcaseBusiness,
      color: "bg-green-500/10 text-green-400",
    },
    {
      label: "Skills",
      value: isLoading ? "…" : String(data?.skills.total ?? 0),
      icon: Wrench,
      color: "bg-yellow-500/10 text-yellow-400",
    },
    {
      label: "Unread Msgs",
      value: isLoading ? "…" : String(data?.messages.unread ?? 0),
      icon: Mail,
      color: "bg-purple-500/10 text-purple-400",
    },
  ];

  const summary: {
    label: string;
    value: string;
    href: string;
    icon: IconType;
  }[] = [
    {
      label: "Hero",
      value: isLoading ? "…" : String(data?.hero.total ?? 0),
      href: "/dashboard/hero",
      icon: Sparkles,
    },
    {
      label: "About",
      value: isLoading ? "…" : String(data?.totals.about ?? 0),
      href: "/dashboard/about",
      icon: UserRound,
    },
    {
      label: "Education",
      value: isLoading ? "…" : String(data?.totals.education ?? 0),
      href: "/dashboard/education",
      icon: GraduationCap,
    },
    {
      label: "Projects",
      value: isLoading ? "…" : String(data?.projects.featured ?? 0),
      href: "/dashboard/projects",
      icon: Star,
    },
    {
      label: "Categories",
      value: isLoading ? "…" : String(data?.skills.categories ?? 0),
      href: "/dashboard/skills",
      icon: Layers,
    },
    {
      label: "Tech",
      value: isLoading ? "…" : String(data?.projects.tech ?? 0),
      href: "/dashboard/projects",
      icon: Cpu,
    },
  ];

  const actions: {
    title: string;
    desc: string;
    href: string;
    icon: IconType;
  }[] = [
    {
      title: "Update Bio",
      desc: "Edit your 'About Me' section",
      href: "/dashboard/about",
      icon: FileText,
    },
    {
      title: "Add Project",
      desc: "Showcase your latest work",
      href: "/dashboard/projects",
      icon: PlusCircle,
    },
    {
      title: "Edit Experience",
      desc: "Update your career path",
      href: "/dashboard/experience",
      icon: Clock,
    },
    {
      title: "Contact Info",
      desc: "Manage social links",
      href: "/dashboard/contact",
      icon: Link2,
    },
  ];

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <header>
        <motion.h1
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl sm:text-3xl font-black tracking-tight mb-1"
        >
          Welcome back, <span className="text-white/35">Arko</span>
        </motion.h1>
        <p className="text-xs sm:text-sm text-white/45 font-medium">
          Here's what's happening with your portfolio today.
        </p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 hover:border-white/20 transition-colors group"
          >
            <div
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${s.color}`}
            >
              <s.icon className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="text-xl sm:text-2xl font-black mb-0.5">
              {s.value}
            </div>
            <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white/35 leading-tight">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <section>
        <h2 className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.28em] text-white/35 mb-3 sm:mb-4 px-0.5">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {actions.map((a, i) => (
            <Link href={a.href} key={i}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/10 hover:border-white/20 hover:from-white/[0.07] transition-all group flex items-center gap-4"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white text-black flex items-center justify-center shrink-0 group-hover:rotate-6 transition-transform">
                  <a.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-bold leading-tight mb-0.5 truncate">
                    {a.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-white/40 font-medium truncate">
                    {a.desc}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Data Summary */}
      <section>
        <h2 className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.28em] text-white/35 mb-3 sm:mb-4 px-0.5">
          Data Summary
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
          {summary.map((item, i) => (
            <Link href={item.href} key={i}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
                className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/10 hover:border-white/20 transition-colors group"
              >
                <div className="flex items-center justify-between mb-2">
                  <item.icon className="w-5 h-5 text-white/50 group-hover:text-white/70 transition-colors" />
                  <div className="text-lg sm:text-xl font-black">
                    {item.value}
                  </div>
                </div>
                <div className="text-[9px] font-black uppercase tracking-widest text-white/30 truncate">
                  {item.label}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Messages */}
      <section>
        <div className="flex items-center justify-between mb-3 sm:mb-4 px-0.5">
          <div>
            <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.28em] text-white/35">
              Recent Messages
            </div>
            <div className="text-[11px] sm:text-xs text-white/40 font-medium mt-0.5">
              Latest contact form submissions.
            </div>
          </div>
          <Link
            href="/dashboard/contact"
            className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-white/50 hover:text-white/80 transition-colors"
          >
            View all <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {isMsgLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2.5 animate-pulse"
              >
                <div className="flex justify-between">
                  <div className="h-3.5 w-32 bg-white/10 rounded" />
                  <div className="h-4 w-16 bg-white/10 rounded-full" />
                </div>
                <div className="h-3 w-44 bg-white/10 rounded" />
                <div className="h-3 w-full bg-white/10 rounded" />
                <div className="h-3 w-3/4 bg-white/10 rounded" />
              </div>
            ))}
          </div>
        ) : !recentMessages?.length ? (
          <div className="p-8 sm:p-10 border-2 border-dashed border-white/10 rounded-2xl text-center bg-white/[0.02]">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3">
              <Inbox className="w-5 h-5 text-white/25" />
            </div>
            <div className="text-[10px] font-black uppercase tracking-widest text-white/25 mb-1">
              No messages yet
            </div>
            <div className="text-xs text-white/20 font-medium">
              Messages from your contact section will appear here.
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {recentMessages.map((msg, i) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/10 hover:border-white/20 transition-colors"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-black truncate">
                        {msg.name}
                      </span>
                      <span
                        className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${statusCls(msg.status)}`}
                      >
                        {msg.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-white/40 font-medium truncate mt-0.5">
                      {msg.email}
                    </div>
                  </div>
                  <div className="text-[9px] font-bold uppercase tracking-wider text-white/30 whitespace-nowrap flex items-center gap-1 shrink-0">
                    <Clock className="w-3 h-3" />
                    {formatDate(msg.createdAt)}
                  </div>
                </div>
                <div className="text-xs font-bold text-white/75 truncate mb-1">
                  {msg.subject}
                </div>
                <div className="text-[11px] sm:text-xs text-white/40 font-medium leading-relaxed line-clamp-2">
                  {msgPreview(msg.message)}
                </div>
                <div className="mt-3">
                  <Link
                    href="/dashboard/contact"
                    className="flex items-center gap-1 text-[11px] font-bold text-white/50 hover:text-white/80 transition-colors"
                  >
                    Open inbox <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Status bar */}
      <div
        className={`p-4 sm:p-5 rounded-2xl flex items-center justify-between ${
          isError
            ? "bg-red-500/5 border border-red-500/15"
            : "bg-green-500/5 border border-green-500/15"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-2.5 h-2.5 rounded-full animate-pulse ${isError ? "bg-red-500" : "bg-green-500"}`}
          />
          <span
            className={`text-[10px] sm:text-xs font-black uppercase tracking-widest ${isError ? "text-red-400" : "text-green-400"}`}
          >
            {isError ? "Backend Error" : "Backend Connected"}
          </span>
        </div>
        <div className="hidden sm:block text-[9px] font-bold text-white/20 uppercase tracking-widest">
          Version 2.0.4 · April 2026
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
