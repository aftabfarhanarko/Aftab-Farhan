"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const currentYear = new Date().getFullYear();

const GithubIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 11 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const TwitterIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const FacebookIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const MailIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const socialLinks = [
  {
    href: "https://github.com/aftabfarhanarko",
    label: "GitHub",
    icon: GithubIcon,
    imageSrc: "/github.png",
    colorClass: "hover:text-[#ffffff] dark:hover:text-[#ffffff] hover:bg-[#181717] dark:hover:bg-[#181717] hover:border-[#181717]",
  },
  {
    href: "https://www.linkedin.com/in/aftabfarhan/",
    label: "LinkedIn",
    icon: LinkedinIcon,
    imageSrc: "/likdin.png",
    colorClass: "hover:text-[#ffffff] hover:bg-[#0A66C2] hover:border-[#0A66C2]",
  },

  {
    href: "https://www.facebook.com/aftabfarhanarko.official",
    label: "Facebook",
    icon: FacebookIcon,
    imageSrc: "/facebook.png",
    colorClass: "hover:text-[#ffffff] hover:bg-[#1877F2] hover:border-[#1877F2]",
  },
  { href: "mailto:aftabfarhan324@gmail.com", label: "Email", icon: MailIcon, colorClass: "hover:text-[#ffffff] hover:bg-[#EA4335] hover:border-[#EA4335]" },
];

export default function Footer() {
  return (
    <footer
      className="footer-responsive border-t border-border bg-card/40 px-4 sm:px-6 lg:px-8 pt-10 mt-2"
      style={{
        paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 80px)",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        {/* Top row — stacks vertically & centers on mobile */}
        <div className="flex flex-col items-center text-center sm:flex-row sm:justify-between sm:items-center sm:text-left gap-6 mb-8 flex-wrap">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-xl font-black tracking-tight text-foreground"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Aftab Farhan Arko
            </Link>
            <p className="text-[11.5px] text-foreground/45 mt-1.5 max-w-[220px] leading-relaxed font-mono mx-auto sm:mx-0">
              Junior Full Stack Developer • Building Modern Web Applications
            </p>
          </div>

          {/* Social icons — centered on mobile */}
          <div className="flex items-center justify-center gap-2.5 flex-wrap">
            {socialLinks.map(({ href, label, icon: Icon, imageSrc, colorClass }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={
                  href.startsWith("mailto") ? undefined : "noopener noreferrer"
                }
                aria-label={label}
                className={`w-9 h-9 rounded-[10px] bg-card/50 border border-border flex items-center justify-center text-foreground/55 hover:-translate-y-0.5 transition-all duration-200 ${colorClass}`}
              >
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt={label}
                    className={`w-[18px] h-[18px] object-contain ${label === "GitHub" ? "dark:invert" : ""}`}
                  />
                ) : (
                  <Icon />
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom row — stacks & centers on mobile */}
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between pt-6 border-t border-border">
          <p className="text-[11px] text-foreground/35 font-mono text-center sm:text-left">
            © {currentYear} Aftab Farhan Arko. All rights reserved.
          </p>
          <p className="text-[11px] text-foreground/20 font-mono text-center sm:text-right">
            Built with Next.js, TypeScript, PostgreSQL, Prisma, Framer Motion
          </p>
        </div>
      </motion.div>
      <style>{`
        @media (min-width: 1024px) {
          footer.footer-responsive {
            padding-bottom: 40px !important;
          }
        }
      `}</style>
    </footer>
  );
}
