"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, MessageSquare } from "lucide-react";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative mb-20 sm:mb-24 scroll-mt-24 px-4 sm:px-6 lg:px-0 overflow-visible"
    >
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center justify-center text-center sm:flex-row sm:items-end sm:justify-start sm:text-left gap-5 mb-12"
      >
        <div className="flex flex-col items-center sm:items-start space-y-2">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200/80 bg-orange-50/80 text-[#FF6014] text-xs font-black shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF6014]" />
            <span>GET IN TOUCH</span>
          </motion.div>

          <h2 className="text-[36px] sm:text-[44px] md:text-[50px] font-black tracking-tight text-slate-900 leading-none">
            Let&apos;s Build <span className="text-[#FF6014]">Something Great.</span>
          </h2>
        </div>

        {/* Divider beam line */}
        <div className="flex-1 mb-3 h-[2px] bg-gradient-to-r from-orange-200 via-slate-200 to-transparent hidden sm:block rounded-full" />
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="grid lg:grid-cols-5 gap-6 lg:gap-10 items-start"
      >
        <ContactInfo />
        <ContactForm />
      </motion.div>
    </section>
  );
}

