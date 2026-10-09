import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const core = readFileSync(new URL("./explore-core-remote.ts", import.meta.url), "utf8");
const enriched = readFileSync(new URL("./explore-remote.ts", import.meta.url), "utf8");

describe("bounded Explore catalog pagination", () => {
  it("limits ordinary core requests to the number of destinations needed", () => {
    expect(core).toContain("destinations.length < limit");
    expect(core).toContain("Math.min(PAGE_SIZE, limit - destinations.length)");
    expect(core).toContain('pageParams.set("limit", String(pageSize))');
    expect(core).toContain("if (page.length < pageSize) break");
    expect(core).not.toContain("for (let offset = 0; offset < MAX_REMOTE_DESTINATIONS; offset += PAGE_SIZE)");
  });

  it("keeps scanning ranked core pages only until enough category matches are found", () => {
    expect(core).toContain("const pageSize = options.category ? PAGE_SIZE");
    expect(core).toContain("if (!options.category || destination.category === options.category)");
    expect(core).toContain("return destinations.slice(0, limit)");
  });

  it("stops rich Explore pagination after enough ordered category matches", () => {
    expect(enriched).toContain("matchingRows.length < resultLimit");
    expect(enriched).toContain("page.filter((row) => matchesCategory(row, options.category))");
    expect(enriched).toContain("if (page.length < pageSize) break");
    expect(enriched).toContain("return matchingRows.map(mapRow).slice(0, resultLimit)");
  });
});
