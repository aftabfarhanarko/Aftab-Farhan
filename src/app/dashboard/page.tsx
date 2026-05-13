"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  BriefcaseBusiness,
  Clock,
  Cpu,
  FileText,
  GraduationCap,
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
  messages: {
    total: number;
    unread: number;
    byStatus: Record<string, number>;
  };
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

type IconType = React.ComponentType<{ className?: string }>;

const DashboardOverview = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard-overview"],
    queryFn: async () => {
      const res = await axios.get<DashboardOverviewResponse>("/api/overview");
      return res.data;
    },
  });

  const stats = [
    {
      label: "Total Projects",
      value: isLoading ? "…" : String(data?.projects.total ?? 0),
      icon: Rocket as IconType,
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      label: "Experience",
      value: isLoading ? "…" : String(data?.experience.total ?? 0),
      icon: BriefcaseBusiness as IconType,
      color: "bg-green-500/10 text-green-500",
    },
    {
      label: "Skills",
      value: isLoading ? "…" : String(data?.skills.total ?? 0),
      icon: Wrench as IconType,
      color: "bg-yellow-500/10 text-yellow-500",
    },
    {
      label: "Messages",
      value: isLoading ? "…" : String(data?.messages.unread ?? 0),
      icon: Mail as IconType,
      color: "bg-purple-500/10 text-purple-500",
    },
  ];

  const summarySections = [
    {
      label: "Hero",
      value: isLoading ? "…" : String(data?.hero.total ?? 0),
      href: "/dashboard/hero",
      icon: Sparkles as IconType,
    },
    {
      label: "About",
      value: isLoading ? "…" : String(data?.totals.about ?? 0),
      href: "/dashboard/about",
      icon: UserRound as IconType,
    },
    {
      label: "Education",
      value: isLoading ? "…" : String(data?.totals.education ?? 0),
      href: "/dashboard/education",
      icon: GraduationCap as IconType,
    },
    {
      label: "Projects",
      value: isLoading ? "…" : String(data?.projects.featured ?? 0),
      href: "/dashboard/projects",
      icon: Star as IconType,
    },
    {
      label: "Categories",
      value: isLoading ? "…" : String(data?.skills.categories ?? 0),
      href: "/dashboard/skills",
      icon: Layers as IconType,
    },
    {
      label: "Tech",
      value: isLoading ? "…" : String(data?.projects.tech ?? 0),
      href: "/dashboard/projects",
      icon: Cpu as IconType,
    },
  ];

  const quickActions = [
    {
      title: "Update Bio",
      desc: "Edit your 'About Me' section",
      href: "/dashboard/about",
      icon: FileText as IconType,
    },
    {
      title: "Add Project",
      desc: "Showcase your latest work",
      href: "/dashboard/projects",
      icon: PlusCircle as IconType,
    },
    {
      title: "Edit Experience",
      desc: "Update your career path",
      href: "/dashboard/experience",
      icon: Clock as IconType,
    },
    {
      title: "Contact Info",
      desc: "Manage social links",
      href: "/dashboard/contact",
      icon: Link2 as IconType,
    },
  ];

  return (
    <div className="w-full max-w-none">
      <header className="mb-8 md:mb-10">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl md:text-4xl xl:text-5xl font-black tracking-tight mb-2 md:mb-3"
        >
          Welcome back, <span className="text-foreground/40">Arko</span>
        </motion.h1>
        <p className="text-foreground/50 text-sm md:text-base font-medium">
          Here's what's happening with your portfolio today.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-10">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-5 md:p-6 rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 hover:border-white/20 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.8)] transition-colors group"
          >
            <div
              className={`w-11 h-11 md:w-12 md:h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${stat.color}`}
            >
              <stat.icon className="w-6 h-6" />
            </div>
            <div className="text-2xl md:text-3xl font-black mb-1">
              {stat.value}
            </div>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/35">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mb-8 md:mb-10">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.28em] text-foreground/35 mb-4 md:mb-6 px-1">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {quickActions.map((action, i) => (
            <Link href={action.href} key={i}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="p-5 md:p-6 rounded-3xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/10 hover:border-white/20 hover:from-white/[0.07] transition-all group flex items-center gap-4 md:gap-6"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white text-black flex items-center justify-center group-hover:rotate-6 transition-transform">
                  <action.icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-1">
                    {action.title}
                  </h3>
                  <p className="text-xs md:text-sm text-foreground/45 font-medium">
                    {action.desc}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mb-8 md:mb-10">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.28em] text-foreground/35 mb-4 md:mb-6 px-1">
          Data Summary
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {summarySections.map((item, i) => (
            <Link href={item.href} key={i}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="p-5 md:p-6 rounded-3xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/10 hover:border-white/20 transition-colors group"
              >
                <div className="flex items-center justify-between mb-3">
                  <item.icon className="w-7 h-7 text-foreground/70" />
                  <div className="text-2xl font-black">{item.value}</div>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/35">
                  {item.label}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      <div
        className={`p-5 md:p-6 rounded-3xl flex items-center justify-between ${
          isError
            ? "bg-red-500/5 border border-red-500/15"
            : "bg-green-500/5 border border-green-500/15"
        }`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-3 h-3 rounded-full animate-pulse ${
              isError ? "bg-red-500" : "bg-green-500"
            }`}
          />
          <span
            className={`text-xs md:text-sm font-bold uppercase tracking-[0.2em] ${
              isError ? "text-red-500/80" : "text-green-500/80"
            }`}
          >
            {isError ? "Backend Error" : "Backend Connected"}
          </span>
        </div>
        <div className="hidden sm:block text-[10px] font-bold text-foreground/25 uppercase tracking-[0.2em]">
          Version 2.0.4 • April 2026
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
