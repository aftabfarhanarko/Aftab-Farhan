"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const currentYear = new Date().getFullYear();

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { href: "https://github.com/yourusername", label: "GitHub", icon: "🐙" },
  { href: "https://linkedin.com/in/yourusername", label: "LinkedIn", icon: "💼" },
  { href: "https://twitter.com/yourusername", label: "Twitter", icon: "🐦" },
];

export default function Footer() {
  return (
    <footer className="border-t border-black/[0.07] dark:border-white/[0.07] bg-black/[0.02] dark:bg-white/[0.02] px-4 sm:px-6 lg:px-8 py-12 mt-32">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        {/* Top row: Logo / Name + Nav + Social */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 mb-10">
          {/* Brand */}
          <div>
            <Link href="/" className="text-xl font-black tracking-tight text-black dark:text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
              YourName<span className="text-black/30 dark:text-white/30">.</span>
            </Link>
            <p className="text-xs text-black/50 dark:text-white/50 mt-1 max-w-xs leading-relaxed">
              Crafting thoughtful digital experiences with clean code & design.
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-medium text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-8 h-8 rounded-lg bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.06] flex items-center justify-center text-sm hover:scale-110 transition-transform"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom row: copyright + monospace note */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-black/[0.06] dark:border-white/[0.06]">
          <p className="text-[11px] text-black/40 dark:text-white/40 font-mono">
            © {currentYear} YourName. All rights reserved.
          </p>
          <p className="text-[11px] text-black/25 dark:text-white/25 font-mono">
            Built with Next.js, Tailwind & Framer Motion
          </p>
        </div>
      </motion.div>
    </footer>
  );
}