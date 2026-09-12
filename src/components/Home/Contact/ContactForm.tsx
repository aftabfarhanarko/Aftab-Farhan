"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Check, Send, Sparkles } from "lucide-react";
import { fadeUp } from "./ContactInfo";
import SubjectDropdown from "./SubjectDropdown";

type FormState = "idle" | "submitting" | "success" | "error";

const inputBase =
  "w-full px-4.5 py-3.5 rounded-xl border border-slate-200 text-base font-medium transition-all duration-200 outline-none bg-slate-50/80 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#FF6014] focus:ring-2 focus:ring-[#FF6014]/20 shadow-sm";

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
      <div className="relative rounded-2xl border border-slate-200/90 bg-white p-6 lg:p-8 overflow-visible shadow-sm hover:shadow-xl transition-all duration-300 group">
        {/* Top ambient line beam */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#FF6014]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 rounded-t-2xl" />

        <AnimatePresence mode="wait">
          {formState === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center gap-4"
            >
              <div className="w-16 h-16 rounded-2xl border border-orange-200 bg-orange-50 flex items-center justify-center text-[#FF6014] shadow-sm">
                <Check size={30} className="stroke-[2.5]" />
              </div>
              <h4 className="text-slate-900 font-black text-xl">Message Sent Successfully!</h4>
              <p className="text-slate-700 text-sm font-medium max-w-sm">
                Thank you for reaching out. I will review your message and get back to you shortly.
              </p>
              <button
                onClick={() => setFormState("idle")}
                className="mt-2 px-5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
              >
                Send Another Message
              </button>
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
                  <label className="text-xs font-black text-slate-800 uppercase tracking-wider">Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className={inputBase} placeholder="Aftab Farhan" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-800 uppercase tracking-wider">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputBase} placeholder="name@company.com" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-800 uppercase tracking-wider">Inquiry Subject</label>
                <SubjectDropdown
                  dropdownOpen={dropdownOpen}
                  setDropdownOpen={setDropdownOpen}
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-800 uppercase tracking-wider">Project Details / Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} className={inputBase} placeholder="Tell me about your project, timeline, or inquiries..." />
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={formState === "submitting"}
                className="w-full py-4 rounded-xl font-black text-base bg-[#FF6014] hover:bg-[#E5530F] text-white transition-all flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-md shadow-orange-500/20 group"
              >
                {formState === "submitting" ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sending Message...</span>
                  </div>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

