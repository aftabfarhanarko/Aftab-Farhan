"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { HeroData, fetchHero } from "./types";
import HeroSkeleton from "./HeroSkeleton";
import HeroLeft from "./HeroLeft";
import HeroRight from "./HeroRight";
import { AmbientBackgroundGlow } from "./HeroDecorations";

export default function Hero() {
  const { data, isLoading, isError } = useQuery<HeroData>({
    queryKey: ["hero"],
    queryFn: fetchHero,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <HeroSkeleton />;

  if (isError) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center">
        <p className="text-slate-500 text-sm font-medium">
          Failed to load hero data. Please try again.
        </p>
      </section>
    );
  }

  const hero: HeroData = data ?? {
    name: "",
    title: "",
    description: "",
    image: "",
    socials: [],
    stats: [],
  };

  const { name, title, description, image, socials = [], stats = [] } = hero;

  return (
    <div className="relative pt-0">
      <AmbientBackgroundGlow />
      <section
        id="hero"
        className="relative mb-16 sm:mb-24 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 min-h-[70vh]"
      >
        <HeroLeft
          name={name}
          title={title}
          description={description}
          stats={stats}
        />
        <HeroRight
          image={image}
          name={name}
          title={title}
          socials={socials}
        />
      </section>
    </div>
  );
}
