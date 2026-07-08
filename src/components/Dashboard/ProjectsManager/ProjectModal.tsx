"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Globe, Loader2, Tag, Upload, X } from "lucide-react";
import type {
  Project,
  ProjectCategory,
  ProjectFormState,
  ProjectType,
} from "./types";
import { projectCategories, projectTypes } from "./types";

export default function ProjectModal({
  isOpen,
  editingProject,
  formData,
  setFormData,
  imagePreview,
  onClose,
  onSubmit,
  onPickImage,
  onClearImage,
  isSaving,
  isUploading,
}: {
  isOpen: boolean;
  editingProject: Project | null;
  formData: ProjectFormState;
  setFormData: React.Dispatch<React.SetStateAction<ProjectFormState>>;
  imagePreview: string | null;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onPickImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearImage: (e: React.MouseEvent) => void;
  isSaving: boolean;
  isUploading: boolean;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col max-h-[90vh]"
      >
        <div className="p-8 pb-4 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-2xl font-black tracking-tight">
            {editingProject ? "Edit Project" : "New Project"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-full transition-colors"
            type="button"
          >
            <X className="w-6 h-6 text-white/40" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 pt-6">
          <form
            onSubmit={onSubmit}
            id="project-form"
            className="grid grid-cols-1 lg:grid-cols-2 gap-10"
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 px-1">
                  Project Title
                </label>
                <input
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, title: e.target.value }))
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
                    setFormData((p) => ({ ...p, tagline: e.target.value }))
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
                    setFormData((p) => ({ ...p, description: e.target.value }))
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
                      setFormData((p) => ({
                        ...p,
                        category: e.target.value as ProjectCategory,
                      }))
                    }
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-white/20 appearance-none"
                  >
                    {projectCategories.map((cat) => (
                      <option key={cat} value={cat} className="bg-[#0a0a0a]">
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
                      setFormData((p) => ({
                        ...p,
                        projectType: e.target.value as ProjectType,
                      }))
                    }
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-white/20 appearance-none"
                  >
                    {projectTypes.map((type) => (
                      <option key={type} value={type} className="bg-[#0a0a0a]">
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
                      setFormData((p) => ({ ...p, year: e.target.value }))
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
                      setFormData((p) => ({ ...p, client: e.target.value }))
                    }
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-white/20 transition-all"
                    placeholder="e.g. Acme Corp"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 px-1">
                    Start Date
                  </label>
                  <input
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, startDate: e.target.value }))
                    }
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-white/20 transition-all"
                    placeholder="e.g. July 1"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 px-1">
                    End Date
                  </label>
                  <input
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, endDate: e.target.value }))
                    }
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-white/20 transition-all"
                    placeholder="e.g. July 8"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 px-1">
                    Duration
                  </label>
                  <input
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, duration: e.target.value }))
                    }
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-white/20 transition-all"
                    placeholder="e.g. 7 Days"
                  />
                </div>
              </div>
            </div>

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
                        onClick={onClearImage}
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
                  onChange={onPickImage}
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
                      setFormData((p) => ({ ...p, techInput: e.target.value }))
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
                        setFormData((p) => ({ ...p, demoLink: e.target.value }))
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
                  <input
                    value={formData.githubLink}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        githubLink: e.target.value,
                      }))
                    }
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-white/20 transition-all"
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, featured: e.target.checked }))
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

        <div className="p-8 border-t border-white/5 flex gap-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold uppercase tracking-widest transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="project-form"
            disabled={isSaving}
            className="flex-[2] py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {isSaving ? (
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
  );
}

