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
  galleryPreviews = [],
  onClose,
  onSubmit,
  onPickImage,
  onClearImage,
  onPickGalleryImages,
  onRemoveGalleryImage,
  isSaving,
  isUploading,
}: {
  isOpen: boolean;
  editingProject: Project | null;
  formData: ProjectFormState;
  setFormData: React.Dispatch<React.SetStateAction<ProjectFormState>>;
  imagePreview: string | null;
  galleryPreviews?: string[];
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onPickImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearImage: (e: React.MouseEvent) => void;
  onPickGalleryImages?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveGalleryImage?: (index: number) => void;
  isSaving: boolean;
  isUploading: boolean;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.96 }}
        className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-[2rem] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden text-slate-900 z-10"
      >
        {/* Modal Header */}
        <div className="p-6 sm:p-8 pb-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-20">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900">
              {editingProject ? "Edit Project Details" : "Create New Project"}
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Fill in all information below to showcase your engineering project.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center transition-all text-slate-600 hover:text-slate-900 cursor-pointer"
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 pt-6">
          <form
            onSubmit={onSubmit}
            id="project-form"
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Left Column */}
            <div className="space-y-5">
              {/* Project Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 px-1 block">
                  Project Title <span className="text-rose-500">*</span>
                </label>
                <input
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, title: e.target.value }))
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-[#FF6014] focus:bg-white focus:ring-2 focus:ring-[#FF6014]/20 transition-all shadow-xs"
                  placeholder="e.g. ExamBuzz – Polytechnic Preparation"
                />
              </div>

              {/* Tagline */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 px-1 block">
                  Tagline <span className="text-rose-500">*</span>
                </label>
                <input
                  required
                  value={formData.tagline}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, tagline: e.target.value }))
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-[#FF6014] focus:bg-white focus:ring-2 focus:ring-[#FF6014]/20 transition-all shadow-xs"
                  placeholder="e.g. Smart Preparation for Polytechnic Admission"
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 px-1 block">
                  Main Description <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, description: e.target.value }))
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-[#FF6014] focus:bg-white focus:ring-2 focus:ring-[#FF6014]/20 transition-all resize-none shadow-xs"
                  placeholder="Detailed explanation of the project, features, and user experience..."
                />
              </div>

              {/* Category & Type */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 px-1 block">
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
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 font-semibold focus:outline-none focus:border-[#FF6014] focus:bg-white focus:ring-2 focus:ring-[#FF6014]/20 transition-all cursor-pointer shadow-xs"
                  >
                    {projectCategories.map((cat) => (
                      <option key={cat} value={cat} className="bg-white text-slate-900">
                        {cat.replace("_", " ")}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 px-1 block">
                    Project Type
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        projectType: e.target.value as ProjectType,
                      }))
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 font-semibold focus:outline-none focus:border-[#FF6014] focus:bg-white focus:ring-2 focus:ring-[#FF6014]/20 transition-all cursor-pointer shadow-xs"
                  >
                    {projectTypes.map((type) => (
                      <option key={type} value={type} className="bg-white text-slate-900">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Year & Client */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 px-1 block">
                    Year <span className="text-rose-500">*</span>
                  </label>
                  <input
                    required
                    value={formData.year}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, year: e.target.value }))
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-[#FF6014] focus:bg-white focus:ring-2 focus:ring-[#FF6014]/20 transition-all shadow-xs"
                    placeholder="2026"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 px-1 block">
                    Client / Product
                  </label>
                  <input
                    value={formData.client}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, client: e.target.value }))
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-[#FF6014] focus:bg-white focus:ring-2 focus:ring-[#FF6014]/20 transition-all shadow-xs"
                    placeholder="e.g. Own Product"
                  />
                </div>
              </div>

              {/* Start Date, End Date, Duration */}
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 px-1 block">
                    Start Date
                  </label>
                  <input
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, startDate: e.target.value }))
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-sm text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-[#FF6014] focus:bg-white focus:ring-2 focus:ring-[#FF6014]/20 transition-all shadow-xs"
                    placeholder="01-04-26"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 px-1 block">
                    End Date
                  </label>
                  <input
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, endDate: e.target.value }))
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-sm text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-[#FF6014] focus:bg-white focus:ring-2 focus:ring-[#FF6014]/20 transition-all shadow-xs"
                    placeholder="10-04-26"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 px-1 block">
                    Duration
                  </label>
                  <input
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, duration: e.target.value }))
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-sm text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-[#FF6014] focus:bg-white focus:ring-2 focus:ring-[#FF6014]/20 transition-all shadow-xs"
                    placeholder="10 Days"
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-5">
              {/* Cover Image Upload */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 px-1 block">
                  Cover Image
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full aspect-[16/9] rounded-2xl border-2 border-dashed border-slate-200 hover:border-[#FF6014] bg-slate-50 transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group overflow-hidden relative shadow-xs"
                >
                  {imagePreview ? (
                    <>
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white">
                        <Upload className="w-5 h-5 text-white" />
                        <span className="font-bold text-xs uppercase tracking-widest">
                          Change Image
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={onClearImage}
                        className="absolute top-3 right-3 p-1.5 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors shadow-md cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="p-4 rounded-xl bg-white border border-slate-200 group-hover:scale-105 transition-transform shadow-xs">
                        <Upload className="w-6 h-6 text-[#FF6014]" />
                      </div>
                      <div className="text-center px-4">
                        <p className="font-bold text-sm text-slate-700">
                          Click to Upload Project Image
                        </p>
                        <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                          16:9 Aspect Ratio recommended (PNG, JPG, WebP)
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

              {/* Role / Position */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 px-1 block">
                  Role / Position
                </label>
                <input
                  value={formData.role}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, role: e.target.value }))
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-[#FF6014] focus:bg-white focus:ring-2 focus:ring-[#FF6014]/20 transition-all shadow-xs"
                  placeholder="e.g. Lead Full-Stack Developer"
                />
              </div>

              {/* Executive Overview */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 px-1 block">
                  Overview (Detailed Executive Summary)
                </label>
                <textarea
                  rows={2}
                  value={formData.overview}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, overview: e.target.value }))
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-[#FF6014] focus:bg-white focus:ring-2 focus:ring-[#FF6014]/20 transition-all resize-none shadow-xs"
                  placeholder="Summary for project case study..."
                />
              </div>

              {/* Problem Statement */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 px-1 block">
                  Problem Statement
                </label>
                <textarea
                  rows={2}
                  value={formData.problemStatement}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, problemStatement: e.target.value }))
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-[#FF6014] focus:bg-white focus:ring-2 focus:ring-[#FF6014]/20 transition-all resize-none shadow-xs"
                  placeholder="Problem candidates faced before this platform..."
                />
              </div>

              {/* Key Features */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 px-1 block">
                  Key Features (Title: Detail per line or JSON)
                </label>
                <textarea
                  rows={3}
                  value={formData.keyFeaturesInput}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, keyFeaturesInput: e.target.value }))
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 font-mono placeholder:text-slate-400 focus:outline-none focus:border-[#FF6014] focus:bg-white focus:ring-2 focus:ring-[#FF6014]/20 transition-all resize-none shadow-xs"
                  placeholder={`Online Exam Engine: Chapter-based tests...\nReal-Time Performance Analytics: Instant scorecards...`}
                />
              </div>

              {/* Technical Challenges */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 px-1 block">
                  Technical Challenges & Solutions
                </label>
                <textarea
                  rows={3}
                  value={formData.technicalChallengesInput}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, technicalChallengesInput: e.target.value }))
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 font-mono placeholder:text-slate-400 focus:outline-none focus:border-[#FF6014] focus:bg-white focus:ring-2 focus:ring-[#FF6014]/20 transition-all resize-none shadow-xs"
                  placeholder={`Handling real-time submission: Leveraged Node.js with Redis caching...`}
                />
              </div>

              {/* Gallery Screenshots / Images Upload */}
              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                    Gallery Screenshots (Up to 4 images)
                  </label>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {galleryPreviews.length} / 4 images
                  </span>
                </div>

                {/* Upload Trigger & Previews Grid */}
                <div className="space-y-3">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {galleryPreviews.map((gUrl, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-video rounded-xl border border-slate-200 overflow-hidden group bg-slate-100 shadow-xs"
                      >
                        <img
                          src={gUrl}
                          alt={`Gallery ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => onRemoveGalleryImage?.(idx)}
                          className="absolute top-1 right-1 p-1 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors shadow-sm cursor-pointer"
                          title="Remove screenshot"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}

                    {galleryPreviews.length < 4 && (
                      <button
                        type="button"
                        onClick={() => galleryInputRef.current?.click()}
                        className="aspect-video rounded-xl border-2 border-dashed border-slate-200 hover:border-[#FF6014] bg-slate-50 hover:bg-orange-500/5 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer p-2"
                      >
                        <Upload className="w-4 h-4 text-[#FF6014]" />
                        <span className="text-[10px] font-bold text-slate-600 uppercase">
                          Upload File
                        </span>
                      </button>
                    )}
                  </div>

                  <input
                    type="file"
                    ref={galleryInputRef}
                    onChange={onPickGalleryImages}
                    multiple
                    accept="image/*"
                    className="hidden"
                  />

                  {/* Optional Direct URLs input */}
                  <div className="space-y-1 pt-1">
                    <label className="text-[11px] font-medium text-slate-500 px-1">
                      Or paste image URLs (One per line):
                    </label>
                    <textarea
                      rows={2}
                      value={formData.galleryInput}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, galleryInput: e.target.value }))
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono placeholder:text-slate-400 focus:outline-none focus:border-[#FF6014] focus:bg-white focus:ring-2 focus:ring-[#FF6014]/20 transition-all resize-none shadow-xs"
                      placeholder={`https://i.ibb.co/screenshot1.png\nhttps://i.ibb.co/screenshot2.png`}
                    />
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 px-1 block">
                  Tech Stack (Comma separated) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    required
                    value={formData.techInput}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, techInput: e.target.value }))
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-[#FF6014] focus:bg-white focus:ring-2 focus:ring-[#FF6014]/20 transition-all shadow-xs"
                    placeholder="Next.js 16, React 19, TypeScript, PostgreSQL"
                  />
                </div>
              </div>

              {/* Links */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 px-1 block">
                    Demo Link <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      required
                      value={formData.demoLink}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, demoLink: e.target.value }))
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-[#FF6014] focus:bg-white focus:ring-2 focus:ring-[#FF6014]/20 transition-all shadow-xs"
                      placeholder="https://demo.com"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 px-1 block">
                    GitHub Link
                  </label>
                  <input
                    value={formData.githubLink}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        githubLink: e.target.value,
                      }))
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-[#FF6014] focus:bg-white focus:ring-2 focus:ring-[#FF6014]/20 transition-all shadow-xs"
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              {/* Status Checkboxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="flex items-center gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100/80 transition-colors">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, featured: e.target.checked }))
                    }
                    className="w-4 h-4 rounded text-[#FF6014] focus:ring-[#FF6014] accent-[#FF6014] cursor-pointer"
                  />
                  <label
                    htmlFor="featured"
                    className="text-xs font-bold text-slate-800 cursor-pointer select-none"
                  >
                    Mark as Featured Project
                  </label>
                </div>

                <div className="flex items-center gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100/80 transition-colors">
                  <input
                    type="checkbox"
                    id="currentlyWorking"
                    checked={formData.currentlyWorking}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, currentlyWorking: e.target.checked }))
                    }
                    className="w-4 h-4 rounded text-[#FF6014] focus:ring-[#FF6014] accent-[#FF6014] cursor-pointer"
                  />
                  <label
                    htmlFor="currentlyWorking"
                    className="text-xs font-bold text-slate-800 cursor-pointer select-none"
                  >
                    Mark as Active Working
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Modal Action Buttons Footer */}
        <div className="p-6 border-t border-slate-100 flex gap-4 bg-slate-50/50 sticky bottom-0 z-20">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold uppercase tracking-wider text-xs transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="project-form"
            disabled={isSaving}
            className="flex-[2] py-3.5 bg-[#FF6014] hover:bg-[#E0530A] text-white rounded-xl font-black uppercase tracking-wider text-xs shadow-lg shadow-[#FF6014]/25 hover:shadow-[#FF6014]/40 hover:scale-[1.01] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
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


