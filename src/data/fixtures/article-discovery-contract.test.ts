import fs from "node:fs";
import { describe, expect, it } from "vitest";

const read = (relative: string) => fs.readFileSync(new URL(relative, import.meta.url), "utf8");
const rss = read("../../routes/rss[.]xml.ts");
const sitemap = read("../../routes/sitemap[.]xml.ts");
const queries = read("../queries.ts");
const homepage = read("../../routes/index.lazy.tsx");

describe("AdSense-safe editorial discovery", () => {
  it("uses the shared readiness floor in RSS and sitemap discovery", () => {
    expect(rss).toContain('isArticleIndexReady');
    expect(rss).toContain('!isLegacyCountySeriesArticle(article.slug) && isArticleIndexReady(article)');
    expect(sitemap).toContain('.filter(isArticleIndexReady)');
    expect(sitemap).toContain('!isLegacyCountySeriesArticle(article.slug) && isArticleIndexReady(article)');
  });

  it("keeps unready articles out of normal listings and internal search", () => {
    expect(queries).toContain('.map(prepareEditorialArticle)\n    .filter(isArticleIndexReady)');
    expect(queries).toContain('document.kind !== "article" || indexableArticleHrefs.has(document.href)');
  });

  it("keeps the homepage within TexasDefined's Texas editorial boundary", () => {
    expect(homepage).not.toContain('DollyPartonTribute');
  });
});
