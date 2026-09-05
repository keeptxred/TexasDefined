import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");
const failures = [];
const assert = (condition, message) => { if (!condition) failures.push(message); };

const profilePaths = [
  "src/data/camping/profiles.ts",
  "src/data/camping/profiles-wave2.ts",
  "src/data/camping/profiles-wave3.ts",
  "src/data/camping/profiles-wave4.ts",
  "src/data/camping/profiles-wave5.ts",
];

const profileSources = profilePaths.map((profilePath) => ({ profilePath, source: read(profilePath) }));
const server = read("src/data/camping/camping-profiles.server.ts");
const facade = read("src/data/camping/camping-profiles.ts");
const componentWrapper = read("src/components/camping/DestinationCampingDetails.tsx");
const component = read("src/components/camping/DestinationCampingDetailsImpl.tsx");
const destinationRoute = read("src/routes/destination.$slug.tsx");
const destinationPresentation = read("src/components/editorial/DestinationPageContent.tsx");
const searchRoute = read("src/routes/explore.search.tsx");
const searchPresentation = read("src/components/explore/ExploreSearchPage.tsx");
const tripPlannerRoute = read("src/routes/explore.trip-planner.tsx");
const tripPlannerLazy = read("src/routes/explore.trip-planner.lazy.tsx");
const campingHub = read("src/routes/best-places-to-go-camping-in-texas.tsx");
const legacyRedirect = read("src/routes/explore.texas-camping-guide.tsx");
const sitemapValidator = read("scripts/data/validate-sitemap-routes.mjs");

for (const symbol of [
  "CAMPING_PROFILES",
  "CAMPING_PROFILES_WAVE2",
  "CAMPING_PROFILES_WAVE3",
  "CAMPING_PROFILES_WAVE4",
  "CAMPING_PROFILES_WAVE5",
]) {
  assert(server.includes(symbol), `Camping aggregate server must import ${symbol}.`);
}
assert(server.includes("profile.profileSlug ?? profile.destinationSlug"), "Camping aggregate must preserve parent/child profile identity without inventing duplicate destinations.");
assert(server.includes("loadCampingProfilesForDestinationServer"), "Camping aggregate must resolve profiles by canonical destination slug.");
assert(server.includes("loadCampingSearchIndexServer"), "Camping aggregate must expose a canonical-destination search index.");
for (const signal of ["profile.searchTerms", "profile.styles", "profile.amenities", "profile.managingAgency", "profile.reservationAuthority"]) {
  assert(server.includes(signal), `Camping search index must include ${signal}.`);
}

