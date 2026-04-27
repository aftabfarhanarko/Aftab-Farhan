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
          socials: data.socials?.length ? data.socials : [{ platform: "", url: "" }],
        });
      }
    } catch (error) {
      console.error("Failed to fetch hero:", error);
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  if (fetching) return <div className="flex items-center justify-center h-96"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="max-w-4xl pb-20">
      <div className="mb-10">
        <h1 className="text-4xl font-black tracking-tight mb-2">Hero Section</h1>
        <p className="text-foreground/50 font-medium">Manage your name, title, description and socials.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-violet-500/50 transition-all font-medium"
                placeholder="e.g. Aftab Farhan Arko"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Job Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-violet-500/50 transition-all font-medium"
                placeholder="e.g. Full-Stack Developer"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Profile Image</label>
            <div className="relative group aspect-square max-w-[200px] rounded-3xl overflow-hidden border-2 border-dashed border-white/10 hover:border-violet-500/50 transition-all">
              {formData.image ? (
                <>
                  <img src={formData.image} alt="Hero" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <label className="cursor-pointer p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all">
                      <Upload size={20} />
                      <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                    </label>
                  </div>
                </>
              ) : (
                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-all">
                  <Upload size={32} className="text-foreground/20 mb-2" />
                  <span className="text-xs font-bold text-foreground/30 uppercase tracking-tighter">Upload Photo</span>
                  <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                </label>
              )}
              {loading && <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><Loader2 className="animate-spin" /></div>}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-violet-500/50 transition-all font-medium resize-none"
            placeholder="Write a brief introduction about yourself..."
          />
        </div>

        {/* Stats Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Stats (e.g. Experience, Projects)</label>
            <button type="button" onClick={handleAddStat} className="text-[10px] font-bold uppercase tracking-tighter text-violet-400 hover:text-violet-300 flex items-center gap-1">
              <Plus size={12} /> Add Stat
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.stats.map((stat, index) => (
              <div key={index} className="flex gap-3 items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                <input
                  placeholder="Label (e.g. Exp)"
                  value={stat.label}
                  onChange={(e) => handleStatChange(index, "label", e.target.value)}
                  className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-semibold"
                />
                <input
                  placeholder="Value (e.g. 5+)"
                  value={stat.value}
                  onChange={(e) => handleStatChange(index, "value", e.target.value)}
                  className="w-20 bg-transparent border-none focus:ring-0 text-sm font-black text-violet-400"
                />
                <button type="button" onClick={() => handleRemoveStat(index)} className="text-red-500/50 hover:text-red-500 p-1">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Socials Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Social Links</label>
            <button type="button" onClick={handleAddSocial} className="text-[10px] font-bold uppercase tracking-tighter text-violet-400 hover:text-violet-300 flex items-center gap-1">
              <Plus size={12} /> Add Social
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.socials.map((social, index) => (
              <div key={index} className="flex gap-3 items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                <input
                  placeholder="Platform (e.g. GitHub)"
                  value={social.platform}
                  onChange={(e) => handleSocialChange(index, "platform", e.target.value)}
                  className="w-32 bg-transparent border-none focus:ring-0 text-sm font-semibold"
                />
                <input
                  placeholder="URL"
                  value={social.url}
                  onChange={(e) => handleSocialChange(index, "url", e.target.value)}
                  className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium text-foreground/50"
                />
                <button type="button" onClick={() => handleRemoveSocial(index)} className="text-red-500/50 hover:text-red-500 p-1">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 sticky bottom-0 bg-black/80 backdrop-blur-sm py-4 border-t border-white/5">
          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto px-12 py-4 bg-violet-600 hover:bg-violet-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : "Update Hero Section"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HeroManager;
