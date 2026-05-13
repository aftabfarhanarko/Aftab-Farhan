"use client";

import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/Dashboard/ui/ToastContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Save,
  Loader2,
  User,
  FileText,
  BarChart3,
  Code2,
  Briefcase,
  Quote,
  GraduationCap,
} from "lucide-react";

interface Stat {
  num: string;
  label: string;
}

interface Project {
  title: string;
  description: string;
}

interface AboutData {
  fullName: string;
  roleTag: string;
  roleDescription: string;
  introParagraphs: string[];
  clientFocusedText: string;
  stats: Stat[];
  frontendSkills: string[];
  backendSkills: string[];
  tools: string[];
  projects: Project[];
  quoteText: string;
  quoteAuthor: string;
  mentorTitle: string;
  mentorDescription: string;
}

const AboutManager = () => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<AboutData>({
    fullName: "",
    roleTag: "",
    roleDescription: "",
    introParagraphs: [""],
    clientFocusedText: "",
    stats: [{ num: "", label: "" }],
    frontendSkills: [""],
    backendSkills: [""],
    tools: [""],
    projects: [{ title: "", description: "" }],
    quoteText: "",
    quoteAuthor: "",
    mentorTitle: "",
    mentorDescription: "",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["about"],
    queryFn: async () => {
      const res = await fetch("/api/about");
      if (!res.ok) throw new Error("Failed to fetch about data");
      return res.json();
    },
  });

  useEffect(() => {
    if (data && !data.error) {
      setFormData({
        fullName: data.fullName || "",
        roleTag: data.roleTag || "",
        roleDescription: data.roleDescription || "",
        introParagraphs: data.introParagraphs || [""],
        clientFocusedText: data.clientFocusedText || "",
        stats: data.stats || [{ num: "", label: "" }],
        frontendSkills: data.frontendSkills || [""],
        backendSkills: data.backendSkills || [""],
        tools: data.tools || [""],
        projects: data.projects || [{ title: "", description: "" }],
        quoteText: data.quoteText || "",
        quoteAuthor: data.quoteAuthor || "",
        mentorTitle: data.mentorTitle || "",
        mentorDescription: data.mentorDescription || "",
      });
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: async (newData: AboutData) => {
      const res = await fetch("/api/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });
      if (!res.ok) throw new Error("Failed to update data");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["about"] });
      showToast("About section updated successfully!");
    },
    onError: () => {
      showToast("Failed to update about section!");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (
    field: keyof AboutData,
    index: number,
    value: string,
  ) => {
    const newArray = [...(formData[field] as any[])];
    newArray[index] = value;
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field: keyof AboutData, defaultValue: any = "") => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field] as any[]), defaultValue],
    }));
  };

  const removeArrayItem = (field: keyof AboutData, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as any[]).filter((_, i) => i !== index),
    }));
  };

  const handleObjectArrayChange = (
    field: keyof AboutData,
    index: number,
    subField: string,
    value: string,
  ) => {
    const newArray = [...(formData[field] as any[])];
    newArray[index] = { ...newArray[index], [subField]: value };
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-7 h-7 animate-spin text-foreground/20" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-full px-4 sm:px-6 lg:px-8 pb-32">
      {/* ── Page Header ── */}
      <div className="mb-8 pt-2">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2 bg-gradient-to-r from-foreground to-foreground/40 bg-clip-text text-transparent">
          About Section
        </h1>
        <p className="text-foreground/40 font-medium text-sm max-w-xl">
          Craft your personal narrative, showcase your expertise, and highlight
          your best work.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* BASIC INFO */}
        <Section title="Basic Information" icon={<User className="w-4 h-4" />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InputGroup
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
            <InputGroup
              label="Role Tag"
              name="roleTag"
              value={formData.roleTag}
              onChange={handleChange}
              placeholder="e.g. Full Stack Developer"
            />
            <div className="sm:col-span-2">
              <InputGroup
                label="Role Description"
                name="roleDescription"
                value={formData.roleDescription}
                onChange={handleChange}
                isTextArea
                rows={2}
              />
            </div>
            <div className="sm:col-span-2">
              <InputGroup
                label="Client Focused Badge"
                name="clientFocusedText"
                value={formData.clientFocusedText}
                onChange={handleChange}
                placeholder="e.g. Client focused & fully committed"
              />
            </div>
          </div>
        </Section>

        {/* INTRODUCTION */}
        <Section title="Introduction" icon={<FileText className="w-4 h-4" />}>
          <div className="space-y-4">
            <AnimatePresence>
              {formData.introParagraphs.map((para, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="flex gap-3"
                >
                  <textarea
                    value={para}
                    onChange={(e) =>
                      handleArrayChange(
                        "introParagraphs",
                        index,
                        e.target.value,
                      )
                    }
                    className="flex-1 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/25 transition-all font-medium min-h-[96px] resize-none hover:bg-white/[0.05]"
                    placeholder={`Paragraph ${index + 1}...`}
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem("introParagraphs", index)}
                    className="h-10 w-10 shrink-0 flex items-center justify-center rounded-xl bg-red-500/5 text-red-500/40 hover:bg-red-500 hover:text-white transition-all self-start mt-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            <AddButton
              onClick={() => addArrayItem("introParagraphs")}
              label="Add Paragraph"
            />
          </div>
        </Section>

        {/* STATS */}
        <Section title="Statistics" icon={<BarChart3 className="w-4 h-4" />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {formData.stats.map((stat, index) => (
              <div
                key={index}
                className="flex gap-3 bg-white/[0.03] border border-white/10 p-4 rounded-2xl group hover:bg-white/[0.05] transition-all"
              >
                <div className="flex-1 grid grid-cols-2 gap-3">
                  <InputGroup
                    label="Value"
                    value={stat.num}
                    onChange={(e) =>
                      handleObjectArrayChange(
                        "stats",
                        index,
                        "num",
                        e.target.value,
                      )
                    }
                    placeholder="e.g. 1.5+"
                  />
                  <InputGroup
                    label="Label"
                    value={stat.label}
                    onChange={(e) =>
                      handleObjectArrayChange(
                        "stats",
                        index,
                        "label",
                        e.target.value,
                      )
                    }
                    placeholder="e.g. Years Exp."
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeArrayItem("stats", index)}
                  className="h-9 w-9 shrink-0 flex items-center justify-center rounded-xl bg-red-500/5 text-red-500/40 hover:bg-red-500 hover:text-white transition-all self-end"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            <div className="sm:col-span-2 xl:col-span-3">
              <AddButton
                onClick={() => addArrayItem("stats", { num: "", label: "" })}
                label="Add Statistic"
              />
            </div>
          </div>
        </Section>

        {/* SKILLS */}
        <Section title="Expertise & Tools" icon={<Code2 className="w-4 h-4" />}>
          <div className="space-y-8">
            <SkillArray
              label="Frontend Technologies"
              data={formData.frontendSkills}
              onAdd={() => addArrayItem("frontendSkills")}
              onRemove={(i) => removeArrayItem("frontendSkills", i)}
              onChange={(i, v) => handleArrayChange("frontendSkills", i, v)}
            />
            <SkillArray
              label="Backend & Database"
              data={formData.backendSkills}
              onAdd={() => addArrayItem("backendSkills")}
              onRemove={(i) => removeArrayItem("backendSkills", i)}
              onChange={(i, v) => handleArrayChange("backendSkills", i, v)}
            />
            <SkillArray
              label="Tools & Ecosystem"
              data={formData.tools}
              onAdd={() => addArrayItem("tools")}
              onRemove={(i) => removeArrayItem("tools", i)}
              onChange={(i, v) => handleArrayChange("tools", i, v)}
            />
          </div>
        </Section>

        {/* PROJECTS */}
        <Section
          title="Work Highlights"
          icon={<Briefcase className="w-4 h-4" />}
        >
          <div className="space-y-4">
            {formData.projects.map((project, index) => (
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
                    onClick={() => removeArrayItem("projects", index)}
                    className="h-8 w-8 flex items-center justify-center rounded-lg bg-red-500/5 text-red-500/40 hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <InputGroup
                    label="Project Title"
                    value={project.title}
                    onChange={(e) =>
                      handleObjectArrayChange(
                        "projects",
                        index,
                        "title",
                        e.target.value,
                      )
                    }
                    placeholder="e.g. Artman Agro E-commerce"
                  />
                  <InputGroup
                    label="Stack / Contributions"
                    value={project.description}
                    onChange={(e) =>
                      handleObjectArrayChange(
                        "projects",
                        index,
                        "description",
                        e.target.value,
                      )
                    }
                    isTextArea
                    rows={2}
                  />
                </div>
              </div>
            ))}
            <AddButton
              onClick={() =>
                addArrayItem("projects", { title: "", description: "" })
              }
              label="Add Project"
            />
          </div>
        </Section>

        {/* QUOTE */}
        <Section title="Philosophy" icon={<Quote className="w-4 h-4" />}>
          <div className="grid sm:grid-cols-3 gap-5">
            <div className="sm:col-span-2">
              <InputGroup
                label="Inspirational Quote"
                name="quoteText"
                value={formData.quoteText}
                onChange={handleChange}
                isTextArea
                rows={3}
                placeholder="Your professional or personal philosophy..."
              />
            </div>
            <InputGroup
              label="Attribution"
              name="quoteAuthor"
              value={formData.quoteAuthor}
              onChange={handleChange}
              placeholder="e.g. Aftab Farhan Arko"
            />
          </div>
        </Section>

        {/* MENTORSHIP */}
        <Section
          title="Mentorship & Legacy"
          icon={<GraduationCap className="w-4 h-4" />}
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <InputGroup
              label="Legacy Title"
              name="mentorTitle"
              value={formData.mentorTitle}
              onChange={handleChange}
              placeholder="e.g. Mentoring & Open Source"
            />
            <InputGroup
              label="Mission Description"
              name="mentorDescription"
              value={formData.mentorDescription}
              onChange={handleChange}
              isTextArea
              rows={3}
              placeholder="How do you help others grow?"
            />
          </div>
        </Section>

        {/* FLOATING SAVE BAR */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-sm px-0">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.3,
              type: "spring",
              stiffness: 260,
              damping: 24,
            }}
            className="bg-foreground/90 backdrop-blur-2xl px-3 py-2 rounded-full shadow-[0_16px_40px_rgba(0,0,0,0.5)] border border-white/20 flex items-center justify-between gap-3"
          >
            <div className="pl-3">
              <span className="text-background text-[9px] font-black uppercase tracking-[0.2em] opacity-40 block">
                Dashboard
              </span>
              <p className="text-background text-[11px] font-bold -mt-0.5 leading-tight">
                About Editor
              </p>
            </div>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="flex items-center gap-2 px-5 py-3 bg-white text-black rounded-full font-black text-[11px] uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 whitespace-nowrap"
            >
              {mutation.isPending ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Save className="w-3.5 h-3.5" />
              )}
              {mutation.isPending ? "Saving..." : "Save"}
            </button>
          </motion.div>
        </div>
      </form>
    </div>
  );
};

/* ─── Helper Components ─── */

const Section = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.35 }}
    className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-5 sm:p-7 relative overflow-hidden hover:border-white/12 transition-colors group"
  >
    {/* Header */}
    <div className="flex items-center gap-3 mb-6">
      <div className="w-9 h-9 rounded-xl bg-foreground/5 flex items-center justify-center text-foreground/40 border border-white/5 group-hover:text-foreground/70 group-hover:bg-foreground/8 transition-all duration-300">
        {icon}
      </div>
      <h2 className="text-base font-black tracking-tight">{title}</h2>
    </div>
    <div className="relative z-10">{children}</div>
    {/* Ambient glow */}
    <div className="absolute -top-20 -right-20 w-48 h-48 bg-foreground/[0.015] blur-[80px] rounded-full pointer-events-none" />
  </motion.div>
);

const AddButton = ({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full py-3.5 rounded-xl border border-dashed border-white/8 text-foreground/25 hover:text-foreground/70 hover:border-white/20 hover:bg-white/[0.02] transition-all flex items-center justify-center gap-2 font-bold text-[11px] uppercase tracking-widest"
  >
    <Plus className="w-3.5 h-3.5" /> {label}
  </button>
);

type InputGroupProps =
  | ({
      label: string;
      isTextArea: true;
    } & React.TextareaHTMLAttributes<HTMLTextAreaElement>)
  | ({
      label: string;
      isTextArea?: false;
    } & React.InputHTMLAttributes<HTMLInputElement>);

const InputGroup = (props: InputGroupProps) => {
  if (props.isTextArea) {
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
  const { label, isTextArea, ...rest } = props;
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
};

type SkillArrayProps = {
  label: string;
  data: string[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, value: string) => void;
};

const SkillArray = ({
  label,
  data,
  onAdd,
  onRemove,
  onChange,
}: SkillArrayProps) => (
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

export default AboutManager;
