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

  it("keeps both GSC-identified Texas tax 5xx URLs in daily live production verification", () => {
    const source = read("scripts/ci/verify-local-financial-production.mjs");
    const workflow = read(".github/workflows/verify-property-tax-production.yml");
    expect(source).toContain("slug: 'edna'");
    expect(source).toContain("slug: 'jackson-county-esd-1'");
    expect(source).toContain("verifyGscFiveHundredTaxingUnit");
    expect(source).toContain("await runWithConcurrency(gscFiveHundredTaxingUnits, verifyGscFiveHundredTaxingUnit)");
    expect(source).toContain("for (const [target, host] of taxHistoryOrigins)");
    expect(source).toContain("if (hasNoindex(body)) fail(label, 'unexpected robots noindex')");
    expect(workflow).toContain("scripts/ci/verify-local-financial-production.mjs");
    expect(workflow).toContain("cron: '17 10 * * *'");
  });

  it("guards the exported GSC 5xx tax URLs and old partner duplicate query in weekly live verification", () => {
    const source = read("scripts/seo/verify-gsc-priority-indexability.mjs");
    expect(source).toContain('path: "/property-tax/taxing-unit/edna"');
    expect(source).toContain('path: "/property-tax/taxing-unit/jackson-county-esd-1"');
    expect(source).toContain("partnershipType=sports-travel&sourcePath=%2Fsports-venues");
    expect(source).toContain('canonicalPath: "/partner-with-us"');
    expect(source).toContain("target.canonicalPath ?? target.path.split");
    expect(source).toContain("meta.canonicalCount !== 1");
    expect(source).toContain("target.requiredText");
  });

  it("submits only the two source-verified recovered tax unit URLs for Google recrawl without false lastmod", () => {
    const source = read("src/routes/sitemap[.]xml.ts");
    expect(source).toContain('{ path: "/property-tax/taxing-unit/edna" }');
    expect(source).toContain('{ path: "/property-tax/taxing-unit/jackson-county-esd-1" }');
    expect(source).toContain('cacheUrl.searchParams.set("gsc-tax-5xx-recovery", "two-source-verified-tax-units-v1")');
    expect(source).not.toContain('{ path: "/property-tax/taxing-unit/edna", lastmod:');
    expect(source).not.toContain('{ path: "/property-tax/taxing-unit/jackson-county-esd-1", lastmod:');
  });

  it("fails the daily postdeploy tax verifier if either corrected 5xx page is missing from live XML", () => {
    const source = read("scripts/ci/verify-local-financial-production.mjs");
    expect(source).toContain("const gscRecoveryPaths = gscFiveHundredTaxingUnits.map");
    expect(source).toContain("if (TAX_ONLY)");
    expect(source).toContain("'<loc>' + origin + path + '</loc>'");
    expect(source).toContain("fail('gsc-5xx-sitemap',");
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
