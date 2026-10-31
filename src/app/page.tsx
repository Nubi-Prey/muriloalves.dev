import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProjectsSection } from "@/components/ProjectsSection";
import { Competencies } from "@/components/Competencies";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { fetchProjectsWithFallback } from "@/lib/github";
import { buildPortfolioJsonLd, serializeJsonLd } from "@/lib/structured-data";
import { cacheLife, cacheTag } from "next/cache";

export default async function Home() {
  "use cache";
  cacheLife("days");
  cacheTag("github-projects");

  const projects = await fetchProjectsWithFallback();
  const jsonLd = buildPortfolioJsonLd(projects);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(jsonLd),
        }}
      />
      <Header />
      <main className="w-full overflow-x-clip bg-[#f5f5f4] dark:bg-[#121314] text-[#1c1b1d] dark:text-[#ede5d8] min-h-screen">
        <Hero />
        <ProjectsSection initialProjects={projects} />
        <Competencies />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
