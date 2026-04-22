"use client";
import React from "react";
import { motion } from "framer-motion";

const DashboardOverview = () => {
  const stats = [
    {
      label: "Total Projects",
      value: "12",
      icon: "📁",
      color: "text-blue-500",
    },
    {
      label: "Skills Listed",
      value: "24",
      icon: "⚡",
      color: "text-yellow-500",
    },
    {
      label: "Experience Years",
      value: "6+",
      icon: "💼",
      color: "text-green-500",
    },
    {
      label: "Contact Requests",
      value: "0",
      icon: "📞",
      color: "text-purple-500",
    },
  ];

  const recentUpdates = [
    {
      section: "Projects",
      time: "2 hours ago",
      action: "Updated Portfolio Website",
    },
    { section: "Skills", time: "5 hours ago", action: "Added Next.js 14" },
    {
      section: "Experience",
      time: "1 day ago",
      action: "Updated Senior Developer role",
    },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-black tracking-tight mb-2">Overview</h1>
        <p className="text-foreground/50 font-medium">
          Welcome back, Arko. Here's what's happening with your portfolio.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl group-hover:scale-110 transition-transform">
                {stat.icon}
              </span>
              <span className="text-xs font-bold uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">
                Active
              </span>
            </div>
            <div className="text-3xl font-black mb-1">{stat.value}</div>
            <div className="text-sm font-bold text-foreground/40 uppercase tracking-wider">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Updates */}
        <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/5">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span>🕒</span> Recent Updates
          </h2>
          <div className="space-y-6">
            {recentUpdates.map((update, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-foreground/20 mt-2" />
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-bold text-sm">{update.section}</span>
                    <span className="text-[10px] text-foreground/30 font-bold uppercase tracking-wider">
                      • {update.time}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/60">{update.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/5">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span>💡</span> Quick Tips
          </h2>
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
              <p className="text-sm font-medium leading-relaxed">
                Keep your <span className="text-white font-bold">Projects</span>{" "}
                section updated with your latest work to attract more clients.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
              <p className="text-sm font-medium leading-relaxed">
                Use <span className="text-white font-bold">Framer Motion</span>{" "}
                icons in your skills section for a more interactive feel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
