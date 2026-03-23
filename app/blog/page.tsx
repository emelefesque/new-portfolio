import { client, postsQuery } from "@/lib/sanity";
import type { PostCard as PostCardType } from "@/lib/types";
import PostCard from "@/components/blog/PostCard";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata = {
  title: "Blog — Megan Feltes",
  description: "Writing on content design, AI, and the craft of clear communication.",
};

async function getPosts() {
  try {
    return await client.fetch<PostCardType[]>(postsQuery);
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>Blog</SectionLabel>
        <h1 className="font-serif text-[clamp(2rem,5vw,3.5rem)] font-bold text-[#F2E3D5] mb-4 leading-tight">
          Writing
        </h1>
        <p className="text-[rgba(242,227,213,0.6)] text-lg mb-16 max-w-xl">
          On content design, AI, governance, and the craft of making things clear.
        </p>

        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <PostCard key={post._id} post={post} index={i} />
            ))}
          </div>
        ) : (
          <div className="border border-[rgba(242,227,213,0.1)] p-16 text-center">
            <p className="font-serif text-xl text-[rgba(242,227,213,0.4)]">
              Posts coming soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
