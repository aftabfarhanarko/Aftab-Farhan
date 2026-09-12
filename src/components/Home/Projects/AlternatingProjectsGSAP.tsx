"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Project } from "./types";
import FeaturedCard from "./FeaturedCard";
import ProjectCard from "./ProjectCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AlternatingProjectsGSAPProps {
  projects: Project[];
  featuredProjects?: Project[];
}

export default function AlternatingProjectsGSAP({
  projects,
  featuredProjects = [],
}: AlternatingProjectsGSAPProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Combine unique projects to display in vertical column
  const allDisplayProjects = [
    ...featuredProjects,
    ...projects.filter((p) => !featuredProjects.some((fp) => fp.id === p.id)),
  ];

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !containerRef.current ||
      allDisplayProjects.length === 0
    ) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          isTablet: "(min-width: 768px) and (max-width: 1023px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          const { isDesktop, isTablet } = context.conditions as {
            isDesktop: boolean;
            isTablet: boolean;
            isMobile: boolean;
          };
          const cards = gsap.utils.toArray<HTMLElement>(".alternating-project-card");

          cards.forEach((card, index) => {
            // Card 1: left->right (-), Card 2: right->left (+), Card 3: left->right (-)...
            const isLeftToRight = index % 2 === 0;

            const percentOffset = isDesktop
              ? isLeftToRight ? -12 : 12
              : isTablet
              ? isLeftToRight ? -8 : 8
              : isLeftToRight ? -4 : 4;

            gsap.fromTo(
              card,
              {
                xPercent: percentOffset,
                opacity: 0.35,
              },
              {
                xPercent: 0,
                opacity: 1,
                ease: "power1.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 95%",
                  end: "bottom 25%",
                  scrub: 1.2,
                  invalidateOnRefresh: true,
                },
              }
            );
          });
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [allDisplayProjects]);

  if (allDisplayProjects.length === 0) return null;

  return (
    <div ref={containerRef} className="flex flex-col gap-10 sm:gap-14 w-full overflow-hidden">
      {allDisplayProjects.map((project, idx) => {
        const isFeatured = featuredProjects.some((fp) => fp.id === project.id);

        return (
          <div key={project.id} className="alternating-project-card w-full">
            {isFeatured ? (
              <FeaturedCard project={project} index={idx} />
            ) : (
              <ProjectCard project={project} />
            )}
          </div>
        );
      })}
    </div>
  );
}
