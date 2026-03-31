"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";

const featured = [
  {
    slug: "ad-duplication",
    title: "Ads duplication",
    subtitle: "Reducing error states to increase revenue",
    category: "Product content",
    featured: true,
  },
  {
    slug: "content-risk-classification-engine",
    title: "Content risk classification",
    subtitle: "Building a content risk engine to improve safety and quality",
    category: "AI",
    featured: false,
  },
  {
    slug: "cross-system-transitions",
    title: "Cross-app transitions",
    subtitle: "A framework for navigating between apps without losing context",
    category: "Systems design",
    featured: false,
  },
];

export default function FeaturedWork() {
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
          Projects I&apos;m proud of
        </motion.h2>
        <div className="h-px bg-[rgba(242,227,213,0.12)] mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.map((project, i) => (
            <motion.div
              key={project.slug}
              className={project.featured ? "md:col-span-2" : ""}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link
                href={`/work/${project.slug}`}
                className="group block h-full border border-[rgba(242,227,213,0.08)] hover:border-[#A65158] bg-[#0E1826] p-8 transition-colors duration-300"
              >
                <span className="text-[0.65rem] tracking-[0.12em] uppercase text-[#A65158] mb-4 block">
                  {project.category}
                </span>
                <h3
                  className={`font-serif font-bold text-[#F2E3D5] group-hover:text-[#A65158] transition-colors leading-snug mb-3 ${
                    project.featured ? "text-3xl md:text-4xl" : "text-2xl"
                  }`}
                >
                  {project.title}
                </h3>
                <p className="text-sm text-[rgba(242,227,213,0.6)] leading-relaxed mb-6">
                  {project.subtitle}
                </p>
                <span className="inline-block text-xs tracking-[0.12em] uppercase text-[#A65158] group-hover:underline">
                  View case study →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
