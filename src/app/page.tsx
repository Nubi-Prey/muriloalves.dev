import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProjectsSection } from "@/components/ProjectsSection";
import { Competencies } from "@/components/Competencies";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { fetchProjectsWithFallback } from "@/lib/github";
import { cacheLife, cacheTag } from "next/cache";

export default async function Home() {
  "use cache";
  cacheLife("days");
  cacheTag("github-projects");

  const projects = await fetchProjectsWithFallback();

  return (
    <>
      <Header />
      <main className="w-full bg-[#f5f5f4] dark:bg-[#121314] text-[#1c1b1d] dark:text-[#ede5d8] min-h-screen">
        <Hero />
        <ProjectsSection initialProjects={projects} />
        <Competencies />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
