"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUp,
  Sparkles,
  Terminal,
  Code2,
  Mail,
  MapPin,
  Check,
  Copy,
  ArrowUpRight,
  Layers,
  Cpu,
  Clock,
  ShieldCheck,
} from "lucide-react";

const currentYear = new Date().getFullYear();

const socialLinks = [
  {
    href: "https://github.com/aftabfarhanarko",
    label: "GitHub",
    imageSrc: "/github.png",
    colorClass: "hover:bg-slate-900 hover:text-white hover:border-slate-900",
  },
  {
    href: "https://www.linkedin.com/in/aftabfarhanarko",
    label: "LinkedIn",
    imageSrc: "/likdin.png",
    colorClass: "hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]",
  },
  {
    href: "https://www.facebook.com/aftabfarhanarko.official",
    label: "Facebook",
    imageSrc: "/facebook.png",
    colorClass: "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]",
  },
  {
    href: "mailto:aftabfarhan324@gmail.com",
    label: "Email",
    icon: Mail,
    colorClass: "hover:bg-[#FF6014] hover:text-white hover:border-[#FF6014]",
  },
];

const navLinks = [
  { name: "About Me", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Featured Projects", href: "#projects" },
  { name: "Capabilities & Services", href: "#capabilities" },
  { name: "AI Workflow", href: "#ai-assisted-dev" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

const coreTechBadges = [
  "Go (Golang)",
  "Node.js",
  "NestJS",
  "TypeScript",
  "PostgreSQL",
  "System Design",
  "Scalable Backend Systems",
  "API Development",
  "Cloud & DevOps",
];

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("aftabfarhan324@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = "mailto:aftabfarhan324@gmail.com";
    }
  };

  return (
    <footer
      className="footer-responsive relative border-t border-slate-200/90 bg-[#f7f5ef] px-4 sm:px-6 lg:px-8 pt-12 pb-12 mt-20 overflow-hidden"
      style={{
        paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 80px)",
        backgroundImage: `
          linear-gradient(rgba(50, 62, 51, 0.075) 1px, transparent 1px),
          linear-gradient(90deg, rgba(50, 62, 51, 0.075) 1px, transparent 1px),
          linear-gradient(135deg, #f7f5ef 0%, #f0efe7 52%, #f7f5ef 100%)
        `,
        backgroundSize: "40px 40px, 40px 40px, 100% 100%",
      }}
    >
      {/* Top ambient orange glow beam */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF6014]/60 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto space-y-10"
      >
        {/* ── 1. Top Availability & Status Header Bar ── */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/70 border border-slate-200/90 shadow-2xs backdrop-blur-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Available for Senior Backend &amp; Full-Stack Roles</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-[#FF6014]" />
              <span>Dhaka, Bangladesh · Remote Worldwide</span>
            </div>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-orange-50 hover:bg-[#FF6014] border border-orange-200 hover:border-[#FF6014] text-[#FF6014] hover:text-white text-xs font-bold transition-all shadow-2xs cursor-pointer group shrink-0"
          >
            <span>Let&apos;s Build Together</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* ── 2. Main Footer Grid (4-Column Hierarchy) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-8 border-b border-slate-200/90">
          {/* Col 1: Brand & Engineering Identity (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center text-center md:items-start md:text-left space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-2xl sm:text-3xl font-black tracking-tight text-slate-900 group"
            >
              <span>Aftab Farhan</span>
              <span className="text-[#FF6014]">Arko</span>
              <span className="text-[#FF6014] group-hover:rotate-12 transition-transform duration-300">.</span>
            </Link>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#FF6014] text-xs font-mono font-bold tracking-wider">
              <Terminal className="w-3.5 h-3.5" />
              <span>Backend Software Engineer | Full Stack Engineer</span>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed font-medium max-w-md">
              Architecting high-concurrency backend services, distributed systems, and production-grade full-stack applications with clean architecture and extreme reliability.
            </p>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-2.5">
              {socialLinks.map(({ href, label, icon: Icon, imageSrc, colorClass }) => (
                <motion.a
                  key={label}
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  aria-label={label}
                  className={`w-10 h-10 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center text-slate-700 shadow-2xs transition-all duration-300 ${colorClass}`}
                >
                  {imageSrc ? (
                    <img src={imageSrc} alt={label} className="w-4.5 h-4.5 object-contain" />
                  ) : Icon ? (
                    <Icon className="w-4.5 h-4.5" />
                  ) : null}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Col 2: Navigation Links (2.5 cols) */}
          <div className="lg:col-span-2 flex flex-col items-center text-center md:items-start md:text-left space-y-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#FF6014]" />
              Navigation
            </h4>
            <ul className="space-y-2 w-full pt-1">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-xs font-bold text-slate-700 hover:text-[#FF6014] transition-colors flex items-center gap-2 group justify-center md:justify-start"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-[#FF6014] group-hover:scale-125 transition-all" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Core Competencies (2 cols) */}
          <div className="lg:col-span-2 flex flex-col items-center text-center md:items-start md:text-left space-y-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-[#FF6014]" />
              Core Focus
            </h4>
            <ul className="space-y-2 text-xs font-bold text-slate-700 w-full pt-1">
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6014]" />
                <span>Distributed Systems</span>
              </li>
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6014]" />
                <span>Microservices</span>
              </li>
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6014]" />
                <span>API Architecture</span>
              </li>
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6014]" />
                <span>Relational Databases</span>
              </li>
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6014]" />
                <span>Cloud &amp; Containers</span>
              </li>
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6014]" />
                <span>Code Quality &amp; CI/CD</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Contact & Dispatch Card (2.5 cols) */}
          <div className="lg:col-span-3 flex flex-col items-center text-center md:items-start md:text-left space-y-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#FF6014]" />
              Quick Connect
            </h4>

            <div className="w-full p-4 rounded-2xl bg-white/90 border border-slate-200/90 shadow-2xs space-y-3">
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Need high-performance backend architecture or full-stack engineering?
              </p>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 hover:bg-orange-50 border border-slate-200 hover:border-orange-200 text-xs font-bold text-slate-800 hover:text-[#FF6014] transition-all flex items-center justify-between cursor-pointer shadow-2xs group"
              >
                <span className="truncate font-mono text-[11px]">aftabfarhan324@gmail.com</span>
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 ml-1" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#FF6014] shrink-0 ml-1" />
                )}
              </button>

              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 pt-1 border-t border-slate-100">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-emerald-600" />
                  <span>SLA &lt; 24h</span>
                </span>
                <a
                  href="mailto:aftabfarhan324@gmail.com"
                  className="text-[#FF6014] hover:underline font-bold"
                >
                  Send Mail →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── 3. Engineering Architecture & Stack DNA Matrix (Requested Spec) ── */}
        <div className="relative overflow-hidden rounded-2xl glass-card-featured p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-orange-200/60 pb-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-[10px] font-mono font-extrabold uppercase tracking-widest text-[#FF6014]">
                <Cpu className="w-3.5 h-3.5" />
                <span>Engineering Architecture &amp; Tech DNA</span>
              </div>
              <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>Backend Software Engineer</span>
                <span className="text-[#FF6014]">|</span>
                <span>Full Stack Engineer</span>
              </h3>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Production Tested &amp; Scalable Systems</span>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-2 sm:gap-2.5">
            {coreTechBadges.map((skill, index) => (
              <span
                key={skill}
                className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-orange-200/80 hover:border-[#FF6014] text-xs font-bold text-slate-800 hover:text-[#FF6014] shadow-2xs hover:shadow-sm transition-all"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6014]" />
                <span>{skill}</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── 4. Bottom Rights, Technology & Back to Top Bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 text-xs font-bold text-slate-700">
          <p className="text-center sm:text-left">
            <span>© {currentYear} Aftab Farhan Arko. All rights reserved.</span>
          </p>

          <p className="text-center text-slate-500 font-medium hidden md:block">
            Engineered with precision · Next.js 16, TypeScript &amp; Tailwind CSS
          </p>

          <motion.button
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200/90 bg-white hover:bg-orange-50 hover:border-orange-200 hover:text-[#FF6014] text-xs font-bold text-slate-800 transition-all cursor-pointer shadow-2xs"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </motion.div>

      <style>{`
        @media (min-width: 1024px) {
          footer.footer-responsive {
            padding-bottom: 48px !important;
          }
        }
      `}</style>
    </footer>
  );
}