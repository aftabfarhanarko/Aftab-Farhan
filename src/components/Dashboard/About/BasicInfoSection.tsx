"use client";

import React from "react";
import { User } from "lucide-react";
import type { AboutData } from "./types";
import { InputGroup, Section } from "./ui";

export default function BasicInfoSection({
  formData,
  onChange,
}: {
  formData: AboutData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
  return (
    <Section title="Basic Information" icon={<User className="w-4 h-4" />}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <InputGroup
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={onChange}
        />
        <InputGroup
          label="Role Tag"
          name="roleTag"
          value={formData.roleTag}
          onChange={onChange}
          placeholder="e.g. Full Stack Developer"
        />
        <div className="sm:col-span-2">
          <InputGroup
            label="Role Description"
            name="roleDescription"
            value={formData.roleDescription}
            onChange={onChange}
            isTextArea
            rows={2}
          />
        </div>
        <div className="sm:col-span-2">
          <InputGroup
            label="Client Focused Badge"
            name="clientFocusedText"
            value={formData.clientFocusedText}
            onChange={onChange}
            placeholder="e.g. Client focused & fully committed"
          />
        </div>
      </div>
    </Section>
  );
}

