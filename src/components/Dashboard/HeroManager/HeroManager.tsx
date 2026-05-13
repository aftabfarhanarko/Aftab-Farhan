"use client";

import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/Dashboard/ui/ToastContext";
import { uploadImageToImgBB } from "@/lib/upload";
import HeroHeader from "./HeroHeader";
import HeroImageUpload from "./HeroImageUpload";
import SocialsEditor from "./SocialsEditor";
import StatsEditor from "./StatsEditor";
import SubmitBar from "./SubmitBar";
import type { HeroFormData, HeroSocial, HeroStat } from "./types";

const emptyStat: HeroStat = { label: "", value: "" };
const emptySocial: HeroSocial = { platform: "", url: "" };

export default function HeroManager() {
  const { showToast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState<HeroFormData>({
    name: "",
    title: "",
    description: "",
    image: "",
    stats: [emptyStat],
    socials: [emptySocial],
  });

  useEffect(() => {
    void fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      const res = await fetch("/api/hero");
      const data = await res.json();
      if (data && !data.error) {
        setFormData({
          name: data.name || "",
          title: data.title || "",
          description: data.description || "",
          image: data.image || "",
          stats: data.stats?.length ? data.stats : [emptyStat],
          socials: data.socials?.length ? data.socials : [emptySocial],
        });
      }
    } catch (error) {
      showToast("Failed to fetch hero data!");
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadImageToImgBB(file);
      setFormData((prev) => ({ ...prev, image: url }));
      showToast("Image uploaded successfully!");
    } catch (error) {
      showToast("Image upload failed!");
    } finally {
      setIsUploading(false);
    }
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
  const changeStat = (index: number, field: keyof HeroStat, value: string) => {
    setFormData((prev) => ({
      ...prev,
      stats: prev.stats.map((s, i) => (i === index ? { ...s, [field]: value } : s)),
    }));
  };

  const addSocial = () => {
    setFormData((prev) => ({
      ...prev,
      socials: [...prev.socials, emptySocial],
    }));
  };
  const removeSocial = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      socials: prev.socials.filter((_, i) => i !== index),
    }));
  };
  const changeSocial = (
    index: number,
    field: keyof HeroSocial,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      socials: prev.socials.map((s, i) =>
        i === index ? { ...s, [field]: value } : s,
      ),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch("/api/hero", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        showToast("Hero section updated successfully!");
      } else {
        showToast("Update failed!");
      }
    } catch (error) {
      showToast("Something went wrong!");
    } finally {
      setIsSaving(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin w-5 h-5 text-white/30" />
      </div>
    );
  }

  return (
    <div className="w-full pb-24">
      <HeroHeader />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold uppercase tracking-widest text-white/30">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-all"
              placeholder="e.g. Aftab Farhan Arko"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold uppercase tracking-widest text-white/30">
              Job Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-all"
              placeholder="e.g. Full-Stack Developer"
            />
          </div>

          <HeroImageUpload
            image={formData.image}
            isUploading={isUploading}
            onUpload={handleImageUpload}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-semibold uppercase tracking-widest text-white/30">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-all resize-none"
            placeholder="Write a brief introduction about yourself..."
          />
        </div>

        <StatsEditor
          stats={formData.stats}
          onAdd={addStat}
          onRemove={removeStat}
          onChange={changeStat}
        />

        <SocialsEditor
          socials={formData.socials}
          onAdd={addSocial}
          onRemove={removeSocial}
          onChange={changeSocial}
        />

        <SubmitBar disabled={isSaving || isUploading} isSaving={isSaving} />
      </form>
    </div>
  );
}

