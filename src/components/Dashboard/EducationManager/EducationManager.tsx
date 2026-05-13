"use client";

import React, { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/components/Dashboard/ui/ToastContext";
import EducationHeader from "./EducationHeader";
import EducationList from "./EducationList";
import EducationModal from "./EducationModal";
import { EMPTY_FORM } from "./fieldConfig";
import type { Education, EducationFormState } from "./types";

export default function EducationManager() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [eduForm, setEduForm] = useState<EducationFormState>(EMPTY_FORM);

  const { data: education, isLoading } = useQuery<Education[]>({
    queryKey: ["education"],
    queryFn: async () => (await axios.get("/api/education")).data,
  });

  const addMutation = useMutation({
    mutationFn: (data: EducationFormState) => axios.post("/api/education", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["education"] });
      showToast("Education added successfully!");
      closeModal();
    },
    onError: () => showToast("Failed to add education"),
  });

  const updateMutation = useMutation({
    mutationFn: (data: Education) => axios.put(`/api/education/${data.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["education"] });
      showToast("Education updated successfully!");
      closeModal();
    },
    onError: () => showToast("Failed to update education"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => axios.delete(`/api/education/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["education"] });
      showToast("Education deleted successfully!");
    },
    onError: () => showToast("Failed to delete education"),
  });

  const openAdd = () => {
    setEditingId(null);
    setEduForm(EMPTY_FORM);
    setIsModalOpen(true);
  };

  const openEdit = (edu: Education) => {
    setEditingId(edu.id);
    setEduForm(edu);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setEduForm(EMPTY_FORM);
  };

  const isSaving = useMemo(
    () => addMutation.isPending || updateMutation.isPending,
    [addMutation.isPending, updateMutation.isPending],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateMutation.mutate({ ...(eduForm as Education), id: editingId });
    } else {
      addMutation.mutate(eduForm);
    }
  };

  return (
    <div className="w-full">
      <EducationHeader onAdd={openAdd} />

      <EducationList
        education={education}
        isLoading={isLoading}
        isDeleting={deleteMutation.isPending}
        onEdit={openEdit}
        onDelete={(id) => deleteMutation.mutate(id)}
      />

      <EducationModal
        isOpen={isModalOpen}
        isEditing={Boolean(editingId)}
        form={eduForm}
        onChange={(key, value) =>
          setEduForm((prev) => ({ ...prev, [key]: value }))
        }
        onClose={closeModal}
        onSubmit={handleSubmit}
        isSaving={isSaving}
      />
    </div>
  );
}

