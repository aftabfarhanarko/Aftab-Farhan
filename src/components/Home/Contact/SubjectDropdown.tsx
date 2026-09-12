"use client";
import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Briefcase, Rocket, Handshake, Search, MessageCircle } from "lucide-react";

export const subjectOptions = [
  { value: "FREELANCE", label: "Freelance Project", icon: <Briefcase size={16} />, desc: "Short or long-term contract work" },
  { value: "FULLTIME", label: "Full-time Opportunity", icon: <Rocket size={16} />, desc: "Looking to hire a dev?" },
  { value: "COLLABORATION", label: "Collaboration", icon: <Handshake size={16} />, desc: "Let's build something together" },
  { value: "CONSULTING", label: "Technical Consulting", icon: <Search size={16} />, desc: "Code review, architecture, advice" },
  { value: "OTHER", label: "Just Saying Hi", icon: <MessageCircle size={16} />, desc: "No agenda, just a chat" },
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
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedOption = subjectOptions.find((opt) => opt.value === formData.subject);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setDropdownOpen]);

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={`w-full flex items-center justify-between gap-3 px-4.5 py-3.5 rounded-xl border text-sm font-medium text-left bg-slate-50/80 text-slate-900 transition-all cursor-pointer shadow-sm outline-none ${
          dropdownOpen
            ? "border-[#FF6014] ring-2 ring-[#FF6014]/20 bg-white"
            : "border-slate-200 hover:border-slate-300"
        }`}
      >
        {selectedOption ? (
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <span className="text-[#FF6014] shrink-0">{selectedOption.icon}</span>
            <span className="text-slate-900 font-bold truncate">{selectedOption.label}</span>
          </div>
        ) : (
          <span className="text-slate-400 flex-1">Select a topic...</span>
        )}
        <motion.div animate={{ rotate: dropdownOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={18} className="text-slate-500 shrink-0" />
        </motion.div>
      </button>

      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[calc(100%+6px)] left-0 right-0 z-[100] rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-y-auto max-h-[260px] divide-y divide-slate-100 p-1"
          >
            {subjectOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  setFormData((prev: any) => ({ ...prev, subject: opt.value }));
                  setDropdownOpen(false);
                }}
                className={`w-full px-4 py-3 text-left flex items-center gap-3 rounded-xl transition-all cursor-pointer group ${
                  formData.subject === opt.value
                    ? "bg-orange-50/80 text-[#FF6014]"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div
                  className={`p-2 rounded-lg shrink-0 transition-colors ${
                    formData.subject === opt.value
                      ? "bg-[#FF6014] text-white"
                      : "bg-slate-100 text-slate-500 group-hover:bg-orange-50 group-hover:text-[#FF6014]"
                  }`}
                >
                  {opt.icon}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-sm leading-tight text-slate-900 group-hover:text-[#FF6014] transition-colors">
                    {opt.label}
                  </span>
                  <span className="text-xs text-slate-500 font-medium truncate mt-0.5">
                    {opt.desc}
                  </span>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

