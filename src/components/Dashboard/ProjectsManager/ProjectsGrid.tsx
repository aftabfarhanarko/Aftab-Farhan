"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "./types";
import ProjectCard from "./ProjectCard";

export default function ProjectsGrid({
  projects,
  onEdit,
  onDelete,
}: {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence mode="popLayout">
        {projects.map((project) => (
          <motion.div key={project.id} layout>
            <ProjectCard
              project={project}
              onEdit={() => onEdit(project)}
              onDelete={() => onDelete(project)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

