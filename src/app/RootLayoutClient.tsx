"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ThemeProvider, useTheme } from "@/context/Theme";
import QueryProvider from "@/providers/QueryProvider";
import ReduxProvider from "@/providers/ReduxProvider";

type TypingLineProps = {
  text: string;
  style: CSSProperties;
  delay: number;
  duration: number;
};

function TypingLine({ text, style, delay, duration }: TypingLineProps) {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [phase, setPhase] = useState<"wait" | "typing" | "hold" | "erasing">(
    "wait",
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPhase("typing");
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (phase === "typing") {
      if (displayed.length < text.length) {
        const t = setTimeout(
          () => setDisplayed(text.slice(0, displayed.length + 1)),
          duration / text.length,
        );
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("hold"), 3000);
      return () => clearTimeout(t);
    }

    if (phase === "hold") {
      const t = setTimeout(() => setPhase("erasing"), 1000);
      return () => clearTimeout(t);
    }

    if (phase === "erasing") {
      if (displayed.length > 0) {
        const t = setTimeout(
          () => setDisplayed(displayed.slice(0, -1)),
          duration / (text.length * 2),
        );
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("typing"), 500);
      return () => clearTimeout(t);
    }
  }, [displayed, phase, text, duration]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span style={style}>
      {displayed}
      <span
        style={{
          opacity: showCursor ? 1 : 0,
          marginLeft: "2px",
          borderLeft: "2px solid currentColor",
        }}
      >
        &nbsp;
      </span>
    </span>
  );
}

function AmbientTypingBackground({ isDark }: { isDark: boolean }) {
  const snippets = [
    {
      text: "const portfolio = new Developer();",
      top: "15%",
      left: "5%",
      opacity: 0.15,
    },
    {
      text: "import { motion } from 'framer-motion';",
      top: "45%",
      left: "75%",
      opacity: 0.1,
    },
    {
      text: "git commit -m 'feat: add smooth animations'",
      top: "80%",
      left: "15%",
      opacity: 0.12,
    },
    {
      text: "while (coding) { improve(); }",
      top: "10%",
      left: "60%",
      opacity: 0.08,
    },
    {
      text: "npm install @heroicons/react",
      top: "65%",
      left: "85%",
      opacity: 0.05,
    },
    {
      text: "export default function Hero() {",
      top: "30%",
      left: "40%",
      opacity: 0.1,
    },
    {
      text: "const [isLoaded, setIsLoaded] = useState(false);",
      top: "90%",
      left: "50%",
      opacity: 0.07,
    },
    {
      text: "console.log('Hello World!');",
      top: "25%",
      left: "10%",
      opacity: 0.1,
    },
    {
      text: "<AnimatePresence mode='wait'>",
      top: "55%",
      left: "20%",
      opacity: 0.08,
    },
    {
      text: "tail -f /var/log/nginx/access.log",
      top: "70%",
      left: "68%",
      opacity: 0.1,
    },
  ];

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      style={{
        fontFamily: "'Bai Jamjuree', system-ui, sans-serif",
        fontSize: "11px",
      }}
    >
      {snippets.map((s, i) => (
        <div
          key={i}
          className="absolute whitespace-nowrap"
          style={{ top: s.top, left: s.left }}
        >
          <TypingLine
            text={s.text}
            delay={i * 350 + 200}
            duration={s.text.length * 60}
            style={{
              color: isDark
                ? `rgba(134, 239, 172, ${s.opacity})`
                : `rgba(22, 163, 74, ${s.opacity * 0.55})`,
              textShadow: isDark
                ? "0 0 10px rgba(22, 163, 74, 0.5)"
                : "0 0 10px rgba(22, 163, 74, 0.18)",
              letterSpacing: "0.03em",
            }}
          />
        </div>
      ))}
    </div>
  );
}

function RootLayoutClientInner({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard") || pathname === "/login";
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const gridLine = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.06)";

  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(${gridLine} 1px, transparent 1px),
              linear-gradient(90deg, ${gridLine} 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        <AmbientTypingBackground isDark={isDark} />

        <motion.div
          className="absolute top-[-10%] left-[-10%] rounded-full blur-[120px]"
          style={{
            width: "40%",
            height: "40%",
            background: isDark
              ? "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(0,0,0,0.04) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute bottom-[10%] right-[-5%] rounded-full blur-[100px]"
          style={{
            width: "30%",
            height: "30%",
            background: isDark
              ? "radial-gradient(circle, rgba(22,163,74,0.15) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(22,163,74,0.10) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        <motion.div
          className="absolute top-[20%] right-[10%] rounded-full blur-[80px]"
          style={{
            width: "25%",
            height: "25%",
            background: isDark
              ? "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>

      {!isDashboard && <Navbar />}

      <QueryProvider>
        <ReduxProvider>
          <AnimatePresence mode="wait">
            <motion.main
              key={isDashboard ? "dashboard" : pathname}
              className={`flex-1 relative z-10 ${!isDashboard ? "pt-20" : ""}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
            >
              {children}
            </motion.main>
          </AnimatePresence>
        </ReduxProvider>
      </QueryProvider>

      {!isDashboard && <Footer />}
    </>
  );
}

export default function RootLayoutClient({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <RootLayoutClientInner>{children}</RootLayoutClientInner>
    </ThemeProvider>
  );
}