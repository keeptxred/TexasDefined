import { readFileSync } from "node:fs";
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

  it("recovers a timed-out remote sitemap page only with complete bounded half-page reads", () => {
    const source = read("src/data/articles-remote.ts");

    expect(source).toContain('const SITEMAP_PAGE_SIZE = 200');
    expect(source).toContain('async function requestSitemapPageRows(pageParams: URLSearchParams)');
    expect(source).toContain('if (!isTimeout) throw error;');
    expect(source).toContain('const [firstRows, secondRows] = await Promise.all([');
    expect(source).toContain('secondParams.set("offset", String(offset + half))');
    expect(source).toContain('if (firstRows.length < half && secondRows.length > 0)');
    expect(source).toContain('const rows = await requestSitemapPageRows(pageParams);');
    expect(source).toContain('throw new Error(`TexasDefined sitemap article inventory exceeded guarded ${SITEMAP_MAX_ROWS}-row limit`)');
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
