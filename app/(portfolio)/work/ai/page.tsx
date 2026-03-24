import { client, workCategoryQuery, projectsByCategoryQuery } from "@/lib/sanity";
import type { WorkCategory, Project } from "@/lib/types";
import CategoryPage from "@/components/work/CategoryPage";

const fallbackCategory: WorkCategory = {
  _id: "ai",
  key: "ai",
  title: "AI",
  description: "Shaping how people understand, trust, and work alongside AI — from onboarding flows to tooling that makes AI-assisted work feel natural.",
  heroProject: {
    _id: "internal-ai-tooling",
    _type: "project",
    title: "Internal AI tooling",
    subtitle: "Quality and data hygiene for AI-powered design tools",
    slug: { current: "internal-ai-tooling" },
    company: "Square (Block) · Meta",
    role: "Content Designer",
    year: "2023–2024",
    overview: "As AI-powered tools moved from experimental to core infrastructure, the data used to train and evaluate them needed the same rigor applied to any product. I led content strategy for the data quality and hygiene work that kept these tools accurate and trustworthy.",
    goal: "",
    challenges: [],
    solution: "",
    process: [],
    impact: [],
    learnings: [],
    order: 1,
  },
};

const fallbackOtherProjects: Project[] = [
  {
    _id: "meta-ai",
    _type: "project",
    title: "Meta AI",
    subtitle: "Systems design for seamless onboarding",
    slug: { current: "meta-ai" },
    company: "Meta",
    role: "Content Designer",
    year: "2023",
    overview: "",
    goal: "",
    challenges: [],
    solution: "",
    process: [],
    impact: [],
    learnings: [],
    order: 3,
  },
];

export const metadata = {
  title: "AI — Megan Feltes",
};

export default async function AICategoryPage() {
  let category: WorkCategory = fallbackCategory;
  let otherProjects: Project[] = fallbackOtherProjects;

  try {
    const [sanityCategory, allCategoryProjects] = await Promise.all([
      client.fetch<WorkCategory>(workCategoryQuery, { key: "ai" }),
      client.fetch<Project[]>(projectsByCategoryQuery, { category: "ai" }),
    ]);

    if (sanityCategory) {
      category = sanityCategory;
      const heroId = sanityCategory.heroProject?._id;
      otherProjects = (allCategoryProjects || []).filter((p) => p._id !== heroId);
    }
  } catch {
    // use fallback
  }

  return <CategoryPage category={category} otherProjects={otherProjects} />;
}
