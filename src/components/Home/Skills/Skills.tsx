"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SkillCategory } from "./types";
import SkillsSkeleton from "./SkillsSkeleton";
import SkillsMarquee from "./SkillsMarquee";
import SkillCategoryCard from "./SkillCategoryCard";

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
      <div className="mb-10 sm:mb-12 flex flex-col items-center text-center sm:items-start sm:text-left">
        <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-foreground/35 font-bold mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-foreground/25 inline-block" />
          Technical Arsenal
        </span>

        <h2 className="text-[clamp(28px,5vw,48px)] text-2xl md:text-4xl font-black text-foreground tracking-tight leading-none mb-4">
          Mastering the <span className="text-foreground/25">Modern Stack</span>
        </h2>

        <p className="max-w-2xl text-foreground/50 text-sm sm:text-base leading-relaxed mx-auto sm:mx-0">
          Technologies I leverage to build scalable, high-performance
          applications from pixel-perfect UIs to robust backend systems.
        </p>
      </div>

      {/* Cards */}
      {isLoading ? (
        <SkillsSkeleton />
      ) : (
        <>
          <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {categories?.map((category) => (
              <SkillCategoryCard key={category.id} category={category} />
            ))}
          </div>

          {/* Marquee — only renders when there are image skills */}
          {marqueeItems.length > 0 && <SkillsMarquee items={marqueeItems} />}
        </>
      )}
    </section>
  );
}
