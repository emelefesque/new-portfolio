"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import Divider from "@/components/ui/Divider";

interface CaseStudyReflectionProps {
  positioning?: string;
  reflection?: string;
}

export default function CaseStudyReflection({ positioning, reflection }: CaseStudyReflectionProps) {
  if (!positioning && !reflection) return null;

  return (
    <section className="max-w-3xl mx-auto px-6">
      {positioning && (
        <>
          <SectionLabel>Why this matters</SectionLabel>
          <motion.p
            className="mt-4 text-[rgba(242,227,213,0.8)] text-base leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {positioning}
          </motion.p>
        </>
      )}

      {positioning && reflection && <Divider />}

      {reflection && (
        <>
          <SectionLabel>Reflection</SectionLabel>
          <motion.p
            className="mt-4 text-[rgba(242,227,213,0.75)] text-sm leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {reflection}
          </motion.p>
        </>
      )}

      <Divider />
    </section>
  );
}
