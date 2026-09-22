"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Save } from "lucide-react";
import { useToast } from "@/components/Dashboard/ui/ToastContext";
import AboutHeader from "./AboutHeader";
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

/* Reusable premium section wrapper */
function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-5">
        <span className="w-2 h-2 rounded-full bg-[#FF6014] animate-pulse" />
        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-black/60 font-['Bai_Jamjuree']">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

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
        <Loader2 className="w-7 h-7 animate-spin text-[#FF6014]" />
      </div>
    );
  }

  return (
    <div className="w-full pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===== Sticky Header with Save Button ===== */}
        <div className="sticky top-0 z-30 bg-gray-50/95 backdrop-blur-sm pt-6 pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 mb-2">
          <div className="flex items-start justify-between gap-4">
            <AboutHeader />

            <button
              type="submit"
              form="about-form"
              disabled={mutation.isPending}
              className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF6014] hover:bg-[#e5540f] disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-black uppercase tracking-widest font-['Bai_Jamjuree'] shadow-sm hover:shadow-md transition-all"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving…
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save
                </>
              )}
            </button>
          </div>
        </div>

        {/* ===== Form Sections ===== */}
        <form id="about-form" onSubmit={handleSubmit} className="space-y-6">
          <SectionCard title="Basic Information">
            <BasicInfoSection formData={formData} onChange={handleChange} />
          </SectionCard>

          <SectionCard title="Introduction">
            <IntroductionSection
              paragraphs={formData.introParagraphs}
              onAdd={() => addStringArrayItem("introParagraphs")}
              onRemove={(i) => removeStringArrayItem("introParagraphs", i)}
              onChange={setStringArrayValue("introParagraphs")}
            />
          </SectionCard>

          <SectionCard title="Statistics">
            <StatisticsSection
              stats={formData.stats}
              onAdd={addStat}
              onRemove={removeStat}
              onChange={changeStat}
            />
          </SectionCard>

          <SectionCard title="Skills & Tools">
            <SkillsSection
              frontendSkills={formData.frontendSkills}
              backendSkills={formData.backendSkills}
              tools={formData.tools}
              onAddFrontend={() => addStringArrayItem("frontendSkills")}
              onRemoveFrontend={(i) =>
                removeStringArrayItem("frontendSkills", i)
              }
              onChangeFrontend={setStringArrayValue("frontendSkills")}
              onAddBackend={() => addStringArrayItem("backendSkills")}
              onRemoveBackend={(i) => removeStringArrayItem("backendSkills", i)}
              onChangeBackend={setStringArrayValue("backendSkills")}
              onAddTools={() => addStringArrayItem("tools")}
              onRemoveTools={(i) => removeStringArrayItem("tools", i)}
              onChangeTools={setStringArrayValue("tools")}
            />
          </SectionCard>

          <SectionCard title="Work Highlights">
            <WorkHighlightsSection
              projects={formData.projects}
              onAdd={addProject}
              onRemove={removeProject}
              onChange={changeProject}
            />
          </SectionCard>

          <SectionCard title="Philosophy">
            <PhilosophySection formData={formData} onChange={handleChange} />
          </SectionCard>

          <SectionCard title="Mentorship">
            <MentorshipSection formData={formData} onChange={handleChange} />
          </SectionCard>

          {/* ===== Bottom Save Button (backup for long scroll) ===== */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              form="about-form"
              disabled={mutation.isPending}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FF6014] hover:bg-[#e5540f] disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-black uppercase tracking-widest font-['Bai_Jamjuree'] shadow-sm hover:shadow-md transition-all"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving…
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}