export const revalidate = 0;

import { client, workCategoryQuery, projectsByCategoryQuery } from "@/lib/sanity";
import type { WorkCategory, Project } from "@/lib/types";
import CategoryPage from "@/components/work/CategoryPage";

const fallbackCategory: WorkCategory = {
  _id: "systemsDesign",
  key: "systemsDesign",
  title: "Systems design",
  description: "Frameworks, naming conventions, and governance structures that give teams the consistency to move fast without breaking things.",
  heroProject: {
    _id: "icon-library",
    _type: "project",
    title: "Icon library",
    subtitle: "Naming framework for a unified design system",
    slug: { current: "icon-library" },
    company: "Meta",
    role: "Content Designer",
    year: "",
    overview: "Meta had multiple icon libraries across product teams, each with its own naming conventions and ownership. The goal was to consolidate them into one consistent, scalable library.",
    goal: "",
    challenges: [],
    solution: "",
    process: [],
    impact: ["Applied to 6 existing icon libraries, eliminating 256 duplicates", "Reduced visual design team intake by 20%"],
    learnings: [],
    order: 5,
  },
};

const fallbackOtherProjects: Project[] = [
  {
    _id: "meta-brand-voice",
    _type: "project",
    title: "Meta brand voice",
    subtitle: "A voice and tone framework for 5,000+ writers and designers",
    slug: { current: "meta-brand-voice" },
    company: "Meta",
    role: "Content Designer",
    year: "",
    overview: "",
    goal: "",
    challenges: [],
    solution: "",
    process: [],
    impact: [],
    learnings: [],
    order: 6,
  },
];

export const metadata = {
  title: "Systems design — Megan Feltes",
};

export default async function SystemsDesignCategoryPage() {
  let category: WorkCategory = fallbackCategory;
  let otherProjects: Project[] = fallbackOtherProjects;

  try {
    const [sanityCategory, allCategoryProjects] = await Promise.all([
      client.fetch<WorkCategory>(workCategoryQuery, { key: "systemsDesign" }),
      client.fetch<Project[]>(projectsByCategoryQuery, { category: "systemsDesign" }),
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
