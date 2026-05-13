"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";

export function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35 }}
      className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-5 sm:p-7 relative overflow-hidden hover:border-white/12 transition-colors group"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl bg-foreground/5 flex items-center justify-center text-foreground/40 border border-white/5 group-hover:text-foreground/70 group-hover:bg-foreground/8 transition-all duration-300">
          {icon}
        </div>
        <h2 className="text-base font-black tracking-tight">{title}</h2>
      </div>
      <div className="relative z-10">{children}</div>
      <div className="absolute -top-20 -right-20 w-48 h-48 bg-foreground/[0.015] blur-[80px] rounded-full pointer-events-none" />
    </motion.div>
  );
}

export function AddButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full py-3.5 rounded-xl border border-dashed border-white/8 text-foreground/25 hover:text-foreground/70 hover:border-white/20 hover:bg-white/[0.02] transition-all flex items-center justify-center gap-2 font-bold text-[11px] uppercase tracking-widest"
    >
      <Plus className="w-3.5 h-3.5" /> {label}
    </button>
  );
}

type InputGroupProps =
  | ({
      label: string;
      isTextArea: true;
    } & React.TextareaHTMLAttributes<HTMLTextAreaElement>)
  | ({
      label: string;
      isTextArea?: false;
    } & React.InputHTMLAttributes<HTMLInputElement>);

export function InputGroup(props: InputGroupProps) {
  if ("isTextArea" in props && props.isTextArea) {
    const { label, isTextArea, ...rest } = props;
    return (
      <div className="space-y-2 flex-1">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/25 px-0.5 block">
          {label}
        </label>
        <textarea
          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/25 transition-all font-medium resize-none min-h-[90px] hover:bg-white/[0.05] placeholder:text-foreground/20"
          {...rest}
        />
      </div>
    );
  }

  const { label, ...rest } = props;
  return (
    <div className="space-y-2 flex-1">
      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/25 px-0.5 block">
        {label}
      </label>
      <input
        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/25 transition-all font-medium h-11 hover:bg-white/[0.05] placeholder:text-foreground/20"
        {...rest}
      />
    </div>
  );
}

export function SkillArray({
  label,
  data,
  onAdd,
  onRemove,
  onChange,
}: {
  label: string;
  data: string[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, value: string) => void;
}) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/25 block">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {data.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="flex items-center gap-2 bg-white/[0.03] border border-white/10 pl-4 pr-1.5 py-1.5 rounded-xl group focus-within:border-white/25 transition-all hover:bg-white/[0.06]"
            >
              <input
                value={skill}
                onChange={(e) => onChange(index, e.target.value)}
                className="bg-transparent border-none outline-none font-semibold text-sm w-24 sm:w-32 placeholder:text-foreground/15"
                placeholder="Skill..."
              />
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-500/10 text-foreground/15 hover:text-red-500 transition-all"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        <button
          type="button"
          onClick={onAdd}
          className="h-11 px-4 rounded-xl border border-dashed border-white/8 text-foreground/20 hover:text-foreground/60 hover:border-white/20 hover:bg-white/[0.02] transition-all flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest"
        >
          <Plus className="w-3.5 h-3.5" /> Add
        </button>
      </div>
    </div>
  );
}

