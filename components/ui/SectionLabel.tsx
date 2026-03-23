"use client";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <span
      className={`inline-block text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-[#A65158] mb-4 ${className}`}
    >
      {children}
    </span>
  );
}
