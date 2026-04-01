"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";

const principles = [
  {
    title: "Look for the unlikely connections",
    body: "Systems reveal themselves when you pay attention to what's not being said.",
    icon: "→",
  },
  {
    title: "Seek out the hard feedback",
    body: "The best direction can come from unlikely places. Critics become champions when they feel heard.",
    icon: "↗",
  },
  {
    title: "Dig deeper for the real story",
    body: "Getting to know the hopes and fears of the audience unlocks solutions that make real impact.",
    icon: "↓",
  },
];

export default function HowIWork() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>How I work</SectionLabel>

        <motion.h2
          className="font-serif text-[clamp(1.8rem,4vw,3rem)] font-bold text-[#F2E3D5] max-w-2xl mb-16 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          My best work happens when I follow these principles
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              className="border border-[rgba(242,227,213,0.12)] bg-[#0E1826] p-8 hover:border-[#A65158] transition-colors group"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <span className="text-[#C0707A] text-2xl font-serif mb-6 block" aria-hidden="true">
                {p.icon}
              </span>
              <h3 className="font-serif text-lg font-bold text-[#F2E3D5] mb-3 leading-snug">
                {p.title}
              </h3>
              <p className="text-sm text-[rgba(242,227,213,0.65)] leading-relaxed">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
