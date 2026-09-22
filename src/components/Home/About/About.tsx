"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { AboutData, containerVariants } from "./types";
import AboutProfile from "./AboutProfile";
import AboutBio from "./AboutBio";

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-black/10 dark:text-white/10" />
      </div>
    );
  }

  const clientFocusedText = aboutData?.clientFocusedText ?? "Client focused & fully committed";
  const availabilityText = aboutData?.availabilityText ?? "Available for freelance Remote-friendly";
  const profileImage = aboutData?.profileImage || "/image.png";

  const defaultStats = [
    { label: "Projects Completed", num: "20+" },
    { label: "Technologies", num: "20+" },
    { label: "Client Satisfaction", num: "100%" },
    { label: "Experience", num: "2+ Years" },
  ];

  const defaultProficiencies = [
    { name: "React / Next.js 16" },
    { name: "TypeScript" },
    { name: "Node.js & Express" },
    { name: "MongoDB & PostgreSQL" },
    { name: "REST & GraphQL APIs" },
    { name: "Tailwind CSS & UI/UX" },
  ];

  const stats = aboutData?.stats && aboutData.stats.length > 0 ? aboutData.stats : defaultStats;
  const proficiencies = aboutData?.proficiencies && aboutData.proficiencies.length > 0 ? aboutData.proficiencies : defaultProficiencies;
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
