import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImage } from "./types";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2024-01-01";

// Only create a real client when a project ID is configured
export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === "production",
    })
  : createClient({
      projectId: "placeholder",
      dataset,
      apiVersion,
      useCdn: false,
    });

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImage) {
  return builder.image(source);
}

// ─── GROQ queries ──────────────────────────────────────────────

export const projectsQuery = `
  *[_type == "project" && hidden != true] | order(order asc) {
    _id,
    title,
    subtitle,
    slug,
    company,
    heroImage { asset, alt },
    category,
    order
  }
`;

export const projectsByCategoryQuery = `
  *[_type == "project" && category == $category && hidden != true] | order(order asc) {
    _id,
    title,
    subtitle,
    slug,
    company,
    heroImage { asset, alt },
    overview,
    impact,
    category,
    order
  }
`;

export const workCategoryQuery = `
  *[_type == "workCategory" && key == $key][0] {
    _id,
    key,
    title,
    description,
    heroProject-> {
      _id,
      title,
      subtitle,
      slug,
      company,
      role,
      year,
      heroImage { asset, alt },
      overview,
      impact,
      category
    }
  }
`;

export const projectBySlugQuery = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    subtitle,
    slug,
    company,
    role,
    year,
    heroImage { asset, alt },
    overview,
    goal,
    challenges,
    solution,
    process[] {
      _key,
      stepNumber,
      title,
      description,
      image { asset, alt }
    },
    whatShipped {
      description,
      image { asset, alt }
    },
    imageCarousel[] {
      _key,
      image { asset, alt },
      title,
      description
    },
    edgeCases[] {
      _key,
      type,
      title,
      description,
      image { asset, alt }
    },
    figmaEmbedUrl,
    solutionComponents[] {
      _key,
      title,
      description,
      bullets
    },
    impact,
    learnings,
    context,
    criticalMoment,
    explorationTable[] {
      _key,
      approach,
      outcome,
      worked
    },
    positioning,
    reflection,
    hidden,
    order
  }
`;

export const postsQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    coverImage { asset, alt }
  }
`;

export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    coverImage { asset, alt },
    body
  }
`;

export const settingsQuery = `
  *[_type == "settings"][0] {
    bio,
    skills,
    resumeFile { asset-> { url } }
  }
`;

export const recentPostsQuery = `
  *[_type == "post"] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt
  }
`;
