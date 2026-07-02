import React from "react";

export default function HeroSkeleton() {
  return (
    <section className="relative mb-20 sm:mb-24 flex flex-col lg:flex-row items-center justify-between gap-16 -mt-25 min-h-[90vh] animate-pulse">
      <div className="flex-1 flex flex-col gap-6 max-w-2xl">
        <div className="h-4 w-48 bg-foreground/10 rounded" />
        <div className="h-12 w-80 bg-foreground/10 rounded" />
        <div className="space-y-2">
          <div className="h-3 w-full bg-foreground/10 rounded" />
          <div className="h-3 w-5/6 bg-foreground/10 rounded" />
          <div className="h-3 w-4/6 bg-foreground/10 rounded" />
        </div>
        <div className="flex gap-4 mt-1">
          <div className="h-12 w-40 bg-foreground/10 rounded-xl" />
          <div className="h-12 w-36 bg-foreground/10 rounded-xl" />
        </div>
        <div className="flex gap-12 pt-8 mt-3 border-t border-border">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-1">
              <div className="h-8 w-12 bg-foreground/10 rounded" />
              <div className="h-2 w-20 bg-foreground/10 rounded" />
            </div>
          ))}
        </div>
      </div>
      <div className="relative flex-shrink-0 flex items-center justify-center w-[380px] h-[380px]">
        <div className="w-[340px] h-[340px] sm:w-[380px] sm:h-[380px] rounded-full bg-foreground/10" />
      </div>
    </section>
  );
}
