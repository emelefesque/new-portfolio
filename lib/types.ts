import type { PortableTextBlock } from "next-sanity";
export type { PortableTextBlock };

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

export interface ProcessStep {
  _key: string;
  stepNumber: number;
  title: string;
  description: string;
  image?: SanityImage;
}

export interface SolutionComponent {
  _key: string;
  title: string;
  description?: string;
  bullets?: string[];
}

export interface ExplorationRow {
  _key: string;
  approach: string;
  outcome: string;
  worked: boolean;
}

export interface WhatShipped {
  description?: PortableTextBlock[];
  image?: SanityImage;
  imageAlt?: string;
}

export type WorkCategoryKey = "ai" | "productContent" | "systemsDesign" | "peopleLeadership";

export interface Project {
  _id: string;
  _type: "project";
  title: string;
  subtitle: string;
  slug: { current: string };
  company: string;
  role: string;
  year: string;
  heroImage?: SanityImage;
  overview: string;
  goal: string;
  challenges: string[];
  solution: string;
  process: ProcessStep[];
  whatShipped?: WhatShipped;
  impact: string[];
  learnings: string[];
  category?: WorkCategoryKey;
  figmaEmbedUrl?: string;
  solutionComponents?: SolutionComponent[];
  context?: PortableTextBlock[];
  criticalMoment?: PortableTextBlock[];
  explorationTable?: ExplorationRow[];
  positioning?: PortableTextBlock[];
  reflection?: PortableTextBlock[];
  hidden?: boolean;
  order: number;
}

export interface WorkCategory {
  _id: string;
  key: WorkCategoryKey;
  title: string;
  description?: string;
  heroProject?: Project;
}

export interface Post {
  _id: string;
  _type: "post";
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  body: PortableTextBlock[];
  coverImage?: SanityImage;
}

export interface SiteSettings {
  _id: string;
  _type: "settings";
  bio: string;
  skills: string[];
  resumeFile?: {
    asset: {
      url: string;
    };
  };
}

// For list views (lighter type without full body content)
export type ProjectCard = Pick<
  Project,
  "_id" | "title" | "subtitle" | "slug" | "company" | "heroImage" | "order" | "category"
>;

export type PostCard = Pick<
  Post,
  "_id" | "title" | "slug" | "publishedAt" | "excerpt" | "coverImage"
>;
