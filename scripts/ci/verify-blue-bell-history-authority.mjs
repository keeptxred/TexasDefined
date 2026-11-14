#!/usr/bin/env node
/**
 * Blue Bell historical-accuracy guard. Run on PRs (repository assertions),
 * after protected production deployment, and on the quarterly schedule.
 * Read-only: this verifier must not auto-rewrite facts or touch publication state.
 */
import { readFileSync } from "node:fs";
import assert from "node:assert/strict";

const slug = "blue-bell-ice-cream-brenham-texas-history";
const path = `/article/${slug}`;
const article = readFileSync("src/routes/article.$slug.tsx", "utf8");
const sources = readFileSync("src/data/remote-evergreen-authority-sources.ts", "utf8");
const rights = readFileSync("src/data/heritage-photo-license-links.ts", "utf8");
const author = readFileSync("src/routes/authors.$author.tsx", "utf8");
const fallback = readFileSync("src/data/remote-evergreen-source-fallbacks.ts", "utf8");
const licenseMetadata = readFileSync("src/data/image-rights.ts", "utf8");
assert.ok(article.includes("Modern_Blue_Bell_Creameries_factory_located_in_Brenham"), "Blue Bell image source must load its verified rights");
for (const token of ["Modern_Blue_Bell_Creameries_factory_located_in_Brenham,_Texas.jpg", "© 2008 Larry D. Moore", "https://creativecommons.org/licenses/by/4.0/", "acquireLicensePage"]) {
  assert.ok(licenseMetadata.includes(token), `Verified Blue Bell ImageObject rights missing: ${token}`);
}

for (const [name, content, tokens] of [
  ["article", article, [slug, "BLUE_BELL_SECTION_REFERENCES", "sectionReferences={BLUE_BELL_SECTION_REFERENCES}", "2015 listeria outbreak and recalls", "Federal penalties and what happened in 2020", "Visiting Blue Bell in Brenham"]],
  ["source bibliography", sources, [slug, "tshaonline.org/handbook/entries/blue-bell-creameries", "thc.texas.gov/blog/little-creamery", "archive.cdc.gov/www_cdc_gov/listeria/outbreaks/ice-cream-03-15", "justice.gov/archives/opa/pr/blue-bell-creameries-ordered", "bluebell.com/visit-blue-bell"]],
  ["licensed photograph", rights, [path, "File:Modern_Blue_Bell_Creameries_factory_located_in_Brenham", "creativecommons.org/licenses/by/4.0/"]],
  ["editorial archive", author, ["fetchPublishedTexasDefinedEvergreenArticles({ limit: 200 })", "completeArchive", "article.authorId === author.id"]],
  ["clickable bibliography", fallback, [slug, "const body = hasSourcesSection(article)"]],
]) {
  for (const token of tokens) assert.ok(content.includes(token), `${name} missing: ${token}`);
}
console.log("Blue Bell editorial source, credit, citation and archive guards passed");

if (process.argv.includes("--live")) {
  const origin = "https://texasdefined.com";
  async function getPage(url) {
    const response = await fetch(url, {
      headers: { "user-agent": "TexasDefinedAuthorityVerifier/1.0 (+https://texasdefined.com/about)" },
      signal: AbortSignal.timeout(20000),
    });
    assert.equal(response.status, 200, `${url} returned HTTP ${response.status}`);
    assert.match(response.headers.get("content-type") || "", /text\/html/i, `${url} content type`);
    return await response.text();
  }
  const [page, archive] = await Promise.all([
    getPage(origin + path),
    getPage(origin + "/authors/a-marisol"),
  ]);
  const clean = page.replace(/<[^>]+>/g, " ").replace(/&(?:nbsp|#160);/g, " ").replace(/\s+/g, " ");
  const required = [
    "Blue Bell history at a glance", "A creamery built around Washington County dairies",
    "E. F. Kruse and the change to Blue Bell", "1969", "2015",
    "ten people", "three deaths", "$17.25 million", "$19.35 million",
    "Visiting Blue Bell in Brenham", "1101 South Blue Bell Road",
  ];
  for (const token of required) assert.ok(clean.includes(token), `Live article missing ${token}`);
  for (const uri of [
    "https://www.tshaonline.org/handbook/entries/blue-bell-creameries",
    "https://www.bluebell.com/visit-blue-bell/",
    "https://creativecommons.org/licenses/by/4.0/",
  ]) assert.ok(page.includes(uri), `Live article missing linked source ${uri}`);
  assert.match(page, /rel="canonical"[^>]*blue-bell-ice-cream-brenham-texas-history|blue-bell-ice-cream-brenham-texas-history[^>]*rel="canonical"/);
  assert.ok(!/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(page), "Article is noindex");
  assert.ok(archive.includes(slug), "Food & Culture author archive does not link to the published article");
  assert.ok(page.includes("/authors/a-marisol"), "Article and editorial archive bylines disagree");
  // Production-HTML assertion validates Google's exact four optional ImageObject
  // properties, source URL and visible attribution—not just raw source strings.
  const { assertGscImageRights } = await import("./verify-changed-production-pages.mjs");
  assertGscImageRights(page, path, "quarterly Blue Bell authority verification");
  console.log("Live Blue Bell canonical, historical narrative, sources, CC BY, author archive and indexability passed");
}
