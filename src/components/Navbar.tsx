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

// ── Nav items ──────────────────────────────────────────────────────────────────
const navItems = [
  { id: "hero", label: "Home", icon: Home, highlight: false },
  { id: "about", label: "About", icon: User, highlight: false },
  { id: "skills", label: "Skills", icon: Layers, highlight: false },
  { id: "projects", label: "Projects", icon: FolderKanban, highlight: true },
  { id: "experience", label: "Experience", icon: Briefcase, highlight: false },
  { id: "services", label: "Services", icon: Wrench, highlight: false },
  { id: "soft-skills", label: "Soft Skills", icon: Smile, highlight: false },
  {
    id: "education",
    label: "Education",
    icon: GraduationCap,
    highlight: false,
  },
  { id: "contact", label: "Contact", icon: Mail, highlight: false },
];

// Mobile shows 7 items, Projects is the raised centre FAB
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

// ── Theme toggle ───────────────────────────────────────────────────────────────
const ThemeToggle = ({
  isDark,
  onToggle,
  activeBg,
  textColor,
}: {
  isDark: boolean;
  onToggle: () => void;
  activeBg: string;
  textColor: string;
}) => (
  <motion.button
    onClick={onToggle}
    className="relative flex items-center justify-center rounded-full border-none cursor-pointer overflow-hidden"
    style={{
      width: 40,
      height: 40,
      backgroundColor: activeBg,
      color: textColor,
    }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    title="Toggle theme"
    aria-label="Toggle theme"
  >
    <AnimatePresence mode="wait">
      <motion.span
        key={isDark ? "moon" : "sun"}
        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.22 }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isDark ? <Moon size={18} /> : <Sun size={18} />}
      </motion.span>
    </AnimatePresence>
  </motion.button>
);

// ── Main Navbar ────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const pos = window.scrollY + 100;
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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: "smooth" });
  };

  // ── Palette ────────────────────────────────────────────────────────────────
  const p = {
    topBg: isDark ? "rgba(8,8,12,0.86)" : "rgba(255,255,255,0.86)",
    // ↓ Mobile bottom bar: always a crisp white/light regardless of theme
    btmBg: isDark ? "rgba(18,18,24,0.97)" : "rgba(255,255,255,0.97)",
    border: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
    text: isDark ? "#EFEFEF" : "#111111",
    muted: isDark ? "rgba(239,239,239,0.38)" : "rgba(17,17,17,0.38)",
    activeBg: isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.07)",
    hoverBg: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
    accent: "#22c55e",
    accentGlow: "rgba(34,197,94,0.42)",
    accentGrad: "linear-gradient(135deg,#22c55e,#16a34a)",
    shadow: isDark
      ? "0 8px 40px rgba(0,0,0,0.55)"
      : "0 8px 40px rgba(0,0,0,0.09)",

    // ── Bottom nav specific ──────────────────────────────────────────────────
    // Inactive icon/label: white in dark mode, dark-grey in light mode
    btmIcon: isDark ? "rgba(255,255,255,0.55)" : "rgba(30,30,30,0.45)",
    // Active icon/label: pure white in dark, near-black in light
    btmActive: isDark ? "#FFFFFF" : "#111111",
    // Bottom bar border
    btmBorder: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
  };

  return (
    <>
      {/* ═══════════════════════════════ TOP BAR ══════════════════════════════ */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          backgroundColor: p.topBg,
          borderBottom: `1px solid ${p.border}`,
          boxShadow: isScrolled ? p.shadow : "none",
          transition: "background-color 0.35s, box-shadow 0.35s",
        }}
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8"
          style={{ height: 64 }}
        >
          {/* Logo */}
          <motion.button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-0.5 bg-transparent border-none cursor-pointer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <span
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 22,
                fontWeight: 900,
                letterSpacing: "-0.03em",
                color: p.text,
              }}
            >
              Arko
            </span>
            <span
              style={{
                color: p.accent,
                fontSize: 30,
                lineHeight: 1,
                marginTop: -4,
              }}
            >
              .
            </span>
          </motion.button>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item, i) => {
              const active = activeSection === item.id;
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold border-none cursor-pointer"
                  style={{
                    color: active ? p.text : p.muted,
                    backgroundColor: active ? p.activeBg : "transparent",
                    fontFamily: "'DM Sans', sans-serif",
                    transition: "background-color 0.2s, color 0.2s",
                  }}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.035 }}
                  whileHover={{
                    y: -1,
                    backgroundColor: active ? p.activeBg : p.hoverBg,
                  }}
                >
                  <Icon size={13} strokeWidth={2.2} />
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="desktopDot"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 rounded-full"
                      style={{ width: 5, height: 5, backgroundColor: p.accent }}
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

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <ThemeToggle
              isDark={isDark}
              onToggle={() => setIsDark(!isDark)}
              activeBg={p.activeBg}
              textColor={p.text}
            />

            {/* ── Resume button — icon & text always WHITE ── */}
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold no-underline"
              style={{
                background: p.accentGrad,
                // Force white for icon + label regardless of theme
                color: "#ffffff",
                boxShadow: `0 4px 18px ${p.accentGlow}`,
                fontFamily: "'DM Sans', sans-serif",
              }}
              whileHover={{
                scale: 1.06,
                boxShadow: `0 8px 28px ${p.accentGlow}`,
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Download icon — explicitly white */}
              <Download size={15} strokeWidth={2.5} color="#ffffff" />
              Resume
            </motion.a>
          </div>
        </nav>
      </motion.header>

      {/* ══════════════════════════ BOTTOM MOBILE NAV ═════════════════════════ */}
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

            /* ── Raised FAB centre button (Projects) ── */
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
                    {/* Icon inside FAB always white */}
                    <Icon size={24} color="#ffffff" strokeWidth={2} />
                  </motion.div>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      // FAB label: white in dark, green in light (stays readable)
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

            /* ── Regular tab ── */
            return (
              <motion.button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="relative flex flex-col items-center justify-center border-none cursor-pointer bg-transparent"
                style={{ minWidth: 42, paddingTop: 6, paddingBottom: 2 }}
                whileTap={{ scale: 0.88 }}
              >
                {/* Active top indicator */}
                {active && (
                  <motion.span
                    layoutId="mobileTopLine"
                    className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full"
                    style={{
                      width: 20,
                      height: 2.5,
                      backgroundColor: isDark ? "#ffffff" : p.accent,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                <motion.span
                  animate={{ scale: active ? 1.18 : 1 }}
                  transition={{ type: "spring", stiffness: 420, damping: 26 }}
                  style={{
                    // Active: white (dark) / near-black (light) | Inactive: muted white/grey
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

      {/* Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Playfair+Display:wght@900&display=swap');
      `}</style>
    </>
  );
};

export default Navbar;
