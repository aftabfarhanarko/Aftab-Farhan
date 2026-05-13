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
  description: "",
  image: "",
  demoLink: "",
  githubLink: "",
  category: projectCategories[0],
  year: new Date().getFullYear().toString(),
  featured: false,
  projectType: projectTypes[0],
  client: "",
  techInput: "",
});

export default function ProjectsManager() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

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
      isUploading || addProjectMutation.isPending || updateProjectMutation.isPending,
    [addProjectMutation.isPending, isUploading, updateProjectMutation.isPending],
  );

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
      setImageFile(null);
    } else {
      setEditingProject(null);
      setFormData(newProjectState());
      setImagePreview(null);
      setImageFile(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
    setImageFile(null);
    setImagePreview(null);
  };

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
    setFormData((p) => ({ ...p, image: "" }));
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
    } catch {
      showToast("Failed to upload image", "error");
    } finally {
      setIsUploading(false);
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
          onClose={closeModal}
          onSubmit={handleSubmit}
          onPickImage={handleImageChange}
          onClearImage={clearImage}
          isSaving={isSaving}
          isUploading={isUploading}
        />
      </AnimatePresence>
    </div>
  );
}

