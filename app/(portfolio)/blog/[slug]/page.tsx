import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { client, postBySlugQuery, postsQuery } from "@/lib/sanity";
import type { Post, PostCard } from "@/lib/types";
import PostBody from "@/components/blog/PostBody";
import { urlFor } from "@/lib/sanity";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const posts = await client.fetch<PostCard[]>(postsQuery);
    return (posts || []).map((p) => ({ slug: p.slug.current }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  try {
    const post = await client.fetch<Post>(postBySlugQuery, { slug });
    if (!post) return {};
    return {
      title: `${post.title} — Megan Feltes`,
      description: post.excerpt,
    };
  } catch {
    return {};
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function estimateReadTime(body: unknown[]): number {
  const text = JSON.stringify(body);
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  let post: Post | null = null;
  try {
    post = await client.fetch<Post>(postBySlugQuery, { slug });
  } catch {
    // Sanity not connected
  }

  if (!post) notFound();

  const readTime = post.body ? estimateReadTime(post.body) : 0;

  return (
    <article className="min-h-screen pt-24 pb-24">
      {/* Hero image */}
      {post.coverImage?.asset && (
        <div className="relative w-full aspect-[21/9] bg-[#0E1826] overflow-hidden mb-12">
          <Image
            src={urlFor(post.coverImage).width(1400).height(600).url()}
            alt={post.coverImage.alt || post.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0D0D0D] to-transparent" />
        </div>
      )}

      <div className="max-w-2xl mx-auto px-6">
        {/* Meta */}
        <div className="flex flex-wrap gap-4 text-[0.65rem] tracking-[0.12em] uppercase text-[rgba(242,227,213,0.4)] mb-6">
          {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
          {readTime > 0 && <span>{readTime} min read</span>}
        </div>

        <h1 className="font-serif text-[clamp(2rem,5vw,3rem)] font-bold text-[#F2E3D5] leading-tight mb-6">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-lg text-[rgba(242,227,213,0.6)] leading-relaxed mb-12 border-l-2 border-[#A65158] pl-4">
            {post.excerpt}
          </p>
        )}

        <div
          className="h-px mb-12"
          style={{ background: "rgba(242,227,213,0.12)" }}
        />

        {post.body && <PostBody body={post.body} />}

        <div
          className="h-px mt-12 mb-8"
          style={{ background: "rgba(242,227,213,0.12)" }}
        />

        <Link
          href="/blog"
          className="text-sm text-[rgba(242,227,213,0.5)] hover:text-[#A65158] transition-colors"
        >
          ← Back to all posts
        </Link>
      </div>
    </article>
  );
}
