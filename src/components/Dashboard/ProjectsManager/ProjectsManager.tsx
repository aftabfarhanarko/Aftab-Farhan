"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/components/Dashboard/ui/ToastContext";
import { uploadImageToImgBB } from "@/lib/upload";
import ProjectModal from "./ProjectModal";
import ProjectsGrid from "./ProjectsGrid";
import ProjectsHeader from "./ProjectsHeader";
import type { Project, ProjectFormState } from "./types";
import { projectCategories, projectTypes } from "./types";

const newProjectState = (): ProjectFormState => ({
  title: "",
  tagline: "",
  role: "",
  description: "",
  image: "",
  galleryInput: "",
  overview: "",
  problemStatement: "",
  keyFeaturesInput: "",
  technicalChallengesInput: "",
  demoLink: "",
  githubLink: "",
  category: projectCategories[0],
  year: new Date().getFullYear().toString(),
  featured: false,
  currentlyWorking: false,
  projectType: projectTypes[0],
  client: "",
  startDate: "",
  endDate: "",
  duration: "",
  techInput: "",
});

export default function ProjectsManager() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploadingCover, setIsUploadingCover] = useState(false);

  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);

  const [formData, setFormData] = useState<ProjectFormState>(newProjectState);

  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => (await axios.get("/api/projects")).data,
  });

  const addProjectMutation = useMutation({
    mutationFn: (data: unknown) => axios.post("/api/projects", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      showToast("Project created successfully!");
      closeModal();
    },
    onError: () => showToast("Failed to create project", "error"),
  });

  const updateProjectMutation = useMutation({
    mutationFn: (data: { id: string } & Record<string, unknown>) =>
      axios.put(`/api/projects/${data.id}`, data),
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

  const isSaving = useMemo(
    () =>
      isUploadingCover ||
      isUploadingGallery ||
      addProjectMutation.isPending ||
      updateProjectMutation.isPending,
    [
      addProjectMutation.isPending,
      isUploadingCover,
      isUploadingGallery,
      updateProjectMutation.isPending,
    ],
  );

  const isUploading = isUploadingCover || isUploadingGallery;

  const openModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      const existingGallery = project.gallery || [];
      setFormData({
        title: project.title,
        tagline: project.tagline,
        role: project.role || "",
        description: project.description,
        image: project.image,
        galleryInput: existingGallery.join("\n"),
        overview: project.overview || "",
        problemStatement: project.problemStatement || "",
        keyFeaturesInput: project.keyFeatures
          ? JSON.stringify(project.keyFeatures, null, 2)
          : "",
        technicalChallengesInput: project.technicalChallenges
          ? JSON.stringify(project.technicalChallenges, null, 2)
          : "",
        demoLink: project.demoLink,
        githubLink: project.githubLink || "",
        category: project.category,
        year: project.year,
        featured: project.featured,
        currentlyWorking: project.currentlyWorking || false,
        projectType: project.projectType,
        client: project.client || "",
        startDate: project.startDate || "",
        endDate: project.endDate || "",
        duration: project.duration || "",
        techInput: project.tech.join(", "),
      });
      setImagePreview(project.image);
      setImageFile(null);
      setGalleryPreviews(existingGallery);
    } else {
      setEditingProject(null);
      setFormData(newProjectState());
      setImagePreview(null);
      setImageFile(null);
      setGalleryPreviews([]);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
    setImageFile(null);
    setImagePreview(null);
    setGalleryPreviews([]);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);

    // Show temporary local preview
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);

    // Immediately upload to ImgBB and update URL
    setIsUploadingCover(true);
    showToast("Uploading cover image...");
    try {
      const url = await uploadImageToImgBB(file);
      setImagePreview(url);
      setFormData((p) => ({ ...p, image: url }));
      showToast("Cover image uploaded successfully!");
    } catch {
      showToast("Failed to upload cover image", "error");
    } finally {
      setIsUploadingCover(false);
    }
  };

  const clearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageFile(null);
    setImagePreview(null);
    setFormData((p) => ({ ...p, image: "" }));
  };

  const handleGalleryImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Limit total gallery images to 4
    const availableSlots = 4 - galleryPreviews.length;
    const filesToProcess = files.slice(0, Math.max(0, availableSlots));

    if (filesToProcess.length === 0) {
      showToast("Maximum 4 gallery images allowed", "error");
      return;
    }

    setIsUploadingGallery(true);
    showToast(`Uploading ${filesToProcess.length} gallery image(s)...`);

    try {
      // Upload all selected gallery images to ImgBB immediately
      const uploads = filesToProcess.map((f) => uploadImageToImgBB(f));
      const urls = await Promise.all(uploads);

      // Append new direct ImgBB URLs to gallery previews and text area input
      setGalleryPreviews((prev) => [...prev, ...urls]);
      setFormData((p) => {
        const currentUrls = p.galleryInput
          .split(/[\n,]/)
          .map((g) => g.trim())
          .filter(Boolean);
        const combined = Array.from(new Set([...currentUrls, ...urls]));
        return { ...p, galleryInput: combined.join("\n") };
      });

      showToast("Gallery images uploaded successfully!");
    } catch {
      showToast("Failed to upload gallery images", "error");
    } finally {
      setIsUploadingGallery(false);
    }
  };

  const removeGalleryImage = (index: number) => {
    const targetUrl = galleryPreviews[index];
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));

    // Remove from galleryInput
    const urls = formData.galleryInput
      .split(/[\n,]/)
      .map((g) => g.trim())
      .filter(Boolean);
    const updatedUrls = urls.filter((url) => url !== targetUrl);
    setFormData((p) => ({ ...p, galleryInput: updatedUrls.join("\n") }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let finalImageUrl = formData.image;
      if (imageFile && !finalImageUrl.startsWith("http")) {
        finalImageUrl = await uploadImageToImgBB(imageFile);
      }

      const galleryUrls = Array.from(
        new Set([
          ...galleryPreviews,
          ...formData.galleryInput
            .split(/[\n,]/)
            .map((g) => g.trim())
            .filter((g) => g.startsWith("http://") || g.startsWith("https://")),
        ]),
      );

      let keyFeatures = [];
      if (formData.keyFeaturesInput.trim()) {
        try {
          keyFeatures = JSON.parse(formData.keyFeaturesInput);
        } catch {
          keyFeatures = formData.keyFeaturesInput
            .split("\n")
            .filter(Boolean)
            .map((line) => {
              const [title, ...rest] = line.split(":");
              return { title: title.trim(), detail: rest.join(":").trim() || title.trim() };
            });
        }
      }

      let technicalChallenges = [];
      if (formData.technicalChallengesInput.trim()) {
        try {
          technicalChallenges = JSON.parse(formData.technicalChallengesInput);
        } catch {
          technicalChallenges = formData.technicalChallengesInput
            .split("\n")
            .filter(Boolean)
            .map((line) => {
              const [challenge, ...rest] = line.split(":");
              return { challenge: challenge.trim(), solution: rest.join(":").trim() || challenge.trim() };
            });
        }
      }

      const payload = {
        ...formData,
        image: finalImageUrl,
        gallery: galleryUrls,
        keyFeatures,
        technicalChallenges,
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
    } catch {
      showToast("Failed to save project", "error");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-white/20" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl w-full">
      <ProjectsHeader onAdd={() => openModal()} />

      <ProjectsGrid
        projects={projects ?? []}
        onEdit={(p) => openModal(p)}
        onDelete={(p) => {
          if (!confirm("Are you sure you want to delete this project?")) return;
          deleteProjectMutation.mutate(p.id);
        }}
      />

      <AnimatePresence>
        <ProjectModal
          isOpen={isModalOpen}
          editingProject={editingProject}
          formData={formData}
          setFormData={setFormData}
          imagePreview={imagePreview}
          galleryPreviews={galleryPreviews}
          onClose={closeModal}
          onSubmit={handleSubmit}
          onPickImage={handleImageChange}
          onClearImage={clearImage}
          onPickGalleryImages={handleGalleryImagesChange}
          onRemoveGalleryImage={removeGalleryImage}
          isSaving={isSaving}
          isUploading={isUploading}
        />
      </AnimatePresence>
    </div>
  );
}

