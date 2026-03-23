"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import Divider from "@/components/ui/Divider";
import type { ProcessStep } from "@/lib/types";
import { urlFor } from "@/lib/sanity";

interface ProcessStepsProps {
  steps: ProcessStep[];
}

export default function ProcessSteps({ steps }: ProcessStepsProps) {
  if (!steps || steps.length === 0) return null;

  // Find if any step has an image — used to determine layout
  const hasImages = steps.some((s) => s.image?.asset);

  return (
    <section className="max-w-3xl mx-auto px-6">
      <SectionLabel>Process</SectionLabel>

      <div className={`mt-6 ${hasImages ? "space-y-12" : "space-y-8"}`}>
        {steps.map((step, i) => (
          <motion.div
            key={step._key || i}
            className={hasImages && step.image?.asset ? "grid md:grid-cols-2 gap-8 items-start" : ""}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
          >
            {/* Step text */}
            <div>
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
            </div>

            {/* Step image (if present) */}
            {step.image?.asset && (
              <div className="relative aspect-[4/3] overflow-hidden border border-[rgba(242,227,213,0.1)] bg-[#0E1826]">
                <Image
                  src={urlFor(step.image).width(600).height(450).url()}
                  alt={step.image.alt || step.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <Divider />
    </section>
  );
}
