"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/components/Dashboard/ui/ToastContext";
import {
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  Calendar,
  Layers,
  Star,
  Loader2,
  Upload,
  X,
  Code2,
  Briefcase,
  User,
  Globe,
  Tag,
} from "lucide-react";
import { uploadImageToImgBB } from "@/lib/upload";

// Enums from Prisma
enum ProjectCategory {
  FULL_STACK = "FULL_STACK",
  AI_ML = "AI_ML",
  FRONTEND = "FRONTEND",
  E_COMMERCE = "E_COMMERCE",
  HEALTHCARE = "HEALTHCARE",
  REAL_ESTATE = "REAL_ESTATE",
}

enum ProjectType {
  MY = "MY",
  TEAM = "TEAM",
  CLIENT = "CLIENT",
}

interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  demoLink: string;
  githubLink?: string;
  category: ProjectCategory;
  year: string;
  featured: boolean;
  projectType: ProjectType;
  client?: string;
  tech: string[]; // Flattened in API
}

const ProjectsManager = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Image Upload States
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    tagline: "",
    description: "",
    image: "",
    demoLink: "",
    githubLink: "",
    category: ProjectCategory.FULL_STACK,
    year: new Date().getFullYear().toString(),
    featured: false,
    projectType: ProjectType.MY,
    client: "",
    techInput: "", // comma separated strings
  });

  // Queries
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await axios.get("/api/projects");
      return res.data;
    },
  });

  // Mutations
  const addProjectMutation = useMutation({
    mutationFn: (data: any) => axios.post("/api/projects", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      showToast("Project created successfully!");
      closeModal();
    },
    onError: () => showToast("Failed to create project", "error"),
  });

  const updateProjectMutation = useMutation({
    mutationFn: (data: any) => axios.put(`/api/projects/${data.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      showToast("Project updated successfully!");
      closeModal();
    },
    onError: () => showToast("Failed to update project", "error"),
  });

  const deleteProjectMutation = useMutation({
    mutationFn: (id: string) => axios.delete(`/api/projects/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      showToast("Project deleted successfully!");
    },
    onError: () => showToast("Failed to delete project", "error"),
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let finalImageUrl = formData.image;

      if (imageFile) {
        finalImageUrl = await uploadImageToImgBB(imageFile);
      }

      const payload = {
        ...formData,
        image: finalImageUrl,
        tech: formData.techInput
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };

      if (editingProject) {
        updateProjectMutation.mutate({ ...payload, id: editingProject.id });
      } else {
        addProjectMutation.mutate(payload);
      }
    } catch (error) {
      showToast("Failed to upload image", "error");
    } finally {
      setIsUploading(false);
    }
  };

  const openModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        tagline: project.tagline,
        description: project.description,
        image: project.image,
        demoLink: project.demoLink,
        githubLink: project.githubLink || "",
        category: project.category,
        year: project.year,
        featured: project.featured,
        projectType: project.projectType,
        client: project.client || "",
        techInput: project.tech.join(", "),
      });
      setImagePreview(project.image);
    } else {
      setEditingProject(null);
      setFormData({
        title: "",
        tagline: "",
        description: "",
        image: "",
        demoLink: "",
        githubLink: "",
        category: ProjectCategory.FULL_STACK,
        year: new Date().getFullYear().toString(),
        featured: false,
        projectType: ProjectType.MY,
        client: "",
        techInput: "",
      });
      setImagePreview(null);
      setImageFile(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
    setImagePreview(null);
    setImageFile(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-white/20" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">Projects</h1>
          <p className="text-foreground/50 font-medium">
            Manage your portfolio projects and case studies.
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="px-6 py-3 bg-white text-black rounded-2xl font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {projects?.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="group bg-white/[0.03] border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 transition-all flex flex-col"
            >
              {/* Image Preview */}
              <div className="relative aspect-video overflow-hidden bg-white/5">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider text-white/80">
                    {project.category.replace("_", " ")}
                  </span>
                  {project.featured && (
                    <span className="px-3 py-1 bg-violet-500/80 backdrop-blur-md border border-violet-400/20 rounded-full text-[10px] font-bold uppercase tracking-wider text-white">
                      <Star className="w-2.5 h-2.5 inline-block mr-1 -mt-0.5 fill-current" />
                      Featured
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => openModal(project)}
                    className="p-2 bg-black/50 backdrop-blur-md hover:bg-white/10 rounded-xl border border-white/10 transition-all text-white/70 hover:text-white"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      confirm(
                        "Are you sure you want to delete this project?",
                      ) && deleteProjectMutation.mutate(project.id)
                    }
                    className="p-2 bg-black/50 backdrop-blur-md hover:bg-red-500/20 rounded-xl border border-white/10 transition-all text-white/70 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {project.title}
                  </h3>
                  <p className="text-xs font-semibold text-white/30 uppercase tracking-widest">
                    {project.tagline}
                  </p>
                </div>

                <p className="text-sm text-white/50 line-clamp-2 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Meta */}
                <div className="grid grid-cols-2 gap-4 mt-auto">
                  <div className="flex items-center gap-2 text-white/30">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">
                      {project.year}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-white/30">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">
                      {project.projectType}
                    </span>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {project.tech.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 bg-white/[0.05] border border-white/5 rounded-lg text-[9px] font-bold uppercase tracking-wider text-white/40"
                    >
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="px-2 py-1 bg-white/[0.05] border border-white/5 rounded-lg text-[9px] font-bold uppercase tracking-wider text-white/40">
                      +{project.tech.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-8 pb-4 border-b border-white/5 flex items-center justify-between">
                <h2 className="text-2xl font-black tracking-tight">
                  {editingProject ? "Edit Project" : "New Project"}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-white/5 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-white/40" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-8 pt-6">
                <form
                  onSubmit={handleSubmit}
                  id="project-form"
                  className="grid grid-cols-1 lg:grid-cols-2 gap-10"
                >
                  {/* Left Column: Basics */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 px-1">
                        Project Title
                      </label>
                      <input
                        required
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-white/20 transition-all"
                        placeholder="e.g. DevFlow AI"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 px-1">
                        Tagline
                      </label>
                      <input
                        required
                        value={formData.tagline}
                        onChange={(e) =>
                          setFormData({ ...formData, tagline: e.target.value })
                        }
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-white/20 transition-all"
                        placeholder="e.g. Real-time developer collaboration"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 px-1">
                        Description
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-white/20 transition-all resize-none"
                        placeholder="Detailed project description..."
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 px-1">
                          Category
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              category: e.target.value as ProjectCategory,
                            })
                          }
                          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-white/20 appearance-none"
                        >
                          {Object.values(ProjectCategory).map((cat) => (
                            <option
                              key={cat}
                              value={cat}
                              className="bg-[#0a0a0a]"
                            >
                              {cat.replace("_", " ")}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 px-1">
                          Type
                        </label>
                        <select
                          value={formData.projectType}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              projectType: e.target.value as ProjectType,
                            })
                          }
                          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-white/20 appearance-none"
                        >
                          {Object.values(ProjectType).map((type) => (
                            <option
                              key={type}
                              value={type}
                              className="bg-[#0a0a0a]"
                            >
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 px-1">
                          Year
                        </label>
                        <input
                          required
                          value={formData.year}
                          onChange={(e) =>
                            setFormData({ ...formData, year: e.target.value })
                          }
                          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-white/20 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 px-1">
                          Client (Optional)
                        </label>
                        <input
                          value={formData.client}
                          onChange={(e) =>
                            setFormData({ ...formData, client: e.target.value })
                          }
                          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-white/20 transition-all"
                          placeholder="e.g. Acme Corp"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Links & Media */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 px-1">
                        Cover Image
                      </label>
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full aspect-[16/10] rounded-3xl border-2 border-dashed border-white/10 hover:border-white/20 bg-white/[0.02] transition-all cursor-pointer flex flex-col items-center justify-center gap-4 group overflow-hidden relative"
                      >
                        {imagePreview ? (
                          <>
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              <Upload className="w-6 h-6" />
                              <span className="font-bold text-xs uppercase tracking-widest">
                                Change Image
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setImageFile(null);
                                setImagePreview(null);
                                setFormData({ ...formData, image: "" });
                              }}
                              className="absolute top-4 right-4 p-2 bg-red-500/20 text-red-500 rounded-full hover:bg-red-500/40 transition-colors backdrop-blur-md"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <div className="p-5 rounded-2xl bg-white/5 group-hover:scale-110 transition-transform">
                              <Upload className="w-8 h-8 text-white/20" />
                            </div>
                            <div className="text-center">
                              <p className="font-bold text-sm text-white/60">
                                Upload Project Image
                              </p>
                              <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest mt-1">
                                16:9 Aspect Ratio recommended
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

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 px-1">
                        Tech Stack (comma separated)
                      </label>
                      <div className="relative">
                        <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                        <input
                          required
                          value={formData.techInput}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              techInput: e.target.value,
                            })
                          }
                          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-11 pr-5 py-4 text-sm focus:outline-none focus:border-white/20 transition-all"
                          placeholder="React, Next.js, Prisma, Tailwind"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 px-1">
                          Demo Link
                        </label>
                        <div className="relative">
                          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                          <input
                            required
                            value={formData.demoLink}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                demoLink: e.target.value,
                              })
                            }
                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-11 pr-5 py-4 text-sm focus:outline-none focus:border-white/20 transition-all"
                            placeholder="https://demo.com"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 px-1">
                          Github Link
                        </label>
                        <div className="relative">
                          {/* <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" /> */}
                          <input
                            value={formData.githubLink}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                githubLink: e.target.value,
                              })
                            }
                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-11 pr-5 py-4 text-sm focus:outline-none focus:border-white/20 transition-all"
                            placeholder="https://github.com/..."
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={formData.featured}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            featured: e.target.checked,
                          })
                        }
                        className="w-5 h-5 rounded-lg bg-white/5 border-white/10 text-violet-500 focus:ring-violet-500 focus:ring-offset-0 transition-all cursor-pointer"
                      />
                      <label
                        htmlFor="featured"
                        className="text-sm font-bold text-white/70 cursor-pointer select-none"
                      >
                        Mark as Featured Project
                      </label>
                    </div>
                  </div>
                </form>
              </div>

              {/* Modal Footer */}
              <div className="p-8 border-t border-white/5 flex gap-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold uppercase tracking-widest transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="project-form"
                  disabled={
                    isUploading ||
                    addProjectMutation.isPending ||
                    updateProjectMutation.isPending
                  }
                  className="flex-[2] py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  {isUploading ||
                  addProjectMutation.isPending ||
                  updateProjectMutation.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {isUploading ? "Uploading..." : "Saving..."}
                    </>
                  ) : editingProject ? (
                    "Update Project"
                  ) : (
                    "Create Project"
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsManager;
