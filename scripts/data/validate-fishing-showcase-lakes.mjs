import fs from "node:fs";

const failures = [];
const read = (file) => fs.readFileSync(file, "utf8");
const required = [
  "src/data/fishing/showcase-lake-routing.ts",
  "src/data/fishing/showcase-lakes-prototype.ts",
  "src/data/fishing/showcase-lakes-page-data.server.ts",
  "src/data/fishing/showcase-lakes-page-data.functions.ts",
  "src/components/fishing/ShowcaseLakeGuide.tsx",
  "src/routes/fishing.lakes.$slug.tsx",
  "src/routes/fishing.lakes.$slug.$section.tsx",
];
for (const file of required) if (!fs.existsSync(file)) failures.push(`Missing Batch 5 showcase-lake file: ${file}`);

if (!failures.length) {
  const routing = read("src/data/fishing/showcase-lake-routing.ts");
  const prototypes = read("src/data/fishing/showcase-lakes-prototype.ts");
  const server = read("src/data/fishing/showcase-lakes-page-data.server.ts");
  const functions = read("src/data/fishing/showcase-lakes-page-data.functions.ts");
  const ui = read("src/components/fishing/ShowcaseLakeGuide.tsx");
  const overviewRoute = read("src/routes/fishing.lakes.$slug.tsx");
  const sectionRoute = read("src/routes/fishing.lakes.$slug.$section.tsx");
  const slugs = read("src/data/fishing/slugs.ts");
  const sitemap = read("src/data/fishing/sitemap.ts");
  const fishingRoute = read("src/routes/fishing.tsx");

  for (const slug of ["lake-fork", "sam-rayburn-reservoir", "lake-livingston", "lake-texoma"]) {
    if (!routing.includes(`"${slug}"`)) failures.push(`Showcase routing missing lake: ${slug}`);
    if (!prototypes.includes(`slug: "${slug}"`)) failures.push(`Showcase prototype missing lake: ${slug}`);
    if (!slugs.includes(`"${slug}"`)) failures.push(`Complete lake canonical registry missing: ${slug}`);
  }
  for (const section of ["fish", "access", "boating", "regulations", "camping", "nearby", "reports", "guides"]) {
    if (!routing.includes(`"${section}"`)) failures.push(`Showcase route section missing: ${section}`);
  }

  const identityContracts = [
    ["Lake Fork", "surfaceAcres: 27264", '"Hopkins", "Rains", "Wood"'],
    ["Sam Rayburn Reservoir", "surfaceAcres: 114500", '"Angelina", "Jasper", "Nacogdoches", "Sabine", "San Augustine"'],
    ["Lake Livingston", "surfaceAcres: 90000", '"Polk", "San Jacinto", "Trinity", "Walker"'],
    ["Lake Texoma", "surfaceAcres: 74686", '"Cooke", "Grayson"'],
  ];
  for (const [name, acres, counties] of identityContracts) {
    for (const signal of [name, acres, counties]) if (!prototypes.includes(signal)) failures.push(`${name} identity contract missing: ${signal}`);
  }
  if (!prototypes.includes('stateBorder: ["Texas", "Oklahoma"]')) failures.push("Lake Texoma cross-border identity missing.");

  for (const phrase of [
    "trophy-bass benchmark",
    "excellent year-round largemouth bass, crappie and catfish",
    "white bass and blue-catfish strength",
    "self-sustaining landlocked striped-bass",
  ]) if (!prototypes.includes(phrase)) failures.push(`Distinctive showcase-lake editorial identity missing: ${phrase}`);

  for (const signal of ["identityAngle", "habitat", "fish", "access", "boatingNotes", "regulations", "camping", "nearby", "businessCategories", "reportSnapshot", "sources"]) {
    if (!prototypes.includes(`${signal}:`)) failures.push(`Showcase prototype domain missing: ${signal}`);
  }
  for (const source of ["tpwdLake", "tpwdAccess", "tpwdRegulations", "liveLevel"]) if (!prototypes.includes(`${source}:`)) failures.push(`Every showcase architecture requires source key: ${source}`);
  for (const url of [...prototypes.matchAll(/url:\s*"([^"]+)"/g)].map((match) => match[1])) if (!url.startsWith("https://")) failures.push(`Showcase lake source must use https: ${url}`);

  if (!server.includes("Object.fromEntries") || !server.includes("SHOWCASE_LAKE_SECTION_SLUGS") || !server.includes("showcaseLakePrototypes")) failures.push("Reusable showcase-lake server view model is incomplete.");
  if (!functions.includes("createServerFn") || !functions.includes("loadShowcaseLakesPageDataServer")) failures.push("Showcase-lake server-function boundary missing.");
  if (/^import\s+(?!type\b).*showcase-lakes-prototype/m.test(ui)) failures.push("Showcase lake client UI must not runtime-import the heavyweight prototype catalog.");

  for (const signal of ["Verified local listing", "do not invent businesses", "No TexasDefined current report is published", "verified-listing gate", "scraped names", "Sponsored placement", "Sponsorship policy", "never changes", "noopener sponsored"]) {
    if (!ui.includes(signal)) failures.push(`Showcase guide/report/business/sponsor integrity copy missing: ${signal}`);
  }
  if (!ui.includes('fishingFoundationAnchor("species", fish.id)')) failures.push("Showcase fish sections do not connect to canonical species destinations.");
  if (!ui.includes("Compare the showcase lakes") || !ui.includes("showcaseLakeCanonicalPath")) failures.push("Showcase lakes do not cross-link to each other.");

  for (const routeSource of [overviewRoute, sectionRoute]) {
    if (!routeSource.includes('await import("@/data/fishing/queries")')) failures.push("Showcase route must lazy-load fishing repository queries.");
    if (!routeSource.includes("isShowcaseLakeSlug") || !routeSource.includes("getShowcaseLakesPageData()")) failures.push("Showcase route does not support the reusable four-lake server data.");
    for (const query of ["fishingGuidesQuery", "fishingReportsQuery", "fishingBusinessesQuery", "fishingPlacementsQuery"]) if (!routeSource.includes(query)) failures.push(`Showcase route missing local graph query: ${query}`);
  }
  if (!sectionRoute.includes("isShowcaseLakeSection") || !sectionRoute.includes("showcaseLakeCanonicalPath")) failures.push("Showcase section routing/canonical contract missing.");
  for (const schema of ['"@type": "WebPage"', '"@type": "Reservoir"', '"@type": "BreadcrumbList"', '"@type": "FAQPage"']) if (!overviewRoute.includes(schema)) failures.push(`Showcase overview schema missing: ${schema}`);
  if (!sectionRoute.includes('"@type": "WebPage"') || !sectionRoute.includes('"@type": "BreadcrumbList"')) failures.push("Showcase section schema incomplete.");
  if (!overviewRoute.includes("dateModified: pageData.verifiedAt") || !sectionRoute.includes("dateModified: pageData.verifiedAt")) failures.push("Showcase freshness metadata is not source-backed.");

  if (!slugs.includes("COMPLETE_FISHING_LAKE_SLUGS") || !slugs.includes("isCompleteFishingLakeSlug")) failures.push("Five-lake canonical completion registry missing.");
  if (!fishingRoute.includes("isCompleteFishingLakeSlug") || !fishingRoute.includes('fishingFoundationAnchor("lake", lake.slug)')) failures.push("Fishing hub does not promote all completed showcase lakes.");
  if (!fishingRoute.includes("Five complete lake guides")) failures.push("Fishing hub still describes only Lake Conroe as complete.");

  for (const signal of ["SHOWCASE_LAKE_SLUGS", "SHOWCASE_LAKE_SECTION_SLUGS", "showcaseLakeCanonicalPath"]) if (!sitemap.includes(signal)) failures.push(`Showcase sitemap expansion missing: ${signal}`);

  const potentiallyStaleLimitPatterns = [/\b\d+\s*(?:fish\s*)?per day\b/i, /\b\d+-inch minimum\b/i, /daily bag limit\s*[:=]\s*\d+/i];
  for (const pattern of potentiallyStaleLimitPatterns) if (pattern.test(prototypes)) failures.push(`Showcase evergreen copy freezes a potentially stale exact harvest limit: ${pattern}`);
}

if (failures.length) {
  console.error("Fishing showcase-lake validation failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Fishing showcase-lake validation passed: four source-backed lake destinations, distinct fishery identities, reusable sections, canonical cross-links, guide/report/business integrity, sponsorship separation, structured data and sitemap publication are protected.");
