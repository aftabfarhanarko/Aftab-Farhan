"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import QueryProvider from "@/providers/QueryProvider";
import ReduxProvider from "@/providers/ReduxProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ── Single Typing Line ──
function TypingLine({
  text,
  style,
  delay,
  duration,
}: {
  text: string;
  style: React.CSSProperties;
  delay: number;
  duration: number;
}) {
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
      } else {
        const t = setTimeout(() => setPhase("hold"), 3000);
        return () => clearTimeout(t);
      }
    } else if (phase === "hold") {
      const t = setTimeout(() => setPhase("erasing"), 1000);
      return () => clearTimeout(t);
    } else if (phase === "erasing") {
      if (displayed.length > 0) {
        const t = setTimeout(
          () => setDisplayed(displayed.slice(0, -1)),
          duration / (text.length * 2),
        );
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("typing"), 500);
        return () => clearTimeout(t);
      }
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

function AmbientTypingBackground() {
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
        fontFamily: "'Geist Mono', 'Fira Code', 'Courier New', monospace",
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
              color: `rgba(134, 239, 172, ${s.opacity})`,
              textShadow: `0 0 10px rgba(22, 163, 74, 0.5)`,
              letterSpacing: "0.03em",
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isDashboard =
    pathname.startsWith("/dashboard") || pathname === "/login";

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body
        className="min-h-full flex flex-col relative overflow-x-hidden"
        style={{ backgroundColor: "#000000", color: "#ffffff" }}
      >
        {/* ── Background Effects ── */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          {/* Grid pattern */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />

          {/* Ambient Typing */}
          <AmbientTypingBackground />

          {/* Glow blobs */}
          <motion.div
            className="absolute top-[-10%] left-[-10%] rounded-full blur-[120px]"
            style={{
              width: "40%",
              height: "40%",
              background:
                "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
            }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[10%] right-[-5%] rounded-full blur-[100px]"
            style={{
              width: "30%",
              height: "30%",
              background:
                "radial-gradient(circle, rgba(22,163,74,0.15) 0%, transparent 70%)",
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
              background:
                "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
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

        {/* ── Navbar ── */}
        {!isDashboard && <Navbar />}

        {/* ── Page Content ── */}
        <QueryProvider>
          <ReduxProvider>
            <AnimatePresence mode="wait">
              <motion.main
                key={pathname}
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

        {/* ── Footer ── */}
        {!isDashboard && (
          <motion.footer
            className="border-t py-8 relative z-10 backdrop-blur-sm"
            style={{
              borderColor: "rgba(255,255,255,0.05)",
              backgroundColor: "rgba(5,13,5,0.8)",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="mx-auto max-w-3xl px-6 text-center text-sm"
              style={{ color: "rgba(226,240,226,0.35)" }}
            >
              © {new Date().getFullYear()} Aftab Farhan Arko. Built with Next.js
              & Tailwind CSS.
            </div>
          </motion.footer>
        )}
      </body>
    </html>
  );
}
