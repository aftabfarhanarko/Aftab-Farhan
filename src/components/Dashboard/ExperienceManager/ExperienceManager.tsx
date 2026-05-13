"use client";

import React, { useCallback, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/Dashboard/ui/ToastContext";
import ExperienceCards from "./ExperienceCards";
import ExperienceEditor from "./ExperienceEditor";
import ExperienceHeader from "./ExperienceHeader";
import type { Achievement, Experience, Role } from "./types";
import { INITIAL_EXP } from "./types";

export default function ExperienceManager() {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [currentExp, setCurrentExp] = useState<Experience>(INITIAL_EXP);

  const { data: experiences = [], isLoading } = useQuery<Experience[]>({
    queryKey: ["experiences"],
    queryFn: async () => {
      const res = await fetch("/api/experience");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (data: Experience) => {
      const res = await fetch(
        editingId ? `/api/experience/${editingId}` : "/api/experience",
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.details || err.error || "Failed to save");
      }
      return res.json();
    },
    onSuccess: () => {
      showToast(`Experience ${editingId ? "updated" : "added"} successfully!`);
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
      handleCancel();
    },
    onError: (e: unknown) => {
      const message =
        e instanceof Error ? e.message : "Error saving experience";
      showToast(message, "error");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/experience/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
    },
    onSuccess: () => {
      showToast("Experience deleted!");
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
    },
    onError: () => showToast("Error deleting experience", "error"),
  });

  const handleCancel = useCallback(() => {
    setIsAdding(false);
    setEditingId(null);
    setCurrentExp(INITIAL_EXP);
  }, []);

  const handleEdit = useCallback((exp: Experience) => {
    setCurrentExp(exp);
    setEditingId(exp.id ?? null);
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const patch = useCallback(
    <K extends keyof Experience>(key: K, val: Experience[K]) =>
      setCurrentExp((prev) => ({ ...prev, [key]: val })),
    [],
  );

  const addRole = () =>
    patch("roles", [
      ...currentExp.roles,
      { title: "", subtitle: "", iconName: "Briefcase", responsibilities: [""] },
    ]);

  const removeRole = (i: number) =>
    patch(
      "roles",
      currentExp.roles.filter((_, idx) => idx !== i),
    );

  const patchRole = <K extends keyof Role>(i: number, key: K, val: Role[K]) => {
    const next = [...currentExp.roles];
    next[i] = { ...next[i], [key]: val };
    patch("roles", next);
  };

  const addResp = (ri: number) => {
    const next = [...currentExp.roles];
    next[ri] = {
      ...next[ri],
      responsibilities: [...next[ri].responsibilities, ""],
    };
    patch("roles", next);
  };

  const removeResp = (ri: number, pi: number) => {
    const next = [...currentExp.roles];
    next[ri] = {
      ...next[ri],
      responsibilities: next[ri].responsibilities.filter((_, i) => i !== pi),
    };
    patch("roles", next);
  };

  const patchResp = (ri: number, pi: number, val: string) => {
    const next = [...currentExp.roles];
    const resps = [...next[ri].responsibilities];
    resps[pi] = val;
    next[ri] = { ...next[ri], responsibilities: resps };
    patch("roles", next);
  };

  const addAchv = () =>
    patch("achievements", [...currentExp.achievements, { metric: "", label: "" }]);

  const removeAchv = (i: number) =>
    patch(
      "achievements",
      currentExp.achievements.filter((_, idx) => idx !== i),
    );

  const patchAchv = <K extends keyof Achievement>(
    i: number,
    key: K,
    val: Achievement[K],
  ) => {
    const next = [...currentExp.achievements];
    next[i] = { ...next[i], [key]: val };
    patch("achievements", next);
  };

  return (
    <div className="w-full">
      <ExperienceHeader
        isAdding={isAdding}
        onAdd={() => {
          setCurrentExp(INITIAL_EXP);
          setEditingId(null);
          setIsAdding(true);
        }}
      />

      <ExperienceEditor
        isOpen={isAdding}
        editingId={editingId}
        currentExp={currentExp}
        isSaving={saveMutation.isPending}
        onCancel={handleCancel}
        onSubmit={() => saveMutation.mutate(currentExp)}
        patch={patch}
        addRole={addRole}
        removeRole={removeRole}
        patchRole={patchRole}
        addResp={addResp}
        removeResp={removeResp}
        patchResp={patchResp}
        addAchv={addAchv}
        removeAchv={removeAchv}
        patchAchv={patchAchv}
      />

      <ExperienceCards
        experiences={experiences}
        isLoading={isLoading}
        isAdding={isAdding}
        isDeleting={deleteMutation.isPending}
        onEdit={handleEdit}
        onDelete={(id) => deleteMutation.mutate(id)}
      />
    </div>
  );
}

