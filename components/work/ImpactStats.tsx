"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import Divider from "@/components/ui/Divider";
import type { Project } from "@/lib/types";
import { urlFor } from "@/lib/sanity";

interface ImpactStatsProps {
  project: Project;
}

export default function ImpactStats({ project }: ImpactStatsProps) {
  const hasWhatShipped =
    project.whatShipped?.description || project.whatShipped?.image?.asset;

  return (
    <section className="max-w-3xl mx-auto px-6">
      {/* What shipped */}
      {hasWhatShipped && (
        <>
          <SectionLabel>What shipped</SectionLabel>
          <div className="mt-4 mb-12">
            {project.whatShipped?.image?.asset && (
              <div className="relative aspect-[16/9] overflow-hidden border border-[rgba(242,227,213,0.1)] bg-[#0E1826] mb-6">
                <Image
                  src={urlFor(project.whatShipped.image).width(800).height(450).url()}
                  alt={project.whatShipped.image.alt || "What shipped"}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            {project.whatShipped?.description && (
              <p className="text-[rgba(242,227,213,0.75)] text-sm leading-relaxed">
                {project.whatShipped.description}
              </p>
            )}
          </div>
          <Divider />
        </>
      )}

      {/* Impact */}
      {project.impact && project.impact.length > 0 && (
        <>
          <SectionLabel>Impact</SectionLabel>
          <ul className="mt-4 space-y-3 mb-12">
            {project.impact.map((item, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-3 border border-[rgba(242,227,213,0.1)] bg-[#0E1826] px-5 py-4"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
              >
                <span className="text-[#A65158] font-bold mt-px shrink-0">→</span>
                <span className="text-[rgba(242,227,213,0.85)] text-sm leading-relaxed">
                  {item}
                </span>
              </motion.li>
            ))}
          </ul>
          <Divider />
        </>
      )}

      {/* Learnings */}
      {project.learnings && project.learnings.length > 0 && (
        <>
          <SectionLabel>Learnings</SectionLabel>
          <ul className="mt-4 space-y-3 mb-16">
            {project.learnings.map((item, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-3"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
              >
                <span className="text-[#A65158] shrink-0 mt-px">·</span>
                <span className="text-[rgba(242,227,213,0.75)] text-sm leading-relaxed">
                  {item}
                </span>
              </motion.li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
