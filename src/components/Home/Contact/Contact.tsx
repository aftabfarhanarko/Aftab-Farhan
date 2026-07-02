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
      className="relative mb-16 sm:mb-20 lg:mb-24 scroll-mt-24 px-4 sm:px-6 lg:px-0 overflow-visible"
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
        className="flex flex-col items-center justify-center text-center sm:flex-row sm:items-end sm:justify-start sm:text-left gap-5 mb-10"
      >
        <div className="flex flex-col items-center sm:items-start">
          <p className="text-xs font-mono text-green-400/60 tracking-[0.25em] uppercase mb-2">
            24/7 contact
          </p>
          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-foreground leading-none">
            Let&apos;s Build
            <br className="hidden sm:block" />
            <span className="text-foreground/25"> Something Great.</span>
          </h2>
        </div>
        <div className="flex-1 mb-2 h-px bg-gradient-to-r from-foreground/10 to-transparent hidden sm:block" />
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
