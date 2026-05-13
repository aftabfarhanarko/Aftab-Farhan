"use client";

import React from "react";
import { Code2 } from "lucide-react";
import { Section, SkillArray } from "./ui";

export default function SkillsSection({
  frontendSkills,
  backendSkills,
  tools,
  onAddFrontend,
  onRemoveFrontend,
  onChangeFrontend,
  onAddBackend,
  onRemoveBackend,
  onChangeBackend,
  onAddTools,
  onRemoveTools,
  onChangeTools,
}: {
  frontendSkills: string[];
  backendSkills: string[];
  tools: string[];
  onAddFrontend: () => void;
  onRemoveFrontend: (index: number) => void;
  onChangeFrontend: (index: number, value: string) => void;
  onAddBackend: () => void;
  onRemoveBackend: (index: number) => void;
  onChangeBackend: (index: number, value: string) => void;
  onAddTools: () => void;
  onRemoveTools: (index: number) => void;
  onChangeTools: (index: number, value: string) => void;
}) {
  return (
    <Section title="Expertise & Tools" icon={<Code2 className="w-4 h-4" />}>
      <div className="space-y-8">
        <SkillArray
          label="Frontend Technologies"
          data={frontendSkills}
          onAdd={onAddFrontend}
          onRemove={onRemoveFrontend}
          onChange={onChangeFrontend}
        />
        <SkillArray
          label="Backend & Database"
          data={backendSkills}
          onAdd={onAddBackend}
          onRemove={onRemoveBackend}
          onChange={onChangeBackend}
        />
        <SkillArray
          label="Tools & Ecosystem"
          data={tools}
          onAdd={onAddTools}
          onRemove={onRemoveTools}
          onChange={onChangeTools}
        />
      </div>
    </Section>
  );
}

