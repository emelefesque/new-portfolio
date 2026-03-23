import { client, projectsQuery, settingsQuery } from "@/lib/sanity";
import type { ProjectCard, SiteSettings } from "@/lib/types";
import Hero from "@/components/home/Hero";
import ExpertiseStrip from "@/components/home/ExpertiseStrip";
import HowIWork from "@/components/home/HowIWork";
import WorkGrid from "@/components/home/WorkGrid";

// Fallback projects shown before Sanity is connected
const fallbackProjects: ProjectCard[] = [
  { _id: "1", title: "Internal AI tooling", subtitle: "Quality and data hygiene for AI-powered design tools", slug: { current: "internal-ai-tooling" }, company: "Square (Block) · Meta", heroImage: undefined, order: 1 },
  { _id: "2", title: "GDPR response", subtitle: "Redesigning privacy controls for regulators, users, and press", slug: { current: "gdpr-response" }, company: "Meta", heroImage: undefined, order: 2 },
  { _id: "3", title: "Meta AI", subtitle: "Systems design for seamless onboarding", slug: { current: "meta-ai" }, company: "Meta", heroImage: undefined, order: 3 },
  { _id: "4", title: "Ads duplication", subtitle: "Reducing error states to increase revenue", slug: { current: "ads-duplication" }, company: "Meta", heroImage: undefined, order: 4 },
  { _id: "5", title: "Icon library", subtitle: "Naming framework for a unified design system", slug: { current: "icon-library" }, company: "Meta", heroImage: undefined, order: 5 },
  { _id: "6", title: "Meta brand voice", subtitle: "A voice and tone framework for 5,000+ writers and designers", slug: { current: "meta-brand-voice" }, company: "Meta", heroImage: undefined, order: 6 },
  { _id: "7", title: "Sentence case everywhere", subtitle: "Change management at company scale", slug: { current: "sentence-case-everywhere" }, company: "Meta", heroImage: undefined, order: 7 },
];

async function getData() {
  try {
    const [projects, settings] = await Promise.all([
      client.fetch<ProjectCard[]>(projectsQuery),
      client.fetch<SiteSettings>(settingsQuery),
    ]);
    return { projects: projects?.length ? projects : fallbackProjects, settings };
  } catch {
    return { projects: fallbackProjects, settings: null };
  }
}

export default async function HomePage() {
  const { projects, settings } = await getData();

  return (
    <>
      <Hero bio={settings?.bio} resumeUrl={settings?.resumeFile?.asset?.url} />
      <ExpertiseStrip skills={settings?.skills} />
      <HowIWork />
      <WorkGrid projects={projects} />
    </>
  );
}
