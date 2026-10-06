import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const exploreSource = readFileSync(new URL("./explore-remote.ts", import.meta.url), "utf8");
const coreSource = readFileSync(new URL("./explore-core-remote.ts", import.meta.url), "utf8");
const graphSource = readFileSync(new URL("./knowledge-graph/explore-adapter.ts", import.meta.url), "utf8");

describe("remote Explore read policy", () => {
  it("keeps remote Explore disabled unless explicitly enabled", () => {
    expect(exploreSource).toContain("VITE_TEXASDEFINED_REMOTE_EXPLORE_ENABLED");
    expect(exploreSource).toContain('String(import.meta.env.VITE_TEXASDEFINED_REMOTE_EXPLORE_ENABLED || "")');
    expect(exploreSource).toContain("return remoteExploreEnabled && Boolean(supabaseUrl && supabaseKey);");
  });

  it("applies the same opt-in to the core/public fallback", () => {
    expect(coreSource).toContain('DESTINATION_FALLBACK_IMAGE, hasExploreRemoteData');
    expect(coreSource.match(/if \(!hasExploreRemoteData\(\)\) return \[\];/g)).toHaveLength(1);
    expect(coreSource.match(/if \(!hasExploreRemoteData\(\)\) return null;/g)).toHaveLength(1);
  });

  it("prevents the knowledge graph from bypassing the remote Explore switch", () => {
    expect(graphSource).toContain("import { hasExploreRemoteData } from '../explore-remote';");
    expect(graphSource).toContain("return hasExploreRemoteData();");
  });
});
