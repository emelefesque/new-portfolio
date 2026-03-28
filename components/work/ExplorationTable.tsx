"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import Divider from "@/components/ui/Divider";
import type { ExplorationRow } from "@/lib/types";

interface ExplorationTableProps {
  rows: ExplorationRow[];
}

export default function ExplorationTable({ rows }: ExplorationTableProps) {
  if (!rows || rows.length === 0) return null;

  return (
    <section className="max-w-3xl mx-auto px-6">
      <SectionLabel>Exploration</SectionLabel>

      <div className="mt-4 border border-[rgba(242,227,213,0.1)] overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[1fr_1fr_3rem] bg-[#0E1826] border-b border-[rgba(242,227,213,0.1)] px-4 py-2">
          <span className="text-[0.65rem] tracking-[0.12em] uppercase text-[#A65158]">Approach</span>
          <span className="text-[0.65rem] tracking-[0.12em] uppercase text-[#A65158]">Outcome</span>
          <span className="text-[0.65rem] tracking-[0.12em] uppercase text-[#A65158]"></span>
        </div>

        {/* Rows */}
        {rows.map((row, i) => (
          <motion.div
            key={row._key || i}
            className="grid grid-cols-[1fr_1fr_3rem] px-4 py-3 border-b border-[rgba(242,227,213,0.06)] last:border-b-0 items-center"
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.07 }}
          >
            <span className="text-sm text-[rgba(242,227,213,0.8)]">{row.approach}</span>
            <span className="text-sm text-[rgba(242,227,213,0.6)]">{row.outcome}</span>
            <span className={`text-base font-bold text-center ${row.worked ? "text-[#A65158]" : "text-[rgba(242,227,213,0.2)]"}`}>
              {row.worked ? "✓" : "✗"}
            </span>
          </motion.div>
        ))}
      </div>

      <Divider />
    </section>
  );
}
