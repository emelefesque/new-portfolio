import { client, workCategoryQuery, projectsByCategoryQuery } from "@/lib/sanity";
import type { WorkCategory, Project } from "@/lib/types";
import CategoryPage from "@/components/work/CategoryPage";

const fallbackCategory: WorkCategory = {
  _id: "productContent",
  key: "productContent",
  title: "Product content",
  description: "Writing and systems that reduce friction, prevent errors, and help people do what they came to do — at scale, across surfaces.",
  heroProject: {
    _id: "ads-duplication",
    _type: "project",
    title: "Ads duplication",
    subtitle: "Reducing error states to increase revenue",
    slug: { current: "ads-duplication" },
    company: "Meta",
    role: "Content Designer",
    year: "~2020",
    overview: "Ads duplication is one of the biggest revenue drivers for Meta. Advertisers needed the ability to duplicate ads while changing the campaign objective — but the backend complexity meant the original approach would trigger up to 60 error states. I was brought in to write error messages. I pushed for something better.",
    goal: "",
    challenges: [],
    solution: "",
    process: [],
    impact: ["2.2% revenue increase", "2.6% increase in new ads creation", "1.7% increase in new advertisers", "Overall decrease in error states"],
    learnings: [],
    order: 4,
  },
};

const fallbackOtherProjects: Project[] = [
  {
    _id: "gdpr-response",
    _type: "project",
    title: "GDPR response",
    subtitle: "Redesigning privacy controls for regulators, users, and press",
    slug: { current: "gdpr-response" },
    company: "Meta / Facebook",
    role: "Content Designer",
    year: "2018",
    overview: "",
    goal: "",
    challenges: [],
    solution: "",
    process: [],
    impact: [],
    learnings: [],
    order: 2,
  },
];

export const metadata = {
  title: "Product content — Megan Feltes",
};

export default async function ProductContentCategoryPage() {
  let category: WorkCategory = fallbackCategory;
  let otherProjects: Project[] = fallbackOtherProjects;

  try {
    const [sanityCategory, allCategoryProjects] = await Promise.all([
      client.fetch<WorkCategory>(workCategoryQuery, { key: "productContent" }),
      client.fetch<Project[]>(projectsByCategoryQuery, { category: "productContent" }),
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
