import fs from "node:fs";

const failures = [];
const read = (file) => fs.readFileSync(file, "utf8");
const required = [
  "src/data/fishing/types.ts", "src/data/fishing/slugs.ts", "src/data/fishing/validation.ts", "src/data/fishing/fixtures.ts",
  "src/data/fishing/repositories.ts", "src/data/fishing/queries.ts", "src/data/fishing/search.ts", "src/data/fishing/internal-links.ts",
  "src/data/fishing/lake-conroe-prototype.ts", "src/data/fishing/lake-conroe-routing.ts", "src/data/fishing/lake-conroe-page-data.server.ts",
  "src/data/fishing/lake-conroe-page-data.functions.ts", "src/data/fishing/sitemap.ts", "src/components/fishing/LakeConroeGuide.tsx",
  "src/routes/fishing.tsx", "src/routes/fishing.lakes.$slug.tsx", "src/routes/fishing.lakes.$slug.$section.tsx",
  "src/routes/fishing.lake.lake-conroe.tsx", "src/routes/lakes.lake-conroe[.]html.tsx",
];
for (const file of required) if (!fs.existsSync(file)) failures.push(`Missing required fishing file: ${file}`);

if (!failures.length) {
  const types = read("src/data/fishing/types.ts");
  const fixtures = read("src/data/fishing/fixtures.ts");
  const slugs = read("src/data/fishing/slugs.ts");
  const prototype = read("src/data/fishing/lake-conroe-prototype.ts");
  const routing = read("src/data/fishing/lake-conroe-routing.ts");
  const server = read("src/data/fishing/lake-conroe-page-data.server.ts");
  const functions = read("src/data/fishing/lake-conroe-page-data.functions.ts");
  const sitemap = read("src/data/fishing/sitemap.ts");
  const primarySitemap = read("src/routes/sitemap[.]xml.ts");
  const ui = read("src/components/fishing/LakeConroeGuide.tsx");
  const overviewRoute = read("src/routes/fishing.lakes.$slug.tsx");
  const sectionRoute = read("src/routes/fishing.lakes.$slug.$section.tsx");
  const fishingRoute = read("src/routes/fishing.tsx");
  const publicRoutes = read("src/lib/public-routes.ts");
  const legacyFishing = read("src/routes/fishing.lake.lake-conroe.tsx");
  const legacyHtml = read("src/routes/lakes.lake-conroe[.]html.tsx");
  const globalQueries = read("src/data/queries.ts");
  const globalSearchRuntime = read("src/data/search-documents-runtime.ts");

  for (const name of ["FishingLake", "FishSpecies", "FishingTechnique", "BoatRamp", "Marina", "FishingAccessSite", "TackleShop", "FishingGuide", "GuideLakeRelationship", "GuideSpeciesRelationship", "FishingReport", "FishingAdvertiser", "FishingPlacement"]) {
    if (!new RegExp(`interface ${name}\\b`).test(types)) failures.push(`Fishing domain type missing: ${name}`);
  }
  for (const slug of ["lake-conroe", "lake-fork", "sam-rayburn-reservoir", "lake-livingston", "lake-texoma"]) if (!fixtures.includes(`slug: "${slug}"`)) failures.push(`Foundation lake missing: ${slug}`);
  if (!fixtures.includes("assertValidFishingCatalog")) failures.push("Fishing fixture runtime validation missing.");
  if (!globalSearchRuntime.includes("buildFishingSearchDocuments")) failures.push("Global fishing search integration missing.");
  if (!globalQueries.includes('await import("./search-documents-runtime")')) failures.push("Global fishing search must remain behind the lazy search-document runtime boundary.");
  if (!slugs.includes('lake: "/fishing/lakes"') || !slugs.includes('isCompleteFishingLakeSlug(canonicalSlug)')) failures.push("Canonical fishing-lake routing is incomplete.");
  if (!fishingRoute.includes('to="/fishing/lakes/lake-conroe"')) failures.push("/fishing does not discover Lake Conroe.");

  for (const value of ["LAKE_CONROE_SLUG", "LAKE_CONROE_VERIFIED_AT", "LAKE_CONROE_SECTION_SLUGS", "lakeConroeCanonicalPath", "isLakeConroeSection"]) if (!routing.includes(value)) failures.push(`Lake Conroe routing contract missing: ${value}`);
  for (const section of ["fish", "access", "boating", "regulations", "camping", "nearby", "reports", "guides"]) if (!routing.includes(`"${section}"`)) failures.push(`Lake Conroe route section missing: ${section}`);
  for (const signal of ["tpwdLake", "tpwdAccess", "tpwdRegulations", "tpwdReport", "twdb", "liveLevel", "sjra", "usfsCagle", "usfsScottsRidge", "usfsStubblefield", "lakeConroeFish", "lakeConroeAccess", "lakeConroeRegulations", "lakeConroeBoatingNotes", "lakeConroeCamping", "lakeConroeNearby", "lakeConroeReportSnapshot"]) if (!prototype.includes(signal)) failures.push(`Lake Conroe source/data contract missing: ${signal}`);
  if (!prototype.includes("surfaceAcres: 20118") || !prototype.includes("impoundedYear: 1973") || !prototype.includes('"Montgomery", "Walker"')) failures.push("Lake Conroe identity facts incomplete.");
  if (!prototype.includes("does not invent one")) failures.push("Lake Conroe maximum-depth uncertainty disclosure missing.");

  for (const field of ["verifiedAt", "sections", "overview", "habitat", "boatingNotes", "reportSnapshot", "sources", "fish", "access", "regulations", "camping", "nearby", "copy"]) if (!server.includes(`${field}:`)) failures.push(`Lake Conroe server payload missing: ${field}`);
  for (const copy of ["No TexasDefined current report is published", "No Lake Conroe guide has cleared the verified-listing gate yet", "Sponsorship policy", "must be labeled as sponsored"]) if (!server.includes(copy)) failures.push(`Protected Lake Conroe copy missing: ${copy}`);
  if (!functions.includes("createServerFn") || !functions.includes("loadLakeConroePageDataServer")) failures.push("Lake Conroe server-function boundary missing.");

  if (ui.includes("lake-conroe-prototype")) failures.push("Lake Conroe client UI must not import the prototype catalog.");
  if (!ui.includes("lake-conroe-routing") || !ui.includes("pageData.sections") || !ui.includes("pageData.copy")) failures.push("Lake Conroe client routing/server hydration contract missing.");
  if (overviewRoute.includes("lake-conroe-prototype") || sectionRoute.includes("lake-conroe-prototype")) failures.push("Lake Conroe client routes must not import the prototype catalog.");
  if (!overviewRoute.includes("getLakeConroePageData()") || !sectionRoute.includes("getLakeConroePageData()")) failures.push("Lake Conroe routes do not hydrate server page data.");
  for (const [label, routeSource] of [["overview", overviewRoute], ["section", sectionRoute]]) {
    if (!routeSource.includes('await import("@/data/fishing/queries")')) failures.push(`Lake Conroe ${label} route must lazy-load fishing queries to protect the main client bundle.`);
    if (/^import\s+\{[^\n]*fishing(?:Guides|Lake|Reports)Query[^\n]*\}\s+from\s+"@\/data\/fishing\/queries";/m.test(routeSource)) failures.push(`Lake Conroe ${label} route must not statically import fishing queries.`);
  }
  if (!overviewRoute.includes('"@type": "Reservoir"') || !overviewRoute.includes('"@type": "BreadcrumbList"') || !sectionRoute.includes('"@type": "BreadcrumbList"')) failures.push("Lake Conroe structured data incomplete.");
  if (!overviewRoute.includes("dateModified: verifiedAt") || !sectionRoute.includes("dateModified: pageData.verifiedAt")) failures.push("Lake Conroe freshness metadata is not source-backed.");

  if (!sitemap.includes("lake-conroe-routing") || !sitemap.includes("FISHING_SITEMAP_ENTRIES") || !primarySitemap.includes("...FISHING_SITEMAP_ENTRIES")) failures.push("Lake Conroe dynamic sitemap publication incomplete.");
  if (publicRoutes.split("export const REDIRECT_ONLY_PATHS")[0].includes('"/fishing/lakes/lake-conroe"')) failures.push("Dynamic Lake Conroe URL incorrectly classified static.");
  for (const [path, source] of [["/fishing/lake/lake-conroe", legacyFishing], ["/lakes/lake-conroe.html", legacyHtml]]) {
    if (!publicRoutes.includes(`"${path}"`) || !source.includes('href: "/fishing/lakes/lake-conroe"') || !source.includes("statusCode: 301")) failures.push(`Legacy Lake Conroe redirect broken: ${path}`);
  }

  for (const url of [...`${fixtures}\n${prototype}`.matchAll(/url:\s*"([^"]+)"/g)].map((match) => match[1])) if (!url.startsWith("https://")) failures.push(`Fishing source must use https: ${url}`);
}

if (failures.length) {
  console.error("Fishing platform validation failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

await import("./validate-fishing-species-platform.mjs");
await import("./validate-fishing-showcase-lakes.mjs");
await import("./validate-fishing-guide-platform.mjs");

console.log("Fishing platform validation passed: foundation contracts, Lake Conroe, Batch 4 species depth, Batch 5 five-lake showcase routing/content, and Batch 6 verified statewide guide directory/profile infrastructure are protected with source-backed data, guide/report integrity, sponsorship separation, structured data, sitemap governance and client bundle boundaries.");
