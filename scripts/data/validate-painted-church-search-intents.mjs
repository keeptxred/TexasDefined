import fs from "node:fs";

const failures = [];
const read = (path) => fs.readFileSync(path, "utf8");
const exists = (path) => fs.existsSync(path);

const dataPath = "src/data/painted-church-search-guides.ts";
const hubPath = "src/routes/explore.painted-churches.guides.tsx";
const detailPath = "src/routes/explore.painted-churches.guides.$slug.tsx";
const sitemapPath = "src/routes/sitemap-explore[.]xml.ts";

for (const path of [dataPath, hubPath, detailPath, sitemapPath]) {
  if (!exists(path)) failures.push(`Missing Painted Churches search-intent file: ${path}`);
}

if (failures.length === 0) {
  const data = read(dataPath);
  const hub = read(hubPath);
  const detail = read(detailPath);
  const sitemap = read(sitemapPath);

  const guideBlock = data.slice(
    data.indexOf("export const paintedChurchSearchGuides"),
    data.indexOf("export const paintedChurchSearchGuideBySlug"),
  );
  const coverageBlock = data.slice(
    data.indexOf("export const paintedChurchSearchCoverage:"),
    data.indexOf("export const paintedChurchSearchCoverageByGroup"),
  );

  const guideSlugs = [...guideBlock.matchAll(/^\s{4}slug: "([^"]+)"/gm)].map((match) => match[1]);
  const queries = [...coverageBlock.matchAll(/\{ query: "([^"]+)", group: "([^"]+)", canonicalPath: "([^"]+)", coverage: "([^"]+)" \}/g)]
    .map((match) => ({ query: match[1], group: match[2], canonicalPath: match[3], coverage: match[4] }));

  if (guideSlugs.length !== 32) failures.push(`Expected 32 dedicated Painted Churches search guides, found ${guideSlugs.length}.`);
  if (new Set(guideSlugs).size !== guideSlugs.length) failures.push("Dedicated Painted Churches search guide slugs must be unique.");
  if (queries.length !== 50) failures.push(`Expected 50 Painted Churches search intents, found ${queries.length}.`);
  if (new Set(queries.map((item) => item.query)).size !== queries.length) failures.push("Painted Churches search queries must be unique.");

  const expectedGroups = new Map([
    ["specific-churches", 15],
    ["towns-locations", 10],
    ["tours-trip-planning", 13],
    ["history-architecture-culture", 12],
  ]);
  for (const [group, expected] of expectedGroups) {
    const actual = queries.filter((item) => item.group === group).length;
    if (actual !== expected) failures.push(`Expected ${expected} queries in ${group}, found ${actual}.`);
  }

  const dedicatedCoverage = queries.filter((item) => item.coverage === "search-guide");
  if (dedicatedCoverage.length !== 32) failures.push(`Expected 32 search-guide coverage rows, found ${dedicatedCoverage.length}.`);
  for (const item of dedicatedCoverage) {
    const prefix = "/explore/painted-churches/guides/";
    if (!item.canonicalPath.startsWith(prefix)) {
      failures.push(`Dedicated guide query has non-guide canonical path: ${item.query} -> ${item.canonicalPath}`);
      continue;
    }
    const slug = item.canonicalPath.slice(prefix.length);
    if (!guideSlugs.includes(slug)) failures.push(`Coverage row points to missing guide slug: ${item.query} -> ${slug}`);
  }

  for (const token of ["searchIntent:", "quickAnswer:", "sections:", "relatedChurchSlugs:", "relatedPaths:", "faqs:"]) {
    const count = (guideBlock.match(new RegExp(token, "g")) ?? []).length;
    if (count !== 32) failures.push(`Expected 32 ${token} fields, found ${count}.`);
  }

  for (const token of ["50 Popular Questions", "paintedChurchSearchCoverage", "ItemList", "canonical answer"]) {
    if (!hub.includes(token)) failures.push(`Search guide hub missing ${token}.`);
  }
  for (const token of ["FAQPage", '"@type": "Article"', "relatedChurchSlugs", "Primary / controlling sources", "Open verified profile"]) {
    if (!detail.includes(token)) failures.push(`Search guide detail route missing ${token}.`);
  }
  if (!sitemap.includes('import { paintedChurchSearchGuides } from "@/data/painted-church-search-guides"')) failures.push("Explore sitemap is not importing Painted Churches search guides.");
  if (!sitemap.includes('"/explore/painted-churches/guides"')) failures.push("Explore sitemap is missing the search-guide hub.");
  if (!sitemap.includes("paintedChurchSearchGuides.map")) failures.push("Explore sitemap is not emitting dedicated search-guide URLs.");

  const requiredAmbiguousGuides = [
    "st-michael-weimar",
    "st-rose-of-lima-schulenburg",
    "st-john-the-baptist-la-grange",
    "st-stanislaus-plantersville",
    "st-wenceslaus-colony",
    "st-joseph-knippa",
  ];
  for (const slug of requiredAmbiguousGuides) {
    if (!guideSlugs.includes(slug)) failures.push(`Missing verification/disambiguation guide: ${slug}`);
  }
}

if (failures.length) {
  console.error("Painted Churches search-intent validation failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Painted Churches search-intent coverage protected: 50 queries (15 churches, 10 places, 13 planning, 12 history), including 32 dedicated search guides and 18 existing canonical authority pages.");
