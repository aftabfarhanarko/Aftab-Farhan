"use client";
import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SkillCategory } from "./types";
import SkillsSkeleton from "./SkillsSkeleton";
import SkillsMarquee from "./SkillsMarquee";
import SkillCategoryCard from "./SkillCategoryCard";
import SectionHeader from "@/components/Common/SectionHeader";

interface MarqueeItem {
  id: string;
  name: string;
  imageUrl: string;
}

export default function Skills() {
  const { data: categories, isLoading } = useQuery<SkillCategory[]>({
    queryKey: ["skills-categories"],
    queryFn: async () => {
      const res = await axios.get("/api/skills");
      return res.data;
    },
  });

  // Collect only skills that have an imageUrl, deduplicated by name
  const marqueeItems = React.useMemo<MarqueeItem[]>(() => {
    if (!categories) return [];
    const seen = new Set<string>();
    const result: MarqueeItem[] = [];
    for (const cat of categories) {
      for (const skill of cat.skills) {
        if (skill.imageUrl && !seen.has(skill.name)) {
          seen.add(skill.name);
          result.push({
            id: skill.id,
            name: skill.name,
            imageUrl: skill.imageUrl,
          });
        }
      }
    }
    return result;
  }, [categories]);

  return (
    <section id="skills" className="mb-20 sm:mb-24 scroll-mt-24">
      {/* Heading */}
      <SectionHeader
        badge="SKILLS & CAPABILITIES"
        titlePrefix="Skills &"
        titleHighlight="Expertise"
        subtitle="Comprehensive overview of core programming languages, frameworks, databases, and developer tools."
        align="left"
      />

      {/* Cards */}
      {isLoading ? (
        <SkillsSkeleton />
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            {categories?.map((category) => (
              <SkillCategoryCard key={category.id} category={category} />
            ))}
          </motion.div>

          {/* Marquee — only renders when there are image skills */}
          {marqueeItems.length > 0 && <SkillsMarquee items={marqueeItems} />}
        </>
      )}
    </section>
  );
}
