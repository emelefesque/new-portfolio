"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import Divider from "@/components/ui/Divider";
import type { SolutionComponent } from "@/lib/types";

interface SolutionColumnsProps {
  items: SolutionComponent[];
}

export default function SolutionColumns({ items }: SolutionColumnsProps) {
  if (!items || items.length === 0) return null;

  const colClass =
    items.length === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : "grid-cols-1 sm:grid-cols-3";

  return (
    <section className="max-w-3xl mx-auto px-6">
      <SectionLabel>Solution</SectionLabel>

      <div className={`mt-4 grid ${colClass} gap-4`}>
        {items.map((item, i) => (
          <motion.div
            key={item._key || i}
            className="border border-[rgba(242,227,213,0.12)] bg-[#0E1826] p-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <div className="flex items-start gap-3 mb-3">
              <span className="w-6 h-6 rounded-sm bg-[#A65158] text-[#F2E3D5] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              <h3 className="font-serif text-base font-bold text-[#F2E3D5] leading-snug">
                {item.title}
              </h3>
            </div>

            {item.description && (
              <p className="text-sm text-[rgba(242,227,213,0.7)] leading-relaxed mb-3">
                {item.description}
              </p>
            )}

            {item.bullets && item.bullets.length > 0 && (
              <ul className="space-y-1.5">
                {item.bullets.map((b, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2 text-sm text-[rgba(242,227,213,0.6)] leading-relaxed"
                  >
                    <span className="text-[#C0707A] mt-0.5 shrink-0">·</span>
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </div>

      <Divider />
    </section>
  );
}
