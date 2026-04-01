"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";
import { urlFor } from "@/lib/sanity";

interface CategoryHeroProjectProps {
  project: Project;
}

export default function CategoryHeroProject({ project }: CategoryHeroProjectProps) {
  return (
    <motion.div
      className="border border-[rgba(242,227,213,0.12)] bg-[#0E1826]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero image */}
      {project.heroImage?.asset && (
        <div className="relative aspect-[16/7] overflow-hidden">
          <Image
            src={urlFor(project.heroImage).width(1200).height(525).url()}
            alt={project.heroImage.alt || project.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E1826] via-transparent to-transparent" />
        </div>
      )}

      <div className="p-8 md:p-10">
        {/* Meta */}
        <div className="flex flex-wrap gap-4 mb-4 text-[0.65rem] tracking-[0.12em] uppercase text-[rgba(242,227,213,0.4)]">
          {project.company && <span>{project.company}</span>}
          {project.role && <span>{project.role}</span>}
          {project.year && <span>{project.year}</span>}
        </div>

        <h3 className="font-serif text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-[#F2E3D5] leading-tight mb-2">
          {project.title}
        </h3>
        {project.subtitle && (
          <p className="text-[rgba(242,227,213,0.6)] text-lg mb-6">{project.subtitle}</p>
        )}

        {/* Overview */}
        {project.overview && (
          <p className="text-sm text-[rgba(242,227,213,0.75)] leading-relaxed mb-8 max-w-2xl">
            {project.overview}
          </p>
        )}

        {/* Key outcomes */}
        {project.impact && project.impact.length > 0 && (
          <div className="mb-8">
            <p className="text-[0.65rem] tracking-[0.12em] uppercase text-[#C0707A] mb-3">Key outcomes</p>
            <ul className="space-y-2">
              {project.impact.slice(0, 3).map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[rgba(242,227,213,0.7)]">
                  <span className="text-[#C0707A] shrink-0 mt-px" aria-hidden="true">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <Link
          href={`/work/${project.slug.current}`}
          className="inline-block text-sm font-semibold tracking-wide text-[#F2E3D5] border border-[#A65158] px-6 py-3 hover:bg-[#A65158] transition-colors duration-200"
        >
          See full project <span aria-hidden="true">→</span>
        </Link>
      </div>
    </motion.div>
  );
}
