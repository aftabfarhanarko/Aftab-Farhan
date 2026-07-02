import React from "react";

export default function SkillsSkeleton() {
  return (
    <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="p-5 rounded-2xl border border-border bg-foreground/[0.02] animate-pulse"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-xl bg-foreground/10 shrink-0" />
            <div className="h-3.5 w-24 rounded-full bg-foreground/10" />
          </div>
          <div className="h-px bg-border mb-4" />
          <div className="flex flex-wrap gap-1.5">
            {Array.from({ length: 6 }).map((_, j) => (
              <div
                key={j}
                className="h-6 w-16 rounded-full bg-foreground/[0.06]"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
