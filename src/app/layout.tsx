"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import QueryProvider from "@/providers/QueryProvider";
import ReduxProvider from "@/providers/ReduxProvider";
import Footer from "@/components/Footer";
import type { Metadata, Viewport } from "next";

// ── Fonts ──
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ── Production Metadata ──
// Note: Move this to a separate `metadata.ts` or `layout-server.tsx` if you split
// server/client layout. Since this file uses "use client", export metadata from
// a parent server component instead.
//
// ✅ Recommended: Create app/metadata.ts and import in a server layout wrapper.
// See bottom of this file for the ready-to-use metadata export block.

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
      <head>
        {/* ── Canonical & Language ── */}
        <link rel="canonical" href="https://aftabfarhanarko.dev" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        {/* ── Favicon Set ── */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />

        {/* ── Primary SEO Meta ── */}
        <meta name="title" content="Aftab Farhan Arko — Full Stack Developer" />
        <meta
          name="description"
          content="Portfolio of Aftab Farhan Arko — a passionate Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. Building production-grade applications with clean code and great UX."
        />
        <meta
          name="keywords"
          content="Aftab Farhan Arko, Full Stack Developer, React Developer, Next.js Developer, Node.js, TypeScript, Portfolio, Web Developer Bangladesh, Software Engineer"
        />
        <meta name="author" content="Aftab Farhan Arko" />
        <meta name="creator" content="Aftab Farhan Arko" />
        <meta name="publisher" content="Aftab Farhan Arko" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="revisit-after" content="7 days" />
        <meta name="language" content="English" />
        <meta name="rating" content="general" />
        <meta name="category" content="technology, portfolio, software development" />

        {/* ── Viewport ── */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="color-scheme" content="dark" />

        {/* ── Open Graph (Facebook, LinkedIn, WhatsApp) ── */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Aftab Farhan Arko" />
        <meta property="og:url" content="https://aftabfarhanarko.dev" />
        <meta property="og:title" content="Aftab Farhan Arko — Full Stack Developer" />
        <meta
          property="og:description"
          content="Full Stack Developer building production-grade web apps with React, Next.js, Node.js & more. Explore my projects, skills, and experience."
        />
        <meta property="og:image" content="https://aftabfarhanarko.dev/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Aftab Farhan Arko — Full Stack Developer Portfolio" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:locale" content="en_US" />

        {/* ── Twitter Card ── */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@aftabfarhanarko" />
        <meta name="twitter:creator" content="@aftabfarhanarko" />
        <meta name="twitter:title" content="Aftab Farhan Arko — Full Stack Developer" />
        <meta
          name="twitter:description"
          content="Full Stack Developer building production-grade web apps with React, Next.js, Node.js & more."
        />
        <meta name="twitter:image" content="https://aftabfarhanarko.dev/og-image.png" />
        <meta name="twitter:image:alt" content="Aftab Farhan Arko Portfolio" />

        {/* ── JSON-LD Structured Data ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Aftab Farhan Arko",
              url: "https://aftabfarhanarko.dev",
              image: "https://aftabfarhanarko.dev/avatar.png",
              sameAs: [
                "https://github.com/aftabfarhanarko",
                "https://linkedin.com/in/aftabfarhanarko",
                "https://twitter.com/aftabfarhanarko",
              ],
              jobTitle: "Full Stack Developer",
              description:
                "Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies.",
              knowsAbout: [
                "React",
                "Next.js",
                "Node.js",
                "TypeScript",
                "JavaScript",
                "PostgreSQL",
                "MongoDB",
                "Docker",
                "REST APIs",
                "GraphQL",
                "Tailwind CSS",
                "Full Stack Development",
              ],
              nationality: "Bangladeshi",
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Your University Name", // 🔁 Update this
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": "https://aftabfarhanarko.dev",
              },
            }),
          }}
        />

        {/* ── WebSite Schema ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Aftab Farhan Arko Portfolio",
              url: "https://aftabfarhanarko.dev",
              description:
                "Portfolio website of Aftab Farhan Arko, Full Stack Developer.",
              author: {
                "@type": "Person",
                name: "Aftab Farhan Arko",
              },
              inLanguage: "en-US",
              copyrightYear: new Date().getFullYear(),
              copyrightHolder: {
                "@type": "Person",
                name: "Aftab Farhan Arko",
              },
            }),
          }}
        />
      </head>

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

        {/* ── Footer ── */}
        {!isDashboard && <Footer />}
      </body>
    </html>
  );
}

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ BONUS: Next.js Native Metadata API (for Server Components)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

If you split this into a Server Layout wrapper, use this instead
of manual <head> tags — Next.js handles merging automatically.

// app/metadata.ts
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://aftabfarhanarko.dev"),
  title: {
    default: "Aftab Farhan Arko — Full Stack Developer",
    template: "%s | Aftab Farhan Arko",
  },
  description:
    "Portfolio of Aftab Farhan Arko — Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies.",
  keywords: [
    "Aftab Farhan Arko",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js",
    "TypeScript",
    "Portfolio",
    "Web Developer Bangladesh",
  ],
  authors: [{ name: "Aftab Farhan Arko", url: "https://aftabfarhanarko.dev" }],
  creator: "Aftab Farhan Arko",
  publisher: "Aftab Farhan Arko",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aftabfarhanarko.dev",
    siteName: "Aftab Farhan Arko",
    title: "Aftab Farhan Arko — Full Stack Developer",
    description:
      "Full Stack Developer building production-grade web apps with React, Next.js, Node.js & more.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aftab Farhan Arko — Full Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aftab Farhan Arko — Full Stack Developer",
    description:
      "Full Stack Developer building production-grade web apps with React, Next.js, Node.js & more.",
    images: ["/og-image.png"],
    creator: "@aftabfarhanarko",
    site: "@aftabfarhanarko",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};
*/