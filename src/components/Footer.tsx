"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUp, Mail } from "lucide-react";

// --- Custom Brand Icons (same as Contact component) ---
const GithubIcon = (props: React.ComponentProps<"svg">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = (props: React.ComponentProps<"svg">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = (props: React.ComponentProps<"svg">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

const FacebookIcon = (props: React.ComponentProps<"svg">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = (props: React.ComponentProps<"svg">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const WhatsAppIcon = (props: React.ComponentProps<"svg">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const navLinks = [
  { label: "Home", id: "hero" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
];

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] pt-10 pb-6 px-4 sm:px-6 lg:px-0 mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Top grid – shorter height */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Brand + description */}
          <div className="lg:col-span-2">
            <span
              className="inline-block text-lg font-black tracking-tight bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent mb-2"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {"<aftab farhan arko />"}
            </span>
            <p className="text-sm text-black/50 dark:text-white/50 max-w-xs leading-relaxed">
              Full‑stack developer specializing in React, Next.js, and Node.js.
              Building scalable, high‑performance web applications.
            </p>
          </div>

          {/* Social icons – all platforms + Email */}
          <div>
            <h4 className="text-xs font-bold text-black/40 dark:text-white/40 uppercase tracking-widest mb-3">
              Connect
            </h4>
            <div className="grid grid-cols-6">
              {/* GitHub */}
              <a
                href="https://github.com/aftabfhan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-black/10 dark:border-white/10 flex items-center justify-center text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:border-black/30 dark:hover:border-white/30 transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon width={16} height={16} />
              </a>
              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/aftabfarhanarko"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-black/10 dark:border-white/10 flex items-center justify-center text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:border-black/30 dark:hover:border-white/30 transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon width={16} height={16} />
              </a>
              {/* Twitter */}
              <a
                href="https://twitter.com/aftabfarhan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-black/10 dark:border-white/10 flex items-center justify-center text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:border-black/30 dark:hover:border-white/30 transition-colors"
                aria-label="Twitter"
              >
                <TwitterIcon width={16} height={16} />
              </a>
              {/* Facebook */}
              <a
                href="https://facebook.com/aftabfarhan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-black/10 dark:border-white/10 flex items-center justify-center text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:border-black/30 dark:hover:border-white/30 transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon width={16} height={16} />
              </a>
              {/* Instagram */}
              <a
                href="https://instagram.com/aftabfarhan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-black/10 dark:border-white/10 flex items-center justify-center text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:border-black/30 dark:hover:border-white/30 transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon width={16} height={16} />
              </a>
              {/* WhatsApp */}
              <a
                href="https://wa.me/8801234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-black/10 dark:border-white/10 flex items-center justify-center text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:border-black/30 dark:hover:border-white/30 transition-colors"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon width={16} height={16} />
              </a>
            </div>
          </div>

          {/* Contact info with Email icon */}
          <div>
            <h4 className="text-xs font-bold text-black/40 dark:text-white/40 uppercase tracking-widest mb-3">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-black/60 dark:text-white/60">
              <li>Dhaka, Bangladesh</li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-black/40 dark:text-white/40 shrink-0" />
                <a
                  href="mailto:arko@nexoviasoft.com"
                  className="hover:text-black dark:hover:text-white transition-colors"
                >
                  arko@nexoviasoft.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+8801234567890"
                  className="hover:text-black dark:hover:text-white transition-colors"
                >
                  +880 1234 567890
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar – shorter */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-5 border-t border-black/10 dark:border-white/10">
          <p className="text-xs text-black/40 dark:text-white/40">
            © {new Date().getFullYear()} Aftab Farhan Arko. All rights reserved.
          </p>
          <p className="text-xs text-black/30 dark:text-white/30 mt-1 sm:mt-0">
            Crafted with clean code & modern stack.
          </p>
        </div>
      </div>

      {/* Scroll to top button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full border border-black/10 dark:border-white/10 bg-black/[0.04] dark:bg-white/[0.04] backdrop-blur-md flex items-center justify-center text-black dark:text-white shadow-lg hover:scale-110 transition-transform"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: showScrollTop ? 1 : 0, y: showScrollTop ? 0 : 10 }}
        transition={{ duration: 0.2 }}
        aria-label="Back to top"
        style={{ pointerEvents: showScrollTop ? "auto" : "none" }}
      >
        <ArrowUp size={18} />
      </motion.button>
    </footer>
  );
};

export default Footer;