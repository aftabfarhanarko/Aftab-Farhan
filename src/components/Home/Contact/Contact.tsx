"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, MessageSquare } from "lucide-react";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import SectionHeader from "@/components/Common/SectionHeader";

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
      <SectionHeader
        badge="GET IN TOUCH"
        titlePrefix="Let's Build Something"
        titleHighlight="Extraordinary"
        subtitle="Have a project in mind, want to discuss software architecture, or explore potential collaboration? Send a message and let's connect."
        align="left"
        icon={Sparkles}
      />

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

