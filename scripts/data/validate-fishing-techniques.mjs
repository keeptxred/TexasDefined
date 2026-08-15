import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const paths = {
  routing: "src/data/fishing/technique-routing.ts",
  server: "src/data/fishing/technique-data.server.ts",
  functions: "src/data/fishing/technique-data.functions.ts",
  directoryRoute: "src/routes/fishing.techniques.tsx",
  profileRoute: "src/routes/fishing.techniques.$slug.tsx",
  directoryComponent: "src/components/fishing/FishingTechniqueDirectory.tsx",
  profileComponent: "src/components/fishing/FishingTechniqueProfile.tsx",
  hubRoute: "src/routes/fishing.tsx",
  hubComponent: "src/components/fishing/FishingHub.tsx",
  fixtures: "src/data/fishing/fixtures.ts",
  sitemap: "src/data/fishing/sitemap.ts",
  search: "src/data/fishing/search.ts",
  links: "src/data/fishing/internal-links.ts",
  publicRoutes: "src/lib/public-routes.ts",
  package: "package.json",
};
for (const path of Object.values(paths)) if (!fs.existsSync(path)) throw new Error(`Fishing Batch 13 missing required file: ${path}`);

const routing = read(paths.routing);
const server = read(paths.server);
const functions = read(paths.functions);
const directoryRoute = read(paths.directoryRoute);
const profileRoute = read(paths.profileRoute);
const directoryComponent = read(paths.directoryComponent);
const profileComponent = read(paths.profileComponent);
const hubRoute = read(paths.hubRoute);
const hubComponent = read(paths.hubComponent);
const fixtures = read(paths.fixtures);
const sitemap = read(paths.sitemap);
const search = read(paths.search);
const links = read(paths.links);
const publicRoutes = read(paths.publicRoutes);
const pkg = JSON.parse(read(paths.package));
const requireText = (text, token, label) => { if (!text.includes(token)) throw new Error(`Fishing Batch 13 validation failed: ${label}`); };

const techniqueSlugs = [
  "soft-plastics",
  "crankbaits",
  "spinnerbaits",
  "topwater",
  "trolling",
  "vertical-jigging",
  "jigs-and-minnows",
  "live-bait",
  "cut-bait",
];

requireText(routing, 'FISHING_TECHNIQUES_DIRECTORY_PATH = "/fishing/techniques"', "canonical technique directory path missing");
requireText(routing, "PUBLISHED_FISHING_TECHNIQUE_SLUGS", "published technique allowlist missing");
requireText(routing, "PUBLISHED_FISHING_TECHNIQUE_PATHS", "explicit dynamic-profile crawl discovery paths missing");
requireText(routing, "fishingTechniqueCanonicalPath", "canonical technique profile path helper missing");
for (const slug of techniqueSlugs) {
  requireText(routing, `"${slug}"`, `published technique slug missing ${slug}`);
  requireText(routing, `"/fishing/techniques/${slug}"`, `crawl-discovery path missing ${slug}`);
  requireText(fixtures, `technique("${slug}"`, `published technique ${slug} has no typed fixture record`);
  requireText(publicRoutes, `"/fishing/techniques/${slug}"`, `public route governance missing ${slug}`);
}

requireText(server, "isCompleteFishingLakeSlug", "technique publication must be restricted to complete lake guides");
requireText(server, "Boolean(profile.verifiedAt) && profile.sources.length > 0", "lake-technique relationships must be verified and sourced");
requireText(server, "!technique.verifiedAt || !technique.sources.length", "technique records must be verified and sourced before publication");
requireText(server, "sponsorship", "commercial/editorial separation policy missing");
requireText(server, "not a live bite report", "live-condition separation policy missing");
requireText(functions, "loadFishingTechniqueDirectoryServer", "directory server function does not isolate technique loading");
requireText(functions, "loadFishingTechniqueProfileServer", "profile server function does not isolate technique loading");

for (const token of [
  'createFileRoute("/fishing/techniques")',
  '"@type": "CollectionPage"',
  '"@type": "ItemList"',
  '"@type": "FAQPage"',
  '"@type": "BreadcrumbList"',
  'lazy(() => import("@/components/fishing/FishingTechniqueDirectory")',
  "FishingTechniqueDirectory data={Route.useLoaderData()} search={Route.useSearch()}",
]) requireText(directoryRoute, token, `technique directory route contract missing ${token}`);

