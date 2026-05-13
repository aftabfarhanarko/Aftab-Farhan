"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, Trash2 } from "lucide-react";
import { AddButton, Section } from "./ui";

export default function IntroductionSection({
  paragraphs,
  onAdd,
  onRemove,
  onChange,
}: {
  paragraphs: string[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, value: string) => void;
}) {
  return (
    <Section title="Introduction" icon={<FileText className="w-4 h-4" />}>
      <div className="space-y-4">
        <AnimatePresence>
          {paragraphs.map((para, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="flex gap-3"
            >
              <textarea
                value={para}
                onChange={(e) => onChange(index, e.target.value)}
                className="flex-1 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/25 transition-all font-medium min-h-[96px] resize-none hover:bg-white/[0.05]"
                placeholder={`Paragraph ${index + 1}...`}
              />
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="h-10 w-10 shrink-0 flex items-center justify-center rounded-xl bg-red-500/5 text-red-500/40 hover:bg-red-500 hover:text-white transition-all self-start mt-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        <AddButton onClick={onAdd} label="Add Paragraph" />
      </div>
    </Section>
  );
}

