"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  Plus,
  Trash2,
  Edit2,
  LayoutGrid,
  Code2,
  Upload,
  X,
  Loader2,
} from "lucide-react";
import { uploadImageToImgBB } from "@/lib/upload";
import { useToast } from "@/components/Dashboard/ui/ToastContext";

interface Skill {
  id: string;
  name: string;
  imageUrl?: string;
  categoryId: string;
}

interface SkillCategory {
  id: string;
  title: string;
  skills: Skill[];
}

const SkillsManager = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [editingCategory, setEditingCategory] = useState<SkillCategory | null>(
    null,
  );

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [skillForm, setSkillForm] = useState({
    name: "",
    imageUrl: "",
    categoryId: "",
  });
  const [categoryForm, setCategoryForm] = useState({ title: "" });

  // ── Queries ───────────────────────────────────────────────────────────────
  const { data: categories, isLoading } = useQuery<SkillCategory[]>({
    queryKey: ["skills-categories"],
    queryFn: async () => {
      const res = await axios.get("/api/skills");
      return res.data;
    },
  });

  // ── Mutations – Skill ─────────────────────────────────────────────────────
  const addSkillMutation = useMutation({
    mutationFn: (data: any) => axios.post("/api/skills", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills-categories"] });
      showToast("Skill added successfully!");
      closeSkillModal();
    },
  });

  const updateSkillMutation = useMutation({
    mutationFn: (data: Skill) => axios.put(`/api/skills/${data.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills-categories"] });
      showToast("Skill updated successfully!");
      closeSkillModal();
    },
  });

  const deleteSkillMutation = useMutation({
    mutationFn: (id: string) => axios.delete(`/api/skills/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills-categories"] });
      showToast("Skill deleted successfully!");
    },
  });

  // ── Mutations – Category ──────────────────────────────────────────────────
  const addCategoryMutation = useMutation({
    mutationFn: (data: any) => axios.post("/api/skills/categories", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills-categories"] });
      showToast("Category added successfully!");
      setIsAddingCategory(false);
      setCategoryForm({ title: "" });
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: (data: any) =>
      axios.put(`/api/skills/categories/${data.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills-categories"] });
      showToast("Category updated successfully!");
      setEditingCategory(null);
      setIsAddingCategory(false);
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: (id: string) => axios.delete(`/api/skills/categories/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills-categories"] });
      showToast("Category deleted successfully!");
    },
  });

  // ── Image ──────────────────────────────────────────────────────────────────
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const clearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageFile(null);
    setImagePreview(null);
    setSkillForm((f) => ({ ...f, imageUrl: "" }));
  };

  // ── Skill submit ───────────────────────────────────────────────────────────
  const handleSkillSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      let finalImageUrl = skillForm.imageUrl;
      if (imageFile) {
        finalImageUrl = await uploadImageToImgBB(imageFile);
      }
      const payload = { ...skillForm, imageUrl: finalImageUrl };
      if (editingSkill) {
        updateSkillMutation.mutate({ ...editingSkill, ...payload });
      } else {
        addSkillMutation.mutate(payload);
      }
    } catch {
      showToast("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const closeSkillModal = () => {
    setIsAddingSkill(false);
    setEditingSkill(null);
    setImageFile(null);
    setImagePreview(null);
    setSkillForm({ name: "", imageUrl: "", categoryId: "" });
  };

  // ── Category submit ────────────────────────────────────────────────────────
  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory) {
      updateCategoryMutation.mutate({ ...editingCategory, ...categoryForm });
    } else {
      addCategoryMutation.mutate(categoryForm);
    }
  };

  // ── Loading ────────────────────────────────────────────────────────────────
  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-white/20" />
      </div>
    );

  const isSaving =
    isUploading || addSkillMutation.isPending || updateSkillMutation.isPending;

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="w-full mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-1">
            Skills
          </h1>
          <p className="text-sm text-white/40 font-medium">
            Manage your technical expertise.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => {
              setEditingCategory(null);
              setCategoryForm({ title: "" });
              setIsAddingCategory(true);
            }}
            className="px-4 py-2.5 bg-white/5 border border-white/10 text-white rounded-xl font-semibold text-xs uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-1.5"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Category
          </button>
          <button
            onClick={() => {
              setEditingSkill(null);
              setSkillForm({
                name: "",
                imageUrl: "",
                categoryId: categories?.[0]?.id || "",
              });
              setImagePreview(null);
              setImageFile(null);
              setIsAddingSkill(true);
            }}
            className="px-4 py-2.5 bg-white text-black rounded-xl font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Skill
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-10">
        {categories?.length === 0 && (
          <p className="text-sm text-white/30 text-center py-16">
            No categories yet. Add one to get started.
          </p>
        )}
        {categories?.map((category) => (
          <div key={category.id}>
            {/* Category header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-5">
              <h2 className="text-base sm:text-lg font-bold flex items-center gap-2">
                <span className="text-white/20 text-sm">#</span>
                {category.title}
                <span className="text-xs text-white/20 font-normal ml-1">
                  {category.skills.length} skill
                  {category.skills.length !== 1 ? "s" : ""}
                </span>
              </h2>
              <div className="flex gap-1">
                <button
                  onClick={() => {
                    setEditingCategory(category);
                    setCategoryForm({ title: category.title });
                    setIsAddingCategory(true);
                  }}
                  className="p-1.5 hover:bg-white/5 rounded-lg transition-colors text-white/30 hover:text-white"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() =>
                    confirm("Delete this category and all its skills?") &&
                    deleteCategoryMutation.mutate(category.id)
                  }
                  className="p-1.5 hover:bg-red-500/10 rounded-lg transition-colors text-white/30 hover:text-red-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Skills grid */}
            <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {category.skills.map((skill) => (
                <motion.div
                  key={skill.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-3 bg-white/[0.03] border border-white/5 rounded-xl hover:border-white/10 transition-all group relative flex flex-col items-center gap-2"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center overflow-hidden shrink-0">
                    {skill.imageUrl ? (
                      <img
                        src={skill.imageUrl}
                        alt={skill.name}
                        className="w-5 h-5 object-contain"
                      />
                    ) : (
                      <Code2 className="w-4 h-4 text-white/20" />
                    )}
                  </div>
                  <span className="font-semibold text-[11px] text-center leading-tight line-clamp-2 w-full text-white/70">
                    {skill.name}
                  </span>

                  {/* hover actions */}
                  <div className="absolute top-1.5 right-1.5 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => {
                        setEditingSkill(skill);
                        setSkillForm({
                          name: skill.name,
                          imageUrl: skill.imageUrl || "",
                          categoryId: skill.categoryId,
                        });
                        setImagePreview(skill.imageUrl || null);
                        setIsAddingSkill(true);
                      }}
                      className="p-1 bg-black/60 backdrop-blur-sm hover:bg-white/10 rounded-md transition-colors"
                    >
                      <Edit2 className="w-2.5 h-2.5" />
                    </button>
                    <button
                      onClick={() =>
                        confirm("Delete skill?") &&
                        deleteSkillMutation.mutate(skill.id)
                      }
                      className="p-1 bg-black/60 backdrop-blur-sm hover:bg-red-500/20 rounded-md transition-colors text-red-400"
                    >
                      <Trash2 className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </motion.div>
              ))}

              {/* Add skill shortcut */}
              <button
                onClick={() => {
                  setEditingSkill(null);
                  setSkillForm({
                    name: "",
                    imageUrl: "",
                    categoryId: category.id,
                  });
                  setImagePreview(null);
                  setImageFile(null);
                  setIsAddingSkill(true);
                }}
                className="p-3 border border-dashed border-white/10 rounded-xl hover:bg-white/5 hover:border-white/20 transition-all flex flex-col items-center justify-center gap-1.5 text-white/20 hover:text-white/40 min-h-[80px]"
              >
                <Plus className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Add
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Skill Modal ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isAddingSkill && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeSkillModal}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-black">
                  {editingSkill ? "Edit" : "Add"} Skill
                </h2>
                <button
                  onClick={closeSkillModal}
                  className="p-1.5 hover:bg-white/5 rounded-lg transition-colors text-white/40 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSkillSubmit} className="space-y-5">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                    Skill Name
                  </label>
                  <input
                    required
                    value={skillForm.name}
                    onChange={(e) =>
                      setSkillForm({ ...skillForm, name: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/25 placeholder:text-white/20"
                    placeholder="e.g. React"
                  />
                </div>

                {/* Image upload */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                    Icon / Image
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-32 rounded-xl border-2 border-dashed border-white/10 hover:border-white/20 bg-white/5 transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group overflow-hidden relative"
                  >
                    {imagePreview ? (
                      <>
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-contain p-4"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <Upload className="w-5 h-5" />
                          <span className="font-bold text-xs uppercase tracking-widest">
                            Change
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={clearImage}
                          className="absolute top-2 right-2 p-1.5 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500/40 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="p-3 rounded-xl bg-white/5 group-hover:scale-110 transition-transform">
                          <Upload className="w-5 h-5 text-white/30" />
                        </div>
                        <div className="text-center">
                          <p className="text-xs font-semibold text-white/50">
                            Upload Image
                          </p>
                          <p className="text-[9px] text-white/20 font-bold uppercase tracking-widest mt-0.5">
                            PNG, SVG or JPG · max 2MB
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                  />
                </div>

                {/* Category */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                    Category
                  </label>
                  <select
                    required
                    value={skillForm.categoryId}
                    onChange={(e) =>
                      setSkillForm({ ...skillForm, categoryId: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/25 appearance-none"
                  >
                    {categories?.map((c) => (
                      <option key={c.id} value={c.id} className="bg-[#0a0a0a]">
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-1">
                  <button
                    type="button"
                    onClick={closeSkillModal}
                    className="flex-1 py-3 bg-white/5 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-white/8 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 py-3 bg-white text-black rounded-xl text-sm font-black uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {isUploading ? "Uploading…" : "Saving…"}
                      </>
                    ) : editingSkill ? (
                      "Update"
                    ) : (
                      "Add"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Category Modal ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isAddingCategory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddingCategory(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="relative w-full max-w-sm bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-black">
                  {editingCategory ? "Edit" : "Add"} Category
                </h2>
                <button
                  onClick={() => setIsAddingCategory(false)}
                  className="p-1.5 hover:bg-white/5 rounded-lg transition-colors text-white/40 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <form onSubmit={handleCategorySubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                    Category Title
                  </label>
                  <input
                    required
                    value={categoryForm.title}
                    onChange={(e) => setCategoryForm({ title: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/25 placeholder:text-white/20"
                    placeholder="e.g. Frontend"
                  />
                </div>
                <div className="flex gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsAddingCategory(false)}
                    className="flex-1 py-3 bg-white/5 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-white/8 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={
                      addCategoryMutation.isPending ||
                      updateCategoryMutation.isPending
                    }
                    className="flex-1 py-3 bg-white text-black rounded-xl text-sm font-black uppercase tracking-widest hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {addCategoryMutation.isPending ||
                    updateCategoryMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Saving…
                      </>
                    ) : editingCategory ? (
                      "Update"
                    ) : (
                      "Add"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SkillsManager;
