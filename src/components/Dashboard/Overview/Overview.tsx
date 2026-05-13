"use client";

import React from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
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

import type {
  ActionItem,
  ContactMessage,
  DashboardOverviewResponse,
  StatItem,
  SummaryItem,
} from "./types";
import StatsGrid from "./StatsGrid";
import QuickActions from "./QuickActions";
import DataSummary from "./DataSummary";
import RecentMessages from "./RecentMessages";
import SystemStatus from "./SystemStatus";

export default function Overview() {
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

  const stats: StatItem[] = [
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

  const summary: SummaryItem[] = [
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

  const actions: ActionItem[] = [
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

      <StatsGrid stats={stats} />
      <QuickActions actions={actions} />
      <DataSummary summary={summary} />
      <RecentMessages
        recentMessages={recentMessages}
        isLoading={isMsgLoading}
      />
      <SystemStatus isError={isError} />
    </div>
  );
}
