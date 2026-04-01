"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import Divider from "@/components/ui/Divider";

interface FigmaEmbedProps {
  url: string;
  projectTitle?: string;
}

export default function FigmaEmbed({ url, projectTitle }: FigmaEmbedProps) {
  return (
    <section className="max-w-3xl mx-auto px-6">
      <SectionLabel>Prototype</SectionLabel>

      <motion.div
        className="mt-4 border border-[rgba(242,227,213,0.1)] bg-[#0E1826] overflow-hidden"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-full h-[480px] sm:h-auto sm:aspect-video">
          <iframe
            src={url}
            title={projectTitle ? `Interactive prototype for ${projectTitle}` : "Interactive prototype"}
            className="absolute inset-0 w-full h-full"
            allowFullScreen
          />
        </div>
      </motion.div>

      <Divider />
    </section>
  );
}
