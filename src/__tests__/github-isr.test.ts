import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  fetchProjectsWithFallback,
  GITHUB_GRAPHQL_ENDPOINT,
  GITHUB_CACHE_TAG,
} from "@/lib/github";
import { getAllProjectSchemas } from "@/lib/projects";
import { POST, GET } from "@/app/api/revalidate/route";
import { NextRequest } from "next/server";
import * as nextCache from "next/cache";

describe("GitHub GraphQL API & ISR Integration", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  describe("fetchProjectsWithFallback", () => {
    it("deve retornar o catálogo local diretamente se GITHUB_TOKEN não estiver configurado", async () => {
      delete process.env.GITHUB_TOKEN;
      delete process.env.GH_TOKEN;

      const fetchSpy = vi.spyOn(globalThis, "fetch");

      const projects = await fetchProjectsWithFallback();
      const localSchemas = getAllProjectSchemas();

      expect(fetchSpy).not.toHaveBeenCalled();
      expect(projects).toHaveLength(6);
      expect(projects.map((p) => p.id)).toEqual(localSchemas.map((p) => p.id));
    });

    it("deve buscar via GraphQL no GitHub quando GITHUB_TOKEN estiver presente e validar o retorno", async () => {
      process.env.GITHUB_TOKEN = "ghp_mock_token_12345";
      const localSchemas = getAllProjectSchemas();

      const mockGraphQLResponse = {
        data: {
          user: {
            pinnedItems: {
              nodes: [
                {
                  name: "MineOS",
                  nameWithOwner: "Nubi-Prey/MineOS",
                  isPrivate: false,
                  url: "https://github.com/Nubi-Prey/MineOS",
                  portfolioJson: {
                    text: JSON.stringify(localSchemas[0]),
                  },
                },
              ],
            },
          },
        },
      };

      const fetchMock = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockGraphQLResponse,
      });
      vi.stubGlobal("fetch", fetchMock);

      const projects = await fetchProjectsWithFallback();

      expect(fetchMock).toHaveBeenCalledWith(
        GITHUB_GRAPHQL_ENDPOINT,
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            Authorization: "Bearer ghp_mock_token_12345",
          }),
          next: expect.objectContaining({
            tags: [GITHUB_CACHE_TAG],
          }),
        })
      );
      expect(projects).toHaveLength(1);
      expect(projects[0].id).toBe("mineos");
    });

    it("deve resolver de forma híbrida projetos externos/forks sem portfolio.json remoto utilizando o catálogo local", async () => {
      process.env.GITHUB_TOKEN = "ghp_mock_token_12345";
      const localSchemas = getAllProjectSchemas();
      const mineosSchema = localSchemas.find((s) => s.id === "mineos")!;

      const mockGraphQLResponse = {
        data: {
          user: {
            pinnedItems: {
              nodes: [
                {
                  name: "MineOS",
                  nameWithOwner: "Nubi-Prey/MineOS",
                  isPrivate: false,
                  url: "https://github.com/Nubi-Prey/MineOS",
                  portfolioJson: {
                    text: JSON.stringify(mineosSchema),
                  },
                },
                {
                  name: "black-pc",
                  nameWithOwner: "Nubi-Prey/black-pc",
                  isPrivate: false,
                  url: "https://github.com/Nubi-Prey/black-pc",
                  portfolioJson: null, // Sem portfolio.json remoto para não poluir o fork
                },
              ],
            },
          },
        },
      };

      const fetchMock = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockGraphQLResponse,
      });
      vi.stubGlobal("fetch", fetchMock);

      const projects = await fetchProjectsWithFallback();
      expect(projects).toHaveLength(2);
      expect(projects[0].id).toBe("mineos");
      expect(projects[1].id).toBe("black-pc");
      expect(projects[1].title).toBe("BLACK PC port (Port Linux)");
      expect(projects[1].casing).toBe("Nubi-Prey/black-pc");
    });

    it("deve fazer fallback resiliente para o catálogo local se o GitHub responder com status de erro (ex: 500)", async () => {
      process.env.GITHUB_TOKEN = "ghp_mock_token_12345";

      const fetchMock = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      });
      vi.stubGlobal("fetch", fetchMock);

      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      const projects = await fetchProjectsWithFallback();
      expect(projects).toHaveLength(6);
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining("GraphQL request failed with status 500")
      );
    });

    it("deve fazer fallback resiliente se a resposta contiver erros GraphQL", async () => {
      process.env.GITHUB_TOKEN = "ghp_mock_token_12345";

      const fetchMock = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({
          data: null,
          errors: [{ message: "Rate limit exceeded" }],
        }),
      });
      vi.stubGlobal("fetch", fetchMock);

      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      const projects = await fetchProjectsWithFallback();
      expect(projects).toHaveLength(6);
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining("GraphQL returned errors, using local fallback"),
        expect.anything()
      );
    });

    it("deve ignorar nós com JSON inválido e fazer fallback se nenhum nó for válido", async () => {
      process.env.GITHUB_TOKEN = "ghp_mock_token_12345";

      const fetchMock = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({
          data: {
            user: {
              pinnedItems: {
                nodes: [
                  {
                    name: "CorruptedRepo",
                    nameWithOwner: "Nubi-Prey/CorruptedRepo",
                    isPrivate: false,
                    url: "https://github.com/Nubi-Prey/CorruptedRepo",
                    portfolioJson: {
                      text: "THIS_IS_NOT_VALID_JSON{",
                    },
                  },
                ],
              },
            },
          },
        }),
      });
      vi.stubGlobal("fetch", fetchMock);

      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      const projects = await fetchProjectsWithFallback();
      expect(projects).toHaveLength(6); // Local catalog fallback
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining("None of the pinned repositories yielded a valid Schema v2")
      );
    });
  });

  describe("Route Handler On-Demand Revalidation (/api/revalidate)", () => {
    it("deve retornar status 500 se REVALIDATE_SECRET não estiver configurado no servidor", async () => {
      delete process.env.REVALIDATE_SECRET;

      const req = new NextRequest("http://localhost:3000/api/revalidate?secret=any");
      const res = await POST(req);
      const json = await res.json();

      expect(res.status).toBe(500);
      expect(json.success).toBe(false);
      expect(json.message).toContain("REVALIDATE_SECRET is not configured");
    });

    it("deve rejeitar com 401 requisições sem o segredo ou com segredo incorreto", async () => {
      process.env.REVALIDATE_SECRET = "super-secret-key-42";

      const reqMissing = new NextRequest("http://localhost:3000/api/revalidate");
      const resMissing = await POST(reqMissing);
      expect(resMissing.status).toBe(401);

      const reqWrong = new NextRequest("http://localhost:3000/api/revalidate?secret=wrong");
      const resWrong = await POST(reqWrong);
      expect(resWrong.status).toBe(401);
      const jsonWrong = await resWrong.json();
      expect(jsonWrong.message).toBe("Invalid revalidation secret");
    });

    it("deve revalidar com sucesso quando o segredo for enviado via query param (POST)", async () => {
      process.env.REVALIDATE_SECRET = "super-secret-key-42";

      const req = new NextRequest(
        "http://localhost:3000/api/revalidate?secret=super-secret-key-42"
      );
      const res = await POST(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.revalidated).toBe(true);
      expect(json.tag).toBe(GITHUB_CACHE_TAG);
      expect(nextCache.revalidateTag).toHaveBeenCalledWith(GITHUB_CACHE_TAG, "max");
      expect(nextCache.revalidatePath).toHaveBeenCalledWith("/");
    });

    it("deve revalidar com sucesso quando o segredo for enviado via header x-revalidate-secret (GET)", async () => {
      process.env.REVALIDATE_SECRET = "super-secret-key-42";

      const req = new NextRequest("http://localhost:3000/api/revalidate", {
        headers: {
          "x-revalidate-secret": "super-secret-key-42",
        },
      });
      const res = await GET(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(nextCache.revalidateTag).toHaveBeenCalledWith(GITHUB_CACHE_TAG, "max");
      expect(nextCache.revalidatePath).toHaveBeenCalledWith("/");
    });
  });
});
