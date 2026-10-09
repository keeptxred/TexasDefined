import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const runtime = readFileSync(new URL("./destination-query-runtime.ts", import.meta.url), "utf8");
const enriched = readFileSync(new URL("./explore-remote.ts", import.meta.url), "utf8");
const core = readFileSync(new URL("./explore-core-remote.ts", import.meta.url), "utf8");

describe("Explore remote catalog request deadlines", () => {
  it("aborts the operation signal when the enclosing request times out", () => {
    expect(runtime).toContain("const controller = new AbortController()");
    expect(runtime).toContain("controller.abort()");
    expect(runtime).toContain('typeof operation === "function" ? operation(controller.signal) : operation');
  });

  it("passes the deadline to both rich and core pagination paths", () => {
    expect(runtime).toContain('(signal) => fetchExploreDestinations({ ...options, signal })');
    expect(runtime).toContain('(signal) => fetchCoreExploreDestinations({ ...options, signal })');
    expect(runtime).toContain('fetchExploreDestinations({ limit: 5000, signal })');
    expect(runtime).toContain('fetchCoreExploreDestinations({ limit: 5000, signal })');
  });

  it("stops extra rich and core page reads after cancellation without breaking coalescing", () => {
    expect(enriched).toContain("signal?: AbortSignal");
    expect(core).toContain("signal?: AbortSignal");
    expect((enriched.match(/options\\.signal\\?\\.throwIfAborted\\(\\)/g) ?? []).length).toBeGreaterThanOrEqual(3);
    expect((core.match(/options\\.signal\\?\\.throwIfAborted\\(\\)/g) ?? []).length).toBeGreaterThanOrEqual(3);
    expect(enriched).toContain('fetchCachedRemoteJsonRows({');
    expect(core).toContain('fetchCachedRemoteJsonRows({');
  });
});
