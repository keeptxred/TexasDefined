import fs from "node:fs";

const failures = [];
const read = (file) => fs.readFileSync(file, "utf8");
const required = [
  "src/data/fishing/species-catalog.ts",
  "src/data/fishing/species-profiles.ts",
  "src/data/fishing/species-routing.ts",
  "src/data/fishing/species-directory-data.server.ts",
  "src/data/fishing/species-directory-data.functions.ts",
  "src/data/fishing/largemouth-bass-page-data.server.ts",
  "src/data/fishing/largemouth-bass-page-data.functions.ts",
  "src/components/fishing/FishSpeciesDirectory.tsx",
  "src/components/fishing/FishSpeciesGuide.tsx",
  "src/routes/fishing.species.tsx",
  "src/routes/fishing.species.largemouth-bass.tsx",
];
for (const file of required) if (!fs.existsSync(file)) failures.push(`Missing Batch 4 fishing species file: ${file}`);

if (!failures.length) {
  const catalog = read("src/data/fishing/species-catalog.ts");
  const foundation = read("src/data/fishing/fixtures.ts");
  const index = read("src/data/fishing/index.ts");
  const profiles = read("src/data/fishing/species-profiles.ts");
  const routing = read("src/data/fishing/species-routing.ts");
  const slugs = read("src/data/fishing/slugs.ts");
  const directoryServer = read("src/data/fishing/species-directory-data.server.ts");
  const directoryFunctions = read("src/data/fishing/species-directory-data.functions.ts");
  const bassServer = read("src/data/fishing/largemouth-bass-page-data.server.ts");
  const bassFunctions = read("src/data/fishing/largemouth-bass-page-data.functions.ts");
  const directoryUi = read("src/components/fishing/FishSpeciesDirectory.tsx");
  const bassUi = read("src/components/fishing/FishSpeciesGuide.tsx");
  const directoryRoute = read("src/routes/fishing.species.tsx");
  const bassRoute = read("src/routes/fishing.species.largemouth-bass.tsx");
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
  ]) {
    if (!speciesSources.includes(`"${slug}"`)) failures.push(`Priority Texas freshwater species missing: ${slug}`);
  }

  for (const family of ["black-bass", "temperate-bass", "crappie", "catfish", "gar-drum", "sunfish", "trout"]) {
    if (!catalog.includes(`id: "${family}"`)) failures.push(`Fishing species family missing: ${family}`);
  }
  if (!catalog.includes("texasFreshwaterFishSpecies") || !catalog.includes("foundationFishSpecies")) failures.push("Statewide species catalog does not preserve foundation species while extending taxonomy.");
  if (!index.includes("texasFreshwaterFishSpecies") || !index.includes("assertValidFishingCatalog")) failures.push("Fishing platform binding does not validate the merged statewide species catalog.");

  for (const signal of ["FISHING_SPECIES_DIRECTORY_PATH", "FISHING_SPECIES_VERIFIED_AT", "COMPLETE_FISHING_SPECIES_SLUGS", "fishingSpeciesCanonicalPath"]) {
    if (!routing.includes(signal)) failures.push(`Species routing contract missing: ${signal}`);
  }
  if (!routing.includes('"largemouth-bass"')) failures.push("Largemouth bass is not registered as the complete species prototype.");
  if (!slugs.includes('canonicalSlug === "largemouth-bass"') || !slugs.includes('/fishing/species#species-')) failures.push("Species canonical/detail-versus-directory anchor policy is broken.");
  if (!fishingRoute.includes('to="/fishing/species"') || !fishingRoute.includes('fishingFoundationAnchor("species", row.slug)')) failures.push("Fishing hub does not discover the species directory and canonical species targets.");
  if (!search.includes('fishingFoundationAnchor("species", row.slug)')) failures.push("Global fishing search does not use canonical species targets.");
  if (!internalLinks.includes('fishingFoundationAnchor("species", row.slug)')) failures.push("Fishing internal linking does not use canonical species targets.");

  for (const signal of ["overview", "texasDistribution", "habitat", "seasonalBehavior", "techniqueIds", "tackle", "baitsAndLures", "relatedSpeciesSlugs", "articleLinks", "rankingMethod", "regulationNote", "regulationSource"]) {
    if (!profiles.includes(`${signal}:`)) failures.push(`Largemouth editorial profile missing: ${signal}`);
  }
  for (const season of ["spring", "summer", "fall", "winter"]) if (!profiles.includes(`season: "${season}"`)) failures.push(`Largemouth seasonal guide missing: ${season}`);
  for (const technique of ["soft-plastics", "crankbaits", "spinnerbaits", "topwater"]) if (!profiles.includes(`"${technique}"`)) failures.push(`Largemouth technique missing: ${technique}`);
  if (!profiles.includes("not paid placement") || !profiles.includes("does not freeze a bag or length limit")) failures.push("Editorial ranking/regulation integrity copy is missing.");

  if (!directoryServer.includes("fishingPlatform.species.list") || !directoryServer.includes("fishSpeciesFamilies")) failures.push("Species directory is not server-built from the fishing repository and taxonomy.");
  if (!directoryFunctions.includes("createServerFn") || !directoryFunctions.includes("loadFishSpeciesDirectoryDataServer")) failures.push("Species directory server-function boundary missing.");
  if (!bassFunctions.includes("createServerFn") || !bassFunctions.includes("loadLargemouthBassPageDataServer")) failures.push("Largemouth server-function boundary missing.");

  for (const signal of ["qualityScore", "prominenceScore", "rankedLakes", "verifiedListing", "sponsoredPlacements"]) if (!bassServer.includes(signal)) failures.push(`Largemouth ranking/guide/sponsorship server contract missing: ${signal}`);
  if (/score[^\n]{0,120}(?:placement|priority)|(?:placement|priority)[^\n]{0,120}score/i.test(bassServer)) failures.push("Sponsored placement or placement priority appears to influence editorial lake ranking.");
  if (!bassServer.includes('fishingPlatform.placements.list') || !bassServer.includes('fishingPlatform.guides.list')) failures.push("Largemouth page does not source sponsorship/guide records through platform repositories.");

  if (directoryUi.includes("species-catalog") || bassUi.includes("species-catalog") || bassUi.includes("fixtures")) failures.push("Client species UI imports heavyweight catalog/fixture data instead of server page data.");
  if (!directoryUi.includes("pageData.groups") || !bassUi.includes("rankedLakes") || !bassUi.includes("profile.seasonalBehavior")) failures.push("Species UI is not hydrated from reusable server view models.");
  if (!bassUi.includes("No largemouth-bass guide has cleared") || !bassUi.includes("do not fabricate or scrape")) failures.push("Verified-guide empty-state integrity copy missing.");
  if (!bassUi.includes("Sponsored placement") || !bassUi.includes("noopener sponsored")) failures.push("Species sponsorship disclosure/link contract missing.");

  if (!directoryRoute.includes('createFileRoute("/fishing/species")') || !directoryRoute.includes('"@type": "CollectionPage"') || !directoryRoute.includes('"@type": "ItemList"') || !directoryRoute.includes('"@type": "BreadcrumbList"')) failures.push("Species directory route/schema incomplete.");
  if (!bassRoute.includes('createFileRoute("/fishing/species/largemouth-bass")') || !bassRoute.includes('"@type": "WebPage"') || !bassRoute.includes('"@type": "BreadcrumbList"') || !bassRoute.includes("dateModified: profile?.verifiedAt")) failures.push("Largemouth route/schema/freshness metadata incomplete.");
  if (bassRoute.includes("wikidata.org")) failures.push("Unverified third-party identity URL must not be emitted in largemouth structured data.");

  if (!sitemap.includes("FISHING_SPECIES_DIRECTORY_PATH") || !sitemap.includes('fishingSpeciesCanonicalPath("largemouth-bass")')) failures.push("Species directory/largemouth sitemap publication incomplete.");
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

console.log("Fishing species platform validation passed: statewide taxonomy, canonical directory/detail routing, source-backed largemouth guidance, editorial lake rankings, verified-guide gating, sponsorship disclosure, search/internal links, structured data and sitemap governance are protected.");
