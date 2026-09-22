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
  startDate: string;
  endDate: string;
  description: string;
}

const EMPTY_FORM = {
  image: "",
  title: "",
  name: "",
  issuer: "",
  startDate: "",
  endDate: "",
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
      startDate: item.startDate || "",
      endDate: item.endDate || "",
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
        item.description.toLowerCase().includes(search.toLowerCase()),
    );
  }, [achievements, search]);

  return (
    <div className="w-full space-y-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 space-y-6">
        {/* ===== Header Panel ===== */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 sm:p-8 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-black font-['Bai_Jamjuree']">
              Achievements
            </h1>
            <p className="text-xs sm:text-sm text-black/50 mt-1 font-medium">
              Manage certificate assets, accolades, and key career achievements.
            </p>
          </div>

          <button
            onClick={openAdd}
            className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[#FF6014] text-white hover:bg-[#e5540f] active:scale-[0.98] transition-all rounded-xl font-black text-xs uppercase tracking-widest self-start sm:self-auto shadow-sm hover:shadow-md shrink-0 font-['Bai_Jamjuree']"
          >
            <Plus size={16} strokeWidth={2.5} />
            Add New
          </button>
        </div>

        {/* ===== Search Bar ===== */}
        <div className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-black/30">
            <Search size={16} />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, name, or description..."
            className="w-full bg-white border border-gray-200 hover:border-gray-300 focus:border-[#FF6014] focus:ring-2 focus:ring-[#FF6014]/10 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-medium text-black transition-all focus:outline-none placeholder:text-black/30"
          />
        </div>

        {/* ===== Grid ===== */}
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-[#FF6014]" />
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 border border-dashed border-gray-300 rounded-2xl bg-white">
            <div className="w-14 h-14 rounded-xl bg-[#FF6014]/10 border border-[#FF6014]/20 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-[#FF6014]" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-black/40 font-['Bai_Jamjuree']">
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
                  className="group relative flex flex-col justify-between bg-white border border-gray-200 hover:border-[#FF6014] rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-lg"
                >
                  {/* Image Section */}
                  <div className="relative aspect-video w-full bg-gray-50 overflow-hidden flex items-center justify-center border-b border-gray-100">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-black/20" />
                    )}
                    <div className="absolute top-4 left-4 w-8 h-8 rounded-lg bg-white/90 backdrop-blur-md flex items-center justify-center border border-gray-200 shadow-sm">
                      <Trophy className="w-4 h-4 text-[#FF6014]" />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex-1 flex flex-col justify-between text-left">
                    <div className="space-y-2 mb-6">
                      <p className="text-[9px] font-black uppercase tracking-widest text-black/40 font-mono">
                        {item.title} • {item.issuer}
                      </p>
                      {item.startDate && (
                        <p className="text-[9px] text-black/50 font-mono mt-0.5">
                          {item.startDate} {item.endDate ? `– ${item.endDate}` : ""}
                        </p>
                      )}
                      <h3 className="text-base font-black text-black truncate font-['Bai_Jamjuree']">
                        {item.name}
                      </h3>
                      <p className="text-xs text-black/60 leading-relaxed font-medium line-clamp-3">
                        {item.description}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3.5 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => openEdit(item)}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-[#FF6014] rounded-xl font-black text-[10px] uppercase tracking-wider text-black transition-all font-['Bai_Jamjuree']"
                        type="button"
                      >
                        <Edit2 size={12} />
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (
                            !confirm(
                              "Are you sure you want to delete this achievement?",
                            )
                          )
                            return;
                          deleteMutation.mutate(item.id);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-50 hover:bg-red-100 border border-red-200 hover:border-red-300 text-red-600 rounded-xl font-black text-[10px] uppercase tracking-wider transition-all disabled:opacity-50 font-['Bai_Jamjuree']"
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
      </div>

      {/* ===== Editor Modal ===== */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="relative w-full max-w-2xl bg-white border border-gray-200 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-7 pt-7 pb-6 border-b border-gray-100">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-black/40 mb-1 font-['Bai_Jamjuree']">
                    {editingId ? "Editing Record" : "New Record"}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FF6014] animate-pulse" />
                    <h2 className="text-xl font-black text-black font-['Bai_Jamjuree']">
                      {editingId ? "Edit" : "Add"} Achievement
                    </h2>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-black/5 rounded-xl transition-colors text-black/40 hover:text-black"
                  type="button"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Form */}
              <form
                onSubmit={handleSubmit}
                className="p-7 space-y-5 overflow-y-auto"
              >
                {/* Image Picker */}
                <div className="space-y-1.5 text-left">
                  <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-black/50 px-0.5 font-['Bai_Jamjuree']">
                    Certificate Image
                  </label>
                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <div className="relative w-full sm:w-40 aspect-video rounded-xl border border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center shrink-0">
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
                            className="absolute top-2 right-2 p-1 bg-white/90 hover:bg-white rounded-md border border-gray-200 text-black/60 hover:text-red-600 transition-colors shadow-sm"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </>
                      ) : (
                        <ImageIcon className="w-6 h-6 text-black/20" />
                      )}
                    </div>
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
                          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-[#FF6014]/5 border border-gray-200 hover:border-[#FF6014] rounded-xl text-[10px] font-black uppercase tracking-wider cursor-pointer text-black hover:text-[#FF6014] transition-all text-center font-['Bai_Jamjuree']"
                        >
                          Upload Image
                        </label>
                      </div>
                      <div className="relative flex items-center justify-center">
                        <span className="text-[9px] font-black text-black/40 uppercase tracking-widest bg-white px-2 relative z-10 font-['Bai_Jamjuree']">
                          Or enter URL
                        </span>
                        <div className="absolute inset-x-0 h-px bg-gray-200" />
                      </div>
                      <input
                        type="url"
                        value={form.image}
                        onChange={(e) => {
                          setForm((prev) => ({
                            ...prev,
                            image: e.target.value,
                          }));
                          setImagePreview(e.target.value);
                        }}
                        placeholder="https://example.com/image.jpg"
                        className="w-full bg-white border border-gray-200 hover:border-gray-300 focus:border-[#FF6014] focus:ring-2 focus:ring-[#FF6014]/10 rounded-xl px-4 py-2.5 text-xs font-medium text-black focus:outline-none transition-all placeholder:text-black/30"
                      />
                    </div>
                  </div>
                </div>

                {/* Grid Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5 text-left">
                    <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-black/50 px-0.5 font-['Bai_Jamjuree']">
                      Title (Category)
                    </label>
                    <input
                      required
                      type="text"
                      value={form.title}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, title: e.target.value }))
                      }
                      className="w-full bg-white border border-gray-200 hover:border-gray-300 focus:border-[#FF6014] focus:ring-2 focus:ring-[#FF6014]/10 rounded-xl px-4 py-3 text-sm font-medium text-black focus:outline-none transition-all placeholder:text-black/30"
                      placeholder="e.g. Certification"
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-black/50 px-0.5 font-['Bai_Jamjuree']">
                      Name
                    </label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, name: e.target.value }))
                      }
                      className="w-full bg-white border border-gray-200 hover:border-gray-300 focus:border-[#FF6014] focus:ring-2 focus:ring-[#FF6014]/10 rounded-xl px-4 py-3 text-sm font-medium text-black focus:outline-none transition-all placeholder:text-black/30"
                      placeholder="e.g. Professional Cloud Architect"
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-black/50 px-0.5 font-['Bai_Jamjuree']">
                      Issuer / Institution
                    </label>
                    <input
                      required
                      type="text"
                      value={form.issuer}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, issuer: e.target.value }))
                      }
                      className="w-full bg-white border border-gray-200 hover:border-gray-300 focus:border-[#FF6014] focus:ring-2 focus:ring-[#FF6014]/10 rounded-xl px-4 py-3 text-sm font-medium text-black focus:outline-none transition-all placeholder:text-black/30"
                      placeholder="e.g. Google Cloud"
                    />
                  </div>
                </div>

                {/* Date Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left">
                    <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-black/50 px-0.5 font-['Bai_Jamjuree']">
                      Start Date
                    </label>
                    <input
                      type="text"
                      value={form.startDate}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          startDate: e.target.value,
                        }))
                      }
                      className="w-full bg-white border border-gray-200 hover:border-gray-300 focus:border-[#FF6014] focus:ring-2 focus:ring-[#FF6014]/10 rounded-xl px-4 py-3 text-sm font-medium text-black focus:outline-none transition-all placeholder:text-black/30"
                      placeholder="e.g. April 2026"
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-black/50 px-0.5 font-['Bai_Jamjuree']">
                      End Date
                    </label>
                    <input
                      type="text"
                      value={form.endDate}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          endDate: e.target.value,
                        }))
                      }
                      className="w-full bg-white border border-gray-200 hover:border-gray-300 focus:border-[#FF6014] focus:ring-2 focus:ring-[#FF6014]/10 rounded-xl px-4 py-3 text-sm font-medium text-black focus:outline-none transition-all placeholder:text-black/30"
                      placeholder="e.g. June 2026 (or Ongoing)"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1.5 text-left">
                  <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-black/50 px-0.5 font-['Bai_Jamjuree']">
                    Description (Credential Details)
                  </label>
                  <textarea
                    required
                    value={form.description}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    rows={4}
                    className="w-full bg-white border border-gray-200 hover:border-gray-300 focus:border-[#FF6014] focus:ring-2 focus:ring-[#FF6014]/10 rounded-xl px-4 py-3 text-sm font-medium text-black focus:outline-none transition-all placeholder:text-black/30 resize-none"
                    placeholder="Provide details about the accomplishments, scores, or achievements..."
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 py-3.5 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-xl font-black text-xs uppercase tracking-widest text-black/70 transition-all font-['Bai_Jamjuree']"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 py-3.5 bg-[#FF6014] text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#e5540f] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2 font-['Bai_Jamjuree']"
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