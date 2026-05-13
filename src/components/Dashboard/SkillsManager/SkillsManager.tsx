"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { uploadImageToImgBB } from "@/lib/upload";
import { useToast } from "@/components/Dashboard/ui/ToastContext";
import CategoryModal from "./CategoryModal";
import CategorySection from "./CategorySection";
import SkillModal from "./SkillModal";
import SkillsHeader from "./SkillsHeader";
import type {
  CategoryFormState,
  Skill,
  SkillCategory,
  SkillFormState,
} from "./types";

const emptySkillForm: SkillFormState = { name: "", imageUrl: "", categoryId: "" };
const emptyCategoryForm: CategoryFormState = { title: "" };

export default function SkillsManager() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [editingCategory, setEditingCategory] = useState<SkillCategory | null>(
    null,
  );

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [skillForm, setSkillForm] = useState<SkillFormState>(emptySkillForm);
  const [categoryForm, setCategoryForm] =
    useState<CategoryFormState>(emptyCategoryForm);

  const { data: categories, isLoading } = useQuery<SkillCategory[]>({
    queryKey: ["skills-categories"],
    queryFn: async () => (await axios.get("/api/skills")).data,
  });

  const safeCategories = categories ?? [];
  const defaultCategoryId = safeCategories[0]?.id ?? "";

  const addSkillMutation = useMutation({
    mutationFn: (data: SkillFormState) => axios.post("/api/skills", data),
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

  const addCategoryMutation = useMutation({
    mutationFn: (data: CategoryFormState) => axios.post("/api/skills/categories", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills-categories"] });
      showToast("Category added successfully!");
      closeCategoryModal();
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: (data: { id: string; title: string }) =>
      axios.put(`/api/skills/categories/${data.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills-categories"] });
      showToast("Category updated successfully!");
      closeCategoryModal();
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: (id: string) => axios.delete(`/api/skills/categories/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills-categories"] });
      showToast("Category deleted successfully!");
    },
  });

  const isSavingSkill = useMemo(
    () =>
      isUploading ||
      addSkillMutation.isPending ||
      updateSkillMutation.isPending,
    [addSkillMutation.isPending, isUploading, updateSkillMutation.isPending],
  );

  const isSavingCategory = useMemo(
    () => addCategoryMutation.isPending || updateCategoryMutation.isPending,
    [addCategoryMutation.isPending, updateCategoryMutation.isPending],
  );

  const openAddCategory = () => {
    setEditingCategory(null);
    setCategoryForm(emptyCategoryForm);
    setIsCategoryModalOpen(true);
  };

  const openEditCategory = (category: SkillCategory) => {
    setEditingCategory(category);
    setCategoryForm({ title: category.title });
    setIsCategoryModalOpen(true);
  };

  const closeCategoryModal = () => {
    setIsCategoryModalOpen(false);
    setEditingCategory(null);
    setCategoryForm(emptyCategoryForm);
  };

  const openAddSkill = (categoryId?: string) => {
    setEditingSkill(null);
    setSkillForm({
      name: "",
      imageUrl: "",
      categoryId: categoryId ?? defaultCategoryId,
    });
    setImagePreview(null);
    setImageFile(null);
    setIsSkillModalOpen(true);
  };

  const openEditSkill = (skill: Skill) => {
    setEditingSkill(skill);
    setSkillForm({
      name: skill.name,
      imageUrl: skill.imageUrl || "",
      categoryId: skill.categoryId,
    });
    setImagePreview(skill.imageUrl || null);
    setImageFile(null);
    setIsSkillModalOpen(true);
  };

  const closeSkillModal = () => {
    setIsSkillModalOpen(false);
    setEditingSkill(null);
    setImageFile(null);
    setImagePreview(null);
    setSkillForm({ ...emptySkillForm, categoryId: defaultCategoryId });
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
    setSkillForm((f) => ({ ...f, imageUrl: "" }));
  };

  const handleSkillSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      let finalImageUrl = skillForm.imageUrl;
      if (imageFile) {
        finalImageUrl = await uploadImageToImgBB(imageFile);
      }
      const payload: SkillFormState = { ...skillForm, imageUrl: finalImageUrl };

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

  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory) {
      updateCategoryMutation.mutate({ id: editingCategory.id, ...categoryForm });
    } else {
      addCategoryMutation.mutate(categoryForm);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-white/20" />
      </div>
    );
  }

  return (
    <div className="w-full mx-auto px-4 sm:px-6 py-8">
      <SkillsHeader
        onAddCategory={openAddCategory}
        onAddSkill={() => openAddSkill()}
      />

      <div className="space-y-10">
        {safeCategories.length === 0 ? (
          <p className="text-sm text-white/30 text-center py-16">
            No categories yet. Add one to get started.
          </p>
        ) : (
          safeCategories.map((category) => (
            <CategorySection
              key={category.id}
              category={category}
              onEditCategory={() => openEditCategory(category)}
              onDeleteCategory={() => {
                if (!confirm("Delete this category and all its skills?")) return;
                deleteCategoryMutation.mutate(category.id);
              }}
              onAddSkillInCategory={() => openAddSkill(category.id)}
              onEditSkill={(skillId) => {
                const skill = category.skills.find((s) => s.id === skillId);
                if (skill) openEditSkill(skill);
              }}
              onDeleteSkill={(skillId) => {
                if (!confirm("Delete skill?")) return;
                deleteSkillMutation.mutate(skillId);
              }}
            />
          ))
        )}
      </div>

      <AnimatePresence>
        <SkillModal
          isOpen={isSkillModalOpen}
          title={`${editingSkill ? "Edit" : "Add"} Skill`}
          categories={safeCategories}
          form={skillForm}
          imagePreview={imagePreview}
          isSaving={isSavingSkill}
          isUploading={isUploading}
          onClose={closeSkillModal}
          onSubmit={handleSkillSubmit}
          onChangeName={(value) => setSkillForm((f) => ({ ...f, name: value }))}
          onChangeCategory={(categoryId) =>
            setSkillForm((f) => ({ ...f, categoryId }))
          }
          onPickImage={handleImageChange}
          onClearImage={clearImage}
        />
      </AnimatePresence>

      <AnimatePresence>
        <CategoryModal
          isOpen={isCategoryModalOpen}
          title={`${editingCategory ? "Edit" : "Add"} Category`}
          form={categoryForm}
          isSaving={isSavingCategory}
          onClose={closeCategoryModal}
          onSubmit={handleCategorySubmit}
          onChangeTitle={(title) => setCategoryForm({ title })}
        />
      </AnimatePresence>
    </div>
  );
}

