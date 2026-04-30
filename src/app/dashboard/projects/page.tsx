"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Tech {
  id: number;
  name: string;
}

interface Project {
  id: number;
  title: string;
  tagline: string;
  description: string;
  image: string;
  category: string;
  year: string;
  featured: boolean;
  client: string | null;
  demoLink: string;
  githubLink: string | null;
  techStack: Tech[];
}

const initialFormState = {
  title: "",
  tagline: "",
  description: "",
  image: "",
  category: "",
  year: "",
  featured: false,
  client: "",
  demoLink: "",
  githubLink: "",
  techStack: "",
};

export default function ProjectsManager() {
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState(initialFormState);

  // GET: Fetch Projects
  const { data: projects = [], isLoading: loading } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error("Failed to fetch projects");
      return res.json();
    }
  });

  // POST: Create Project
  const createMutation = useMutation({
    mutationFn: async (payload: any) => {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to create project");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setIsAdding(false);
      setFormData(initialFormState);
    }
  });

  // PUT: Update Project
  const updateMutation = useMutation({
    mutationFn: async ({ id, payload }: { id: number, payload: any }) => {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to update project");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setIsAdding(false);
      setEditingId(null);
      setFormData(initialFormState);
    }
  });

  // DELETE: Remove Project
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete project");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    }
  });

  const handleOpenEdit = (project: Project) => {
    setFormData({
      title: project.title,
      tagline: project.tagline,
      description: project.description,
      image: project.image,
      category: project.category,
      year: project.year,
      featured: project.featured,
      client: project.client || "",
      demoLink: project.demoLink,
      githubLink: project.githubLink || "",
      techStack: project.techStack.map(t => t.name).join(", "),
    });
    setEditingId(project.id);
    setIsAdding(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const techStackArray = formData.techStack
      .split(",")
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const payload = {
      ...formData,
      techStack: techStackArray,
    };

    if (editingId) {
      updateMutation.mutate({ id: editingId, payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const handleDelete = (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    deleteMutation.mutate(id);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">Projects</h1>
          <p className="text-foreground/50 font-medium">Manage your portfolio showcase.</p>
        </div>
        <button
          onClick={() => {
            setFormData(initialFormState);
            setEditingId(null);
            setIsAdding(true);
          }}
          className="px-6 py-3 bg-white text-black rounded-2xl font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform"
        >
          Add New Project
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative bg-white/[0.03] border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 transition-colors flex flex-col"
              >
                <div className="aspect-video bg-white/5 overflow-hidden relative">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                  {project.featured && (
                    <div className="absolute top-3 right-3 bg-yellow-500 text-black text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-xs font-bold uppercase tracking-widest text-foreground/40">{project.category} &middot; {project.year}</div>
                  </div>
                  <h3 className="font-bold text-xl mb-1">{project.title}</h3>
                  <p className="text-sm text-foreground/60 mb-4 line-clamp-2">{project.tagline}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map(tech => (
                      <span key={tech.id} className="text-[10px] px-2 py-1 rounded-md bg-white/10 text-white/80">{tech.name}</span>
                    ))}
                  </div>
                  
                  <div className="mt-auto flex gap-2">
                    <button 
                      onClick={() => handleOpenEdit(project)}
                      className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(project.id)}
                      disabled={deleteMutation.isPending}
                      className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors disabled:opacity-50"
                    >
                      {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Add/Edit Modal Overlay */}
      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAdding(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-8 shadow-2xl"
            >
              <h2 className="text-2xl font-black mb-6">{editingId ? 'Edit Project' : 'Add Project'}</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Title *</label>
                    <input
                      required type="text" value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/20 transition-colors font-medium text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Category *</label>
                    <input
                      required type="text" value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/20 transition-colors font-medium text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Tagline *</label>
                  <input
                    required type="text" value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/20 transition-colors font-medium text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Description *</label>
                  <textarea
                    required value={formData.description} rows={3}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/20 transition-colors font-medium text-sm resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Image URL *</label>
                    <input
                      required type="text" value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/20 transition-colors font-medium text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Year *</label>
                    <input
                      required type="text" value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/20 transition-colors font-medium text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Demo Link *</label>
                    <input
                      required type="text" value={formData.demoLink}
                      onChange={(e) => setFormData({ ...formData, demoLink: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/20 transition-colors font-medium text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">GitHub Link (Optional)</label>
                    <input
                      type="text" value={formData.githubLink}
                      onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/20 transition-colors font-medium text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Tech Stack (comma separated)</label>
                    <input
                      type="text" value={formData.techStack} placeholder="React, Node.js, Tailwind"
                      onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/20 transition-colors font-medium text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Client (Optional)</label>
                    <input
                      type="text" value={formData.client}
                      onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/20 transition-colors font-medium text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 py-2 px-1">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 rounded bg-white/5 border-white/10"
                  />
                  <label htmlFor="featured" className="text-sm font-bold uppercase tracking-widest text-foreground/80">
                    Mark as Featured Project
                  </label>
                </div>

                <div className="flex gap-4 pt-4 mt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="flex-1 py-4 bg-white/5 hover:bg-white/10 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={createMutation.isPending || updateMutation.isPending}
                    className="flex-1 py-4 bg-white text-black rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                    {createMutation.isPending || updateMutation.isPending ? 'Saving...' : (editingId ? 'Save Changes' : 'Create Project')}
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
