"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Note: metadata must be in a separate server file if using "use client"
// export const metadata: Metadata = { ... }

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
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />

          {/* Glow blobs */}
          <motion.div
            className="absolute top-[-10%] left-[-10%] rounded-full blur-[120px]"
            style={{
              width: "40%",
              height: "40%",
              background:
                "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)",
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
                "radial-gradient(circle, rgba(22,163,74,0.2) 0%, transparent 70%)",
            }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
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
                "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)",
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

        {/* ── Page Content with fade transition ── */}
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


