import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { canonicalEntityPath } from "../src/data/knowledge-graph/relationships";
import { CURATED_KNOWLEDGE_GRAPH_SEED } from "../src/data/knowledge-graph/seed";

const serverSource = readFileSync(new URL("../src/server.ts", import.meta.url), "utf8");

const expectedDestinationOwners = new Map([
  ["lake:caddo-lake", "/destination/caddo-lake"],
  ["state-park:palo-duro-canyon-state-park", "/destination/palo-duro-canyon-state-park"],
  ["state-park:enchanted-rock-state-natural-area", "/destination/enchanted-rock-state-natural-area"],
  ["national-park:big-bend-national-park", "/destination/big-bend-national-park"],
  ["cavern:natural-bridge-caverns", "/destination/natural-bridge-caverns"],
  ["beach:padre-island-national-seashore", "/destination/padre-island-national-seashore"],
  ["historic-site:the-alamo", "/destination/the-alamo"],
]);

describe("knowledge-graph canonical redirects", () => {
  it("keeps canonical ownership limited to the seven known destination mirrors", () => {
    for (const [id, expectedPath] of expectedDestinationOwners) {
      const entity = CURATED_KNOWLEDGE_GRAPH_SEED.find((candidate) => candidate.id === id);
      expect(entity, `missing curated entity ${id}`).toBeDefined();
      expect(canonicalEntityPath(entity!)).toBe(expectedPath);
    }

    expect(canonicalEntityPath({
      kind: "national-forest",
      slug: "sam-houston-national-forest",
      sourceId: "explore-shared-catalog",
    })).toBe("/national-forest/sam-houston-national-forest");
    expect(canonicalEntityPath({ kind: "state-park", slug: "not-a-known-owner" }))
      .toBe("/state-park/not-a-known-owner");
  });

  it("protects the request-time redirects for every exact mirror plus the NRG alias", () => {
    const redirects = [
      ["/lake/caddo-lake", "/destination/caddo-lake"],
      ["/state-park/palo-duro-canyon-state-park", "/destination/palo-duro-canyon-state-park"],
      ["/state-park/enchanted-rock-state-natural-area", "/destination/enchanted-rock-state-natural-area"],
      ["/national-park/big-bend-national-park", "/destination/big-bend-national-park"],
      ["/cavern/natural-bridge-caverns", "/destination/natural-bridge-caverns"],
      ["/beach/padre-island-national-seashore", "/destination/padre-island-national-seashore"],
      ["/historic-site/the-alamo", "/destination/the-alamo"],
      ["/sports-venue/nrg-stadium", "/sports-venue/reliant-stadium"],
    ];

    for (const [from, to] of redirects) {
      expect(serverSource).toContain(`"${from}": "${to}"`);
    }
  });

  it("limits canonical entity redirects to safe navigation requests and preserves query strings", () => {
    expect(serverSource).toContain('request.method !== "GET" && request.method !== "HEAD"');
    expect(serverSource).toContain('url.pathname.replace(/\\/+$/, "").toLowerCase()');
    expect(serverSource).toContain('url.hostname = "texasdefined.com"');
    expect(serverSource).toContain("url.pathname = canonicalPath;");
    expect(serverSource).toContain("Response.redirect(url.toString(), 301)");
  });
});