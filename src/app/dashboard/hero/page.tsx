"use client";
import React, { useState, useEffect } from "react";
import { useToast } from "@/components/Dashboard/ui/ToastContext";
import { uploadImageToImgBB } from "@/lib/upload";
import { Plus, Trash2, Upload, Loader2 } from "lucide-react";

const HeroManager = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    image: "",
    stats: [{ label: "", value: "" }],
    socials: [{ platform: "", url: "" }],
  });

  useEffect(() => {
    fetchHeroData();
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
          stats: data.stats?.length ? data.stats : [{ label: "", value: "" }],
          socials: data.socials?.length
            ? data.socials
            : [{ platform: "", url: "" }],
        });
      }
    } catch (error) {
      console.error("Failed to fetch hero:", error);
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
    if (file) {
      setLoading(true);
      try {
        const url = await uploadImageToImgBB(file);
        setFormData((prev) => ({ ...prev, image: url }));
        showToast("Image uploaded successfully!");
      } catch (error) {
        showToast("Image upload failed!");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAddStat = () => {
    setFormData((prev) => ({
      ...prev,
      stats: [...prev.stats, { label: "", value: "" }],
    }));
  };
  const handleRemoveStat = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      stats: prev.stats.filter((_, i) => i !== index),
    }));
  };
  const handleStatChange = (index: number, field: string, value: string) => {
    const newStats = [...formData.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setFormData((prev) => ({ ...prev, stats: newStats }));
  };

  const handleAddSocial = () => {
    setFormData((prev) => ({
      ...prev,
      socials: [...prev.socials, { platform: "", url: "" }],
    }));
  };
  const handleRemoveSocial = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      socials: prev.socials.filter((_, i) => i !== index),
    }));
  };
  const handleSocialChange = (index: number, field: string, value: string) => {
    const newSocials = [...formData.socials];
    newSocials[index] = { ...newSocials[index], [field]: value };
    setFormData((prev) => ({ ...prev, socials: newSocials }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
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
      setLoading(false);
    }
  };

  if (fetching)
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin w-5 h-5 text-white/30" />
      </div>
    );

  return (
    <div className="w-full pb-24">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-white/85 tracking-tight">
          Hero Section
        </h1>
        <p className="text-xs text-white/35 mt-0.5">
          Manage your name, title, description and socials.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1 — Name, Title, Image */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Name */}
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

          {/* Title */}
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

          {/* Profile Image */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold uppercase tracking-widest text-white/30">
              Profile Image
            </label>
            <div className="relative group w-full h-28 rounded-xl overflow-hidden border border-dashed border-white/[0.08] hover:border-white/20 transition-all bg-white/[0.02]">
              {formData.image ? (
                <>
                  <img
                    src={formData.image}
                    alt="Hero"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <label className="cursor-pointer p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all">
                      <Upload size={16} className="text-white" />
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleImageUpload}
                        accept="image/*"
                      />
                    </label>
                  </div>
                </>
              ) : (
                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer gap-1.5">
                  <Upload size={20} className="text-white/20" />
                  <span className="text-[10px] text-white/25 uppercase tracking-wider">
                    Upload Photo
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageUpload}
                    accept="image/*"
                  />
                </label>
              )}
              {loading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Loader2 className="animate-spin w-5 h-5 text-white/60" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
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

        {/* Stats */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-semibold uppercase tracking-widest text-white/30">
              Stats
            </label>
            <button
              type="button"
              onClick={handleAddStat}
              className="flex items-center gap-1 text-[10px] text-violet-400/70 hover:text-violet-300 transition-colors uppercase tracking-wider"
            >
              <Plus size={11} /> Add Stat
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {formData.stats.map((stat, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] rounded-xl px-3 py-2.5"
              >
                <input
                  placeholder="Label"
                  value={stat.label}
                  onChange={(e) =>
                    handleStatChange(index, "label", e.target.value)
                  }
                  className="flex-1 bg-transparent text-xs text-white/70 placeholder:text-white/20 focus:outline-none min-w-0"
                />
                <div className="w-px h-4 bg-white/[0.08]" />
                <input
                  placeholder="Value"
                  value={stat.value}
                  onChange={(e) =>
                    handleStatChange(index, "value", e.target.value)
                  }
                  className="w-14 bg-transparent text-xs font-semibold text-violet-400 placeholder:text-white/20 focus:outline-none text-right"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveStat(index)}
                  className="text-white/20 hover:text-red-400 transition-colors ml-1 shrink-0"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Socials */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-semibold uppercase tracking-widest text-white/30">
              Social Links
            </label>
            <button
              type="button"
              onClick={handleAddSocial}
              className="flex items-center gap-1 text-[10px] text-violet-400/70 hover:text-violet-300 transition-colors uppercase tracking-wider"
            >
              <Plus size={11} /> Add Social
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {formData.socials.map((social, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] rounded-xl px-3 py-2.5"
              >
                <input
                  placeholder="Platform"
                  value={social.platform}
                  onChange={(e) =>
                    handleSocialChange(index, "platform", e.target.value)
                  }
                  className="w-20 bg-transparent text-xs font-medium text-white/70 placeholder:text-white/20 focus:outline-none shrink-0"
                />
                <div className="w-px h-4 bg-white/[0.08]" />
                <input
                  placeholder="https://..."
                  value={social.url}
                  onChange={(e) =>
                    handleSocialChange(index, "url", e.target.value)
                  }
                  className="flex-1 bg-transparent text-xs text-white/45 placeholder:text-white/20 focus:outline-none min-w-0"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveSocial(index)}
                  className="text-white/20 hover:text-red-400 transition-colors ml-1 shrink-0"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="sticky bottom-0 pt-4 pb-2 bg-gradient-to-t from-black via-black/90 to-transparent border-t border-white/[0.05] mt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white rounded-xl text-xs font-semibold uppercase tracking-widest transition-all flex items-center gap-2 active:scale-[0.98]"
          >
            {loading ? <Loader2 className="animate-spin w-3.5 h-3.5" /> : null}
            Update Hero Section
          </button>
        </div>
      </form>
    </div>
  );
};

export default HeroManager;
