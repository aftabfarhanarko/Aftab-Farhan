"use client";
import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
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

// --- Custom Brand Icons ---
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
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 11 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const subjectOptions = [
  { value: "FREELANCE", label: "Freelance Project", icon: <Briefcase size={15} />, desc: "Short or long-term contract work" },
  { value: "FULLTIME", label: "Full-time Opportunity", icon: <Rocket size={15} />, desc: "Looking to hire a dev?" },
  { value: "COLLABORATION", label: "Collaboration", icon: <Handshake size={15} />, desc: "Let's build something together" },
  { value: "CONSULTING", label: "Technical Consulting", icon: <Search size={15} />, desc: "Code review, architecture, advice" },
  { value: "OTHER", label: "Just Saying Hi", icon: <MessageCircle size={15} />, desc: "No agenda, just a chat" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const inputBase =
  "w-full px-4 py-3.5 rounded-xl border text-sm font-mono transition-all duration-200 outline-none bg-white/[0.03] text-white placeholder:text-white/20";

export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formState, setFormState] = useState<FormState>("idle");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const contactMutation = useMutation({
    mutationFn: (data: typeof formData) => axios.post("/api/contact", data),
    onSuccess: () => {
      setFormState("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    },
    onError: () => setFormState("error"),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.subject) return alert("Please select a subject");
    setFormState("submitting");
    contactMutation.mutate(formData);
  };

  const selectedOption = subjectOptions.find(
    (opt) => opt.value === formData.subject,
  );

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative mb-32 scroll-mt-24 px-4 sm:px-6 lg:px-0 overflow-visible"
    >
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[120px] opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(22,163,74,0.6) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
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
        <motion.div
          variants={fadeUp}
          className="lg:col-span-2 flex flex-col gap-4"
        >
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-green-500/20 bg-green-500/5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
            </span>
            <span className="text-sm text-green-300/80 font-mono">
              open_to_opportunities=<span className="text-green-400">true</span>
            </span>
          </div>
          <div className="p-5 rounded-xl border border-white/[0.07] bg-white/[0.02]">
            <p className="text-sm text-white/55 leading-relaxed">
              Whether it&apos;s a{" "}
              <span className="text-white/80">freelance project</span>, a{" "}
              <span className="text-white/80">full-time role</span>, or just a
              technical conversation — my inbox is open.
            </p>
          </div>

          {/* Social Links on the Left */}
          <div className="flex gap-2 mb-2">
            {[
              { icon: <LinkedinIcon />, href: "https://linkedin.com/in/arko", color: "hover:text-blue-400" },
              { icon: <GithubIcon />, href: "https://github.com/aftabfarhanarko", color: "hover:text-white" },
              { icon: <WhatsAppIcon />, href: "https://wa.me/8801234567890", color: "hover:text-green-400" },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 transition-all ${social.color} hover:bg-white/10 hover:border-white/20`}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {[
            { icon: <Mail size={16} />, label: "Email", value: "arko@nexoviasoft.com", href: "mailto:arko@nexoviasoft.com" },
            { icon: <MapPin size={16} />, label: "Location", value: "Dhaka, Bangladesh", href: "#" },
            { icon: <Phone size={16} />, label: "Phone", value: "+880 1234 567890", href: "tel:+8801234567890" },
          ].map((item, i) => (
            <motion.a
              key={i}
              href={item.href}
              whileHover={{ x: 4 }}
              className="flex items-center gap-4 px-4 py-3.5 rounded-xl border border-white/[0.07] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04] transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white/70 transition-colors shrink-0">
                {item.icon}
              </div>
              <div className="min-w-0">
                <p className="text-xs text-white/30 font-mono mb-0.5">{item.label}</p>
                <p className="text-sm text-white/70 group-hover:text-white truncate transition-colors">{item.value}</p>
              </div>
            </motion.a>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className="lg:col-span-3">
          <div className="relative rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 lg:p-8 overflow-visible">
            <AnimatePresence mode="wait">
              {formState === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full border border-green-500/30 bg-green-500/10 flex items-center justify-center text-green-400">
                    <Check size={28} />
                  </div>
                  <p className="text-white font-semibold text-lg">Message sent!</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-white/30 uppercase tracking-widest">Full Name</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} required className={inputBase} placeholder="Aftab Farhan" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-white/30 uppercase tracking-widest">Email</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputBase} placeholder="you@example.com" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-white/30 uppercase tracking-widest">Subject</label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border text-sm font-mono text-left bg-white/[0.03] transition-all ${dropdownOpen ? "border-white/30 bg-white/[0.06]" : "border-white/[0.08]"}`}
                      >
                        {selectedOption ? (
                          <div className="flex items-center gap-3 flex-1">
                            <span className="text-green-400">{selectedOption.icon}</span>
                            <span className="text-white">{selectedOption.label}</span>
                          </div>
                        ) : (
                          <span className="text-white/25 flex-1">Select a topic...</span>
                        )}
                        <motion.div animate={{ rotate: dropdownOpen ? 180 : 0 }}>
                          <ChevronDown size={16} className="text-white/30" />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {dropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -8, scale: 0.98 }}
                            className="absolute top-[calc(100%+8px)] left-0 right-0 z-[100] rounded-xl border border-white/[0.1] bg-[#0d0d0d] shadow-2xl overflow-hidden"
                          >
                            {subjectOptions.map((opt) => (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => { setFormData({ ...formData, subject: opt.value }); setDropdownOpen(false); }}
                                className="w-full px-4 py-3.5 text-left text-sm font-mono flex items-center gap-3 text-white/50 hover:bg-white/[0.04] hover:text-white transition-colors border-b border-white/[0.05] last:border-0"
                              >
                                <span className="text-white/30 group-hover:text-white/60">{opt.icon}</span>
                                <div className="flex flex-col">
                                  <span className="font-bold">{opt.label}</span>
                                  <span className="text-[10px] opacity-40">{opt.desc}</span>
                                </div>
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-white/30 uppercase tracking-widest">Message</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} className={inputBase} placeholder="Your message..." />
                  </div>
                  <button
                    type="submit"
                    disabled={formState === "submitting"}
                    className="w-full py-4 rounded-xl font-black text-sm tracking-widest uppercase bg-white text-black hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formState === "submitting" ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                        Sending...
                      </div>
                    ) : (
                      <>Send Message <Send size={15} /></>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

