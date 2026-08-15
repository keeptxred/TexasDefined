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
  "src/data/fishing/guide-onboarding-contract.ts",
  "src/data/fishing/guide-onboarding.server.ts",
  "src/data/fishing/guide-onboarding.functions.ts",
  "src/components/fishing/FishingGuideDirectory.tsx",
  "src/components/fishing/FishingGuideProfile.tsx",
  "src/components/fishing/FishingGuideOnboardingForm.tsx",
  "src/routes/fishing.guides.tsx",
  "src/routes/fishing.guides.lazy.tsx",
  "src/routes/fishing.guides.$slug.tsx",
  "src/routes/fishing.guides.$slug.lazy.tsx",
  "src/routes/fishing.guides.submit.tsx",
  "src/routes/fishing.guides.submit.lazy.tsx",
];
for (const file of required) if (!fs.existsSync(file)) failures.push(`Missing fishing-guide platform file: ${file}`);

if (!failures.length) {
  const repositories = read("src/data/fishing/repositories.ts");
  const queries = read("src/data/fishing/queries.ts");
  const validation = read("src/data/fishing/validation.ts");
  const directoryServer = read("src/data/fishing/guide-directory-data.server.ts");
  const directoryFunctions = read("src/data/fishing/guide-directory-data.functions.ts");
  const profileServer = read("src/data/fishing/guide-profile-data.server.ts");
  const profileFunctions = read("src/data/fishing/guide-profile-data.functions.ts");
  const onboardingContract = read("src/data/fishing/guide-onboarding-contract.ts");
  const onboardingServer = read("src/data/fishing/guide-onboarding.server.ts");
  const onboardingFunctions = read("src/data/fishing/guide-onboarding.functions.ts");
  const directoryUi = read("src/components/fishing/FishingGuideDirectory.tsx");
  const profileUi = read("src/components/fishing/FishingGuideProfile.tsx");
  const onboardingUi = read("src/components/fishing/FishingGuideOnboardingForm.tsx");
  const directoryRoute = read("src/routes/fishing.guides.tsx");
  const directoryLazy = read("src/routes/fishing.guides.lazy.tsx");
  const profileRoute = read("src/routes/fishing.guides.$slug.tsx");
  const profileLazy = read("src/routes/fishing.guides.$slug.lazy.tsx");
  const submitRoute = read("src/routes/fishing.guides.submit.tsx");
  const submitLazy = read("src/routes/fishing.guides.submit.lazy.tsx");
  const routing = read("src/data/fishing/guide-routing.ts");
  const search = read("src/data/fishing/search.ts");
  const internalLinks = read("src/data/fishing/internal-links.ts");
  const sitemap = read("src/data/fishing/sitemap.ts");
  const guideSitemap = read("src/data/fishing/guide-sitemap.server.ts");
  const primarySitemap = read("src/routes/sitemap[.]xml.ts");
  const publicRoutes = read("src/lib/public-routes.ts");
  const fishingHub = read("src/routes/fishing.tsx");
  const partnerServer = read("src/data/partner-inquiry.server.ts");

  if (!repositories.includes("verifiedListing?: boolean") || !repositories.includes("row.verifiedListing === query.verifiedListing")) failures.push("Fishing guide repository cannot enforce verified listings.");
  if (!queries.includes("verifiedListing: true") || !queries.includes('row?.status === "published" && row.verifiedListing')) failures.push("Public guide queries do not enforce verified-only listings.");
  if (!directoryServer.includes("verifiedListing: true") || !profileServer.includes('guide.status !== "published" || !guide.verifiedListing')) failures.push("Guide directory/profile server gate is incomplete.");
  if (!guideSitemap.includes("verifiedListing: true") || !search.includes("verifiedListing: true") || !internalLinks.includes("verifiedListing: true")) failures.push("Unverified guides could leak into sitemap, search or internal-link discovery.");

  for (const [label, source] of [["directory server", directoryServer], ["profile server", profileServer]]) {
    for (const forbidden of ["businessName:", "guideName:", "startingPriceCents:", "boatDescription:", "bookingUrl:", "phone:"]) if (source.includes(forbidden)) failures.push(`${label} contains hard-coded guide profile data: ${forbidden}`);
  }
  if (!directoryUi.includes("does not create placeholder guide identities") || !directoryUi.includes("No fishing guide has cleared the statewide verified-listing gate yet")) failures.push("Honest zero-guide state or anti-fabrication disclosure missing.");
  if (!profileUi.includes("Missing details stay missing until they are verified") || !profileUi.includes("guide.startingPriceCents !== undefined")) failures.push("Guide profile optional-fact rendering is not protected.");

  for (const signal of ["guideLakes:", "guideSpecies:", "GuideLakeRelationship", "GuideSpeciesRelationship"]) if (!repositories.includes(signal)) failures.push(`Guide relationship repository contract missing: ${signal}`);
  for (const signal of ["verified-guide-lake-relationship", "verified-guide-species-relationship", "verified-guide-lake-mismatch", "verified-guide-species-mismatch"]) if (!validation.includes(signal)) failures.push(`Verified guide relationship validation missing: ${signal}`);
  if (!directoryServer.includes("guideLakes.filter") || !directoryServer.includes("guideSpecies.filter") || !profileServer.includes("fishingPlatform.guideLakes.list") || !profileServer.includes("fishingPlatform.guideSpecies.list")) failures.push("Guide pages are not using guide-to-lake and guide-to-species relationships.");
  if (!directoryUi.includes('fishingFoundationAnchor("lake"') || !directoryUi.includes('fishingFoundationAnchor("species"') || !profileUi.includes('fishingFoundationAnchor("lake"') || !profileUi.includes('fishingFoundationAnchor("species"')) failures.push("Guide listings are not connected to canonical lake/species pages.");

  if (!routing.includes('FISHING_GUIDES_DIRECTORY_PATH = "/fishing/guides"') || !routing.includes("fishingGuideCanonicalPath") || !routing.includes("assertCanonicalFishingSlug")) failures.push("Canonical fishing-guide routing contract incomplete.");
  if (!directoryRoute.includes('createFileRoute("/fishing/guides")') || !profileRoute.includes('createFileRoute("/fishing/guides/$slug")')) failures.push("Fishing guide route files are incomplete.");
  if (!directoryRoute.includes("canonicalLink") || !profileRoute.includes("canonicalLink") || !profileRoute.includes("canonicalPath")) failures.push("Fishing guide canonical metadata missing.");
  if (!publicRoutes.includes('"/fishing/guides"') || !publicRoutes.includes('"/fishing/guides/submit"')) failures.push("Fishing guide public-route governance is incomplete.");
  if (!search.includes("fishing-directory:texas-fishing-guides") || !search.includes("fishingGuideCanonicalPath(guide.slug)")) failures.push("Global search discovery missing canonical guide routes.");
  if (!internalLinks.includes("fishingGuideCanonicalPath(guide.slug)")) failures.push("Guide internal-link discovery is not canonical.");
  if (!fishingHub.includes('to="/fishing/guides"')) failures.push("Fishing hub does not discover the guide directory.");

  if (!directoryLazy.includes('createLazyFileRoute("/fishing/guides")') || !directoryLazy.includes("FishingGuideDirectory pageData={Route.useLoaderData()}")) failures.push("Fishing guide directory native lazy route missing.");
  if (!profileLazy.includes('createLazyFileRoute("/fishing/guides/$slug")') || !profileLazy.includes("FishingGuideProfile pageData={Route.useLoaderData()}")) failures.push("Fishing guide profile native lazy route missing.");
  if (directoryRoute.includes('from "@/components/fishing/FishingGuideDirectory"') || /\bcomponent\s*:/.test(directoryRoute)) failures.push("Fishing guide directory UI leaked into critical route.");
  if (profileRoute.includes('from "@/components/fishing/FishingGuideProfile"') || /\bcomponent\s*:/.test(profileRoute)) failures.push("Fishing guide profile UI leaked into critical route.");

  if (!directoryServer.includes("editorialOrder") || !directoryServer.includes("businessName.localeCompare") || !directoryServer.includes("sponsoredPlacements")) failures.push("Editorial ordering and sponsored placement separation missing.");
  if (!directoryServer.includes("Sponsorship never changes this order") || !directoryUi.includes("cannot buy a higher editorial rank or recommendation")) failures.push("Directory editorial independence disclosure missing.");
  for (const source of [directoryUi, profileUi]) if (!source.includes("Sponsored placement") || !source.includes('rel="noopener sponsored"')) failures.push("Sponsored guide placement disclosure/link attributes missing.");
  if (!profileUi.includes("Sponsorship cannot change this profile’s editorial treatment")) failures.push("Guide profile editorial-independence disclosure missing.");
  if (!validation.includes('placement.disclosure !== "sponsored"')) failures.push("Runtime fishing placement disclosure validation missing.");

  for (const intent of ["new-listing", "claim-listing", "update-listing", "remove-listing"]) if (!onboardingContract.includes(`"${intent}"`)) failures.push(`Guide onboarding intent missing: ${intent}`);
  for (const field of ["businessName", "guideName", "website", "bookingUrl", "lakeSlugs", "speciesSlugs", "sourceUrls", "authorized"]) if (!onboardingContract.includes(`${field}:`)) failures.push(`Guide onboarding validation field missing: ${field}`);
  if (!onboardingContract.includes("Authorization is required")) failures.push("Guide submitter authorization gate missing.");
  if (!onboardingServer.includes("fishingGuideSubmissionSchema.parse(input)")) failures.push("Authoritative Zod guide-submission validation must remain server-side.");
  if (!onboardingServer.includes("isCompleteFishingLakeSlug") || !onboardingServer.includes("unknownLakes") || !onboardingServer.includes("unknownSpecies")) failures.push("Guide onboarding does not verify submitted relationship IDs against published fishing data.");
  if (!onboardingServer.includes("parseSourceUrls") || !onboardingServer.includes("Verification sources") || !onboardingServer.includes("submitted, not verified")) failures.push("Guide onboarding source and unverified-commercial-fact safeguards missing.");
  if (!onboardingServer.includes('partnership_type: "other"') || !onboardingServer.includes('source_path: "/fishing/guides/submit"') || !onboardingServer.includes("savePartnerInquiry")) failures.push("Guide submissions are not stored privately through the existing inquiry persistence path.");
  if (!partnerServer.includes("texasdefined_partner_inquiries")) failures.push("Guide onboarding persistence target is not the private partner-inquiry table.");
  if (!onboardingFunctions.includes("createServerFn") || !onboardingFunctions.includes("inputValidator(acceptFishingGuideSubmissionInput)") || !onboardingFunctions.includes('import("./guide-onboarding.server")')) failures.push("Guide onboarding server-function boundary is incomplete.");
  if (onboardingFunctions.includes("guide-onboarding-contract") || onboardingFunctions.includes("zod") || onboardingFunctions.includes('from "./guide-onboarding.server"')) failures.push("Guide onboarding client-facing functions must not statically import Zod or server-only persistence code.");
  if (!submitRoute.includes('createFileRoute("/fishing/guides/submit")') || !submitRoute.includes('content: "noindex, follow"')) failures.push("Guide onboarding route/noindex policy missing.");
  if (!submitLazy.includes('createLazyFileRoute("/fishing/guides/submit")') || !submitLazy.includes("FishingGuideOnboardingForm pageData={Route.useLoaderData()}")) failures.push("Guide onboarding form is not native-lazy loaded.");
  if (submitRoute.includes("FishingGuideOnboardingForm") || /\bcomponent\s*:/.test(submitRoute)) failures.push("Guide onboarding UI leaked into critical route.");
  for (const phrase of ["Submission does not publish a listing", "A free verified listing and paid sponsorship are separate", "does not automatically publish", "source URLs", "Sponsorship is a separate commercial workflow"]) if (!`${onboardingServer}\n${onboardingUi}`.includes(phrase)) failures.push(`Guide onboarding integrity disclosure missing: ${phrase}`);
  if (!directoryUi.includes('to="/fishing/guides/submit"') || !directoryUi.includes("Open the fishing-guide verification form")) failures.push("Guide directory does not discover the dedicated verification workflow.");
  if (!directoryUi.includes('to="/partner-with-us"') || !directoryUi.includes("Ask about a sponsored fishing-guide placement")) failures.push("Fishing sponsorship inquiry must remain separate from free listing verification.");

  for (const filter of ['name="lake"', 'name="region"', 'name="species"', 'name="trip"']) if (!directoryUi.includes(filter)) failures.push(`Guide directory filter missing: ${filter}`);
  if (!directoryUi.includes("Trip type") || !directoryUi.includes("Available when verified")) failures.push("Trip-type filter must remain honest when the model has no verified trip-type data.");

  for (const schema of ['"@type": "CollectionPage"', '"@type": "ItemList"', '"@type": "BreadcrumbList"']) if (!directoryRoute.includes(schema)) failures.push(`Guide directory schema missing: ${schema}`);
  for (const schema of ['"@type": "WebPage"', '"@type": "ProfessionalService"', '"@type": "BreadcrumbList"']) if (!profileRoute.includes(schema)) failures.push(`Guide profile schema missing: ${schema}`);
  if (!sitemap.includes("FISHING_GUIDES_DIRECTORY_PATH") || !guideSitemap.includes("fishingGuideCanonicalPath") || !primarySitemap.includes("loadFishingGuideSitemapEntriesServer") || !primarySitemap.includes("...fishingGuideSitemapEntries")) failures.push("Fishing guide sitemap coverage incomplete.");

  if (!directoryFunctions.includes("createServerFn") || !profileFunctions.includes("createServerFn") || !profileFunctions.includes("inputValidator")) failures.push("Fishing guide server-function boundary incomplete.");
  for (const [label, source] of [["directory UI", directoryUi], ["profile UI", profileUi], ["onboarding UI", onboardingUi], ["directory route", directoryRoute], ["profile route", profileRoute], ["submit route", submitRoute]]) {
    if (source.includes('from "@/data/fishing/index"') || source.includes("fixtures") || source.includes("repositories")) failures.push(`${label} crosses the fishing data client/server boundary.`);
  }
}

if (failures.length) {
  console.error("Fishing guide platform validation failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Fishing guide platform validation passed: verified-only publishing, source-backed onboarding/claim/update/removal, private persistence, server-only authoritative validation, native lazy boundaries, anti-fabrication rules, relationship integrity, canonical discovery and sponsorship/editorial separation are protected.");
