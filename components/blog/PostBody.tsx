import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";

const components = {
  types: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: ({ value }: { value: any }) => (
      <div className="relative aspect-[16/9] my-8 overflow-hidden border border-[rgba(242,227,213,0.1)]">
        <Image
          src={urlFor(value).width(800).height(450).url()}
          alt={value.alt || ""}
          fill
          className="object-cover"
        />
      </div>
    ),
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="font-serif text-2xl font-bold text-[#F2E3D5] mt-10 mb-4 leading-snug">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="font-serif text-xl font-bold text-[#F2E3D5] mt-8 mb-3 leading-snug">
        {children}
      </h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-[rgba(242,227,213,0.8)] text-base leading-[1.8] mb-5">
        {children}
      </p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-2 border-[#A65158] pl-6 my-6 italic text-[rgba(242,227,213,0.65)]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="space-y-2 mb-5 ml-4">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="space-y-2 mb-5 ml-4 list-decimal">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="flex items-start gap-2 text-[rgba(242,227,213,0.8)] text-sm leading-relaxed">
        <span className="text-[#A65158] mt-0.5 shrink-0">·</span>
        {children}
      </li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li className="text-[rgba(242,227,213,0.8)] text-sm leading-relaxed">
        {children}
      </li>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-[#F2E3D5]">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic text-[rgba(242,227,213,0.85)]">{children}</em>
    ),
    link: ({ value, children }: { value?: { href: string }; children?: React.ReactNode }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#A65158] underline underline-offset-2 hover:text-[#D9AFA0] transition-colors"
      >
        {children}
      </a>
    ),
  },
};

export default function PostBody({ body }: { body: PortableTextBlock[] }) {
  return (
    <div className="max-w-2xl mx-auto">
      <PortableText value={body} components={components as Parameters<typeof PortableText>[0]["components"]} />
    </div>
  );
}
