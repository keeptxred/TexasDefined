import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const paths = {
  routing: "src/data/fishing/technique-routing.ts",
  server: "src/data/fishing/technique-data.server.ts",
  functions: "src/data/fishing/technique-data.functions.ts",
  directoryRoute: "src/routes/fishing.techniques.tsx",
  directoryLazy: "src/routes/fishing.techniques.lazy.tsx",
  profileRoute: "src/routes/fishing.techniques.$slug.tsx",
  profileLazy: "src/routes/fishing.techniques.$slug.lazy.tsx",
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
const files = Object.fromEntries(Object.entries(paths).map(([key, path]) => [key, read(path)]));
const pkg = JSON.parse(files.package);
const requireText = (text, token, label) => { if (!text.includes(token)) throw new Error(`Fishing Batch 13 validation failed: ${label}`); };
const techniqueSlugs = ["soft-plastics","crankbaits","spinnerbaits","topwater","trolling","vertical-jigging","jigs-and-minnows","live-bait","cut-bait"];

requireText(files.routing, 'FISHING_TECHNIQUES_DIRECTORY_PATH = "/fishing/techniques"', "canonical directory path missing");
requireText(files.routing, "PUBLISHED_FISHING_TECHNIQUE_SLUGS", "published technique allowlist missing");
requireText(files.routing, "PUBLISHED_FISHING_TECHNIQUE_PATHS", "explicit crawl-discovery paths missing");
requireText(files.routing, "fishingTechniqueCanonicalPath", "canonical profile helper missing");
for (const slug of techniqueSlugs) {
  requireText(files.routing, `"${slug}"`, `published technique slug missing ${slug}`);
  requireText(files.routing, `"/fishing/techniques/${slug}"`, `crawl-discovery path missing ${slug}`);
  requireText(files.fixtures, `technique("${slug}"`, `typed fixture missing ${slug}`);
  requireText(files.publicRoutes, `"/fishing/techniques/${slug}"`, `public-route governance missing ${slug}`);
}

requireText(files.server, "isCompleteFishingLakeSlug", "publication must be restricted to complete lake guides");
requireText(files.server, "Boolean(profile.verifiedAt) && profile.sources.length > 0", "lake-technique relationships must be verified and sourced");
requireText(files.server, "!technique.verifiedAt || !technique.sources.length", "technique records must be verified and sourced");
requireText(files.server, "sponsorship", "commercial/editorial separation missing");
requireText(files.server, "not a live bite report", "live-condition separation missing");
requireText(files.functions, "loadFishingTechniqueDirectoryServer", "directory server boundary missing");
requireText(files.functions, "loadFishingTechniqueProfileServer", "profile server boundary missing");

for (const token of ["buildFishingTechniqueDirectoryHead",'"@type": "CollectionPage"','"@type": "ItemList"','"@type": "FAQPage"','"@type": "BreadcrumbList"']) requireText(files.server, token, `directory server-side head contract missing ${token}`);
for (const token of ['createFileRoute("/fishing/techniques")','head: ({ loaderData }) => loaderData?.head ?? {}']) requireText(files.directoryRoute, token, `directory critical route contract missing ${token}`);
for (const token of ['createLazyFileRoute("/fishing/techniques")','FishingTechniqueDirectory data={Route.useLoaderData()} search={Route.useSearch()}']) requireText(files.directoryLazy, token, `directory native lazy route missing ${token}`);
for (const token of ["No generic tackle encyclopedia",'method="get"','name="category"','name="species"','name="season"',"fresh fishing reports","current regulations"]) requireText(files.directoryComponent, token, `directory UI contract missing ${token}`);

for (const token of ["buildFishingTechniqueProfileHead",'"@type": "WebPage"','"@type": "ItemList"','"@type": "BreadcrumbList"',"citation:"]) requireText(files.server, token, `profile server-side head contract missing ${token}`);
for (const token of ['createFileRoute("/fishing/techniques/$slug")',"throw notFound()",'content: "noindex, nofollow"','head: ({ loaderData }) => loaderData?.head']) requireText(files.profileRoute, token, `profile critical route contract missing ${token}`);
for (const token of ['createLazyFileRoute("/fishing/techniques/$slug")','FishingTechniqueProfile data={Route.useLoaderData()}']) requireText(files.profileLazy, token, `profile native lazy route missing ${token}`);
for (const token of ["Verified lake applications, not a universal ranking","not today's answer","does not claim",'target="_blank"','rel="noopener noreferrer"']) requireText(files.profileComponent, token, `profile UI contract missing ${token}`);

for (const [routeName, routeText, componentPath] of [
  ["directory", files.directoryRoute, "@/components/fishing/FishingTechniqueDirectory"],
  ["profile", files.profileRoute, "@/components/fishing/FishingTechniqueProfile"],
]) {
  if (routeText.includes(componentPath) || /\bcomponent\s*:/.test(routeText)) throw new Error(`Fishing Batch 13 validation failed: ${routeName} page component leaked back into its critical route module.`);
}
for (const routeText of [files.directoryRoute, files.profileRoute]) {
  if (routeText.includes('from "@/data/fishing/technique-data.server"')) throw new Error("Fishing Batch 13 validation failed: critical client route imports technique server module directly.");
  for (const eagerHeadToken of ["buildMeta", "canonicalLink", "texasDefinedBrand", '"@type":']) {
    if (routeText.includes(eagerHeadToken)) throw new Error(`Fishing Batch 13 validation failed: eager SEO/schema payload leaked into critical technique route (${eagerHeadToken}).`);
  }
}
for (const forbidden of ["guaranteed catch","today's best technique","affiliate pick","sponsored ranking","buy this lure"]) if (`${files.directoryRoute}\n${files.profileRoute}\n${files.directoryComponent}\n${files.profileComponent}`.toLowerCase().includes(forbidden)) throw new Error(`Fishing Batch 13 validation failed: unsupported technique claim leaked (${forbidden}).`);

requireText(files.hubRoute, 'lazy(() => import("@/components/fishing/FishingHub")', "statewide hub UI split missing");
for (const token of ['to="/fishing/techniques"','to="/fishing/seasons"','to="/fishing/lakes"','to="/fishing/guides"','to="/fishing/access"','to="/fishing/services"','fishingFoundationAnchor("lake", lake.slug)','fishingFoundationAnchor("species", row.slug)',"Ten complete lake guides now span more of Texas."]) requireText(files.hubComponent, token, `live fishing hub discovery contract missing ${token}`);
requireText(files.sitemap, "FISHING_TECHNIQUES_DIRECTORY_PATH", "technique sitemap directory entry missing");
requireText(files.sitemap, "PUBLISHED_FISHING_TECHNIQUE_SLUGS", "technique sitemap profile expansion missing");
requireText(files.search, "fishing-directory:texas-fishing-techniques", "global-search directory document missing");
requireText(files.search, "fishing-technique:", "global-search profile documents missing");
requireText(files.links, 'kind: "technique"', "internal-link technique kind missing");
requireText(files.links, "fishing-reference:techniques", "internal-link directory entity missing");
requireText(files.links, "fishing-technique:", "internal-link profile entities missing");
requireText(files.publicRoutes, '"/fishing/techniques"', "public-route directory governance missing");
requireText(pkg.scripts["fishing:validate"], "validate-fishing-techniques.mjs", "Batch 13 validator not wired into fishing:validate");

console.log("Fishing Batch 13 techniques validation passed: nine verified source-backed profiles, native TanStack lazy file routes, server-side SEO head payloads, complete-lake gates, live-condition separation, commercial neutrality, schemas and discovery governance are protected.");
