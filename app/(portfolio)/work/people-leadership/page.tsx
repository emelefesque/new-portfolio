export const revalidate = 0;

import { client, workCategoryQuery, projectsByCategoryQuery } from "@/lib/sanity";
import type { WorkCategory, Project } from "@/lib/types";
import CategoryPage from "@/components/work/CategoryPage";

const fallbackCategory: WorkCategory = {
  _id: "peopleLeadership",
  key: "peopleLeadership",
  title: "People & Culture Leadership",
  description: "",
};

const fallbackOtherProjects: Project[] = [];

export const metadata = {
  title: "People & Culture Leadership — Megan Feltes",
};

export default async function PeopleLeadershipCategoryPage() {
  let category: WorkCategory = fallbackCategory;
  let otherProjects: Project[] = fallbackOtherProjects;

  try {
    const [sanityCategory, allCategoryProjects] = await Promise.all([
      client.fetch<WorkCategory>(workCategoryQuery, { key: "peopleLeadership" }),
      client.fetch<Project[]>(projectsByCategoryQuery, { category: "peopleLeadership" }),
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