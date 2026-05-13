"use client";

import React from "react";
import { Quote } from "lucide-react";
import type { AboutData } from "./types";
import { InputGroup, Section } from "./ui";

export default function PhilosophySection({
  formData,
  onChange,
}: {
  formData: AboutData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
  return (
    <Section title="Philosophy" icon={<Quote className="w-4 h-4" />}>
      <div className="grid sm:grid-cols-3 gap-5">
        <div className="sm:col-span-2">
          <InputGroup
            label="Inspirational Quote"
            name="quoteText"
            value={formData.quoteText}
            onChange={onChange}
            isTextArea
            rows={3}
            placeholder="Your professional or personal philosophy..."
          />
        </div>
        <InputGroup
          label="Attribution"
          name="quoteAuthor"
          value={formData.quoteAuthor}
          onChange={onChange}
          placeholder="e.g. Aftab Farhan Arko"
        />
      </div>
    </Section>
  );
}

