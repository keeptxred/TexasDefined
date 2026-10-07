import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const articleReader = readFileSync(new URL("./articles-remote.ts", import.meta.url), "utf8");
const exploreReader = readFileSync(new URL("./explore-remote.ts", import.meta.url), "utf8");
const coreReader = readFileSync(new URL("./explore-core-remote.ts", import.meta.url), "utf8");
const graphReader = readFileSync(new URL("./knowledge-graph/explore-adapter.ts", import.meta.url), "utf8");
const sharedCache = readFileSync(new URL("./remote-read-cache.server.ts", import.meta.url), "utf8");

describe("shared Supabase remote-read pressure protection", () => {
  it("routes all high-volume SSR readers through the shared coalescing cache", () => {
    for (const source of [articleReader, exploreReader, coreReader, graphReader]) {
      expect(source).toContain("fetchCachedRemoteJsonRows");
      expect(source).toContain("import.meta.env.SSR");
    }
  });

  it("keeps bounded stale-on-error and failure-backoff behavior centralized", () => {
    expect(sharedCache).toContain("REMOTE_READ_TTL_MS");
    expect(sharedCache).toContain("REMOTE_STALE_TTL_MS");
    expect(sharedCache).toContain("REMOTE_FAILURE_BACKOFF_MS");
    expect(sharedCache).toContain("existing?.pending");
    expect(sharedCache).toContain("existing.retryAfter > now");
    expect(sharedCache).toContain("AbortSignal.timeout(options.timeoutMs)");
  });

  it("uses distinct cache namespaces for the shared Supabase families", () => {
    expect(articleReader).toContain('cacheKey: "texasdefined_articles"');
    expect(exploreReader).toContain('cacheKey: "explore_entities"');
    expect(coreReader).toContain('cacheKey: "explore_public_entities"');
    expect(graphReader).toContain("cacheKey: 'explore_graph_entities'");
  });
});
