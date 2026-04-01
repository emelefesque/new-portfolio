"use client";

import { motion } from "framer-motion";
import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";
import SectionLabel from "@/components/ui/SectionLabel";
import Divider from "@/components/ui/Divider";
import type { Project } from "@/lib/types";

interface OverviewGridProps {
  project: Project;
  criticalMoment?: PortableTextBlock[];
}

export default function OverviewGrid({ project, criticalMoment }: OverviewGridProps) {
  return (
    <section className="max-w-3xl mx-auto px-6">
      {project.overview && (
        <motion.p
          className="text-[rgba(242,227,213,0.8)] text-lg leading-relaxed mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {project.overview}
        </motion.p>
      )}

      {criticalMoment && criticalMoment.length > 0 && (
        <motion.div
          className="mb-10 border-l-2 border-[#A65158] bg-[rgba(166,81,88,0.08)] px-5 py-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <PortableText
            value={criticalMoment}
            components={{
              block: {
                normal: ({ children }: { children?: React.ReactNode }) => (
                  <p className="text-[#F2E3D5] text-base italic leading-relaxed mb-3 last:mb-0">{children}</p>
                ),
              },
              marks: {
                strong: ({ children }: { children?: React.ReactNode }) => (
                  <strong className="font-semibold">{children}</strong>
                ),
              },
            } as Parameters<typeof PortableText>[0]["components"]}
          />
        </motion.div>
      )}

      <Divider />

      <SectionLabel>At a glance</SectionLabel>

      {/* 2×2 grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {/* Goal */}
        <motion.div
          className="border border-[rgba(242,227,213,0.12)] bg-[#0E1826] p-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <p className="section-label mb-3">Goal</p>
          <p className="text-sm text-[rgba(242,227,213,0.75)] leading-relaxed">
            {project.goal || "Coming soon"}
          </p>
        </motion.div>

        {/* Challenges */}
        <motion.div
          className="border border-[rgba(242,227,213,0.12)] bg-[#0E1826] p-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <p className="section-label mb-3">Challenges</p>
          {project.challenges && project.challenges.length > 0 ? (
            <ul className="space-y-2">
              {project.challenges.map((c, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-[rgba(242,227,213,0.75)] leading-relaxed"
                >
                  <span className="text-[#C0707A] mt-0.5 shrink-0">·</span>
                  {c}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-[rgba(242,227,213,0.4)]">Coming soon</p>
          )}
        </motion.div>

        {/* Solution */}
        <motion.div
          className="border border-[rgba(242,227,213,0.12)] bg-[#0E1826] p-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <p className="section-label mb-3">Solution</p>
          <p className="text-sm text-[rgba(242,227,213,0.75)] leading-relaxed">
            {project.solution || "Coming soon"}
          </p>
        </motion.div>

        {/* Impact */}
        <motion.div
          className="border border-[rgba(242,227,213,0.12)] bg-[#0E1826] p-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <p className="section-label mb-3">Impact</p>
          {project.impact && project.impact.length > 0 ? (
            <ul className="space-y-2">
              {project.impact.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-[rgba(242,227,213,0.75)] leading-relaxed"
                >
                  <span className="text-[#C0707A] mt-0.5 shrink-0">·</span>
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-[rgba(242,227,213,0.4)]">Coming soon</p>
          )}
        </motion.div>
      </div>

      <Divider />
    </section>
  );
}
