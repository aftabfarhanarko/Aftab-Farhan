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
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 11 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
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
  { id: "skills", label: "Skills", icon: Layers },
  { id: "projects", label: "Projects", icon: FolderKanban, highlight: true },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "soft-skills", label: "Soft Skills", icon: Smile },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "contact", label: "Contact", icon: Mail },
];

// মোবাইলের জন্য
const mobileNavItems: NavItemType[] = [
  ...navItems.filter((n) =>
    [
      "hero",
      "about",
      "skills",
      "projects",
      "experience",
      "education",
      "contact",
    ].includes(n.id)
  ),
];

const socialLinks = [
  {
    label: "GitHub",
    icon: GithubIcon,
    href: "https://github.com/aftabfarhanarko",
  },
  {
    label: "LinkedIn",
    icon: LinkedinIcon,
    href: "https://linkedin.com/in/aftabfarhanarko",
  },
  // লগইন আলাদাভাবে রেন্ডার হবে, এখানে রাখার দরকার নেই (তবে রাখলেও ক্ষতি নেই)
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

  const p = {
    bg: isDark ? "rgba(10,10,14,0.88)" : "rgba(250,250,252,0.88)",
    pillBg: isDark ? "rgba(22,22,28,0.96)" : "rgba(238,238,242,0.96)",
    border: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
    text: isDark ? "#EFEFEF" : "#111111",
    muted: isDark ? "rgba(239,239,239,0.42)" : "rgba(17,17,17,0.40)",
    activeBg: isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)",
    hoverBg: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
    accent: "#22c55e",
    accentGlow: "rgba(34,197,94,0.40)",
    accentGrad: "linear-gradient(135deg,#22c55e,#16a34a)",
    shadow: isDark
      ? "0 2px 40px rgba(0,0,0,0.60)"
      : "0 2px 40px rgba(0,0,0,0.10)",
    btmBg: isDark ? "rgba(12,12,16,0.97)" : "rgba(255,255,255,0.97)",
    btmBorder: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
    btmIcon: isDark ? "rgba(255,255,255,0.45)" : "rgba(30,30,30,0.40)",
    btmActive: isDark ? "#FFFFFF" : "#111111",
    socialHoverBg: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)",
  };

  return (
    <>
      <motion.header
        className="fixed top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 md:top-5 md:left-6 md:right-6 lg:left-8 lg:right-8 z-50 rounded-2xl"
        style={{
          backdropFilter: "blur(12px)",        // ✅ 12px mobile-friendly (20px was heavy)
          WebkitBackdropFilter: "blur(12px)",
          backgroundColor: p.bg,
          borderBottom: `1px solid ${p.border}`,
          boxShadow: isScrolled ? p.shadow : "none",
          transition: "background-color 0.3s, box-shadow 0.3s",
          willChange: "transform",              // ✅ GPU layer hint
          transform: "translateZ(0)",           // ✅ force compositor layer
        }}
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-3 sm:px-5 lg:px-8"
          style={{ height: 60 }}
        >
          {/* লোগো */}
          <motion.button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-0.5 bg-transparent border-none cursor-pointer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            {/* Desktop: full text | Mobile: short version */}
            <span
              className="hidden sm:inline"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 19,
                fontWeight: 900,
                letterSpacing: "-0.02em",
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {"<aftab farhan arko />"}
            </span>
            <span
              className="inline sm:hidden"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 16,
                fontWeight: 900,
                letterSpacing: "-0.02em",
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {"<arko />"}
            </span>
          </motion.button>

          {/* ডেস্কটপ ন্যাভিগেশন */}
          <div className="hidden lg:flex items-center gap-0.5 px-2 py-1.5 rounded-full">
            {navItems.map((item, i) => {
              const active = activeSection === item.id;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-semibold border-none cursor-pointer whitespace-nowrap"
                  style={{
                    color: active ? (isDark ? "#fff" : "#000") : p.muted,
                    backgroundColor: active
                      ? isDark
                        ? "rgba(255,255,255,0.10)"
                        : "rgba(0,0,0,0.08)"
                      : "transparent",
                    fontFamily: "'DM Sans', sans-serif",
                    transition: "background-color 0.2s, color 0.2s",
                    fontSize: 13,
                  }}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.03 }}
                  whileHover={{
                    backgroundColor: active
                      ? isDark
                        ? "rgba(255,255,255,0.10)"
                        : "rgba(0,0,0,0.08)"
                      : p.hoverBg,
                    color: active ? (isDark ? "#fff" : "#000") : p.text,
                  }}
                >
                  {active && (
                    <motion.span
                      layoutId="activePill"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: isDark
                          ? "rgba(255,255,255,0.09)"
                          : "rgba(0,0,0,0.07)",
                        zIndex: -1,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="navDot"
                      className="inline-block rounded-full"
                      style={{
                        width: 5,
                        height: 5,
                        background: p.accent,
                        flexShrink: 0,
                      }}
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

          {/* ডান পাশের আইকন (সোশ্যাল + লগইন + থিম) */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* GitHub, LinkedIn — hidden on xs, shown on sm+ */}
            {socialLinks.map((link) => {
              const isLinkedIn = link.label === "LinkedIn";
              const defaultColor = isLinkedIn 
                ? "#0A66C2" 
                : (isDark ? "#FFFFFF" : "#181717");
              const hoverColor = isLinkedIn 
                ? "#FFFFFF" 
                : (isDark ? "#181717" : "#FFFFFF");
              const hoverBg = isLinkedIn 
                ? "#0A66C2" 
                : (isDark ? "#FFFFFF" : "#181717");

              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center justify-center rounded-full border-none cursor-pointer"
                  style={{
                    width: 36,
                    height: 36,
                    backgroundColor: p.activeBg,
                    color: defaultColor,
                    border: `1px solid ${p.border}`,
                  }}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: hoverBg,
                    color: hoverColor,
                    borderColor: hoverBg,
                  }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={link.label}
                >
                  <link.icon size={17} />
                </motion.a>
              );
            })}

            {/* 🟢 ছোট লগইন আইকন */}
            <Link href="/login" passHref legacyBehavior>
              <motion.a
                className="flex items-center justify-center rounded-full border-none cursor-pointer"
                style={{
                  width: 30,          // ছোট
                  height: 30,
                  backgroundColor: p.accent,   // সবুজ ব্যাকগ্রাউন্ড
                  color: "#ffffff",
                  border: `1px solid ${p.border}`,
                }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "#16a34a", // গাঢ় সবুজ
                  color: "#ffffff",
                }}
                whileTap={{ scale: 0.9 }}
                aria-label="Login"
              >
                <LogInIcon size={16} />
              </motion.a>
            </Link>

            {/* থিম টগল */}
            <motion.button
              onClick={toggleTheme}
              className="flex items-center justify-center rounded-full border-none cursor-pointer"
              style={{
                width: 38,
                height: 38,
                backgroundColor: p.activeBg,
                color: p.text,
                border: `1px solid ${p.border}`,
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={isDark ? "moon" : "sun"}
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {isDark ? <Moon size={16} /> : <Sun size={16} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* ---------- মোবাইল বটম নেভ ---------- */}
      <motion.nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50"
        style={{
          backgroundColor: p.btmBg,
          borderTop: `1px solid ${p.btmBorder}`,
          backdropFilter: "blur(14px)",           // ✅ reduced from 22px
          WebkitBackdropFilter: "blur(14px)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
          willChange: "transform",                // ✅ GPU compositor hint
          transform: "translateZ(0)",             // ✅ own compositing layer
        }}
        initial={{ y: 90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${mobileNavItems.length}, 1fr)`,
            height: 62,
            alignItems: "end",
            paddingBottom: 6,
            paddingLeft: 4,
            paddingRight: 4,
          }}
        >
          {mobileNavItems.map((item) => {
            const active = activeSection === item.id;
            const Icon = item.icon;
            const isCenter = item.highlight;

            // সেন্টার প্রজেক্ট বাটন
            if (isCenter) {
              return (
                <motion.button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="relative flex flex-col items-center justify-center border-none cursor-pointer bg-transparent"
                  style={{ marginTop: -18 }}
                  whileTap={{ scale: 0.91 }}
                >
                  <motion.div
                    className="flex items-center justify-center rounded-full transition-all duration-300"
                    style={{
                      width: 50,
                      height: 50,
                      background: active ? p.accentGrad : (isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"),
                      boxShadow: active ? `0 4px 22px ${p.accentGlow}` : "none",
                      border: active ? "none" : `1px solid ${p.border}`
                    }}
                    whileHover={{ scale: 1.08 }}
                  >
                    <Icon size={22} color={active ? "#ffffff" : (isDark ? "rgba(255,255,255,0.6)" : "rgba(30,30,30,0.6)")} strokeWidth={2} />
                  </motion.div>
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      color: active ? p.accent : p.btmIcon,
                      fontFamily: "'DM Sans', sans-serif",
                      marginTop: 2,
                      lineHeight: 1.2,
                      transition: "color 0.3s"
                    }}
                  >
                    {item.label}
                  </span>
                </motion.button>
              );
            }

            // সাধারণ মোবাইল আইটেম
            return (
              <motion.button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="relative flex flex-col items-center justify-center border-none cursor-pointer bg-transparent w-full"
                style={{ paddingTop: 6, paddingBottom: 2 }}
                whileTap={{ scale: 0.88 }}
              >
                {active && (
                  <motion.span
                    layoutId="mobileTopLine"
                    className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full"
                    style={{
                      width: 18,
                      height: 2.5,
                      backgroundColor: p.accent,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <motion.span
                  animate={{ scale: active ? 1.1 : 1 }}
                  transition={{ type: "spring", stiffness: 420, damping: 26 }}
                  style={{
                    color: active ? p.accent : p.btmIcon,
                    display: "flex",
                    marginBottom: 2,
                    transition: "color 0.3s"
                  }}
                >
                  <Icon size={20} strokeWidth={active ? 2.4 : 1.8} />
                </motion.span>
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: active ? 700 : 500,
                    color: active ? p.accent : p.btmIcon,
                    fontFamily: "'DM Sans', sans-serif",
                    lineHeight: 1.1,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    maxWidth: "100%",
                    textOverflow: "ellipsis",
                    transition: "color 0.3s"
                  }}
                >
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.nav>

      {/* স্পেসার — top navbar height */}
      <div className="h-[60px]" />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Playfair+Display:wght@900&display=swap');
      `}</style>
    </>
  );
}