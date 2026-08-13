import { AboutView } from "@/components/about/about-page";
import {
  getAboutContent,
  getAboutJourney,
  getAboutProcessSteps,
  getAboutCoreValues,
  getAboutIndustries,
  getAboutPrinciples,
} from "@/lib/about";

export const revalidate = 300; // re-check Supabase every 5 minutes, same as products/services

export default async function AboutPage() {
  const [content, journey, processSteps, coreValues, industries, principles] =
    await Promise.all([
      getAboutContent(),
      getAboutJourney(),
      getAboutProcessSteps(),
      getAboutCoreValues(),
      getAboutIndustries(),
      getAboutPrinciples(),
    ]);

  return (
    <AboutView
      content={content}
      journey={journey}
      processSteps={processSteps}
      coreValues={coreValues}
      industries={industries}
      principles={principles}
    />
  );
}