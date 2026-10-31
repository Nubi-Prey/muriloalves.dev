import { fetchProjectsWithFallback } from "@/lib/github";
import { generateLlmsFullTxt } from "@/lib/llms-content";

export async function GET(): Promise<Response> {
  const projects = await fetchProjectsWithFallback();
  const body = generateLlmsFullTxt(projects);

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control":
        "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
    },
  });
}
