import fs from "node:fs";

const failures = [];
const read = (file) => fs.readFileSync(file, "utf8");
const requireFile = (file) => {
  if (!fs.existsSync(file)) failures.push(`Missing required fishing platform file: ${file}`);
};

const requiredFiles = [
  "src/data/fishing/types.ts",
  "src/data/fishing/slugs.ts",
  "src/data/fishing/validation.ts",
  "src/data/fishing/fixtures.ts",
  "src/data/fishing/repositories.ts",
  "src/data/fishing/index.ts",
  "src/data/fishing/queries.ts",
  "src/data/fishing/search.ts",
  "src/data/fishing/internal-links.ts",
  "src/data/fishing/lake-conroe-prototype.ts",
  "src/data/fishing/lake-conroe-page-data.server.ts",
  "src/data/fishing/lake-conroe-page-data.functions.ts",
  "src/data/fishing/sitemap.ts",
  "src/components/fishing/LakeConroeGuide.tsx",
  "src/routes/fishing.tsx",
  "src/routes/fishing.lakes.$slug.tsx",
  "src/routes/fishing.lakes.$slug.$section.tsx",
  "src/routes/fishing.lake.lake-conroe.tsx",
  "src/routes/lakes.lake-conroe[.]html.tsx",
];
requiredFiles.forEach(requireFile);

