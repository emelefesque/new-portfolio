"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PortableText } from "next-sanity";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import Divider from "@/components/ui/Divider";
import ImageLightbox from "@/components/ui/ImageLightbox";
import type { Project } from "@/lib/types";
import { urlFor } from "@/lib/sanity";
import SolutionColumns from "@/components/work/SolutionColumns";

interface ImpactStatsProps {
  project: Project;
}

export default function ImpactStats({ project }: ImpactStatsProps) {
  const hasWhatShipped =
    project.whatShipped?.description?.length || project.whatShipped?.image?.asset;
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState("");

  return (
    <section className="max-w-3xl mx-auto px-6">
      {/* What shipped — description only (image moves below impact) */}
      {hasWhatShipped && (
        <>
          <SectionLabel>What shipped</SectionLabel>
          <div className="mt-4 mb-12">
            {project.whatShipped?.description && project.whatShipped.description.length > 0 && (
              <PortableText
                value={project.whatShipped.description}
                components={{
                  block: {
                    normal: ({ children }: { children?: React.ReactNode }) => (
                      <p className="text-[rgba(242,227,213,0.8)] text-lg leading-relaxed mb-3 last:mb-0">{children}</p>
                    ),
                  },
                  list: {
                    bullet: ({ children }: { children?: React.ReactNode }) => (
                      <ul className="space-y-2 mb-3 ml-2">{children}</ul>
                    ),
                  },
                  listItem: {
                    bullet: ({ children }: { children?: React.ReactNode }) => (
                      <li className="flex items-start gap-2 text-[rgba(242,227,213,0.8)] text-lg leading-relaxed">
                        <span className="text-[#A65158] mt-0.5 shrink-0">·</span>
                        {children}
                      </li>
                    ),
                  },
                  marks: {
                    strong: ({ children }: { children?: React.ReactNode }) => (
                      <strong className="font-semibold text-[#F2E3D5]">{children}</strong>
                    ),
                  },
                } as Parameters<typeof PortableText>[0]["components"]}
              />
            )}
          </div>
          <Divider />
        </>
      )}

      {/* Solution components — below What shipped */}
      {project.solutionComponents && project.solutionComponents.length > 0 && (
        <SolutionColumns items={project.solutionComponents} />
      )}

      {/* What shipped image */}
      {project.whatShipped?.image?.asset && (
        <div className="mb-12">
          <div
            className="border border-[rgba(242,227,213,0.1)] bg-[#0E1826] cursor-zoom-in"
            onClick={() => {
              setLightboxSrc(urlFor(project.whatShipped!.image!).width(1400).url());
              setLightboxAlt(project.whatShipped!.image!.alt || "What shipped");
            }}
          >
            <Image
              src={urlFor(project.whatShipped.image).width(1200).url()}
              alt={project.whatShipped.image.alt || "What shipped"}
              width={1200}
              height={900}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      )}

      {lightboxSrc && (
        <ImageLightbox
          src={lightboxSrc}
          alt={lightboxAlt}
          onClose={() => setLightboxSrc(null)}
        />
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
