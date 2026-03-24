"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import Divider from "@/components/ui/Divider";
import ImageLightbox from "@/components/ui/ImageLightbox";
import type { ProcessStep } from "@/lib/types";
import { urlFor } from "@/lib/sanity";

interface ProcessStepsProps {
  steps: ProcessStep[];
}

export default function ProcessSteps({ steps }: ProcessStepsProps) {
  if (!steps || steps.length === 0) return null;

  const hasImages = steps.some((s) => s.image?.asset);

  // Default active step to the first one that has an image
  const firstImageIndex = steps.findIndex((s) => s.image?.asset);
  const [activeIndex, setActiveIndex] = useState(firstImageIndex >= 0 ? firstImageIndex : 0);
  // Track the last image seen so steps without images keep showing it
  const [displayedImage, setDisplayedImage] = useState(
    firstImageIndex >= 0 ? steps[firstImageIndex].image : undefined
  );
  const [displayedImageAlt, setDisplayedImageAlt] = useState(
    firstImageIndex >= 0 ? (steps[firstImageIndex].image?.alt || steps[firstImageIndex].title) : ""
  );
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState("");

  function handleStepClick(index: number) {
    setActiveIndex(index);
    const step = steps[index];
    if (step.image?.asset) {
      setDisplayedImage(step.image);
      setDisplayedImageAlt(step.image.alt || step.title);
    }
    // If no image, keep displayedImage as-is (last shown)
  }

  // No-image fallback: render steps as a simple list
  if (!hasImages) {
    return (
      <section className="max-w-3xl mx-auto px-6">
        <SectionLabel>Process</SectionLabel>
        <div className="mt-6 space-y-8">
          {steps.map((step, i) => (
            <motion.div
              key={step._key || i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <div className="flex items-center gap-4 mb-3">
                <span className="w-8 h-8 rounded-sm bg-[#A65158] text-[#F2E3D5] text-sm font-bold flex items-center justify-center shrink-0">
                  {step.stepNumber || i + 1}
                </span>
                <h3 className="font-serif text-lg font-bold text-[#F2E3D5] leading-snug">
                  {step.title}
                </h3>
              </div>
              <p className="text-sm text-[rgba(242,227,213,0.7)] leading-relaxed ml-12">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
        <Divider />
      </section>
    );
  }

  // Two-column layout: steps on left, image on right
  return (
    <section className="max-w-3xl mx-auto px-6">
      <SectionLabel>Process</SectionLabel>

      <div className="mt-6 grid md:grid-cols-2 gap-10 items-start">
        {/* Left: step list */}
        <div className="space-y-2">
          {steps.map((step, i) => {
            const isActive = i === activeIndex;
            return (
              <motion.div
                key={step._key || i}
                onClick={() => handleStepClick(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleStepClick(i)}
                className={`w-full cursor-pointer px-4 py-4 border transition-colors duration-200 ${
                  isActive
                    ? "border-[#A65158] bg-[#A65158]/10"
                    : "border-[rgba(242,227,213,0.08)] bg-transparent hover:border-[rgba(242,227,213,0.2)]"
                }`}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <div className="flex gap-3 items-start">
                  <span
                    className={`w-7 h-7 rounded-sm text-xs font-bold flex items-center justify-center shrink-0 transition-colors duration-200 ${
                      isActive ? "bg-[#A65158] text-[#F2E3D5]" : "bg-[rgba(242,227,213,0.1)] text-[rgba(242,227,213,0.5)]"
                    }`}
                  >
                    {step.stepNumber || i + 1}
                  </span>
                  <div>
                    <h3
                      className={`font-serif text-base font-bold leading-snug mb-1 transition-colors duration-200 ${
                        isActive ? "text-[#F2E3D5]" : "text-[rgba(242,227,213,0.6)]"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`text-sm leading-relaxed transition-colors duration-200 ${
                        isActive ? "text-[rgba(242,227,213,0.75)]" : "text-[rgba(242,227,213,0.4)]"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right: image panel */}
        <div className="md:sticky md:top-24">
          <AnimatePresence mode="wait">
            {displayedImage?.asset && (
              <motion.div
                key={displayedImage.asset._ref}
                className="border border-[rgba(242,227,213,0.1)] bg-[#0E1826] cursor-zoom-in"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => {
                  setLightboxSrc(urlFor(displayedImage).width(1400).url());
                  setLightboxAlt(displayedImageAlt || "Process step");
                }}
              >
                <Image
                  src={urlFor(displayedImage).width(800).url()}
                  alt={displayedImageAlt || "Process step"}
                  width={800}
                  height={600}
                  style={{ width: "100%", height: "auto" }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {lightboxSrc && (
          <ImageLightbox
            src={lightboxSrc}
            alt={lightboxAlt}
            onClose={() => setLightboxSrc(null)}
          />
        )}
      </div>

      <Divider />
    </section>
  );
}
