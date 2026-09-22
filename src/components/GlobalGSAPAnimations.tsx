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

    let ctx: gsap.Context | null = null;

    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        // 1. Animate Section Headings (.gsap-title)
        const headings = gsap.utils.toArray<HTMLElement>(".gsap-title");
        headings.forEach((heading) => {
          if (!heading || !heading.parentNode) return;
          gsap.fromTo(
            heading,
            { opacity: 0, y: 30, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: {
                trigger: heading,
                start: "top 90%",
                once: true,
              },
            }
          );
        });

        // 2. Animate Elements marked with .gsap-text
        const paragraphs = gsap.utils.toArray<HTMLElement>(".gsap-text");
        paragraphs.forEach((p) => {
          if (!p || !p.parentNode) return;
          gsap.fromTo(
            p,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: p,
                start: "top 92%",
                once: true,
              },
            }
          );
        });

        // 3. Animate Cards & Feature Panels with .gsap-card
        const cards = gsap.utils.toArray<HTMLElement>(".gsap-card");
        cards.forEach((card) => {
          if (!card || !card.parentNode) return;
          gsap.fromTo(
            card,
            { opacity: 0, y: 35, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                once: true,
              },
            }
          );
        });
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, [pathname]);

  return null;
}
