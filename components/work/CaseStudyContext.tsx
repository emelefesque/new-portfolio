"use client";

import { motion } from "framer-motion";
import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";
import SectionLabel from "@/components/ui/SectionLabel";
import Divider from "@/components/ui/Divider";

const ptComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-[rgba(242,227,213,0.8)] text-base leading-relaxed mb-4 last:mb-0">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="space-y-2 mb-4 ml-2">{children}</ul>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="flex items-start gap-2 text-[rgba(242,227,213,0.8)] text-base leading-relaxed">
        <span className="text-[#A65158] mt-1 shrink-0">·</span>
        {children}
      </li>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-[#F2E3D5]">{children}</strong>
    ),
  },
};

interface CaseStudyContextProps {
  context?: PortableTextBlock[];
  criticalMoment?: PortableTextBlock[];
}

export default function CaseStudyContext({ context, criticalMoment }: CaseStudyContextProps) {
  if (!context?.length && !criticalMoment?.length) return null;

  return (
    <section className="max-w-3xl mx-auto px-6">
      <SectionLabel>Context</SectionLabel>

      {context && context.length > 0 && (
        <motion.div
          className="mt-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <PortableText value={context} components={ptComponents as Parameters<typeof PortableText>[0]["components"]} />
        </motion.div>
      )}

      {criticalMoment && criticalMoment.length > 0 && (
        <motion.div
          className="mt-6 border-l-2 border-[#A65158] bg-[rgba(166,81,88,0.08)] px-5 py-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <PortableText value={criticalMoment} components={{
            ...ptComponents,
            block: {
              normal: ({ children }: { children?: React.ReactNode }) => (
                <p className="text-[#F2E3D5] text-base italic leading-relaxed mb-3 last:mb-0">{children}</p>
              ),
            },
          } as Parameters<typeof PortableText>[0]["components"]} />
        </motion.div>
      )}

      <Divider />
    </section>
  );
}
