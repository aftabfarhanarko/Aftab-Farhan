"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles } from "lucide-react";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import SectionHeader from "@/components/Common/SectionHeader";

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

export default function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-80px",
  });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative mx-auto mb-16 w-full max-w-7xl scroll-mt-24 overflow-visible px-4 sm:mb-20 sm:px-6 lg:mb-24 lg:px-8"
    >
      <div
        className="
          mb-8 sm:mb-10 lg:mb-12
          [&_p]:max-w-2xl [&_p]:text-sm [&_p]:leading-7
          sm:[&_p]:text-base
        "
      >
        <SectionHeader
          badge="GET IN TOUCH"
          titlePrefix="Let's Build Something"
          titleHighlight="Extraordinary"
          subtitle="Have a project in mind, want to discuss software architecture, or explore potential collaboration? Send a message and let's connect."
          align="left"
          icon={Sparkles}
        />
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="grid w-full min-w-0 grid-cols-1 items-stretch gap-5 sm:gap-6 lg:grid-cols-5 lg:gap-8 xl:gap-10"
      >
        <div className="w-full min-w-0 lg:col-span-2 [&>*]:w-full [&>*]:min-w-0">
          <ContactInfo />
        </div>

        <div className="w-full min-w-0 lg:col-span-3 [&>*]:w-full [&>*]:min-w-0">
          <ContactForm />
        </div>
      </motion.div>
    </section>
  );
}