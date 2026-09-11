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
  "w-full px-4 py-3.5 rounded-xl border border-slate-200 text-base transition-all duration-200 outline-none bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-[#FF6014] focus:ring-1 focus:ring-[#FF6014]";

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
      <div className="relative rounded-2xl border border-slate-200 bg-white p-6 lg:p-8 overflow-visible shadow-sm">
        <AnimatePresence mode="wait">
          {formState === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center gap-4"
            >
              <div className="w-16 h-16 rounded-full border border-orange-200 bg-orange-50 flex items-center justify-center text-[#FF6014]">
                <Check size={28} />
              </div>
              <p className="text-slate-900 font-bold text-lg">Message sent successfully!</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className={inputBase} placeholder="Aftab Farhan" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputBase} placeholder="name@company.com" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Subject</label>
                <SubjectDropdown
                  dropdownOpen={dropdownOpen}
                  setDropdownOpen={setDropdownOpen}
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} className={inputBase} placeholder="Your message..." />
              </div>
              <button
                type="submit"
                disabled={formState === "submitting"}
                className="w-full py-4 rounded-xl font-bold text-base bg-[#FF6014] hover:bg-[#E5530F] text-white transition-all flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-sm"
              >
                {formState === "submitting" ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/25 border-t-white rounded-full animate-spin" />
                    Sending...
                  </div>
                ) : (
                  <>Send Message <Send size={18} /></>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
