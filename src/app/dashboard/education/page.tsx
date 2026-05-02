"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/components/Dashboard/ui/ToastContext";
import { Loader2, Plus, Trash2, Edit2, GraduationCap } from "lucide-react";

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

const EducationManager = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [eduForm, setEduForm] = useState<Partial<Education>>({
    degree: "",
    field: "",
    institution: "",
    shortName: "",
    location: "",
    period: "",
    grade: "",
  });

  // Query
  const { data: education, isLoading } = useQuery<Education[]>({
    queryKey: ["education"],
    queryFn: async () => {
      const res = await axios.get("/api/education");
      return res.data;
    },
  });

  // Mutations
  const addMutation = useMutation({
    mutationFn: (data: Partial<Education>) =>
      axios.post("/api/education", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["education"] });
      showToast("Education added successfully!");
      setIsAdding(false);
      resetForm();
    },
    onError: () => showToast("Failed to add education"),
  });

  const updateMutation = useMutation({
    mutationFn: (data: Education) =>
      axios.put(`/api/education/${data.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["education"] });
      showToast("Education updated successfully!");
      setEditingId(null);
      resetForm();
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

  const resetForm = () => {
    setEduForm({
      degree: "",
      field: "",
      institution: "",
      shortName: "",
      location: "",
      period: "",
      grade: "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateMutation.mutate({ ...eduForm, id: editingId } as Education);
    } else {
      addMutation.mutate(eduForm);
    }
  };

  const handleEdit = (edu: Education) => {
    setEditingId(edu.id);
    setEduForm(edu);
    setIsAdding(true);
  };

  return (
    <div className="max-w-5xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">Education Fuck </h1>
          <p className="text-foreground/50 font-medium">
            Manage your academic background.
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setEditingId(null);
            setIsAdding(true);
          }}
          className="px-6 py-3 bg-white text-black rounded-2xl font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </button>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-white/20" />
            </div>
          ) : (
            education?.map((edu) => (
              <motion.div
                key={edu.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="p-8 bg-white/[0.03] border border-white/5 rounded-[2rem] hover:border-white/10 transition-colors group relative"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                      <GraduationCap className="w-6 h-6 text-white/40" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">{edu.degree}</h3>
                      <p className="text-sm font-bold text-white/60 mb-2">
                        {edu.field}
                      </p>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-bold text-xs text-foreground/40">
                          {edu.institution}
                        </span>
                        <span className="text-[10px] text-foreground/30 font-bold uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded-full">
                          {edu.period}
                        </span>
                        {edu.grade && (
                          <span className="text-[10px] text-green-500/60 font-bold uppercase tracking-widest bg-green-500/5 px-2 py-0.5 rounded-full">
                            Grade: {edu.grade}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(edu)}
                      className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Are you sure?"))
                          deleteMutation.mutate(edu.id);
                      }}
                      className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAdding(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-10 shadow-2xl my-auto"
            >
              <h2 className="text-2xl font-black mb-8">
                {editingId ? "Edit" : "Add"} Education
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">
                      Degree
                    </label>
                    <input
                      required
                      type="text"
                      value={eduForm.degree}
                      onChange={(e) =>
                        setEduForm({ ...eduForm, degree: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-white/20 transition-colors font-medium"
                      placeholder="e.g. Bachelor of Science"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">
                      Field of Study
                    </label>
                    <input
                      required
                      type="text"
                      value={eduForm.field}
                      onChange={(e) =>
                        setEduForm({ ...eduForm, field: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-white/20 transition-colors font-medium"
                      placeholder="e.g. Computer Science"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">
                      Institution
                    </label>
                    <input
                      required
                      type="text"
                      value={eduForm.institution}
                      onChange={(e) =>
                        setEduForm({ ...eduForm, institution: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-white/20 transition-colors font-medium"
                      placeholder="e.g. University of Dhaka"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">
                      Location
                    </label>
                    <input
                      required
                      type="text"
                      value={eduForm.location}
                      onChange={(e) =>
                        setEduForm({ ...eduForm, location: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-white/20 transition-colors font-medium"
                      placeholder="e.g. Dhaka, Bangladesh"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">
                      Period
                    </label>
                    <input
                      required
                      type="text"
                      value={eduForm.period}
                      onChange={(e) =>
                        setEduForm({ ...eduForm, period: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-white/20 transition-colors font-medium"
                      placeholder="e.g. 2018 - 2022"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">
                      Grade (Optional)
                    </label>
                    <input
                      type="text"
                      value={eduForm.grade}
                      onChange={(e) =>
                        setEduForm({ ...eduForm, grade: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-white/20 transition-colors font-medium"
                      placeholder="e.g. 3.8/4.0"
                    />
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="flex-1 py-4 bg-white/5 hover:bg-white/10 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={addMutation.isPending || updateMutation.isPending}
                    className="flex-1 py-4 bg-white text-black rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {addMutation.isPending || updateMutation.isPending ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
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
