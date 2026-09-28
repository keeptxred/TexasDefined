import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const paths = {
  routing: "src/data/fishing/technique-routing.ts",
  redirects: "src/data/fishing/technique-redirects.ts",
  server: "src/data/fishing/technique-data.server.ts",
  functions: "src/data/fishing/technique-data.functions.ts",
  directoryRoute: "src/routes/fishing.techniques.tsx",
  directoryLazy: "src/routes/fishing.techniques.lazy.tsx",
  profileRoute: "src/routes/fishing.techniques.$slug.tsx",
  profileLazy: "src/routes/fishing.techniques.$slug.lazy.tsx",
  directoryComponent: "src/components/fishing/FishingTechniqueDirectory.tsx",
  profileComponent: "src/components/fishing/FishingTechniqueProfile.tsx",
  guideContent: "src/data/fishing/technique-guide-content.ts",
  imageRegistry: "src/data/fishing/technique-images.ts",
  productionSmoke: "scripts/ci/verify-production-surfaces.mjs",
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
for (const path of ["public/images/fishing/crankbaits-hero.avif", "public/images/fishing/crankbait-types-depth-cover.avif"]) {
  if (!fs.existsSync(path)) throw new Error(`Fishing Batch 13 missing crankbait image asset: ${path}`);
}
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
for (const token of ['createLazyFileRoute("/fishing/techniques")','useRouterState','state.location.pathname','pathname !== FISHING_TECHNIQUES_DIRECTORY_PATH','return <Outlet />','FishingTechniqueDirectory data={Route.useLoaderData()} search={Route.useSearch()}']) requireText(files.directoryLazy, token, `directory native lazy route missing ${token}`);
for (const token of ["Texas Fishing Techniques","How We Verify Technique Guides","Browse techniques","Check Conditions Before You Go",'method="get"','name="category"','name="species"','name="season"',"fresh fishing reports","current regulations"]) requireText(files.directoryComponent, token, `directory UI contract missing ${token}`);

for (const token of ["buildFishingTechniqueProfileHead",'"@type": "WebPage"','"@type": "ItemList"','"@type": "BreadcrumbList"',"citation:"]) requireText(files.server, token, `profile server-side head contract missing ${token}`);
for (const token of ['createFileRoute("/fishing/techniques/$slug")',"throw notFound()",'content: "noindex, nofollow"','head: ({ loaderData }) => loaderData?.head']) requireText(files.profileRoute, token, `profile critical route contract missing ${token}`);
for (const token of ['createLazyFileRoute("/fishing/techniques/$slug")','FishingTechniqueProfile data={Route.useLoaderData()}']) requireText(files.profileLazy, token, `profile native lazy route missing ${token}`);
for (const token of ["How to Fish","When to Use","Where to Fish","Basic Tackle and Rigging Setup","Season-by-Season Guide","Common Mistakes to Avoid","Texas Lakes Covered in This Guide","Check Current Conditions Before You Fish","Sources and Verification","does not claim","fishingTechniqueImages","images?.hero","images?.depthGuide",'technique.slug === "crankbaits"','technique.slug === "soft-plastics"',"Rigging at a glance","Recognize the Basic Layout Before You Tie It",'target="_blank"','rel="noopener noreferrer"']) requireText(files.profileComponent, token, "profile UI contract missing " + token);
for (const slug of techniqueSlugs) requireText(files.guideContent, `"${slug}"`, "practical guide content missing " + slug);
for (const token of ["Crankbait Types by Depth and Cover","Squarebill","Deep diver","Lipless crankbait","running depth","contact or narrowly clear"]) requireText(files.guideContent, token, "crankbait authority content missing " + token);
for (const token of ["Texas rig","Weightless stick bait","Carolina rig","Drop shot","Shaky head","Ned rig","Choose the Soft-Plastic Rig for the Job"]) requireText(files.guideContent, token, "soft-plastics authority content missing " + token);
for (const token of ["/images/fishing/crankbaits-hero.avif","/images/fishing/crankbait-types-depth-cover.avif","AI-generated","OpenAI image generation","subjectScope"]) requireText(files.imageRegistry, token, "crankbait image governance missing " + token);
for (const token of ["fishingTechniqueImages","image: images.hero.src","imageAlt: images.hero.alt","imageType: images.hero.imageType"]) requireText(files.server, token, "crankbait social image metadata missing " + token);
const workerSmoke = read("scripts/ci/verify-built-worker-ssr.mjs");
for (const token of ["/fishing/techniques/crankbaits","How to Fish Crankbaits in Texas","/images/fishing/crankbaits-hero.avif","/images/fishing/crankbait-types-depth-cover.avif"]) requireText(files.productionSmoke, token, "crankbait live production verification missing " + token);
const techniqueRouteSmokeExpectations = [
  ["/fishing/techniques/soft-plastics", "How to Fish Soft Plastics in Texas"],
  ["/fishing/techniques/crankbaits", "How to Fish Crankbaits in Texas"],
  ["/fishing/techniques/spinnerbaits", "How to Fish Spinnerbaits in Texas"],
  ["/fishing/techniques/topwater", "How to Fish Topwater in Texas"],
  ["/fishing/techniques/trolling", "How to Fish Trolling in Texas"],
  ["/fishing/techniques/vertical-jigging", "How to Fish Vertical jigging in Texas"],
  ["/fishing/techniques/jigs-and-minnows", "How to Fish Jigs and minnows in Texas"],
  ["/fishing/techniques/live-bait", "How to Fish Live bait in Texas"],
  ["/fishing/techniques/cut-bait", "How to Fish Cut bait in Texas"],
];
for (const [path, marker] of techniqueRouteSmokeExpectations) {
  requireText(workerSmoke, path, "built Worker technique detail smoke missing " + path);
  requireText(workerSmoke, marker, "built Worker technique detail marker missing " + marker);
  requireText(files.productionSmoke, path, "live technique detail smoke missing " + path);
  requireText(files.productionSmoke, marker, "live technique detail marker missing " + marker);
}

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
for (const token of ['beforeLoad: ({ location })','getFishingTechniquePathNormalizationRedirect(location.pathname, location.searchStr)','throw redirect(redirectOptions)']) requireText(files.hubRoute, token, `duplicate fishing technique route hook missing ${token}`);
for (const token of ['DUPLICATED_FISHING_TECHNIQUE_PREFIX = "/fishing/fishing/techniques/"','fishingTechniqueCanonicalPath(slug)','searchStr || ""','statusCode: 301 as const']) requireText(files.redirects, token, `duplicate fishing technique normalization policy missing ${token}`);
if (`${files.routing}\n${files.sitemap}\n${files.publicRoutes}`.includes("/fishing/fishing/")) throw new Error("Fishing Batch 13 validation failed: malformed duplicated fishing prefix entered canonical discovery.");

for (const token of ['<Resource href="/fishing/techniques" title="Fishing techniques"','<Resource href="/fishing/seasons" title="Fishing seasons"','Link to="/fishing/lakes"','<Resource href="/fishing/guides" title="Fishing guides"','<Resource href="/fishing/access" title="Fishing access"','<Resource href="/fishing/reports" title="Fishing reports"','fishingFoundationAnchor("lake", lake.slug)','fishingFoundationAnchor("species", fish.slug)',"Featured Texas Fishing Lakes","Full fishing guide","Lake profile"]) requireText(files.hubComponent, token, `live fishing hub discovery contract missing ${token}`);
requireText(files.sitemap, "FISHING_TECHNIQUES_DIRECTORY_PATH", "technique sitemap directory entry missing");
requireText(files.sitemap, "PUBLISHED_FISHING_TECHNIQUE_SLUGS", "technique sitemap profile expansion missing");
requireText(files.search, "fishing-directory:texas-fishing-techniques", "global-search directory document missing");
requireText(files.search, "fishing-technique:", "global-search profile documents missing");
requireText(files.links, 'kind: "technique"', "internal-link technique kind missing");
requireText(files.links, "fishing-reference:techniques", "internal-link directory entity missing");
requireText(files.links, "fishing-technique:", "internal-link profile entities missing");
requireText(files.publicRoutes, '"/fishing/techniques"', "public-route directory governance missing");
requireText(pkg.scripts["fishing:validate"], "validate-fishing-techniques.mjs", "Batch 13 validator not wired into fishing:validate");

for (const token of ["redirectTargets","/fishing/fishing/techniques/soft-plastics?source=smoke","expectedStatus: 301","expectedPath: '/fishing/techniques/soft-plastics'","redirect: 'manual'"]) requireText(workerSmoke, token, `duplicate fishing technique redirect smoke missing ${token}`);


console.log("Fishing Batch 13 techniques validation passed: nine verified source-backed profiles, native TanStack lazy file routes, server-side SEO head payloads, complete-lake gates, live-condition separation, commercial neutrality, schemas and discovery governance are protected.");
