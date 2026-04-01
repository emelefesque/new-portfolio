"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import { urlFor } from "@/lib/sanity";
import type { SanityImage } from "@/lib/types";

interface FeaturedProject {
  _id: string;
  title: string;
  subtitle?: string;
  slug: { current: string };
  company?: string;
  role?: string;
  year?: string;
  heroImage?: SanityImage;
  overview?: string;
  goal?: string;
  challenges?: string[];
  solution?: string;
  impact?: string[];
  category?: string;
}

interface FeaturedWorkProps {
  projects: FeaturedProject[];
}

const categoryLabels: Record<string, string> = {
  ai: "AI",
  productContent: "Product content",
  systemsDesign: "Systems design",
  peopleLeadership: "People & culture leadership",
};

function GlanceTile({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border border-[rgba(242,227,213,0.12)] bg-[rgba(14,24,38,0.6)] p-4">
      <p className="text-[0.6rem] tracking-[0.12em] uppercase text-[#C0707A] mb-2">{label}</p>
      {children}
    </div>
  );
}

export default function FeaturedWork({ projects }: FeaturedWorkProps) {
  if (!projects || projects.length === 0) return null;

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>Featured work</SectionLabel>
        <motion.h2
          className="font-serif text-[clamp(1.8rem,4vw,3rem)] font-bold text-[#F2E3D5] mb-4 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          A sampling of work I&apos;m proud of
        </motion.h2>
        <div className="h-px bg-[rgba(242,227,213,0.12)] mb-12" />

        <div className="flex flex-col gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link
                href={`/work/${project.slug.current}`}
                aria-label={`View ${project.title} case study`}
                className="group grid grid-cols-1 md:grid-cols-2 border border-[rgba(242,227,213,0.08)] hover:border-[#A65158] bg-[#0E1826] transition-colors duration-300 overflow-hidden"
              >
                {/* Left: text + at a glance */}
                <div className="p-8 md:p-10 flex flex-col gap-6">
                  <div>
                    {project.category && (
                      <span className="text-[0.65rem] tracking-[0.12em] uppercase text-[#C0707A] mb-3 block">
                        {categoryLabels[project.category] || project.category}
                      </span>
                    )}
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#F2E3D5] group-hover:text-[#A65158] transition-colors leading-snug mb-2">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-[0.7rem] text-[rgba(242,227,213,0.35)] uppercase tracking-wide">
                      {project.company && <span>{project.company}</span>}
                      {project.role && <span>· {project.role}</span>}
                      {project.year && <span>· {project.year}</span>}
                    </div>
                  </div>

                  {/* At a glance grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.goal && (
                      <GlanceTile label="Goal">
                        <p className="text-xs text-[rgba(242,227,213,0.7)] leading-relaxed">{project.goal}</p>
                      </GlanceTile>
                    )}
                    {project.challenges && project.challenges.length > 0 && (
                      <GlanceTile label="Challenges">
                        <ul className="space-y-1">
                          {project.challenges.slice(0, 3).map((c, j) => (
                            <li key={j} className="flex items-start gap-1.5 text-xs text-[rgba(242,227,213,0.7)] leading-relaxed">
                              <span className="text-[#A65158] shrink-0 mt-0.5">·</span>
                              {c}
                            </li>
                          ))}
                        </ul>
                      </GlanceTile>
                    )}
                    {project.solution && (
                      <GlanceTile label="Solution">
                        <p className="text-xs text-[rgba(242,227,213,0.7)] leading-relaxed">{project.solution}</p>
                      </GlanceTile>
                    )}
                    {project.impact && project.impact.length > 0 && (
                      <GlanceTile label="Impact">
                        <ul className="space-y-1">
                          {project.impact.slice(0, 3).map((item, j) => (
                            <li key={j} className="flex items-start gap-1.5 text-xs text-[rgba(242,227,213,0.7)] leading-relaxed">
                              <span className="text-[#A65158] shrink-0 mt-0.5">·</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </GlanceTile>
                    )}
                  </div>

                  <span className="text-xs tracking-[0.12em] uppercase text-[#C0707A] group-hover:underline mt-auto">
                    View case study →
                  </span>
                </div>

                {/* Right: image — fixed height, centered, independent of left content */}
                <div className="flex items-center justify-center bg-[#0a1120] p-6">
                  <div className="relative w-full h-72">
                    {project.heroImage?.asset ? (
                      <Image
                        src={urlFor(project.heroImage).width(900).url()}
                        alt={project.heroImage.alt || project.title}
                        fill
                        className="object-contain"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[rgba(242,227,213,0.08)] text-sm tracking-widest uppercase">
                          {project.title}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
