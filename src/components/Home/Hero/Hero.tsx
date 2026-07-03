"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { HeroData, fetchHero } from "./types";
import HeroSkeleton from "./HeroSkeleton";
import HeroLeft from "./HeroLeft";
import HeroRight from "./HeroRight";

export default function Hero() {
  const { data, isLoading, isError } = useQuery<HeroData>({
    queryKey: ["hero"],
    queryFn: fetchHero,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <HeroSkeleton />;

  if (isError) {
    return (
      <section className="min-h-[90vh] flex items-center justify-center">
        <p className="text-foreground/40 text-sm">
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
    <div className="mt-7 md:mt-0">
      <section
        id="hero"
        className="relative mb-20 sm:mb-24 flex flex-col lg:flex-row items-center justify-between gap-16 lg:-mt-24 min-h-[90vh]"
      >
        {/* Ambient glow blobs */}
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-foreground/5 blur-[140px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-foreground/4 blur-[120px] -z-10 pointer-events-none" />

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
