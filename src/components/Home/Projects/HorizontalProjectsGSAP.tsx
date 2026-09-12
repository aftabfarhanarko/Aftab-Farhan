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

interface HorizontalProjectsGSAPProps {
  projects: Project[];
  featuredProjects?: Project[];
}

export default function HorizontalProjectsGSAP({
  projects,
  featuredProjects = [],
}: HorizontalProjectsGSAPProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Combine unique projects to display horizontally
  const allDisplayProjects = [
    ...featuredProjects,
    ...projects.filter((p) => !featuredProjects.some((fp) => fp.id === p.id)),
  ];

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !sectionRef.current ||
      !containerRef.current ||
      allDisplayProjects.length === 0
    ) {
      return;
    }

    const sectionEl = sectionRef.current;
    const containerEl = containerRef.current;

    const ctx = gsap.context(() => {
      const getScrollDistance = () => {
        return Math.max(0, containerEl.scrollWidth - sectionEl.offsetWidth);
      };

      const scrollTween = gsap.to(containerEl, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionEl,
          start: "top 10%",
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          preventOverlaps: "projectsGroup",
        },
      });

      // Add containerAnimation triggered entrance for elements inside horizontal cards
      const cards = gsap.utils.toArray<HTMLElement>(".horizontal-project-panel");

      cards.forEach((card) => {
        gsap.fromTo(
          card.querySelectorAll(".project-animate-target"),
          { opacity: 0.5, scale: 0.96, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: scrollTween,
              start: "left 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [allDisplayProjects]);

  if (allDisplayProjects.length === 0) return null;

  return (
    <div ref={sectionRef} className="relative w-full overflow-hidden py-2">
      {/* Left Edge Fade Shadow Overlay */}
      <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-24 lg:w-36 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />

      {/* Right Edge Fade Shadow Overlay */}
      <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-24 lg:w-36 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

      {/* Horizontal Scroll Track */}
      <div
        ref={containerRef}
        className="flex flex-nowrap items-stretch gap-6 sm:gap-8 w-max px-4 sm:px-6"
      >
        {allDisplayProjects.map((project, idx) => {
          const isFeatured = featuredProjects.some((fp) => fp.id === project.id);

          return (
            <div
              key={project.id}
              className="horizontal-project-panel shrink-0 w-[88vw] sm:w-[82vw] lg:w-[78vw] max-w-[1300px]"
            >
              <div className="project-animate-target w-full h-full">
                {isFeatured ? (
                  <FeaturedCard project={project} index={idx} />
                ) : (
                  <ProjectCard project={project} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
