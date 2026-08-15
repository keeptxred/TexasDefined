import fs from "node:fs";

const failures = [];
const read = (file) => fs.readFileSync(file, "utf8");
const required = [
  "src/data/fishing/species-catalog.ts",
  "src/data/fishing/species-profiles.ts",
  "src/data/fishing/species-routing.ts",
  "src/data/fishing/species-directory-data.server.ts",
  "src/data/fishing/species-directory-data.functions.ts",
  "src/data/fishing/species-guide-data.server.ts",
  "src/data/fishing/species-guide-data.functions.ts",
  "src/data/fishing/largemouth-bass-page-data.server.ts",
  "src/data/fishing/largemouth-bass-page-data.functions.ts",
  "src/components/fishing/FishSpeciesDirectory.tsx",
  "src/components/fishing/FishSpeciesGuide.tsx",
  "src/components/fishing/FishingSpeciesProfile.tsx",
  "src/components/fishing/FishingHub.tsx",
  "src/routes/fishing.species.tsx",
  "src/routes/fishing.species.$slug.tsx",
  "src/routes/fishing.species.$slug.lazy.tsx",
  "src/routes/fishing.species.largemouth-bass.tsx",
  "src/routes/fishing.species.largemouth-bass.lazy.tsx",
  "src/routes/fishing.tsx",
];
for (const file of required) if (!fs.existsSync(file)) failures.push(`Missing fishing species file: ${file}`);

