"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/components/Dashboard/ui/ToastContext";
import {
  Loader2,
  Plus,
  Trash2,
  Edit2,
  GraduationCap,
  MapPin,
  Calendar,
  Award,
  X,
  BookOpen,
} from "lucide-react";

interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  shortName?: string;
  location: string;
  period: string;
  grade?: string;
}

const EMPTY_FORM: Partial<Education> = {
  degree: "",
  field: "",
  institution: "",
  shortName: "",
  location: "",
  period: "",
  grade: "",
};

const FIELD_CONFIG = [
  {
    key: "degree",
    label: "Degree",
    placeholder: "e.g. Bachelor of Science",
    required: true,
    colSpan: 1,
  },
  {
    key: "field",
    label: "Field of Study",
    placeholder: "e.g. Computer Science",
    required: true,
    colSpan: 1,
  },
  {
    key: "institution",
    label: "Institution",
    placeholder: "e.g. University of Dhaka",
    required: true,
    colSpan: 1,
  },
  {
    key: "shortName",
    label: "Short Name",
    placeholder: "e.g. DU",
    required: false,
    colSpan: 1,
  },
  {
    key: "location",
    label: "Location",
    placeholder: "e.g. Dhaka, Bangladesh",
    required: true,
    colSpan: 1,
  },
  {
    key: "period",
    label: "Period",
    placeholder: "e.g. 2018 – 2022",
    required: true,
    colSpan: 1,
  },
  {
    key: "grade",
    label: "Grade (Optional)",
    placeholder: "e.g. 3.8 / 4.0",
    required: false,
    colSpan: 2,
  },
] as const;

const EducationManager = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [eduForm, setEduForm] = useState<Partial<Education>>(EMPTY_FORM);

  // ── Query ──────────────────────────────────────────────────────────────────
  const { data: education, isLoading } = useQuery<Education[]>({
    queryKey: ["education"],
    queryFn: async () => (await axios.get("/api/education")).data,
  });

  // ── Mutations ──────────────────────────────────────────────────────────────
  const addMutation = useMutation({
    mutationFn: (data: Partial<Education>) =>
      axios.post("/api/education", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["education"] });
      showToast("Education added successfully!");
      closeModal();
    },
    onError: () => showToast("Failed to add education"),
  });

  const updateMutation = useMutation({
    mutationFn: (data: Education) =>
      axios.put(`/api/education/${data.id}`, data),
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

  // ── Helpers ────────────────────────────────────────────────────────────────
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateMutation.mutate({ ...eduForm, id: editingId } as Education);
    } else {
      addMutation.mutate(eduForm);
    }
  };

  const isSaving = addMutation.isPending || updateMutation.isPending;

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="w-full">
      {/* ── Page Header ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/5">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">
            Academic Background
          </p>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-none">
            Education
          </h1>
        </div>
        <button
          onClick={openAdd}
          className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest overflow-hidden hover:scale-[1.03] active:scale-[0.97] transition-transform shrink-0"
        >
          <span className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Plus className="w-4 h-4" />
          Add Education
        </button>
      </div>

      {/* ── List ────────────────────────────────────────────────────────────── */}
      {isLoading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-7 h-7 animate-spin text-white/20" />
        </div>
      ) : education?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-white/20">
          <BookOpen className="w-10 h-10" />
          <p className="text-sm font-bold uppercase tracking-widest">
            No education records yet
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {education?.map((edu, i) => (
              <motion.div
                key={edu.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ delay: i * 0.04 }}
                className="group w-full relative flex flex-col sm:flex-row sm:items-center gap-5 p-6 sm:p-7 bg-white/[0.025] hover:bg-white/[0.04] border border-white/[0.06] hover:border-white/10 rounded-2xl transition-all duration-200"
              >
                {/* Icon */}
                <div className="shrink-0 w-11 h-11 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white/30" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 mb-1.5">
                    <h3 className="text-base sm:text-lg font-black leading-tight truncate">
                      {edu.degree}
                    </h3>
                    <span className="text-sm font-semibold text-white/40 truncate">
                      {edu.field}
                    </span>
                  </div>

                  <p className="text-sm font-bold text-white/60 truncate mb-3">
                    {edu.institution}
                    {edu.shortName && (
                      <span className="ml-2 text-[10px] font-black uppercase tracking-widest text-white/25 bg-white/5 px-2 py-0.5 rounded-full align-middle">
                        {edu.shortName}
                      </span>
                    )}
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="flex items-center gap-1 text-[11px] font-bold text-white/30">
                      <MapPin className="w-3 h-3" /> {edu.location}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-bold text-white/30">
                      <Calendar className="w-3 h-3" /> {edu.period}
                    </span>
                    {edu.grade && (
                      <span className="flex items-center gap-1 text-[11px] font-black text-emerald-400/70 bg-emerald-500/8 border border-emerald-500/10 px-2.5 py-0.5 rounded-full">
                        <Award className="w-3 h-3" /> {edu.grade}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shrink-0">
                  <button
                    onClick={() => openEdit(edu)}
                    className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 rounded-xl transition-all"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() =>
                      confirm("Delete this education record?") &&
                      deleteMutation.mutate(edu.id)
                    }
                    className="p-2.5 bg-red-500/8 hover:bg-red-500/15 border border-red-500/10 hover:border-red-500/20 text-red-400 rounded-xl transition-all"
                    disabled={deleteMutation.isPending}
                  >
                    {deleteMutation.isPending ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* ── Modal ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="relative w-full max-w-2xl bg-[#0c0c0c] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Modal header */}
              <div className="flex items-center justify-between px-7 pt-7 pb-6 border-b border-white/5">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/25 mb-1">
                    {editingId ? "Editing Record" : "New Record"}
                  </p>
                  <h2 className="text-xl font-black">
                    {editingId ? "Edit" : "Add"} Education
                  </h2>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-white/5 rounded-xl transition-colors text-white/30 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {FIELD_CONFIG.map(
                    ({ key, label, placeholder, required, colSpan }) => (
                      <div
                        key={key}
                        className={`space-y-1.5 ${colSpan === 2 ? "sm:col-span-2" : ""}`}
                      >
                        <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-white/30 px-0.5">
                          {label}
                        </label>
                        <input
                          required={required}
                          type="text"
                          value={
                            (eduForm[key as keyof typeof eduForm] as string) ??
                            ""
                          }
                          onChange={(e) =>
                            setEduForm((prev) => ({
                              ...prev,
                              [key]: e.target.value,
                            }))
                          }
                          className="w-full bg-white/[0.04] hover:bg-white/[0.06] border border-white/8 hover:border-white/12 focus:border-white/20 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none transition-all placeholder:text-white/15"
                          placeholder={placeholder}
                        />
                      </div>
                    ),
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 py-3.5 bg-white/5 hover:bg-white/8 border border-white/5 hover:border-white/10 rounded-xl font-bold text-sm uppercase tracking-widest transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 py-3.5 bg-white text-black rounded-xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving…
                      </>
                    ) : editingId ? (
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

export default EducationManager;
