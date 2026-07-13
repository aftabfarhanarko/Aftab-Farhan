"use client";

import React, { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/components/Dashboard/ui/ToastContext";
import { AnimatePresence, motion } from "framer-motion";
import { uploadImageToImgBB } from "@/lib/upload";
import {
  Trophy,
  Plus,
  Search,
  Image as ImageIcon,
  Edit2,
  Trash2,
  Loader2,
  X,
} from "lucide-react";

export interface Achievement {
  id: string;
  image: string;
  title: string;
  name: string;
  issuer: string;
  description: string;
}

const EMPTY_FORM = {
  image: "",
  title: "",
  name: "",
  issuer: "",
  description: "",
};

export default function AchievementManager() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Achievement, "id">>(EMPTY_FORM);
  const [search, setSearch] = useState("");

  // Upload States
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { data: achievements, isLoading } = useQuery<Achievement[]>({
    queryKey: ["achievements"],
    queryFn: async () => (await axios.get("/api/achievements")).data,
  });

  const addMutation = useMutation({
    mutationFn: (data: Omit<Achievement, "id">) =>
      axios.post("/api/achievements", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["achievements"] });
      showToast("Achievement added successfully!");
      closeModal();
    },
    onError: () => showToast("Failed to add achievement"),
  });

  const updateMutation = useMutation({
    mutationFn: (data: Achievement) =>
      axios.put(`/api/achievements/${data.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["achievements"] });
      showToast("Achievement updated successfully!");
      closeModal();
    },
    onError: () => showToast("Failed to update achievement"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => axios.delete(`/api/achievements/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["achievements"] });
      showToast("Achievement deleted successfully!");
    },
    onError: () => showToast("Failed to delete achievement"),
  });

  const openAdd = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setImagePreview(null);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const openEdit = (item: Achievement) => {
    setEditingId(item.id);
    setForm({
      image: item.image,
      title: item.title,
      name: item.name,
      issuer: item.issuer,
      description: item.description,
    });
    setImagePreview(item.image || null);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
    setImagePreview(null);
    setImageFile(null);
  };

  const isSaving = isUploading || addMutation.isPending || updateMutation.isPending;

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
    setForm((prev) => ({ ...prev, image: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      let finalImageUrl = form.image;
      if (imageFile) {
        finalImageUrl = await uploadImageToImgBB(imageFile);
      }

      if (!finalImageUrl) {
        showToast("Please upload an image or provide a valid Image URL");
        setIsUploading(false);
        return;
      }

      const payload = { ...form, image: finalImageUrl };

      if (editingId) {
        updateMutation.mutate({ ...payload, id: editingId });
      } else {
        addMutation.mutate(payload);
      }
    } catch (err) {
      showToast("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const filteredItems = useMemo(() => {
    if (!achievements) return [];
    return achievements.filter(
      (item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
    );
  }, [achievements, search]);

  return (
    <div className="w-full space-y-6">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 sm:p-8 bg-white/[0.02] border border-white/[0.06] rounded-[2rem]">
        <div>
          <h1 className="text-xl sm:text-2xl font-black">Achievements</h1>
          <p className="text-xs sm:text-sm text-white/40 mt-1">
            Manage certificate assets, accolades, and key career achievements.
          </p>
        </div>

        <button
          onClick={openAdd}
          className="flex items-center justify-center gap-2 px-5 py-3.5 bg-white text-black hover:scale-[1.02] active:scale-[0.98] transition-all rounded-2xl font-black text-xs sm:text-sm uppercase tracking-widest self-start sm:self-auto shadow-lg shadow-white/10 shrink-0"
        >
          <Plus size={16} strokeWidth={2.5} />
          Add New
        </button>
      </div>

      {/* Filter and Search */}
      <div className="relative">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-white/35">
          <Search size={16} />
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, name, or description..."
          className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.05] border border-white/[0.06] hover:border-white/[0.12] focus:border-white/20 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-semibold transition-all focus:outline-none placeholder:text-white/20"
        />
      </div>

      {/* Achievements Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-8 h-8 animate-spin text-white/20" />
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-white/20 border border-dashed border-white/[0.08] rounded-[2rem]">
          <Trophy className="w-12 h-12" />
          <p className="text-sm font-bold uppercase tracking-widest">
            {search ? "No matches found" : "No achievements added yet"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ delay: i * 0.04 }}
                className="group relative flex flex-col justify-between bg-white/[0.025] hover:bg-white/[0.04] border border-white/[0.06] hover:border-white/10 rounded-[2rem] overflow-hidden transition-all duration-300"
              >
                {/* Image Section */}
                <div className="relative aspect-video w-full bg-white/5 overflow-hidden flex items-center justify-center border-b border-white/[0.06]">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-white/20" />
                  )}
                  <div className="absolute top-4 left-4 w-8 h-8 rounded-lg bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/10">
                    <Trophy className="w-4.5 h-4.5 text-amber-400" />
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-1 flex flex-col justify-between text-left">
                  <div className="space-y-2 mb-6">
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/30 font-mono">
                      {item.title} • {item.issuer}
                    </p>
                    <h3 className="text-base font-bold text-white group-hover:text-white transition-colors truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs text-white/50 leading-relaxed font-medium line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3.5 pt-4 border-t border-white/[0.06]">
                    <button
                      onClick={() => openEdit(item)}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 rounded-xl font-bold text-xs uppercase tracking-wider transition-all"
                      type="button"
                    >
                      <Edit2 size={12} />
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (!confirm("Are you sure you want to delete this achievement?")) return;
                        deleteMutation.mutate(item.id);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-500/5 hover:bg-red-500/15 border border-red-500/10 hover:border-red-500/20 text-red-400 rounded-xl font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50"
                      disabled={deleteMutation.isPending}
                      type="button"
                    >
                      {deleteMutation.isPending ? (
                        <Loader2 size={12} className="animate-spin" />
                      ) : (
                        <Trash2 size={12} />
                      )}
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Editor Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="relative w-full max-w-2xl bg-[#0c0c0c] border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200"
            >
              <div className="flex items-center justify-between px-7 pt-7 pb-6 border-b border-white/5">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/25 mb-1">
                    {editingId ? "Editing Record" : "New Record"}
                  </p>
                  <h2 className="text-xl font-black">
                    {editingId ? "Edit" : "Add"} Achievement
                  </h2>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-white/5 rounded-xl transition-colors text-white/30 hover:text-white"
                  type="button"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-7 space-y-5">
                {/* Image Picker */}
                <div className="space-y-1.5 text-left">
                  <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-white/30 px-0.5">
                    Certificate Image
                  </label>
                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    {/* Preview box */}
                    <div className="relative w-full sm:w-40 aspect-video rounded-xl border border-white/10 bg-white/5 overflow-hidden flex items-center justify-center shrink-0">
                      {imagePreview ? (
                        <>
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={clearImage}
                            className="absolute top-2 right-2 p-1 bg-black/60 hover:bg-black/80 rounded-md border border-white/10 text-white/70 hover:text-white transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </>
                      ) : (
                        <ImageIcon className="w-6 h-6 text-white/25" />
                      )}
                    </div>
                    {/* Inputs */}
                    <div className="flex-1 w-full space-y-2">
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                          id="achievement-image-file"
                        />
                        <label
                          htmlFor="achievement-image-file"
                          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer hover:text-white transition-all text-center"
                        >
                          Upload Image
                        </label>
                      </div>
                      <div className="relative flex items-center justify-center">
                        <span className="text-[9px] font-bold text-white/25 uppercase tracking-widest bg-[#0C0C0C] px-2 relative z-10">
                          Or enter URL
                        </span>
                        <div className="absolute inset-x-0 h-px bg-white/5" />
                      </div>
                      <input
                        type="url"
                        value={form.image}
                        onChange={(e) => {
                          setForm((prev) => ({ ...prev, image: e.target.value }));
                          setImagePreview(e.target.value);
                        }}
                        placeholder="https://example.com/image.jpg"
                        className="w-full bg-white/[0.04] hover:bg-white/[0.06] border border-white/8 hover:border-white/12 focus:border-white/20 rounded-xl px-4 py-2.5 text-xs font-medium focus:outline-none transition-all placeholder:text-white/15"
                      />
                    </div>
                  </div>
                </div>

                {/* Grid Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Category/Title */}
                  <div className="space-y-1.5 text-left">
                    <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-white/30 px-0.5">
                      Title (Category)
                    </label>
                    <input
                      required
                      type="text"
                      value={form.title}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, title: e.target.value }))
                      }
                      className="w-full bg-white/[0.04] hover:bg-white/[0.06] border border-white/8 hover:border-white/12 focus:border-white/20 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none transition-all placeholder:text-white/15"
                      placeholder="e.g. Certification"
                    />
                  </div>

                  {/* Name */}
                  <div className="space-y-1.5 text-left">
                    <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-white/30 px-0.5">
                      Name
                    </label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, name: e.target.value }))
                      }
                      className="w-full bg-white/[0.04] hover:bg-white/[0.06] border border-white/8 hover:border-white/12 focus:border-white/20 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none transition-all placeholder:text-white/15"
                      placeholder="e.g. Professional Cloud Architect"
                    />
                  </div>

                  {/* Issuer */}
                  <div className="space-y-1.5 text-left">
                    <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-white/30 px-0.5">
                      Issuer / Institution
                    </label>
                    <input
                      required
                      type="text"
                      value={form.issuer}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, issuer: e.target.value }))
                      }
                      className="w-full bg-white/[0.04] hover:bg-white/[0.06] border border-white/8 hover:border-white/12 focus:border-white/20 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none transition-all placeholder:text-white/15"
                      placeholder="e.g. Google Cloud"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1.5 text-left">
                  <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-white/30 px-0.5">
                    Description (Credential Details)
                  </label>
                  <textarea
                    required
                    value={form.description}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, description: e.target.value }))
                    }
                    rows={4}
                    className="w-full bg-white/[0.04] hover:bg-white/[0.06] border border-white/8 hover:border-white/12 focus:border-white/20 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none transition-all placeholder:text-white/15 resize-none"
                    placeholder="Provide details about the accomplishments, scores, or achievements..."
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
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
}
