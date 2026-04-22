"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";

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
        const t = setTimeout(() => setPhase("erasing"), 2800);
        return () => clearTimeout(t);
      }
    }
    if (phase === "erasing") {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 18);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(
          () => setPhase("typing"),
          1200 + Math.random() * 2500,
        );
        return () => clearTimeout(t);
      }
    }
  }, [phase, displayed, text, duration]);

  useEffect(() => {
    const t = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(t);
  }, []);

  if (phase === "wait" && displayed.length === 0) return null;

  return (
    <span style={style}>
      {displayed}
      {showCursor && <span style={{ opacity: 0.7 }}>▌</span>}
    </span>
  );
}

// ── Ambient Typing Background ──
function AmbientTypingBackground() {
  const snippets = [
    {
      text: "const passion = () => code + design;",
      top: "7%",
      left: "2%",
      opacity: 0.14,
    },
    { text: "git commit -m 'ship it'", top: "13%", left: "61%", opacity: 0.11 },
    {
      text: "npm run build && vercel deploy --prod",
      top: "21%",
      left: "4%",
      opacity: 0.1,
    },
    {
      text: "export default function Portfolio()",
      top: "27%",
      left: "54%",
      opacity: 0.13,
    },
    {
      text: "type Dream = Vision & Execution",
      top: "35%",
      left: "2%",
      opacity: 0.11,
    },
    {
      text: "// 3+ years of shipping real products",
      top: "41%",
      left: "67%",
      opacity: 0.12,  
    },
    {
      text: "const stack = ['Next.js', 'TypeScript', 'Tailwind']",
      top: "49%",
      left: "3%",
      opacity: 0.1,
    },
    {
      text: "interface Dev { curious: true; tired: never }",
      top: "56%",
      left: "51%",
      opacity: 0.11,
    },
    {
      text: "useEffect(() => { keepLearning() }, [])",
      top: "63%",
      left: "2%",
      opacity: 0.13,
    },
    {
      text: "200 OK — feature shipped on time",
      top: "69%",
      left: "64%",
      opacity: 0.1,
    },
    {
      text: "async function solve(problem: Hard): Promise<Solution>",
      top: "76%",
      left: "4%",
      opacity: 0.11,
    },
    {
      text: "return <CleanCode readable elegant />",
      top: "82%",
      left: "57%",
      opacity: 0.12,
    },
    {
      text: "docker build -t prod . && docker push",
      top: "88%",
      left: "2%",
      opacity: 0.09,
    },
    {
      text: "zod.object({ email: z.string().email() })",
      top: "93%",
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
        <Navbar />

        {/* ── Page Content ── */}
        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            className="flex-1 pt-20 relative z-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          >
            {children}
          </motion.main>
        </AnimatePresence>

        {/* ── Footer ── */}
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
            © {new Date().getFullYear()} Aftab Farhan Arko. Built with Next.js &
            Tailwind CSS.
          </div>
        </motion.footer>
      </body>
    </html>
  );
}