for (const token of [
  "No generic tackle encyclopedia",
  'method="get"',
  'name="category"',
  'name="species"',
  'name="season"',
  "fresh fishing reports",
  "current regulations",
]) requireText(directoryComponent, token, `technique directory UI contract missing ${token}`);

for (const token of [
  'createFileRoute("/fishing/techniques/$slug")',
  "throw notFound()",
  'content: "noindex, nofollow"',
  '"@type": "WebPage"',
  '"@type": "ItemList"',
  '"@type": "BreadcrumbList"',
  "citation:",
  'lazy(() => import("@/components/fishing/FishingTechniqueProfile")',
  "FishingTechniqueProfile data={Route.useLoaderData()}",
]) requireText(profileRoute, token, `technique profile route contract missing ${token}`);

for (const token of [
  "Verified lake applications, not a universal ranking",
  "not today's answer",
  "does not claim",
  'target="_blank"',
  'rel="noopener noreferrer"',
]) requireText(profileComponent, token, `technique profile UI contract missing ${token}`);

if (profileRoute.includes('from "@/data/fishing/technique-data.server"') || directoryRoute.includes('from "@/data/fishing/technique-data.server"')) {
  throw new Error("Fishing Batch 13 validation failed: client route imports the technique server module directly.");
}
for (const forbidden of ["guaranteed catch", "today's best technique", "affiliate pick", "sponsored ranking", "buy this lure"]) {
  if (`${directoryRoute}\n${profileRoute}\n${directoryComponent}\n${profileComponent}`.toLowerCase().includes(forbidden)) throw new Error(`Fishing Batch 13 validation failed: unsupported technique claim leaked into public routes (${forbidden}).`);
}

// The statewide hub is manually split because route registration is intentionally not globally auto-split.
// Preserve all pre-Batch-13 discovery contracts against the live lazy component, not compatibility comments.
requireText(hubRoute, 'lazy(() => import("@/components/fishing/FishingHub")', "statewide fishing hub must keep its UI out of startup main");
requireText(hubRoute, "FishingHub lakes={lakes} species={species} lakeSpecies={lakeSpecies}", "statewide fishing hub lazy component is not hydrated from its existing loader");
for (const token of [
  'Link to="/fishing/lakes"',
  'to="/fishing/lakes/lake-conroe"',
  'to="/fishing/species"',
  'to="/fishing/plan"',
  'to="/fishing/compare"',
  'to="/fishing/seasons"',
  'to="/fishing/techniques"',
  'to="/fishing/guides"',
  'to="/fishing/access"',
  'to="/fishing/services"',
  'fishingFoundationAnchor("lake", lake.slug)',
  'fishingFoundationAnchor("species", row.slug)',
  "isCompleteFishingLakeSlug",
  "Five complete lake guides",
  "Compare complete fishing lakes →",
  "Compare all 5 complete lake guides →",
]) requireText(hubComponent, token, `live statewide fishing hub discovery contract missing ${token}`);

requireText(sitemap, "FISHING_TECHNIQUES_DIRECTORY_PATH", "technique sitemap directory entry missing");
requireText(sitemap, "PUBLISHED_FISHING_TECHNIQUE_SLUGS", "technique sitemap profile expansion missing");
requireText(search, "fishing-directory:texas-fishing-techniques", "technique global-search directory document missing");
requireText(search, "fishing-technique:", "technique global-search profile documents missing");
requireText(search, "isCompleteFishingLakeSlug", "technique search publication gate is not restricted to complete lakes");
requireText(links, 'kind: "technique"', "technique internal-link kind missing");
requireText(links, "fishing-reference:techniques", "technique directory internal-link entity missing");
requireText(links, "fishing-technique:", "technique profile internal-link entities missing");
requireText(publicRoutes, '"/fishing/techniques"', "public route governance missing technique directory");
requireText(pkg.scripts["fishing:validate"], "validate-fishing-techniques.mjs", "Batch 13 validator is not wired into fishing:validate");

console.log("Fishing Batch 13 techniques validation passed: verified complete-lake relationships, nine source-backed technique profiles, lazy route/hub UI boundaries, anti-thin-content gates, live-condition separation, commercial neutrality, schemas and discovery governance are protected.");
