import fs from "node:fs";

const failures = [];
const read = (file) => fs.readFileSync(file, "utf8");
const required = [
  "src/data/fishing/guide-routing.ts",
  "src/data/fishing/guide-directory-data.server.ts",
  "src/data/fishing/guide-directory-data.functions.ts",
  "src/data/fishing/guide-profile-data.server.ts",
  "src/data/fishing/guide-profile-data.functions.ts",
  "src/data/fishing/guide-sitemap.server.ts",
  "src/components/fishing/FishingGuideDirectory.tsx",
  "src/components/fishing/FishingGuideProfile.tsx",
  "src/routes/fishing.guides.tsx",
  "src/routes/fishing.guides.$slug.tsx",
];
for (const file of required) if (!fs.existsSync(file)) failures.push(`Missing Batch 6 fishing-guide file: ${file}`);

if (!failures.length) {
  const repositories = read("src/data/fishing/repositories.ts");
  const queries = read("src/data/fishing/queries.ts");
  const validation = read("src/data/fishing/validation.ts");
  const directoryServer = read("src/data/fishing/guide-directory-data.server.ts");
  const directoryFunctions = read("src/data/fishing/guide-directory-data.functions.ts");
  const profileServer = read("src/data/fishing/guide-profile-data.server.ts");
  const profileFunctions = read("src/data/fishing/guide-profile-data.functions.ts");
  const directoryUi = read("src/components/fishing/FishingGuideDirectory.tsx");
  const profileUi = read("src/components/fishing/FishingGuideProfile.tsx");
  const directoryRoute = read("src/routes/fishing.guides.tsx");
  const profileRoute = read("src/routes/fishing.guides.$slug.tsx");
  const routing = read("src/data/fishing/guide-routing.ts");
  const search = read("src/data/fishing/search.ts");
  const internalLinks = read("src/data/fishing/internal-links.ts");
  const sitemap = read("src/data/fishing/sitemap.ts");
  const guideSitemap = read("src/data/fishing/guide-sitemap.server.ts");
  const primarySitemap = read("src/routes/sitemap[.]xml.ts");
  const publicRoutes = read("src/lib/public-routes.ts");
  const fishingHub = read("src/routes/fishing.tsx");

  // Verified-listing enforcement is intentionally redundant across repository, public query, server and sitemap surfaces.
  if (!repositories.includes("verifiedListing?: boolean") || !repositories.includes("row.verifiedListing === query.verifiedListing")) failures.push("Fishing guide repository cannot enforce verified listings.");
  if (!queries.includes("verifiedListing: true") || !queries.includes('row?.status === "published" && row.verifiedListing')) failures.push("Public guide queries do not enforce verified-only listings.");
  if (!directoryServer.includes("verifiedListing: true") || !profileServer.includes('guide.status !== "published" || !guide.verifiedListing')) failures.push("Guide directory/profile server gate is incomplete.");
  if (!guideSitemap.includes("verifiedListing: true") || !search.includes("verifiedListing: true") || !internalLinks.includes("verifiedListing: true")) failures.push("Unverified guides could leak into sitemap, search or internal-link discovery.");

  // No guide identities or commercial facts may be fabricated inside page-data infrastructure.
  for (const [label, source] of [["directory server", directoryServer], ["profile server", profileServer]]) {
    for (const forbidden of ["businessName:", "guideName:", "startingPriceCents:", "boatDescription:", "bookingUrl:", "phone:"]) if (source.includes(forbidden)) failures.push(`${label} contains hard-coded guide profile data: ${forbidden}`);
  }
  if (!directoryUi.includes("does not create placeholder guide identities") || !directoryUi.includes("No fishing guide has cleared the statewide verified-listing gate yet")) failures.push("Honest zero-guide state or anti-fabrication disclosure missing.");
  if (!profileUi.includes("Missing details stay missing until they are verified") || !profileUi.includes("guide.startingPriceCents !== undefined")) failures.push("Guide profile optional-fact rendering is not protected.");

  // Relationship integrity must be first-class, source-backed and bidirectionally consistent for verified guides.
  for (const signal of ["guideLakes:", "guideSpecies:", "GuideLakeRelationship", "GuideSpeciesRelationship"]) if (!repositories.includes(signal)) failures.push(`Guide relationship repository contract missing: ${signal}`);
  for (const signal of ["verified-guide-lake-relationship", "verified-guide-species-relationship", "verified-guide-lake-mismatch", "verified-guide-species-mismatch"]) if (!validation.includes(signal)) failures.push(`Verified guide relationship validation missing: ${signal}`);
  if (!directoryServer.includes("guideLakes.filter") || !directoryServer.includes("guideSpecies.filter") || !profileServer.includes("fishingPlatform.guideLakes.list") || !profileServer.includes("fishingPlatform.guideSpecies.list")) failures.push("Guide pages are not using guide-to-lake and guide-to-species relationships.");
  if (!directoryUi.includes('fishingFoundationAnchor("lake"') || !directoryUi.includes('fishingFoundationAnchor("species"') || !profileUi.includes('fishingFoundationAnchor("lake"') || !profileUi.includes('fishingFoundationAnchor("species"')) failures.push("Guide listings are not connected to canonical lake/species pages.");

  // Canonical routes, crawl governance and search discovery.
  if (!routing.includes('FISHING_GUIDES_DIRECTORY_PATH = "/fishing/guides"') || !routing.includes("fishingGuideCanonicalPath") || !routing.includes("assertCanonicalFishingSlug")) failures.push("Canonical fishing-guide routing contract incomplete.");
  if (!directoryRoute.includes('createFileRoute("/fishing/guides")') || !profileRoute.includes('createFileRoute("/fishing/guides/$slug")')) failures.push("Fishing guide route files are incomplete.");
  if (!directoryRoute.includes("canonicalLink") || !profileRoute.includes("canonicalLink") || !profileRoute.includes("canonicalPath")) failures.push("Fishing guide canonical metadata missing.");
  if (!publicRoutes.includes('"/fishing/guides"')) failures.push("Fishing guide directory missing public-route governance.");
  if (!search.includes("fishing-directory:texas-fishing-guides") || !search.includes("fishingGuideCanonicalPath(guide.slug)")) failures.push("Global search discovery missing canonical guide routes.");
  if (!internalLinks.includes("fishingGuideCanonicalPath(guide.slug)")) failures.push("Guide internal-link discovery is not canonical.");
  if (!fishingHub.includes('to="/fishing/guides"')) failures.push("Fishing hub does not discover the guide directory.");

  // Sponsorship is disclosed and isolated from editorial ordering.
  if (!directoryServer.includes("editorialOrder") || !directoryServer.includes("businessName.localeCompare") || !directoryServer.includes("sponsoredPlacements")) failures.push("Editorial ordering and sponsored placement separation missing.");
  if (!directoryUi.includes("Sponsorship never changes this order") && !directoryUi.includes("sponsorship never changes this order")) failures.push("Directory editorial independence disclosure missing.");
  for (const source of [directoryUi, profileUi]) {
    if (!source.includes("Sponsored placement") || !source.includes('rel="noopener sponsored"')) failures.push("Sponsored guide placement disclosure/link attributes missing.");
  }
  if (!profileUi.includes("Sponsorship cannot change this profile’s editorial treatment")) failures.push("Guide profile editorial-independence disclosure missing.");
  if (!validation.includes('placement.disclosure !== "sponsored"')) failures.push("Runtime fishing placement disclosure validation missing.");

  // Submission/claim/update and filter behavior.
  for (const phrase of ["Submit, claim or update a listing", "new submission", "claim of an existing profile", "update"]) if (!directoryUi.includes(phrase)) failures.push(`Guide recruitment process missing: ${phrase}`);
  for (const filter of ['name="lake"', 'name="region"', 'name="species"', 'name="trip"']) if (!directoryUi.includes(filter)) failures.push(`Guide directory filter missing: ${filter}`);
  if (!directoryUi.includes("Trip type") || !directoryUi.includes("Available when verified")) failures.push("Trip-type filter must remain honest when the model has no verified trip-type data.");

  // Structured data and sitemap coverage include directory now and verified profiles dynamically.
  for (const schema of ['"@type": "CollectionPage"', '"@type": "ItemList"', '"@type": "BreadcrumbList"']) if (!directoryRoute.includes(schema)) failures.push(`Guide directory schema missing: ${schema}`);
  for (const schema of ['"@type": "WebPage"', '"@type": "ProfessionalService"', '"@type": "BreadcrumbList"']) if (!profileRoute.includes(schema)) failures.push(`Guide profile schema missing: ${schema}`);
  if (!sitemap.includes("FISHING_GUIDES_DIRECTORY_PATH") || !guideSitemap.includes("fishingGuideCanonicalPath") || !primarySitemap.includes("loadFishingGuideSitemapEntriesServer") || !primarySitemap.includes("...fishingGuideSitemapEntries")) failures.push("Fishing guide sitemap coverage incomplete.");

  // Server/client boundaries: fixture/repository data stays behind page-data/server-function contracts.
  if (!directoryFunctions.includes("createServerFn") || !profileFunctions.includes("createServerFn") || !profileFunctions.includes("inputValidator")) failures.push("Fishing guide server-function boundary incomplete.");
  for (const [label, source] of [["directory UI", directoryUi], ["profile UI", profileUi], ["directory route", directoryRoute], ["profile route", profileRoute]]) {
    if (source.includes('from "@/data/fishing/index"') || source.includes("fixtures") || source.includes("repositories")) failures.push(`${label} crosses the fishing data client/server boundary.`);
  }
}

if (failures.length) {
  console.error("Fishing Batch 6 guide platform validation failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Fishing Batch 6 guide validation passed: verified-only directory/profile publishing, anti-fabrication rules, relationship integrity, canonical discovery, sponsorship/editorial separation, structured data, sitemap coverage and client/server boundaries are protected.");