assert(facade.includes('createServerFn({ method: "GET" })'), "Camping facade must use the repository-standard server-function boundary.");
assert(facade.includes('await import("./camping-profiles.server")'), "Camping facade must dynamically load the server-only aggregate.");
assert(!/from\s+["']\.\/camping-profiles\.server["']/.test(facade), "Camping facade must not statically import the server-only aggregate.");
assert(!facade.includes("profiles-wave"), "Camping facade must not import any rich camping research wave.");
assert(!facade.includes("CAMPING_PROFILES"), "Camping facade must not attach the camping registry to the client graph.");
assert(!/from\s+["']\.\/profiles["']/.test(facade), "Camping facade must not statically import the first camping research wave.");
assert(facade.includes("getCampingProfilesForDestination"), "Camping facade must expose destination-level profile lookup.");
assert(facade.includes("getCampingSearchIndex"), "Camping facade must expose search aliases keyed to canonical destinations.");

assert(componentWrapper.includes('lazy(() =>') && componentWrapper.includes('import("./DestinationCampingDetailsImpl")'), "Destination camping UI must remain behind an explicit lazy boundary so authority rendering does not inflate the global client bundle.");
assert(destinationRoute.includes('getCampingProfilesForDestination(destination.slug)'), "Canonical destination loader must fetch camping profiles by destination slug.");
assert(destinationRoute.includes('import("@/components/editorial/DestinationPageContent")'), "Destination presentation must remain dynamically split from the global client bundle.");
assert(destinationPresentation.includes("<DestinationCampingDetails"), "Canonical destination pages must render verified camping details when profiles exist.");
assert(destinationRoute.includes("campingCitations"), "Canonical destination schema must incorporate verified camping source citations.");
assert(destinationRoute.includes("...campingProfiles.map((profile) => profile.verifiedAt)"), "Canonical destination freshness must consider camping source verification dates.");
assert(destinationRoute.includes('`${siteUrl}/best-places-to-go-camping-in-texas`'), "Camping destinations must point schema back to the canonical statewide camping collection.");

for (const signal of [
  'data-camping-destination={destinationSlug}',
  "unlisted amenity means we have not verified it, not that it is unavailable",
  "Official reservation source",
  "profile.sources.map",
  'to="/best-places-to-go-camping-in-texas"',
]) {
  assert(component.includes(signal), `Destination camping component missing protected signal: ${signal}`);
}

assert(!searchRoute.includes('import { getCampingSearchIndex } from "@/data/camping/camping-profiles"'), "Explore search eager route must not statically import the camping facade into the global client entry.");
assert(searchRoute.includes('await import("@/data/camping/camping-profiles")'), "Explore search loader must dynamically load the thin camping alias facade.");
assert(searchRoute.includes('import("@/components/explore/ExploreSearchPage")'), "Explore search presentation must remain behind an explicit dynamic component boundary.");
assert(!searchRoute.includes("DestinationCard"), "Explore search presentation must remain out of the global client route graph.");
assert(searchPresentation.includes("campingTermsByDestination"), "Explore search must map camping aliases back to canonical destination slugs.");
assert(searchPresentation.includes("scoreDestination(destination, q, campingTermsByDestination.get(destination.slug) ?? [])"), "Explore search must score canonical destinations with camping aliases.");
assert(searchPresentation.includes("Pine Springs Campground"), "Explore search must document named-campground discovery without creating campground doorway routes.");
assert(searchPresentation.includes("full hookups"), "Explore search must expose high-intent camping amenity discovery.");

assert(!tripPlannerRoute.includes('import { getCampingSearchIndex } from "@/data/camping/camping-profiles"'), "Trip Planner eager route must not statically import the camping facade into the global client entry.");
assert(tripPlannerRoute.includes('await import("@/data/camping/camping-profiles")'), "Trip Planner loader must dynamically load the thin camping alias facade.");
assert(tripPlannerRoute.includes("campingSearchIndex"), "Trip Planner loader must expose verified camping aliases to the lazy planner UI.");
assert(tripPlannerLazy.includes("campingTermsByDestination"), "Trip Planner must map verified camping aliases back to canonical destination slugs.");
assert(tripPlannerLazy.includes('name="campingQuery"'), "Trip Planner must accept an optional campground or camping-preference query.");
assert(tripPlannerLazy.includes("Malaquite Campground, full hookups, beach camping"), "Trip Planner must make named-campground and amenity discovery explicit.");
assert(tripPlannerLazy.includes("campingTermsByDestination.get(destination.slug) ?? []"), "Trip Planner scoring must use verified camping aliases without generating campground routes.");

for (const symbol of [
  "CAMPING_DISCOVERY_PROFILES",
  "CAMPING_DISCOVERY_PROFILES_WAVE2",
  "CAMPING_DISCOVERY_PROFILES_WAVE3",
  "CAMPING_DISCOVERY_PROFILES_WAVE4",
  "CAMPING_DISCOVERY_PROFILES_WAVE5",
]) {
  assert(campingHub.includes(symbol), `Canonical camping hub must continue loading ${symbol}.`);
}
assert(legacyRedirect.includes('/best-places-to-go-camping-in-texas'), "Legacy camping guide must redirect to the canonical statewide camping hub.");
assert(sitemapValidator.includes("/explore/texas-camping-guide"), "Sitemap governance must retain the legacy camping redirect contract.");
assert(sitemapValidator.includes("/best-places-to-go-camping-in-texas"), "Sitemap governance must retain the canonical camping route.");

for (const { profilePath, source } of profileSources) {
  assert(source.includes("verifiedAt:"), `${profilePath} must preserve source verification dates.`);
  assert(source.includes("sources:"), `${profilePath} must preserve authoritative source provenance.`);
  assert(source.includes("reservationUrl:"), `${profilePath} must preserve official reservation routing.`);
  assert(!/verifiedAt:\s*["']\s*["']/.test(source), `${profilePath} contains a blank verifiedAt value.`);
  assert(!/url:\s*["']\s*["']/.test(source), `${profilePath} contains a blank source or reservation URL.`);
}
const combinedProfiles = profileSources.map(({ source }) => source).join("\n");
assert(combinedProfiles.includes('destinationSlug: "padre-island-national-seashore"'), "Initial NPS camping coverage must include Padre Island National Seashore.");
assert(combinedProfiles.includes("All camping is first come, first served"), "Padre Island profile must preserve the current NPS no-reservation rule.");

if (failures.length) {
  console.error(`Camping authority validation failed (${failures.length} issue${failures.length === 1 ? "" : "s"}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Camping authority validation passed: five verified public-camping waves feed the canonical hub, canonical destination pages, source/freshness schema, split Explore search and Trip Planner without duplicate campground routes; Padre Island National Seashore is covered and server wiring dynamically isolates the rich registry from the global client graph.");
