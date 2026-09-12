"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ArrowUp, Sparkles, Terminal, Code2, ShieldCheck, Mail, MapPin } from "lucide-react";

const currentYear = new Date().getFullYear();

const socialLinks = [
  {
    href: "https://github.com/aftabfarhanarko",
    label: "GitHub",
    imageSrc: "/github.png",
    colorClass: "hover:bg-slate-900 hover:text-white hover:border-slate-900",
  },
  {
    href: "https://www.linkedin.com/in/aftabfarhan/",
    label: "LinkedIn",
    imageSrc: "/likdin.png",
    colorClass: "hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]",
  },
  {
    href: "https://www.facebook.com/aftabfarhanarko.official",
    label: "Facebook",
    imageSrc: "/facebook.png",
    colorClass: "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]",
  },
  {
    href: "mailto:aftabfarhan324@gmail.com",
    label: "Email",
    icon: Mail,
    colorClass: "hover:bg-[#FF6014] hover:text-white hover:border-[#FF6014]",
  },
];

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Services", href: "#capabilities" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="footer-responsive relative border-t border-slate-200/90 bg-white px-4 sm:px-6 lg:px-8 pt-14 pb-12 mt-20 overflow-hidden"
      style={{
        paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 80px)",
      }}
    >
      {/* Top ambient orange glow beam */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF6014]/60 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto"
      >
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-slate-200/90">
          {/* Col 1: Brand & Tagline (5 cols) */}
          <div className="md:col-span-5 flex flex-col items-center text-center md:items-start md:text-left space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-2xl sm:text-3xl font-black tracking-tight text-slate-900 group"
            >
              <span>Aftab Farhan</span>
              <span className="text-[#FF6014]">Arko</span>
              <span className="text-[#FF6014] group-hover:rotate-12 transition-transform duration-300">.</span>
            </Link>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium max-w-md">
              Full Stack Developer &amp; Technical Lead crafting scalable, high-performance web applications with clean architecture and modern engineering standards.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200/90 text-slate-800 text-xs font-bold flex items-center gap-1.5 shadow-2xs">
                <Terminal className="w-3.5 h-3.5 text-[#FF6014]" />
                Next.js 16 &amp; Node.js
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200/90 text-slate-800 text-xs font-bold flex items-center gap-1.5 shadow-2xs">
                <Code2 className="w-3.5 h-3.5 text-[#FF6014]" />
                TypeScript &amp; Prisma
              </span>
            </div>
          </div>

          {/* Col 2: Quick Navigation Links (4 cols) */}
          <div className="md:col-span-4 flex flex-col items-center text-center md:items-start md:text-left space-y-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#FF6014]" />
              Navigation &amp; Sections
            </h4>
            <ul className="grid grid-cols-2 gap-2.5 w-full max-w-xs pt-1">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    
                    data-magnetic-max="6"
                    className="text-sm font-bold text-slate-700 hover:text-[#FF6014] transition-colors flex items-center gap-1.5 group justify-center md:justify-start"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-[#FF6014] group-hover:scale-125 transition-all" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Social Connect & Back to Top (3 cols) */}
          <div className="md:col-span-3 flex flex-col items-center text-center md:items-end md:text-right space-y-4">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">
              Connect &amp; Socials
            </h4>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5">
              {socialLinks.map(({ href, label, icon: Icon, imageSrc, colorClass }) => (
                <motion.a
                  key={label}
                  whileHover={{ y: -4, scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  
                  data-magnetic-max="6"
                  aria-label={label}
                  className={`w-11 h-11 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-center justify-center text-slate-700 shadow-sm transition-all duration-300 ${colorClass}`}
                >
                  {imageSrc ? (
                    <img src={imageSrc} alt={label} className="w-5 h-5 object-contain" />
                  ) : Icon ? (
                    <Icon className="w-5 h-5" />
                  ) : null}
                </motion.a>
              ))}
            </div>

            {/* Back to Top Button */}
            <motion.button
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToTop}
              className="mt-2 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200/90 bg-slate-50 hover:bg-orange-50 hover:border-orange-200 hover:text-[#FF6014] text-xs font-bold text-slate-800 transition-all cursor-pointer shadow-xs"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>

        {/* Bottom Rights & Tech Attribution */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs font-bold text-slate-700">
          <p className="flex items-center gap-1 text-center sm:text-left">
            <span>© {currentYear} Aftab Farhan Arko. All rights reserved.</span>
          </p>

          <div className="flex items-center gap-1.5 text-center sm:text-right">
            <span>Built with precision using Next.js 16, TypeScript &amp; Tailwind CSS</span>
          </div>
        </div>
      </motion.div>

      <style>{`
        @media (min-width: 1024px) {
          footer.footer-responsive {
            padding-bottom: 48px !important;
          }
        }
      `}</style>
    </footer>
  );
}

