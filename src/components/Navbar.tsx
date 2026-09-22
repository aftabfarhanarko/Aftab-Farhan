"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link"; // Next.js এর জন্য, না থাকলে <a> দিয়ে রিপ্লেস করুন
import {
  Home,
  User,
  Layers,
  FolderKanban,
  Briefcase,
  Wrench,
  Smile,
  GraduationCap,
  Mail,
  Moon,
  Sun,
  LogIn,
  LogInIcon,
} from "lucide-react";
import { useTheme } from "@/context/Theme";

// Custom GitHub icon
const GithubIcon = ({ size = 18, ...props }: React.ComponentProps<"svg"> & { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

// Custom LinkedIn icon
const LinkedinIcon = ({ size = 18, ...props }: React.ComponentProps<"svg"> & { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

interface NavItemType {
  id: string;
  label: string;
  icon: any;
  highlight?: boolean;
  href?: string;
}

const navItems: NavItemType[] = [
  { id: "hero", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "services", label: "Services", icon: Wrench },
  { id: "skills", label: "Skills", icon: Layers },
  { id: "projects", label: "Projects", icon: FolderKanban, highlight: true },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "contact", label: "Contact", icon: Mail },
];

// Mobile navigation
const mobileNavItems: NavItemType[] = [
  ...navItems,
];

const socialLinks = [
  {
    label: "GitHub",
    icon: GithubIcon,
    href: "https://github.com/aftabfarhanarko",
  },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const ticking = useRef(false);

  // ✅ Passive + RAF throttled scroll — no jank on mobile
  const handleScroll = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;
    requestAnimationFrame(() => {
      const sy = window.scrollY;
      setIsScrolled(sy > 20);
      const pos = sy + 120;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (pos >= offsetTop && pos < offsetTop + offsetHeight) {
            setActiveSection(item.id);
            break;
          }
        }
      }
      ticking.current = false;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // ✅ iOS Safari compat — scrollIntoView works where window.scrollTo fails
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      const top = el.getBoundingClientRect().top + window.scrollY - 68;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  return (
    <>
      <motion.header
        id="main-navbar"
        className="fixed top-3 sm:top-4 md:top-5 inset-x-0 mx-auto w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] md:w-[calc(100%-3rem)] max-w-7xl z-50 rounded-2xl bg-white/55 backdrop-blur-xl backdrop-saturate-150 border border-white/65 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.07),inset_0_1px_2px_0_rgba(255,255,255,0.9)] transition-all duration-300 ease-out will-change-transform translate-z-0"
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-[64px]">
          {/* Logo */}
          <motion.button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-0.5 bg-transparent border-none cursor-pointer shrink-0"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="hidden sm:inline font-['DM_Sans'] text-[18px] font-black tracking-tight text-gray-900">
              {"<aftab farhan arko />"}
            </span>
            <span className="inline sm:hidden font-['DM_Sans'] text-[16px] font-black tracking-tight text-gray-900">
              {"<arko />"}
            </span>
          </motion.button>

          {/* Desktop Nav (Absolutely Centered in viewport/header) */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 px-2 py-1.5 rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-[inset_0_1px_2px_rgba(255,255,255,0.7)]">
            {navItems.map((item, i) => {
              const active = activeSection === item.id;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm border cursor-pointer whitespace-nowrap font-['DM_Sans'] transition-all duration-200 ${
                    active
                      ? "text-[#FF6014] bg-[#FF6014]/10 border-[#FF6014]/25 font-bold"
                      : "text-gray-600 bg-transparent border-transparent font-medium hover:bg-white/70 hover:text-gray-900 hover:border-white/80"
                  }`}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.03 }}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="navDot"
                      className="inline-block rounded-full w-[5px] h-[5px] bg-[#FF6014] shrink-0"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Action & Social Items */}
          <div className="flex items-center gap-2">
            <motion.a
              href="https://github.com/aftabfarhanarko"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center justify-center rounded-full border border-slate-200 cursor-pointer w-[38px] h-[38px] bg-slate-50 text-slate-900 hover:bg-[#FF6014] hover:text-white hover:border-[#FF6014] transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="GitHub"
            >
              <GithubIcon size={18} />
            </motion.a>

            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center justify-center rounded-full border border-slate-200 cursor-pointer w-[38px] h-[38px] bg-slate-50 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={17} />
            </motion.a>

            {/* Login button */}
            <Link
              href="/login"
              className="flex items-center justify-center rounded-full border border-orange-500/20 cursor-pointer transition-transform hover:scale-105 active:scale-95 text-white h-[38px] px-4 bg-[#FF6014] text-sm font-bold gap-1.5"
              aria-label="Login"
            >
              <LogInIcon size={16} />
              <span className="hidden sm:inline">Admin Login</span>
            </Link>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Navigation Bar */}
      <motion.nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/65 border-t border-white/65 backdrop-blur-xl backdrop-saturate-150 shadow-[0_-10px_30px_-5px_rgba(0,0,0,0.08),inset_0_1px_1px_0_rgba(255,255,255,0.8)] pb-[env(safe-area-inset-bottom,0px)] will-change-transform translate-z-0"
        initial={{ y: 90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${mobileNavItems.length}, 1fr)`,
            height: 62,
            alignItems: "center",
            paddingLeft: 4,
            paddingRight: 4,
          }}
        >
          {mobileNavItems.map((item) => {
            const active = activeSection === item.id;
            const Icon = item.icon;

            return (
              <motion.button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="relative flex flex-col items-center justify-center border-none cursor-pointer bg-transparent w-full"
                style={{ paddingTop: 4, paddingBottom: 2 }}
                whileTap={{ scale: 0.88 }}
              >
                {active && (
                  <motion.span
                    layoutId="mobileTopLine"
                    className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full"
                    style={{
                      width: 20,
                      height: 3,
                      backgroundColor: "#FF6014",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <motion.span
                  animate={{ scale: active ? 1.1 : 1 }}
                  transition={{ type: "spring", stiffness: 420, damping: 26 }}
                  style={{
                    color: active ? "#FF6014" : "#64748B",
                    display: "flex",
                    marginBottom: 2,
                  }}
                >
                  <Icon size={20} strokeWidth={active ? 2.4 : 1.8} />
                </motion.span>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: active ? 700 : 500,
                    color: active ? "#FF6014" : "#64748B",
                    fontFamily: "'DM Sans', sans-serif",
                    lineHeight: 1.1,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    maxWidth: "100%",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.nav>

      {/* Spacer */}
      <div className="h-[64px]" />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800;9..40,900&display=swap');
      `}</style>
    </>
  );
}