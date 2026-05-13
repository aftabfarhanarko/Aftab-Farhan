import React from "react";

export type DashboardOverviewResponse = {
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

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "UNREAD" | "READ" | "REPLIED" | "ARCHIVED";
  createdAt: string;
};

export type IconType = React.ComponentType<{ className?: string }>;

export type StatItem = {
  label: string;
  value: string;
  icon: IconType;
  color: string;
};

export type SummaryItem = {
  label: string;
  value: string;
  href: string;
  icon: IconType;
};

export type ActionItem = {
  title: string;
  desc: string;
  href: string;
  icon: IconType;
};
