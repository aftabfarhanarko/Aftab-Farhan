"use client";

import React from "react";
import { GraduationCap } from "lucide-react";
import type { AboutData } from "./types";
import { InputGroup, Section } from "./ui";

export default function MentorshipSection({
  formData,
  onChange,
}: {
  formData: AboutData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
  return (
    <Section
      title="Mentorship & Legacy"
      icon={<GraduationCap className="w-4 h-4" />}
    >
      <div className="grid sm:grid-cols-2 gap-5">
        <InputGroup
          label="Legacy Title"
          name="mentorTitle"
          value={formData.mentorTitle}
          onChange={onChange}
          placeholder="e.g. Mentoring & Open Source"
        />
        <InputGroup
          label="Mission Description"
          name="mentorDescription"
          value={formData.mentorDescription}
          onChange={onChange}
          isTextArea
          rows={3}
          placeholder="How do you help others grow?"
        />
      </div>
    </Section>
  );
}

