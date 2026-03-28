"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import Divider from "@/components/ui/Divider";

interface CaseStudyContextProps {
  context?: string;
  criticalMoment?: string;
}

export default function CaseStudyContext({ context, criticalMoment }: CaseStudyContextProps) {
  if (!context && !criticalMoment) return null;

  return (
    <section className="max-w-3xl mx-auto px-6">
      <SectionLabel>Context</SectionLabel>

      {context && (
        <motion.p
          className="mt-4 text-[rgba(242,227,213,0.8)] text-base leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {context}
        </motion.p>
      )}

      {criticalMoment && (
        <motion.blockquote
          className="mt-6 border-l-2 border-[#A65158] bg-[rgba(166,81,88,0.08)] px-5 py-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="text-[#F2E3D5] text-base italic leading-relaxed">
            {criticalMoment}
          </p>
        </motion.blockquote>
      )}

      <Divider />
    </section>
  );
}
