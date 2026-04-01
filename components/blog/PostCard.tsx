"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { PostCard } from "@/lib/types";
import { urlFor } from "@/lib/sanity";

interface PostCardProps {
  post: PostCard;
  index?: number;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function PostCard({ post, index = 0 }: PostCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.07 }}
    >
      <Link href={`/blog/${post.slug.current}`} className="group block">
        {post.coverImage?.asset && (
          <div className="relative aspect-[16/9] overflow-hidden mb-4 border border-[rgba(242,227,213,0.08)] group-hover:border-[#A65158] transition-colors">
            <Image
              src={urlFor(post.coverImage).width(600).height(338).url()}
              alt={post.coverImage.alt || post.title}
              fill
              className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
        )}
        <div className={post.coverImage?.asset ? "" : "border border-[rgba(242,227,213,0.08)] group-hover:border-[#A65158] transition-colors p-6"}>
          {post.publishedAt && (
            <p className="text-[0.65rem] tracking-[0.12em] uppercase text-[rgba(242,227,213,0.4)] mb-2">
              {formatDate(post.publishedAt)}
            </p>
          )}
          <h3 className="font-serif text-xl font-bold text-[#F2E3D5] group-hover:text-[#A65158] transition-colors leading-snug mb-2">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="text-sm text-[rgba(242,227,213,0.6)] leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
          )}
          <span className="inline-block mt-3 text-xs text-[#C0707A] tracking-wide group-hover:underline">
            Read more <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
