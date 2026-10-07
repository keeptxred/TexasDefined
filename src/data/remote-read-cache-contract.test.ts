import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const articlesSource = readFileSync(new URL("./articles-remote.ts", import.meta.url), "utf8");
const exploreSource = readFileSync(new URL("./explore-remote.ts", import.meta.url), "utf8");
const exploreCoreSource = readFileSync(new URL("./explore-core-remote.ts", import.meta.url), "utf8");
const exploreGraphSource = readFileSync(new URL("./knowledge-graph/explore-adapter.ts", import.meta.url), "utf8");
const cacheSource = readFileSync(new URL("./remote-read-cache.server.ts", import.meta.url), "utf8");

describe("remote article read protection", () => {
  it("keeps the cache server-only and leaves the browser on direct bounded fetches", () => {
    expect(articlesSource).toContain("if (import.meta.env.SSR)");
    expect(articlesSource).toContain('await import("./remote-read-cache.server")');
    expect(articlesSource).toContain('cacheKey: "texasdefined_articles"');
    expect(articlesSource).toContain("signal: AbortSignal.timeout(timeoutMs)");
  });

  it("coalesces repeated reads, serves stale on transient failure, and backs off retries", () => {
    expect(cacheSource).toContain("if (existing?.pending) return existing.pending");
    expect(cacheSource).toContain("REMOTE_READ_TTL_MS = 5 * 60 * 1000");
    expect(cacheSource).toContain("REMOTE_STALE_TTL_MS = 30 * 60 * 1000");
    expect(cacheSource).toContain("REMOTE_FAILURE_BACKOFF_MS = 30 * 1000");
    expect(cacheSource).toContain("MAX_REMOTE_READ_CACHE_ENTRIES = 64");
    expect(cacheSource).toContain("if (entry.value && entry.staleUntil > Date.now()) return entry.value");
    expect(cacheSource).toContain("signal: AbortSignal.timeout(options.timeoutMs)");
  });

  it("routes Explore entity, core, and knowledge-graph SSR reads through the shared pressure guard", () => {
    expect(exploreSource).toContain('await import("./remote-read-cache.server")');
    expect(exploreSource).toContain('cacheKey: "explore_entities"');
    expect(exploreSource).toContain("signal: AbortSignal.timeout(2_500)");

    expect(exploreCoreSource).toContain('await import("./remote-read-cache.server")');
    expect(exploreCoreSource).toContain('cacheKey: "explore_public_entities"');
    expect(exploreCoreSource).toContain("signal: AbortSignal.timeout(2_500)");

    expect(exploreGraphSource).toContain('await import("../remote-read-cache.server")');
    expect(exploreGraphSource).toContain('cacheKey: "explore_knowledge_graph"');
    expect(exploreGraphSource).toContain("signal: AbortSignal.timeout(4_000)");
  });
});