if (!failures.length) {
  const catalog = read("src/data/fishing/species-catalog.ts");
  const foundation = read("src/data/fishing/fixtures.ts");
  const index = read("src/data/fishing/index.ts");
  const profiles = read("src/data/fishing/species-profiles.ts");
  const routing = read("src/data/fishing/species-routing.ts");
  const slugs = read("src/data/fishing/slugs.ts");
  const directoryServer = read("src/data/fishing/species-directory-data.server.ts");
  const directoryFunctions = read("src/data/fishing/species-directory-data.functions.ts");
  const speciesServer = read("src/data/fishing/species-guide-data.server.ts");
  const speciesFunctions = read("src/data/fishing/species-guide-data.functions.ts");
  const bassServer = read("src/data/fishing/largemouth-bass-page-data.server.ts");
  const bassFunctions = read("src/data/fishing/largemouth-bass-page-data.functions.ts");
  const directoryUi = read("src/components/fishing/FishSpeciesDirectory.tsx");
  const bassUi = read("src/components/fishing/FishSpeciesGuide.tsx");
  const speciesUi = read("src/components/fishing/FishingSpeciesProfile.tsx");
  const hubUi = read("src/components/fishing/FishingHub.tsx");
  const directoryRoute = read("src/routes/fishing.species.tsx");
  const speciesRoute = read("src/routes/fishing.species.$slug.tsx");
  const speciesLazy = read("src/routes/fishing.species.$slug.lazy.tsx");
  const bassRoute = read("src/routes/fishing.species.largemouth-bass.tsx");
  const bassLazy = read("src/routes/fishing.species.largemouth-bass.lazy.tsx");
  const fishingRoute = read("src/routes/fishing.tsx");
  const search = read("src/data/fishing/search.ts");
  const internalLinks = read("src/data/fishing/internal-links.ts");
  const sitemap = read("src/data/fishing/sitemap.ts");
  const publicRoutes = read("src/lib/public-routes.ts");

  const speciesSources = `${foundation}\n${catalog}`;
  for (const slug of [
    "largemouth-bass", "smallmouth-bass", "guadalupe-bass", "white-bass", "striped-bass", "hybrid-striped-bass",
    "black-crappie", "white-crappie", "blue-catfish", "channel-catfish", "flathead-catfish", "alligator-gar",
    "freshwater-drum", "sunfish", "rainbow-trout",
  ]) if (!speciesSources.includes(`"${slug}"`)) failures.push(`Priority Texas freshwater species missing: ${slug}`);

  for (const family of ["black-bass", "temperate-bass", "crappie", "catfish", "gar-drum", "sunfish", "trout"]) {
    if (!catalog.includes(`id: "${family}"`)) failures.push(`Fishing species family missing: ${family}`);
  }
  if (!catalog.includes("texasFreshwaterFishSpecies") || !catalog.includes("foundationFishSpecies")) failures.push("Statewide species catalog does not preserve foundation species while extending taxonomy.");
  if (!index.includes("texasFreshwaterFishSpecies") || !index.includes("assertValidFishingCatalog")) failures.push("Fishing platform binding does not validate the merged statewide species catalog.");

  for (const signal of ["FISHING_SPECIES_DIRECTORY_PATH", "FISHING_SPECIES_VERIFIED_AT", "fishingSpeciesCanonicalPath"]) {
    if (!routing.includes(signal)) failures.push(`Species routing contract missing: ${signal}`);
  }
  for (const signal of ["COMPLETE_FISHING_SPECIES_SLUGS", '"largemouth-bass"', '"smallmouth-bass"', '"crappie"', '"catfish"', '"blue-catfish"', '"channel-catfish"', '"white-bass"', '"striped-bass"', '"hybrid-striped-bass"']) {
    if (!slugs.includes(signal)) failures.push(`Complete species routing gate missing: ${signal}`);
  }
  if (!slugs.includes('isCompleteFishingSpeciesSlug(canonicalSlug)') || !slugs.includes('/fishing/species#species-')) failures.push("Species canonical/detail-versus-directory anchor policy is broken.");
  if (!fishingRoute.includes('lazy(() => import("@/components/fishing/FishingHub")')) failures.push("Fishing hub lazy boundary is missing.");
  if (!hubUi.includes('to="/fishing/species"') || !hubUi.includes('fishingFoundationAnchor("species", row.slug)')) failures.push("Fishing hub does not discover the species directory and canonical species targets.");
  if (!search.includes('fishingFoundationAnchor("species", row.slug)')) failures.push("Global fishing search does not use canonical species targets.");
  if (!internalLinks.includes('fishingFoundationAnchor("species", row.slug)')) failures.push("Fishing internal linking does not use canonical species targets.");

  for (const signal of ["overview", "texasDistribution", "habitat", "seasonalBehavior", "techniqueIds", "tackle", "baitsAndLures", "relatedSpeciesSlugs", "articleLinks", "rankingMethod", "regulationNote", "regulationSource"]) {
    if (!profiles.includes(`${signal}:`)) failures.push(`Largemouth editorial profile missing: ${signal}`);
  }
  for (const season of ["spring", "summer", "fall", "winter"]) if (!profiles.includes(`season: "${season}"`)) failures.push(`Largemouth seasonal guide missing: ${season}`);
  for (const technique of ["soft-plastics", "crankbaits", "spinnerbaits", "topwater"]) if (!profiles.includes(`"${technique}"`)) failures.push(`Largemouth technique missing: ${technique}`);
  if (!profiles.includes("not paid placement") || !profiles.includes("does not freeze a bag or length limit")) failures.push("Editorial ranking/regulation integrity copy is missing.");

  if (!directoryServer.includes("fishingPlatform.species.list") || !directoryServer.includes("fishSpeciesFamilies") || !directoryServer.includes("isCompleteFishingSpeciesSlug")) failures.push("Species directory is not server-built from the fishing repository, taxonomy and completion gate.");
  if (!directoryFunctions.includes("createServerFn") || !directoryFunctions.includes("loadFishSpeciesDirectoryDataServer")) failures.push("Species directory server-function boundary missing.");
  if (!speciesFunctions.includes("createServerFn") || !speciesFunctions.includes("loadFishingSpeciesProfileServer")) failures.push("General species profile server-function boundary missing.");
  if (!bassFunctions.includes("createServerFn") || !bassFunctions.includes("loadLargemouthBassPageDataServer")) failures.push("Largemouth server-function boundary missing.");

  for (const signal of ["isCompleteFishingSpeciesSlug", "isCompleteFishingLakeSlug", "lakeSpecies", "lakeTechniques", "buildFishingSpeciesProfileHead", "citation:", "Lake order is alphabetical", "not a live bite report"]) {
    if (!speciesServer.includes(signal)) failures.push(`General species publication/server-head contract missing: ${signal}`);
  }
  if (!speciesRoute.includes('createFileRoute("/fishing/species/$slug")') || !speciesRoute.includes("throw notFound()") || !speciesRoute.includes("loaderData?.head")) failures.push("General species critical route is incomplete.");
  if (!speciesLazy.includes('createLazyFileRoute("/fishing/species/$slug")') || !speciesLazy.includes("FishingSpeciesProfile data={Route.useLoaderData()}")) failures.push("General species UI is not protected by a native lazy route.");
  if (speciesRoute.includes("FishingSpeciesProfile") || speciesRoute.includes("buildMeta") || speciesRoute.includes('"@type":')) failures.push("General species UI or SEO payload leaked into the critical route.");
  if (!speciesUi.includes("Complete-lake relationships, not a statewide popularity ranking") || !speciesUi.includes("Durable planning context, not today's bite")) failures.push("General species source/conditions integrity copy is missing.");

  for (const signal of ["qualityScore", "prominenceScore", "rankedLakes", "verifiedListing", "sponsoredPlacements", "buildLargemouthBassHead"]) if (!bassServer.includes(signal)) failures.push(`Largemouth ranking/guide/sponsorship/server-head contract missing: ${signal}`);
  if (/score[^\n]{0,120}(?:placement|priority)|(?:placement|priority)[^\n]{0,120}score/i.test(bassServer)) failures.push("Sponsored placement or placement priority appears to influence editorial lake ranking.");
  if (!bassServer.includes('fishingPlatform.placements.list') || !bassServer.includes('fishingPlatform.guides.list')) failures.push("Largemouth page does not source sponsorship/guide records through platform repositories.");

  if (directoryUi.includes("species-catalog") || bassUi.includes("species-catalog") || bassUi.includes("fixtures") || speciesUi.includes("fixtures")) failures.push("Client species UI imports heavyweight catalog/fixture data instead of server page data.");
  if (!directoryUi.includes("pageData.groups") || !bassUi.includes("rankedLakes") || !bassUi.includes("profile.seasonalBehavior")) failures.push("Species UI is not hydrated from reusable server view models.");
  if (!bassUi.includes("No largemouth-bass guide has cleared") || !bassUi.includes("do not fabricate or scrape")) failures.push("Verified-guide empty-state integrity copy missing.");
  if (!bassUi.includes("Sponsored placement") || !bassUi.includes("noopener sponsored")) failures.push("Species sponsorship disclosure/link contract missing.");

  if (!directoryRoute.includes('createFileRoute("/fishing/species")') || !directoryRoute.includes('"@type": "CollectionPage"') || !directoryRoute.includes('"@type": "ItemList"') || !directoryRoute.includes('"@type": "BreadcrumbList"')) failures.push("Species directory route/schema incomplete.");
  if (!directoryRoute.includes('lazy(() => import("@/components/fishing/FishSpeciesDirectory")') || !directoryRoute.includes("FishSpeciesDirectory pageData={Route.useLoaderData()}")) failures.push("Species directory UI is not protected by its lazy boundary.");
  if (!bassServer.includes('"@type": "WebPage"') || !bassServer.includes('"@type": "BreadcrumbList"') || !bassServer.includes("dateModified: profile.verifiedAt")) failures.push("Largemouth server schema/freshness metadata incomplete.");
  if (!bassRoute.includes('createFileRoute("/fishing/species/largemouth-bass")') || !bassRoute.includes("loaderData?.head")) failures.push("Largemouth critical route/server-head handoff incomplete.");
  if (!bassLazy.includes('createLazyFileRoute("/fishing/species/largemouth-bass")') || !bassLazy.includes("FishSpeciesGuide pageData={Route.useLoaderData()}")) failures.push("Largemouth guide UI is not protected by a native lazy route.");
  if (bassRoute.includes("FishSpeciesGuide") || bassRoute.includes("buildMeta") || bassRoute.includes('"@type":')) failures.push("Largemouth UI or SEO payload leaked back into the critical route.");
  if (bassServer.includes("wikidata.org")) failures.push("Unverified third-party identity URL must not be emitted in largemouth structured data.");

  if (!sitemap.includes("FISHING_SPECIES_DIRECTORY_PATH") || !sitemap.includes("COMPLETE_FISHING_SPECIES_SLUGS.map") || !sitemap.includes("fishingSpeciesCanonicalPath(slug)")) failures.push("Species directory/complete-guide sitemap publication incomplete.");
  for (const path of ["/fishing/species", "/fishing/species/largemouth-bass"]) if (!publicRoutes.includes(`"${path}"`)) failures.push(`Indexable species route missing from public route governance: ${path}`);

  for (const url of [...`${catalog}\n${profiles}`.matchAll(/url:\s*"([^"]+)"/g)].map((match) => match[1])) {
    if (!url.startsWith("https://")) failures.push(`Fishing species source must use https: ${url}`);
  }
}

if (failures.length) {
  console.error("Fishing species platform validation failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Fishing species platform validation passed: statewide taxonomy, source-gated complete species routing, server-built profiles, native lazy UI boundaries, deep largemouth guidance, sponsorship separation, search/internal links, structured data and sitemap governance are protected.");
