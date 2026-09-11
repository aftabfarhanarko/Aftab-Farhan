"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative mb-20 sm:mb-24 scroll-mt-24 px-4 sm:px-6 lg:px-0 overflow-visible"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-center text-center sm:flex-row sm:items-end sm:justify-start sm:text-left gap-5 mb-10"
      >
        <div className="flex flex-col items-center sm:items-start">
          <p className="text-xs font-bold text-[#FF6014] tracking-[0.2em] uppercase mb-2">
            Get In Touch
          </p>
          <h2 className="text-[28px] sm:text-[34px] md:text-[38px] font-black tracking-tight text-slate-900 leading-none">
            Let&apos;s Build <span className="text-[#FF6014]">Something Great.</span>
          </h2>
        </div>
        <div className="flex-1 mb-2 h-px bg-slate-200 hidden sm:block" />
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="grid lg:grid-cols-5 gap-6 lg:gap-10"
      >
        <ContactInfo />
        <ContactForm />
      </motion.div>
    </section>
  );
}
