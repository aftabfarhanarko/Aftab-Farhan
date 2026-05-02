"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/components/Dashboard/ui/ToastContext";
import { Loader2, Plus, Trash2, Edit2, LayoutGrid, Code2, Image as ImageIcon, Upload, X } from "lucide-react";
import { uploadImageToImgBB } from "@/lib/upload";

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
  const [editingCategory, setEditingCategory] = useState<SkillCategory | null>(null);

  // Image Upload States
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Form states
  const [skillForm, setSkillForm] = useState({
    name: "",
    imageUrl: "",
    categoryId: "",
  });
  const [categoryForm, setCategoryForm] = useState({ title: "" });

  // Queries
  const { data: categories, isLoading } = useQuery<SkillCategory[]>({
    queryKey: ["skills-categories"],
    queryFn: async () => {
      const res = await axios.get("/api/skills");
      return res.data;
    },
  });

  // Mutations - Skill
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

  // Mutations - Category
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
    } catch (error) {
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

  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory) {
      updateCategoryMutation.mutate({ ...editingCategory, ...categoryForm });
    } else {
      addCategoryMutation.mutate(categoryForm);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-white/20" />
      </div>
    );

  return (
    <div className="max-w-5xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">Skills</h1>
          <p className="text-foreground/50 font-medium">
            Manage your technical expertise.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setIsAddingCategory(true)}
            className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <LayoutGrid className="w-4 h-4" />
            Add Category
          </button>
          <button
            onClick={() => {
              setIsAddingSkill(true);
              setEditingSkill(null);
              setSkillForm({
                name: "",
                imageUrl: "",
                categoryId: categories?.[0]?.id || "",
              });
            }}
            className="px-6 py-3 bg-white text-black rounded-2xl font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Skill
          </button>
        </div>
      </div>

      <div className="space-y-12">
        {categories?.map((category) => (
          <div key={category.id} className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="text-white/20">#</span> {category.title}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingCategory(category);
                    setCategoryForm({ title: category.title });
                    setIsAddingCategory(true);
                  }}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/40 hover:text-white"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    confirm("Delete this category?") &&
                    deleteCategoryMutation.mutate(category.id)
                  }
                  className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-white/40 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {category.skills.map((skill) => (
                <motion.div
                  key={skill.id}
                  layout
                  className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl hover:border-white/10 transition-all group relative flex flex-col items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center overflow-hidden">
                    {skill.imageUrl ? (
                      <img
                        src={skill.imageUrl}
                        alt={skill.name}
                        className="w-6 h-6 object-contain"
                      />
                    ) : (
                      <Code2 className="w-5 h-5 text-white/20" />
                    )}
                  </div>
                  <span className="font-bold text-sm text-center truncate w-full">
                    {skill.name}
                  </span>
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
                      className="p-1.5 bg-black/50 backdrop-blur-md hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() =>
                        confirm("Delete skill?") &&
                        deleteSkillMutation.mutate(skill.id)
                      }
                      className="p-1.5 bg-black/50 backdrop-blur-md hover:bg-red-500/20 rounded-lg transition-colors text-red-500"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              ))}
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
                className="p-4 border border-dashed border-white/10 rounded-2xl hover:bg-white/5 hover:border-white/20 transition-all flex flex-col items-center justify-center gap-2 text-white/20 hover:text-white/40"
              >
                <Plus className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest">
                  Add
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {isAddingSkill && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeSkillModal}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-10 shadow-2xl"
            >
              <h2 className="text-2xl font-black mb-8">
                {editingSkill ? "Edit" : "Add"} Skill
              </h2>
              <form onSubmit={handleSkillSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">
                    Skill Name
                  </label>
                  <input
                    required
                    value={skillForm.name}
                    onChange={(e) =>
                      setSkillForm({ ...skillForm, name: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-white/20"
                    placeholder="e.g. React"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">
                    Skill Icon / Image
                  </label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full aspect-video rounded-2xl border-2 border-dashed border-white/10 hover:border-white/20 bg-white/5 transition-all cursor-pointer flex flex-col items-center justify-center gap-4 group overflow-hidden relative"
                  >
                    {imagePreview ? (
                      <>
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-contain p-4" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <Upload className="w-6 h-6" />
                          <span className="font-bold text-xs uppercase tracking-widest">Change Image</span>
                        </div>
                        <button 
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setImageFile(null);
                            setImagePreview(null);
                            setSkillForm({ ...skillForm, imageUrl: "" });
                          }}
                          className="absolute top-2 right-2 p-2 bg-red-500/20 text-red-500 rounded-full hover:bg-red-500/40 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="p-4 rounded-2xl bg-white/5 group-hover:scale-110 transition-transform">
                          <Upload className="w-6 h-6 text-white/40" />
                        </div>
                        <div className="text-center">
                          <p className="font-bold text-sm text-white/60">Upload Image</p>
                          <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest mt-1">PNG, SVG or JPG (max 2MB)</p>
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

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">
                    Category
                  </label>
                  <select
                    required
                    value={skillForm.categoryId}
                    onChange={(e) =>
                      setSkillForm({ ...skillForm, categoryId: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-white/20 appearance-none"
                  >
                    {categories?.map((c) => (
                      <option key={c.id} value={c.id} className="bg-[#0a0a0a]">
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={closeSkillModal}
                    className="flex-1 py-4 bg-white/5 rounded-2xl font-bold uppercase tracking-widest"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUploading || addSkillMutation.isPending || updateSkillMutation.isPending}
                    className="flex-1 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {(isUploading || addSkillMutation.isPending || updateSkillMutation.isPending) ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {isUploading ? "Uploading..." : "Saving..."}
                      </>
                    ) : (
                      editingSkill ? "Update" : "Add"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAddingCategory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddingCategory(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-10 shadow-2xl"
            >
              <h2 className="text-2xl font-black mb-8">
                {editingCategory ? "Edit" : "Add"} Category
              </h2>
              <form onSubmit={handleCategorySubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">
                    Category Title
                  </label>
                  <input
                    required
                    value={categoryForm.title}
                    onChange={(e) => setCategoryForm({ title: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-white/20"
                    placeholder="e.g. Frontend"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setIsAddingCategory(false)}
                    className="flex-1 py-4 bg-white/5 rounded-2xl font-bold uppercase tracking-widest"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest"
                  >
                    {editingCategory ? "Update" : "Add"}
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
