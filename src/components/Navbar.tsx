"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Download,
} from "lucide-react";

const navItems = [
  { id: "hero", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Layers },
  { id: "projects", label: "Projects", icon: FolderKanban, highlight: true },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "soft-skills", label: "Soft Skills", icon: Smile },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "contact", label: "Contact", icon: Mail },
];

const mobileNavItems = navItems.filter((n) =>
  [
    "hero",
    "about",
    "skills",
    "projects",
    "experience",
    "education",
    "contact",
  ].includes(n.id),
);

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const pos = window.scrollY + 120;
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
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: "smooth" });
  };

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
  };

  return (
    <>
      {/* ═══════════ TOP BAR ═══════════ */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 max-w-7xl mx-auto rounded-2xl mt-5"
        style={{
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          backgroundColor: p.bg,
          borderBottom: `1px solid ${p.border}`,
          boxShadow: isScrolled ? p.shadow : "none",
          transition: "background-color 0.3s, box-shadow 0.3s",
        }}
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8"
          style={{ height: 64 }}
        >
          {/* ── Logo ── */}
          <motion.button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-0.5 bg-transparent border-none cursor-pointer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <span
              style={{
                fontFamily: "'Roboto', sans-serif",
                fontSize: 20,
                fontWeight: 900,
                letterSpacing: "-0.02em",
                color: "#ffffff",
              }}
            >
              {"<aftab farhan arko />"}
            </span>
          </motion.button>

          {/* ── Desktop: single pill nav ── */}
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
                  {/* Active pill highlight */}
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

                  {/* Active dot */}
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

          {/* ── Right controls ── */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <motion.button
              onClick={() => setIsDark(!isDark)}
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

            {/* Resume button */}
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold no-underline"
              style={{
                background: p.accentGrad,
                color: "#ffffff",
                boxShadow: `0 4px 18px ${p.accentGlow}`,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: `0 8px 26px ${p.accentGlow}`,
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={14} strokeWidth={2.5} color="#fff" />
              Resume
            </motion.a>
          </div>
        </nav>
      </motion.header>

      {/* ═══════════ BOTTOM MOBILE NAV ═══════════ */}
      <motion.nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50"
        style={{
          backgroundColor: p.btmBg,
          borderTop: `1px solid ${p.btmBorder}`,
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
          paddingBottom: "env(safe-area-inset-bottom, 6px)",
        }}
        initial={{ y: 90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="flex items-end justify-around"
          style={{ height: 66, paddingBottom: 6 }}
        >
          {mobileNavItems.map((item) => {
            const active = activeSection === item.id;
            const Icon = item.icon;
            const isCenter = item.highlight;

            if (isCenter) {
              return (
                <motion.button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="relative flex flex-col items-center justify-center border-none cursor-pointer bg-transparent"
                  style={{ marginTop: -22, minWidth: 58 }}
                  whileTap={{ scale: 0.91 }}
                >
                  <motion.div
                    className="flex items-center justify-center rounded-full"
                    style={{
                      width: 56,
                      height: 56,
                      background: p.accentGrad,
                      boxShadow: `0 4px 22px ${p.accentGlow}`,
                    }}
                    whileHover={{ scale: 1.08 }}
                  >
                    <Icon size={24} color="#ffffff" strokeWidth={2} />
                  </motion.div>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: isDark ? "#ffffff" : p.accent,
                      fontFamily: "'DM Sans', sans-serif",
                      marginTop: 3,
                      lineHeight: 1.2,
                    }}
                  >
                    {item.label}
                  </span>
                </motion.button>
              );
            }

            return (
              <motion.button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="relative flex flex-col items-center justify-center border-none cursor-pointer bg-transparent"
                style={{ minWidth: 42, paddingTop: 6, paddingBottom: 2 }}
                whileTap={{ scale: 0.88 }}
              >
                {active && (
                  <motion.span
                    layoutId="mobileTopLine"
                    className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full"
                    style={{
                      width: 20,
                      height: 2.5,
                      backgroundColor: isDark ? "#fff" : p.accent,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <motion.span
                  animate={{ scale: active ? 1.18 : 1 }}
                  transition={{ type: "spring", stiffness: 420, damping: 26 }}
                  style={{
                    color: active ? p.btmActive : p.btmIcon,
                    display: "flex",
                    marginBottom: 3,
                  }}
                >
                  <Icon size={22} strokeWidth={active ? 2.4 : 1.8} />
                </motion.span>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: active ? 700 : 500,
                    color: active ? p.btmActive : p.btmIcon,
                    fontFamily: "'DM Sans', sans-serif",
                    lineHeight: 1.1,
                    whiteSpace: "nowrap",
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
      <div className="h-16" />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Playfair+Display:wght@900&display=swap');
      `}</style>
    </>
  );
}
