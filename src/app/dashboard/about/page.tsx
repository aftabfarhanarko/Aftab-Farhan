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
  ChevronDown,
  ChevronUp,
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

  // Fetch data
  const { data, isLoading } = useQuery({
    queryKey: ["about"],
    queryFn: async () => {
      const res = await fetch("/api/about");
      if (!res.ok) throw new Error("Failed to fetch about data");
      return res.json();
    },
  });

  // Update state when data is loaded
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

  // Mutation
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

  // Generic array handlers
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

  // Object array handlers (stats, projects)
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
        <Loader2 className="w-8 h-8 animate-spin text-foreground/20" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl pb-32">
      <div className="mb-12">
        <h1 className="text-5xl font-black tracking-tight mb-4 bg-gradient-to-r from-foreground to-foreground/40 bg-clip-text text-transparent">
          About Section
        </h1>
        <p className="text-foreground/50 font-medium text-lg max-w-2xl">
          Craft your personal narrative, showcase your expertise, and highlight
          your best work in one place.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* === BASIC INFO === */}
        <Section title="Basic Information" icon={<User className="w-5 h-5" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
            <div className="md:col-span-2">
              <InputGroup
                label="Role Description"
                name="roleDescription"
                value={formData.roleDescription}
                onChange={handleChange}
                isTextArea
                rows={2}
              />
            </div>
            <div className="md:col-span-2">
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

        {/* === INTRODUCTION === */}
        <Section
          title="Introduction Paragraphs"
          icon={<FileText className="w-5 h-5" />}
        >
          <div className="space-y-6">
            <AnimatePresence>
              {formData.introParagraphs.map((para, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex gap-4 group"
                >
                  <div className="flex-1 relative">
                    <textarea
                      value={para}
                      onChange={(e) =>
                        handleArrayChange(
                          "introParagraphs",
                          index,
                          e.target.value,
                        )
                      }
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-white/20 transition-all font-medium min-h-[120px] resize-none hover:bg-white/[0.05]"
                      placeholder={`Enter paragraph ${index + 1}...`}
                    />
                    <div className="absolute top-4 left-[-1.5rem] text-[10px] font-black text-foreground/10 group-hover:text-foreground/30 transition-colors uppercase vertical-text">
                      P-{index + 1}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeArrayItem("introParagraphs", index)}
                    className="h-12 w-12 shrink-0 flex items-center justify-center rounded-2xl bg-red-500/5 text-red-500/40 hover:bg-red-500 hover:text-white transition-all self-start"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            <button
              type="button"
              onClick={() => addArrayItem("introParagraphs")}
              className="w-full py-5 rounded-2xl border-2 border-dashed border-white/5 text-foreground/20 hover:text-foreground hover:border-white/20 hover:bg-white/[0.02] transition-all flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest"
            >
              <Plus className="w-5 h-5" /> Add New Paragraph
            </button>
          </div>
        </Section>

        {/* === STATS === */}
        <Section title="Statistics" icon={<BarChart3 className="w-5 h-5" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formData.stats.map((stat, index) => (
              <div
                key={index}
                className="flex gap-4 bg-white/[0.03] border border-white/10 p-6 rounded-3xl relative group hover:bg-white/[0.05] transition-all"
              >
                <div className="flex-1 grid grid-cols-2 gap-4">
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
                  className="h-12 w-12 shrink-0 flex items-center justify-center rounded-2xl bg-red-500/5 text-red-500/40 hover:bg-red-500 hover:text-white transition-all self-end"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("stats", { num: "", label: "" })}
              className="md:col-span-2 py-6 rounded-3xl border-2 border-dashed border-white/5 text-foreground/20 hover:text-foreground hover:border-white/20 hover:bg-white/[0.02] transition-all flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest"
            >
              <Plus className="w-5 h-5" /> Add New Statistic
            </button>
          </div>
        </Section>

        {/* === SKILLS === */}
        <Section title="Expertise & Tools" icon={<Code2 className="w-5 h-5" />}>
          <div className="space-y-12">
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

        {/* === PROJECTS === */}
        <Section
          title="Recent Work Highlights"
          icon={<Briefcase className="w-5 h-5" />}
        >
          <div className="space-y-6">
            {formData.projects.map((project, index) => (
              <div
                key={index}
                className="bg-white/[0.03] border border-white/10 p-8 rounded-3xl relative group space-y-6 hover:bg-white/[0.05] transition-all"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center text-[10px] font-black">
                      {index + 1}
                    </span>
                    <span className="text-xs font-black uppercase tracking-widest text-foreground/40">
                      Project Case Study
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeArrayItem("projects", index)}
                    className="h-10 w-10 flex items-center justify-center rounded-xl bg-red-500/5 text-red-500/40 hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid gap-6">
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
                    label="Key Contributions / Stack"
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
            <button
              type="button"
              onClick={() =>
                addArrayItem("projects", { title: "", description: "" })
              }
              className="w-full py-6 rounded-3xl border-2 border-dashed border-white/5 text-foreground/20 hover:text-foreground hover:border-white/20 hover:bg-white/[0.02] transition-all flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest"
            >
              <Plus className="w-5 h-5" /> Add Project Summary
            </button>
          </div>
        </Section>

        {/* === QUOTE === */}
        <Section title="Philosophy" icon={<Quote className="w-5 h-5" />}>
          <div className="space-y-8">
            <InputGroup
              label="Inspirational Quote"
              name="quoteText"
              value={formData.quoteText}
              onChange={handleChange}
              isTextArea
              rows={3}
              placeholder="Your professional or personal philosophy..."
            />
            <div className="max-w-md">
              <InputGroup
                label="Quote Attribution"
                name="quoteAuthor"
                value={formData.quoteAuthor}
                onChange={handleChange}
                placeholder="e.g. Aftab Farhan Arko"
              />
            </div>
          </div>
        </Section>

        {/* === MENTORSHIP === */}
        <Section
          title="Mentorship & Legacy"
          icon={<GraduationCap className="w-5 h-5" />}
        >
          <div className="space-y-8">
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
              rows={4}
              placeholder="How do you help others grow in the tech industry?"
            />
          </div>
        </Section>

        {/* === FLOATING SAVE BAR === */}
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="bg-foreground/90 backdrop-blur-2xl p-2 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20 flex items-center justify-between"
          >
            <div className="pl-6">
              <span className="text-background text-[10px] font-black uppercase tracking-[0.2em] opacity-50">
                Dashboard
              </span>
              <p className="text-background text-xs font-bold -mt-0.5">
                About Section Editor
              </p>
            </div>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100"
            >
              {mutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {mutation.isPending ? "Syncing..." : "Update Live"}
            </button>
          </motion.div>
        </div>
      </form>
    </div>
  );
};

// --- HELPER COMPONENTS ---

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
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white/[0.01] border border-white/5 rounded-[40px] p-8 md:p-12 relative overflow-hidden hover:border-white/10 transition-colors group"
  >
    <div className="flex items-center gap-5 mb-10">
      <div className="w-14 h-14 rounded-2xl bg-foreground/5 flex items-center justify-center text-foreground/40 border border-white/5 group-hover:scale-110 group-hover:text-foreground group-hover:bg-foreground/10 transition-all duration-500">
        {icon}
      </div>
      <h2 className="text-3xl font-black tracking-tighter">{title}</h2>
    </div>
    <div className="relative z-10">{children}</div>
    {/* Subtle Background Glow */}
    <div className="absolute -top-24 -right-24 w-64 h-64 bg-foreground/[0.02] blur-[100px] rounded-full pointer-events-none" />
  </motion.div>
);

const InputGroup = ({ label, isTextArea, ...props }: any) => (
  <div className="space-y-3 flex-1">
    <label className="text-[10px] font-black uppercase tracking-[0.25em] text-foreground/20 px-1">
      {label}
    </label>
    {isTextArea ? (
      <textarea
        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-white/20 transition-all font-medium resize-none min-h-[120px] hover:bg-white/[0.05]"
        {...props}
      />
    ) : (
      <input
        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-white/20 transition-all font-medium h-16 hover:bg-white/[0.05]"
        {...props}
      />
    )}
  </div>
);

const SkillArray = ({ label, data, onAdd, onRemove, onChange }: any) => (
  <div className="space-y-5">
    <label className="text-[10px] font-black uppercase tracking-[0.25em] text-foreground/20 px-1">
      {label}
    </label>
    <div className="flex flex-wrap gap-3">
      <AnimatePresence>
        {data.map((skill: string, index: number) => (
          <motion.div
            key={index}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="flex items-center gap-3 bg-white/[0.03] border border-white/10 pl-5 pr-2 py-2 rounded-2xl group focus-within:border-white/30 transition-all hover:bg-white/[0.06]"
          >
            <input
              value={skill}
              onChange={(e) => onChange(index, e.target.value)}
              className="bg-transparent border-none outline-none font-bold text-sm w-28 md:w-36 placeholder:text-foreground/10"
              placeholder="Add skill..."
            />
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-red-500/10 text-foreground/10 hover:text-red-500 transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
      <button
        type="button"
        onClick={onAdd}
        className="h-14 px-6 rounded-2xl border-2 border-dashed border-white/5 text-foreground/20 hover:text-foreground hover:border-white/20 hover:bg-white/[0.02] transition-all flex items-center gap-3 font-black text-[10px] uppercase tracking-widest"
      >
        <Plus className="w-4 h-4" /> Add Skill
      </button>
    </div>
  </div>
);

export default AboutManager;
