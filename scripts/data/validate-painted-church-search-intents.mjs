import fs from "node:fs";

const failures = [];
const read = (path) => fs.readFileSync(path, "utf8");
const exists = (path) => fs.existsSync(path);

const dataPath = "src/data/painted-church-search-guides.ts";
const hubPath = "src/routes/explore.painted-churches_.guides.tsx";
const hubLazyPath = "src/routes/explore.painted-churches_.guides.lazy.tsx";
const detailPath = "src/routes/explore.painted-churches_.guides_.$slug.tsx";
const detailLazyPath = "src/routes/explore.painted-churches_.guides_.$slug.lazy.tsx";
const sitemapPath = "src/routes/sitemap-explore[.]xml.ts";
const collectionPath = "src/routes/explore.painted-churches.tsx";
const mapPath = "src/routes/explore.painted-churches.map.tsx";
const profileDossierPath = "src/components/editorial/PaintedChurchResearchDossier.tsx";

for (const path of [dataPath, hubPath, hubLazyPath, detailPath, detailLazyPath, sitemapPath, collectionPath, mapPath, profileDossierPath]) {
  if (!exists(path)) failures.push(`Missing Painted Churches search-intent file: ${path}`);
}

if (failures.length === 0) {
  const data = read(dataPath);
  const hub = `${read(hubPath)}\n${read(hubLazyPath)}`;
  const detail = `${read(detailPath)}\n${read(detailLazyPath)}`;
  const sitemap = read(sitemapPath);
  const collection = read(collectionPath);
  const map = read(mapPath);
  const profileDossier = read(profileDossierPath);

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

  const primaryIntentOwnership = [
    ["Painted churches of Texas map", "/explore/painted-churches/map"],
    ["Self guided painted churches tour", "/explore/painted-churches-plan"],
    ["Schulenburg Texas painted churches", "/explore/painted-churches/guides/schulenburg-texas"],
  ];
  for (const [query, canonicalPath] of primaryIntentOwnership) {
    const row = queries.find((item) => item.query === query);
    if (!row) failures.push(`Primary Painted Churches intent missing coverage row: ${query}`);
    else if (row.canonicalPath !== canonicalPath) failures.push(`Primary Painted Churches intent drifted: ${query} -> ${row.canonicalPath}; expected ${canonicalPath}`);
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

  const schulenburgGuideBlock = guideBlock.slice(
    guideBlock.indexOf('slug: "schulenburg-texas"'),
    guideBlock.indexOf('slug: "flatonia-texas"'),
  );
  for (const token of [
    'label: "Complete statewide Painted Churches guide", path: "/explore/painted-churches"',
    'label: "One-day Schulenburg route planner", path: "/explore/painted-churches-plan"',
    'label: "Painted Churches of Texas map", path: "/explore/painted-churches/map"',
  ]) {
    if (!schulenburgGuideBlock.includes(token)) failures.push(`Schulenburg guide reciprocity missing ${token}.`);
  }

  for (const token of ["50 Popular Questions", "paintedChurchSearchCoverage", "ItemList", "Open the answer"]) {
    if (!hub.includes(token)) failures.push(`Search guide hub missing ${token}.`);
  }
  for (const token of ["FAQPage", '"@type": "Article"', "relatedChurchSlugs", "Primary sources", "Open verified profile"]) {
    if (!detail.includes(token)) failures.push(`Search guide detail route missing ${token}.`);
  }
  if (!sitemap.includes('await import("@/data/painted-church-search-guides")')) failures.push("Explore sitemap is not dynamically loading Painted Churches search guides inside its server handler.");
  if (!sitemap.includes('"/explore/painted-churches/guides"')) failures.push("Explore sitemap is missing the search-guide hub.");
  if (!sitemap.includes("paintedChurchSearchGuides.map")) failures.push("Explore sitemap is not emitting dedicated search-guide URLs.");

  // GSC showed the broad hub continuing to rank for "painted churches of texas map".
  // Keep map intent owned by the dedicated map page and feed it exact-anchor authority
  // from every individual church profile without turning the broad hub into a map page.
  for (const token of [
    'canonicalPath = "/explore/painted-churches/map"',
    'title: "Painted Churches of Texas Map: Statewide Church Locations"',
    'Painted Churches of Texas map and statewide locations.',
  ]) {
    if (!map.includes(token)) failures.push(`Dedicated Painted Churches map intent missing ${token}.`);
  }
  if (!collection.includes('title: "Painted Churches of Texas: Complete Statewide Guide"')) {
    failures.push("Broad Painted Churches hub must retain statewide-guide title ownership instead of absorbing map intent.");
  }
  if (!profileDossier.includes('<Link to="/explore/painted-churches/map" className="border-b border-primary text-primary">Painted Churches of Texas map</Link>')) {
    failures.push("Individual Painted Church profiles must link to the dedicated map with the exact map-intent anchor.");
  }
  if (!sitemap.includes('"/explore/painted-churches/map"')) failures.push("Explore sitemap must retain the dedicated Painted Churches map URL.");

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

console.log("Painted Churches search-intent coverage protected: 50 queries (15 churches, 10 places, 13 planning, 12 history), including 32 dedicated search guides, 18 existing reader-facing guide pages, and dedicated map-intent authority from every church profile.");
