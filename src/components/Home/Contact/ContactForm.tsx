"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Check, Send } from "lucide-react";
import { fadeUp } from "./ContactInfo";
import SubjectDropdown from "./SubjectDropdown";

type FormState = "idle" | "submitting" | "success" | "error";

const inputBase =
  "w-full px-4 py-3.5 rounded-xl border border-border text-sm font-mono transition-all duration-200 outline-none bg-card/40 text-foreground placeholder:text-foreground/40 focus:border-foreground/25 focus:bg-card/60";

export default function ContactForm() {
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

  return (
    <motion.div variants={fadeUp} className="lg:col-span-3">
      <div className="relative rounded-2xl border border-border bg-card/40 p-6 lg:p-8 overflow-visible">
        <AnimatePresence mode="wait">
          {formState === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center gap-4"
            >
              <div className="w-16 h-16 rounded-full border border-green-500/30 bg-green-500/10 flex items-center justify-center text-green-400">
                <Check size={28} />
              </div>
              <p className="text-foreground font-semibold text-lg">Message sent!</p>
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
                  <label className="text-[11px] font-mono text-foreground/40 uppercase tracking-widest">Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className={inputBase} placeholder="Aftab Farhan" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-foreground/40 uppercase tracking-widest">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputBase} placeholder="you@example.com" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-foreground/40 uppercase tracking-widest">Subject</label>
                <SubjectDropdown
                  dropdownOpen={dropdownOpen}
                  setDropdownOpen={setDropdownOpen}
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-foreground/40 uppercase tracking-widest">Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} className={inputBase} placeholder="Your message..." />
              </div>
              <button
                type="submit"
                disabled={formState === "submitting"}
                className="w-full py-4 rounded-xl font-black text-sm tracking-widest uppercase bg-foreground text-background hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {formState === "submitting" ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-background/25 border-t-background rounded-full animate-spin" />
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
  );
}
