import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const articlesSource = readFileSync(new URL("./articles-remote.ts", import.meta.url), "utf8");
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
    expect(cacheSource).toContain("if (entry.value && entry.staleUntil > Date.now()) return entry.value");
    expect(cacheSource).toContain("signal: AbortSignal.timeout(options.timeoutMs)");
  });
});
