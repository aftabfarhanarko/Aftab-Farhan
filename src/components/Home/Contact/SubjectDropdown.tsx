"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Briefcase, Rocket, Handshake, Search, MessageCircle } from "lucide-react";

export const subjectOptions = [
  { value: "FREELANCE", label: "Freelance Project", icon: <Briefcase size={15} />, desc: "Short or long-term contract work" },
  { value: "FULLTIME", label: "Full-time Opportunity", icon: <Rocket size={15} />, desc: "Looking to hire a dev?" },
  { value: "COLLABORATION", label: "Collaboration", icon: <Handshake size={15} />, desc: "Let's build something together" },
  { value: "CONSULTING", label: "Technical Consulting", icon: <Search size={15} />, desc: "Code review, architecture, advice" },
  { value: "OTHER", label: "Just Saying Hi", icon: <MessageCircle size={15} />, desc: "No agenda, just a chat" },
];

interface SubjectDropdownProps {
  dropdownOpen: boolean;
  setDropdownOpen: (open: boolean) => void;
  formData: { subject: string };
  setFormData: (data: any) => void;
}

export default function SubjectDropdown({
  dropdownOpen,
  setDropdownOpen,
  formData,
  setFormData,
}: SubjectDropdownProps) {
  const selectedOption = subjectOptions.find((opt) => opt.value === formData.subject);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border border-border text-sm font-mono text-left bg-card/40 text-foreground transition-all cursor-pointer ${
          dropdownOpen ? "border-foreground/25 bg-card/60" : ""
        }`}
      >
        {selectedOption ? (
          <div className="flex items-center gap-3 flex-1">
            <span className="text-green-400">{selectedOption.icon}</span>
            <span className="text-foreground">{selectedOption.label}</span>
          </div>
        ) : (
          <span className="text-foreground/35 flex-1">Select a topic...</span>
        )}
        <motion.div animate={{ rotate: dropdownOpen ? 180 : 0 }}>
          <ChevronDown size={16} className="text-foreground/40" />
        </motion.div>
      </button>

      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            className="absolute top-[calc(100%+8px)] left-0 right-0 z-[100] rounded-xl border border-border bg-popover shadow-2xl overflow-hidden"
          >
            {subjectOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  setFormData((prev: any) => ({ ...prev, subject: opt.value }));
                  setDropdownOpen(false);
                }}
                className="w-full px-4 py-3.5 text-left text-sm font-mono flex items-center gap-3 text-foreground/60 hover:bg-card/60 hover:text-foreground transition-colors border-b border-border/40 last:border-0 cursor-pointer"
              >
                <span className="text-foreground/40 group-hover:text-foreground/60">{opt.icon}</span>
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
  );
}
