"use client";
import React from "react";
import { motion } from "framer-motion";
import { Project, itemVariants } from "./types";
import AboutTechStack from "./AboutTechStack";
import AboutHighlights from "./AboutHighlights";

interface AboutBioProps {
  clientFocusedText: string;
  roleDescription: string;
  introParagraphs: string[];
  frontendSkills: string[];
  backendSkills: string[];
  tools: string[];
  projects: Project[];
  quoteText: string;
  quoteAuthor: string;
  mentorTitle: string;
  mentorDescription: string;
}

export default function AboutBio({
  clientFocusedText,
  roleDescription,
  introParagraphs,
  frontendSkills,
  backendSkills,
  tools,
  projects,
  quoteText,
  quoteAuthor,
  mentorTitle,
  mentorDescription,
}: AboutBioProps) {
  return (
    <div className="lg:col-span-3 flex flex-col gap-7 lg:gap-8">
      {/* Live status pill */}
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 w-fit mx-auto lg:mx-0"
      >
        <div className="relative w-2.5 h-2.5 shrink-0">
          <span className="absolute inset-0 rounded-full bg-black dark:bg-white animate-ping opacity-50" />
          <span className="relative block w-2.5 h-2.5 rounded-full bg-black dark:bg-white" />
        </div>
        <span className="text-sm font-medium text-black/70 dark:text-white/70">
          {clientFocusedText}
        </span>
      </motion.div>

      {/* Bio */}
      {(roleDescription || introParagraphs.length > 0) && (
        <motion.div variants={itemVariants} className="flex flex-col gap-4 text-left">
          {roleDescription && (
            <p className="text-[17px] text-foreground/95 dark:text-white/10 leading-[1.85] font-light">
              {roleDescription}
            </p>
          )}
          {introParagraphs.map((para, i) => (
            <p
              key={i}
              className="text-[15px] text-black/55 dark:text-white/95 leading-[1.85] font-light"
            >
              {para}
            </p>
          ))}
        </motion.div>
      )}

      <AboutTechStack
        frontendSkills={frontendSkills}
        backendSkills={backendSkills}
        tools={tools}
      />

      <div className="h-px bg-black/[0.06] dark:bg-white/[0.06]" />

      <AboutHighlights
        projects={projects}
        quoteText={quoteText}
        quoteAuthor={quoteAuthor}
        mentorTitle={mentorTitle}
        mentorDescription={mentorDescription}
      />
    </div>
  );
}