if (!failures.length) {
  const types = read("src/data/fishing/types.ts");
  const fixtures = read("src/data/fishing/fixtures.ts");
  const repositories = read("src/data/fishing/repositories.ts");
  const queries = read("src/data/fishing/queries.ts");
  const search = read("src/data/fishing/search.ts");
  const internalLinks = read("src/data/fishing/internal-links.ts");
  const slugs = read("src/data/fishing/slugs.ts");
  const prototype = read("src/data/fishing/lake-conroe-prototype.ts");
  const pageDataServer = read("src/data/fishing/lake-conroe-page-data.server.ts");
  const pageDataFunctions = read("src/data/fishing/lake-conroe-page-data.functions.ts");
  const fishingSitemap = read("src/data/fishing/sitemap.ts");
  const primarySitemap = read("src/routes/sitemap[.]xml.ts");
  const lakeUi = read("src/components/fishing/LakeConroeGuide.tsx");
  const route = read("src/routes/fishing.tsx");
  const lakeRoute = read("src/routes/fishing.lakes.$slug.tsx");
  const lakeSectionRoute = read("src/routes/fishing.lakes.$slug.$section.tsx");
  const legacyFishingRedirect = read("src/routes/fishing.lake.lake-conroe.tsx");
  const legacyHtmlRedirect = read("src/routes/lakes.lake-conroe[.]html.tsx");
  const publicRoutes = read("src/lib/public-routes.ts");
  const globalQueries = read("src/data/queries.ts");
  const coreTypes = read("src/data/types.ts");

  for (const requiredType of [
    "FishingLake",
    "FishSpecies",
    "FishingTechnique",
    "BoatRamp",
    "Marina",
    "FishingAccessSite",
    "TackleShop",
    "FishingGuide",
    "GuideLakeRelationship",
    "GuideSpeciesRelationship",
    "FishingReport",
    "FishingAdvertiser",
    "FishingPlacement",
  ]) {
    if (!new RegExp(`interface ${requiredType}\\b`).test(types)) failures.push(`Fishing domain type missing: ${requiredType}`);
  }

  for (const slug of ["lake-conroe", "lake-fork", "sam-rayburn-reservoir", "lake-livingston", "lake-texoma"]) {
    if (!fixtures.includes(`slug: "${slug}"`)) failures.push(`Foundation lake fixture missing: ${slug}`);
  }

  if (!fixtures.includes("assertValidFishingCatalog")) failures.push("Fixture catalog is not protected by runtime validation.");
  if (!repositories.includes("createFixtureFishingRepositories")) failures.push("Fixture repository binding is missing.");
  if (!queries.includes("fishingLakesQuery") || !queries.includes("fishingReportsQuery") || !queries.includes("fishingPlacementsQuery")) failures.push("Fishing query surface is incomplete.");
  if (!search.includes("buildFishingSearchDocuments")) failures.push("Fishing search-document builder is missing.");
  if (!internalLinks.includes("buildFishingInternalLinkEntities") || !internalLinks.includes("findFishingInternalLinkEntities")) failures.push("Fishing internal-link entity definitions are incomplete.");
  if (!globalQueries.includes("buildFishingSearchDocuments")) failures.push("Global search does not merge fishing documents.");
  if (!coreTypes.includes('"fishing-lake"') || !coreTypes.includes('"fish-species"')) failures.push("Core SearchDocument kinds do not include fishing entities.");
  if (!publicRoutes.match(/["']\/fishing["']/)) failures.push("/fishing is not registered as a governed public route.");
  if (!route.includes('createFileRoute("/fishing")')) failures.push("/fishing route source is missing.");
  if (!route.includes('canonicalPath: "/fishing"')) failures.push("/fishing canonical metadata is missing.");
  if (!route.includes("Texas Parks & Wildlife Department")) failures.push("/fishing page is missing its source/freshness disclosure.");

  const indexableStaticSection = publicRoutes.split("export const REDIRECT_ONLY_PATHS")[0];
  if (indexableStaticSection.includes('"/fishing/lakes/lake-conroe"')) failures.push("Dynamic Lake Conroe URLs must not be misclassified as static public routes.");
  if (!fishingSitemap.includes("FISHING_SITEMAP_ENTRIES") || !fishingSitemap.includes("LAKE_CONROE_SECTION_SLUGS") || !fishingSitemap.includes("LAKE_CONROE_VERIFIED_AT")) failures.push("Lake Conroe dynamic sitemap entries are incomplete or lack source-backed lastmod.");
  if (!primarySitemap.includes('FISHING_SITEMAP_ENTRIES') || !primarySitemap.includes('...FISHING_SITEMAP_ENTRIES')) failures.push("Primary sitemap does not publish the Lake Conroe dynamic route family.");

  if (!slugs.includes('lake: "/fishing/lakes"')) failures.push("Lake canonical slug helper still points at the legacy singular route.");
  if (!slugs.includes('canonicalSlug === "lake-conroe"')) failures.push("Lake Conroe search/internal-link identity is not promoted to its dedicated route.");
  if (!route.includes('to="/fishing/lakes/lake-conroe"')) failures.push("Statewide fishing page does not discover the complete Lake Conroe guide.");
  if (!lakeRoute.includes('createFileRoute("/fishing/lakes/$slug")')) failures.push("Canonical fishing lake route template is missing.");
  if (!lakeSectionRoute.includes('createFileRoute("/fishing/lakes/$slug/$section")')) failures.push("Canonical fishing lake section route template is missing.");
  if (!lakeRoute.includes('"@type": "Reservoir"') || !lakeRoute.includes('"@type": "BreadcrumbList"')) failures.push("Lake Conroe overview is missing Reservoir/Breadcrumb structured data.");
  if (!lakeRoute.includes("dateModified: LAKE_CONROE_VERIFIED_AT") || !lakeSectionRoute.includes("dateModified: LAKE_CONROE_VERIFIED_AT")) failures.push("Lake Conroe routes do not expose source-backed freshness.");

  for (const section of ["fish", "access", "boating", "regulations", "camping", "nearby", "reports", "guides"]) {
    if (!prototype.includes(`"${section}"`)) failures.push(`Lake Conroe section registry is missing: ${section}`);
  }
  for (const sourceSignal of ["tpwdLake", "tpwdAccess", "tpwdRegulations", "tpwdReport", "twdb", "liveLevel", "sjra", "usfsCagle", "usfsScottsRidge", "usfsStubblefield"]) {
    if (!prototype.includes(`${sourceSignal}:`)) failures.push(`Lake Conroe verified source is missing: ${sourceSignal}`);
  }
  for (const dataSignal of ["lakeConroeFish", "lakeConroeAccess", "lakeConroeRegulations", "lakeConroeBoatingNotes", "lakeConroeCamping", "lakeConroeNearby", "lakeConroeReportSnapshot"]) {
    if (!prototype.includes(`export const ${dataSignal}`)) failures.push(`Lake Conroe prototype data is incomplete: ${dataSignal}`);
  }
  if (!prototype.includes('surfaceAcres: 20118') || !prototype.includes('impoundedYear: 1973') || !prototype.includes('"Montgomery", "Walker"')) failures.push("Lake Conroe identity facts are incomplete.");
  if (!prototype.includes("maximumDepthNote") || !prototype.includes("does not invent one")) failures.push("Lake Conroe maximum-depth uncertainty is not handled explicitly.");

  for (const safetyCopy of ["No TexasDefined current report is published", "No Lake Conroe guide has cleared the verified-listing gate yet", "Sponsorship policy", "must be labeled as sponsored"]) {
    if (!pageDataServer.includes(safetyCopy)) failures.push(`Lake Conroe protected safety/editorial copy is missing: ${safetyCopy}`);
    if (lakeUi.includes(safetyCopy)) failures.push(`Lake Conroe protected copy should be server-hydrated, not duplicated in client JS: ${safetyCopy}`);
  }

  for (const serverField of ["overview", "habitat", "boatingNotes", "reportSnapshot", "sources", "fish", "access", "regulations", "camping", "nearby", "copy"]) {
    if (!pageDataServer.includes(`${serverField}:`)) failures.push(`Lake Conroe server payload is missing: ${serverField}`);
  }
  if (!pageDataFunctions.includes("createServerFn") || !pageDataFunctions.includes("loadLakeConroePageDataServer")) failures.push("Lake Conroe page payload is not protected by a server-function boundary.");
  for (const forbiddenClientImport of ["lakeConroeOverview", "lakeConroeHabitat", "lakeConroeBoatingNotes", "lakeConroeReportSnapshot", "lakeConroeSources", "lakeConroeFish", "lakeConroeAccess", "lakeConroeRegulations", "lakeConroeCamping", "lakeConroeNearby"]) {
    const importBlock = lakeUi.split('from "@/data/fishing/lake-conroe-prototype"')[0];
    if (importBlock.includes(forbiddenClientImport)) failures.push(`Lake Conroe client UI statically imports bulky payload: ${forbiddenClientImport}`);
  }
  if (!lakeUi.includes("pageData.copy")) failures.push("Lake Conroe client UI is not consuming server-hydrated editorial copy.");
  if (!lakeRoute.includes("getLakeConroePageData()") || !lakeSectionRoute.includes("getLakeConroePageData()")) failures.push("Lake Conroe routes do not hydrate the server-side page payload.");
  if (lakeRoute.includes("lakeConroeOverview") || lakeRoute.includes("lakeConroeSources") || lakeSectionRoute.includes("lakeConroeOverview") || lakeSectionRoute.includes("lakeConroeSources")) failures.push("Lake Conroe route metadata statically imports bulky page payload.");

  for (const [legacyPath, source] of [["/fishing/lake/lake-conroe", legacyFishingRedirect], ["/lakes/lake-conroe.html", legacyHtmlRedirect]]) {
    if (!publicRoutes.includes(`"${legacyPath}"`)) failures.push(`Legacy Lake Conroe path is not governed as redirect-only: ${legacyPath}`);
    if (!source.includes('href: "/fishing/lakes/lake-conroe"') || !source.includes("statusCode: 301")) failures.push(`Legacy Lake Conroe route does not permanently redirect: ${legacyPath}`);
  }

  const nonCanonicalFixtureSlugs = [...fixtures.matchAll(/slug:\s*"([^"]+)"/g)]
    .map((match) => match[1])
    .filter((slug) => !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug));
  if (nonCanonicalFixtureSlugs.length) failures.push(`Noncanonical fixture slugs: ${nonCanonicalFixtureSlugs.join(", ")}`);

  const sourceFiles = `${fixtures}\n${prototype}`;
  const insecureFishingSources = [...sourceFiles.matchAll(/url:\s*"([^"]+)"/g)]
    .map((match) => match[1])
    .filter((url) => !url.startsWith("https://"));
  if (insecureFishingSources.length) failures.push(`Fishing sources must use https: ${insecureFishingSources.join(", ")}`);
}

if (failures.length) {
  console.error("Fishing platform validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Fishing platform validation passed: foundation contracts plus the complete Lake Conroe prototype, dynamic sitemap publication, canonical route family, verified-source UX, redirect policy, report freshness, guide verification gates and server-side payload/copy performance boundary are protected.");
