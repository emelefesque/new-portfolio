"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";

const categories = [
  {
    key: "ai",
    slug: "ai",
    title: "AI",
    description: "Improving safety, clarity, and quality of AI-generated product experiences for privacy, accessibility, and evaluation.",
    projects: ["Content risk classification engine", "AI learning curriculum"],
    hidden: false,
  },
  {
    key: "productContent",
    slug: "product-content",
    title: "Product content",
    description: "Design systems that reduce friction, prevent errors, and help people do what they came to do, at scale and across surfaces.",
    projects: ["Ads duplication", "Meta brand voice"],
    hidden: false,
  },
  {
    key: "systemsDesign",
    slug: "systems-design",
    title: "Systems design",
    description: "Creating frameworks and governance structures that give teams the confidence to move fast without breaking things.",
    projects: ["Cross-app transistions", "GDPR response"],
    hidden: false,
  },
  {
    key: "peopleLeadership",
    slug: "people-leadership",
    title: "People & culture leadership",
    description: "Building and nurturing teams to drive innovation and deliver impactful work.",
    projects: ["Comma Con", "AI learning curriculum "],
    hidden: true,
  },
];
export default function WorkCategories() {
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
          Other projects to explore
        </motion.h2>
        <div className="h-px bg-[rgba(242,227,213,0.12)] mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.filter((cat) => !cat.hidden).map((cat, i) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link
                href={`/work/${cat.slug}`}
                className="group block h-full border border-[rgba(242,227,213,0.08)] hover:border-[#A65158] bg-[#0E1826] p-8 transition-colors duration-300"
              >
                <h3 className="font-serif text-2xl font-bold text-[#F2E3D5] group-hover:text-[#A65158] transition-colors mb-4 leading-snug">
                  {cat.title}
                </h3>
                <p className="text-sm text-[rgba(242,227,213,0.6)] leading-relaxed mb-8">
                  {cat.description}
                </p>
                <ul className="space-y-1 mt-auto">
                  {cat.projects.map((p) => (
                    <li key={p} className="text-xs tracking-wide text-[rgba(242,227,213,0.35)] uppercase">
                      → {p}
                    </li>
                  ))}
                </ul>
                <span className="inline-block mt-6 text-xs tracking-[0.12em] uppercase text-[#A65158] group-hover:underline">
                  See projects →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
