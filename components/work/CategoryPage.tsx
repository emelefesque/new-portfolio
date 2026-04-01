"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import CategoryHeroProject from "@/components/work/CategoryHeroProject";
import Divider from "@/components/ui/Divider";
import type { Project, WorkCategory } from "@/lib/types";
import { urlFor } from "@/lib/sanity";

interface CategoryPageProps {
  category: WorkCategory;
  otherProjects: Project[];
}

export default function CategoryPage({ category, otherProjects }: CategoryPageProps) {
  return (
    <article className="pt-24 pb-24">
      <div className="max-w-3xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/#work"
            className="text-xs tracking-[0.12em] uppercase text-[rgba(242,227,213,0.4)] hover:text-[#A65158] transition-colors mb-8 inline-block"
          >
            <span aria-hidden="true">← </span>My work
          </Link>
          <SectionLabel>{category.title}</SectionLabel>
          {category.description && (
            <p className="text-[rgba(242,227,213,0.7)] text-lg leading-relaxed mt-4 max-w-2xl">
              {category.description}
            </p>
          )}
        </motion.div>
      </div>

      {/* Hero project */}
      {category.heroProject && (
        <div className="max-w-3xl mx-auto px-6 mb-16">
          <p className="text-[0.65rem] tracking-[0.12em] uppercase text-[rgba(242,227,213,0.4)] mb-4">Featured project</p>
          <CategoryHeroProject project={category.heroProject} />
        </div>
      )}

      {/* Other projects */}
      {otherProjects.length > 0 && (
        <div className="max-w-3xl mx-auto px-6">
          <Divider />
          <p className="text-[0.65rem] tracking-[0.12em] uppercase text-[rgba(242,227,213,0.4)] mb-6">More projects</p>
          <div className="space-y-4">
            {otherProjects.map((project, i) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link
                  href={`/work/${project.slug.current}`}
                  className="group flex gap-6 items-start border border-[rgba(242,227,213,0.08)] hover:border-[#A65158] bg-[#0E1826] p-6 transition-colors duration-300"
                >
                  {project.heroImage?.asset && (
                    <div className="relative w-24 aspect-[4/3] shrink-0 overflow-hidden">
                      <Image
                        src={urlFor(project.heroImage).width(200).height(150).url()}
                        alt={project.heroImage.alt || project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="text-[0.65rem] tracking-[0.1em] uppercase text-[rgba(242,227,213,0.35)] mb-1">
                      {project.company}
                    </p>
                    <h3 className="font-serif text-lg font-bold text-[#F2E3D5] group-hover:text-[#A65158] transition-colors leading-snug mb-1">
                      {project.title}
                    </h3>
                    {project.subtitle && (
                      <p className="text-sm text-[rgba(242,227,213,0.55)]">{project.subtitle}</p>
                    )}
                  </div>
                  <span className="ml-auto text-[#C0707A] self-center shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">→</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
