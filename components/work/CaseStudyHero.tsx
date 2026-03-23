"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/lib/types";
import { urlFor } from "@/lib/sanity";

interface CaseStudyHeroProps {
  project: Project;
}

export default function CaseStudyHero({ project }: CaseStudyHeroProps) {
  return (
    <div className="pt-24">
      {/* Full-bleed hero image */}
      <div className="relative w-full aspect-[21/9] bg-[#0E1826] overflow-hidden">
        {project.heroImage?.asset ? (
          <Image
            src={urlFor(project.heroImage).width(1400).height(600).url()}
            alt={project.heroImage.alt || project.title}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a0c] via-[#0E1826] to-[#0D0D0D] flex items-center justify-center">
            <span className="font-serif text-[8rem] font-bold text-[rgba(166,81,88,0.15)] leading-none">
              {project.title.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}
        {/* Fade bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0D0D0D] to-transparent" />
      </div>

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
