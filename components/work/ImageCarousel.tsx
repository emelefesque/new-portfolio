"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PortableText } from "next-sanity";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import Divider from "@/components/ui/Divider";
import ImageLightbox from "@/components/ui/ImageLightbox";
import type { CarouselSlide } from "@/lib/types";
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
        <span className="text-[#A65158] mt-0.5 shrink-0">·</span>
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

interface ImageCarouselProps {
  slides: CarouselSlide[];
}

export default function ImageCarousel({ slides }: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState("");

  if (!slides || slides.length === 0) return null;

  function go(next: number) {
    setDirection(next > current ? 1 : -1);
    setCurrent(next);
  }

  const slide = slides[current];

  return (
    <section className="max-w-3xl mx-auto px-6">
      <SectionLabel>Design iterations</SectionLabel>

      <div className="mt-4 border border-[rgba(242,227,213,0.1)] bg-[#0E1826] overflow-hidden">
        {/* Image area */}
        <div className="relative overflow-hidden bg-[#0a1120]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.3 }}
            >
              {slide.image?.asset ? (
                <div
                  className="cursor-zoom-in"
                  onClick={() => {
                    setLightboxSrc(urlFor(slide.image!).width(1400).url());
                    setLightboxAlt(slide.image!.alt || slide.title || "");
                  }}
                >
                  <Image
                    src={urlFor(slide.image).width(1200).url()}
                    alt={slide.image.alt || slide.title || ""}
                    width={1200}
                    height={800}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              ) : (
                <div className="aspect-video flex items-center justify-center">
                  <span className="text-[rgba(242,227,213,0.2)] text-sm">No image</span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Content + navigation */}
        <div className="p-6">
          {/* Step counter + arrows */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    i === current ? "bg-[#A65158]" : "bg-[rgba(242,227,213,0.2)]"
                  }`}
                />
              ))}
              <span className="text-[0.65rem] tracking-[0.1em] uppercase text-[rgba(242,227,213,0.3)] ml-2">
                {current + 1} / {slides.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => go(current - 1)}
                disabled={current === 0}
                className="w-8 h-8 flex items-center justify-center border border-[rgba(242,227,213,0.15)] text-[rgba(242,227,213,0.5)] hover:border-[#A65158] hover:text-[#A65158] transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
              >
                ←
              </button>
              <button
                onClick={() => go(current + 1)}
                disabled={current === slides.length - 1}
                className="w-8 h-8 flex items-center justify-center border border-[rgba(242,227,213,0.15)] text-[rgba(242,227,213,0.5)] hover:border-[#A65158] hover:text-[#A65158] transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
              >
                →
              </button>
            </div>
          </div>

          {/* Title + description */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {slide.title && (
                <h3 className="font-serif text-base font-bold text-[#F2E3D5] leading-snug mb-3">
                  {slide.title}
                </h3>
              )}
              {slide.description && slide.description.length > 0 && (
                <PortableText
                  value={slide.description}
                  components={ptComponents as Parameters<typeof PortableText>[0]["components"]}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
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
