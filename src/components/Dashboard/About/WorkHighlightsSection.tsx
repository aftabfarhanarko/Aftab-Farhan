"use client";

import React from "react";
import { Briefcase, Trash2 } from "lucide-react";
import type { Project } from "./types";
import { AddButton, InputGroup, Section } from "./ui";

export default function WorkHighlightsSection({
  projects,
  onAdd,
  onRemove,
  onChange,
}: {
  projects: Project[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, field: keyof Project, value: string) => void;
}) {
  return (
    <Section title="Work Highlights" icon={<Briefcase className="w-4 h-4" />}>
      <div className="space-y-4">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white/[0.03] border border-white/10 p-5 rounded-2xl group space-y-4 hover:bg-white/[0.05] transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-foreground/10 flex items-center justify-center text-[9px] font-black">
                  {index + 1}
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-foreground/30">
                  Project
                </span>
              </div>
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="h-8 w-8 flex items-center justify-center rounded-lg bg-red-500/5 text-red-500/40 hover:bg-red-500 hover:text-white transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <InputGroup
                label="Project Title"
                value={project.title}
                onChange={(e) => onChange(index, "title", e.target.value)}
                placeholder="e.g. Artman Agro E-commerce"
              />
              <InputGroup
                label="Stack / Contributions"
                value={project.description}
                onChange={(e) => onChange(index, "description", e.target.value)}
                isTextArea
                rows={2}
              />
            </div>
          </div>
        ))}
        <AddButton onClick={onAdd} label="Add Project" />
      </div>
    </Section>
  );
}
