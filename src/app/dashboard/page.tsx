"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const DashboardOverview = () => {
  const stats = [
    {
      label: "Total Projects",
      value: "12",
      icon: "🚀",
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      label: "Experience",
      value: "3+ Years",
      icon: "💼",
      color: "bg-green-500/10 text-green-500",
    },
    {
      label: "Skills",
      value: "24",
      icon: "🛠️",
      color: "bg-yellow-500/10 text-yellow-500",
    },
    {
      label: "Messages",
      value: "5 New",
      icon: "📩",
      color: "bg-purple-500/10 text-purple-500",
    },
  ];

  const quickActions = [
    {
      title: "Update Bio",
      desc: "Edit your 'About Me' section",
      href: "/dashboard/about",
      icon: "📝",
    },
    {
      title: "Add Project",
      desc: "Showcase your latest work",
      href: "/dashboard/projects",
      icon: "✨",
    },
    {
      title: "Edit Experience",
      desc: "Update your career path",
      href: "/dashboard/experience",
      icon: "⏳",
    },
    {
      title: "Contact Info",
      desc: "Manage social links",
      href: "/dashboard/contact",
      icon: "🔗",
    },
  ];

  return (
    <div className="max-w-5xl">
      <header className="mb-12">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-5xl font-black tracking-tight mb-4"
        >
          Welcome back, <span className="text-foreground/40">Arko</span>
        </motion.h1>
        <p className="text-foreground/50 text-lg font-medium">
          Here's what's happening with your portfolio today.
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors group"
          >
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform ${stat.color}`}
            >
              {stat.icon}
            </div>
            <div className="text-3xl font-black mb-1">{stat.value}</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-foreground/30">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-12">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/30 mb-6 px-1">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickActions.map((action, i) => (
            <Link href={action.href} key={i}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all group flex items-center gap-6"
              >
                <div className="w-16 h-16 rounded-[1.5rem] bg-white text-black flex items-center justify-center text-2xl font-black group-hover:rotate-6 transition-transform">
                  {action.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">{action.title}</h3>
                  <p className="text-sm text-foreground/40 font-medium">
                    {action.desc}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* System Status / Info */}
      <div className="p-8 rounded-[2.5rem] bg-green-500/5 border border-green-500/10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-bold text-green-500/80 uppercase tracking-widest">
            Backend Connected
          </span>
        </div>
        <div className="text-[10px] font-bold text-foreground/20 uppercase tracking-[0.2em]">
          Version 2.0.4 • April 2026
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
