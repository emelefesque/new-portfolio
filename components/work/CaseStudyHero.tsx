"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/types";

interface CaseStudyHeroProps {
  project: Project;
}

export default function CaseStudyHero({ project }: CaseStudyHeroProps) {
  return (
    <div className="pt-24">
      {/* Header content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Metadata bar */}
        <motion.div
          className="flex flex-wrap gap-6 mb-8 text-[0.7rem] tracking-[0.12em] uppercase text-[rgba(242,227,213,0.4)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {project.company && <span>{project.company}</span>}
          {project.role && <span>{project.role}</span>}
          {project.year && <span>{project.year}</span>}
        </motion.div>

        <motion.p className="section-label" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          Case study
        </motion.p>

        <motion.h1
          className="font-serif text-[clamp(2rem,5vw,3.5rem)] font-bold text-[#F2E3D5] leading-tight mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {project.title}
        </motion.h1>

        {project.subtitle && (
          <motion.p
            className="text-lg text-[rgba(242,227,213,0.6)] mb-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {project.subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}
