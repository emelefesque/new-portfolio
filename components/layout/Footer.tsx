import Link from "next/link";
import { Mail, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-[rgba(242,227,213,0.08)] bg-[#0E1826] mt-24"
    >
      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Left */}
        <div>
          <p className="font-serif text-2xl text-[#F2E3D5] mb-2">Megan Feltes</p>
          <p className="text-sm text-[rgba(242,227,213,0.5)]">
            Principal Content Designer
          </p>
        </div>

        {/* Center — links */}
        <div className="flex flex-col gap-3">
          <a
            href="mailto:meganfeltes@gmail.com"
            className="flex items-center gap-2 text-sm text-[rgba(242,227,213,0.7)] hover:text-[#A65158] transition-colors"
          >
            <Mail size={15} />
            meganfeltes@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/meganfeltes"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-[rgba(242,227,213,0.7)] hover:text-[#A65158] transition-colors"
          >
            <ExternalLink size={15} />
            linkedin.com/in/meganfeltes
          </a>
        </div>

        {/* Right — resume */}
        <div className="flex flex-col gap-3">
          <a
            href="/resume.pdf"
            download
            aria-label="Download resume as PDF"
            className="text-sm border border-[#A65158] text-[#A65158] hover:bg-[#A65158] hover:text-[#F2E3D5] transition-all px-4 py-2 rounded-sm tracking-wide"
          >
            Download resume
          </a>
        </div>
      </div>

      <div className="border-t border-[rgba(242,227,213,0.06)] py-4">
        <p className="text-center text-xs text-[rgba(242,227,213,0.3)]">
          © {new Date().getFullYear()} Megan Feltes
        </p>
      </div>
    </footer>
  );
}
