export const revalidate = 0;

import { client, settingsQuery, featuredProjectsQuery } from "@/lib/sanity";
import type { SiteSettings } from "@/lib/types";
import Hero from "@/components/home/Hero";
import ExpertiseStrip from "@/components/home/ExpertiseStrip";
import FeaturedWork from "@/components/home/FeaturedWork";
import HowIWork from "@/components/home/HowIWork";
import WorkCategories from "@/components/home/WorkCategories";

const FEATURED_SLUGS = ["gdpr-response", "cross-system-transitions"];

async function getData() {
  try {
    const [settings, featuredRaw] = await Promise.all([
      client.fetch<SiteSettings>(settingsQuery),
      client.fetch(featuredProjectsQuery, { slugs: FEATURED_SLUGS }),
    ]);
    // Preserve the order defined in FEATURED_SLUGS
    const featured = FEATURED_SLUGS
      .map((s) => (featuredRaw || []).find((p: { slug: { current: string } }) => p.slug.current === s))
      .filter(Boolean);
    return { settings, featured };
  } catch {
    return { settings: null, featured: [] };
  }
}

export default async function HomePage() {
  const { settings, featured } = await getData();

  return (
    <>
      <Hero bio={settings?.bio} resumeUrl={settings?.resumeFile?.asset?.url} />
      <ExpertiseStrip skills={settings?.skills} />
      <FeaturedWork projects={featured} />
      <WorkCategories />
      <HowIWork />
    </>
  );
}
