import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const articlesSource = readFileSync(new URL("./articles-remote.ts", import.meta.url), "utf8");
const exploreSource = readFileSync(new URL("./explore-remote.ts", import.meta.url), "utf8");
const coreExploreSource = readFileSync(new URL("./explore-core-remote.ts", import.meta.url), "utf8");
const graphSource = readFileSync(new URL("./knowledge-graph/explore-adapter.ts", import.meta.url), "utf8");
const cacheSource = readFileSync(new URL("./remote-read-cache.server.ts", import.meta.url), "utf8");

describe("shared remote read protection", () => {
  it("keeps the cache server-only and routes all high-volume SSR readers through it", () => {
    for (const source of [articlesSource, exploreSource, coreExploreSource, graphSource]) {
      expect(source).toContain("if (import.meta.env.SSR)");
      expect(source).toContain("fetchCachedRemoteJsonRows");
    }

    expect(articlesSource).toContain('cacheKey: "texasdefined_articles"');
    expect(exploreSource).toContain('cacheKey: "explore_entities"');
    expect(coreExploreSource).toContain('cacheKey: "explore_public_entities"');
    expect(graphSource).toContain("cacheKey: 'explore_graph_entities'");
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
});
