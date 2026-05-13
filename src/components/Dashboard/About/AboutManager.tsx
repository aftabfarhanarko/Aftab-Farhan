"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/Dashboard/ui/ToastContext";
import AboutHeader from "./AboutHeader";
import FloatingSaveBar from "./FloatingSaveBar";
import type { AboutData, Project, Stat } from "./types";
import BasicInfoSection from "./BasicInfoSection";
import IntroductionSection from "./IntroductionSection";
import StatisticsSection from "./StatisticsSection";
import SkillsSection from "./SkillsSection";
import WorkHighlightsSection from "./WorkHighlightsSection";
import PhilosophySection from "./PhilosophySection";
import MentorshipSection from "./MentorshipSection";


const emptyStat: Stat = { num: "", label: "" };
const emptyProject: Project = { title: "", description: "" };

const defaultAboutData: AboutData = {
  fullName: "",
  roleTag: "",
  roleDescription: "",
  introParagraphs: [""],
  clientFocusedText: "",
  stats: [emptyStat],
  frontendSkills: [""],
  backendSkills: [""],
  tools: [""],
  projects: [emptyProject],
  quoteText: "",
  quoteAuthor: "",
  mentorTitle: "",
  mentorDescription: "",
};

export default function AboutManager() {
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<AboutData>(defaultAboutData);

  const { data, isLoading } = useQuery({
    queryKey: ["about"],
    queryFn: async () => {
      const res = await fetch("/api/about");
      if (!res.ok) throw new Error("Failed to fetch about data");
      return res.json();
    },
  });

  useEffect(() => {
    if (!data || data.error) return;

    setFormData({
      fullName: data.fullName || "",
      roleTag: data.roleTag || "",
      roleDescription: data.roleDescription || "",
      introParagraphs: data.introParagraphs?.length
        ? data.introParagraphs
        : [""],
      clientFocusedText: data.clientFocusedText || "",
      stats: data.stats?.length ? data.stats : [emptyStat],
      frontendSkills: data.frontendSkills?.length ? data.frontendSkills : [""],
      backendSkills: data.backendSkills?.length ? data.backendSkills : [""],
      tools: data.tools?.length ? data.tools : [""],
      projects: data.projects?.length ? data.projects : [emptyProject],
      quoteText: data.quoteText || "",
      quoteAuthor: data.quoteAuthor || "",
      mentorTitle: data.mentorTitle || "",
      mentorDescription: data.mentorDescription || "",
    });
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
    setFormData((prev) => ({ ...prev, [name]: value }) as AboutData);
  };

  const setStringArrayValue = useMemo(() => {
    const update =
      (
        field: "introParagraphs" | "frontendSkills" | "backendSkills" | "tools",
      ) =>
      (index: number, value: string) => {
        setFormData((prev) => {
          const next = [...prev[field]];
          next[index] = value;
          return { ...prev, [field]: next };
        });
      };
    return update;
  }, []);

  const addStringArrayItem = (
    field: "introParagraphs" | "frontendSkills" | "backendSkills" | "tools",
  ) => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeStringArrayItem = (
    field: "introParagraphs" | "frontendSkills" | "backendSkills" | "tools",
    index: number,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const addStat = () => {
    setFormData((prev) => ({ ...prev, stats: [...prev.stats, emptyStat] }));
  };
  const removeStat = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      stats: prev.stats.filter((_, i) => i !== index),
    }));
  };
  const changeStat = (index: number, field: keyof Stat, value: string) => {
    setFormData((prev) => ({
      ...prev,
      stats: prev.stats.map((s, i) =>
        i === index ? { ...s, [field]: value } : s,
      ),
    }));
  };

  const addProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [...prev.projects, emptyProject],
    }));
  };
  const removeProject = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };
  const changeProject = (
    index: number,
    field: keyof Project,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.map((p, i) =>
        i === index ? { ...p, [field]: value } : p,
      ),
    }));
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
      <AboutHeader />

      <form onSubmit={handleSubmit} className="space-y-6">
        <BasicInfoSection formData={formData} onChange={handleChange} />

        <IntroductionSection
          paragraphs={formData.introParagraphs}
          onAdd={() => addStringArrayItem("introParagraphs")}
          onRemove={(i) => removeStringArrayItem("introParagraphs", i)}
          onChange={setStringArrayValue("introParagraphs")}
        />

        <StatisticsSection
          stats={formData.stats}
          onAdd={addStat}
          onRemove={removeStat}
          onChange={changeStat}
        />

        <SkillsSection
          frontendSkills={formData.frontendSkills}
          backendSkills={formData.backendSkills}
          tools={formData.tools}
          onAddFrontend={() => addStringArrayItem("frontendSkills")}
          onRemoveFrontend={(i) => removeStringArrayItem("frontendSkills", i)}
          onChangeFrontend={setStringArrayValue("frontendSkills")}
          onAddBackend={() => addStringArrayItem("backendSkills")}
          onRemoveBackend={(i) => removeStringArrayItem("backendSkills", i)}
          onChangeBackend={setStringArrayValue("backendSkills")}
          onAddTools={() => addStringArrayItem("tools")}
          onRemoveTools={(i) => removeStringArrayItem("tools", i)}
          onChangeTools={setStringArrayValue("tools")}
        />

        <WorkHighlightsSection
          projects={formData.projects}
          onAdd={addProject}
          onRemove={removeProject}
          onChange={changeProject}
        />

        <PhilosophySection formData={formData} onChange={handleChange} />
        <MentorshipSection formData={formData} onChange={handleChange} />

        <FloatingSaveBar isSaving={mutation.isPending} />
      </form>
    </div>
  );
}
