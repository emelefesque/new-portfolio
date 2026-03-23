"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import type { ProjectCard } from "@/lib/types";
import { urlFor } from "@/lib/sanity";

interface WorkGridProps {
  projects: ProjectCard[];
}

// Placeholder gradient backgrounds for cards without images
const placeholderColors = [
  "from-[#1a0a0c] to-[#0E1826]",
  "from-[#0E1826] to-[#0d0d14]",
  "from-[#1a0e0f] to-[#0E1826]",
  "from-[#0d0e1a] to-[#0D0D0D]",
  "from-[#1a0a0c] to-[#0d0e1a]",
  "from-[#0E1826] to-[#1a0a0c]",
  "from-[#0d0e1a] to-[#1a0a0c]",
];

export default function WorkGrid({ projects }: WorkGridProps) {
  return (
    <section id="work" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>My work</SectionLabel>
        <motion.h2
          className="font-serif text-[clamp(1.8rem,4vw,3rem)] font-bold text-[#F2E3D5] mb-4 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          A sampling of projects I&apos;m proud of
        </motion.h2>
        <div
          className="h-px bg-[rgba(242,227,213,0.12)] mb-12"
          style={{ height: "1px" }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project._id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: ProjectCard; index: number }) {
  const gradient = placeholderColors[index % placeholderColors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
    >
      <Link href={`/work/${project.slug.current}`} className="group block">
        {/* Image area */}
        <div
          className={`relative aspect-[16/9] overflow-hidden bg-gradient-to-br ${gradient} mb-4 border border-[rgba(242,227,213,0.08)] group-hover:border-[#A65158] transition-colors duration-300`}
        >
          {project.heroImage?.asset ? (
            <Image
              src={urlFor(project.heroImage).width(600).height(338).url()}
              alt={project.heroImage.alt || project.title}
              fill
              className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-end p-4">
              <span className="text-[rgba(242,227,213,0.15)] font-serif text-4xl font-bold leading-none">
                {project.title.slice(0, 2).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Text */}
        <div>
          <p className="text-[0.65rem] tracking-[0.12em] uppercase text-[#A65158] mb-1">
            {project.company}
          </p>
          <h3 className="font-serif text-lg font-bold text-[#F2E3D5] group-hover:text-[#A65158] transition-colors leading-snug mb-1">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="text-sm text-[rgba(242,227,213,0.55)] leading-snug">
              {project.subtitle}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
