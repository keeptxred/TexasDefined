import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = process.cwd();
const read = (path: string) => readFileSync(join(ROOT, path), "utf8");

describe("GSC sitemap indexability regressions", () => {
  it("suppresses page-parent canonicals while nested guide, relocation and partner children are active", () => {
    const source = read("src/lib/leaf-only-parent-routes.tsx");

    expect(source).toContain('import { Route as guidesRoute } from "@/routes/guides";');
    expect(source).toContain('import { Route as movingToTexasRoute } from "@/routes/moving-to-texas";');
    expect(source).toContain('import { Route as partnerWithUsRoute } from "@/routes/partner-with-us";');
    expect(source).toMatch(/LEAF_ONLY_PARENT_ROUTES[\s\S]*guidesRoute,/);
    expect(source).toMatch(/LEAF_ONLY_PARENT_ROUTES[\s\S]*movingToTexasRoute,/);
    expect(source).toMatch(/LEAF_ONLY_PARENT_ROUTES[\s\S]*partnerWithUsRoute,/);
    expect(source).toContain("if (!leafMatch || leafMatch.id !== context.match.id) return {};");
  });

  it("keeps relocation tools outside the lazy moving-to-texas page layout", () => {
    expect(existsSync(join(ROOT, "src/routes/moving-to-texas_.tools.tsx"))).toBe(true);
    expect(existsSync(join(ROOT, "src/routes/moving-to-texas.tools.tsx"))).toBe(false);

    const source = read("src/routes/moving-to-texas_.tools.tsx");
    expect(source).toContain("const canonicalPath='/moving-to-texas/tools';");
    expect(source).toContain("Texas relocation tools");
  });

  it("does not serialize empty event filters onto the canonical events URL", () => {
    const source = read("src/routes/events.index.tsx");

    expect(source).toContain("Object.fromEntries(Object.entries(cleaned).filter(([, value]) => Boolean(value)))");
    expect(source).toContain("normalizeEventSearch(search)");
    expect(source).toContain('featured: search.featured ?? ""');
    expect(source).toContain('venue: search.venue ?? ""');
    expect(source).toContain("getMajorEventLandingDirectory({ data: deps.search })");
  });
});
