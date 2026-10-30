import { PortfolioProjectSchemaV2 } from "@/types/project-schema";
import { getAllProjectSchemas, validateProjectSchemaV2 } from "./projects";

export const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";
export const DEFAULT_GITHUB_USERNAME = "Nubi-Prey";
export const DEFAULT_REVALIDATE_SECONDS = 86400; // 24 hours (ISR)
export const GITHUB_CACHE_TAG = "github-projects";

export const PINNED_PROJECTS_QUERY = `
query GetPinnedProjects($username: String!) {
  user(login: $username) {
    pinnedItems(first: 6, types: [REPOSITORY]) {
      nodes {
        ... on Repository {
          name
          nameWithOwner
          isPrivate
          url
          portfolioJson: object(expression: "HEAD:.github/portfolio.json") {
            ... on Blob {
              text
            }
          }
        }
      }
    }
  }
}
`;

interface GitHubBlob {
  text: string;
}

export interface GitHubPinnedRepositoryNode {
  name: string;
  nameWithOwner: string;
  isPrivate: boolean;
  url: string;
  portfolioJson: GitHubBlob | null;
}

export interface GitHubGraphQLResponse {
  data?: {
    user?: {
      pinnedItems?: {
        nodes?: Array<GitHubPinnedRepositoryNode | null>;
      } | null;
    } | null;
  } | null;
  errors?: Array<{ message: string }>;
}

export async function fetchProjectsWithFallback(): Promise<readonly PortfolioProjectSchemaV2[]> {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  const username = process.env.GITHUB_USERNAME || DEFAULT_GITHUB_USERNAME;
  const revalidateSeconds =
    Number(process.env.REVALIDATE_SECONDS) || DEFAULT_REVALIDATE_SECONDS;

  if (!token) {
    if (process.env.NODE_ENV !== "test") {
      console.info(
        "[github] GITHUB_TOKEN not configured. Utilizing validated local catalog fallback."
      );
    }
    return getAllProjectSchemas();
  }

  try {
    const res = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "muriloalves-portfolio",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: PINNED_PROJECTS_QUERY,
        variables: { username },
      }),
      next: {
        revalidate: revalidateSeconds,
        tags: [GITHUB_CACHE_TAG],
      },
    });

    if (!res.ok) {
      console.warn(
        `[github] GraphQL request failed with status ${res.status}: ${res.statusText}. Using fallback.`
      );
      return getAllProjectSchemas();
    }

    const payload = (await res.json()) as GitHubGraphQLResponse;

    if (payload.errors && payload.errors.length > 0) {
      console.warn(
        "[github] GraphQL returned errors, using local fallback:",
        payload.errors
      );
      return getAllProjectSchemas();
    }

    const nodes = payload.data?.user?.pinnedItems?.nodes;
    if (!nodes || nodes.length === 0) {
      console.warn(
        "[github] No pinned repositories found in response. Using local fallback."
      );
      return getAllProjectSchemas();
    }

    const validSchemas: PortfolioProjectSchemaV2[] = [];

    for (const node of nodes) {
      if (!node || !node.portfolioJson?.text) {
        continue;
      }
      try {
        const rawJson = JSON.parse(node.portfolioJson.text);
        const validated = validateProjectSchemaV2(rawJson);
        validSchemas.push(validated);
      } catch (parseOrValidationError) {
        console.warn(
          `[github] Failed to parse/validate schema for ${node.name}:`,
          parseOrValidationError
        );
      }
    }

    if (validSchemas.length === 0) {
      console.warn(
        "[github] None of the pinned repositories yielded a valid Schema v2. Using local fallback."
      );
      return getAllProjectSchemas();
    }

    return validSchemas;
  } catch (error) {
    console.warn(
      "[github] Unexpected error during fetchProjectsWithFallback, using local fallback:",
      error
    );
    return getAllProjectSchemas();
  }
}
