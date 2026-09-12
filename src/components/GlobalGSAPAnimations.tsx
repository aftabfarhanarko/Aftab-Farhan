"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GlobalGSAPAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Small delay to allow DOM hydration and data fetching
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // 1. Animate Section Headings (h1, h2, h3) across all sections
        const headings = gsap.utils.toArray<HTMLElement>("section h2, section h3, section h1, .gsap-title");
        headings.forEach((heading) => {
          gsap.fromTo(
            heading,
            { opacity: 0, y: 35, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: {
                trigger: heading,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

        // 2. Animate Paragraphs & Text Content (p) across all sections
        const paragraphs = gsap.utils.toArray<HTMLElement>("section p, .gsap-text");
        paragraphs.forEach((p) => {
          gsap.fromTo(
            p,
            { opacity: 0, y: 25 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: p,
                start: "top 92%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

        // 3. Animate Cards & Feature Panels across all sections
        const cards = gsap.utils.toArray<HTMLElement>(
          ".glass-card-primary, .glass-card-compact, .glass-card-featured, .gsap-card"
        );
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 40, scale: 0.97 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.75,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

        // Recalculate positions
        ScrollTrigger.refresh();
      });

      return () => ctx.revert();
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
