"use client";
import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

type FormState = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formState, setFormState] = useState<FormState>("idle");
  const [focused, setFocused] = useState<string | null>(null);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  const inputBase =
    "w-full bg-white/[0.03] border rounded-xl px-4 py-3.5 text-white placeholder:text-white/25 text-sm font-mono transition-all duration-200 outline-none";

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative mb-32 scroll-mt-24 px-4 sm:px-6 lg:px-0 overflow-hidden"
    >
      {/* ── Subtle bg glow ── */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[120px] opacity-20"
        style={{ background: "radial-gradient(circle, rgba(22,163,74,0.6) 0%, transparent 70%)" }}
      />

      {/* ── Section header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-end gap-5 mb-14"
      >
        <div>
        
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
        {/* ── LEFT: Info panel ── */}
        <motion.div variants={fadeUp} className="lg:col-span-2 flex flex-col gap-4">

          {/* Status */}
          <div className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-green-500/20 bg-green-500/5 backdrop-blur-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
            </span>
            <span className="text-sm text-green-300/80 font-mono">
              open_to_opportunities=<span className="text-green-400">true</span>
            </span>
          </div>

          {/* Blurb */}
          <div className="p-5 rounded-xl border border-white/[0.07] bg-white/[0.02]">
            <p className="text-sm text-white/55 leading-relaxed">
              Whether it&apos;s a <span className="text-white/80">freelance project</span>, a
              <span className="text-white/80"> full-time role</span>, or just a
              technical conversation — my inbox is open.
            </p>
            <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <span className="text-xs font-mono text-white/30">avg. response time: &lt;24h</span>
            </div>
          </div>

          {/* Contact cards */}
          {[
            {
              icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              ),
              label: "arko@nexoviasoft.com",
              sub: "Email",
              href: "mailto:arko@nexoviasoft.com",
            },
            {
              icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
                </svg>
              ),
              label: "Dhaka, Bangladesh",
              sub: "Location",
              href: "#",
            },
            {
              icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8 10a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.574 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              ),
              label: "+880 1234 567890",
              sub: "Phone",
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
                <p className="text-xs text-white/30 font-mono mb-0.5">{item.sub}</p>
                <p className="text-sm text-white/70 group-hover:text-white truncate transition-colors">
                  {item.label}
                </p>
              </div>
              <svg className="ml-auto shrink-0 opacity-0 group-hover:opacity-30 transition-opacity" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </motion.a>
          ))}

          {/* Social row */}
          <div className="flex items-center gap-2 pt-1">
            {[
              {
                label: "GitHub",
                href: "https://github.com/arko",
                icon: <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.837 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />,
              },
              {
                label: "LinkedIn",
                href: "https://linkedin.com/in/arko",
                icon: <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />,
              },
              {
                label: "Twitter",
                href: "https://twitter.com/arko",
                icon: <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />,
              },
            ].map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.05 }}
                transition={{ duration: 0.15 }}
                className="w-9 h-9 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.07] flex items-center justify-center text-white/40 hover:text-white/80 transition-colors"
                aria-label={s.label}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  {s.icon}
                </svg>
              </motion.a>
            ))}
            <span className="ml-auto text-xs font-mono text-white/20">@aftabfarhanarko</span>
          </div>
        </motion.div>

        {/* ── RIGHT: Form ── */}
        <motion.div variants={fadeUp} className="lg:col-span-3">
          <div className="relative rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 lg:p-8 overflow-hidden">
            {/* corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-bl-full blur-2xl pointer-events-none" />

            <AnimatePresence mode="wait">
              {formState === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="flex flex-col items-center justify-center py-16 text-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full border border-green-500/30 bg-green-500/10 flex items-center justify-center text-green-400">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-lg">Message sent!</p>
                    <p className="text-white/40 text-sm mt-1 font-mono">I'll reply within 24 hours.</p>
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
                      { name: "name", label: "Full Name", placeholder: "Aftab Farhan", type: "text" },
                      { name: "email", label: "Email", placeholder: "you@example.com", type: "email" },
                    ].map((field) => (
                      <div key={field.name} className="space-y-1.5">
                        <label className="text-[11px] font-mono text-white/30 uppercase tracking-widest">
                          {field.label}
                        </label>
                        <div className="relative">
                          <input
                            type={field.type}
                            name={field.name}
                            value={formData[field.name as keyof typeof formData]}
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
                          {focused === field.name && (
                            <motion.div
                              layoutId="input-glow"
                              className="absolute inset-0 rounded-xl pointer-events-none"
                              style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.12), 0 0 20px rgba(22,163,74,0.06)" }}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Subject select */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-white/30 uppercase tracking-widest">
                      Subject
                    </label>
                    <div className="relative">
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onFocus={() => setFocused("subject")}
                        onBlur={() => setFocused(null)}
                        required
                        className={`${inputBase} appearance-none cursor-pointer ${
                          focused === "subject"
                            ? "border-white/30 bg-white/[0.05]"
                            : "border-white/[0.08]"
                        } ${!formData.subject ? "text-white/25" : "text-white"}`}
                      >
                        <option value="" disabled className="bg-neutral-900 text-white/50">
                          Select a topic...
                        </option>
                        <option value="freelance" className="bg-neutral-900 text-white">💼 Freelance Project</option>
                        <option value="fulltime" className="bg-neutral-900 text-white">🚀 Full-time Opportunity</option>
                        <option value="collaboration" className="bg-neutral-900 text-white">🤝 Collaboration</option>
                        <option value="consulting" className="bg-neutral-900 text-white">🔍 Technical Consulting</option>
                        <option value="other" className="bg-neutral-900 text-white">💬 Just Saying Hi</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-mono text-white/30 uppercase tracking-widest">
                        Message
                      </label>
                      <span className={`text-[11px] font-mono transition-colors ${
                        formData.message.length > 400 ? "text-yellow-400/60" : "text-white/20"
                      }`}>
                        {formData.message.length}/500
                      </span>
                    </div>
                    <div className="relative">
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
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={formState === "submitting"}
                    whileHover={{ scale: formState === "submitting" ? 1 : 1.01 }}
                    whileTap={{ scale: formState === "submitting" ? 1 : 0.98 }}
                    className="relative w-full py-4 rounded-xl font-bold text-sm tracking-widest uppercase overflow-hidden disabled:cursor-not-allowed transition-opacity disabled:opacity-60"
                    style={{ background: "linear-gradient(135deg, #fff 0%, #d4d4d4 100%)", color: "#000" }}
                  >
                    <AnimatePresence mode="wait">
                      {formState === "submitting" ? (
                        <motion.span
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center gap-2"
                        >
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending...
                        </motion.span>
                      ) : (
                        <motion.span
                          key="idle"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center gap-2"
                        >
                          Send Message
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" />
                          </svg>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  {/* Footer note */}
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