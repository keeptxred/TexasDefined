import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const exploreSource = readFileSync(new URL("./explore-remote.ts", import.meta.url), "utf8");
const policySource = readFileSync(new URL("./explore-remote-policy.ts", import.meta.url), "utf8");
const coreSource = readFileSync(new URL("./explore-core-remote.ts", import.meta.url), "utf8");
const graphSource = readFileSync(new URL("./knowledge-graph/explore-adapter.ts", import.meta.url), "utf8");

describe("remote Explore read policy", () => {
  it("requires an explicit true opt-in and Supabase credentials", () => {
    expect(policySource).toContain('VITE_TEXASDEFINED_REMOTE_EXPLORE_ENABLED === "true"');
    expect(policySource).toContain("VITE_TEXASDEFINED_SUPABASE_URL");
    expect(policySource).toContain("VITE_TEXASDEFINED_SUPABASE_ANON_KEY");
  });

  it("shares the same policy across rich, core, and graph readers", () => {
    expect(exploreSource).toContain('import { hasExploreRemoteData } from "./explore-remote-policy";');
    expect(coreSource).toContain('import { hasExploreRemoteData } from "./explore-remote-policy";');
    expect(graphSource).toContain("import { hasExploreRemoteData } from '../explore-remote-policy';");
    expect(coreSource.match(/if \(!hasExploreRemoteData\(\)\) return \[\];/g)).toHaveLength(1);
    expect(coreSource.match(/if \(!hasExploreRemoteData\(\)\) return null;/g)).toHaveLength(1);
    expect(graphSource).toContain("return hasExploreRemoteData();");
  });

  it("aborts slow rich and core Explore reads on the server", () => {
    expect(exploreSource.match(/AbortSignal\.timeout\(2_500\)/g)).toHaveLength(2);
    expect(coreSource.match(/AbortSignal\.timeout\(2_500\)/g)).toHaveLength(2);
    expect(exploreSource.match(/import\.meta\.env\.SSR/g)?.length).toBeGreaterThanOrEqual(2);
    expect(coreSource.match(/import\.meta\.env\.SSR/g)?.length).toBeGreaterThanOrEqual(2);
  });
});
