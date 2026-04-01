"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PortableText } from "next-sanity";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import Divider from "@/components/ui/Divider";
import ImageLightbox from "@/components/ui/ImageLightbox";
import type { EdgeCase } from "@/lib/types";
import { urlFor } from "@/lib/sanity";

const ptComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-[rgba(242,227,213,0.75)] text-sm leading-relaxed mb-3 last:mb-0">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="space-y-2 mb-3 ml-2">{children}</ul>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="flex items-start gap-2 text-[rgba(242,227,213,0.75)] text-sm leading-relaxed">
        <span className="text-[#C0707A] mt-0.5 shrink-0" aria-hidden="true">·</span>
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

interface EdgeCasesProps {
  items: EdgeCase[];
}

export default function EdgeCases({ items }: EdgeCasesProps) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState("");

  if (!items || items.length === 0) return null;

  return (
    <section className="max-w-3xl mx-auto px-6">
      <SectionLabel>Edge cases & tradeoffs</SectionLabel>

      <div className="mt-4 space-y-10">
        {items.map((item, i) => (
          <motion.div
            key={item._key || i}
            className="border border-[rgba(242,227,213,0.1)] bg-[#0E1826]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
          >
            {/* Image */}
            {item.image?.asset && (
              <div
                className="cursor-zoom-in border-b border-[rgba(242,227,213,0.08)]"
                onClick={() => {
                  setLightboxSrc(urlFor(item.image!).width(1400).url());
                  setLightboxAlt(item.image!.alt || item.title);
                }}
              >
                <Image
                  src={urlFor(item.image).width(1200).url()}
                  alt={item.image.alt || item.title}
                  width={1200}
                  height={675}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            )}

            {/* Content */}
            <div className="p-6">
              {item.type && (
                <span className="text-[0.65rem] tracking-[0.12em] uppercase text-[#C0707A] mb-2 block">
                  {item.type}
                </span>
              )}
              <h3 className="font-serif text-lg font-bold text-[#F2E3D5] leading-snug mb-4">
                {item.title}
              </h3>
              {item.description && item.description.length > 0 && (
                <PortableText
                  value={item.description}
                  components={ptComponents as Parameters<typeof PortableText>[0]["components"]}
                />
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {lightboxSrc && (
        <ImageLightbox
          src={lightboxSrc}
          alt={lightboxAlt}
          onClose={() => setLightboxSrc(null)}
        />
      )}

      <Divider />
    </section>
  );
}
