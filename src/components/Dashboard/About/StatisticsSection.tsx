"use client";

import React from "react";
import { BarChart3, Trash2 } from "lucide-react";
import type { Stat } from "./types";
import { AddButton, InputGroup, Section } from "./ui";

export default function StatisticsSection({
  stats,
  onAdd,
  onRemove,
  onChange,
}: {
  stats: Stat[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, field: keyof Stat, value: string) => void;
}) {
  return (
    <Section title="Statistics" icon={<BarChart3 className="w-4 h-4" />}>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex gap-3 bg-white/[0.03] border border-white/10 p-4 rounded-2xl group hover:bg-white/[0.05] transition-all"
          >
            <div className="flex-1 grid grid-cols-2 gap-3">
              <InputGroup
                label="Value"
                value={stat.num}
                onChange={(e) => onChange(index, "num", e.target.value)}
                placeholder="e.g. 1.5+"
              />
              <InputGroup
                label="Label"
                value={stat.label}
                onChange={(e) => onChange(index, "label", e.target.value)}
                placeholder="e.g. Years Exp."
              />
            </div>
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="h-9 w-9 shrink-0 flex items-center justify-center rounded-xl bg-red-500/5 text-red-500/40 hover:bg-red-500 hover:text-white transition-all self-end"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
        <div className="sm:col-span-2 xl:col-span-3">
          <AddButton onClick={onAdd} label="Add Statistic" />
        </div>
      </div>
    </Section>
  );
}

