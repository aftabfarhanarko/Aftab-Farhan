"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProjectsManager = () => {
  const [projects, setProjects] = useState([
    { id: 1, title: "E-Commerce Platform", category: "Full-Stack", image: "/api/placeholder/400/250" },
    { id: 2, title: "Healthcare System", category: "Web App", image: "/api/placeholder/400/250" },
    { id: 3, title: "Real Estate Portal", category: "Frontend", image: "/api/placeholder/400/250" },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newProject, setNewProject] = useState({ title: "", category: "", image: "/api/placeholder/400/250" });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setProjects((prev) => [...prev, { ...newProject, id: Date.now() }]);
    setIsAdding(false);
    setNewProject({ title: "", category: "", image: "/api/placeholder/400/250" });
  };

  const handleDelete = (id: number) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">Projects</h1>
          <p className="text-foreground/50 font-medium">Manage your portfolio showcase.</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="px-6 py-3 bg-white text-black rounded-2xl font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform"
        >
          Add New Project
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="group relative bg-white/[0.03] border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 transition-colors"
            >
              <div className="aspect-video bg-white/5 overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity" />
              </div>
              <div className="p-6">
                <div className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-1">{project.category}</div>
                <h3 className="font-bold text-lg mb-4">{project.title}</h3>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors">Edit</button>
                  <button 
                    onClick={() => handleDelete(project.id)}
                    className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add Modal Overlay */}
      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
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
              className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-10 shadow-2xl"
            >
              <h2 className="text-2xl font-black mb-8">Add Project</h2>
              <form onSubmit={handleAdd} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Project Title</label>
                  <input
                    required
                    type="text"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-white/20 transition-colors font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Category</label>
                  <input
                    required
                    type="text"
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-white/20 transition-colors font-medium"
                  />
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
                    className="flex-1 py-4 bg-white text-black rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Add Project
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

export default ProjectsManager;
