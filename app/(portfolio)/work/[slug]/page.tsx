export const revalidate = 0;

import { notFound } from "next/navigation";
import { client, projectBySlugQuery, projectsQuery } from "@/lib/sanity";
import type { Project, ProjectCard } from "@/lib/types";
import CaseStudyHero from "@/components/work/CaseStudyHero";
import CaseStudyContext from "@/components/work/CaseStudyContext";
import OverviewGrid from "@/components/work/OverviewGrid";
import ExplorationTable from "@/components/work/ExplorationTable";
import ProcessSteps from "@/components/work/ProcessSteps";
import ImpactStats from "@/components/work/ImpactStats";
import CaseStudyReflection from "@/components/work/CaseStudyReflection";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const projects = await client.fetch<ProjectCard[]>(projectsQuery);
    return (projects || []).map((p) => ({ slug: p.slug.current }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  try {
    const project = await client.fetch<Project>(projectBySlugQuery, { slug });
    if (!project) return {};
    return {
      title: `${project.title} — Megan Feltes`,
      description: project.overview || project.subtitle,
    };
  } catch {
    return {};
  }
}

// Fallback data for when Sanity isn't connected
const fallbackData: Record<string, Partial<Project>> = {
  "ads-duplication": {
    title: "Ads duplication",
    subtitle: "Reducing error states to increase revenue",
    company: "Meta",
    role: "Content Designer",
    year: "~2020",
    overview: "Ads duplication is one of the biggest revenue drivers for Meta. Advertisers needed the ability to duplicate ads while changing the campaign objective — but the backend complexity meant the original approach would trigger up to 60 error states. I was brought in to write error messages. I pushed for something better.",
    goal: "Unlock advertiser spend by making it easier for advertisers to duplicate and publish existing ads.",
    challenges: ["Original solution would throw up to 60 errors due to back-end incompatibilities"],
    solution: "Reduce potential error states through better backend handling and clear messaging; co-designed a new modal to walk advertisers through the duplication flow.",
    process: [
      { _key: "1", stepNumber: 1, title: "Understand backend issues", description: "Worked closely with engineers to map what happened when an advertiser changed ad objectives." },
      { _key: "2", stepNumber: 2, title: "Audit and create framework", description: "Identified which issues could be resolved invisibly vs. surfaced to users." },
      { _key: "3", stepNumber: 3, title: "Create design and messaging", description: "Co-designed a new modal with clear, step-by-step language explaining what was happening." },
    ],
    impact: ["2.2% revenue increase", "2.6% increase in new ads creation", "1.7% increase in new advertisers", "0.7% improved responsiveness", "Overall decrease in error states"],
    learnings: [],
  },
  "gdpr-response": {
    title: "GDPR response",
    subtitle: "Redesigning privacy controls for regulators, users, and press",
    company: "Meta / Facebook",
    role: "Content Designer",
    year: "2018",
    overview: "Facebook was at the forefront of GDPR compliance. We needed to let users not only make choices about their privacy settings, but access and change them later — requiring a radical redesign of the Settings page. I was brought in to organize existing settings and create repeatable frameworks for future iterations.",
    goal: "Update Facebook Settings to make it easier for users to find and control their settings.",
    challenges: ["Compressed timeline to launch meant limited design and review time", "High level of scrutiny from internal and external stakeholders", "No existing guidance or frameworks for content, design, or hierarchy"],
    solution: "Developed cleaner information architecture, defined naming conventions, simplified text and imagery.",
    process: [
      { _key: "1", stepNumber: 1, title: "Audit current settings", description: "Understand available controls and product team needs." },
      { _key: "2", stepNumber: 2, title: "Conduct grouping exercises", description: "Find common connections between settings." },
      { _key: "3", stepNumber: 3, title: "Identify naming and content needs", description: "Create rules for how we name and describe settings." },
      { _key: "4", stepNumber: 4, title: "Create framework and patterns", description: "Build easy-to-follow standards for all products." },
      { _key: "5", stepNumber: 5, title: "Get feedback", description: "Validate designs with leadership, regulators, and users." },
      { _key: "6", stepNumber: 6, title: "Iterate and refine", description: "Focus on surfacing the right information at the right time." },
    ],
    impact: ["Shipped on time with other GDPR changes, reducing press cycles and user thrash", "Neutral to positive metrics impact", "No regressions or rollbacks", "Led to the creation of a centralized Settings team"],
    learnings: [],
  },
  "icon-library": {
    title: "Icon library",
    subtitle: "Naming framework for a unified design system",
    company: "Meta",
    role: "Content Designer",
    overview: "Meta had multiple icon libraries across product teams, each with its own naming conventions and ownership. The goal was to consolidate them into one consistent, scalable library.",
    goal: "Combine multiple icon libraries from across Meta products into one library with consistent naming and design.",
    challenges: ["Each icon library had its own naming conventions", "Each library was owned by a visual systems team that felt strong ownership", "Designers using libraries had developed shortcuts"],
    solution: "Created a 'literal naming' framework — naming icons by what they depict (e.g., exclamation-triangle) to maximize extensibility. Built a template requiring literal name, alt text, and searchable keywords.",
    process: [
      { _key: "1", stepNumber: 1, title: "Audit current libraries", description: "Inventory all existing icons across Meta product teams." },
      { _key: "2", stepNumber: 2, title: "Identify gaps and overlaps", description: "Find duplicate icons and naming inconsistencies." },
      { _key: "3", stepNumber: 3, title: "Create naming formula", description: "Use 'literal name' convention to make icons as extensible as possible." },
      { _key: "4", stepNumber: 4, title: "Build template for library", description: "Include alt text and searchable keywords to make icons accessible and reusable." },
      { _key: "5", stepNumber: 5, title: "Define exceptions", description: "Allow for flexibility where it makes sense." },
    ],
    impact: ["Applied to 6 existing icon libraries, eliminating 256 duplicates", "Reduced visual design team intake by 20%"],
    learnings: [],
  },
};

export default async function WorkPage({ params }: PageProps) {
  const { slug } = await params;

  let project: Project | null = null;

  try {
    project = await client.fetch<Project>(projectBySlugQuery, { slug });
  } catch {
    // Sanity not connected — use fallback
  }

  if (project?.hidden) notFound();

  if (!project) {
    const fallback = fallbackData[slug];
    if (!fallback) notFound();

    project = {
      _id: slug,
      _type: "project",
      title: fallback.title || slug,
      subtitle: fallback.subtitle || "",
      slug: { current: slug },
      company: fallback.company || "",
      role: fallback.role || "",
      year: fallback.year || "",
      overview: fallback.overview || "",
      goal: fallback.goal || "",
      challenges: fallback.challenges || [],
      solution: fallback.solution || "",
      process: fallback.process || [],
      impact: fallback.impact || [],
      learnings: fallback.learnings || [],
      order: 0,
    };
  }

  return (
    <article>
      <CaseStudyHero project={project} />
      <CaseStudyContext
        context={project.context}
      />
      <OverviewGrid project={project} />
      <CaseStudyContext
        criticalMoment={project.criticalMoment}
      />
      {project.explorationTable && project.explorationTable.length > 0 && (
        <ExplorationTable rows={project.explorationTable} />
      )}
      {project.process && project.process.length > 0 && (
        <ProcessSteps steps={project.process} />
      )}
      <ImpactStats project={project} />
      <CaseStudyReflection
        positioning={project.positioning}
        reflection={project.reflection}
      />

      {/* Back link */}
      <div className="max-w-3xl mx-auto px-6 pb-24">
        <Link
          href="/#work"
          className="text-sm text-[rgba(242,227,213,0.5)] hover:text-[#A65158] transition-colors"
        >
          ← Back to all work
        </Link>
      </div>
    </article>
  );
}
