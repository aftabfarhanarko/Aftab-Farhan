import React from "react";

export default function ProjectsSkeleton() {
  return (
    <div className="space-y-10">
      {/* Featured skeleton */}
      <div className="h-[380px] sm:h-[420px] rounded-[2rem] border border-border bg-card/40 animate-pulse" />
      {/* Tabs skeleton */}
      <div className="flex gap-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-10 w-28 rounded-xl bg-card/50 animate-pulse"
          />
        ))}
      </div>
      {/* Cards skeleton */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-border bg-card/40 animate-pulse overflow-hidden"
          >
            <div className="aspect-[16/9] bg-card/50" />
            <div className="p-5 space-y-3">
              <div className="h-4 w-3/4 bg-card/60 rounded" />
              <div className="h-3 w-full bg-card/50 rounded" />
              <div className="h-3 w-5/6 bg-card/50 rounded" />
              <div className="flex gap-1.5 pt-1">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="h-6 w-14 rounded-lg bg-card/50" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
