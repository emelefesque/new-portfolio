import { client, settingsQuery } from "@/lib/sanity";
import type { SiteSettings } from "@/lib/types";
import Hero from "@/components/home/Hero";
import ExpertiseStrip from "@/components/home/ExpertiseStrip";
import FeaturedWork from "@/components/home/FeaturedWork";
import WorkCategories from "@/components/home/WorkCategories";
import HowIWork from "@/components/home/HowIWork";

async function getData() {
  try {
    const settings = await client.fetch<SiteSettings>(settingsQuery);
    return { settings };
  } catch {
    return { settings: null };
  }
}

export default async function HomePage() {
  const { settings } = await getData();

  return (
    <>
      <Hero bio={settings?.bio} resumeUrl={settings?.resumeFile?.asset?.url} />
      <ExpertiseStrip skills={settings?.skills} />
      <FeaturedWork />
      <WorkCategories />
      <HowIWork />
    </>
  );
}
