"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AboutData, containerVariants } from "./types";
import AboutProfile from "./AboutProfile";
import AboutBio from "./AboutBio";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null);

  const {
    data: aboutData,
    isLoading,
  } = useQuery<AboutData>({
    queryKey: ["about"],
    queryFn: async () => {
      const res = await fetch("/api/about");
      if (!res.ok) throw new Error("Failed to fetch about data");
      return res.json();
    },
  });

  useEffect(() => {
    if (isLoading || !sectionRef.current || !profileRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        // GSAP ScrollTrigger pinning for left profile column
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 90px",
          end: "bottom bottom",
          pin: profileRef.current,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });

        // Micro scale & fade stagger for left profile elements
        gsap.from(".about-profile-card", {
          opacity: 0,
          y: 24,
          scale: 0.95,
          stagger: 0.08,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-black/10 dark:text-white/10" />
      </div>
    );
  }

  const clientFocusedText = aboutData?.clientFocusedText ?? "Client focused & fully committed";
  const availabilityText = aboutData?.availabilityText ?? "Available for freelance Remote-friendly";
  const stats = aboutData?.stats || [];
  const proficiencies = aboutData?.proficiencies || [];
  const frontendSkills = aboutData?.frontendSkills || [];
  const backendSkills = aboutData?.backendSkills || [];
  const tools = aboutData?.tools || [];
  const projects = aboutData?.projects || [];
  const quoteText = aboutData?.quoteText ?? "";
  const quoteAuthor = aboutData?.quoteAuthor ?? "";
  const mentorTitle = aboutData?.mentorTitle ?? "";
  const mentorDescription = aboutData?.mentorDescription ?? "";
  const roleDescription = aboutData?.roleDescription ?? "";
  const introParagraphs = aboutData?.introParagraphs || [];

  return (
    <section id="about" ref={sectionRef} className="mt-10 md:mt-0 lg:mt-0 mb-20 sm:mb-24 scroll-mt-24 relative">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 lg:grid-cols-5 gap-y-10 lg:gap-x-16 items-start"
      >
        <AboutProfile
          stats={stats}
          proficiencies={proficiencies}
          availabilityText={availabilityText}
          profileRef={profileRef}
        />
        <AboutBio
          clientFocusedText={clientFocusedText}
          roleDescription={roleDescription}
          introParagraphs={introParagraphs}
          frontendSkills={frontendSkills}
          backendSkills={backendSkills}
          tools={tools}
          projects={projects}
          quoteText={quoteText}
          quoteAuthor={quoteAuthor}
          mentorTitle={mentorTitle}
          mentorDescription={mentorDescription}
        />
      </motion.div>
    </section>
  );
}
