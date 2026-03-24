"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";

const defaultSkills = [
  "AI model training",
  "Data governance",
  "Product content",
  "Voice & tone",
  "Design systems",
  "Content standards",
  "Change management",
  "Agile development",
  "Information architecture",
];

interface ExpertiseStripProps {
  skills?: string[];
}

export default function ExpertiseStrip({ skills }: ExpertiseStripProps) {
  const list = skills && skills.length > 0 ? skills : defaultSkills;

  return (
    <section className="py-20 px-6 border-y border-[rgba(242,227,213,0.08)]">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>Expertise</SectionLabel>
        <div className="flex flex-wrap gap-3 mt-2">
          {list.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="px-4 py-2 border border-[rgba(242,227,213,0.15)] text-sm text-[rgba(242,227,213,0.7)] hover:border-[#A65158] hover:text-[#F2E3D5] transition-colors cursor-default"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
