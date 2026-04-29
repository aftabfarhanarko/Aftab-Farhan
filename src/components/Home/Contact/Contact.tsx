"use client";
import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Check,
  Send,
  Briefcase,
  Rocket,
  Handshake,
  Search,
  MessageCircle,
  ChevronDown,
  ArrowUpRight,
} from "lucide-react";

type FormState = "idle" | "submitting" | "success" | "error";

// --- Custom Brand Icons (replacing removed lucide-react brands) ---
const WhatsAppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

// --- Subject options ---
const subjectOptions = [
  {
    value: "freelance",
    label: "Freelance Project",
    icon: <Briefcase size={15} />,
    desc: "Short or long-term contract work",
  },
  {
    value: "fulltime",
    label: "Full-time Opportunity",
    icon: <Rocket size={15} />,
    desc: "Looking to hire a dev?",
  },
  {
    value: "collaboration",
    label: "Collaboration",
    icon: <Handshake size={15} />,
    desc: "Let's build something together",
  },
  {
    value: "consulting",
    label: "Technical Consulting",
    icon: <Search size={15} />,
    desc: "Code review, architecture, advice",
  },
  {
    value: "other",
    label: "Just Saying Hi",
    icon: <MessageCircle size={15} />,
    desc: "No agenda, just a chat",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formState, setFormState] = useState<FormState>("idle");
  const [focused, setFocused] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    await new Promise((r) => setTimeout(r, 2000));
    setFormState("success");
    setTimeout(() => {
      setFormState("idle");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 4000);
  };

  const selectedOption = subjectOptions.find((o) => o.value === formData.subject);

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const inputBase =
    "w-full bg-white/[0.03] border rounded-xl px-4 py-3.5 text-white placeholder:text-white/25 text-sm font-mono transition-all duration-200 outline-none";

  const socials = [
    { label: "GitHub", href: "https://github.com/arko", icon: <GithubIcon /> },
    { label: "LinkedIn", href: "https://linkedin.com/in/arko", icon: <LinkedinIcon /> },
    { label: "Twitter", href: "https://twitter.com/arko", icon: <TwitterIcon /> },
    { label: "Instagram", href: "https://instagram.com/arko", icon: <InstagramIcon />, accent: "hover:text-pink-400 hover:border-pink-500/30 hover:bg-pink-500/5" },
    { label: "Facebook", href: "https://facebook.com/arko", icon: <FacebookIcon />, accent: "hover:text-blue-400 hover:border-blue-500/30 hover:bg-blue-500/5" },
    { label: "WhatsApp", href: "https://wa.me/8801234567890", icon: <WhatsAppIcon />, accent: "hover:text-green-400 hover:border-green-500/30 hover:bg-green-500/5" },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative mb-32 scroll-mt-24 px-4 sm:px-6 lg:px-0 overflow-visible"
    >
      {/* bg glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[120px] opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(22,163,74,0.6) 0%, transparent 70%)",
        }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-end gap-5 mb-14"
      >
        <div>
          <p className="text-xs font-mono text-green-400/60 tracking-[0.25em] uppercase mb-2">
            24/7 contact
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-none">
            Let&apos;s Build
            <br />
            <span className="text-white/20">Something Great.</span>
          </h2>
        </div>
        <div className="flex-1 mb-2 h-px bg-gradient-to-r from-white/10 to-transparent" />
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="grid lg:grid-cols-5 gap-6 lg:gap-10"
      >
        {/* LEFT */}
        <motion.div variants={fadeUp} className="lg:col-span-2 flex flex-col gap-4">
          {/* Status */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-green-500/20 bg-green-500/5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
            </span>
            <span className="text-sm text-green-300/80 font-mono">
              open_to_opportunities=
              <span className="text-green-400">true</span>
            </span>
          </div>

          {/* Blurb */}
          <div className="p-5 rounded-xl border border-white/[0.07] bg-white/[0.02]">
            <p className="text-sm text-white/55 leading-relaxed">
              Whether it&apos;s a{" "}
              <span className="text-white/80">freelance project</span>, a{" "}
              <span className="text-white/80">full-time role</span>, or just a
              technical conversation — my inbox is open.
            </p>
            <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <span className="text-xs font-mono text-white/30">
                avg. response time: &lt;24h
              </span>
            </div>
          </div>

          {/* Contact cards */}
          {[
            {
              icon: <Mail size={16} />,
              label: "Email",
              value: "arko@nexoviasoft.com",
              href: "mailto:arko@nexoviasoft.com",
            },
            {
              icon: <MapPin size={16} />,
              label: "Location",
              value: "Dhaka, Bangladesh",
              href: "#",
            },
            {
              icon: <Phone size={16} />,
              label: "Phone",
              value: "+880 1234 567890",
              href: "tel:+8801234567890",
            },
          ].map((item, i) => (
            <motion.a
              key={i}
              href={item.href}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-4 px-4 py-3.5 rounded-xl border border-white/[0.07] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04] transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white/70 transition-colors shrink-0">
                {item.icon}
              </div>
              <div className="min-w-0">
                <p className="text-xs text-white/30 font-mono mb-0.5">
                  {item.label}
                </p>
                <p className="text-sm text-white/70 group-hover:text-white truncate transition-colors">
                  {item.value}
                </p>
              </div>
              <ArrowUpRight
                size={14}
                className="ml-auto shrink-0 opacity-0 group-hover:opacity-30 transition-opacity"
              />
            </motion.a>
          ))}

          {/* Socials */}
          <div className="p-4 rounded-xl border border-white/[0.07] bg-white/[0.02]">
            <p className="text-[11px] font-mono text-white/25 uppercase tracking-widest mb-3">
              Find me on
            </p>
            <div className="flex flex-wrap gap-2">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, scale: 1.08 }}
                  transition={{ duration: 0.15 }}
                  title={s.label}
                  className={`w-9 h-9 rounded-lg border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-white/40 transition-all ${
                    s.accent ??
                    "hover:text-white/80 hover:border-white/20 hover:bg-white/[0.07]"
                  }`}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
            <p className="text-[11px] font-mono text-white/20 mt-3">
              @aftabfarhanarko
            </p>
          </div>
        </motion.div>

        {/* RIGHT: Form */}
        <motion.div variants={fadeUp} className="lg:col-span-3">
          <div className="relative rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 lg:p-8 overflow-visible">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-bl-full blur-2xl pointer-events-none" />

            <AnimatePresence mode="wait">
              {formState === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-16 text-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full border border-green-500/30 bg-green-500/10 flex items-center justify-center text-green-400">
                    <Check size={28} />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-lg">
                      Message sent!
                    </p>
                    <p className="text-white/40 text-sm mt-1 font-mono">
                      I&apos;ll reply within 24 hours.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  {/* Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      {
                        name: "name",
                        label: "Full Name",
                        placeholder: "Aftab Farhan",
                        type: "text",
                      },
                      {
                        name: "email",
                        label: "Email",
                        placeholder: "you@example.com",
                        type: "email",
                      },
                    ].map((field) => (
                      <div key={field.name} className="space-y-1.5">
                        <label className="text-[11px] font-mono text-white/30 uppercase tracking-widest">
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          name={field.name}
                          value={
                            formData[field.name as keyof typeof formData]
                          }
                          onChange={handleChange}
                          onFocus={() => setFocused(field.name)}
                          onBlur={() => setFocused(null)}
                          placeholder={field.placeholder}
                          required
                          className={`${inputBase} ${
                            focused === field.name
                              ? "border-white/30 bg-white/[0.05]"
                              : "border-white/[0.08]"
                          }`}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Custom Subject Dropdown */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-white/30 uppercase tracking-widest">
                      Subject
                    </label>
                    <div className="relative">
                      {/* Trigger */}
                      <button
                        type="button"
                        onClick={() => setDropdownOpen((v) => !v)}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border text-sm font-mono text-left transition-all duration-200 outline-none bg-white/[0.03] ${
                          dropdownOpen
                            ? "border-white/30 bg-white/[0.05]"
                            : "border-white/[0.08]"
                        }`}
                      >
                        {selectedOption ? (
                          <>
                            <span className="text-white/60 shrink-0">
                              {selectedOption.icon}
                            </span>
                            <span className="text-white flex-1">
                              {selectedOption.label}
                            </span>
                          </>
                        ) : (
                          <span className="text-white/25 flex-1">
                            Select a topic...
                          </span>
                        )}
                        <motion.span
                          animate={{ rotate: dropdownOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-white/30 shrink-0"
                        >
                          <ChevronDown size={16} />
                        </motion.span>
                      </button>

                      {/* Options panel */}
                      <AnimatePresence>
                        {dropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -8, scale: 0.98 }}
                            transition={{
                              duration: 0.18,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="absolute top-[calc(100%+6px)] left-0 right-0 z-50 rounded-xl border border-white/[0.1] bg-[#0d0d0d] shadow-2xl overflow-hidden"
                          >
                            {subjectOptions.map((opt, i) => {
                              const isSelected =
                                formData.subject === opt.value;
                              return (
                                <motion.button
                                  key={opt.value}
                                  type="button"
                                  initial={{ opacity: 0, x: -8 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.04 }}
                                  onClick={() => {
                                    setFormData({
                                      ...formData,
                                      subject: opt.value,
                                    });
                                    setDropdownOpen(false);
                                  }}
                                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all group ${
                                    isSelected
                                      ? "bg-white/[0.07] text-white"
                                      : "text-white/50 hover:bg-white/[0.04] hover:text-white"
                                  } ${
                                    i !== 0
                                      ? "border-t border-white/[0.05]"
                                      : ""
                                  }`}
                                >
                                  <span
                                    className={`shrink-0 transition-colors ${
                                      isSelected
                                        ? "text-green-400"
                                        : "text-white/30 group-hover:text-white/60"
                                    }`}
                                  >
                                    {opt.icon}
                                  </span>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-mono leading-tight">
                                      {opt.label}
                                    </p>
                                    <p className="text-[11px] text-white/25 mt-0.5">
                                      {opt.desc}
                                    </p>
                                  </div>
                                  {isSelected && (
                                    <Check
                                      size={14}
                                      className="shrink-0 text-green-400"
                                    />
                                  )}
                                </motion.button>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-mono text-white/30 uppercase tracking-widest">
                        Message
                      </label>
                      <span
                        className={`text-[11px] font-mono transition-colors ${
                          formData.message.length > 400
                            ? "text-yellow-400/60"
                            : "text-white/20"
                        }`}
                      >
                        {formData.message.length}/500
                      </span>
                    </div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      placeholder="Tell me about your project, timeline, and budget..."
                      rows={5}
                      maxLength={500}
                      required
                      className={`${inputBase} resize-none ${
                        focused === "message"
                          ? "border-white/30 bg-white/[0.05]"
                          : "border-white/[0.08]"
                      }`}
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={formState === "submitting"}
                    whileHover={{
                      scale: formState === "submitting" ? 1 : 1.01,
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="relative w-full py-4 rounded-xl font-bold text-sm tracking-widest uppercase overflow-hidden disabled:cursor-not-allowed transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
                    style={{
                      background:
                        "linear-gradient(135deg,#fff 0%,#d4d4d4 100%)",
                      color: "#000",
                    }}
                  >
                    <AnimatePresence mode="wait">
                      {formState === "submitting" ? (
                        <motion.span
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <svg
                            className="animate-spin h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                          </svg>
                          Sending...
                        </motion.span>
                      ) : (
                        <motion.span
                          key="idle"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          Send Message
                          <Send size={15} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  <p className="text-center text-[11px] font-mono text-white/20 pt-1">
                    No spam. No newsletters. Just a conversation.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}