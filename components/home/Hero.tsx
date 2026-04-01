"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface HeroProps {
  bio?: string;
  resumeUrl?: string;
}

const defaultBio =
  "I make products better by applying human-centered design to complex technologies, helping teams set guardrails and scale responsible practices in real-world systems. Previously at Meta and Square (Block).";

export default function Hero({ bio, resumeUrl }: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-16 overflow-hidden">
      {/* Subtle grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />

      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="section-label mb-6">Content Designer</p>

          <h1 className="font-serif text-[clamp(3.5rem,10vw,7rem)] font-bold leading-[1.05] text-[#F2E3D5] mb-4">
            Megan
            <br />
            <span className="text-[#A65158]">Feltes</span>
          </h1>

          <motion.p
            className="max-w-xl text-[rgba(242,227,213,0.75)] text-lg leading-relaxed mt-8 mb-12"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            {bio || defaultBio}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          >
            <Link
              href="/#work"
              className="bg-[#A65158] text-[#F2E3D5] px-7 py-3 text-sm font-medium tracking-wide hover:bg-[#8f4347] transition-colors"
            >
              See my work
            </Link>
            <a
              href={resumeUrl || "/resume.pdf"}
              download
              className="border border-[rgba(242,227,213,0.35)] text-[#F2E3D5] px-7 py-3 text-sm font-medium tracking-wide hover:border-[#A65158] hover:text-[#A65158] transition-colors"
            >
              Download resume
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[rgba(242,227,213,0.3)]">
          Scroll
        </span>
        <motion.div
          className="w-px h-8 bg-[#A65158] origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
