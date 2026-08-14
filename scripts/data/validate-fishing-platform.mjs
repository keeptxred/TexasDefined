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
  "src/routes/fishing.tsx",
];
requiredFiles.forEach(requireFile);

if (!failures.length) {
  const types = read("src/data/fishing/types.ts");
  const fixtures = read("src/data/fishing/fixtures.ts");
  const repositories = read("src/data/fishing/repositories.ts");
  const queries = read("src/data/fishing/queries.ts");
  const search = read("src/data/fishing/search.ts");
  const internalLinks = read("src/data/fishing/internal-links.ts");
  const route = read("src/routes/fishing.tsx");
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

  const nonCanonicalFixtureSlugs = [...fixtures.matchAll(/slug:\s*"([^"]+)"/g)]
    .map((match) => match[1])
    .filter((slug) => !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug));
  if (nonCanonicalFixtureSlugs.length) failures.push(`Noncanonical fixture slugs: ${nonCanonicalFixtureSlugs.join(", ")}`);

  const insecureFishingSources = [...fixtures.matchAll(/url:\s*"([^"]+)"/g)]
    .map((match) => match[1])
    .filter((url) => !url.startsWith("https://"));
  if (insecureFishingSources.length) failures.push(`Fishing sources must use https: ${insecureFishingSources.join(", ")}`);
}

if (failures.length) {
  console.error("Fishing platform validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Fishing platform validation passed: domain model, foundation lakes, relationship types, search/internal-link integration, crawl registration and source contracts are present.");
